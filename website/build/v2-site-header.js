const { routes } = require('./v2-routes.js');

const arrowSvg = `<svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true"><path d="M2.5 6h7M6.5 3.5L9 6l-2.5 2.5" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/></svg>`;

const chevronSvg = `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M8 10l4 4 4-4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`;

const exploreSvg = `<svg width="11" height="11" viewBox="0 0 12 12" fill="none" aria-hidden="true"><path d="M2.5 6h7M6.5 3.5L9 6l-2.5 2.5" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/></svg>`;

/* 24px stroke icons used in the mega menu cards (and as compact icons on mobile). */
const icons = {
  qa: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.8"/><path d="M8 12.5 10.5 15 16 9.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  feedback: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 5.5h16v10H8l-4 3v-3H4v-10Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/><path d="M8 9.5h8M8 12.5h5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>`,
  pm: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="3.5" y="4" width="5" height="16" rx="1.5" stroke="currentColor" stroke-width="1.8"/><rect x="9.5" y="4" width="5" height="11" rx="1.5" stroke="currentColor" stroke-width="1.8"/><rect x="15.5" y="4" width="5" height="7" rx="1.5" stroke="currentColor" stroke-width="1.8"/></svg>`,
  modes: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="3" y="7" width="18" height="10" rx="5" stroke="currentColor" stroke-width="1.8"/><circle cx="15" cy="12" r="3" fill="currentColor"/></svg>`,
  design: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 3.5a8.5 8.5 0 1 0 0 17c1.2 0 1.8-.9 1.8-1.8 0-.5.2-1 .6-1.3.4-.4.9-.6 1.4-.6H17a3.5 3.5 0 0 0 3.5-3.5C20.5 7.6 16.7 3.5 12 3.5Z" stroke="currentColor" stroke-width="1.8"/><circle cx="8.2" cy="10" r="1.1" fill="currentColor"/><circle cx="12" cy="7.6" r="1.1" fill="currentColor"/><circle cx="15.8" cy="10" r="1.1" fill="currentColor"/></svg>`,
  marketing: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 10.5v3l11.5 3.5V7L4 10.5Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/><path d="M18.5 9a2.8 2.8 0 0 1 0 6M6.2 13.5v2.4A1.8 1.8 0 0 0 8 17.7h.8" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>`,
  inhouse: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 20V5.5A1.5 1.5 0 0 1 5.5 4h7A1.5 1.5 0 0 1 14 5.5V20M14 10h4.5A1.5 1.5 0 0 1 20 11.5V20M3 20h18" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/><path d="M7.5 8h3M7.5 11.5h3M7.5 15h3M16.5 14h1" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>`,
  collab: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="9" cy="9" r="3" stroke="currentColor" stroke-width="1.8"/><path d="M3 19c0-3 2.7-5 6-5s6 2 6 5M16 8.5a2.5 2.5 0 1 1 0 5M19 19c0-2.2-1.5-3.8-3.5-4.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>`,
  workflow: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="6" cy="6" r="2.5" stroke="currentColor" stroke-width="1.8"/><circle cx="18" cy="12" r="2.5" stroke="currentColor" stroke-width="1.8"/><circle cx="6" cy="18" r="2.5" stroke="currentColor" stroke-width="1.8"/><path d="M8.5 6H12a3 3 0 0 1 3 3v0a3 3 0 0 0 3 3M8.5 18H12a3 3 0 0 0 3-3v0a3 3 0 0 1 3-3" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>`,
  approval: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 3 14.4 5.2l3.2-.4.4 3.2L20.5 10l-1.5 2.9.6 3.2-3.2.6L14.4 19 12 17.6 9.6 19l-2-2.3-3.2-.6.6-3.2L3.5 10l2.5-2 .4-3.2 3.2.4L12 3Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/><path d="m9 11 2 2 4-4" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  review: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z" stroke="currentColor" stroke-width="1.8"/><circle cx="12" cy="12" r="2.5" stroke="currentColor" stroke-width="1.8"/></svg>`,
};

function currentAttr(currentFile, file) {
  return currentFile === file ? ' aria-current="page"' : '';
}

