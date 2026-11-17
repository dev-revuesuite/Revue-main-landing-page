const fs = require('fs');
const path = require('path');

const pages = require('./product-pages-data.js');
const { header, navScriptTag } = require('./v2-site-header.js');
const footer = require('./v2-site-footer.js');
const { routes, figmaAsset, learnMoreLink } = require('./v2-routes.js');
const modeFitWorkSection = require('./mode-fit-work-section.js');
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

const reviewTabCommentIcon = `<svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true"><path d="M2 2.5h8v5H5l-2 2v-2H2v-5Z" stroke="currentColor" stroke-width="1.1" stroke-linejoin="round"/></svg>`;
const reviewTabAiIcon = `<svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true"><path d="M6 1.5l.9 2.7H9.5L7.8 5.8l.9 2.7L6 7.9 3.3 8.5l.9-2.7L2.5 4.2h2.6L6 1.5Z" fill="currentColor"/></svg>`;

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

const modeUiBlocks = {
  'productive-bridge': `
        <div class="v2-mode-ui v2-mode-ui--bridge" role="img" aria-label="Client Communication Manager bridges client and team chats">
          <div class="v2-mode-chat v2-mode-chat--client">
            <p class="v2-mode-chat-title">External client chat</p>
            <div class="v2-mode-bubble v2-mode-bubble--client">Can we tighten the hero spacing?</div>
            <div class="v2-mode-bubble v2-mode-bubble--client v2-mode-bubble--muted">Approved on copy — ready for layout.</div>
          </div>
          <div class="v2-mode-hub">
            <span class="v2-mode-hub-icon" aria-hidden="true">↔</span>
            <p class="v2-mode-hub-name">Julie K.</p>
            <p class="v2-mode-hub-role">Client Communication Manager</p>
          </div>
          <div class="v2-mode-chat v2-mode-chat--team">
            <p class="v2-mode-chat-title">Internal team chat</p>
            <div class="v2-mode-bubble v2-mode-bubble--team">Updating v3 — spacing fix in progress.</div>
            <div class="v2-mode-bubble v2-mode-bubble--team v2-mode-bubble--muted">QC run scheduled before client send.</div>
          </div>
        </div>`,
  'creative-chat': `
        <div class="v2-mode-ui v2-mode-ui--creative" role="img" aria-label="Shared creative conversation with client and team">
          <p class="v2-mode-creative-label">Shared creative conversation</p>
          <div class="v2-mode-creative-thread">
            <div class="v2-mode-creative-row"><span class="v2-mode-pill v2-mode-pill--client">Client</span><p class="v2-mode-creative-msg">Can we explore a bolder typography direction?</p></div>
            <div class="v2-mode-creative-row"><span class="v2-mode-pill v2-mode-pill--design">Designer</span><p class="v2-mode-creative-msg">Working on a modular lockup — sharing options next.</p></div>
            <div class="v2-mode-creative-row"><span class="v2-mode-pill v2-mode-pill--strategy">Strategy</span><p class="v2-mode-creative-msg">Dual-tone palette could push visibility on social.</p></div>
            <div class="v2-mode-creative-row"><span class="v2-mode-pill v2-mode-pill--cd">Creative lead</span><p class="v2-mode-creative-msg">Let's add a moodboard variant before we narrow.</p></div>
          </div>
        </div>`,
  'mode-compare': `
        <div class="v2-mode-ui v2-mode-ui--compare" role="img" aria-label="Productive Mode vs Creative Mode comparison">
          <div class="v2-mode-compare-card v2-mode-compare-card--productive">
            <header><span class="v2-mode-compare-badge">Structured</span><h3>Productive Mode</h3></header>
            <dl class="v2-mode-compare-list">
              <div><dt>Flow</dt><dd>Client → CCM → Team</dd></div>
              <div><dt>Threads</dt><dd>Separate client &amp; internal</dd></div>
              <div><dt>Decisions</dt><dd>Centralized</dd></div>
              <div><dt>Best for</dt><dd>Templates &amp; repeatable work</dd></div>
            </dl>
          </div>
          <div class="v2-mode-compare-card v2-mode-compare-card--creative">
            <header><span class="v2-mode-compare-badge v2-mode-compare-badge--creative">Collaborative</span><h3>Creative Mode</h3></header>
            <dl class="v2-mode-compare-list">
              <div><dt>Flow</dt><dd>Everyone ↔ Everyone</dd></div>
              <div><dt>Threads</dt><dd>One shared conversation</dd></div>
              <div><dt>Decisions</dt><dd>Collaborative</dd></div>
              <div><dt>Best for</dt><dd>New concepts &amp; exploration</dd></div>
            </dl>
          </div>
        </div>`,
  'mode-picker': `
        <div class="v2-mode-ui v2-mode-ui--picker" data-mode-picker>
          <div class="v2-mode-picker-toggle" role="tablist" aria-label="Preview mode">
            <button type="button" class="v2-mode-picker-tab is-active" role="tab" aria-selected="true" data-mode="productive">Productive Mode</button>
            <button type="button" class="v2-mode-picker-tab" role="tab" aria-selected="false" data-mode="creative">Creative Mode</button>
          </div>
          <div class="v2-mode-picker-panel is-active" data-mode-panel="productive">
            <article class="v2-mode-use-card"><h4>Recurring social content</h4><p>Established design system — fast, consistent execution.</p></article>
            <article class="v2-mode-use-card"><h4>Magazine production</h4><p>Template-driven editions with a fixed workflow.</p></article>
          </div>
          <div class="v2-mode-picker-panel" data-mode-panel="creative" hidden>
            <article class="v2-mode-use-card"><h4>Brand guidelines</h4><p>Open exploration with every stakeholder in the thread.</p></article>
            <article class="v2-mode-use-card"><h4>New ad campaign</h4><p>Brainstorm concepts before locking direction.</p></article>
          </div>
        </div>`,
};

