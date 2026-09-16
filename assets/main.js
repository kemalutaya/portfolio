// Theme toggle
  (function(){
    const root = document.documentElement;
    const toggles = [document.getElementById('themeToggle'), document.getElementById('themeToggleMobile')].filter(Boolean);
    function currentTheme(){ return root.getAttribute('data-theme') === 'dark' ? 'dark' : 'light'; }
    function updateButtons(theme){
      toggles.forEach(btn => {
        const isDark = theme === 'dark';
        btn.setAttribute('aria-pressed', isDark);
        btn.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
        const label = btn.querySelector('.theme-toggle-label');
        if(label){ label.textContent = isDark ? 'Light mode' : 'Dark mode'; }
      });
    }
    function setTheme(theme){
      if(theme === 'dark'){ root.setAttribute('data-theme','dark'); }
      else{ root.removeAttribute('data-theme'); }
      try{ localStorage.setItem('theme', theme); }catch(e){}
      updateButtons(theme);
    }
    updateButtons(currentTheme());
    toggles.forEach(btn => {
      btn.addEventListener('click', () => {
        setTheme(currentTheme() === 'dark' ? 'light' : 'dark');
      });
    });
  })();

  // Mobile nav toggle
  const navToggle = document.getElementById('navToggle');
  const navMobile = document.getElementById('navMobile');
  const navBackdrop = document.getElementById('navBackdrop');
  navToggle.addEventListener('click', () => {
    const open = navMobile.classList.toggle('open');
    navBackdrop.classList.toggle('open', open);
    navToggle.setAttribute('aria-expanded', open);
  });
  navBackdrop.addEventListener('click', () => {
    navMobile.classList.remove('open');
    navBackdrop.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
  navMobile.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      navMobile.classList.remove('open');
      navBackdrop.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });

  // Copy-to-clipboard fallback: mailto: links do nothing visible on devices/
  // browsers with no default mail client set, so this guarantees the email
  // is always reachable one way or another.
  const connectBtn = document.getElementById('connectBtn');
  const mailFallback = document.getElementById('mailFallback');
  const copyConfirm = document.getElementById('copyConfirm');
  const copyEmailBtn = document.getElementById('copyEmailBtn');

  if (connectBtn && mailFallback) {
    connectBtn.addEventListener('click', () => {
      // The mailto fires normally. If a mail client takes over, the page loses
      // focus and we stay quiet. If nothing happens, surface webmail options
      // rather than leaving the person with a dead button.
      const wasHidden = document.hidden;
      setTimeout(() => {
        if (document.hidden || wasHidden) return;
        mailFallback.hidden = false;
      }, 800);
    });
  }

  // The copy button must work even where the async Clipboard API is missing
  // (non-secure contexts, older mobile browsers) and must say so when it
  // genuinely can't copy, rather than looking like a dead button.
  if (copyEmailBtn && copyConfirm) {
    const EMAIL = 'kemalutaya96@gmail.com';
    let hideTimer;

    function announce(message, ok) {
      copyConfirm.textContent = message;
      copyConfirm.classList.toggle('is-error', !ok);
      copyConfirm.classList.add('show');
      clearTimeout(hideTimer);
      hideTimer = setTimeout(() => copyConfirm.classList.remove('show'), 6000);
    }

    function legacyCopy(text) {
      try {
        const ta = document.createElement('textarea');
        ta.value = text;
        ta.setAttribute('readonly', '');
        ta.style.position = 'fixed';
        ta.style.top = '-1000px';
        document.body.appendChild(ta);
        ta.select();
        const ok = document.execCommand('copy');
        document.body.removeChild(ta);
        return ok;
      } catch (e) {
        return false;
      }
    }

    function fallback() {
      if (legacyCopy(EMAIL)) announce('Copied — ' + EMAIL, true);
      else announce('Couldn’t copy automatically. The address is ' + EMAIL, false);
    }

    copyEmailBtn.addEventListener('click', () => {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(EMAIL)
          .then(() => announce('Copied — ' + EMAIL, true))
          .catch(fallback);
      } else {
        fallback();
      }
    });
  }

  // Motion: one hero entrance on load. Nothing reveals on scroll — the page is
  // complete at rest, so no content waits on an observer to become visible.
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (typeof gsap !== 'undefined' && !prefersReducedMotion) {
    // Split the accent headline into words so it can assemble piece by piece
    const accentEl = document.querySelector('.headline-accent');
    if (accentEl) {
      accentEl.innerHTML = accentEl.textContent.trim().split(' ')
        .map(w => '<span class="hl-word">' + w + '</span>').join(' ');
    }

    // Hero entrance — the single orchestrated moment
    gsap.set('.full-name, .hero h1, .hero .role, .hero .headline, .hero .support, .credibility-row, .hero-ctas, .status-card', { opacity: 0, y: 16 });
    gsap.timeline({ defaults: { ease: 'power3.out', duration: 0.7 } })
      .to('.full-name', { opacity: 1, y: 0 })
      .to('.hero h1', { opacity: 1, y: 0 }, '-=0.5')
      .to('.hero .role', { opacity: 1, y: 0 }, '-=0.5')
      .to('.hero .headline', { opacity: 1, y: 0 }, '-=0.45')
      .from('.headline-accent .hl-word', { opacity: 0, y: 12, duration: 0.45, stagger: 0.055, ease: 'power3.out' }, '-=0.25')
      .to('.hero .support', { opacity: 1, y: 0 }, '-=0.45')
      .to('.credibility-row', { opacity: 1, y: 0 }, '-=0.4')
      .to('.hero-ctas', { opacity: 1, y: 0 }, '-=0.4')
      .to('.status-card', { opacity: 1, y: 0, duration: 0.8 }, '-=0.55');
  }

  // Case 03: manual vs automated comparison toggle
  document.querySelectorAll('.flow-toggleable').forEach(flow => {
    const buttons = flow.querySelectorAll('.flow-btn');
    const panes = flow.querySelectorAll('.flow-pane');
    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        const mode = btn.getAttribute('data-mode');
        buttons.forEach(b => {
          const on = b === btn;
          b.classList.toggle('is-active', on);
          b.setAttribute('aria-pressed', on);
        });
        panes.forEach(p => { p.hidden = p.getAttribute('data-pane') !== mode; });

        const shown = flow.querySelector('.flow-pane[data-pane="' + mode + '"]');
        if (shown && typeof gsap !== 'undefined' &&
            !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
          gsap.fromTo(shown.querySelectorAll('.flow-step, .flow-tally'),
            { opacity: 0, y: 6 },
            { opacity: 1, y: 0, duration: 0.26, stagger: 0.045, ease: 'power3.out' });
        }
      });
    });
  });

  // Small back-to-top, revealed once the hero is scrolled past
  const toTop = document.getElementById('toTop');
  if (toTop) {
    let ticking = false;
    const updateToTop = () => {
      toTop.classList.toggle('show', window.scrollY > window.innerHeight * 0.9);
      ticking = false;
    };
    window.addEventListener('scroll', () => {
      if (!ticking) { window.requestAnimationFrame(updateToTop); ticking = true; }
    }, { passive: true });
    updateToTop();
  }

  // Scroll-spy nav highlighting. Sections are derived from the nav itself so
  // every page highlights its own links — a hardcoded list silently skipped
  // the sections that only exist on the /da/ and /va/ pages.
  const navLinks = document.querySelectorAll('nav.links a[href^="#"]');
  const sections = [...navLinks]
    .map(a => document.getElementById(a.getAttribute('href').slice(1)))
    .filter(Boolean);

  const spyIo = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const id = entry.target.getAttribute('id');
      const link = document.querySelector('nav.links a[href="#' + id + '"]');
      if (!link) return;
      if (entry.isIntersecting) {
        navLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
      }
    });
  }, { threshold: 0, rootMargin: '-40% 0px -55% 0px' });

  sections.forEach(sec => spyIo.observe(sec));

  // Scroll progress bar (motion-primitives: scroll-progress)
  (function(){
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const bar = document.createElement('div');
    bar.className = 'scroll-progress';
    bar.setAttribute('aria-hidden', 'true');
    document.body.appendChild(bar);
    let ticking = false;
    function update(){
      const h = document.documentElement.scrollHeight - window.innerHeight;
      bar.style.transform = 'scaleX(' + (h > 0 ? Math.min(window.scrollY / h, 1) : 0) + ')';
      ticking = false;
    }
    window.addEventListener('scroll', () => {
      if(!ticking){ ticking = true; requestAnimationFrame(update); }
    }, { passive: true });
    window.addEventListener('resize', update, { passive: true });
    update();
  })();

  // CTA banner above the footer — dismissible, remembered per visitor
  (function(){
    const banner = document.getElementById('ctaBanner');
    const closeBtn = document.getElementById('ctaBannerClose');
    if(!banner || !closeBtn) return;
    const KEY = 'ctaBannerDismissed';
    try{
      if(localStorage.getItem(KEY) === '1'){ banner.hidden = true; return; }
    }catch(e){}
    closeBtn.addEventListener('click', () => {
      banner.hidden = true;
      try{ localStorage.setItem(KEY, '1'); }catch(e){}
    });
  })();
