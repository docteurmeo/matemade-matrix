/**
 * Fetch images từ Lyst.com — fashion aggregator, works well for EU/JP brands
 * CDN: cdna.lystit.com — serves product images at 300x375
 */
import { chromium } from 'playwright-core';
import axios from 'axios';
import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';
import { createWriteStream } from 'fs';
import { pipeline } from 'stream/promises';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
const IMAGES_DIR = path.join(ROOT, 'images');
const BRANDS_FILE = path.join(ROOT, 'data', 'brands.json');
const PROGRESS_FILE = path.join(ROOT, 'data', 'fetch-progress.json');
const EDGE_PATH = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const N = 4;

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

// Lyst URL slugs — test multiple patterns per brand
const LYST_CONFIGS = {
  'jacquemus':      ['jacquemus-bags', 'jacquemus'],
  'sezane':         ['sezane-bags', 'sezane', 'sezane-accessories'],
  'cos':            ['cos-bags', 'cos'],
  'wandler':        ['wandler-bags', 'wandler'],
  'other-stories':  ['other-stories-bags', 'and-other-stories-bags', 'other-stories'],
  'hunting-season': ['hunting-season-bags', 'hunting-season'],
  'vasic':          ['vasic-bags', 'vasic'],
  'flore-paris':    ['flore-paris-bags', 'flore-paris'],
  'a-wang':         ['alexander-wang-bags', 'alexander-wang'],
  'cou-cou':        ['cou-cou-intimates-bags', 'cou-cou-intimates'],
  'tod-s':          ['tods-bags', 'tod-s-bags', 'tod-s'],
  'hender-scheme':  ['hender-scheme-bags', 'hender-scheme'],
  'aeta':           ['aeta-bags', 'aeta'],
  'porter':         ['porter-bags', 'yoshida-porter-bags', 'porter-yoshida-kaban'],
  'wood-wood':      ['wood-wood-bags', 'wood-wood'],
  'lak-store':      ['lak-bags', 'lak-store'],
  'the-wayward':    ['the-wayward-bags', 'the-wayward'],
  'andgather':      ['andgather-bags', 'andgather'],
  'saabi':          ['saabi-bags', 'saabi'],
  'floral-punk':    ['floral-punk-bags', 'floral-punk'],
  'chau-fifth':     ['chau-fifth-bags', 'chau-fifth'],
};

async function fetchLyst(page, brandId) {
  const slugs = LYST_CONFIGS[brandId] || [];
  const captured = new Set();

  const listener = req => {
    if (req.resourceType() === 'image') {
      const u = req.url().split('?')[0];
      if (u.includes('lystit.com') && /\.(jpg|jpeg|png|webp)/i.test(u) &&
          !/logo|icon|banner|flag/i.test(u)) {
        captured.add(u);
      }
    }
  };
  page.on('request', listener);

  for (const slug of slugs) {
    const url = `https://www.lyst.com/shop/${slug}/`;
    try {
      await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 20000 });
      const title = await page.title().catch(() => '');
      // Skip 404/redirect pages
      if (title.includes('no longer') || title.includes('404') || title.includes('Error')) {
        console.log(`    ${slug}: page not found`);
        continue;
      }
      if (title.includes('moment') || title.includes('Cloudflare')) {
        console.log(`    ${slug}: Cloudflare, waiting...`);
        await sleep(5000);
        // Try again after wait
        for (let i = 0; i < 3; i++) {
          await page.evaluate(() => window.scrollBy(0, window.innerHeight));
          await sleep(600);
        }
      } else {
        console.log(`    ${slug}: "${title.slice(0, 50)}"`);
        for (let i = 0; i < 5; i++) {
          await page.evaluate(() => window.scrollBy(0, window.innerHeight));
          await sleep(500);
        }
        await sleep(1500);
      }
      if (captured.size >= N * 3) break;
    } catch (e) {
      console.log(`    ${slug}: ${e.message.slice(0, 50)}`);
    }
    await sleep(500);
  }

  page.off('request', listener);
  return [...captured];
}

async function downloadImage(url, destPath) {
  try {
    const r = await axios.get(url, {
      responseType: 'stream', timeout: 20000,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        'Referer': 'https://www.lyst.com/',
      },
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

async function main() {
  const { brands } = JSON.parse(await fs.readFile(BRANDS_FILE, 'utf8'));
  let progress = {};
  try { progress = JSON.parse(await fs.readFile(PROGRESS_FILE, 'utf8')); } catch {}

  const toProcess = brands.filter(b => {
    const p = progress[b.id];
    return (!p || p.count < N) && LYST_CONFIGS[b.id];
  });

  console.log(`\n🛍  Lyst fetch for ${toProcess.length} brands...\n`);

  const browser = await chromium.launch({
    executablePath: EDGE_PATH,
    headless: true,
    args: ['--no-sandbox', '--disable-gpu'],
  });

  let fetched = 0;
  const stillFailed = [];

  for (let i = 0; i < toProcess.length; i++) {
    const brand = toProcess[i];
    const brandDir = path.join(IMAGES_DIR, brand.id);
    await fs.ensureDir(brandDir);
    const existing = (await fs.readdir(brandDir)).filter(f => /\.(jpg|jpeg|png|webp)$/i.test(f)).length;
    console.log(`[${i + 1}/${toProcess.length}] ${brand.name} — prev: ${existing}`);

    const page = await browser.newPage({
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
    });

    try {
      const urls = await fetchLyst(page, brand.id);
      console.log(`  intercepted: ${urls.length}`);

      let downloaded = existing;
      for (const url of urls) {
        if (downloaded >= N) break;
        const ext = url.match(/\.(jpg|jpeg|png|webp)$/i)?.[1] || 'jpg';
        const dest = path.join(brandDir, `${String(downloaded + 1).padStart(2, '0')}.${ext}`);
        const ok = await downloadImage(url, dest);
        if (ok) downloaded++;
      }

      progress[brand.id] = { count: downloaded, method: downloaded > existing ? 'lyst' : 'failed' };
      await fs.writeFile(PROGRESS_FILE, JSON.stringify(progress, null, 2));

      if (downloaded >= N) { console.log(`  ✅ ${downloaded} images`); fetched++; }
      else if (downloaded > existing) { console.log(`  ⚠️  ${downloaded}/${N} partial`); }
      else { console.log('  ✗ no new images'); stillFailed.push(brand.id); }

    } catch (e) {
      console.error(`  ERROR: ${e.message.slice(0, 80)}`);
      stillFailed.push(brand.id);
    } finally {
      await page.close().catch(() => {});
    }

    await sleep(2000); // Be polite to Lyst
  }

  await browser.close();

  const total = Object.values(progress).filter(p => p.count >= N).length;
  console.log(`\n✅ Lyst result: ${fetched} newly fetched`);
  console.log(`   Total full brands: ${total}/67`);
  if (stillFailed.length) console.log(`   Still failed: ${stillFailed.join(', ')}`);

  // Final cleanup of temp test files
  const testFiles = ['test-wayback2.mjs','test-wayback3.mjs','test-direct.mjs','test-retailers.mjs','test-farfetch.mjs','test-aggregators.mjs'];
  for (const f of testFiles) {
    await fs.remove(path.join(ROOT, f)).catch(() => {});
  }
}

main().catch(e => { console.error('Fatal:', e.message); process.exit(1); });
