const fs = require('fs');
const path = require('path');
const { header } = require('./v2-site-header.js');
const footer = require('./v2-site-footer.js');
const { routes } = require('./v2-routes.js');

const siteDir = path.join(__dirname, '..');
const pagesDir = path.join(siteDir, 'pages');

function rewriteLegacyPaths(html) {
  return html
    .replace(/\/figma-import\/shared\//g, '/website/css/')
    .replace(/\/figma-import\/scripts\//g, '/website/js/')
    .replace(/\/figma-import\/assets\//g, '/website/assets/')
    .replace(/\/assets\/figma-homepage\//g, '/website/assets/homepage/')
    .replace(/\/site\//g, '/website/');
}

function spliceHeaderFooter(html, currentFile) {
  const headerStart = html.indexOf('<header class="v2-header"');
  const headerEnd = html.indexOf('</header>');
  if (headerStart === -1 || headerEnd === -1) {
    throw new Error(`No header in ${currentFile}`);
  }
  html = html.slice(0, headerStart) + header(currentFile) + html.slice(headerEnd + '</header>'.length);

  const backedStart = html.indexOf('<div class="v2-backed-by">');
  const footerEnd = html.lastIndexOf('</footer>');
  if (backedStart === -1 || footerEnd === -1) {
    throw new Error(`No footer in ${currentFile}`);
  }
  html = html.slice(0, backedStart) + footer + html.slice(footerEnd + '</footer>'.length);
  return html;
}

function patchFile(filePath, currentFile) {
  let html = fs.readFileSync(filePath, 'utf8');
  html = spliceHeaderFooter(html, currentFile);
  html = rewriteLegacyPaths(html);
  fs.writeFileSync(filePath, html, 'utf8');
  console.log('Patched', path.relative(siteDir, filePath));
}

patchFile(path.join(siteDir, 'index.html'), 'homepage.html');
patchFile(path.join(pagesDir, 'pricing.html'), 'pricing.html');
