/**
 * Final image fetcher — tổng hợp 3 nguồn:
 *   Musinsa (Korean platform)  → Stand Oil, Matin Kim, Andersson Bell, Second/Layer
 *   Wayback Machine            → Jacquemus, Sézane, COS, Wandler, + others
 *   Shopee VN API              → VN small brands
 *   Browser intercept backup   → everything else
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

const H = {
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/124',
  'Accept': 'text/html,application/xhtml+xml,*/*;q=0.8',
  'Accept-Language': 'ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7',
};

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

// ─── SOURCE 1: Musinsa (Korean fashion platform) ──────────────────────────────
const MUSINSA_BRANDS = {
  'stand-oil':     'standoil',
  'matin-kim':     'matinkim',
  'andersson-bell':'anderssonbell',
  'second-layer':  'secondlayer',
  '87mm':          '87mm',
  'noirer':        'noirer',
};

async function fetchMusinsa(page, musinsaSlug) {
  const captured = new Set();
  page.on('response', async res => {
    const url = res.url();
    if (url.includes('msscdn.net') && /\.(jpg|jpeg|png|webp)/i.test(url)) {
      const clean = url.split('?')[0];
      if (!clean.includes('icon') && !clean.includes('logo') && !clean.includes('static/assets')) {
        captured.add(clean);
      }
    }
  });

  const urls = [
    `https://www.musinsa.com/brands/${musinsaSlug}`,
    `https://www.musinsa.com/search/goods?keyword=${musinsaSlug}&page=1`,
  ];

  for (const url of urls) {
    try {
      await page.goto(url, { waitUntil: 'networkidle', timeout: 25000 });
      // Scroll to trigger lazy loading
      for (let i = 0; i < 5; i++) {
        await page.evaluate(() => window.scrollBy(0, window.innerHeight * 0.8));
        await sleep(500);
      }
      await sleep(2000);
      if (captured.size >= IMAGES_PER_BRAND * 2) break;
    } catch {}
    await sleep(500);
  }

  return [...captured];
}

// ─── SOURCE 2: Wayback Machine ────────────────────────────────────────────────
const WAYBACK_BRANDS = {
  'jacquemus':    'https://jacquemus.com/bags',
  'sezane':       'https://www.sezane.com/en/bags',
  'cos':          'https://www.cosstores.com/en_gbp/women/bags',
  'wandler':      'https://wandler.eu/collections/bags',
  'hunting-season': 'https://www.huntingseason.com/collections/bags',
  'hender-scheme':  'https://hender-scheme.com',
  'aeta':           'https://www.aeta.jp',
  'porter':         'https://www.yoshidakaban.com',
  'vasic':          'https://vasic.co/collections/bags',
  'tod-s':          'https://www.tods.com/en/handbags',
  'flore-paris':    'https://floreparis.com/collections/bags',
  'savette':        'https://savette.com/collections/bags',
  'a-wang':         'https://www.alexanderwang.com/en-us/bags',
  'cou-cou':        'https://coucouintimate.com',
  'wood-wood':      'https://www.woodwood.com/collections/bags',
  'other-stories':  'https://www.stories.com/en_eur/accessories/bags',
  'loewe':          'https://www.loewe.com/int/en/bags',
};

async function getWaybackUrl(originalUrl) {
  try {
    const res = await axios.get(`https://archive.org/wayback/available?url=${originalUrl}`, {
      headers: H, timeout: 8000
    });
    const snap = res.data?.archived_snapshots?.closest;
    return snap?.available ? snap.url : null;
  } catch { return null; }
}

