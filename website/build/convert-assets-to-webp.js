const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const assetsRoot = path.join(__dirname, '..', 'assets');
const quality = 82;

async function walk(dir, out = []) {
  for (const name of fs.readdirSync(dir)) {
    const full = path.join(dir, name);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) {
      await walk(full, out);
    } else if (/\.(png|jpe?g)$/i.test(name)) {
      out.push(full);
    }
  }
  return out;
}

(async () => {
  const files = await walk(assetsRoot);
  let converted = 0;
  for (const file of files) {
    const dest = file.replace(/\.(png|jpe?g)$/i, '.webp');
    await sharp(file).webp({ quality }).toFile(dest);
    fs.unlinkSync(file);
    converted += 1;
    console.log(path.relative(assetsRoot, dest));
  }
  console.log(`Converted ${converted} files to WebP.`);
})().catch((err) => {
  console.error(err);
  process.exit(1);
});
