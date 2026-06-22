import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = '/sessions/admiring-amazing-brahmagupta/mnt/MateMade/brand-matrix';
const CLUSTERS_FILE = path.join(ROOT, 'data', 'clusters.json');
const BRANDS_FILE = path.join(ROOT, 'data', 'brands.json');
const IMAGES_DIR = path.join(ROOT, 'images');
const OUTPUT_DIR = path.join(ROOT, 'output');

const FLAG = { VN: '🇻🇳', KR: '🇰🇷', FR: '🇫🇷', US: '🇺🇸', GB: '🇬🇧', SE: '🇸🇪', JP: '🇯🇵', IT: '🇮🇹', DK: '🇩🇰', DE: '🇩🇪', NL: '🇳🇱', BG: '🇧🇬', TR: '🇹🇷', ES: '🇪🇸', HU: '🇭🇺', AU: '🇦🇺', FI: '🇫🇮', IE: '🇮🇪' };

async function getImageDataUrl(brandId) {
  const brandDir = path.join(IMAGES_DIR, brandId);
  if (!await fs.pathExists(brandDir)) return null;
  const files = (await fs.readdir(brandDir)).filter(f => /\.(jpg|jpeg|png|webp)$/i.test(f));
  if (files.length === 0) return null;
  // prefer files that look like real product shots over tiny icons; just take first
  try {
    const imgPath = path.join(brandDir, files[0]);
    const data = await fs.readFile(imgPath);
    const ext = path.extname(files[0]).slice(1).toLowerCase();
    const mime = ext === 'png' ? 'image/png' : ext === 'webp' ? 'image/webp' : 'image/jpeg';
    return `data:${mime};base64,${data.toString('base64')}`;
  } catch { return null; }
}