async function fetchWayback(page, originalUrl) {
  const captured = new Set();

  const waybackUrl = await getWaybackUrl(originalUrl);
  if (!waybackUrl) return [];

  console.log(`    Wayback: ${waybackUrl.slice(30, 90)}`);

  page.on('response', async res => {
    const url = res.url();
    const ct = (res.headers()['content-type'] || '');
    if (ct.startsWith('image/') && !ct.includes('svg') && !url.includes('icon') && !url.includes('logo')) {
      const clean = url.split('?')[0];
      if (clean.length > 50) captured.add(clean);
    }
  });

  try {
    await page.goto(waybackUrl, { waitUntil: 'domcontentloaded', timeout: 30000 });
    for (let i = 0; i < 4; i++) {
      await page.evaluate(() => window.scrollBy(0, window.innerHeight));
      await sleep(600);
    }
    await sleep(2000);
  } catch (err) {
    console.warn(`    Wayback nav failed: ${err.message.slice(0, 50)}`);
  }

  return [...captured];
}

// ─── SOURCE 3: Shopee VN (for VN small brands) ───────────────────────────────
const SHOPEE_VN_BRANDS = {
  'lak-store':   'lak store túi',
  'the-wayward': 'the wayward vietnam túi',
  'andgather':   'andgather túi xách',
  'saabi':       'saabi túi xách',
  'floral-punk': 'floral punk túi xách',
  'chau-fifth':  'châu fifth túi xách',
  'cou-cou':     'cou cou túi xách',
};

async function fetchShopee(shopeeQuery) {
  try {
    const res = await axios.get('https://shopee.vn/api/v4/search/search_items', {
      params: {
        by: 'relevancy', keyword: shopeeQuery, limit: 20, newest: 0,
        order: 'desc', page_type: 'search', scenario: 'PAGE_GLOBAL_SEARCH', version: 2,
      },
      headers: {
        ...H,
        'Referer': 'https://shopee.vn/',
        'x-api-source': 'pc',
        'af-ac-enc-dat': 'null',
      },
      timeout: 10000,
    });

    const items = res.data?.items || [];
    const imageUrls = [];
    for (const item of items.slice(0, 8)) {
      const imgId = item?.item_basic?.image;
      if (imgId) {
        imageUrls.push(`https://cf.shopee.vn/file/${imgId}_tn`);
        imageUrls.push(`https://cf.shopee.vn/file/${imgId}`);
      }
    }
    return imageUrls;
  } catch { return []; }
}

