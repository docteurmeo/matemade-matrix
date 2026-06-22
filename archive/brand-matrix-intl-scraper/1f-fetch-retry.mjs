/**
 * Retry fetch for stubborn brands:
 * - Wood Wood (filter SVGs properly)
 * - Wayback Machine for EU brands (with delays to avoid rate limit)
 * - Japanese brands via ZOZOTOWN
 */
import { chromium } from 'playwright-core';
import axios from 'axios';
import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';
import { createWriteStream } from 'fs';
import { pipeline } from 'stream/promises';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '.');
const IMAGES_DIR = path.join(ROOT, 'images');
const PROGRESS_FILE = path.join(ROOT, 'data', 'fetch-progress.json');
const EDGE = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const N = 4; // images per brand

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

const CONFIGS = [
  // Wood Wood - filter only raster images
  {
    id: 'wood-wood',
    strategy: 'direct',
    urls: ['https://www.woodwood.com/collections/bags', 'https://www.woodwood.com/collections/accessories'],
    filter: u => /\.(jpg|jpeg|png|webp)/i.test(u) && !u.includes('payment') && !u.includes('svg'),
  },
  // Wayback — each brand needs 10s+ delay between requests
  {
    id: 'jacquemus',
    strategy: 'wayback',
    waybackQuery: 'jacquemus.com/collections',
    fallbackQuery: 'jacquemus.com',
  },
  {
    id: 'sezane',
    strategy: 'wayback',
    waybackQuery: 'sezane.com',
  },
  {
    id: 'cos',
    strategy: 'wayback',
    waybackQuery: 'cosstores.com',
  },
  {
    id: 'wandler',
    strategy: 'wayback',
    waybackQuery: 'wandler.eu',
  },
  {
    id: 'other-stories',
    strategy: 'wayback',
    waybackQuery: 'stories.com/en_eur/accessories/bags',
    fallbackQuery: 'stories.com',
  },
  {
    id: 'hunting-season',
    strategy: 'wayback',
    waybackQuery: 'huntingseason.com',
  },
  {
    id: 'vasic',
    strategy: 'wayback',
    waybackQuery: 'vasic.co',
  },
  {
    id: 'flore-paris',
    strategy: 'wayback',
    waybackQuery: 'floreparis.com',
  },
  {
    id: 'a-wang',
    strategy: 'wayback',
    waybackQuery: 'alexanderwang.com',
  },
  {
    id: 'cou-cou',
    strategy: 'wayback',
    waybackQuery: 'coucouintimate.com',
  },
  {
    id: 'tod-s',
    strategy: 'wayback',
    waybackQuery: 'tods.com',
  },
  // Japanese brands via ZOZOTOWN search
  {
    id: 'hender-scheme',
    strategy: 'zozo',
    zozoQuery: 'hender scheme',
  },
  {
    id: 'aeta',
    strategy: 'zozo',
    zozoQuery: 'aeta bag',
  },
  {
    id: 'porter',
    strategy: 'zozo',
    zozoQuery: 'porter yoshida bag',
  },
];

async function getWaybackUrl(query, fallback) {
  // Try specific first, then fallback
  for (const q of [query, fallback].filter(Boolean)) {
    try {
      const r = await axios.get(`https://archive.org/wayback/available?url=${q}`, { timeout: 10000 });
      const snap = r.data?.archived_snapshots?.closest;
      if (snap?.available) { console.log(`  Wayback found: ${snap.url.slice(0, 80)}`); return snap.url; }
    } catch {}
    await sleep(2000);
  }
  return null;
}

function isProductImg(url) {
  const lower = url.toLowerCase();
  if (/\.(svg|gif|ico)$/i.test(url)) return false;
  if (/logo|icon|sprite|pixel|tracking|payment|favicon|banner|placeholder/i.test(lower)) return false;
  if (url.length < 50) return false;
  return /\.(jpg|jpeg|png|webp)/i.test(url) ||
    url.includes('/product') || url.includes('/item') ||
    url.includes('cdn') || url.includes('image') || url.includes('media');
}

async function fetchBrowser(page, urls, filterFn = isProductImg) {
  const captured = new Set();
  page.on('request', req => {
    if (req.resourceType() === 'image') {
      const u = req.url().split('?')[0];
      if (filterFn(u)) captured.add(u);
    }
  });
  for (const url of urls) {
    try {
      await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 25000 });
      for (let i = 0; i < 4; i++) { await page.evaluate(() => window.scrollBy(0, window.innerHeight)); await sleep(500); }
      await sleep(1500);
      if (captured.size >= N * 3) break;
    } catch (e) { console.log(`  nav err: ${e.message.slice(0,50)}`); }
  }
  return [...captured];
}

