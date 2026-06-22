import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
const CLUSTERS_FILE = path.join(ROOT, 'data', 'clusters.json');
const BRANDS_FILE = path.join(ROOT, 'data', 'brands.json');
const IMAGES_DIR = path.join(ROOT, 'images');
const OUTPUT_DIR = path.join(ROOT, 'output');

async function getImageDataUrl(brandId) {
  const brandDir = path.join(IMAGES_DIR, brandId);
  if (!await fs.pathExists(brandDir)) return null;

  const files = (await fs.readdir(brandDir))
    .filter(f => /\.(jpg|jpeg|png|webp)$/i.test(f))
    .slice(0, 1);

  if (files.length === 0) return null;

  try {
    const imgPath = path.join(brandDir, files[0]);
    const data = await fs.readFile(imgPath);
    const ext = path.extname(files[0]).slice(1).toLowerCase();
    const mime = ext === 'png' ? 'image/png' : ext === 'webp' ? 'image/webp' : 'image/jpeg';
    return `data:${mime};base64,${data.toString('base64')}`;
  } catch {
    return null;
  }
}

async function buildHtml(clusters, matemadeAnalysis, whiteSpace) {
  const clusterCards = [];

  for (const cluster of clusters) {
    const brandItems = [];
    for (const brand of cluster.brands) {
      const imgSrc = await getImageDataUrl(brand.id);
      const imgTag = imgSrc
        ? `<img src="${imgSrc}" alt="${brand.name}" loading="lazy">`
        : `<div class="no-img">📦</div>`;

      const subjectClass = brand.isSubject ? ' subject-brand' : '';
      const dna = brand.analysis?.dnaSummary || brand.positioningNote || '';
      const crossover = brand.crossover ? `<div class="crossover">↔ ${brand.crossover}</div>` : '';
      const flag = { VN: '🇻🇳', KR: '🇰🇷', FR: '🇫🇷', US: '🇺🇸', GB: '🇬🇧', SE: '🇸🇪', JP: '🇯🇵', IT: '🇮🇹', DK: '🇩🇰', DE: '🇩🇪', NL: '🇳🇱', BG: '🇧🇬', TR: '🇹🇷', ES: '🇪🇸', HU: '🇭🇺', AU: '🇦🇺', FI: '🇫🇮', IE: '🇮🇪' }[brand.country] || '🌐';

      brandItems.push(`
        <div class="brand-card${subjectClass}" title="${dna}">
          <div class="brand-image">${imgTag}</div>
          <div class="brand-meta">
            <div class="brand-name">${brand.isSubject ? '⭐ ' : ''}${brand.name}</div>
            <div class="brand-country">${flag} ${brand.country} · ${brand.priceRange}</div>
            ${dna ? `<div class="brand-dna">${dna}</div>` : ''}
            ${crossover}
          </div>
        </div>`);
    }

    clusterCards.push(`
      <div class="cluster" style="--cluster-color: ${cluster.color};">
        <div class="cluster-header">
          <span class="cluster-emoji">${cluster.emoji}</span>
          <div class="cluster-title-group">
            <h2 class="cluster-name">${cluster.name}</h2>
            <p class="cluster-dna">${cluster.dna}</p>
          </div>
          <span class="brand-count">${cluster.brands.length} brands</span>
        </div>
        <div class="brands-grid">
          ${brandItems.join('')}
        </div>
      </div>`);
  }

  const matemadeSection = matemadeAnalysis ? `
    <section class="matemade-insight">
      <h2>⭐ MateMade Positioning Analysis</h2>
      <div class="insight-grid">
        <div class="insight-card current">
          <div class="insight-label">📍 Current Position</div>
          <div class="insight-text">${matemadeAnalysis.currentPosition || '—'}</div>
        </div>
        <div class="insight-card aspiration">
          <div class="insight-label">🎯 Aspiration Direction</div>
          <div class="insight-text">${matemadeAnalysis.aspirationalPosition || '—'}</div>
        </div>
        <div class="insight-card gap">
          <div class="insight-label">🔍 The Gap</div>
          <div class="insight-text">${matemadeAnalysis.gap || '—'}</div>
        </div>
        <div class="insight-card opportunity">
          <div class="insight-label">💡 Unique Opportunity</div>
          <div class="insight-text">${matemadeAnalysis.uniqueOpportunity || '—'}</div>
        </div>
      </div>
    </section>` : '';

  const whiteSpaceSection = whiteSpace?.length ? `
    <section class="whitespace-section">
      <h2>🗺 Market White Space</h2>
      <div class="whitespace-grid">
        ${whiteSpace.map(ws => `
          <div class="whitespace-card">
            <div class="ws-title">${ws.description}</div>
            <div class="ws-opportunity">→ ${ws.opportunity}</div>
          </div>`).join('')}
      </div>
    </section>` : '';

  return `<!DOCTYPE html>
<html lang="vi">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>MateMade · Brand DNA Matrix</title>
<style>
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  body {
    font-family: 'Inter', -apple-system, sans-serif;
    background: #0D0D0D;
    color: #E8E4DF;
    min-height: 100vh;
  }

  .header {
    padding: 48px 40px 32px;
    border-bottom: 1px solid #1E1E1E;
  }
  .header h1 {
    font-size: 28px;
    font-weight: 600;
    letter-spacing: -0.5px;
  }
  .header p {
    margin-top: 8px;
    color: #888;
    font-size: 14px;
  }
  .meta-row {
    display: flex;
    gap: 24px;
    margin-top: 16px;
    flex-wrap: wrap;
  }
  .meta-chip {
    background: #1A1A1A;
    border: 1px solid #2A2A2A;
    border-radius: 20px;
    padding: 4px 14px;
    font-size: 13px;
    color: #AAA;
  }

  .main {
    padding: 40px;
    display: flex;
    flex-direction: column;
    gap: 32px;
  }

  .cluster {
    background: #111;
    border: 1px solid #1E1E1E;
    border-radius: 16px;
    border-left: 4px solid var(--cluster-color);
    overflow: hidden;
  }

  .cluster-header {
    display: flex;
    align-items: flex-start;
    gap: 16px;
    padding: 24px 28px;
    background: linear-gradient(135deg, color-mix(in srgb, var(--cluster-color) 8%, #111), #111);
    border-bottom: 1px solid #1A1A1A;
  }
  .cluster-emoji { font-size: 28px; flex-shrink: 0; }
  .cluster-title-group { flex: 1; }
  .cluster-name {
    font-size: 18px;
    font-weight: 600;
    letter-spacing: -0.3px;
    color: color-mix(in srgb, var(--cluster-color) 80%, #E8E4DF);
  }
  .cluster-dna {
    margin-top: 4px;
    font-size: 13px;
    color: #777;
    line-height: 1.5;
  }
  .brand-count {
    background: color-mix(in srgb, var(--cluster-color) 15%, transparent);
    color: color-mix(in srgb, var(--cluster-color) 80%, #E8E4DF);
    border: 1px solid color-mix(in srgb, var(--cluster-color) 30%, transparent);
    border-radius: 20px;
    padding: 4px 12px;
    font-size: 12px;
    white-space: nowrap;
    align-self: flex-start;
    margin-top: 4px;
  }

  .brands-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
    gap: 2px;
    padding: 2px;
    background: #0D0D0D;
  }

  .brand-card {
    background: #111;
    cursor: pointer;
    transition: background 0.15s;
    position: relative;
  }
  .brand-card:hover { background: #181818; }
  .brand-card.subject-brand {
    background: linear-gradient(135deg, #1A1500, #111);
    outline: 2px solid #D4AF37;
    outline-offset: -2px;
    z-index: 1;
  }

  .brand-image {
    width: 100%;
    aspect-ratio: 1;
    overflow: hidden;
    background: #0D0D0D;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .brand-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
  .no-img {
    font-size: 32px;
    opacity: 0.3;
  }

  .brand-meta {
    padding: 10px 12px;
  }
  .brand-name {
    font-size: 13px;
    font-weight: 600;
    color: #D8D4CF;
    line-height: 1.3;
  }
  .brand-country {
    font-size: 11px;
    color: #555;
    margin-top: 2px;
  }
  .brand-dna {
    font-size: 11px;
    color: #666;
    margin-top: 4px;
    line-height: 1.4;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  .crossover {
    font-size: 10px;
    color: #C8A822;
    margin-top: 4px;
  }

  .matemade-insight {
    background: linear-gradient(135deg, #1A1500 0%, #111 100%);
    border: 1px solid #D4AF37;
    border-radius: 16px;
    padding: 32px;
  }
  .matemade-insight h2 {
    font-size: 20px;
    font-weight: 600;
    margin-bottom: 20px;
    color: #D4AF37;
  }
  .insight-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 16px;
  }
  .insight-card {
    background: #0D0D0D;
    border-radius: 12px;
    padding: 16px;
  }
  .insight-label {
    font-size: 11px;
    text-transform: uppercase;
    letter-spacing: 0.8px;
    color: #888;
    margin-bottom: 8px;
  }
  .insight-text {
    font-size: 14px;
    line-height: 1.5;
    color: #D8D4CF;
  }
  .insight-card.opportunity { border: 1px solid #D4AF3744; }

  .whitespace-section {
    background: #111;
    border: 1px solid #1E1E1E;
    border-radius: 16px;
    padding: 32px;
  }
  .whitespace-section h2 {
    font-size: 20px;
    font-weight: 600;
    margin-bottom: 20px;
  }
  .whitespace-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 16px;
  }
  .whitespace-card {
    background: #0D0D0D;
    border: 1px dashed #333;
    border-radius: 12px;
    padding: 20px;
  }
  .ws-title {
    font-size: 14px;
    line-height: 1.5;
    color: #D8D4CF;
  }
  .ws-opportunity {
    font-size: 13px;
    color: #4CAF50;
    margin-top: 8px;
  }

  .footer {
    padding: 24px 40px;
    border-top: 1px solid #1E1E1E;
    font-size: 12px;
    color: #444;
  }
</style>
</head>
<body>

<header class="header">
  <h1>MateMade · Brand DNA Matrix</h1>
  <p>Automated brand positioning research — Vietnam + International bag market</p>
  <div class="meta-row">
    <span class="meta-chip">📅 ${new Date().toLocaleDateString('vi-VN')}</span>
    <span class="meta-chip">🏷 ${clusters.reduce((n, c) => n + c.brands.length, 0)} brands</span>
    <span class="meta-chip">🗂 ${clusters.length} clusters</span>
    <span class="meta-chip">⭐ Subject: MateMade</span>
  </div>
</header>

<main class="main">
  ${matemadeSection}
  ${clusterCards.join('\n')}
  ${whiteSpaceSection}
</main>

<footer class="footer">
  Generated by brand-matrix pipeline · MateMade research
</footer>

</body>
</html>`;
}

