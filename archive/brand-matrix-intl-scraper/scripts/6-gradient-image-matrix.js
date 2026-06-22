import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
const BRANDS_FILE = path.join(ROOT, 'data', 'brands.json');
const ANALYSIS_FILE = path.join(ROOT, 'data', 'brand-analysis.json');
const IMAGES_DIR = path.join(ROOT, 'images');
const OUTPUT_DIR = path.join(ROOT, 'output');

// Layout constants — tuned for large, readable image collages with horizontal scroll.
const COLLAGE = 170;       // px, normal brand collage size
const MATE_COLLAGE = 230;  // px, MateMade collage size (bigger, highlighted)
const TICK_GAP = 56;       // px, space between collage/rail and label block
const LABEL_H = 46;        // px, space reserved for name+meta text
const SMALL_GAP = 70;      // px, minimum gap between any two consecutive points
const SAME_SIDE_GAP = 260; // px, minimum gap between points sharing the same above/below side
const LEFT_MARGIN = 130;
const RIGHT_MARGIN = 170;
const GUESS_WIDTH = 1700;  // px, initial proportional scale before min-gap enforcement

function esc(s) {
  return String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

async function getImages(brandId, max = 4) {
  const dir = path.join(IMAGES_DIR, brandId);
  if (!await fs.pathExists(dir)) return [];
  const files = (await fs.readdir(dir))
    .filter(f => /\.(jpg|jpeg|png|webp)$/i.test(f))
    .sort()
    .slice(0, max);
  const out = [];
  for (const f of files) {
    try {
      const data = await fs.readFile(path.join(dir, f));
      const ext = path.extname(f).slice(1).toLowerCase();
      const mime = ext === 'png' ? 'image/png' : ext === 'webp' ? 'image/webp' : 'image/jpeg';
      out.push(`data:${mime};base64,${data.toString('base64')}`);
    } catch {}
  }
  return out;
}

const FLAG = { VN:'🇻🇳', KR:'🇰🇷', FR:'🇫🇷', US:'🇺🇸', GB:'🇬🇧', SE:'🇸🇪', JP:'🇯🇵', IT:'🇮🇹', DK:'🇩🇰', DE:'🇩🇪', NL:'🇳🇱', BG:'🇧🇬', TR:'🇹🇷', ES:'🇪🇸', HU:'🇭🇺', AU:'🇦🇺', FI:'🇫🇮', IE:'🇮🇪' };

// Five style-gradient axes, each point = one brand at its relative position (0–100) on the axis.
const AXES = [
  {
    id: 'minimal-frilly',
    title: 'Tối giản · cao cấp ↔ Rườm rà · nữ tính',
    note: 'Trục về mức độ trang trí: một đầu là sự vắng mặt hoàn toàn của chi tiết (đường cắt sạch, không phụ kiện), đầu kia là bow, ruy băng, bèo nhún chồng lớp.',
    poleA: 'Tối giản · cao cấp', poleB: 'Rườm rà · nữ tính',
    points: [
      { id: 'the-row', pos: 3 }, { id: 'savette', pos: 9 }, { id: 'toteme', pos: 17 },
      { id: 'polene', pos: 24 }, { id: 'lak-store', pos: 33 }, { id: 'matemade', pos: 50 },
      { id: 'saabi', pos: 68 }, { id: 'sandy-liang', pos: 90 },
    ],
  },
  {
    id: 'sincere-ironic',
    title: 'Chân thành · ngây thơ ↔ Mỉa mai · tự-ý-thức',
    note: 'Trục về thái độ với chính phong cách của mình: tin vào vẻ ngây thơ một cách thật lòng, hay coi nó như một trò chơi tạo dáng có chủ đích, mang tính giễu nhẹ.',
    poleA: 'Chân thành · ngây thơ', poleB: 'Mỉa mai · tự-ý-thức',
    points: [
      { id: 'cou-cou', pos: 5 }, { id: 'andgather', pos: 12 }, { id: 'matemade', pos: 25 },
      { id: 'sezane', pos: 38 }, { id: 'doen', pos: 44 }, { id: 'sandy-liang', pos: 65 },
      { id: 'ader-error', pos: 88 }, { id: 'acne-studios', pos: 95 },
    ],
  },
  {
    id: 'soft-structured',
    title: 'Mềm · tròn · phồng ↔ Cấu trúc · kiến trúc',
    note: 'Trục về ngôn ngữ hình khối: dáng bồng bềnh ôm tròn tự nhiên, hay dáng dựng hình học với đường nét sắc và góc rõ.',
    poleA: 'Mềm · tròn · phồng', poleB: 'Cấu trúc · góc cạnh',
    points: [
      { id: 'cou-cou', pos: 5 }, { id: 'doen', pos: 12 }, { id: 'matemade', pos: 30 },
      { id: 'mansur-gavriel', pos: 46 }, { id: 'polene', pos: 65 }, { id: 'the-row', pos: 85 },
      { id: 'savette', pos: 91 }, { id: 'boyy', pos: 96 },
    ],
  },
  {
    id: 'local-global',
    title: 'Bản địa Việt Nam ↔ Tham chiếu toàn cầu',
    note: 'Trục về nguồn tham chiếu thẩm mỹ: bắt nguồn và nói riêng cho thị giác Việt Nam, hay nói ngôn ngữ thời trang quốc tế không gắn với một thị trường cụ thể.',
    poleA: 'Bản địa Việt Nam', poleB: 'Tham chiếu toàn cầu',
    points: [
      { id: 'floral-punk', pos: 5 }, { id: 'andgather', pos: 13 }, { id: 'matemade', pos: 30 },
      { id: 'stand-oil', pos: 45 }, { id: 'matin-kim', pos: 51 }, { id: 'sandy-liang', pos: 70 },
      { id: 'jacquemus', pos: 76 }, { id: 'loewe', pos: 88 }, { id: 'celine', pos: 92 }, { id: 'the-row', pos: 96 },
    ],
  },
  {
    id: 'quiet-loud',
    title: 'Màu trầm · tĩnh ↔ Màu rực · maximalist',
    note: 'Trục về bảng màu: trung tính tắt tiếng (đen, kem, xám), hay bão hòa cao và nhiều màu cùng lúc.',
    poleA: 'Màu trầm · tĩnh', poleB: 'Màu rực · maximalist',
    points: [
      { id: 'the-row', pos: 3 }, { id: 'second-layer', pos: 9 }, { id: 'cos', pos: 14 },
      { id: 'lak-store', pos: 21 }, { id: 'the-wayward', pos: 27 }, { id: 'matemade', pos: 45 },
      { id: 'sezane', pos: 52 }, { id: 'saabi', pos: 70 }, { id: 'marimekko', pos: 90 },
      { id: 'floral-punk', pos: 93 }, { id: 'ader-error', pos: 96 },
    ],
  },
];

function layoutAxis(points) {
  // Sort by intended position, keep stable order for ties.
  const sorted = points.map((p, idx) => ({ ...p, origIdx: idx })).sort((a, b) => a.pos - b.pos || a.origIdx - b.origIdx);

  const xs = sorted.map(p => LEFT_MARGIN + (p.pos / 100) * GUESS_WIDTH);
  for (let i = 1; i < xs.length; i++) {
    let minX = xs[i - 1] + SMALL_GAP;
    if (i >= 2) minX = Math.max(minX, xs[i - 2] + SAME_SIDE_GAP);
    xs[i] = Math.max(xs[i], minX);
  }

  sorted.forEach((p, i) => {
    p.x = xs[i];
    p.side = i % 2 === 0 ? 'above' : 'below';
  });

  const trackWidth = xs[xs.length - 1] + RIGHT_MARGIN;
  return { items: sorted, trackWidth: Math.max(trackWidth, GUESS_WIDTH + LEFT_MARGIN + RIGHT_MARGIN) };
}

async function buildAxisHtml(axis, brandsById, analysisById, imageCache) {
  const { items, trackWidth } = layoutAxis(axis.points);
  const html = [];

  for (const pt of items) {
    const b = brandsById[pt.id];
    if (!b) continue;
    const isMate = pt.id === 'matemade';
    const imgs = imageCache[pt.id] || [];
    const flag = FLAG[b.country] || '🌐';
    const size = isMate ? MATE_COLLAGE : COLLAGE;

    let collage;
    if (imgs.length === 0) {
      collage = `<div class="collage no-img${isMate ? ' mate' : ''}" style="width:${size}px;height:${size}px;font-size:${Math.round(size * 0.36)}px;">${esc(b.name.charAt(0))}</div>`;
    } else {
      const shown = imgs.slice(0, isMate ? 6 : 4);
      const gridClass = isMate ? 'grid6' : (shown.length >= 4 ? 'grid4' : shown.length === 3 ? 'grid3' : shown.length === 2 ? 'grid2' : 'grid1');
      const tiles = shown.map(src => `<img src="${src}" alt="${esc(b.name)}" loading="lazy">`).join('');
      collage = `<div class="collage ${gridClass}${isMate ? ' mate' : ''}" style="width:${size}px;height:${size}px;">${tiles}</div>`;
    }

    html.push(`
      <div class="point" style="left:${pt.x}px;" data-side="${pt.side}">
        <div class="tick" style="${pt.side === 'above' ? `height:${TICK_GAP}px;top:-${TICK_GAP}px;` : `height:${TICK_GAP}px;top:1px;`}"></div>
        ${collage}
        <div class="label${isMate ? ' mate' : ''}">
          <div class="lname">${isMate ? '⭐ ' : ''}${esc(b.name)}</div>
          <div class="lmeta">${flag} ${esc(b.priceRange || '')}</div>
        </div>
      </div>`);
  }

  return `
    <section class="axis">
      <div class="axis-head">
        <h2>${esc(axis.title)}</h2>
        <p>${esc(axis.note)}</p>
      </div>
      <div class="poles">
        <span>${esc(axis.poleA)} →</span>
        <span>← ${esc(axis.poleB)}</span>
      </div>
      <div class="track-scroll">
        <div class="track" style="width:${trackWidth}px;">
          <div class="rail"></div>
          ${html.join('')}
        </div>
      </div>
    </section>`;
}

async function main() {
  const { brands } = JSON.parse(await fs.readFile(BRANDS_FILE, 'utf8'));
  const analysis = JSON.parse(await fs.readFile(ANALYSIS_FILE, 'utf8'));
  const brandsById = Object.fromEntries(brands.map(b => [b.id, b]));

  const neededIds = new Set();
  for (const axis of AXES) for (const pt of axis.points) neededIds.add(pt.id);
  const imageCache = {};
  for (const id of neededIds) {
    imageCache[id] = await getImages(id, id === 'matemade' ? 6 : 4);
  }

  const axisSections = [];
  for (const axis of AXES) {
    axisSections.push(await buildAxisHtml(axis, brandsById, analysis, imageCache));
  }

  const missing = [...neededIds].filter(id => (imageCache[id] || []).length === 0);

  const html = `<!DOCTYPE html>
<html lang="vi">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>MateMade · Ma trận hình ảnh theo trục phong cách</title>
<style>
  *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
  body{font-family:-apple-system,'Inter',sans-serif;background:#0A0A0A;color:#E4E0DB;min-height:100vh;padding-bottom:60px}
  .top{padding:44px 40px 28px;border-bottom:1px solid #1C1C1C}
  .top h1{font-size:26px;font-weight:700;letter-spacing:-0.4px}
  .top p{margin-top:8px;color:#777;font-size:13.5px;line-height:1.6;max-width:760px}
  .legend{display:flex;gap:18px;margin-top:16px;font-size:12.5px;color:#999;align-items:center}
  .legend .dot{width:10px;height:10px;border-radius:50%;display:inline-block;margin-right:6px;vertical-align:-1px}
  .legend .dot.mate{background:#D4AF37}
  .legend .dot.std{background:#555}
  .missing-note{margin-top:14px;font-size:12px;color:#8a6a1f;background:#1A1500;border:1px solid #D4AF3733;border-radius:8px;padding:10px 14px;max-width:760px;line-height:1.6}
  .hint{margin-top:10px;font-size:12px;color:#5a5a5a;}

  .main{padding:30px 40px;display:flex;flex-direction:column;gap:90px}

  .axis-head h2{font-size:18px;font-weight:600;color:#EDE9E3}
  .axis-head p{font-size:12.5px;color:#777;margin-top:4px;line-height:1.55;max-width:760px}
  .poles{display:flex;justify-content:space-between;font-size:12px;color:#888;margin-top:18px;text-transform:uppercase;letter-spacing:0.4px;font-weight:600}

  .track-scroll{overflow-x:auto;margin-top:16px;padding-bottom:18px;scrollbar-color:#3a3a3a #0d0d0d;scrollbar-width:thin;}
  .track-scroll::-webkit-scrollbar{height:8px}
  .track-scroll::-webkit-scrollbar-track{background:#111}
  .track-scroll::-webkit-scrollbar-thumb{background:#3a3a3a;border-radius:4px}

  .track{position:relative;height:560px;}
  .rail{position:absolute;top:50%;left:0;right:0;height:1px;background:#262626}

  .point{position:absolute;top:50%;width:0;}
  .point .tick{position:absolute;left:0;width:1px;background:#333}
  .point[data-side="above"] .collage{position:absolute;bottom:${TICK_GAP}px;left:50%;transform:translateX(-50%)}
  .point[data-side="above"] .label{position:absolute;bottom:-${LABEL_H}px;left:50%;transform:translateX(-50%)}
  .point[data-side="below"] .collage{position:absolute;top:${TICK_GAP}px;left:50%;transform:translateX(-50%)}
  .point[data-side="below"] .label{position:absolute;top:-${LABEL_H}px;left:50%;transform:translateX(-50%)}

  .collage{border-radius:14px;overflow:hidden;display:grid;background:#111;border:2px solid #2A2A2A;flex-shrink:0;gap:2px}
  .collage.grid1{grid-template-columns:1fr}
  .collage.grid2{grid-template-columns:1fr 1fr}
  .collage.grid3{grid-template-columns:1fr 1fr;grid-template-rows:1fr 1fr}
  .collage.grid3 img:first-child{grid-row:span 2}
  .collage.grid4{grid-template-columns:1fr 1fr;grid-template-rows:1fr 1fr}
  .collage.grid6{grid-template-columns:1fr 1fr 1fr;grid-template-rows:1fr 1fr}
  .collage img{width:100%;height:100%;object-fit:cover;display:block}
  .collage.mate{border-color:#D4AF37;border-width:3px;box-shadow:0 0 0 4px #D4AF3722}
  .collage.no-img{align-items:center;justify-content:center;font-weight:700;color:#3a3a3a;display:flex}

  .label{white-space:nowrap;text-align:center}
  .lname{font-size:13.5px;font-weight:600;color:#C8C4BF}
  .label.mate .lname{color:#D4AF37;font-size:14.5px}
  .lmeta{font-size:11px;color:#5a5a5a;margin-top:2px}

  footer{padding:24px 40px;border-top:1px solid #161616;font-size:11px;color:#3a3a3a;margin-top:20px}
</style>
</head>
<body>

<div class="top">
  <h1>MateMade · Ma trận hình ảnh theo 5 trục phong cách</h1>
  <p>Mỗi trục là một thang gradient phong cách, hai đầu là hai cực đối lập. Mỗi brand được đặt vào đúng vị trí tương đối trên trục, kèm collage ảnh sản phẩm thật (lấy từ dữ liệu đã scrape) để minh họa trực quan cho vị trí đó.</p>
  <div class="legend">
    <span><span class="dot mate"></span>MateMade — theo dõi qua từng trục</span>
    <span><span class="dot std"></span>Brand khác</span>
  </div>
  <div class="hint">↔ Cuộn ngang trong từng trục để xem hết các brand — ảnh đã phóng to để xem rõ chi tiết sản phẩm.</div>
  ${missing.length ? `<div class="missing-note">⚠️ Chưa có ảnh sản phẩm đã scrape cho: ${missing.map(id => esc(brandsById[id]?.name || id)).join(', ')} — các brand này hiện hiển thị placeholder (chữ cái đầu) thay cho collage ảnh.</div>` : ''}
</div>

<main class="main">
  ${axisSections.join('\n')}
</main>

<footer>MateMade · Brand DNA Matrix — Gradient axes with product image collage · Generated ${new Date().toLocaleDateString('vi-VN')}</footer>

</body>
</html>`;

  await fs.ensureDir(OUTPUT_DIR);
  const outPath = path.join(OUTPUT_DIR, 'gradient-image-matrix.html');
  await fs.writeFile(outPath, html, 'utf8');
  console.log('Wrote', outPath);
  console.log('Missing images for:', missing.join(', ') || 'none');
}

main().catch(err => {
  console.error('Fatal:', err.message);
  process.exit(1);
});