async function fetchZozo(page, query) {
  // ZOZOTOWN Japan - good for Japanese brands
  const captured = new Set();
  page.on('request', req => {
    if (req.resourceType() === 'image') {
      const u = req.url().split('?')[0];
      if (/\.(jpg|jpeg|png|webp)/i.test(u) && u.includes('zozo') && !u.includes('logo')) captured.add(u);
    }
  });
  const url = `https://zozo.jp/search/?p_search=${encodeURIComponent(query)}&mno=&soco=&img=1`;
  try {
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 25000 });
    for (let i = 0; i < 4; i++) { await page.evaluate(() => window.scrollBy(0, window.innerHeight)); await sleep(500); }
    await sleep(2000);
  } catch {}
  return [...captured];
}

async function downloadImage(url, destPath) {
  try {
    const r = await axios.get(url, {
      responseType: 'stream', timeout: 20000,
      headers: { 'User-Agent': 'Mozilla/5.0', Referer: 'https://web.archive.org/' },
      maxRedirects: 5,
    });
    const ct = r.headers['content-type'] || '';
    if (!ct.includes('image') && !ct.includes('octet-stream')) throw new Error('not image');
    await pipeline(r.data, createWriteStream(destPath));
    const s = await fs.stat(destPath);
    if (s.size < 4000) { await fs.remove(destPath); throw new Error('too small'); }
    return true;
  } catch { await fs.remove(destPath).catch(() => {}); return false; }
}

async function save(id, urls, startCount) {
  let n = startCount;
  const dir = path.join(IMAGES_DIR, id);
  for (const url of urls) {
    if (n >= N) break;
    const ext = url.match(/\.(jpg|jpeg|png|webp)$/i)?.[1] || 'jpg';
    const ok = await downloadImage(url, path.join(dir, `${String(n+1).padStart(2,'0')}.${ext}`));
    if (ok) n++;
  }
  return n;
}

async function main() {
  let progress = {};
  try { progress = JSON.parse(await fs.readFile(PROGRESS_FILE, 'utf8')); } catch {}

  const toRun = CONFIGS.filter(c => (progress[c.id]?.count || 0) < N);
  console.log(`\n🔄 Retry fetch for ${toRun.length} brands...\n`);

  const browser = await chromium.launch({ executablePath: EDGE, headless: true, args: ['--no-sandbox', '--disable-gpu'] });
  let fetched = 0;

  for (let i = 0; i < toRun.length; i++) {
    const cfg = toRun[i];
    const dir = path.join(IMAGES_DIR, cfg.id);
    await fs.ensureDir(dir);
    const existing = (await fs.readdir(dir)).filter(f => /\.(jpg|jpeg|png|webp)$/i.test(f)).length;
    console.log(`[${i+1}/${toRun.length}] ${cfg.id} — prev: ${existing}`);

    const page = await browser.newPage();
    page.setDefaultTimeout(30000);
    let urls = [];

    try {
      if (cfg.strategy === 'direct') {
        urls = await fetchBrowser(page, cfg.urls, cfg.filter);
      } else if (cfg.strategy === 'wayback') {
        // Wait to avoid rate limiting
        if (i > 0) { console.log('  (waiting 8s for rate limit...)'); await sleep(8000); }
        const waybackUrl = await getWaybackUrl(cfg.waybackQuery, cfg.fallbackQuery);
        if (waybackUrl) {
          urls = await fetchBrowser(page, [waybackUrl]);
        } else {
          console.log('  No Wayback snapshot');
        }
      } else if (cfg.strategy === 'zozo') {
        urls = await fetchZozo(page, cfg.zozoQuery);
      }

      console.log(`  intercepted: ${urls.length}`);
      const count = await save(cfg.id, urls, existing);
      progress[cfg.id] = { count, method: count > existing ? cfg.strategy : 'failed' };
      await fs.writeFile(PROGRESS_FILE, JSON.stringify(progress, null, 2));

      if (count >= N) { console.log(`  ✅ ${count} images`); fetched++; }
      else if (count > existing) { console.log(`  ⚠️ ${count}/${N} partial`); }
      else { console.log('  ✗ no new images'); }

    } catch (e) {
      console.error('  ERROR:', e.message.slice(0, 80));
    } finally {
      await page.close().catch(() => {});
    }
  }

  await browser.close();

  const total = Object.values(progress).filter(p => p.count >= N).length;
  const failed = CONFIGS.filter(c => (progress[c.id]?.count || 0) < N).map(c => c.id);
  console.log(`\n✅ Result: ${fetched} newly fetched`);
  console.log(`   Total full: ${total}/67`);
  if (failed.length) console.log(`   Still failed: ${failed.join(', ')}`);
}

main().catch(e => { console.error('Fatal:', e.message); process.exit(1); });
