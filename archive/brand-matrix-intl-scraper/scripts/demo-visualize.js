/**
 * Demo visualization — dùng predefined cluster data từ brands.json
 * Chạy NGAY mà không cần Claude API key
 * Kết quả: output/brand-matrix-demo.html
 */
import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
const BRANDS_FILE = path.join(ROOT, 'data', 'brands.json');
const IMAGES_DIR = path.join(ROOT, 'images');
const OUTPUT_DIR = path.join(ROOT, 'output');

async function getImageDataUrl(brandId) {
  const brandDir = path.join(IMAGES_DIR, brandId);
  if (!await fs.pathExists(brandDir)) return null;
  const files = (await fs.readdir(brandDir)).filter(f => /\.(jpg|jpeg|png|webp)$/i.test(f)).slice(0, 1);
  if (!files.length) return null;
  try {
    const data = await fs.readFile(path.join(brandDir, files[0]));
    const ext = path.extname(files[0]).slice(1).toLowerCase();
    const mime = ext === 'png' ? 'image/png' : ext === 'webp' ? 'image/webp' : 'image/jpeg';
    return `data:${mime};base64,${data.toString('base64')}`;
  } catch { return null; }
}

async function main() {
  const { brands, predefinedClusters } = JSON.parse(await fs.readFile(BRANDS_FILE, 'utf8'));
  await fs.ensureDir(OUTPUT_DIR);

  // Build cluster → brands map from predefinedClusters.brandIds
  const brandById = Object.fromEntries(brands.map(b => [b.id, b]));

  const clusterCards = [];
  for (const cluster of predefinedClusters) {
    const clusterBrands = (cluster.brandIds || [])
      .map(id => brandById[id])
      .filter(Boolean);

    const brandItems = [];
    for (const brand of clusterBrands) {
      const imgSrc = await getImageDataUrl(brand.id);
      const imgTag = imgSrc
        ? `<img src="${imgSrc}" alt="${brand.name}" loading="lazy">`
        : `<div class="no-img">${brand.name.charAt(0)}</div>`;

      const subjectClass = brand.isSubject ? ' subject-brand' : '';
      const flag = { VN:'🇻🇳', KR:'🇰🇷', FR:'🇫🇷', US:'🇺🇸', GB:'🇬🇧', SE:'🇸🇪', JP:'🇯🇵', IT:'🇮🇹', DK:'🇩🇰', NL:'🇳🇱', BG:'🇧🇬', TR:'🇹🇷', ES:'🇪🇸', HU:'🇭🇺', FI:'🇫🇮', IE:'🇮🇪', AU:'🇦🇺' }[brand.country] || '🌐';
      const dnaKeywords = (brand.designStyle || []).slice(0, 3).join(' · ');

      brandItems.push(`
        <div class="brand-card${subjectClass}">
          <div class="brand-image">${imgTag}</div>
          <div class="brand-meta">
            <div class="brand-name">${brand.isSubject ? '⭐ ' : ''}${brand.name}</div>
            <div class="brand-origin">${flag} ${brand.origin || brand.country} · <span class="price-tag">${brand.priceRange}</span></div>
            ${dnaKeywords ? `<div class="brand-keywords">${dnaKeywords}</div>` : ''}
          </div>
        </div>`);
    }

    if (clusterBrands.length === 0) continue;

    clusterCards.push(`
      <div class="cluster" style="--c: ${cluster.color};">
        <div class="cluster-header">
          <span class="cluster-emoji">${cluster.emoji}</span>
          <div>
            <div class="cluster-name">${cluster.name}</div>
            <div class="cluster-dna">${cluster.dna}</div>
            ${cluster.fashionMovement ? `<div class="cluster-movement">↗ ${cluster.fashionMovement}</div>` : ''}
          </div>
          <span class="count-badge">${clusterBrands.length}</span>
        </div>
        <div class="brands-grid">${brandItems.join('')}</div>
      </div>`);
  }

  const html = `<!DOCTYPE html>
<html lang="vi">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>MateMade · Brand Matrix (Demo)</title>
<style>
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
body{font-family:-apple-system,'Inter',sans-serif;background:#0A0A0A;color:#E4E0DB;min-height:100vh}
.top{padding:40px 40px 28px;border-bottom:1px solid #1C1C1C}
.top h1{font-size:26px;font-weight:700;letter-spacing:-0.5px}
.top p{margin-top:6px;color:#666;font-size:13px}
.chips{display:flex;gap:10px;margin-top:14px;flex-wrap:wrap}
.chip{background:#141414;border:1px solid #242424;border-radius:20px;padding:3px 12px;font-size:12px;color:#888}
.chip.highlight{border-color:#D4AF3766;color:#D4AF37}
.note{background:#1A1500;border:1px solid #D4AF3744;border-radius:10px;padding:14px 18px;margin:20px 40px 0;font-size:13px;color:#C8A050;line-height:1.5}
.main{padding:32px 40px;display:flex;flex-direction:column;gap:24px}
.cluster{background:#0F0F0F;border:1px solid #1C1C1C;border-left:3px solid var(--c);border-radius:14px;overflow:hidden}
.cluster-header{display:flex;align-items:flex-start;gap:14px;padding:20px 24px;border-bottom:1px solid #161616;background:linear-gradient(135deg,color-mix(in srgb,var(--c) 6%,#0F0F0F),#0F0F0F)}
.cluster-emoji{font-size:26px;flex-shrink:0;margin-top:2px}
.cluster-name{font-size:16px;font-weight:600;color:color-mix(in srgb,var(--c) 85%,#E4E0DB)}
.cluster-dna{font-size:12px;color:#666;margin-top:3px;line-height:1.5;max-width:600px}
.cluster-movement{font-size:11px;color:color-mix(in srgb,var(--c) 60%,#888);margin-top:4px;letter-spacing:0.3px}
.count-badge{margin-left:auto;align-self:flex-start;margin-top:2px;background:color-mix(in srgb,var(--c) 15%,transparent);color:color-mix(in srgb,var(--c) 80%,#E4E0DB);border:1px solid color-mix(in srgb,var(--c) 25%,transparent);border-radius:20px;padding:3px 10px;font-size:11px;white-space:nowrap}
.brands-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:1px;padding:1px;background:#070707}
.brand-card{background:#0F0F0F;transition:background .12s}
.brand-card:hover{background:#171717}
.brand-card.subject-brand{background:linear-gradient(160deg,#140F00,#0F0F0F);outline:2px solid #D4AF37;outline-offset:-2px;z-index:1;position:relative}
.brand-image{width:100%;aspect-ratio:1;overflow:hidden;background:#070707;display:flex;align-items:center;justify-content:center}
.brand-image img{width:100%;height:100%;object-fit:cover;display:block}
.no-img{font-size:36px;font-weight:700;color:#252525;letter-spacing:-1px}
.brand-meta{padding:9px 11px}
.brand-name{font-size:12.5px;font-weight:600;color:#D0CCC7;line-height:1.3}
.brand-origin{font-size:10.5px;color:#4A4A4A;margin-top:2px}
.price-tag{color:#555}
.brand-keywords{font-size:10px;color:#3E3E3E;margin-top:3px;line-height:1.4}
footer{padding:20px 40px;border-top:1px solid #141414;font-size:11px;color:#333}
</style>
</head>
<body>
<div class="top">
  <h1>MateMade · Brand DNA Matrix</h1>
  <p>Market positioning research — Vietnam + International bag market</p>
  <div class="chips">
    <span class="chip">📅 ${new Date().toLocaleDateString('vi-VN')}</span>
    <span class="chip">🏷 ${brands.length} brands</span>
    <span class="chip">🗂 ${predefinedClusters.length} clusters</span>
    <span class="chip highlight">⭐ Demo — chưa có Claude analysis</span>
  </div>
</div>
<div class="note">
  📋 <strong>Demo mode</strong> — Đây là layout với predefined clusters. Chạy <code>npm run analyze</code> + <code>npm run cluster</code> sau khi có Anthropic API key để có AI-generated DNA analysis và clustering chính xác hơn.
</div>
<main class="main">
  ${clusterCards.join('\n')}
</main>
<footer>MateMade · Brand Matrix Pipeline · Demo</footer>
</body>
</html>`;

  const outPath = path.join(OUTPUT_DIR, 'brand-matrix-demo.html');
  await fs.writeFile(outPath, html, 'utf8');
  console.log(`\n✅ Demo HTML ready: ${outPath}`);
  console.log(`   Brands with images: ${(await fs.readdir(IMAGES_DIR).catch(() => [])).length}`);
}

main().catch(err => {
  console.error('Fatal:', err.message);
  process.exit(1);
});
