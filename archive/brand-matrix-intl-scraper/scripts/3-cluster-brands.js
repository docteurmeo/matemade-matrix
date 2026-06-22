import Anthropic from '@anthropic-ai/sdk';
import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
const BRANDS_FILE = path.join(ROOT, 'data', 'brands.json');
const ANALYSIS_FILE = path.join(ROOT, 'data', 'brand-analysis.json');
const CLUSTERS_FILE = path.join(ROOT, 'data', 'clusters.json');

const envPath = path.join(ROOT, '.env');
if (await fs.pathExists(envPath)) {
  const envContent = await fs.readFile(envPath, 'utf8');
  for (const line of envContent.split('\n')) {
    const [key, ...vals] = line.split('=');
    if (key && !key.startsWith('#')) process.env[key.trim()] = vals.join('=').trim();
  }
}

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

async function clusterWithClaude(brands, analysis, predefinedClusters) {
  // Build summary of all brands for context
  const brandSummaries = brands.map(b => {
    const a = analysis[b.id];
    if (!a) return `${b.id}: ${b.name} (${b.origin}) — no analysis`;
    return `${b.id}: ${b.name} (${b.origin}, ${b.priceRange}) — ${a.dnaSummary} | Keywords: ${a.positioningKeywords?.join(', ')}`;
  }).join('\n');

  const clusterDefs = predefinedClusters.map(c =>
    `${c.id}: "${c.name}" — ${c.dna}`
  ).join('\n');

  const prompt = `You are a fashion brand strategist building a brand positioning matrix for the bag/accessories market.

Here are ${brands.length} brands with their DNA analysis:
${brandSummaries}

Here are the predefined clusters (groupings):
${clusterDefs}

Your tasks:
1. Assign each brand to the BEST matching cluster (use brand IDs, cluster IDs)
2. Identify if any brands don't fit cleanly and suggest a "crossover" note
3. Position MateMade specifically — where does it sit NOW vs where it SHOULD aspire?
4. Name the 2-3 "white space" opportunities on this market map

Return ONLY valid JSON:
{
  "assignments": {
    "brand-id": {
      "clusterId": "cluster-id",
      "confidence": "high|medium|low",
      "crossover": "optional note if brand straddles two clusters",
      "positioningNote": "1 sentence why this brand fits here"
    }
  },
  "matemadeAnalysis": {
    "currentPosition": "Where MateMade sits NOW on the map",
    "aspirationalPosition": "Where it should move toward",
    "gap": "What's missing to get there",
    "uniqueOpportunity": "What specific positioning no other brand owns that MateMade could claim"
  },
  "whiteSpace": [
    { "id": "gap-id", "description": "Unoccupied territory description", "opportunity": "Who could own this" }
  ],
  "clusterInsights": {
    "cluster-id": "1-2 sentence insight about this cluster's dynamics and competitive intensity"
  }
}`;

  const response = await client.messages.create({
    model: 'claude-sonnet-4-6',
    max_tokens: 16000,
    messages: [{ role: 'user', content: prompt }],
  });

  const raw = response.content[0].text;
  const jsonMatch = raw.match(/\{[\s\S]+\}/);
  if (!jsonMatch) throw new Error('No JSON in clustering response');
  return JSON.parse(jsonMatch[0]);
}

function buildClusterGroups(brands, analysis, clusterAssignments, predefinedClusters) {
  const clusterMap = {};
  for (const cluster of predefinedClusters) {
    clusterMap[cluster.id] = {
      ...cluster,
      brands: [],
    };
  }

  clusterMap['unassigned'] = {
    id: 'unassigned',
    name: 'Unassigned',
    emoji: '❓',
    color: '#CCCCCC',
    dna: 'Brands that need manual review',
    brands: [],
  };

  for (const brand of brands) {
    const assignment = clusterAssignments[brand.id];
    const targetCluster = assignment?.clusterId || 'unassigned';
    const clusterObj = clusterMap[targetCluster] || clusterMap['unassigned'];

    clusterObj.brands.push({
      id: brand.id,
      name: brand.name,
      country: brand.country,
      priceRange: brand.priceRange,
      isSubject: brand.isSubject || false,
      confidence: assignment?.confidence || 'low',
      crossover: assignment?.crossover || null,
      positioningNote: assignment?.positioningNote || null,
      analysis: analysis[brand.id] || null,
    });
  }

  return Object.values(clusterMap).filter(c => c.brands.length > 0);
}

async function main() {
  const { brands, predefinedClusters } = JSON.parse(await fs.readFile(BRANDS_FILE, 'utf8'));
  let analysis = {};
  try { analysis = JSON.parse(await fs.readFile(ANALYSIS_FILE, 'utf8')); } catch {}

  const analyzedCount = Object.keys(analysis).length;
  console.log(`\n🗂  Clustering ${brands.length} brands (${analyzedCount} with AI analysis)...\n`);

  console.log('  Calling Claude for intelligent clustering...');
  const clusteringResult = await clusterWithClaude(brands, analysis, predefinedClusters);

  const clusterGroups = buildClusterGroups(
    brands,
    analysis,
    clusteringResult.assignments || {},
    predefinedClusters
  );

  const output = {
    generatedAt: new Date().toISOString(),
    totalBrands: brands.length,
    clusters: clusterGroups,
    matemadeAnalysis: clusteringResult.matemadeAnalysis,
    whiteSpace: clusteringResult.whiteSpace,
    clusterInsights: clusteringResult.clusterInsights,
  };

  await fs.writeFile(CLUSTERS_FILE, JSON.stringify(output, null, 2));

  console.log('\n📊 Clustering Results:');
  for (const cluster of clusterGroups) {
    console.log(`\n  ${cluster.emoji} ${cluster.name} (${cluster.brands.length} brands)`);
    for (const b of cluster.brands) {
      const flag = b.isSubject ? ' ⭐ SUBJECT' : '';
      console.log(`     - ${b.name} (${b.country})${flag}`);
    }
  }

  if (clusteringResult.matemadeAnalysis) {
    const ma = clusteringResult.matemadeAnalysis;
    console.log('\n⭐ MateMade Analysis:');
    console.log(`  Current: ${ma.currentPosition}`);
    console.log(`  Aspiration: ${ma.aspirationalPosition}`);
    console.log(`  Gap: ${ma.gap}`);
    console.log(`  Opportunity: ${ma.uniqueOpportunity}`);
  }

  console.log('\n✅ Clustering complete.');
  console.log(`Results saved to: ${CLUSTERS_FILE}`);
}

main().catch(err => {
  console.error('Fatal:', err.message);
  process.exit(1);
});
