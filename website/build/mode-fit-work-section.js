function card(c) {
  return `
          <article class="v2-mode-use-card">
            <div class="v2-mode-use-card-main">
              <span class="v2-mode-use-icon" aria-hidden="true">${c.icon}</span>
              <h3 class="v2-mode-use-title">${c.title}</h3>
              <p class="v2-mode-use-body">${c.body}</p>
            </div>
            <p class="v2-mode-use-tag">${c.tag}<span aria-hidden="true">${c.tagIcon}</span></p>
          </article>`;
}

const productiveCards = [
  {
    title: 'Recurring Social Media Content',
    body: 'When the design system is established and the goal is fast, consistent execution.',
    tag: 'High-Velocity Cadence',
    icon: `<svg width="20" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="3.5" y="5" width="17" height="16" rx="2.5" stroke="#283AE5" stroke-width="1.7"/><path d="M8 3.5v3M16 3.5v3M3.5 10h17" stroke="#283AE5" stroke-width="1.7" stroke-linecap="round"/></svg>`,
    tagIcon: `<svg width="11" height="13" viewBox="0 0 12 14" fill="none" aria-hidden="true"><path d="M6.8 1 2 8h3.6L5.2 13 10 6H6.4L6.8 1Z" stroke="#283AE5" stroke-width="1.3" stroke-linejoin="round"/></svg>`,
  },
  {
    title: 'Magazine Production',
    body: 'When each new edition follows an established structure, template, and production workflow.',
    tag: 'Multi-page Template Systems',
    icon: `<svg width="24" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 5.5c0-.8.7-1.5 1.6-1.5H12v15.5H5.6A1.6 1.6 0 0 1 4 17.9V5.5Z" stroke="#283AE5" stroke-width="1.7"/><path d="M20 5.5c0-.8-.7-1.5-1.6-1.5H12v15.5h6.4A1.6 1.6 0 0 0 20 17.9V5.5Z" stroke="#283AE5" stroke-width="1.7"/></svg>`,
    tagIcon: `<svg width="12" height="13" viewBox="0 0 12 13" fill="none" aria-hidden="true"><path d="M6 1.5 1.5 4 6 6.5 10.5 4 6 1.5ZM1.5 6.5 6 9l4.5-2.5M1.5 9 6 11.5 10.5 9" stroke="#283AE5" stroke-width="1.2" stroke-linejoin="round"/></svg>`,
  },
  {
    title: 'Print Collateral Updates',
    body: 'For updates to brochures, flyers, or catalogs using existing templates.',
    tag: 'Precision Spec Approvals',
    icon: `<svg width="22" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M7 8V4.5h10V8M7 15.5v4h10v-4" stroke="#283AE5" stroke-width="1.7" stroke-linejoin="round"/><rect x="4" y="8" width="16" height="7.5" rx="1.5" stroke="#283AE5" stroke-width="1.7"/></svg>`,
    tagIcon: `<svg width="13" height="13" viewBox="0 0 14 14" fill="none" aria-hidden="true"><circle cx="7" cy="7" r="5.2" stroke="#283AE5" stroke-width="1.3"/><path d="m4.6 7.1 1.6 1.6 3.2-3.3" stroke="#283AE5" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  },
  {
    title: 'Ad Variations',
    body: 'When creating multiple sizes or versions of existing creatives for different platforms.',
    tag: 'Aspect-ratio Adaptations',
    icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="8" y="8" width="12" height="12" rx="2" stroke="#283AE5" stroke-width="1.7"/><path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2" stroke="#283AE5" stroke-width="1.7"/></svg>`,
    tagIcon: `<svg width="13" height="11" viewBox="0 0 14 12" fill="none" aria-hidden="true"><path d="M3.5 1v8.5H12M10.5 11V2.5H2" stroke="#283AE5" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  },
];

const creativeCards = [
  {
    title: 'Brand Guidelines',
    body: 'When designers and clients need to explore ideas and shape the brand together.',
    tag: 'Visual Identity Systems',
    icon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 3.5a8.5 8.5 0 1 0 0 17c1.2 0 1.8-.9 1.8-1.8 0-.5.2-1 .6-1.3.4-.4.9-.6 1.4-.6H17a3.5 3.5 0 0 0 3.5-3.5C20.5 7.6 16.7 3.5 12 3.5Z" stroke="#283AE5" stroke-width="1.7"/><circle cx="8.2" cy="10" r="1.1" fill="#283AE5"/><circle cx="12" cy="7.6" r="1.1" fill="#283AE5"/><circle cx="15.8" cy="10" r="1.1" fill="#283AE5"/></svg>`,
    tagIcon: `<svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true"><path d="M6 1.2 6.9 4.1 9.8 5 6.9 5.9 6 8.8 5.1 5.9 2.2 5 5.1 4.1 6 1.2Z" stroke="#283AE5" stroke-width="1.2" stroke-linejoin="round"/></svg>`,
  },
  {
    title: 'Ad Campaigns',
    body: 'When the creative direction is still evolving and multiple perspectives can influence the outcome.',
    tag: 'Multi-Angle Concepting',
    icon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 10.5v3l11.5 3.5V7L4 10.5Z" stroke="#283AE5" stroke-width="1.7" stroke-linejoin="round"/><path d="M18.5 9a2.8 2.8 0 0 1 0 6M6.2 13.5v2.4A1.8 1.8 0 0 0 8 17.7h.8" stroke="#283AE5" stroke-width="1.7" stroke-linecap="round"/></svg>`,
    tagIcon: `<svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true"><circle cx="6" cy="6" r="4.4" stroke="#283AE5" stroke-width="1.2"/><path d="m7.8 4.2-1 3-3 1 1-3 3-1Z" stroke="#283AE5" stroke-width="1.2" stroke-linejoin="round"/></svg>`,
  },
  {
    title: 'New Product Launch',
    body: 'When creating a completely new visual identity or campaign for a product.',
    tag: 'Go-to-Market Exploration',
    icon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 3.5c2.6 2.2 4.5 5.8 4.5 10.2a4.5 4.5 0 0 1-9 0C7.5 9.3 9.4 5.7 12 3.5Z" stroke="#283AE5" stroke-width="1.7"/><circle cx="12" cy="11.2" r="1.2" stroke="#283AE5" stroke-width="1.5"/><path d="M9.2 15.4 7.5 20l2.8-.9L12 20l1.7-1.9 2.8.9-1.7-4.6" stroke="#283AE5" stroke-width="1.7" stroke-linejoin="round"/></svg>`,
    tagIcon: `<svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true"><path d="M3 10.5V2.2h6.2L7.6 4.8l1.6 2.6H3" stroke="#283AE5" stroke-width="1.2" stroke-linejoin="round"/></svg>`,
  },
  {
    title: 'Rebranding',
    body: 'When rethinking the brand and exploring new creative directions with all stakeholders.',
    tag: 'Strategic Brand Evolution',
    icon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="m4 20 9.5-9.5" stroke="#283AE5" stroke-width="1.7" stroke-linecap="round"/><path d="M15.2 4.2 16 6l1.8.8L16 7.6l-.8 1.8L14.4 7.6 12.6 6.8 14.4 6l.8-1.8ZM20 11.2l.5 1.1 1.1.5-1.1.5-.5 1.1-.5-1.1-1.1-.5 1.1-.5.5-1.1ZM6.5 5.2 7 6.3l1.1.5L7 7.3l-.5 1.1-.5-1.1L4.9 6.8 6 6.3l.5-1.1Z" stroke="#283AE5" stroke-width="1.4" stroke-linejoin="round"/></svg>`,
    tagIcon: `<svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true"><path d="M10 6a4 4 0 1 1-1.2-2.9L10 4.2V2" stroke="#283AE5" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  },
];

module.exports = `
    <section class="v2-mode-fit-work" aria-labelledby="mode-fit-work-title">
      <div class="v2-mode-fit-work-inner">
        <header class="v2-mode-fit-work-header">
          <h2 id="mode-fit-work-title">Choose the Right Mode</h2>
          <p>Assign the right operating rhythm dynamically for every project or team member.</p>
        </header>
        <div class="v2-mode-fit-picker" data-mode-picker>
          <div class="v2-mode-fit-toggle" role="tablist" aria-label="Productive or Creative mode">
            <button type="button" class="v2-mode-fit-tab is-active" role="tab" aria-selected="true" data-mode="productive">PRODUCTIVE MODE</button>
            <button type="button" class="v2-mode-fit-tab" role="tab" aria-selected="false" data-mode="creative">CREATIVE MODE</button>
          </div>
          <div class="v2-mode-fit-viewport">
            <div class="v2-mode-fit-track">
              <div class="v2-mode-fit-grid is-active" data-mode-panel="productive" role="tabpanel" aria-hidden="false">${productiveCards.map(card).join('')}
              </div>
              <div class="v2-mode-fit-grid" data-mode-panel="creative" role="tabpanel" aria-hidden="true">${creativeCards.map(card).join('')}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>`;