async function main() {
  const data = JSON.parse(await fs.readFile(CLUSTERS_FILE, 'utf8'));
  const { brands } = JSON.parse(await fs.readFile(BRANDS_FILE, 'utf8'));

  await fs.ensureDir(OUTPUT_DIR);

  console.log('\n🎨 Building HTML visualization...');
  const html = await buildHtml(data.clusters, data.matemadeAnalysis, data.whiteSpace);

  const outputPath = path.join(OUTPUT_DIR, 'brand-matrix.html');
  await fs.writeFile(outputPath, html, 'utf8');

  console.log(`\n✅ Visualization ready!`);
  console.log(`   Open: ${outputPath}`);

  // Also write a summary JSON for FigJam plugin use
  const summary = {
    generatedAt: data.generatedAt,
    clusters: data.clusters.map(c => ({
      id: c.id,
      name: c.name,
      emoji: c.emoji,
      color: c.color,
      dna: c.dna,
      brandCount: c.brands.length,
      brands: c.brands.map(b => ({
        id: b.id,
        name: b.name,
        country: b.country,
        priceRange: b.priceRange,
        isSubject: b.isSubject || false,
        dnaSummary: b.analysis?.dnaSummary || '',
        aestheticStyle: b.analysis?.aestheticStyle || [],
      })),
    })),
    matemadeAnalysis: data.matemadeAnalysis,
    whiteSpace: data.whiteSpace,
  };

  await fs.writeFile(path.join(OUTPUT_DIR, 'matrix-summary.json'), JSON.stringify(summary, null, 2));
  console.log(`   Summary JSON for FigJam: output/matrix-summary.json`);
}

main().catch(err => {
  console.error('Fatal:', err.message);
  process.exit(1);
});