/* Illustrated tile for cards that have no Figma mockup image. */
function artTile(icon, chip, tone) {
  return `<span class="v2-mega-card-art v2-mega-card-art--${tone}" aria-hidden="true">
                <span class="v2-mega-card-art-icon">${icons[icon]}</span>
                <span class="v2-mega-card-art-lines"><span></span><span></span><span></span></span>
                <span class="v2-mega-card-art-chip">${chip}</span>
              </span>`;
}

/* Icon-only tile shown instead of the mockup image on small screens. */
function compactIcon(icon) {
  return `<span class="v2-mega-card-art v2-mega-card-art--compact" aria-hidden="true">
                <span class="v2-mega-card-art-icon">${icons[icon]}</span>
              </span>`;
}

function card(c, currentFile) {
  return `
            <a class="v2-mega-card" href="${c.href}"${currentAttr(currentFile, c.file)}>
              ${c.visual}
              <span class="v2-mega-card-text">
                <span class="v2-mega-card-eyebrow">${c.eyebrow}</span>
                <span class="v2-mega-card-title">${c.title}</span>
                <span class="v2-mega-card-desc">${c.desc}</span>
                <span class="v2-mega-card-link">Explore ${exploreSvg}</span>
              </span>
            </a>`;
}

function dropdown({ id, label, columns, cards }, currentFile) {
  return `
      <div class="v2-nav-dropdown">
        <button type="button" class="v2-nav-link v2-nav-dropdown-trigger" aria-expanded="false"
          aria-controls="${id}" id="${id}-trigger">
          ${label}
          ${chevronSvg}
        </button>
        <div class="v2-mega-menu v2-mega-menu--${columns}" id="${id}" role="region" aria-labelledby="${id}-trigger">
          <div class="v2-mega-menu-grid">${cards.map((c) => card(c, currentFile)).join('')}
          </div>
        </div>
      </div>`;
}

const productCards = [
  {
    href: routes.productQa,
    file: 'product-automate-quality-check.html',
    eyebrow: 'Automate quality check',
    title: 'Automate Quality Check',
    desc: 'Catch design errors before they reach the client.',
    visual: `<img class="v2-mega-card-visual v2-mega-card-visual--illus" src="${routes.megaQa}" alt="" width="246" height="176" loading="lazy">${compactIcon('qa')}`,
  },
  {
    href: routes.productFeedback,
    file: 'product-client-feedback.html',
    eyebrow: 'Client feedback &amp; communication',
    title: 'Client Feedback &amp; Communication',
    desc: 'Keep client feedback focused, clear, and connected to the work.',
    visual: `<img class="v2-mega-card-visual v2-mega-card-visual--illus" src="${routes.megaFeedback}" alt="" width="246" height="176" loading="lazy">${compactIcon('feedback')}`,
  },
  {
    href: routes.productPm,
    file: 'product-creative-project-management.html',
    eyebrow: 'Creative project management',
    title: 'Creative Project Management',
    desc: 'Keep briefs, versions, reviews, and approvals moving together.',
    visual: `<img class="v2-mega-card-visual v2-mega-card-visual--illus" src="${routes.megaPm}" alt="" width="246" height="176" loading="lazy">${compactIcon('pm')}`,
  },
  {
    href: routes.productModes,
    file: 'product-creative-productive-mode.html',
    eyebrow: 'Creative + productive mode',
    title: 'Creative &amp; Productive Mode',
    desc: 'Choose the workflow that fits the work.',
    visual: `<img class="v2-mega-card-visual v2-mega-card-visual--illus" src="${routes.megaModes}" alt="" width="246" height="176" loading="lazy">${compactIcon('modes')}`,
  },
];