function esc(s) {
  if (s == null) return '';
  return String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

async function buildHtml(data, brandsMaster) {
  const { clusters, matemadeAnalysis, whiteSpace, clusterInsights, method } = data;

  // Pre-fetch all images
  const allBrandIds = clusters.flatMap(c => c.brands.map(b => b.id));
  const imgMap = {};
  for (const id of allBrandIds) {
    imgMap[id] = await getImageDataUrl(id);
  }

  // Build a JS data blob for the modal (full analysis per brand)
  const modalData = {};
  for (const cluster of clusters) {
    for (const brand of cluster.brands) {
      modalData[brand.id] = {
        name: brand.name,
        country: brand.country,
        priceRange: brand.priceRange,
        clusterName: cluster.name,
        clusterEmoji: cluster.emoji,
        crossover: brand.crossover || null,
        analysis: brand.analysis || null,
      };
    }
  }

  const clusterCards = [];
  for (const cluster of clusters) {
    const brandItems = [];
    for (const brand of cluster.brands) {
      const imgSrc = imgMap[brand.id];
      const imgTag = imgSrc
        ? `<img src="${imgSrc}" alt="${esc(brand.name)}" loading="lazy">`
        : `<div class="no-img">📦</div>`;

      const subjectClass = brand.isSubject ? ' subject-brand' : '';
      const dna = brand.analysis?.dnaSummary || brand.positioningNote || '';
      const crossover = brand.crossover ? `<div class="crossover">↔ ${esc(brand.crossover)}</div>` : '';
      const flag = FLAG[brand.country] || '🌐';
      const keywords = (brand.analysis?.positioningKeywords || []).slice(0, 4);

      brandItems.push(`
        <div class="brand-card${subjectClass}" data-brand-id="${esc(brand.id)}" onclick="openModal('${esc(brand.id)}')">
          <div class="brand-image">${imgTag}</div>
          <div class="brand-meta">
            <div class="brand-name">${brand.isSubject ? '⭐ ' : ''}${esc(brand.name)}</div>
            <div class="brand-country">${flag} ${esc(brand.country)} · ${esc(brand.priceRange)}</div>
            ${dna ? `<div class="brand-dna">${esc(dna)}</div>` : ''}
            ${keywords.length ? `<div class="brand-tags">${keywords.map(k => `<span class="tag">${esc(k)}</span>`).join('')}</div>` : ''}
            ${crossover}
          </div>
        </div>`);
    }

    const insight = clusterInsights?.[cluster.id]
      ? `<p class="cluster-insight">🔎 ${esc(clusterInsights[cluster.id])}</p>`
      : '';

    clusterCards.push(`
      <div class="cluster" style="--cluster-color: ${cluster.color};">
        <div class="cluster-header">
          <span class="cluster-emoji">${cluster.emoji}</span>
          <div class="cluster-title-group">
            <h2 class="cluster-name">${esc(cluster.name)}</h2>
            <p class="cluster-dna">${esc(cluster.dna)}</p>
            ${cluster.fashionMovement ? `<p class="cluster-movement">↗ ${esc(cluster.fashionMovement)}</p>` : ''}
            ${insight}
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
      <h2>⭐ MateMade — DNA &amp; Positioning</h2>
      <div class="insight-grid">
        <div class="insight-card current">
          <div class="insight-label">📍 Current Position</div>
          <div class="insight-text">${esc(matemadeAnalysis.currentPosition)}</div>
        </div>
        <div class="insight-card aspiration">
          <div class="insight-label">🎯 Aspirational Direction</div>
          <div class="insight-text">${esc(matemadeAnalysis.aspirationalPosition)}</div>
        </div>
        <div class="insight-card gap">
          <div class="insight-label">🔍 The Gap</div>
          <div class="insight-text">${esc(matemadeAnalysis.gap)}</div>
        </div>
        <div class="insight-card opportunity">
          <div class="insight-label">💡 Unique Opportunity</div>
          <div class="insight-text">${esc(matemadeAnalysis.uniqueOpportunity)}</div>
        </div>
      </div>
    </section>` : '';

  const whiteSpaceSection = whiteSpace?.length ? `
    <section class="whitespace-section">
      <h2>🗺 Market White Space</h2>
      <div class="whitespace-grid">
        ${whiteSpace.map(ws => `
          <div class="whitespace-card">
            <div class="ws-title">${esc(ws.description)}</div>
            <div class="ws-opportunity">→ ${esc(ws.opportunity)}</div>
          </div>`).join('')}
      </div>
    </section>` : '';

  const methodNote = method ? `<div class="method-note">📋 <strong>Phương pháp:</strong> ${esc(method)}</div>` : '';

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

  .header { padding: 48px 40px 24px; border-bottom: 1px solid #1E1E1E; }
  .header h1 { font-size: 28px; font-weight: 600; letter-spacing: -0.5px; }
  .header p { margin-top: 8px; color: #888; font-size: 14px; }
  .meta-row { display: flex; gap: 12px; margin-top: 16px; flex-wrap: wrap; }
  .meta-chip { background: #1A1A1A; border: 1px solid #2A2A2A; border-radius: 20px; padding: 4px 14px; font-size: 13px; color: #AAA; }
  .method-note { margin: 16px 40px 0; background: #14130A; border: 1px solid #3A3320; border-radius: 10px; padding: 12px 18px; font-size: 12.5px; color: #B8A35C; line-height: 1.5; }

  .main { padding: 32px 40px 40px; display: flex; flex-direction: column; gap: 32px; }

  .cluster { background: #111; border: 1px solid #1E1E1E; border-radius: 16px; border-left: 4px solid var(--cluster-color); overflow: hidden; }

  .cluster-header { display: flex; align-items: flex-start; gap: 16px; padding: 24px 28px; background: linear-gradient(135deg, color-mix(in srgb, var(--cluster-color) 8%, #111), #111); border-bottom: 1px solid #1A1A1A; }
  .cluster-emoji { font-size: 28px; flex-shrink: 0; }
  .cluster-title-group { flex: 1; }
  .cluster-name { font-size: 18px; font-weight: 600; letter-spacing: -0.3px; color: color-mix(in srgb, var(--cluster-color) 80%, #E8E4DF); }
  .cluster-dna { margin-top: 4px; font-size: 13px; color: #777; line-height: 1.5; }
  .cluster-movement { margin-top: 4px; font-size: 11.5px; color: color-mix(in srgb, var(--cluster-color) 60%, #888); letter-spacing: 0.2px; }
  .cluster-insight { margin-top: 10px; font-size: 12.5px; color: #999; line-height: 1.6; max-width: 760px; border-top: 1px dashed #2A2A2A; padding-top: 10px; }
  .brand-count { background: color-mix(in srgb, var(--cluster-color) 15%, transparent); color: color-mix(in srgb, var(--cluster-color) 80%, #E8E4DF); border: 1px solid color-mix(in srgb, var(--cluster-color) 30%, transparent); border-radius: 20px; padding: 4px 12px; font-size: 12px; white-space: nowrap; align-self: flex-start; margin-top: 4px; }

  .brands-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(170px, 1fr)); gap: 2px; padding: 2px; background: #0D0D0D; }

  .brand-card { background: #111; cursor: pointer; transition: background 0.15s; position: relative; }
  .brand-card:hover { background: #181818; }
  .brand-card.subject-brand { background: linear-gradient(135deg, #1A1500, #111); outline: 2px solid #D4AF37; outline-offset: -2px; z-index: 1; }

  .brand-image { width: 100%; aspect-ratio: 1; overflow: hidden; background: #0D0D0D; display: flex; align-items: center; justify-content: center; }
  .brand-image img { width: 100%; height: 100%; object-fit: cover; display: block; }
  .no-img { font-size: 32px; opacity: 0.3; }

  .brand-meta { padding: 10px 12px; }
  .brand-name { font-size: 13px; font-weight: 600; color: #D8D4CF; line-height: 1.3; }
  .brand-country { font-size: 11px; color: #555; margin-top: 2px; }
  .brand-dna { font-size: 11px; color: #666; margin-top: 4px; line-height: 1.4; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
  .brand-tags { margin-top: 6px; display: flex; flex-wrap: wrap; gap: 4px; }
  .tag { font-size: 9.5px; color: #8a8a8a; background: #1a1a1a; border: 1px solid #262626; border-radius: 8px; padding: 1px 7px; }
  .crossover { font-size: 10px; color: #C8A822; margin-top: 4px; }

  .matemade-insight { background: linear-gradient(135deg, #1A1500 0%, #111 100%); border: 1px solid #D4AF37; border-radius: 16px; padding: 32px; }
  .matemade-insight h2 { font-size: 20px; font-weight: 600; margin-bottom: 20px; color: #D4AF37; }
  .insight-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 16px; }
  .insight-card { background: #0D0D0D; border-radius: 12px; padding: 16px; }
  .insight-label { font-size: 11px; text-transform: uppercase; letter-spacing: 0.8px; color: #888; margin-bottom: 8px; }
  .insight-text { font-size: 13.5px; line-height: 1.55; color: #D8D4CF; }
  .insight-card.opportunity { border: 1px solid #D4AF3744; }

  .whitespace-section { background: #111; border: 1px solid #1E1E1E; border-radius: 16px; padding: 32px; }
  .whitespace-section h2 { font-size: 20px; font-weight: 600; margin-bottom: 20px; }
  .whitespace-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 16px; }
  .whitespace-card { background: #0D0D0D; border: 1px dashed #333; border-radius: 12px; padding: 20px; }
  .ws-title { font-size: 13.5px; line-height: 1.55; color: #D8D4CF; }
  .ws-opportunity { font-size: 13px; color: #4CAF50; margin-top: 8px; }

  .footer { padding: 24px 40px; border-top: 1px solid #1E1E1E; font-size: 12px; color: #444; }

  /* Modal */
  .modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.7); display: none; align-items: center; justify-content: center; padding: 24px; z-index: 100; }
  .modal-overlay.open { display: flex; }
  .modal-box { background: #131313; border: 1px solid #2A2A2A; border-radius: 18px; max-width: 720px; width: 100%; max-height: 85vh; overflow-y: auto; padding: 32px; }
  .modal-close { position: absolute; top: 18px; right: 22px; cursor: pointer; font-size: 22px; color: #888; background: none; border: none; }
  .modal-header { display: flex; align-items: baseline; gap: 10px; margin-bottom: 4px; }
  .modal-title { font-size: 22px; font-weight: 700; }
  .modal-sub { font-size: 13px; color: #888; margin-bottom: 20px; }
  .modal-section { margin-bottom: 16px; }
  .modal-label { font-size: 11px; text-transform: uppercase; letter-spacing: 0.7px; color: #D4AF37; margin-bottom: 5px; }
  .modal-value { font-size: 13.5px; color: #D8D4CF; line-height: 1.6; }
  .modal-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
  .modal-tags { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 4px; }
</style>
</head>
<body>

<header class="header">
  <h1>MateMade · Brand DNA Matrix</h1>
  <p>Market positioning research — Vietnam &amp; international handbag market, clustered by design DNA</p>
  <div class="meta-row">
    <span class="meta-chip">📅 ${new Date().toLocaleDateString('vi-VN')}</span>
    <span class="meta-chip">🏷 ${data.totalBrands || clusters.reduce((n, c) => n + c.brands.length, 0)} brands</span>
    <span class="meta-chip">🗂 ${clusters.length} clusters</span>
    <span class="meta-chip">⭐ Subject: MateMade</span>
    <span class="meta-chip">👆 Click any card for full DNA detail</span>
  </div>
</header>
${methodNote}

<main class="main">
  ${matemadeSection}
  ${clusterCards.join('\n')}
  ${whiteSpaceSection}
</main>

<footer class="footer">MateMade · Brand Matrix Pipeline · Fashion DNA Analysis</footer>

<div class="modal-overlay" id="modalOverlay" onclick="if(event.target===this) closeModal()">
  <div class="modal-box" style="position:relative;">
    <button class="modal-close" onclick="closeModal()">×</button>
    <div id="modalContent"></div>
  </div>
</div>

<script>
const BRAND_DATA = ${JSON.stringify(modalData)};

function openModal(id) {
  const d = BRAND_DATA[id];
  if (!d) return;
  const a = d.analysis || {};
  const tagRow = (arr) => (arr && arr.length) ? '<div class="modal-tags">' + arr.map(t => '<span class="tag">' + t + '</span>').join('') + '</div>' : '';
  const row = (label, value) => value ? '<div class="modal-section"><div class="modal-label">' + label + '</div><div class="modal-value">' + value + '</div></div>' : '';
  const html = \`
    <div class="modal-header">
      <div class="modal-title">\${d.clusterEmoji || ''} \${d.name}</div>
    </div>
    <div class="modal-sub">\${d.country} · \${d.priceRange} · \${d.clusterName}</div>
    \${row('DNA Summary', a.dnaSummary)}
    <div class="modal-grid">
      \${row('Color DNA', a.colorDNA)}
      \${row('Material Vibe', a.materialVibe)}
      \${row('Silhouette Language', a.silhouetteLanguage)}
      \${row('Hardware Details', a.hardwareDetails)}
      \${row('Customer Archetype', a.customerArchetype)}
      \${row('Price Perception', a.pricePerception)}
    </div>
    \${row('Brand Personality', (a.brandPersonality||[]).join(' · '))}
    \${row('Occasion Fit', (a.occasionFit||[]).join(' · '))}
    \${row('Fashion References', (a.fashionReferences||[]).join(' · '))}
    \${row('Positioning Keywords', null)}
    \${tagRow(a.positioningKeywords)}
    \${d.crossover ? row('Crossover Note', d.crossover) : ''}
  \`;
  document.getElementById('modalContent').innerHTML = html;
  document.getElementById('modalOverlay').classList.add('open');
}
function closeModal() { document.getElementById('modalOverlay').classList.remove('open'); }
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });
</script>

</body>
</html>`;
}

async function main() {
  const data = JSON.parse(await fs.readFile(CLUSTERS_FILE, 'utf8'));
  const { brands } = JSON.parse(await fs.readFile(BRANDS_FILE, 'utf8'));

  await fs.ensureDir(OUTPUT_DIR);

  console.log('Building enhanced HTML visualization...');
  const html = await buildHtml(data, brands);

  const outputPath = path.join(OUTPUT_DIR, 'brand-matrix.html');
  await fs.writeFile(outputPath, html, 'utf8');

  console.log('Visualization ready:', outputPath);
  console.log('Bytes:', html.length);
}

main().catch(err => {
  console.error('Fatal:', err.message, err.stack);
  process.exit(1);
});
