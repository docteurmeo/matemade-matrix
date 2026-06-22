/**
 * Image fetcher dùng network request interception
 * Browser load trang thật → intercept tất cả image requests → lấy URL gốc
 * Không phụ thuộc vào DOM selectors hay lazy loading
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
const IMAGES_PER_BRAND = 4;

// URLs to visit per brand — try multiple if first fails
const BRAND_URLS = {
  // VN brands — try various URL patterns
  'juno':         ['https://juno.vn/tui-xach', 'https://juno.vn/tui-xach-nu', 'https://juno.vn'],
  'lak-store':    ['https://lakstore.vn/collections', 'https://lakstore.vn/shop', 'https://lakstore.vn'],
  'the-wayward':  ['https://thewayward.vn/collections/all', 'https://thewayward.vn/shop', 'https://thewayward.vn'],
  'andgather':    ['https://andgather.vn/collections/all', 'https://andgather.vn'],
  'saabi':        ['https://saabi.vn/collections/all', 'https://saabi.vn'],
  'floral-punk':  ['https://floralpunk.vn/collections/all', 'https://floralpunk.vn'],
  'chau-fifth':   ['https://chaufifth.com/collections/all', 'https://chaufifth.com/tui-xach', 'https://chaufifth.com'],
  // Korean brands
  'stand-oil':    ['https://www.standoil.co.kr/category/bag', 'https://www.standoil.co.kr/category/all'],
  'matin-kim':    ['https://matinkim.com/category/bag', 'https://matinkim.com/category/all', 'https://matinkim.com'],
  'marhen-j':     ['https://www.marhenj.com/shop/bag', 'https://www.marhenj.com/shop', 'https://www.marhenj.com'],
  '87mm':         ['https://87mm.co.kr/category/bag', 'https://87mm.co.kr'],
  'noirer':       ['https://noirer.com/collections/bag', 'https://noirer.com/shop', 'https://noirer.com'],
  'andersson-bell':['https://www.anderssonbell.com/shop/bag', 'https://www.anderssonbell.com'],
  'second-layer': ['https://secondlayer.co.kr/shop', 'https://secondlayer.co.kr'],
  // Global brands — alternative URLs
  'wandler':      ['https://wandler.eu/collections/bags', 'https://wandler.eu'],
  'jacquemus':    ['https://www.jacquemus.com/en/bags', 'https://eu.jacquemus.com/en/bags'],
  'hunting-season':['https://www.huntingseason.com/collections/bags'],
  'sezane':       ['https://www.sezane.com/en/bags', 'https://www.sezane.com/en/result?universe=6'],
  'other-stories':['https://www.stories.com/en_eur/accessories/bags/all'],
  'cos':          ['https://www.cosstores.com/en_gbp/women/bags', 'https://www.cos.com/en_gbp/women/bags'],
  'loewe':        ['https://www.loewe.com/int/en/women/bags', 'https://www.loewe.com/int/en/bags'],
  'hender-scheme':['https://hender-scheme.com/category/bag', 'https://hender-scheme.com'],
  'aeta':         ['https://www.aeta.jp/en', 'https://www.aeta.jp'],
  'porter':       ['https://www.yoshidakaban.com/en', 'https://www.yoshidakaban.com'],
  'vasic':        ['https://vasic.co/collections/bags', 'https://vasic.co'],
  'tod-s':        ['https://www.tods.com/en/handbags', 'https://www.tods.com/en/women/bags'],
  'flore-paris':  ['https://floreparis.com/collections/bags'],
  'savette':      ['https://savette.com/collections/bags', 'https://savette.com'],
  'a-wang':       ['https://www.alexanderwang.com/en-us/women/bags', 'https://www.alexanderwang.com/en-us/bags'],
  'cou-cou':      ['https://coucouintimate.com/collections/accessories', 'https://coucouintimate.com'],
  'wood-wood':    ['https://www.woodwood.com/collections/bags', 'https://www.woodwood.com/collections/accessories'],
};

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

function isProductImage(url) {
  const lower = url.toLowerCase();
  // Skip: icons, logos, sprites, tiny images, tracking pixels
  if (lower.includes('logo') || lower.includes('icon') || lower.includes('sprite') ||
      lower.includes('pixel') || lower.includes('tracking') || lower.includes('avatar') ||
      lower.includes('favicon') || lower.includes('banner')) return false;
  // Skip: very short URLs (likely icons)
  if (url.length < 40) return false;
  // Prefer: CDN urls, image paths
  return /\.(jpg|jpeg|png|webp)/i.test(url) ||
         url.includes('/product') || url.includes('/item') ||
         url.includes('cdn') || url.includes('image') || url.includes('media');
}

async function interceptFetch(page, urls) {
  const captured = new Set();

  // Set up request interception BEFORE navigating
  page.on('request', req => {
    if (req.resourceType() === 'image') {
      const url = req.url().split('?')[0];
      if (isProductImage(url)) captured.add(url);
    }
  });

  // Also intercept responses to get actual image data URLs
  page.on('response', async res => {
    try {
      const ct = res.headers()['content-type'] || '';
      if (ct.includes('image/') && !ct.includes('svg')) {
        const url = res.url().split('?')[0];
        if (isProductImage(url)) captured.add(url);
      }
    } catch {}
  });

  for (const url of urls) {
    try {
      console.log(`    → ${url}`);
      await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 20000 });

      // Scroll down to trigger lazy loading
      for (let i = 0; i < 4; i++) {
        await page.evaluate(() => window.scrollBy(0, window.innerHeight));
        await sleep(600);
      }
      await sleep(1500); // Wait for lazy-loaded images

      if (captured.size >= IMAGES_PER_BRAND * 3) break;
    } catch (err) {
      console.warn(`    ✗ ${url}: ${err.message.slice(0, 50)}`);
    }
    await sleep(500);
  }

  return [...captured];
}

async function downloadImage(url, destPath) {
  try {
    const res = await axios.get(url, {
      responseType: 'stream',
      timeout: 20000,
      headers: { 'User-Agent': 'Mozilla/5.0', 'Referer': 'https://www.google.com/' },
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

async function fetchBrand(brand, browser) {
  const brandDir = path.join(IMAGES_DIR, brand.id);
  await fs.ensureDir(brandDir);

  const existing = (await fs.readdir(brandDir)).filter(f => /\.(jpg|jpeg|png|webp)$/i.test(f));
  if (existing.length >= IMAGES_PER_BRAND) return { count: existing.length, method: 'cached' };

  const urls = BRAND_URLS[brand.id] || [];
  if (urls.length === 0) return { count: existing.length, method: 'no-config' };

  // Fresh page for each brand (clean request log)
  const page = await browser.newPage();
  page.setDefaultTimeout(25000);

  try {
    const imageUrls = await interceptFetch(page, urls);
    console.log(`    Intercepted ${imageUrls.length} image URLs`);

    let downloaded = existing.length;
    for (const url of imageUrls) {
      if (downloaded >= IMAGES_PER_BRAND) break;
      const ext = url.match(/\.(jpg|jpeg|png|webp)$/i)?.[1] || 'jpg';
      const dest = path.join(brandDir, `${String(downloaded + 1).padStart(2, '0')}.${ext}`);
      const ok = await downloadImage(url, dest);
      if (ok) downloaded++;
    }

    return { count: downloaded, method: downloaded > existing.length ? 'intercept' : 'failed' };
  } finally {
    await page.close().catch(() => {});
  }
}

async function main() {
  const { brands } = JSON.parse(await fs.readFile(BRANDS_FILE, 'utf8'));
  let progress = {};
  try { progress = JSON.parse(await fs.readFile(PROGRESS_FILE, 'utf8')); } catch {}

  const toProcess = brands.filter(b => {
    const p = progress[b.id];
    return (!p || p.count < IMAGES_PER_BRAND) && BRAND_URLS[b.id];
  });

  console.log(`\n📡 Network-intercept fetch for ${toProcess.length} brands...\n`);

  const browser = await chromium.launch({
    executablePath: EDGE_PATH,
    headless: true,
    args: ['--no-sandbox', '--disable-dev-shm-usage', '--disable-gpu'],
  });

  let fetched = 0;
  const stillFailed = [];

  for (let i = 0; i < toProcess.length; i++) {
    const brand = toProcess[i];
    const prev = progress[brand.id]?.count || 0;
    console.log(`[${i + 1}/${toProcess.length}] ${brand.name} (${brand.origin}) — prev: ${prev}`);

    try {
      const result = await fetchBrand(brand, browser);
      progress[brand.id] = result;
      await fs.writeFile(PROGRESS_FILE, JSON.stringify(progress, null, 2));

      if (result.count >= IMAGES_PER_BRAND) {
        console.log(`  ✅ ${result.count} images (${result.method})`);
        fetched++;
      } else if (result.count > prev) {
        console.log(`  ⚠️  ${result.count}/${IMAGES_PER_BRAND} partial`);
      } else {
        console.log(`  ✗ 0 images`);
        stillFailed.push(brand.id);
      }
    } catch (err) {
      console.error(`  ERROR: ${err.message.slice(0, 80)}`);
      stillFailed.push(brand.id);
    }

    await sleep(1500);
  }

  await browser.close();
  await fs.writeFile(path.join(ROOT, 'data', 'fetch-failed.json'), JSON.stringify(stillFailed, null, 2));

  const total = Object.values(progress).filter(p => p.count >= IMAGES_PER_BRAND).length;
  console.log(`\n✅ Done: ${fetched} newly fetched, ${total}/${brands.length} total full`);
  if (stillFailed.length > 0) {
    console.log(`\n📋 Manual needed (${stillFailed.length}): ${stillFailed.join(', ')}`);
  }
}

main().catch(err => { console.error('Fatal:', err.message); process.exit(1); });
