import fs from 'fs';
import path from 'path';

const ROOT = 'D:/WORK/2606/MateMade';
const HTML_FILE = path.join(ROOT, 'matemade-matrix.html');
const MANIFEST_FILE = path.join(ROOT, 'research-manifest.js');
const OUTPUT_FILE = path.join(ROOT, 'matemade-matrix-standalone.html');

function imageToDataUrl(filePath) {
  try {
    const data = fs.readFileSync(filePath);
    const ext = path.extname(filePath).slice(1).toLowerCase();
    const mime = ext === 'png' ? 'image/png'
      : ext === 'webp' ? 'image/webp'
      : ext === 'jpeg' || ext === 'jpg' ? 'image/jpeg'
      : 'image/jpeg';
    return `data:${mime};base64,${data.toString('base64')}`;
  } catch {
    return null;
  }
}

// Read source files
let html = fs.readFileSync(HTML_FILE, 'utf8');
let manifest = fs.readFileSync(MANIFEST_FILE, 'utf8');

console.log('Converting images to base64...');

// Find all image paths in manifest and replace with data URLs
let count = 0;
manifest = manifest.replace(/"(research-brands\/[^"]+)"/g, (match, imgPath) => {
  const fullPath = path.join(ROOT, imgPath);
  const dataUrl = imageToDataUrl(fullPath);
  if (dataUrl) {
    count++;
    return `"${dataUrl}"`;
  }
  return '"#"';
});

console.log(`  Converted ${count} images`);

// Inline the manifest JS into the HTML (replace external script tag)
const inlineScript = `<script>\n${manifest}\n</script>`;
html = html.replace('<script src="research-manifest.js"></script>', inlineScript);

fs.writeFileSync(OUTPUT_FILE, html, 'utf8');
const sizeMB = (fs.statSync(OUTPUT_FILE).size / 1024 / 1024).toFixed(1);
console.log(`\nDone! Output: matemade-matrix-standalone.html (${sizeMB}MB)`);
console.log('Copy this single file to any machine — no other files needed.');
