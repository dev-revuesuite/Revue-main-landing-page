/** Root-absolute URLs so pages work from `/` and from Vercel rewrites. */

const IMG = '/website/assets/homepage';
const SHARED = '/website/css';

function figmaAsset(src) {
  if (!src) return src;
  if (src.startsWith('/')) return src;
  if (src.startsWith('../assets/')) return `/website/assets/${src.slice('../assets/'.length)}`;
  if (src.startsWith('../../assets/')) return `/website/assets/${src.slice('../../assets/'.length)}`;
  return src;
}

const routes = {
  home: '/',
  pricing: '/pricing',
  blog: '/blog',
  // Free 14-day trial: starts at signup (the app grants the trial, not this link).
  pilot: 'https://revuesuite.com/qc-tool/signup',
  joinBeta: '/join-beta.html',
  privacy: '/privacy.html',
  terms: '/terms.html',
  productQa: '/product/automate-quality-check',
  productFeedback: '/product/client-feedback',
  productPm: '/product/creative-project-management',
  productModes: '/product/creative-productive-mode',
  solutionDesign: '/solutions/design-agencies',
  solutionMarketing: '/solutions/marketing-agencies',
  solutionInhouse: '/solutions/in-house-creative-teams',
  featureCollab: '/features/creative-collaboration',
  featureWorkflow: '/features/creative-workflow',
  featureApproval: '/features/creative-approval',
  featureReview: '/features/design-review',
  cssRevue: `${SHARED}/revue.css`,
  cssPricing: `${SHARED}/pricing.css`,
  cssProduct: `${SHARED}/product-page.css`,
  favicon: '/website/assets/favicon.webp',
  logo: `${IMG}/339-12285.webp`,
  megaQa: `${IMG}/mega-menu/345-26923.webp`,
  megaFeedback: `${IMG}/mega-menu/345-26977.webp`,
  megaPm: `${IMG}/mega-menu/345-27025.webp`,
  megaModes: `${IMG}/mega-menu/345-27069.webp`,
  backedIstart: `${IMG}/339-13417.webp`,
  backedNsrcel: `${IMG}/339-13433.webp`,
  backedMiic: `${IMG}/339-13444.webp`,
  footerLogo: `${IMG}/7d275ce742aa3fafff79d727f370af505a567cf8.webp`,
  figmaAsset,
  faqScript: (name) => `/website/js/${name}`,
  navScript: '/website/js/v2-nav.js',
};

function learnMoreHref(page, feature) {
  if (feature && feature.learnMore) return feature.learnMore;
  if (page && page.learnMore) return page.learnMore;
  const hay = `${(feature && feature.eyebrow) || ''} ${(feature && feature.title) || ''}`.toLowerCase();
  if (/qa|quality check|spell|spacing|brand consist/.test(hay)) return routes.featureReview;
  if (/feedback|annotat|collaborat|stakeholder|client review/.test(hay)) return routes.featureCollab;
  if (/approv/.test(hay)) return routes.featureApproval;
  if (/workflow|project|version|workload|brief|deliver|campaign|request|track/.test(hay)) {
    return routes.featureWorkflow;
  }
  return routes.productPm;
}

function learnMoreLink(page, feature) {
  const href = learnMoreHref(page, feature);
  if (!href) return '';
  return `<a class="v2-product-feature-link" href="${href}">Learn more
          <svg width="19" height="13" viewBox="0 0 19 13" fill="none" aria-hidden="true"><path d="M0 6.5h16M10.5 1.5L16 6.5l-5.5 5" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/></svg>
        </a>`;
}

module.exports = { routes, figmaAsset, learnMoreHref, learnMoreLink };
