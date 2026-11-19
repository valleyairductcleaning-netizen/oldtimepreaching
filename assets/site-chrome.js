/* Shared, progressively enhanced navigation. Ordinary links work without JS. */
(() => {
  const header = document.querySelector('[data-otp-chrome="homepage"]');
  if (!header || header.dataset.enhanced === 'true') return;
  const toggle = header.querySelector('.otp-chrome-toggle');
  const menu = header.querySelector('#otp-site-menu');
  if (!toggle || !menu) return;
  const icon = toggle.querySelector('.otp-chrome-toggle-icon');
  const label = toggle.querySelector('.otp-chrome-toggle-text');
  const skip = header.querySelector('.otp-chrome-skip');
  skip?.addEventListener('click', (event) => {
    // The Bible app can replace <main> after loading. Resolve its current main
    // element when the link is used instead of keeping a stale DOM reference.
    const targetId = skip.getAttribute('href').slice(1);
    const main = document.getElementById(targetId) || document.querySelector('main');
    if (!main) return;
    event.preventDefault();
    if (!main.id) main.id = targetId;
    main.setAttribute('tabindex', '-1');
    main.focus({ preventScroll: true });
    main.scrollIntoView({ block: 'start' });
  });
  function setOpen(open) {
    header.dataset.menuOpen = String(open);
    toggle.setAttribute('aria-expanded', String(open));
    icon.textContent = open ? '×' : '☰';
    label.textContent = open ? 'Close Menu' : 'Browse the Website';
  }
  header.dataset.enhanced = 'true';
  setOpen(false);
  toggle.addEventListener('click', () => setOpen(toggle.getAttribute('aria-expanded') !== 'true'));
  header.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
      setOpen(false);
      toggle.focus();
    }
  });
  menu.addEventListener('click', (event) => {
    if (event.target.closest('a')) setOpen(false);
  });
  const desktop = window.matchMedia('(min-width:761px)');
  desktop.addEventListener('change', () => setOpen(false));
})();
