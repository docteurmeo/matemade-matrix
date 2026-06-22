// Lọc + chọn ảnh đa dạng từ sitemap_products_1.xml — CHỈ giữ túi + phụ kiện da nhỏ (ví/charm/tag),
// loại bỏ giày dép/quần áo/dây lưng quần. Dùng cho mọi brand sitemap-based.
const fs = require('fs');
const [, , sitemapPath, targetCountStr] = process.argv;
const targetCount = parseInt(targetCountStr || '12', 10);

const EXCLUDE = /\b(shoe|shoes|sandal|sneaker|boot|boots|slipper|heel|heels|flat|flats|mule|mules|loafer|ballerina|giay|gi[aà]y|sandal|dep|d[eé]p)\b|\b(dress|jacket|sweater|cardigan|skirt|pants|jeans|shorts|coat|vest|blouse|shirt|top|knit|ao|qu[aầ]n|v[aá]y|belt|th[aắ]t l[uư]ng)\b/i;
const INCLUDE = /\b(bag|tote|balo|backpack|clutch|hobo|crossbody|sling|pouch|satchel|duffel|duffle|shoulder|handbag|purse|wallet|v[ií]|charm|tag|keyring|key\s?ring|keychain|sleeve|t[uú]i)\b/i;

const xml = fs.readFileSync(sitemapPath, 'utf8');
const urlBlocks = xml.split('<url>').slice(1);
const items = [];
let excludedCount = 0;
for (const block of urlBlocks) {
  const titleM = block.match(/<image:title>([^<]*)<\/image:title>/);
  const imgM = block.match(/<image:loc>([^<]*)<\/image:loc>/);
  if (!titleM || !imgM) continue;
  const title = titleM[1];
  if (EXCLUDE.test(title)) { excludedCount++; continue; }
  if (!INCLUDE.test(title)) { excludedCount++; continue; } // an toàn: phải khớp 1 từ khóa túi/phụ kiện rõ ràng
  const img = imgM[1].replace(/&amp;/g, '&');
  let base = title.split('|')[0].trim().toLowerCase();
  base = base.replace(/\b(size\s*)?(xs|s|m|l|xl|xxl|free|\d+)\b/g, '').replace(/\s+/g, ' ').trim();
  items.push({ title, img, base });
}
const groups = new Map();
for (const it of items) { if (!groups.has(it.base)) groups.set(it.base, []); groups.get(it.base).push(it); }
const baseNames = [...groups.keys()];
let picks = [];
if (baseNames.length <= targetCount) {
  picks = baseNames.map(b => groups.get(b)[0]);
} else {
  const step = baseNames.length / targetCount;
  for (let k = 0; k < targetCount; k++) picks.push(groups.get(baseNames[Math.floor(k * step)])[0]);
}
console.log(JSON.stringify(picks.slice(0, targetCount), null, 0));
console.error(`Tổng ${urlBlocks.length} dòng, loại ${excludedCount} (giày/quần áo/không khớp túi), còn ${items.length} hợp lệ, ${baseNames.length} nhóm, chọn ${Math.min(picks.length, targetCount)}.`);
