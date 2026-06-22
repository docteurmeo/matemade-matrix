/**
 * Analyze research-brands/ images with Claude vision + score x/y coordinates.
 * Output: D:\WORK\2606\MateMade\research-brands-analysis.json
 */

import Anthropic from '@anthropic-ai/sdk';
import fs from 'fs';
import path from 'path';

const RESEARCH_BRANDS_DIR = 'D:/WORK/2606/MateMade/research-brands';
const OUTPUT_FILE = 'D:/WORK/2606/MateMade/research-brands-analysis.json';

// Load .env
const envPath = path.join(path.dirname(new URL(import.meta.url).pathname.slice(1)), '..', '.env');
for (const line of fs.readFileSync(envPath.replace(/^\//, ''), 'utf8').split('\n')) {
  const [key, ...vals] = line.split('=');
  if (key && !key.startsWith('#')) process.env[key.trim()] = vals.join('=').trim();
}

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

// ─── MIME detection from magic bytes ────────────────────────────────────────
function detectMime(buf) {
  if (buf[0]===0x52&&buf[1]===0x49&&buf[2]===0x46&&buf[3]===0x46&&buf[8]===0x57&&buf[9]===0x45&&buf[10]===0x42&&buf[11]===0x50) return 'image/webp';
  if (buf[0]===0x89&&buf[1]===0x50&&buf[2]===0x4E&&buf[3]===0x47) return 'image/png';
  if (buf[0]===0xFF&&buf[1]===0xD8) return 'image/jpeg';
  if (buf[0]===0x47&&buf[1]===0x49&&buf[2]===0x46) return 'image/gif';
  return 'image/jpeg';
}

// ─── VISION ANALYSIS PROMPT ─────────────────────────────────────────────────
const ANALYSIS_PROMPT = `You are a senior fashion brand analyst specializing in bag/accessories brands.

Analyze these product images and return ONLY valid JSON:
{
  "dnaSummary": "One precise sentence — what this brand IS, who carries it, what it signals",
  "aestheticStyle": ["3-4 keywords"],
  "occasionFit": ["everyday","weekend","office","evening","travel"] (pick applicable),
  "pricePerception": "budget|affordable|mid-range|premium|luxury"
}`;

// ─── SCORING PROMPT ──────────────────────────────────────────────────────────
const SCORING_PROMPT = `Position this brand on a 2D fashion map. Return ONLY valid JSON:
{
  "x": <-1.2 to +1.2>,
  "y": <-1.2 to +1.2>,
  "xReason": "<10 words>",
  "yReason": "<10 words>"
}

X axis: Cute/Sweet/Playful (-1.2) ↔ Cool/Minimal/Polished (+1.2)
  -1.2 = kawaii/bow-core/doll/candy/charm-heavy
  0    = accessible Korean feminine, balanced
  +1.2 = ultra-minimal/architectural/Celine-like restraint

Y axis: Daily/Utility/Value (-1.2) ↔ Statement/Design/Craft (+1.2)
  -1.2 = budget everyday carry, campus bag
  0    = standard accessible fashion
  +1.2 = sculptural art object, handmade luxury, collector piece

Calibration:
- Toutou (VN kawaii trend): x=-1.1, y=-0.2
- MateMade (VN coquette charm): x=-0.8, y=-0.1
- Ngaos (VN full coquette): x=-0.5, y=+0.9
- Hapas (VN mass feminine): x=+0.2, y=-0.2
- Stand Oil (Korean street cool): x=+0.3, y=-0.3
- Chautfifth (VN editorial playful): x=+0.4, y=+1.0`;

async function analyzeImages(brandSlug) {
  const dir = path.join(RESEARCH_BRANDS_DIR, brandSlug);
  const files = fs.readdirSync(dir)
    .filter(f => /\.(jpg|jpeg|png|webp|gif)$/i.test(f))
    .slice(0, 4);

  if (files.length === 0) return null;

  const imageContent = [];
  for (const file of files) {
    const buf = fs.readFileSync(path.join(dir, file));
    const mime = detectMime(buf);
    imageContent.push({
      type: 'image',
      source: { type: 'base64', media_type: mime, data: buf.toString('base64') },
    });
  }

  const res = await client.messages.create({
    model: 'claude-haiku-4-5-20251001',
    max_tokens: 512,
    messages: [{ role: 'user', content: [...imageContent, { type: 'text', text: ANALYSIS_PROMPT }] }],
  });

  const raw = res.content[0].text;
  const m = raw.match(/\{[\s\S]+\}/);
  if (!m) throw new Error('No JSON in vision response');
  return JSON.parse(m[0]);
}

async function scoreCoordinates(brandSlug, analysis) {
  const prompt = `${SCORING_PROMPT}

Brand: ${brandSlug}
DNA: ${analysis.dnaSummary}
Aesthetic: ${analysis.aestheticStyle?.join(', ')}
Price: ${analysis.pricePerception}
Occasions: ${analysis.occasionFit?.join(', ')}`;

  const res = await client.messages.create({
    model: 'claude-haiku-4-5-20251001',
    max_tokens: 150,
    messages: [{ role: 'user', content: prompt }],
  });

  const raw = res.content[0].text;
  const m = raw.match(/\{[\s\S]+\}/);
  if (!m) throw new Error('No JSON in scoring response');
  const cleaned = m[0].replace(/:\s*\+(\d)/g, ': $1');
  const parsed = JSON.parse(cleaned);
  return {
    x: Math.max(-1.2, Math.min(1.2, Math.round(parsed.x * 100) / 100)),
    y: Math.max(-1.2, Math.min(1.2, Math.round(parsed.y * 100) / 100)),
    xReason: parsed.xReason,
    yReason: parsed.yReason,
  };
}

// ─── MAIN ───────────────────────────────────────────────────────────────────
const brandFolders = fs.readdirSync(RESEARCH_BRANDS_DIR)
  .filter(f => fs.statSync(path.join(RESEARCH_BRANDS_DIR, f)).isDirectory())
  .sort();

// Load existing output for incremental runs
let existing = {};
try { existing = JSON.parse(fs.readFileSync(OUTPUT_FILE, 'utf8')); } catch {}

console.log(`\n🔍 Analyzing ${brandFolders.length} brands in research-brands/\n`);
console.log('Brand'.padEnd(20) + 'x'.padStart(7) + 'y'.padStart(7) + '  Note');
console.log('─'.repeat(60));

for (let i = 0; i < brandFolders.length; i++) {
  const slug = brandFolders[i];

  if (existing[slug]) {
    const e = existing[slug];
    console.log(`[${i+1}/${brandFolders.length}] ✓ ${slug.padEnd(18)} x=${e.x} y=${e.y}  (cached)`);
    continue;
  }

  process.stdout.write(`[${i+1}/${brandFolders.length}] ${slug}... `);

  try {
    const analysis = await analyzeImages(slug);
    if (!analysis) { console.log('⚠ no images'); continue; }

    await new Promise(r => setTimeout(r, 400));

    const coords = await scoreCoordinates(slug, analysis);

    existing[slug] = { slug, ...analysis, ...coords };
    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(existing, null, 2));

    console.log(`x=${coords.x} y=${coords.y}  ${coords.xReason}`);
  } catch (err) {
    console.log(`ERROR: ${err.message}`);
  }

  await new Promise(r => setTimeout(r, 600));
}

// Final sorted output
const sorted = Object.values(existing).sort((a, b) => a.x - b.x);
console.log(`\n✅ Done. ${sorted.length} brands → research-brands-analysis.json`);
console.log('\nFinal orbit map:');
console.log('Brand'.padEnd(20) + 'x'.padStart(7) + 'y'.padStart(7));
console.log('─'.repeat(40));
for (const b of sorted) {
  console.log(b.slug.padEnd(20) + String(b.x).padStart(7) + String(b.y).padStart(7));
}
