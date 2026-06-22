/**
 * Search-based image fetch dùng browser (tránh bị block)
 * - Korean brands → Naver Image Search
 * - VN + global brands → DuckDuckGo Images (browser handles cookies)
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
const FAILED_FILE = path.join(ROOT, 'data', 'fetch-failed.json');
const EDGE_PATH = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';

const IMAGES_PER_BRAND = 4;

// Custom search queries
const SEARCH_QUERIES = {
  'stand-oil':    { naver: 'standoil 백 스탠드오일 가방', ddg: 'Stand Oil Korea bag product' },
  'matin-kim':    { naver: '마뗑킴 가방 매틴킴', ddg: 'Matin Kim Korea bag tote' },
  'marhen-j':     { naver: '마르헨제이 가방', ddg: 'Marhen J Korea bag product' },
  '87mm':         { naver: '87mm 가방 백', ddg: '87mm Korea bag streetwear' },
  'noirer':       { naver: '노이어 가방 백', ddg: 'Noirer Korea bag product' },
  'andersson-bell':{ naver: '앤더슨벨 가방', ddg: 'Andersson Bell Korea bag' },
  'second-layer': { naver: '세컨레이어 가방', ddg: 'Second Layer Korea bag' },
  'juno':         { ddg: 'Juno Vietnam túi xách bag', google: false },
  'lak-store':    { ddg: 'Lak Store Vietnam minimal bag tote' },
  'the-wayward':  { ddg: 'The Wayward Vietnam bag leather minimal' },
  'andgather':    { ddg: 'Andgather Vietnam túi xách bag' },
  'saabi':        { ddg: 'Saabi Vietnam bag túi xách' },
  'floral-punk':  { ddg: 'Floral Punk Vietnam túi xách bag bold' },
  'chau-fifth':   { ddg: 'Chau Fifth Vietnam túi xách bag fashion' },
  'wandler':      { ddg: 'Wandler bag geometric Dutch leather 2024' },
  'jacquemus':    { ddg: 'Jacquemus Le Chiquito bag product editorial' },
  'hunting-season':{ ddg: 'Hunting Season bag exotic leather product' },
  'sezane':       { ddg: 'Sezane bag French romantic leather tote' },
  'other-stories':{ ddg: 'Other Stories bag structured minimal editorial' },
  'cos':          { ddg: 'COS bag minimal functional leather tote' },
  'loewe':        { ddg: 'Loewe Puzzle bag leather product photography' },
  'hender-scheme':{ ddg: 'Hender Scheme Japan leather natural bag' },
  'aeta':         { ddg: 'Aeta Japan leather minimal tote bag' },
  'porter':       { ddg: 'Porter Yoshida Japan nylon bag functional' },
  'vasic':        { ddg: 'Vasic Bridge bag structured minimal' },
  'tod-s':        { ddg: "Tod's Di Bag leather Italian heritage" },
  'flore-paris':  { ddg: 'Flore Paris bag contemporary minimal' },
  'savette':      { ddg: 'Savette Duo bag minimal investment piece' },
  'a-wang':       { ddg: 'Alexander Wang bag Rockie leather downtown' },
  'cou-cou':      { ddg: 'Cou Cou Intimates bag soft feminine indie' },
  'wood-wood':    { ddg: 'Wood Wood Copenhagen bag streetwear minimal' },
};

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

// Naver Image Search (Korean search engine, great for Korean brands)
async function naverImageSearch(page, query) {
  try {
    const url = `https://search.naver.com/search.naver?where=image&query=${encodeURIComponent(query)}&sm=tab_hty`;
    await page.goto(url, { waitUntil: 'networkidle', timeout: 20000 });
    await page.waitForTimeout(2000);

    const urls = await page.evaluate(() => {
      const imgs = document.querySelectorAll('img[src*="phinf"], img[src*="blogfiles"], img[src*="static"], img[data-lazy-src]');
      const results = new Set();
      imgs.forEach(img => {
        const src = img.src || img.dataset?.lazySrc || img.dataset?.src || '';
        if (src.startsWith('http') && !src.includes('thumbnail') && src.length > 40) {
          results.add(src.split('?')[0]);
        }
      });
      // Also grab from data-json attributes
      document.querySelectorAll('[data-json]').forEach(el => {
        try {
          const d = JSON.parse(el.dataset.json);
          if (d.imageUrl) results.add(d.imageUrl);
          if (d.orgUrl) results.add(d.orgUrl);
        } catch {}
      });
      return [...results].slice(0, 20);
    });

    return urls.filter(u => /\.(jpg|jpeg|png|webp)/i.test(u));
  } catch (err) {
    console.warn(`    Naver search failed: ${err.message.slice(0, 60)}`);
    return [];
  }
}

// DuckDuckGo Images via headless browser (handles JS/cookies properly)
async function ddgImageSearch(page, query) {
  try {
    // Navigate to DDG images
    const url = `https://duckduckgo.com/?q=${encodeURIComponent(query)}&iax=images&ia=images`;
    await page.goto(url, { waitUntil: 'networkidle', timeout: 20000 });
    await page.waitForTimeout(3000);

    // Click on image results to load them
    const urls = await page.evaluate(() => {
      const results = new Set();

      // DDG renders images in various ways
      document.querySelectorAll('img[src*="http"]').forEach(img => {
        const src = img.src;
        if (src && !src.includes('duckduckgo') && !src.includes('google') &&
            !src.includes('icon') && src.length > 50) {
          results.add(src.split('?')[0]);
        }
      });

      // Also check for data attributes
      document.querySelectorAll('[data-src]').forEach(el => {
        const src = el.dataset.src;
        if (src?.startsWith('http') && !src.includes('duckduckgo')) {
          results.add(src.split('?')[0]);
        }
      });

      // Extract from inline JSON/script tags
      const scripts = document.querySelectorAll('script');
      scripts.forEach(s => {
        const text = s.textContent || '';
        const matches = text.match(/"image":"(https:[^"]+)"/g) || [];
        matches.forEach(m => {
          const url = m.match(/"image":"([^"]+)"/)?.[1];
          if (url) results.add(url);
        });
      });

      return [...results].slice(0, 25);
    });

    const imageUrls = urls.filter(u => /\.(jpg|jpeg|png|webp)/i.test(u) || u.includes('image'));
    return imageUrls;
  } catch (err) {
    console.warn(`    DDG search failed: ${err.message.slice(0, 60)}`);
    return [];
  }
}

async function downloadImage(url, destPath) {
  try {
    const res = await axios.get(url, {
      responseType: 'stream',
      timeout: 20000,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        'Referer': 'https://duckduckgo.com/',
      },
      maxRedirects: 5,
    });
    const ct = res.headers['content-type'] || '';
    if (!ct.includes('image') && !ct.includes('octet-stream')) throw new Error('Not image');
    await pipeline(res.data, createWriteStream(destPath));
    const stat = await fs.stat(destPath);
    if (stat.size < 5000) { await fs.remove(destPath); throw new Error('Too small'); }
    return true;
  } catch {
    await fs.remove(destPath).catch(() => {});
    return false;
  }
}

async function fetchBrand(brand, page) {
  const brandDir = path.join(IMAGES_DIR, brand.id);
  await fs.ensureDir(brandDir);

  const existing = (await fs.readdir(brandDir)).filter(f => /\.(jpg|jpeg|png|webp)$/i.test(f));
  if (existing.length >= IMAGES_PER_BRAND) return { count: existing.length, method: 'cached' };

  const config = SEARCH_QUERIES[brand.id] || { ddg: `${brand.name} bag product photography 2024` };
  let imageUrls = [];
  let method = '';

  // Korean brands: try Naver first
  if (config.naver) {
    console.log(`    → Naver: "${config.naver}"`);
    imageUrls = await naverImageSearch(page, config.naver);
    if (imageUrls.length > 0) method = 'naver';
    await page.goto('about:blank').catch(() => {});
    await sleep(1000);
  }

  // DuckDuckGo fallback
  if (imageUrls.length < IMAGES_PER_BRAND && config.ddg) {
    console.log(`    → DuckDuckGo: "${config.ddg}"`);
    const ddgUrls = await ddgImageSearch(page, config.ddg);
    imageUrls = [...imageUrls, ...ddgUrls];
    if (!method && ddgUrls.length > 0) method = 'ddg';
    await page.goto('about:blank').catch(() => {});
    await sleep(1000);
  }

  if (imageUrls.length === 0) return { count: existing.length, method: 'failed' };

  let downloaded = existing.length;
  for (const url of imageUrls) {
    if (downloaded >= IMAGES_PER_BRAND) break;
    const ext = url.match(/\.(jpg|jpeg|png|webp)$/i)?.[1] || 'jpg';
    const dest = path.join(brandDir, `${String(downloaded + 1).padStart(2, '0')}.${ext}`);
    const ok = await downloadImage(url, dest);
    if (ok) downloaded++;
  }

  return { count: downloaded, method: downloaded > existing.length ? method : 'failed' };
}

async function main() {
  const { brands } = JSON.parse(await fs.readFile(BRANDS_FILE, 'utf8'));
  let progress = {};
  try { progress = JSON.parse(await fs.readFile(PROGRESS_FILE, 'utf8')); } catch {}

  const toProcess = brands.filter(b => {
    const p = progress[b.id];
    return (!p || p.count < IMAGES_PER_BRAND) && SEARCH_QUERIES[b.id];
  });

  console.log(`\n🔍 Search-based fetch for ${toProcess.length} brands...\n`);
  console.log('Strategies: Naver (Korean) → DuckDuckGo (global)\n');

  const browser = await chromium.launch({
    executablePath: EDGE_PATH,
    headless: true,
    args: ['--no-sandbox', '--disable-dev-shm-usage', '--disable-gpu'],
  });

  const context = await browser.newContext({
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
    locale: 'ko-KR',
    viewport: { width: 1280, height: 900 },
    extraHTTPHeaders: { 'Accept-Language': 'ko-KR,ko;q=0.9,en-US;q=0.8' },
  });
  const page = await context.newPage();

  let fetched = 0;
  const stillFailed = [];

  for (let i = 0; i < toProcess.length; i++) {
    const brand = toProcess[i];
    const prev = progress[brand.id]?.count || 0;
    console.log(`[${i + 1}/${toProcess.length}] ${brand.name} (${brand.origin}) — prev: ${prev} imgs`);

    try {
      const result = await fetchBrand(brand, page);
      progress[brand.id] = result;
      await fs.writeFile(PROGRESS_FILE, JSON.stringify(progress, null, 2));

      if (result.count >= IMAGES_PER_BRAND) {
        console.log(`  ✅ ${result.count} images (${result.method})`);
        fetched++;
      } else if (result.count > prev) {
        console.log(`  ⚠️  ${result.count}/${IMAGES_PER_BRAND} partial (${result.method})`);
      } else {
        console.log(`  ✗ still 0`);
        stillFailed.push(brand.id);
      }
    } catch (err) {
      console.error(`  ERROR: ${err.message.slice(0, 80)}`);
      stillFailed.push(brand.id);
    }

    await sleep(2000);
  }

  await browser.close();
  await fs.writeFile(FAILED_FILE, JSON.stringify(stillFailed, null, 2));

  const total = Object.values(progress).filter(p => p.count >= IMAGES_PER_BRAND).length;
  console.log(`\n✅ Done:`);
  console.log(`   Newly fetched: ${fetched}`);
  console.log(`   Total full brands: ${total}/${brands.length}`);
  console.log(`   Still need manual: ${stillFailed.length}`);
  if (stillFailed.length > 0) {
    console.log('\n📋 Remaining manual:');
    stillFailed.forEach(id => console.log(`   images/${id}/`));
  }
}

main().catch(err => { console.error('Fatal:', err.message); process.exit(1); });
