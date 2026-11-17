const fs = require('fs');
const path = require('path');

const pages = require('./solution-pages-data.js');
const { header, navScriptTag } = require('./v2-site-header.js');
const footer = require('./v2-site-footer.js');
const { routes, figmaAsset, learnMoreLink } = require('./v2-routes.js');
const outDir = path.join(__dirname, '..', 'pages');

const midCtaArrowSvg = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
const arrowSvg = `<svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true"><path d="M2.5 6h7M6.5 3.5L9 6l-2.5 2.5" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/></svg>`;

const problemIconSvgs = {
  eye: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z" stroke="currentColor" stroke-width="1.8"/><circle cx="12" cy="12" r="2.5" stroke="currentColor" stroke-width="1.8"/></svg>`,
  alert: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 3 2.5 20h19L12 3Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/><path d="M12 10v4M12 17h.01" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>`,
  clock: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="13" r="8" stroke="currentColor" stroke-width="1.8"/><path d="M12 9v4l2.5 2.5M9 3h6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>`,
  search: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="11" cy="11" r="6.5" stroke="currentColor" stroke-width="1.8"/><path d="M16 16 20 20" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>`,
  chat: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 5.5h16v10H8l-4 3v-3H4v-10Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/></svg>`,
  pin: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 21s6-4.5 6-10a6 6 0 1 0-12 0c0 5.5 6 10 6 10Z" stroke="currentColor" stroke-width="1.8"/><circle cx="12" cy="11" r="2" stroke="currentColor" stroke-width="1.8"/></svg>`,
  layers: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 3 3 8l9 5 9-5-9-5Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/><path d="M3 12l9 5 9-5M3 16l9 5 9-5" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/></svg>`,
  check: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.8"/><path d="M8 12.5 10.5 15 16 9.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  doc: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M8 3h8l4 4v14H8V3Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/><path d="M16 3v4h4M10 12h8M10 16h8" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>`,
  users: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="9" cy="9" r="3" stroke="currentColor" stroke-width="1.8"/><path d="M3 19c0-3 2.7-5 6-5s6 2 6 5M16 8.5a2.5 2.5 0 1 1 0 5M19 19c0-2.2-1.5-3.8-3.5-4.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>`,
  list: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M6 7h14M6 12h14M6 17h14" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/><circle cx="4" cy="7" r="1" fill="currentColor"/><circle cx="4" cy="12" r="1" fill="currentColor"/><circle cx="4" cy="17" r="1" fill="currentColor"/></svg>`,
};

function capabilitiesSection(cap) {
  if (!cap) return '';
  return `
    <section class="v2-feature-capabilities" aria-label="Feature overview">
      <img src="${figmaAsset(cap.image)}" alt="${cap.alt}" width="1280" height="512" loading="lazy">
    </section>`;
}

const workflowBenefitIcons = {
  bolt: `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M11.667 2.5L4.167 11.667h5.833L8.333 17.5l7.5-9.167H10l1.667-5.833Z" stroke="#2563EB" stroke-width="1.67" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  clarity: `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M13.333 12.5c1.15.65 2.5 1.02 3.958 1.02M6.667 7.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5ZM4.167 12.5c1.458 0 2.808-.37 3.958-1.02M13.333 2.608a2.507 2.507 0 0 1 2.507 2.507v6.458" stroke="#059669" stroke-width="1.67" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  target: `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true"><circle cx="10" cy="10" r="8.333" stroke="#9333EA" stroke-width="1.67"/><circle cx="10" cy="10" r="5" stroke="#9333EA" stroke-width="1.67"/><circle cx="10" cy="10" r="1.667" stroke="#9333EA" stroke-width="1.67"/></svg>`,
  chart: `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M15 8.333V16.667M10 3.333V16.667M5 11.667V16.667" stroke="#4F46E5" stroke-width="1.67" stroke-linecap="round"/></svg>`,
};

function workflowBandSection(band) {
  if (!band) return '';
  const subtitle = band.subtitle.replace(/\n/g, '<br>');
  const benefitsBlock = band.benefitsImage
    ? `
        <div class="v2-workflow-benefits v2-workflow-benefits--figma">
          <img src="${figmaAsset(band.benefitsImage)}" alt="${band.benefitsAlt || 'Workflow benefits'}" width="1200" loading="lazy">
        </div>`
    : (() => {
        const items = (band.benefits || [])
          .map(
            (b) => `
          <article class="v2-workflow-benefit-item">
            <span class="v2-workflow-benefit-icon v2-workflow-benefit-icon--${b.icon}" aria-hidden="true">${workflowBenefitIcons[b.icon] || ''}</span>
            <div class="v2-workflow-benefit-copy">
              <p class="v2-workflow-benefit-label">${b.label.replace(/\n/g, '<br>')}</p>
              <p class="v2-workflow-benefit-text">${b.text.replace(/\n/g, '<br>')}</p>
            </div>
          </article>`
          )
          .join('');
        return `<div class="v2-workflow-benefits">${items}
        </div>`;
      })();
  return `
    <section class="v2-workflow-band" aria-labelledby="workflow-band-title">
      <div class="v2-workflow-band-inner">
        <header class="v2-workflow-band-intro">
          <h2 id="workflow-band-title">${band.title}</h2>
          <p>${subtitle}</p>
        </header>
        <div class="v2-workflow-pipeline">
          <img src="${figmaAsset(band.pipelineImage)}" alt="${band.pipelineAlt}" width="1200" loading="lazy">
        </div>
        ${benefitsBlock}
      </div>
    </section>`;
}

