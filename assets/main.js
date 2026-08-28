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

  if (copyEmailBtn && copyConfirm && navigator.clipboard) {
    copyEmailBtn.addEventListener('click', () => {
      navigator.clipboard.writeText('kemalutaya96@gmail.com').then(() => {
        copyConfirm.classList.add('show');
        setTimeout(() => copyConfirm.classList.remove('show'), 5000);
      }).catch(() => {});
    });
  }

  // Motion: GSAP entrance + scroll reveal, with a plain-CSS fallback
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined' && !prefersReducedMotion) {
    gsap.registerPlugin(ScrollTrigger);

    // Split the accent headline into words so it can assemble piece by piece
    const accentEl = document.querySelector('.headline-accent');
    if (accentEl) {
      accentEl.innerHTML = accentEl.textContent.trim().split(' ')
        .map(w => '<span class="hl-word">' + w + '</span>').join(' ');
    }

    // Hero entrance — one orchestrated moment on load
    gsap.set('.full-name, .hero h1, .hero .role, .hero .headline, .hero .support, .credibility-row, .hero-ctas, .status-card', { opacity: 0, y: 16 });
    gsap.timeline({ defaults: { ease: 'power3.out', duration: 0.7 } })
      .to('.full-name', { opacity: 1, y: 0 })
      .to('.hero h1', { opacity: 1, y: 0 }, '-=0.5')
      .to('.hero .role', { opacity: 1, y: 0 }, '-=0.5')
      .to('.hero .headline', { opacity: 1, y: 0 }, '-=0.45')
      .to('.hl-wire', { strokeDashoffset: 0, duration: 0.7, ease: 'power2.inOut' }, '-=0.25')
      .to('.hl-node', { opacity: 1, duration: 0.25, stagger: 0.09, ease: 'back.out(2)' }, '-=0.5')
      .from('.headline-accent .hl-word', { opacity: 0, y: 12, duration: 0.45, stagger: 0.055, ease: 'power3.out' }, '-=0.25')
      .to('.hero .support', { opacity: 1, y: 0 }, '-=0.45')
      .to('.credibility-row', { opacity: 1, y: 0 }, '-=0.4')
      .to('.hero-ctas', { opacity: 1, y: 0 }, '-=0.4')
      .to('.status-card', { opacity: 1, y: 0, duration: 0.8 }, '-=0.55');

    // Scroll reveal — grid siblings cascade together, everything else reveals on its own
    const gridSelectors = ['.services-grid', '.systems-cards', '.cred-grid', '.cases-grid', '.why-grid', '.why-matters-grid', '.security-grid', '.workflow-strip'];
    const groups = new Map();
    const singles = [];

    document.querySelectorAll('.reveal:not(.status-card)').forEach(el => {
      const gridParent = gridSelectors.map(sel => el.closest(sel)).find(Boolean);
      if (gridParent) {
        if (!groups.has(gridParent)) groups.set(gridParent, []);
        groups.get(gridParent).push(el);
      } else {
        singles.push(el);
      }
    });

    groups.forEach(els => {
      gsap.set(els, { opacity: 0, y: 20 });
      gsap.to(els, {
        opacity: 1, y: 0, duration: 0.7, ease: 'power3.out', stagger: 0.08,
        scrollTrigger: { trigger: els[0], start: 'top 88%', once: true }
      });
    });

    singles.forEach(el => {
      gsap.set(el, { opacity: 0, y: 20 });
      gsap.to(el, {
        opacity: 1, y: 0, duration: 0.7, ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 88%', once: true }
      });
    });

    // Case 03 flow diagram — steps cascade in sequence, following the arrow
    // direction, with the "after" state settling into its highlight color
    // once the chain completes.
    document.querySelectorAll('.case-flow').forEach(flow => {
      const steps = flow.querySelectorAll('.flow-step');
      const afterStep = flow.querySelector('.flow-step.flow-after');
      gsap.set(steps, { opacity: 0, y: -10 });
      if (afterStep) gsap.set(afterStep, { color: 'rgba(245,247,246,0.45)' });

      const tl = gsap.timeline({
        delay: 0.25,
        scrollTrigger: { trigger: flow, start: 'top 85%', once: true }
      });
      tl.to(steps, { opacity: 1, y: 0, duration: 0.4, ease: 'power3.out', stagger: 0.16 });
      if (afterStep) {
        tl.to(afterStep, { color: '#19B5A5', duration: 0.5, ease: 'power3.out' }, '-=0.15');
      }
    });

    // Proof strip count-up
    document.querySelectorAll('.proof-num[data-count]').forEach(el => {
      const target = parseInt(el.getAttribute('data-count'), 10);
      const suffix = el.getAttribute('data-suffix') || '';
      const obj = { val: 0 };
      gsap.to(obj, {
        val: target, duration: 1.4, ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 92%', once: true },
        onUpdate: () => { el.textContent = Math.round(obj.val) + suffix; },
        onComplete: () => {
          gsap.fromTo(el, { scale: 1 }, { scale: 1.06, duration: 0.16, yoyo: true, repeat: 1, ease: 'power3.out' });
        }
      });
    });

    // Case 03 architecture diagram — nodes light up in sequence
    document.querySelectorAll('.arch-diagram').forEach(diagram => {
      const nodes = diagram.querySelectorAll('.arch-node');
      gsap.set(nodes, { opacity: 0.3, y: 6 });
      const tl = gsap.timeline({
        scrollTrigger: { trigger: diagram, start: 'top 82%', once: true }
      });
      nodes.forEach(node => {
        tl.to(node, { opacity: 1, y: 0, duration: 0.32, ease: 'power3.out' });
      });
    });
  } else {
    // Fallback: GSAP unavailable or reduced motion preferred — show everything immediately
    document.querySelectorAll('.reveal').forEach(el => { el.style.opacity = '1'; el.style.transform = 'none'; });
    document.querySelectorAll('.proof-num[data-count]').forEach(el => {
      el.textContent = el.getAttribute('data-count') + (el.getAttribute('data-suffix') || '');
    });
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

  // Scroll-spy nav highlighting
  const sections = ['about','services','systems','experience','improvements','security','contact']
    .map(id => document.getElementById(id)).filter(Boolean);
  const navLinks = document.querySelectorAll('nav.links a');

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

  // Proof cards: radial glow follows the cursor across the gradient rim.
  // Delegated so it costs one listener regardless of card count.
  (function(){
    document.querySelectorAll('.proof-strip-inner').forEach(strip => {
      strip.addEventListener('pointermove', e => {
        const card = e.target.closest('.proof-item');
        if(!card) return;
        const r = card.getBoundingClientRect();
        card.style.setProperty('--mx', (e.clientX - r.left) + 'px');
        card.style.setProperty('--my', (e.clientY - r.top) + 'px');
      });
    });
  })();

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

  // Spotlight on content cards (motion-primitives: spotlight)
  (function(){
    const sel = '.service-card, .sys-card, .cred-card, .why-matters-item';
    document.addEventListener('pointermove', e => {
      const card = e.target.closest(sel);
      if(!card) return;
      const r = card.getBoundingClientRect();
      card.style.setProperty('--mx', (e.clientX - r.left) + 'px');
      card.style.setProperty('--my', (e.clientY - r.top) + 'px');
    }, { passive: true });
  })();