function mockVisual(f) {
  if (f.uiBlock && modeUiBlocks[f.uiBlock]) {
    return `
      <figure class="v2-product-mockup-frame v2-product-mockup-frame--mode-ui">
        ${modeUiBlocks[f.uiBlock]}
      </figure>`;
  }
  if (f.placeholder) {
    const label = f.placeholderLabel || 'UI preview';
    return `
      <figure class="v2-product-mockup-frame">
        <div class="v2-product-ui-placeholder" aria-hidden="true">
          <span class="v2-product-ui-placeholder-label">${label}</span>
        </div>
      </figure>`;
  }
  if (f.shot) {
    // Full-bleed screenshot exported from Figma; it already includes its own UI chrome.
    return `
      <figure class="v2-product-mockup-frame v2-product-mockup-frame--shot">
        <img src="${figmaAsset(f.image)}" alt="${f.alt}" width="660" height="${f.height || 413}" loading="lazy">
      </figure>`;
  }
  if (!f.reviewTabs) {
    return `
      <figure class="v2-product-mockup-frame">
        <img src="${figmaAsset(f.image)}" alt="${f.alt}" width="660" height="413" loading="lazy">
      </figure>`;
  }
  return `
      <figure class="v2-product-mockup-frame v2-product-mockup-frame--tabs">
        <div class="v2-product-mockup-media">
          <img src="${figmaAsset(f.image)}" alt="${f.alt}" width="660" height="413" loading="lazy">
          <div class="v2-product-review-tabs" role="tablist" aria-label="Review view" data-review-tabs>
            <button type="button" class="v2-product-review-tab" role="tab" aria-selected="false" data-tab="comments">${reviewTabCommentIcon} Comments</button>
            <button type="button" class="v2-product-review-tab is-active" role="tab" aria-selected="true" data-tab="ai">${reviewTabAiIcon} AI Analyse</button>
          </div>
        </div>
      </figure>`;
}

function featureSections(features, p) {
  return features
    .map((f, i) => {
      if (f.type === 'mode-fit') {
        return modeFitWorkSection;
      }
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
        <p class="v2-product-hero-lead"><strong>${p.hero.leadBold}</strong><br>${p.hero.leadRest}</p>
        <div class="v2-product-hero-actions">
          <a class="v2-btn-primary" href="${routes.pilot}">Get started ${arrowSvg}</a>
          <a class="v2-btn-outline" href="${routes.pricing}">Check pricing
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M6 3l5 5-5 5" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/></svg>
          </a>
        </div>
      </div>
    </section>
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

    document.querySelectorAll('[data-review-tabs]').forEach((list) => {
      list.querySelectorAll('.v2-product-review-tab').forEach((btn) => {
        btn.addEventListener('click', () => {
          list.querySelectorAll('.v2-product-review-tab').forEach((b) => {
            b.classList.remove('is-active');
            b.setAttribute('aria-selected', 'false');
          });
          btn.classList.add('is-active');
          btn.setAttribute('aria-selected', 'true');
        });
      });
    });

    document.querySelectorAll('[data-mode-picker]').forEach((root) => {
      const tabs = root.querySelectorAll('.v2-mode-picker-tab, .v2-mode-fit-tab');
      const panels = root.querySelectorAll('[data-mode-panel]');
      tabs.forEach((tab) => {
        tab.addEventListener('click', () => {
          const mode = tab.getAttribute('data-mode');
          tabs.forEach((t) => {
            t.classList.toggle('is-active', t === tab);
            t.setAttribute('aria-selected', t === tab ? 'true' : 'false');
          });
          root.classList.toggle('is-creative', mode === 'creative');
          panels.forEach((panel) => {
            const on = panel.getAttribute('data-mode-panel') === mode;
            panel.classList.toggle('is-active', on);
            if (root.classList.contains('v2-mode-fit-picker')) {
              panel.setAttribute('aria-hidden', on ? 'false' : 'true');
            } else {
              panel.hidden = !on;
            }
          });
        });
      });
    });
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