function heroLeadHtml(hero) {
  if (hero.leadSolution) {
    return `<p class="v2-product-hero-lead v2-product-hero-lead--solution">${hero.leadSolution}</p>`;
  }
  if (hero.leadSingle) {
    return `<p class="v2-product-hero-lead v2-product-hero-lead--feature">${hero.leadSingle}</p>`;
  }
  return `<p class="v2-product-hero-lead"><strong>${hero.leadBold}</strong><br>${hero.leadRest}</p>`;
}

function problemSection(problem) {
  if (!problem) return '';
  const cards = problem.cards
    .map(
      (c) => `
          <article class="v2-product-problem-card">
            <div class="v2-product-problem-card-top">
              <span class="v2-product-problem-icon" aria-hidden="true">${problemIconSvgs[c.icon] || problemIconSvgs.eye}</span>
              <span class="v2-product-problem-num">${c.num}</span>
            </div>
            <h3>${c.title}</h3>
            <p>${c.body}</p>
          </article>`
    )
    .join('');
  return `
    <section class="v2-product-problem" aria-labelledby="product-problem-title">
      <div class="v2-product-problem-inner">
        <header class="v2-product-problem-intro">
          <h2 id="product-problem-title">${problem.title}</h2>
          <p>${problem.subtitle}</p>
        </header>
        <div class="v2-product-problem-grid">${cards}
        </div>
      </div>
    </section>`;
}

function featureCopy(f, i, p) {
  const title = f.title.replace(/\n/g, '<br>');
  return `
      <div class="v2-product-feature-copy">
        <p class="v2-product-feature-eyebrow">${f.eyebrow}</p>
        <h2 class="v2-product-feature-title" id="product-feature-${i}-title">${title}</h2>
        <p class="v2-product-feature-body">${f.body}</p>
        ${learnMoreLink(p, f)}
      </div>`;
}

function featureUiVisual(f) {
  const variant = f.uiVariant || 'default';
  const label = f.uiLabel || 'Revue workspace';
  return `
      <figure class="v2-product-mockup-frame v2-product-mockup-frame--mode-ui">
        <div class="v2-feature-ui v2-feature-ui--${variant}" role="img" aria-label="${label.replace(/"/g, '&quot;')}">
          <div class="v2-feature-ui-chrome" aria-hidden="true">
            <span></span><span></span><span></span>
          </div>
          <div class="v2-feature-ui-canvas">
            <p class="v2-feature-ui-caption">${label}</p>
          </div>
        </div>
      </figure>`;
}

function figmaFeatureVisual(style) {
  const inner =
    style === 'grey'
      ? '<div class="v2-feature-visual v2-feature-visual--grey" aria-hidden="true"></div>'
      : '<div class="v2-feature-visual v2-feature-visual--white" aria-hidden="true"></div>';
  return `
      <figure class="v2-product-mockup-frame v2-product-mockup-frame--feature">${inner}
      </figure>`;
}

function mockVisual(f) {
  if (f.shot) {
    // Full-bleed screenshot exported from Figma.
    return `
      <figure class="v2-product-mockup-frame v2-product-mockup-frame--shot">
        <img src="${figmaAsset(f.image)}" alt="${f.alt}" width="660" height="${f.height || 413}" loading="lazy">
      </figure>`;
  }
  if (f.visualStyle) return figmaFeatureVisual(f.visualStyle);
  if (f.uiVariant) return featureUiVisual(f);
  if (f.placeholder) {
    const label = f.placeholderLabel || 'UI preview';
    return `
      <figure class="v2-product-mockup-frame">
        <div class="v2-product-ui-placeholder" aria-hidden="true">
          <span class="v2-product-ui-placeholder-label">${label}</span>
        </div>
      </figure>`;
  }
  return `
      <figure class="v2-product-mockup-frame">
        <img src="${figmaAsset(f.image)}" alt="${f.alt}" width="660" height="413" loading="lazy">
      </figure>`;
}

function featureSections(features, p) {
  return features
    .map((f, i) => {
      if (f.type === 'visual') {
        return `
    <section class="v2-product-section-shot" aria-label="Product feature ${i + 1}">
      <img src="${figmaAsset(f.src)}" alt="${f.alt}" width="1280" loading="lazy">
    </section>`;
      }
      const tint = f.tinted ? ' v2-product-feature--tinted' : '';
      const rev = f.reverse ? ' v2-product-feature--reverse' : '';
      const theme = f.theme === 'creative-dark' ? ' v2-product-feature--creative-dark' : '';
      const copy = featureCopy(f, i, p);
      const visual = mockVisual(f);
      const inner = f.reverse ? copy + visual : visual + copy;
      return `
    <section class="v2-product-feature${tint}${rev}${theme}" aria-labelledby="product-feature-${i}-title">
      <div class="v2-product-feature-inner">${inner}
      </div>
    </section>`;
    })
    .join('');
}

