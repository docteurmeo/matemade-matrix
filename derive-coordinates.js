/**
 * Derive x/y coordinates from AI brand analysis data.
 *
 * X axis: Cute/Sweet/Playful (-) ↔ Cool/Minimal/Polished (+)
 * Y axis: Daily/Utility/Value (-) ↔ Statement/Design/Craft (+)
 *
 * Every score is traceable to specific keywords in brand-analysis.json.
 */

import fs from 'fs';

const ANALYSIS_FILE = 'D:/WORK/2606/MateMade/archive/brand-matrix-intl-scraper/data/brand-analysis.json';

// ─── X AXIS KEYWORD WEIGHTS ──────────────────────────────────────────────────
// Positive = Cool/Minimal/Polished
// Negative = Cute/Sweet/Playful

const X_WEIGHTS = {
  // Strong cool/minimal (+)
  'minimal': +1.0, 'architectural': +1.0, 'understated': +1.0,
  'restrained': +1.0, 'quiet-luxury': +1.0, 'korean-cool': +1.0,
  'scandi-minimal': +1.0, 'french-minimal': +1.0, 'dark-minimal': +1.0,
  'monochrome': +0.9, 'monochrome-minimal': +1.0, 'clean': +0.8,
  'ultra-minimal': +1.1, 'parisian-minimal': +1.0, 'new-york-minimal': +0.9,
  'natural-minimal': +0.8, 'sporty-minimal': +0.7, 'architectural-minimal': +1.1,
  'cool': +0.9, 'intellectual': +0.8, 'sophisticated': +0.8,
  'refined': +0.9, 'timeless': +0.7, 'classic': +0.6,
  'classic-with-edge': +0.7, 'structured': +0.5, 'geometric': +0.7,
  'contemporary': +0.5, 'edgy': +0.6, 'downtown': +0.5,
  'korean-chic': +0.7, 'korean-functional': +0.5, 'korean-contemporary': +0.6,
  'Seoul-cool': +0.8, 'scandi-playful': +0.4, 'editorial-accessible': +0.3,
  'streetwear-adjacent': +0.4, 'functional': +0.3, 'utilitarian': +0.2,
  'sporty': +0.3, 'copenhagen-street': +0.5,

  // Strong cute/sweet/playful (-)
  'cute': -1.0, 'sweet': -1.0, 'playful': -0.9, 'kawaii': -1.1,
  'charm-heavy': -1.1, 'bow-core': -1.1, 'sincere-cute': -1.0,
  'kawaii-chic': -0.9, 'kawaii-lite': -1.0, 'toy-like': -0.9,
  'girlish': -0.8, 'girlhood': -0.9, 'coquette': -0.8,
  'colorful': -0.5, 'maximalist': -0.6, 'feminine-maximalist': -0.7,
  'expressive': -0.5, 'gen-z': -0.4, 'charm-heavy': -1.0,
  'candy': -1.0, 'pastel': -0.6, 'pastel-neutral': -0.2,
  'bold-print': -0.5, 'feminine-punk': -0.3, 'local-statement': -0.3,
  'accessible-fashion': -0.5, 'cotton-candy': -0.8, 'indie-girl': -0.5,
  'soft-feminine': -0.7, 'romantic': -0.4, 'nostalgic': -0.4,
  'feminine': -0.15, 'mass-aspiration': -0.1, 'OL-style': +0.2,
  'fashion-accessible': -0.2, 'accessible': -0.3, 'mainstream': -0.2,
};

// ─── Y AXIS KEYWORD WEIGHTS ──────────────────────────────────────────────────
// Positive = Statement/Design/Craft
// Negative = Daily/Utility/Value

const Y_WEIGHTS = {
  // Strong statement/design/craft (+)
  'sculptural': +1.1, 'art-object': +1.2, 'conceptual': +1.1,
  'avant-garde': +1.0, 'deconstructed': +1.0, 'wearable-art': +1.1,
  'editorial': +0.9, 'statement': +1.0, 'conversation-starter': +1.0,
  'collector-piece': +1.0, 'quirky': +0.8, 'british-wit': +0.7,
  'artisan': +0.9, 'artisan-craft': +1.0, 'artisan-story': +0.9,
  'artisan-summer': +0.6, 'handmade': +0.9, 'craft': +0.8,
  'heritage-craft': +0.9, 'japanese-craft': +1.0, 'wabi-sabi': +0.9,
  'natural-aging': +0.8, 'slow-fashion': +0.7, 'local-craft': +0.6,
  'design-forward': +0.8, 'geometric-patchwork': +0.8, 'sculptural-knot': +0.9,
  'dark-romantic': +0.7, 'floral-ornate': +0.7, 'feminine-strong': +0.6,
  'indie-artsy': +0.8, 'spanish-craft': +0.7, 'eastern-european': +0.5,
  'art-world': +0.9, 'fashion-forward': +0.6, 'viral-moment': +0.5,
  'instagram-viral': +0.4, 'limited': +0.5, 'exotic-materials': +0.9,
  'unique': +0.7, 'sustainable-luxe': +0.6, 'conscious': +0.5,
  'heritage': +0.7, 'royal-adjacent': +0.6, 'british': +0.4,
  'intellectual': +0.6, 'old-money': +0.8, 'luxury-reference': +0.9,
  'intrecciato-craft': +1.1, 'no-logo': +0.6,

  // Strong daily/utility/value (-)
  'functional': -0.8, 'utilitarian': -0.9, 'utility': -0.8,
  'practical': -0.7, 'commuter': -0.7, 'commuter-chic': -0.5,
  'mass-market': -0.6, 'accessible': -0.5, 'mass-aspiration': -0.4,
  'everyday': -0.5, 'campus': -0.7, 'campus-cute': -0.6,
  'functional-excellence': -0.8, 'Japanese-precision': -0.5,
  'nylon-craft': -0.3, 'quality-basics': -0.4, 'earthy': -0.2,
  'natural-minimal': -0.2, 'fewer-better': -0.3, 'functional-luxury': -0.1,
  'functional-first': -0.6, 'workwear': -0.5, 'ol-image': -0.4,
  'affordable': -0.3, 'accessible-fashion': -0.5,
  'streetwear': -0.3, 'sporty': -0.4, 'sporty-minimal': -0.5,
  'urban-utility': -0.6, 'street-utility': -0.8, 'street-sporty': -0.6,
  'value': -0.6, 'budget': -0.5,
};