// ─── DOWNLOAD ─────────────────────────────────────────────────────────────────
async function downloadImage(url, destPath) {
  try {
    const res = await axios.get(url, {
      responseType: 'stream', timeout: 20000,
      headers: { ...H, Referer: 'https://www.musinsa.com/' },
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

async function saveImages(brandId, imageUrls, existingCount) {
  let downloaded = existingCount;
  const brandDir = path.join(IMAGES_DIR, brandId);
  for (const url of imageUrls) {
    if (downloaded >= IMAGES_PER_BRAND) break;
    const ext = url.match(/\.(jpg|jpeg|png|webp)$/i)?.[1] || 'jpg';
    const dest = path.join(brandDir, `${String(downloaded + 1).padStart(2, '0')}.${ext}`);
    const ok = await downloadImage(url, dest);
    if (ok) downloaded++;
  }
  return downloaded;
}

// ─── MAIN ─────────────────────────────────────────────────────────────────────
async function main() {
  const { brands } = JSON.parse(await fs.readFile(BRANDS_FILE, 'utf8'));
  let progress = {};
  try { progress = JSON.parse(await fs.readFile(PROGRESS_FILE, 'utf8')); } catch {}

  const toProcess = brands.filter(b => {
    const p = progress[b.id];
    return (!p || p.count < IMAGES_PER_BRAND) &&
      (MUSINSA_BRANDS[b.id] || WAYBACK_BRANDS[b.id] || SHOPEE_VN_BRANDS[b.id]);
  });

  console.log(`\n🎯 Final targeted fetch for ${toProcess.length} brands...\n`);

  const browser = await chromium.launch({
    executablePath: EDGE_PATH,
    headless: true,
    args: ['--no-sandbox', '--disable-dev-shm-usage', '--disable-gpu'],
  });

  let fetched = 0;
  const stillFailed = [];

  for (let i = 0; i < toProcess.length; i++) {
    const brand = toProcess[i];
    const brandDir = path.join(IMAGES_DIR, brand.id);
    await fs.ensureDir(brandDir);
    const existing = (await fs.readdir(brandDir)).filter(f => /\.(jpg|jpeg|png|webp)$/i.test(f));
    const prev = existing.length;

    if (prev >= IMAGES_PER_BRAND) { progress[brand.id] = { count: prev, method: 'cached' }; continue; }

    console.log(`[${i + 1}/${toProcess.length}] ${brand.name} (${brand.origin}) — prev: ${prev}`);

    const page = await browser.newPage();
    page.setDefaultTimeout(30000);
    let downloaded = prev;
    let method = '';

    try {
      // Source 1: Musinsa
      if (MUSINSA_BRANDS[brand.id] && downloaded < IMAGES_PER_BRAND) {
        console.log(`    → Musinsa: ${MUSINSA_BRANDS[brand.id]}`);
        const urls = await fetchMusinsa(page, MUSINSA_BRANDS[brand.id]);
        console.log(`      intercepted ${urls.length} CDN URLs`);
        if (urls.length > 0) {
          downloaded = await saveImages(brand.id, urls, downloaded);
          method = 'musinsa';
        }
        await page.goto('about:blank').catch(() => {});
        await sleep(1000);
      }

      // Source 2: Wayback Machine
      if (WAYBACK_BRANDS[brand.id] && downloaded < IMAGES_PER_BRAND) {
        console.log(`    → Wayback Machine`);
        const urls = await fetchWayback(page, WAYBACK_BRANDS[brand.id]);
        console.log(`      intercepted ${urls.length} image responses`);
        if (urls.length > 0) {
          downloaded = await saveImages(brand.id, urls, downloaded);
          if (!method) method = 'wayback';
        }
        await page.goto('about:blank').catch(() => {});
        await sleep(500);
      }

      // Source 3: Shopee VN
      if (SHOPEE_VN_BRANDS[brand.id] && downloaded < IMAGES_PER_BRAND) {
        console.log(`    → Shopee VN: "${SHOPEE_VN_BRANDS[brand.id]}"`);
        const urls = await fetchShopee(SHOPEE_VN_BRANDS[brand.id]);
        if (urls.length > 0) {
          downloaded = await saveImages(brand.id, urls, downloaded);
          if (!method) method = 'shopee';
        }
      }

    } catch (err) {
      console.error(`    ERROR: ${err.message.slice(0, 80)}`);
    } finally {
      await page.close().catch(() => {});
    }

    progress[brand.id] = { count: downloaded, method: downloaded > prev ? method : 'failed' };
    await fs.writeFile(PROGRESS_FILE, JSON.stringify(progress, null, 2));

    if (downloaded >= IMAGES_PER_BRAND) {
      console.log(`  ✅ ${downloaded} images (${method})`);
      fetched++;
    } else if (downloaded > prev) {
      console.log(`  ⚠️  ${downloaded}/${IMAGES_PER_BRAND} partial (${method})`);
    } else {
      console.log(`  ✗ no new images`);
      stillFailed.push(brand.id);
    }

    await sleep(1500);
  }

  await browser.close();
  await fs.writeFile(path.join(ROOT, 'data', 'fetch-failed.json'), JSON.stringify(stillFailed, null, 2));

  const total = Object.values(progress).filter(p => p.count >= IMAGES_PER_BRAND).length;
  console.log(`\n✅ Final result: ${fetched} newly fetched`);
  console.log(`   Total full brands: ${total}/${brands.length}`);
  if (stillFailed.length) console.log(`   Still manual: ${stillFailed.join(', ')}`);
}

main().catch(err => { console.error('Fatal:', err.message); process.exit(1); });
