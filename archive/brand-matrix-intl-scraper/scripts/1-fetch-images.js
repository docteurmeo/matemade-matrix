/**
 * Brand image fetcher
 * Strategy (in order of preference):
 *   1. Shopify JSON API — works for Polène, By Far, Staud, Ganni, Sandy Liang, etc.
 *   2. HTML scraping with Cheerio — generic fallback
 *   3. Manual fallback — records which brands need manual images
 */
import axios from 'axios';
import * as cheerio from 'cheerio';
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

const IMAGES_PER_BRAND = 4;
const DELAY_MS = 1200;

const HEADERS = {
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36',
  'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
  'Accept-Language': 'en-US,en;q=0.9',
  'Accept-Encoding': 'gzip, deflate, br',
};

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

// Strategy 1: Shopify Products JSON API (no auth required, public endpoint)
async function tryShopifyApi(brand) {
  try {
    const base = new URL(brand.website).origin;
    const res = await axios.get(`${base}/products.json`, {
      params: { limit: 10, page: 1 },
      headers: HEADERS,
      timeout: 12000,
    });

    const products = res.data?.products || [];
    if (products.length === 0) return [];

    const urls = [];
    for (const product of products.slice(0, 6)) {
      for (const img of (product.images || []).slice(0, 2)) {
        if (img.src && !img.src.includes('no-image')) {
          // Get a medium-sized version
          const url = img.src.replace(/(\.[^.]+)$/, '_800x800$1').split('?')[0];
          urls.push(url);
          if (urls.length >= IMAGES_PER_BRAND * 2) return urls;
        }
      }
    }
    return urls;
  } catch {
    return [];
  }
}

// Strategy 2: HTML scraping
async function tryHtmlScraping(brand) {
  try {
    const url = brand.shopUrl || brand.website;
    const res = await axios.get(url, {
      headers: HEADERS,
      timeout: 15000,
      maxRedirects: 5,
    });

    const $ = cheerio.load(res.data);
    const candidates = new Set();

    // Common product image selectors
    const selectors = [
      'img[class*="product"]',
      'img[class*="item"]',
      'img[class*="card"]',
      '.product-card img',
      '.product-item img',
      '.product-thumbnail img',
      'article img',
      '[class*="collection"] img',
      '[class*="grid"] img',
    ];

    for (const sel of selectors) {
      $(sel).each((_, el) => {
        const src = $(el).attr('src') || $(el).attr('data-src') || $(el).attr('data-lazy-src');
        if (src && src.startsWith('http') && src.includes('cdn') || src?.includes('image')) {
          if (!src.includes('logo') && !src.includes('icon') && !src.includes('avatar')) {
            candidates.add(src.split('?')[0]);
          }
        }
      });
    }

    // Also check srcset
    $('img').each((_, el) => {
      const srcset = $(el).attr('srcset');
      if (srcset) {
        const firstSrc = srcset.split(',')[0].trim().split(' ')[0];
        if (firstSrc?.startsWith('http')) candidates.add(firstSrc.split('?')[0]);
      }
    });

    return [...candidates].slice(0, IMAGES_PER_BRAND * 2);
  } catch {
    return [];
  }
}

async function downloadImage(url, destPath, referer) {
  try {
    const res = await axios.get(url, {
      responseType: 'stream',
      timeout: 20000,
      headers: { ...HEADERS, Referer: referer || url },
      maxRedirects: 5,
    });

    const ct = res.headers['content-type'] || '';
    if (!ct.includes('image') && !ct.includes('octet-stream')) {
      throw new Error(`Not image: ${ct}`);
    }

    await pipeline(res.data, createWriteStream(destPath));
    const stat = await fs.stat(destPath);
    if (stat.size < 3000) {
      await fs.remove(destPath);
      throw new Error('Too small');
    }
    return true;
  } catch (err) {
    await fs.remove(destPath).catch(() => {});
    return false;
  }
}