function buildPage(p) {
  return `<!DOCTYPE html>
<html lang="en">

<head>
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-5FRL0XY9ER"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag() { dataLayer.push(arguments); }
    gtag('js', new Date());
    gtag('config', 'G-5FRL0XY9ER');
  </script>
  <script>
    (function (c, l, a, r, i, t, y) {
      c[a] = c[a] || function () { (c[a].q = c[a].q || []).push(arguments) };
      t = l.createElement(r); t.async = 1; t.src = "https://www.clarity.ms/tag/" + i;
      y = l.getElementsByTagName(r)[0]; y.parentNode.insertBefore(t, y);
    })(window, document, "clarity", "script", "whw3a7enxv");
  </script>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <title>${p.title}</title>
  <meta name="description" content="${p.description.replace(/"/g, '&quot;')}">
  <link rel="icon" type="image/webp" href="${routes.favicon}">
  <link
    href="https://fonts.googleapis.com/css2?family=Poppins:wght@600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700&family=Roboto:wght@700&display=swap"
    rel="stylesheet">
  <link rel="stylesheet" href="${routes.cssRevue}">
  <link rel="stylesheet" href="${routes.cssPricing}">
  <link rel="stylesheet" href="${routes.cssProduct}">
</head>

<body class="v2 v2-product-page${p.pageVariant ? ` ${p.pageVariant}` : ''}">
  ${header(p.file)}

  <main>
    <section class="v2-product-hero" aria-labelledby="product-hero-title">
      <div class="v2-product-hero-inner">
        <p class="v2-product-hero-badge">${p.hero.badge}</p>
        <h1 id="product-hero-title">${p.hero.h1}</h1>
        ${heroLeadHtml(p.hero)}
        <div class="v2-product-hero-actions">
          <a class="v2-btn-primary" href="${routes.pilot}">Get started ${arrowSvg}</a>
          <a class="v2-btn-outline" href="${routes.pricing}">Check pricing
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M6 3l5 5-5 5" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/></svg>
          </a>
        </div>
      </div>
    </section>
    ${capabilitiesSection(p.capabilities)}
    ${workflowBandSection(p.workflowBand)}
    ${problemSection(p.problem)}
    ${featureSections(p.features, p)}

    <section class="v2-pricing-faq" aria-labelledby="product-faq-title">
      <div class="v2-pricing-faq-inner">
        <header class="v2-pricing-faq-intro">
          <h2 id="product-faq-title">Common questions</h2>
          <p>Everything you need to know about Revue, creative workflows, reviews, and approvals.</p>
        </header>
        <div class="v2-pricing-faq-list" id="product-faq-list"></div>
        <p class="v2-pricing-faq-cta">
          Still have questions?
          <a href="mailto:hello@revuesuite.com">Talk to Sales
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/></svg>
          </a>
        </p>
      </div>
    </section>

    <section class="v2-product-mid-cta" aria-labelledby="product-mid-cta-title">
      <div class="v2-product-mid-cta-inner">
        <h2 id="product-mid-cta-title">${p.midCta.title}</h2>
        <a class="v2-btn-mid-cta" href="${routes.pilot}">${p.midCta.button} ${midCtaArrowSvg}</a>
      </div>
    </section>
  </main>

  ${footer}

  <script src="${routes.faqScript(p.faq.script)}"></script>
  ${navScriptTag}
  <script>

    const faqList = document.getElementById('product-faq-list');
    const faqSource = window.${p.faq.global};
    const faqLimit = ${p.faq.limit != null ? p.faq.limit : 'null'};
    const faqData = faqSource ? (faqLimit != null ? faqSource.slice(0, faqLimit) : faqSource.slice()) : [];
    if (faqList && faqData.length) {
      faqList.innerHTML = faqData.map((item, i) => {
        const num = String(i + 1).padStart(2, '0');
        const open = i === 0 ? ' open' : '';
        return \`
          <details class="v2-pricing-faq-item\${open}">
            <summary>
              <span class="v2-pricing-faq-q">
                <span class="v2-pricing-faq-num">\${num}</span>
                <span class="v2-pricing-faq-q-text">\${item.q}</span>
              </span>
              <span class="v2-pricing-faq-icon" aria-hidden="true">\${i === 0 ? '−' : '+'}</span>
            </summary>
            \${item.a ? \`<p class="v2-pricing-faq-a">\${item.a}</p>\` : ''}
          </details>\`;
      }).join('');

      faqList.querySelectorAll('.v2-pricing-faq-item').forEach((el) => {
        el.addEventListener('toggle', () => {
          const icon = el.querySelector('.v2-pricing-faq-icon');
          if (icon) icon.textContent = el.open ? '−' : '+';
        });
      });
    }

  </script>
</body>

</html>
`;
}

for (const p of pages) {
  const html = buildPage(p);
  fs.writeFileSync(path.join(outDir, p.file), html, 'utf8');
  console.log('Wrote', p.file);
}
