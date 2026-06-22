/**
 * Derive x/y brand coordinates using Claude to score dnaSummary directly.
 *
 * More accurate than keyword matching — AI reads the brand description and
 * returns a position on the 2 axes with reasoning.
 *
 * X axis: Cute/Sweet/Playful (-1.2) ↔ Cool/Minimal/Polished (+1.2)
 * Y axis: Daily/Utility/Value (-1.2) ↔ Statement/Design/Craft (+1.2)
 */

import Anthropic from '@anthropic-ai/sdk';
import fs from 'fs';
import path from 'path';

const ANALYSIS_FILE = 'D:/WORK/2606/MateMade/archive/brand-matrix-intl-scraper/data/brand-analysis.json';
const OUTPUT_FILE = 'D:/WORK/2606/MateMade/derived-coordinates.json';

// Load .env from the intl-scraper directory
const envPath = 'D:/WORK/2606/MateMade/archive/brand-matrix-intl-scraper/.env';
if (fs.existsSync(envPath)) {
  for (const line of fs.readFileSync(envPath, 'utf8').split('\n')) {
    const [key, ...vals] = line.split('=');
    if (key && !key.startsWith('#')) process.env[key.trim()] = vals.join('=').trim();
  }
}

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const SCORING_PROMPT = `You are positioning brands on a 2D fashion map.

AXIS DEFINITIONS:
- X axis: Cute/Sweet/Playful (-1.2) ↔ Cool/Minimal/Polished (+1.2)
  - Cute extreme (-1.2): kawaii, bow-core, doll aesthetic, candy colors, charm-heavy
  - Cool extreme (+1.2): ultra-minimal, architectural, Celine-like restraint, monochrome
  - Center (0): balanced feminine, Korean accessible fashion

- Y axis: Daily/Utility/Value (-1.2) ↔ Statement/Design/Craft (+1.2)
  - Daily extreme (-1.2): everyday carry, commuter, budget, campus bag
  - Craft extreme (+1.2): sculptural art object, handmade luxury, collector piece
  - Center (0): standard accessible fashion

CALIBRATION EXAMPLES:
- Celine: x=+1.1, y=+0.3 (ultra minimal, slightly elevated craft)
- Loewe: x=+0.5, y=+1.1 (cool but sculptural art)
- Sandy Liang: x=-0.7, y=+0.2 (cute girlhood but premium downtown)
- Stand Oil: x=+0.3, y=-0.3 (Korean street cool, everyday accessible)
- Juno (VN): x=-0.9, y=-0.5 (kawaii idol, affordable everyday)
- Hapas (VN): x=+0.2, y=-0.3 (Korean-influenced, accessible mass market)
- MateMade (VN): x=-0.8, y=-0.1 (coquette-kawaii charm, affordable everyday)
- Bottega Veneta: x=+0.9, y=+1.0 (minimal restraint + intrecciato craft luxury)

Given the brand description below, return ONLY a JSON object:
{
  "x": <number from -1.2 to 1.2>,
  "y": <number from -1.2 to 1.2>,
  "xReason": "<10-word explanation>",
  "yReason": "<10-word explanation>"
}`;

async function scoreBrand(brand) {
  const description = [
    `Brand: ${brand.brandName} (${brand.country || ''})`,
    `Price: ${brand.priceRange || ''}`,
    `DNA: ${brand.dnaSummary || ''}`,
    `Aesthetic: ${(brand.aestheticStyle || []).join(', ')}`,
    `Personality: ${(brand.brandPersonality || []).join(', ')}`,
    `Occasions: ${(brand.occasionFit || []).join(', ')}`,
  ].join('\n');

  const response = await client.messages.create({
    model: 'claude-haiku-4-5-20251001',
    max_tokens: 200,
    messages: [{
      role: 'user',
      content: `${SCORING_PROMPT}\n\n${description}`,
    }],
  });

  const raw = response.content[0].text;
  const jsonMatch = raw.match(/\{[\s\S]+\}/);
  if (!jsonMatch) throw new Error('No JSON in response');
  const cleaned = jsonMatch[0].replace(/:\s*\+(\d)/g, ': $1');
  const parsed = JSON.parse(cleaned);

  return {
    x: Math.max(-1.2, Math.min(1.2, Math.round(parsed.x * 100) / 100)),
    y: Math.max(-1.2, Math.min(1.2, Math.round(parsed.y * 100) / 100)),
    xReason: parsed.xReason,
    yReason: parsed.yReason,
  };
}

async function main() {
  const analysis = JSON.parse(fs.readFileSync(ANALYSIS_FILE, 'utf8'));
  const brands = Object.values(analysis);

  // Load existing output to allow incremental runs
  let existing = { brands: [] };
  try { existing = JSON.parse(fs.readFileSync(OUTPUT_FILE, 'utf8')); } catch {}
  const doneIds = new Set(existing.brands.map(b => b.id));

  const results = [...existing.brands];

  console.log(`\n📍 Scoring ${brands.length} brands on orbit map...\n`);
  console.log('Brand'.padEnd(22) + 'x'.padStart(7) + 'y'.padStart(7));
  console.log('─'.repeat(50));

  for (let i = 0; i < brands.length; i++) {
    const brand = brands[i];
    if (doneIds.has(brand.brandId)) {
      const cached = existing.brands.find(b => b.id === brand.brandId);
      console.log(`[${i+1}/${brands.length}] ✓ ${brand.brandName} (cached) x=${cached.x} y=${cached.y}`);
      continue;
    }

    process.stdout.write(`[${i+1}/${brands.length}] ${brand.brandName}... `);
    try {
      const score = await scoreBrand(brand);
      results.push({
        id: brand.brandId,
        name: brand.brandName,
        x: score.x,
        y: score.y,
        xReason: score.xReason,
        yReason: score.yReason,
        dnaSummary: brand.dnaSummary,
      });

      // Save after each brand
      const output = {
        method: 'AI-scored from dnaSummary via claude-haiku',
        axes: {
          x: 'Cute/Sweet/Playful (-1.2) ↔ Cool/Minimal/Polished (+1.2)',
          y: 'Daily/Utility/Value (-1.2) ↔ Statement/Design/Craft (+1.2)',
        },
        brands: results,
      };
      fs.writeFileSync(OUTPUT_FILE, JSON.stringify(output, null, 2));

      console.log(`x=${score.x} y=${score.y}  ${score.xReason}`);
    } catch (err) {
      console.log(`ERROR: ${err.message}`);
    }

    await new Promise(r => setTimeout(r, 600));
  }

  // Sort by x
  results.sort((a, b) => a.x - b.x);
  const output = {
    method: 'AI-scored from dnaSummary via claude-haiku',
    axes: {
      x: 'Cute/Sweet/Playful (-1.2) ↔ Cool/Minimal/Polished (+1.2)',
      y: 'Daily/Utility/Value (-1.2) ↔ Statement/Design/Craft (+1.2)',
    },
    brands: results,
  };
  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(output, null, 2));

  console.log(`\n✅ Done. ${results.length} brands saved to derived-coordinates.json`);
}

main().catch(err => {
  console.error('Fatal:', err.message);
  process.exit(1);
});
