/**
 * Fallback image fetcher — dùng Edge headless browser cho JS-rendered sites
 * + Google Images scraping cho brands còn lại
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
const DELAY_MS = 2500;

// Brand-specific config: url to visit + CSS selector for product images
const BRAND_CONFIGS = {
  // === VN Brands ===
  'hapas':       { url: 'https://hapas.vn/collections/tui-xach', imgSelector: '.product-card img, .product-item img, .grid-item img' },
  'vascara':     { url: 'https://vascara.com/tui-xach', imgSelector: '.product-image img, .product-card img, img[class*="product"]' },
  'juno':        { url: 'https://juno.vn/tui-xach', imgSelector: '.product-card img, .product-item img' },
  'lak-store':   { url: 'https://lakstore.vn', imgSelector: '.product-card img, article img, .product img' },
  'the-wayward': { url: 'https://thewayward.vn', imgSelector: '.product-card img, .product-item img, .collection img' },
  'andgather':   { url: 'https://andgather.vn', imgSelector: '.product-card img, .product-item img' },
  'saabi':       { url: 'https://saabi.vn', imgSelector: '.product-card img, .product-item img' },
  'floral-punk': { url: 'https://floralpunk.vn', imgSelector: '.product-card img, .product-item img' },
  'chau-fifth':  { url: 'https://chaufifth.com', imgSelector: '.product-card img, .product-item img' },
  'matemade':    { url: 'https://matemade.vn/collections/all', imgSelector: '.product-card img, .product-item img, .grid-item img' },

  // === Korean Brands ===
  'stand-oil':    { url: 'https://www.standoil.co.kr/category/bag', imgSelector: 'img[class*="product"], img[class*="thumb"], .prdList img, li img' },
  'matin-kim':    { url: 'https://matinkim.com/category/bag', imgSelector: 'img[class*="product"], img[class*="thumb"], .prdList img, li img' },
  'marhen-j':     { url: 'https://www.marhenj.com/shop/bag', imgSelector: '.item img, img[class*="product"], .product-img img' },
  '87mm':         { url: 'https://87mm.co.kr/category/bag', imgSelector: 'img[class*="product"], img[class*="thumb"], li img' },
  'low-classic':  { url: 'https://www.lowclassic.co.kr', imgSelector: 'img[class*="product"], img[class*="item"], .product-list img' },
  'noirer':       { url: 'https://noirer.com', imgSelector: 'img[class*="product"], img[class*="item"], .product img' },
  'andersson-bell':{ url: 'https://www.anderssonbell.com', imgSelector: 'img[class*="product"], img[class*="item"]' },
  'second-layer': { url: 'https://secondlayer.co.kr', imgSelector: 'img[class*="product"], img[class*="thumb"], li img' },

  // === European/US non-Shopify ===
  'jacquemus':    { url: 'https://www.jacquemus.com/bags', imgSelector: 'img[src*="cdn"], img[src*="image"], .product img' },
  'ganni':        { url: 'https://www.ganni.com/en-us/bags/', imgSelector: 'img[class*="product"], img[src*="cdn"], .product-image img' },
  'sezane':       { url: 'https://www.sezane.com/en/bags', imgSelector: 'img[src*="cdn"], img[class*="product"], .product img' },
  'wandler':      { url: 'https://wandler.eu/collections/bags', imgSelector: '.product-card img, img[src*="cdn"], img[class*="product"]' },
  'strathberry':  { url: 'https://www.strathberry.com/collections/bags', imgSelector: '.product-card img, img[class*="product"]' },
  'hunting-season':{ url: 'https://www.huntingseason.com/collections/bags', imgSelector: '.product-card img, img[class*="product"]' },
  'loewe':        { url: 'https://www.loewe.com/int/en/bags', imgSelector: 'img[src*="cdn"], img[src*="image"], .product img' },
  'celine':       { url: 'https://www.celine.com/en-us/celine-bags', imgSelector: 'img[src*="cdn"], img[class*="product"], .product img' },
  'cos':          { url: 'https://www.cosstores.com/en_gbp/women/bags', imgSelector: 'img[class*="product"], img[src*="cdn"], article img' },
  'arket':        { url: 'https://www.arket.com/en_gbp/women/bags', imgSelector: 'img[class*="product"], img[src*="cdn"], article img' },
  'other-stories':{ url: 'https://www.stories.com/en_eur/accessories/bags', imgSelector: 'img[class*="product"], img[src*="cdn"]' },
  'hender-scheme':{ url: 'https://hender-scheme.com/category/bag', imgSelector: 'img[class*="product"], img[class*="item"], .product img' },
  'aeta':         { url: 'https://www.aeta.jp', imgSelector: 'img[class*="product"], img[class*="item"], .product img' },
  'porter':       { url: 'https://www.yoshidakaban.com', imgSelector: 'img[class*="product"], img[class*="item"]' },
  'marimekko':    { url: 'https://www.marimekko.com/en/bags', imgSelector: 'img[class*="product"], img[src*="cdn"]' },
  'vasic':        { url: 'https://vasic.co/collections/bags', imgSelector: '.product-card img, img[class*="product"]' },
  'flore-paris':  { url: 'https://floreparis.com/collections/bags', imgSelector: '.product-card img, img[class*="product"]' },
  'savette':      { url: 'https://savette.com/collections/bags', imgSelector: '.product-card img, img[class*="product"]' },
  'a-wang':       { url: 'https://www.alexanderwang.com/en-us/bags', imgSelector: 'img[src*="cdn"], img[class*="product"]' },
  'wood-wood':    { url: 'https://www.woodwood.com/collections/bags', imgSelector: '.product-card img, img[class*="product"]' },
  'tod-s':        { url: 'https://www.tods.com/en/handbags', imgSelector: 'img[src*="cdn"], img[class*="product"]' },
  'cou-cou':      { url: 'https://coucouintimate.com/collections/all', imgSelector: '.product-card img, img[class*="product"]' },
  'marimekko':    { url: 'https://www.marimekko.com/en/bags', imgSelector: 'img[class*="product"], img[src*="cdn"]' },
  'ader-error':   { url: 'https://adererror.com/collections/bag', imgSelector: '.product-card img, img[class*="product"]' },
};

// Fallback: Google Images via headless browser
async function googleImageSearch(page, query, count = 8) {
  try {
    await page.goto(
      `https://www.google.com/search?q=${encodeURIComponent(query)}&tbm=isch&safe=off`,
      { waitUntil: 'domcontentloaded', timeout: 20000 }
    );
    await page.waitForTimeout(2000);

    // Click "Accept all" cookies if it appears
    try {
      const acceptBtn = await page.$('button[aria-label*="Accept"], button[aria-label*="Agree"]');
      if (acceptBtn) await acceptBtn.click();
      await page.waitForTimeout(500);
    } catch {}

    // Extract full-size image URLs from thumbnails
    const urls = await page.evaluate(() => {
      const imgs = document.querySelectorAll('img');
      const results = [];
      for (const img of imgs) {
        const src = img.src || img.dataset.src || '';
        // Filter: want actual images, not Google icons/logos
        if (src.startsWith('http') && !src.includes('google') && !src.includes('gstatic') &&
            !src.includes('googleusercontent.com/bx') && src.length > 50) {
          results.push(src);
        }
      }
      return results;
    });

    // Also try to get higher-res URLs from data attributes and JSON in page
    const pageContent = await page.content();
    const highResMatches = [...pageContent.matchAll(/\["(https:\/\/[^"]+\.(jpg|jpeg|png|webp)[^"]*)",\d+,\d+\]/g)]
      .map(m => m[1])
      .filter(u => !u.includes('google') && !u.includes('gstatic'));

    const allUrls = [...new Set([...highResMatches, ...urls])].slice(0, count);
    return allUrls;
  } catch (err) {
    console.warn(`    Google Images failed: ${err.message.slice(0, 60)}`);
    return [];
  }
}

// Extract images from brand website with headless browser
async function scrapeWebsite(page, config) {
  try {
    await page.goto(config.url, { waitUntil: 'networkidle', timeout: 25000 });
    await page.waitForTimeout(1500);

    // Scroll to trigger lazy loading
    await page.evaluate(() => window.scrollBy(0, 800));
    await page.waitForTimeout(1000);

    const imgUrls = await page.evaluate((selector) => {
      const candidates = new Set();

      // Try the specific selector
      document.querySelectorAll(selector).forEach(img => {
        const src = img.src || img.dataset.src || img.dataset.lazySrc || img.currentSrc;
        if (src && src.startsWith('http') && src.length > 30) candidates.add(src.split('?')[0]);
        // Also check srcset
        const srcset = img.srcset;
        if (srcset) {
          const first = srcset.split(',')[0].trim().split(' ')[0];
          if (first.startsWith('http')) candidates.add(first.split('?')[0]);
        }
      });

      // Generic: all medium-large images
      document.querySelectorAll('img').forEach(img => {
        const src = img.src || img.dataset.src || '';
        if (!src.startsWith('http')) return;
        const w = img.naturalWidth || img.width || 0;
        const h = img.naturalHeight || img.height || 0;
        // Likely a product image if it's large enough
        if ((w > 200 || h > 200) && !src.includes('logo') && !src.includes('icon') && !src.includes('banner')) {
          candidates.add(src.split('?')[0]);
        }
      });

      return [...candidates].slice(0, 20);
    }, config.imgSelector);

    return imgUrls.filter(u => /\.(jpg|jpeg|png|webp)/i.test(u));
  } catch (err) {
    // If networkidle times out, still try to get whatever loaded
    try {
      return await page.evaluate(() => {
        return [...document.querySelectorAll('img[src^="http"]')]
          .map(img => img.src.split('?')[0])
          .filter(s => /\.(jpg|jpeg|png|webp)/i.test(s) && !s.includes('logo'));
      });
    } catch { return []; }
  }
}

async function downloadImage(url, destPath) {
  try {
    const res = await axios.get(url, {
      responseType: 'stream',
      timeout: 20000,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        'Referer': 'https://www.google.com/',
      },
      maxRedirects: 5,
    });
    const ct = res.headers['content-type'] || '';
    if (!ct.includes('image') && !ct.includes('octet-stream')) throw new Error('Not image');
    await pipeline(res.data, createWriteStream(destPath));
    const stat = await fs.stat(destPath);
    if (stat.size < 4000) { await fs.remove(destPath); throw new Error('Too small'); }
    return true;
  } catch {
    await fs.remove(destPath).catch(() => {});
    return false;
  }
}

async function fetchBrandWithBrowser(brand, page) {
  const brandDir = path.join(IMAGES_DIR, brand.id);
  await fs.ensureDir(brandDir);

  const existing = (await fs.readdir(brandDir)).filter(f => /\.(jpg|jpeg|png|webp)$/i.test(f));
  if (existing.length >= IMAGES_PER_BRAND) return { count: existing.length, method: 'cached' };
  const needed = IMAGES_PER_BRAND - existing.length;

  const config = BRAND_CONFIGS[brand.id];
  let imageUrls = [];
  let method = '';

  // Strategy 1: Visit brand website
  if (config) {
    console.log(`    → Visiting: ${config.url}`);
    imageUrls = await scrapeWebsite(page, config);
    if (imageUrls.length >= needed) method = 'browser-website';
  }

  // Strategy 2: Google Images fallback
  if (imageUrls.length < needed) {
    const query = `${brand.name} ${brand.origin || ''} bag product 2024 -site:pinterest.com`;
    console.log(`    → Google Images: "${query}"`);
    const googleUrls = await googleImageSearch(page, query, 15);
    imageUrls = [...imageUrls, ...googleUrls];
    if (!method && googleUrls.length > 0) method = 'google-images';
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
    return !p || p.count < IMAGES_PER_BRAND;
  });

  console.log(`\n🌐 Browser-based fallback fetch for ${toProcess.length} brands...\n`);
  console.log(`Using Edge headless: ${EDGE_PATH}\n`);

  const browser = await chromium.launch({
    executablePath: EDGE_PATH,
    headless: true,
    args: ['--no-sandbox', '--disable-dev-shm-usage', '--disable-gpu'],
  });

  const context = await browser.newContext({
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
    locale: 'en-US',
    viewport: { width: 1280, height: 900 },
  });
  const page = await context.newPage();
  page.setDefaultTimeout(25000);

  let newlyFetched = 0;
  const stillFailed = [];

  for (let i = 0; i < toProcess.length; i++) {
    const brand = toProcess[i];
    const prev = progress[brand.id]?.count || 0;
    console.log(`[${i + 1}/${toProcess.length}] ${brand.name} (${brand.origin}) — had ${prev} imgs`);

    try {
      const result = await fetchBrandWithBrowser(brand, page);
      progress[brand.id] = result;
      await fs.writeFile(PROGRESS_FILE, JSON.stringify(progress, null, 2));

      if (result.count >= IMAGES_PER_BRAND) {
        console.log(`  ✅ ${result.count}/${IMAGES_PER_BRAND} images (${result.method})`);
        newlyFetched++;
      } else if (result.count > prev) {
        console.log(`  ⚠️  ${result.count}/${IMAGES_PER_BRAND} partial (${result.method})`);
      } else {
        console.log(`  ✗ still 0 images`);
        stillFailed.push(brand.id);
      }
    } catch (err) {
      console.error(`  ERROR: ${err.message.slice(0, 80)}`);
      stillFailed.push(brand.id);
    }

    // Navigate away to reset page state between brands
    try { await page.goto('about:blank'); } catch {}
    await new Promise(r => setTimeout(r, DELAY_MS));
  }

  await browser.close();
  await fs.writeFile(FAILED_FILE, JSON.stringify(stillFailed, null, 2));

  const total = Object.values(progress).filter(p => p.count >= IMAGES_PER_BRAND).length;
  console.log(`\n✅ Done:`);
  console.log(`   Newly fetched: ${newlyFetched}`);
  console.log(`   Total full brands: ${total}/${brands.length}`);
  console.log(`   Still need manual: ${stillFailed.length}`);

  if (stillFailed.length > 0) {
    console.log(`\n📋 Still need manual images:`);
    stillFailed.forEach(id => console.log(`   images/${id}/  ← add 3-4 JPGs`));
  }
}

main().catch(err => {
  console.error('Fatal:', err.message);
  process.exit(1);
});
