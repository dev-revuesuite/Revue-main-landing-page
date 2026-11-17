const fs = require("fs");
const path = require("path");

const siteRoot = path.join(__dirname, "..");
const miss = [];

function walk(dir) {
  for (const name of fs.readdirSync(dir)) {
    const file = path.join(dir, name);
    if (fs.statSync(file).isDirectory()) walk(file);
    else if (/\.html$/.test(name)) checkHtml(file);
  }
}

function checkHtml(file) {
  const html = fs.readFileSync(file, "utf8");
  const re = /\/website\/assets\/[^"'\s)]+/g;
  let m;
  while ((m = re.exec(html))) {
    const decoded = decodeURIComponent(m[0].replace(/^\//, ""));
    const rel = decoded.split("/").join(path.sep);
    const abs = path.join(process.cwd(), rel);
    if (!fs.existsSync(abs)) miss.push({ from: path.relative(siteRoot, file), asset: m[0] });
  }
}

process.chdir(path.join(siteRoot, ".."));
walk(siteRoot);
console.log("missing refs:", miss.length);
miss.slice(0, 20).forEach(({ from, asset }) => console.log(from, "->", asset));
process.exit(miss.length ? 1 : 0);