// ─── OCCASION ADJUSTMENTS ────────────────────────────────────────────────────
const OCCASION_Y = {
  'everyday': -0.35,
  'office': -0.25,
  'travel': -0.15,
  'weekend': +0.10,
  'evening': +0.45,
};

// ─── PRICE ADJUSTMENTS ───────────────────────────────────────────────────────
const PRICE_Y = {
  'budget': -0.30,
  'affordable': -0.10,
  'mid-range': 0,
  'premium': +0.20,
  'luxury': +0.40,
};

const PRICE_X = {
  'budget': -0.10,
  'affordable': -0.05,
  'mid-range': 0,
  'premium': +0.10,
  'luxury': +0.15,
};

// ─── SCORING FUNCTION ────────────────────────────────────────────────────────
function scoreBrand(brand) {
  // Deduplicate across fields to avoid double-counting overlapping keywords
  const keywords = [...new Set([
    ...(brand.aestheticStyle || []),
    ...(brand.brandPersonality || []),
    ...(brand.positioningKeywords || []),
  ].map(k => k.toLowerCase().trim()))];

  let rawX = 0, rawY = 0;
  const xTrace = [], yTrace = [];

  for (const kw of keywords) {
    if (X_WEIGHTS[kw] !== undefined) {
      rawX += X_WEIGHTS[kw];
      xTrace.push(`${kw}(${X_WEIGHTS[kw] > 0 ? '+' : ''}${X_WEIGHTS[kw]})`);
    }
    if (Y_WEIGHTS[kw] !== undefined) {
      rawY += Y_WEIGHTS[kw];
      yTrace.push(`${kw}(${Y_WEIGHTS[kw] > 0 ? '+' : ''}${Y_WEIGHTS[kw]})`);
    }
  }

  // Occasion adjustment (Y only)
  let occasionAdj = 0;
  for (const occ of (brand.occasionFit || [])) {
    const adj = OCCASION_Y[occ] || 0;
    occasionAdj += adj;
    if (adj !== 0) yTrace.push(`occasion:${occ}(${adj > 0 ? '+' : ''}${adj})`);
  }
  rawY += occasionAdj;

  // Price perception adjustments
  const price = brand.pricePerception;
  const priceAdjX = PRICE_X[price] || 0;
  const priceAdjY = PRICE_Y[price] || 0;
  if (priceAdjX) xTrace.push(`price:${price}(${priceAdjX > 0 ? '+' : ''}${priceAdjX})`);
  if (priceAdjY) yTrace.push(`price:${price}(${priceAdjY > 0 ? '+' : ''}${priceAdjY})`);
  rawX += priceAdjX;
  rawY += priceAdjY;

  // Normalize: clamp raw score, then scale to [-1.2, +1.2]
  // After dedup, typical raw range is -7 to +7
  const SCALE = 7.0;
  const x = Math.max(-1.2, Math.min(1.2, rawX / SCALE));
  const y = Math.max(-1.2, Math.min(1.2, rawY / SCALE));

  return {
    id: brand.brandId,
    name: brand.brandName,
    x: Math.round(x * 100) / 100,
    y: Math.round(y * 100) / 100,
    rawX: Math.round(rawX * 100) / 100,
    rawY: Math.round(rawY * 100) / 100,
    xTrace,
    yTrace,
  };
}

// ─── MAIN ────────────────────────────────────────────────────────────────────
const analysis = JSON.parse(fs.readFileSync(ANALYSIS_FILE, 'utf8'));
const results = [];

for (const brand of Object.values(analysis)) {
  const score = scoreBrand(brand);
  results.push(score);
}

// Sort by x for easy reading
results.sort((a, b) => a.x - b.x);

console.log('\n📍 Derived x/y coordinates from AI analysis:\n');
console.log('Brand'.padEnd(22) + 'x'.padStart(7) + 'y'.padStart(7) + '  Territory hint');
console.log('─'.repeat(70));

for (const r of results) {
  const xLabel = r.x < -0.5 ? 'CUTE/SWEET' : r.x > 0.5 ? 'COOL/MINIMAL' : 'CENTER';
  const yLabel = r.y > 0.4 ? '↑CRAFT/STMT' : r.y < -0.4 ? '↓DAILY/UTIL' : '';
  console.log(
    r.name.padEnd(22) +
    String(r.x).padStart(7) +
    String(r.y).padStart(7) +
    `  ${xLabel} ${yLabel}`
  );
}

// Save full output with traces
const output = {
  method: 'Derived from AI brand-analysis.json via keyword scoring',
  axes: {
    x: 'Cute/Sweet/Playful (-1.2) ↔ Cool/Minimal/Polished (+1.2)',
    y: 'Daily/Utility/Value (-1.2) ↔ Statement/Design/Craft (+1.2)',
  },
  brands: results,
};

fs.writeFileSync(
  'D:/WORK/2606/MateMade/derived-coordinates.json',
  JSON.stringify(output, null, 2)
);
console.log('\n✅ Full output with traces saved to derived-coordinates.json');
