/* Site navigation: sticky header, hover/click mega menus, mobile drawer. Shared by every page. */
(function () {
  const header = document.getElementById('v2-header');
  if (!header) return;

  const nav = document.getElementById('v2-nav');
  const toggle = document.getElementById('v2-nav-toggle');
  const mobileQuery = window.matchMedia('(max-width: 960px)');
  const hoverQuery = window.matchMedia('(hover: hover) and (pointer: fine)');
  const OPEN_DELAY = 60;
  const CLOSE_DELAY = 160;

  const isMobile = () => mobileQuery.matches;
  const canHover = () => hoverQuery.matches && !isMobile();

  /* Header shadow once the page scrolls */
  const onScroll = () => header.classList.toggle('is-scrolled', window.scrollY > 8);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* Dropdowns */
  const items = Array.prototype.slice
    .call(header.querySelectorAll('.v2-nav-dropdown'))
    .map((root) => {
      const trigger = root.querySelector('.v2-nav-dropdown-trigger');
      const panelId = trigger && trigger.getAttribute('aria-controls');
      const panel = panelId && document.getElementById(panelId);
      return trigger && panel ? { root, trigger, panel, timer: null, byHover: false } : null;
    })
    .filter(Boolean);

  const clearTimer = (item) => {
    if (item.timer) {
      clearTimeout(item.timer);
      item.timer = null;
    }
  };

  const isOpen = (item) => item.root.classList.contains('is-open');

  const setOpen = (item, open, byHover) => {
    clearTimer(item);
    item.root.classList.toggle('is-open', open);
    item.panel.classList.toggle('is-open', open);
    item.trigger.setAttribute('aria-expanded', open ? 'true' : 'false');
    item.byHover = open ? Boolean(byHover) : false;
  };

  const closeAll = (except) => {
    items.forEach((item) => {
      if (item !== except) setOpen(item, false);
    });
  };

  const open = (item, byHover) => {
    closeAll(item);
    setOpen(item, true, byHover);
  };

  items.forEach((item) => {
    item.trigger.addEventListener('click', (event) => {
      event.preventDefault();
      event.stopPropagation();
      if (!isOpen(item)) {
        open(item, false);
        return;
      }
      /* Already open from hover: a click should not snap it shut. */
      if (item.byHover && canHover()) {
        item.byHover = false;
        return;
      }
      setOpen(item, false);
    });

    item.panel.addEventListener('click', (event) => event.stopPropagation());

    item.root.addEventListener('mouseenter', () => {
      if (!canHover()) return;
      clearTimer(item);
      if (isOpen(item)) return;
      item.timer = setTimeout(() => open(item, true), OPEN_DELAY);
    });

    item.root.addEventListener('mouseleave', () => {
      if (!canHover()) return;
      clearTimer(item);
      item.timer = setTimeout(() => setOpen(item, false), CLOSE_DELAY);
    });

    item.root.addEventListener('focusout', (event) => {
      if (isMobile()) return;
      if (!item.root.contains(event.relatedTarget)) setOpen(item, false);
    });
  });

  /* Mobile drawer */
  const drawerOpen = () => Boolean(nav && nav.classList.contains('is-open'));

  const setDrawer = (open) => {
    if (!nav || !toggle) return;
    nav.classList.toggle('is-open', open);
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    document.body.classList.toggle('v2-nav-open', open && isMobile());
    if (!open) closeAll();
  };

  if (toggle && nav) {
    toggle.addEventListener('click', (event) => {
      event.stopPropagation();
      setDrawer(!drawerOpen());
    });

    nav.addEventListener('click', (event) => {
      const link = event.target.closest('a');
      if (link && isMobile()) setDrawer(false);
    });
  }

  const onViewportChange = () => {
    setDrawer(false);
    closeAll();
  };
  if (typeof mobileQuery.addEventListener === 'function') {
    mobileQuery.addEventListener('change', onViewportChange);
  } else if (typeof mobileQuery.addListener === 'function') {
    mobileQuery.addListener(onViewportChange);
  }

  document.addEventListener('click', (event) => {
    if (header.contains(event.target)) return;
    closeAll();
    if (isMobile() && drawerOpen()) setDrawer(false);
  });

  document.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape') return;
    const wasOpen = items.find(isOpen);
    closeAll();
    if (wasOpen) wasOpen.trigger.focus();
    if (isMobile() && drawerOpen()) {
      setDrawer(false);
      if (toggle) toggle.focus();
    }
  });
})();