async function fetchBrandImages(brand) {
  const brandDir = path.join(IMAGES_DIR, brand.id);
  await fs.ensureDir(brandDir);

  const existing = (await fs.readdir(brandDir)).filter(f => /\.(jpg|jpeg|png|webp)$/i.test(f));
  if (existing.length >= IMAGES_PER_BRAND) {
    console.log(`  ✓ ${brand.name}: ${existing.length} images already cached`);
    return { count: existing.length, method: 'cached' };
  }

  // Try Shopify first
  let imageUrls = await tryShopifyApi(brand);
  let method = 'shopify';

  if (imageUrls.length === 0) {
    imageUrls = await tryHtmlScraping(brand);
    method = 'html';
  }

  if (imageUrls.length === 0) {
    console.warn(`  ✗ ${brand.name}: no images found — needs manual download`);
    return { count: 0, method: 'failed' };
  }

  let downloaded = existing.length;
  const referer = brand.website;

  for (const url of imageUrls) {
    if (downloaded >= IMAGES_PER_BRAND) break;
    const ext = url.match(/\.(jpg|jpeg|png|webp)$/i)?.[1] || 'jpg';
    const dest = path.join(brandDir, `${String(downloaded + 1).padStart(2, '0')}.${ext}`);
    const ok = await downloadImage(url, dest, referer);
    if (ok) downloaded++;
    await sleep(200);
  }

  console.log(`  ${downloaded > 0 ? '✓' : '✗'} ${brand.name}: ${downloaded}/${IMAGES_PER_BRAND} images (via ${method})`);
  return { count: downloaded, method };
}

async function main() {
  const { brands } = JSON.parse(await fs.readFile(BRANDS_FILE, 'utf8'));
  await fs.ensureDir(IMAGES_DIR);

  let progress = {};
  let failed = [];
  try { progress = JSON.parse(await fs.readFile(PROGRESS_FILE, 'utf8')); } catch {}

  const toProcess = brands.filter(b => !progress[b.id] || progress[b.id].count < IMAGES_PER_BRAND);
  console.log(`\n🖼  Fetching images for ${toProcess.length} brands (${brands.length - toProcess.length} cached)...\n`);
  console.log('Strategy: Shopify API → HTML scraping → manual fallback\n');

  let done = 0;
  for (const brand of brands) {
    if (progress[brand.id]?.count >= IMAGES_PER_BRAND) {
      console.log(`[${++done}/${brands.length}] ✓ ${brand.name} (cached: ${progress[brand.id].count} imgs)`);
      continue;
    }

    console.log(`[${++done}/${brands.length}] ${brand.name} (${brand.origin})`);
    try {
      const result = await fetchBrandImages(brand);
      progress[brand.id] = result;
      if (result.count === 0) failed.push(brand.id);
      await fs.writeFile(PROGRESS_FILE, JSON.stringify(progress, null, 2));
    } catch (err) {
      console.error(`  ERROR: ${err.message}`);
      progress[brand.id] = { count: 0, method: 'error' };
      failed.push(brand.id);
    }
    await sleep(DELAY_MS);
  }

  await fs.writeFile(FAILED_FILE, JSON.stringify(failed, null, 2));

  const ok = Object.values(progress).filter(p => p.count >= IMAGES_PER_BRAND).length;
  const partial = Object.values(progress).filter(p => p.count > 0 && p.count < IMAGES_PER_BRAND).length;
  const none = Object.values(progress).filter(p => p.count === 0).length;

  console.log(`\n✅ Done:`);
  console.log(`   Full (${IMAGES_PER_BRAND}+ imgs): ${ok}`);
  console.log(`   Partial: ${partial}`);
  console.log(`   Failed (need manual): ${none}`);

  if (failed.length > 0) {
    console.log(`\n📋 Brands needing manual image download (${failed.length}):`);
    console.log(`   See: data/fetch-failed.json`);
    console.log(`   For each: create images/{brand-id}/ folder and add 3-4 product JPGs`);
  }
}

main().catch(err => {
  console.error('Fatal:', err.message);
  process.exit(1);
});
