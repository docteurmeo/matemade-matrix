import Anthropic from '@anthropic-ai/sdk';
import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
const BRANDS_FILE = path.join(ROOT, 'data', 'brands.json');
const IMAGES_DIR = path.join(ROOT, 'images');
const ANALYSIS_FILE = path.join(ROOT, 'data', 'brand-analysis.json');

// Load env
const envPath = path.join(ROOT, '.env');
if (await fs.pathExists(envPath)) {
  const envContent = await fs.readFile(envPath, 'utf8');
  for (const line of envContent.split('\n')) {
    const [key, ...vals] = line.split('=');
    if (key && !key.startsWith('#')) process.env[key.trim()] = vals.join('=').trim();
  }
}

if (!process.env.ANTHROPIC_API_KEY) {
  console.error('❌ Missing ANTHROPIC_API_KEY in .env file');
  console.error('   Copy .env.example to .env and add your key from: https://console.anthropic.com/');
  process.exit(1);
}

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const ANALYSIS_PROMPT = `You are a senior fashion brand analyst specializing in bag and accessories brands, with deep knowledge of fashion movements, aesthetics, and consumer psychology.

Analyze the product images from this brand and extract a structured DNA profile. Be specific and use fashion industry terminology. Avoid generic descriptions.

Return ONLY a valid JSON object with these fields:
{
  "aestheticStyle": ["3-5 specific keywords, e.g. 'quiet-luxury', 'architectural-minimal', 'korean-cool'"],
  "colorDNA": "Describe the color philosophy in 1-2 sentences (e.g. 'Anchored in warm neutrals — camel, cognac, off-white — with occasional dusty pastels')",
  "materialVibe": "Texture and material characteristics in 1 sentence",
  "silhouetteLanguage": "Shape vocabulary in 1 sentence (structured/slouchy/geometric/organic etc)",
  "hardwareDetails": "Hardware philosophy in 1 phrase",
  "customerArchetype": "2-sentence persona of who carries this bag",
  "occasionFit": ["everyday", "weekend", "office", "evening", "travel"] (pick all that apply),
  "fashionReferences": ["3-5 fashion movements, designers, films, or aesthetics this evokes"],
  "pricePerception": "budget | affordable | mid-range | premium | luxury",
  "brandPersonality": ["3-4 personality adjectives, e.g. 'intellectual', 'playful', 'refined'"],
  "dnaSummary": "One sentence core brand identity — the most precise possible description",
  "positioningKeywords": ["5-7 keywords for clustering with other brands"]
}`;

function detectMimeType(buf) {
  // WebP: RIFF????WEBP
  if (buf[0] === 0x52 && buf[1] === 0x49 && buf[2] === 0x46 && buf[3] === 0x46 &&
      buf[8] === 0x57 && buf[9] === 0x45 && buf[10] === 0x42 && buf[11] === 0x50) {
    return 'image/webp';
  }
  // PNG: \x89PNG
  if (buf[0] === 0x89 && buf[1] === 0x50 && buf[2] === 0x4E && buf[3] === 0x47) {
    return 'image/png';
  }
  // JPEG: \xFF\xD8
  if (buf[0] === 0xFF && buf[1] === 0xD8) {
    return 'image/jpeg';
  }
  // GIF: GIF8
  if (buf[0] === 0x47 && buf[1] === 0x49 && buf[2] === 0x46) {
    return 'image/gif';
  }
  return 'image/jpeg';
}

async function imageToBase64(filePath) {
  const data = await fs.readFile(filePath);
  const mediaType = detectMimeType(data);
  return { data: data.toString('base64'), mediaType };
}

async function analyzeBrand(brand) {
  const brandDir = path.join(IMAGES_DIR, brand.id);
  if (!await fs.pathExists(brandDir)) {
    console.warn(`  ⚠ No image directory for ${brand.name}`);
    return null;
  }

  const files = (await fs.readdir(brandDir))
    .filter(f => /\.(jpg|jpeg|png|webp)$/i.test(f))
    .slice(0, 4); // max 4 images per brand for cost efficiency

  if (files.length === 0) {
    console.warn(`  ⚠ No images found for ${brand.name}`);
    return null;
  }

  const imageContent = [];
  for (const file of files) {
    try {
      const { data, mediaType } = await imageToBase64(path.join(brandDir, file));
      imageContent.push({
        type: 'image',
        source: { type: 'base64', media_type: mediaType, data },
      });
    } catch {}
  }

  if (imageContent.length === 0) return null;

  const messages = [{
    role: 'user',
    content: [
      ...imageContent,
      {
        type: 'text',
        text: `Brand: ${brand.name} (${brand.origin})\nPrice range: ${brand.priceRange} (~$${brand.priceUSD})\n\n${ANALYSIS_PROMPT}`,
      },
    ],
  }];

  const response = await client.messages.create({
    model: 'claude-sonnet-4-6',
    max_tokens: 1024,
    messages,
  });

  const raw = response.content[0].text;
  const jsonMatch = raw.match(/\{[\s\S]+\}/);
  if (!jsonMatch) throw new Error('No JSON in response');

  return JSON.parse(jsonMatch[0]);
}

async function main() {
  const { brands } = JSON.parse(await fs.readFile(BRANDS_FILE, 'utf8'));

  let analysis = {};
  try { analysis = JSON.parse(await fs.readFile(ANALYSIS_FILE, 'utf8')); } catch {}

  const todo = brands.filter(b => !analysis[b.id]);
  console.log(`\n🔍 Analyzing ${todo.length} brands with Claude vision...\n`);

  for (let i = 0; i < brands.length; i++) {
    const brand = brands[i];
    if (analysis[brand.id]) {
      console.log(`[${i + 1}/${brands.length}] ✓ ${brand.name} (cached)`);
      continue;
    }

    console.log(`[${i + 1}/${brands.length}] Analyzing: ${brand.name}...`);
    try {
      const result = await analyzeBrand(brand);
      if (result) {
        analysis[brand.id] = {
          brandId: brand.id,
          brandName: brand.name,
          country: brand.country,
          priceRange: brand.priceRange,
          ...result,
          analyzedAt: new Date().toISOString(),
        };
        await fs.writeFile(ANALYSIS_FILE, JSON.stringify(analysis, null, 2));
        console.log(`  ✓ ${result.dnaSummary}`);
      }
    } catch (err) {
      console.error(`  ✗ Error: ${err.message}`);
    }

    // Rate limit: ~1 req/sec to stay within limits
    await new Promise(r => setTimeout(r, 1200));
  }

  console.log('\n✅ Analysis complete.');
  console.log(`Results saved to: ${ANALYSIS_FILE}`);
}

main().catch(err => {
  console.error('Fatal:', err.message);
  process.exit(1);
});