const solutionCards = [
  {
    href: routes.solutionDesign,
    file: 'solution-design-agencies.html',
    eyebrow: 'Design agencies',
    title: 'Design Agencies',
    desc: 'Manage more clients without approval chaos.',
    visual: `<img class="v2-mega-card-visual v2-mega-card-visual--illus" src="/website/assets/homepage/mega-menu/v2/solution-design-agencies.webp" alt="" width="246" height="176" loading="lazy">`,
  },
  {
    href: routes.solutionMarketing,
    file: 'solution-marketing-agencies.html',
    eyebrow: 'Marketing agencies',
    title: 'Marketing Agencies',
    desc: 'Ship campaigns faster with fewer revision rounds.',
    visual: `<img class="v2-mega-card-visual v2-mega-card-visual--illus" src="/website/assets/homepage/mega-menu/v2/solution-marketing-agencies.webp" alt="" width="246" height="176" loading="lazy">`,
  },
  {
    href: routes.solutionInhouse,
    file: 'solution-in-house-creative-teams.html',
    eyebrow: 'In-house creative teams',
    title: 'In-house Creative Teams',
    desc: 'Keep stakeholders aligned from brief to sign-off.',
    visual: `<img class="v2-mega-card-visual v2-mega-card-visual--illus" src="/website/assets/homepage/mega-menu/v2/solution-in-house.webp" alt="" width="246" height="176" loading="lazy">`,
  },
];

const featureCards = [
  {
    href: routes.featureCollab,
    file: 'feature-creative-collaboration.html',
    eyebrow: 'Creative collaboration',
    title: 'Creative Collaboration',
    desc: 'Review work and share feedback in one workspace.',
    visual: `<img class="v2-mega-card-visual v2-mega-card-visual--illus" src="/website/assets/homepage/mega-menu/v2/feature-collaboration.webp" alt="" width="246" height="176" loading="lazy">`,
  },
  {
    href: routes.featureWorkflow,
    file: 'feature-creative-workflow.html',
    eyebrow: 'Creative workflow',
    title: 'Creative Workflow',
    desc: 'Move work from brief to delivery in clear stages.',
    visual: `<img class="v2-mega-card-visual v2-mega-card-visual--illus" src="/website/assets/homepage/mega-menu/v2/feature-workflow.webp" alt="" width="246" height="176" loading="lazy">`,
  },
  {
    href: routes.featureApproval,
    file: 'feature-creative-approval.html',
    eyebrow: 'Creative approval',
    title: 'Creative Approval',
    desc: 'Capture sign-off and keep approved versions locked.',
    visual: `<img class="v2-mega-card-visual v2-mega-card-visual--illus" src="/website/assets/homepage/mega-menu/v2/feature-approval.webp" alt="" width="246" height="176" loading="lazy">`,
  },
  {
    href: routes.featureReview,
    file: 'feature-design-review.html',
    eyebrow: 'Design review',
    title: 'Design Review',
    desc: 'Annotate designs, PDFs, images and video precisely.',
    visual: `<img class="v2-mega-card-visual v2-mega-card-visual--illus" src="/website/assets/homepage/mega-menu/v2/feature-design-review.webp" alt="" width="246" height="176" loading="lazy">`,
  },
];

function header(currentFile = '') {
  return `<header class="v2-header" id="v2-header">
    <a class="v2-logo" href="${routes.home}">
      <img src="${routes.logo}" alt="Revue" width="120" height="32">
    </a>
    <nav class="v2-nav" id="v2-nav" aria-label="Primary">${dropdown(
      { id: 'v2-mega-products', label: 'Products', columns: 4, cards: productCards },
      currentFile
    )}${dropdown(
      { id: 'v2-mega-solutions', label: 'Solutions', columns: 3, cards: solutionCards },
      currentFile
    )}${dropdown(
      { id: 'v2-mega-features', label: 'Features', columns: 4, cards: featureCards },
      currentFile
    )}
      <a class="v2-nav-link" href="${routes.pricing}"${currentAttr(currentFile, 'pricing.html')}>Pricing</a>
      <a class="v2-btn-primary v2-nav-mobile-cta" href="${routes.pilot}">
        Start 14-Day Free Trial
        ${arrowSvg}
      </a>
    </nav>
    <a class="v2-btn-primary v2-header-cta" href="${routes.pilot}">
      Start 14-Day Free Trial
      ${arrowSvg}
    </a>
    <button type="button" class="v2-nav-toggle" id="v2-nav-toggle" aria-expanded="false" aria-controls="v2-nav"
      aria-label="Open menu">
      <span class="v2-nav-toggle-bar" aria-hidden="true"></span>
      <span class="v2-nav-toggle-bar" aria-hidden="true"></span>
      <span class="v2-nav-toggle-bar" aria-hidden="true"></span>
    </button>
  </header>`;
}

const navScriptTag = `<script src="${routes.navScript}"></script>`;

module.exports = { header, navScriptTag };
