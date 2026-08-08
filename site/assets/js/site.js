/* reboot storefront.
   Transform and opacity only; nothing here forces layout during a scroll or a
   pointer move. Every module is opt-in: it looks for its own markup and exits
   if the page does not have it, so one page's absence never breaks another's. */
(function () {
  'use strict';

  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var coarse = window.matchMedia('(hover: none)').matches;
  var raf = window.requestAnimationFrame || function (f) { return setTimeout(f, 16); };
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return [].slice.call((r || document).querySelectorAll(s)); };

  /* ==================================================================
     theme
     The attribute is written by the inline script in <head> before first
     paint, so the page never flashes the wrong ground. This only handles the
     toggle and remembering the choice. Somebody who has never pressed the
     button keeps following their system setting, including if it changes
     while the tab is open.
     ================================================================== */
  var THEME_KEY = 'rb-theme';
  var root = document.documentElement;
  var sysDark = window.matchMedia('(prefers-color-scheme: dark)');
  function setTheme(t, remember) {
    root.setAttribute('data-theme', t);
    $$('[data-theme-toggle]').forEach(function (b) {
      b.setAttribute('aria-pressed', t === 'light' ? 'true' : 'false');
      b.setAttribute('aria-label', t === 'light' ? 'Switch to dark' : 'Switch to light');
    });
    if (remember) { try { localStorage.setItem(THEME_KEY, t); } catch (e) {} }
  }
  setTheme(root.getAttribute('data-theme') || 'dark', false);
  $$('[data-theme-toggle]').forEach(function (b) {
    b.addEventListener('click', function () {
      setTheme(root.getAttribute('data-theme') === 'light' ? 'dark' : 'light', true);
    });
  });
  if (sysDark.addEventListener) {
    sysDark.addEventListener('change', function (e) {
      var saved = null;
      try { saved = localStorage.getItem(THEME_KEY); } catch (err) {}
      if (!saved) setTheme(e.matches ? 'dark' : 'light', false);
    });
  }

  /* ==================================================================
     shared: focus trap, used by the drawer and every modal
     ================================================================== */
  var FOCUSABLE = 'a[href],button:not([disabled]),input:not([disabled]),select,textarea,[tabindex]:not([tabindex="-1"])';
  function trap(container, onEscape) {
    var last = document.activeElement;
    function key(e) {
      if (e.key === 'Escape') { e.preventDefault(); onEscape(); return; }
      if (e.key !== 'Tab') return;
      var f = $$(FOCUSABLE, container).filter(function (el) { return el.offsetParent !== null; });
      if (!f.length) return;
      var first = f[0], lastEl = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); lastEl.focus(); }
      else if (!e.shiftKey && document.activeElement === lastEl) { e.preventDefault(); first.focus(); }
    }
    document.addEventListener('keydown', key);
    return function release() {
      document.removeEventListener('keydown', key);
      if (last && last.focus) last.focus();
    };
  }

  /* scroll lock that compensates for the scrollbar, so the page does not jump */
  var locks = 0;
  function lock() {
    if (locks++) return;
    var w = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = 'hidden';
    if (w > 0) document.body.style.paddingRight = w + 'px';
  }
  function unlock() {
    if (--locks > 0) return;
    locks = 0;
    document.body.style.overflow = '';
    document.body.style.paddingRight = '';
  }

  /* ==================================================================
     scroll reveal
     ================================================================== */
  var rv = $$('.rv');
  /* Opt in from here, never from the inline head script. If this file fails to
     load, nothing is ever hidden, instead of the whole page staying invisible. */
  if (rv.length) document.documentElement.classList.add('rv-on');
  if (reduce || !('IntersectionObserver' in window)) {
    rv.forEach(function (el) { el.classList.add('in'); });
  } else {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { rootMargin: '0px 0px -6% 0px', threshold: 0.05 });
    rv.forEach(function (el) { io.observe(el); });
  }

  /* ==================================================================
     kinetic headings
     Each rendered line gets its own clip so the lines rise in sequence.
     Per line, never per letter: letters animating one at a time is the loudest
     generated-site tell there is, and it wrecks text selection. Rebuilt on
     resize, because the line breaks move.
     ================================================================== */
  function kinetic(el) {
    var text = el.dataset.kinText || (el.dataset.kinText = el.textContent.trim());
    el.textContent = text;
    if (reduce) return;
    var words = text.split(/\s+/);
    el.textContent = '';
    var probes = words.map(function (w, i) {
      var s = document.createElement('span');
      s.textContent = w + (i < words.length - 1 ? ' ' : '');
      el.appendChild(s);
      return s;
    });
    var lines = [], top = null;
    probes.forEach(function (s) {
      var t = Math.round(s.getBoundingClientRect().top);
      if (top === null || Math.abs(t - top) > 4) { lines.push([]); top = t; }
      lines[lines.length - 1].push(s.textContent);
    });
    el.textContent = '';
    lines.forEach(function (w) {
      var line = document.createElement('span');
      line.className = 'kin-l';
      var inner = document.createElement('span');
      inner.textContent = w.join('').replace(/\s+$/, '');
      line.appendChild(inner);
      el.appendChild(line);
    });
  }
  var kins = $$('.kin');
  if (kins.length) {
    kins.forEach(kinetic);
    if ('IntersectionObserver' in window && !reduce) {
      var kio = new IntersectionObserver(function (es) {
        es.forEach(function (e) {
          if (e.isIntersecting) { e.target.classList.add('in'); kio.unobserve(e.target); }
        });
      }, { threshold: 0.15 });
      kins.forEach(function (el) { kio.observe(el); });
    } else {
      kins.forEach(function (el) { el.classList.add('in'); });
    }
    var kt, kw = window.innerWidth;
    window.addEventListener('resize', function () {
      if (window.innerWidth === kw) return;      /* iOS fires resize on scroll */
      kw = window.innerWidth;
      clearTimeout(kt);
      kt = setTimeout(function () {
        kins.forEach(function (el) { kinetic(el); el.classList.add('in'); });
      }, 200);
    });
  }

  /* ==================================================================
     magnetic buttons
     ================================================================== */
  if (!reduce && !coarse) {
    $$('.mag').forEach(function (el) {
      el.addEventListener('pointermove', function (e) {
        var r = el.getBoundingClientRect();
        el.classList.add('pulling');
        el.style.setProperty('--mx', ((e.clientX - r.left - r.width / 2) / r.width * 14).toFixed(2) + 'px');
        el.style.setProperty('--my', ((e.clientY - r.top - r.height / 2) / r.height * 14).toFixed(2) + 'px');
      });
      el.addEventListener('pointerleave', function () {
        el.classList.remove('pulling');
        el.style.setProperty('--mx', '0px');
        el.style.setProperty('--my', '0px');
      });
    });
  }

  /* ==================================================================
     mobile nav
     ================================================================== */
  var burger = $('.burger'), nav = $('.nav');
  if (burger && nav) {
    burger.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }

  /* ==================================================================
     scroll progress, and the masthead's ground
     The bar is transparent over the top of the page and takes its glass on
     the way down. One handler, because both read the same scroll position
     and neither should schedule its own frame.
     ================================================================== */
  var prog = $('[data-prog]');
  var hdr = $('.hdr');
  var ticking = false, wasStuck = null;
  function onScroll() {
    if (ticking) return;
    ticking = true;
    raf(function () {
      ticking = false;
      var y = window.pageYOffset;
      if (prog) {
        var h = document.documentElement.scrollHeight - window.innerHeight;
        /* transform, not width: this runs every frame on a 10,000px document */
        prog.style.transform = 'scaleX(' + (h > 0 ? y / h : 0) + ')';
      }
      if (hdr) {
        /* only touch the class when it actually changes; setting it every
           frame invalidates style on every scroll tick for nothing */
        var stuck = y > 24;
        if (stuck !== wasStuck) { wasStuck = stuck; hdr.classList.toggle('stuck', stuck); }
      }
    });
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll, { passive: true });
  onScroll();

  /* ==================================================================
     CART
     State lives in memory only. There is no back end, and persisting a cart
     across a reload would imply one. On Shopify this module talks to
     /cart/*.js and everything below the fetch boundary is unchanged.
     ================================================================== */
  /* ------------------------------------------------------------------
     The store's data. Adding Release 002 is one entry in PRODUCTS and one
     variant in its `variants` list — no UI code changes. CATEGORIES is the
     permanent shelf structure; a product declares which shelf it sits on.
     On Shopify these two objects are what the Liquid templates emit, and
     everything below this line is unchanged.
     ------------------------------------------------------------------ */
  var CATEGORIES = {
    live:    { n: '01', name: 'Live',    accent: '#079DE0' },
    move:    { n: '02', name: 'Move',    accent: '#E07A5F' },
    work:    { n: '03', name: 'Work',    accent: '#09D0DC' },
    connect: { n: '04', name: 'Connect', accent: '#68E69D' }
  };
  var PRODUCTS = {
    'gloss': {
      release: '001', category: 'live', name: 'R01',
      subtitle: 'Cordless water flosser', price: 79, status: 'live',
      url: 'product.html',
      variants: [
        { sku: 'RB-001-WHT', name: 'Soft White', swatch: '#E9EAEA',
          img: 'assets/img/r01.webp', status: 'available' }
      ]
    }
  };
  var ACCESSORIES = {
    'RB-NOZ-4': { name: 'Nozzle set, four pack', variant: 'Mixed tips', price: 12,
                  img: 'assets/img/dwg-top.svg' }
  };

  /* flatten to sku -> line item, which is all the cart needs to know */
  var CATALOGUE = {};
  Object.keys(PRODUCTS).forEach(function (k) {
    var p = PRODUCTS[k];
    p.variants.forEach(function (v) {
      CATALOGUE[v.sku] = { name: p.name, variant: v.name, price: p.price, img: v.img };
    });
  });
  Object.keys(ACCESSORIES).forEach(function (k) { CATALOGUE[k] = ACCESSORIES[k]; });
  window.rbStore = { PRODUCTS: PRODUCTS, CATEGORIES: CATEGORIES, CATALOGUE: CATALOGUE };

  var FREE_SHIPPING_AT = 79;
  var cart = [];

  var drawer = $('#cart-drawer'), scrim = $('#cart-scrim'), shell = $('[data-drawer-shell]');
  var cartBody = $('[data-cart-body]'), cartSub = $('[data-cart-sub]');
  var cartBadge = $('[data-cart-badge]'), shipFill = $('[data-ship-fill]'), shipNote = $('[data-ship-note]');
  var cartTrapRelease = null;

  function money(n) { return '$' + (n % 1 ? n.toFixed(2) : n); }
  function count() { return cart.reduce(function (a, i) { return a + i.qty; }, 0); }
  function subtotal() {
    return cart.reduce(function (a, i) { return a + CATALOGUE[i.sku].price * i.qty; }, 0);
  }

  function renderCart() {
    var total = subtotal(), n = count();

    if (cartBadge) {
      cartBadge.textContent = n;
      cartBadge.classList.toggle('on', n > 0);
    }
    var live = $('[data-cart-live]');
    if (live) {
      live.textContent = n === 0 ? 'Cart is empty'
        : n + (n === 1 ? ' item' : ' items') + ' in cart, subtotal ' + money(total);
    }
    if (!cartBody) return;

    if (!cart.length) {
      cartBody.innerHTML = '<div class="cart-empty"><p>Nothing in the cart yet.</p></div>';
    } else {
      cartBody.innerHTML = cart.map(function (i) {
        var p = CATALOGUE[i.sku];
        return '<div class="citem" data-sku="' + i.sku + '">' +
          '<div class="citem-fig"><img src="' + p.img + '" alt="" width="64" height="78"></div>' +
          '<div><h3>' + p.name + '</h3><span class="citem-var">' + p.variant + '</span>' +
            '<div class="citem-row">' +
              '<span class="qty">' +
                '<button type="button" data-step="-1" aria-label="Reduce quantity of ' + p.name + '"' +
                  (i.qty <= 1 ? ' disabled' : '') + '>&minus;</button>' +
                '<output aria-label="Quantity of ' + p.name + '">' + i.qty + '</output>' +
                '<button type="button" data-step="1" aria-label="Increase quantity of ' + p.name + '">+</button>' +
              '</span>' +
              '<span class="citem-pr">' + money(p.price * i.qty) + '</span>' +
            '</div>' +
            '<button type="button" class="citem-rm" data-remove aria-label="Remove ' + p.name + ' from cart">Remove</button>' +
          '</div></div>';
      }).join('');
    }

    if (cartSub) cartSub.textContent = money(total);
    if (shipFill) shipFill.style.setProperty('--p', Math.min(1, total / FREE_SHIPPING_AT).toFixed(3));
    if (shipNote) {
      shipNote.innerHTML = total >= FREE_SHIPPING_AT
        ? 'Free shipping <b>unlocked</b>'
        : 'Add <b>' + money(FREE_SHIPPING_AT - total) + '</b> for free shipping';
    }
    var up = $('[data-upsell]');
    if (up) up.hidden = cart.some(function (i) { return i.sku === 'RB-NOZ-4'; });
  }

  function openCart() {
    if (!drawer) return;
    if (shell) shell.classList.add('on');
    drawer.classList.add('on');
    drawer.removeAttribute('aria-hidden');
    if (scrim) scrim.classList.add('on');
    lock();
    var close = $('[data-cart-close]', drawer);
    if (close) close.focus();
    cartTrapRelease = trap(drawer, closeCart);
  }
  function closeCart() {
    if (!drawer) return;
    drawer.classList.remove('on');
    drawer.setAttribute('aria-hidden', 'true');
    if (shell) window.setTimeout(function () {
      if (!drawer.classList.contains('on')) shell.classList.remove('on');
    }, 540);
    if (scrim) scrim.classList.remove('on');
    unlock();
    if (cartTrapRelease) { cartTrapRelease(); cartTrapRelease = null; }
  }

  function addToCart(sku, qty) {
    if (!CATALOGUE[sku]) return;
    var line = cart.filter(function (i) { return i.sku === sku; })[0];
    if (line) line.qty += (qty || 1); else cart.push({ sku: sku, qty: qty || 1 });
    renderCart();
    if (cartBadge) {
      cartBadge.classList.remove('bump');
      void cartBadge.offsetWidth;                 /* restart the keyframe */
      cartBadge.classList.add('bump');
    }
    if (window.rbTrack) window.rbTrack('add_to_cart', {
      currency: 'USD', value: CATALOGUE[sku].price * (qty || 1),
      items: [{ item_id: sku, item_name: CATALOGUE[sku].name }]
    });
    openCart();
  }

  if (drawer) {
    renderCart();
    $$('[data-cart-open]').forEach(function (b) {
      b.addEventListener('click', function (e) { e.preventDefault(); openCart(); });
    });
    $$('[data-cart-close]').forEach(function (b) { b.addEventListener('click', closeCart); });
    if (scrim) scrim.addEventListener('click', closeCart);

    if (cartBody) cartBody.addEventListener('click', function (e) {
      var row = e.target.closest('.citem');
      if (!row) return;
      var sku = row.getAttribute('data-sku');
      var line = cart.filter(function (i) { return i.sku === sku; })[0];
      if (!line) return;
      if (e.target.closest('[data-remove]')) {
        cart = cart.filter(function (i) { return i.sku !== sku; });
      } else {
        var step = e.target.closest('[data-step]');
        if (!step) return;
        line.qty = Math.max(1, line.qty + parseInt(step.getAttribute('data-step'), 10));
      }
      renderCart();
    });

    var upAdd = $('[data-upsell-add]');
    if (upAdd) upAdd.addEventListener('click', function () { addToCart('RB-NOZ-4', 1); });

    var checkout = $('[data-checkout]');
    if (checkout) checkout.addEventListener('click', function () {
      if (!cart.length) return;
      var note = $('[data-checkout-note]');
      if (note) { note.hidden = false; if (note.focus) note.focus(); }
      if (window.rbTrack) window.rbTrack('begin_checkout', { currency: 'USD', value: subtotal() });
    });
  }

  /* every Add to cart on any page routes through here */
  $$('[data-add]').forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      var label = $('span', btn) || btn;
      var was = label.textContent;
      addToCart(btn.getAttribute('data-add'), 1);
      btn.classList.add('added');
      label.textContent = 'Added';
      window.setTimeout(function () {
        label.textContent = was;
        btn.classList.remove('added');
      }, 1500);
    });
  });

  /* ==================================================================
     hero: tilt and hotspots
     ================================================================== */
  var tiltHost = $('[data-tilt]');
  if (tiltHost && !reduce && !coarse) {
    var tiltTarget = $('.tilt', tiltHost) || tiltHost;
    var tRaf = false, tx = 0, ty = 0;
    tiltHost.addEventListener('pointermove', function (e) {
      var r = tiltHost.getBoundingClientRect();
      tx = ((e.clientY - r.top) / r.height - 0.5) * -6;
      ty = ((e.clientX - r.left) / r.width - 0.5) * 8;
      if (tRaf) return;
      tRaf = true;
      raf(function () {
        tRaf = false;
        tiltTarget.classList.add('tracking');
        tiltTarget.style.setProperty('--rx', tx.toFixed(2) + 'deg');
        tiltTarget.style.setProperty('--ry', ty.toFixed(2) + 'deg');
      });
    });
    tiltHost.addEventListener('pointerleave', function () {
      tiltTarget.classList.remove('tracking');
      tiltTarget.style.setProperty('--rx', '0deg');
      tiltTarget.style.setProperty('--ry', '0deg');
    });
  }

  var spots = $$('.hs');
  if (spots.length) {
    var closeSpots = function (except) {
      spots.forEach(function (s) { if (s !== except) s.setAttribute('aria-expanded', 'false'); });
    };
    spots.forEach(function (s) {
      s.addEventListener('click', function (e) {
        e.stopPropagation();
        var open = s.getAttribute('aria-expanded') === 'true';
        closeSpots(s);
        s.setAttribute('aria-expanded', open ? 'false' : 'true');
      });
      s.addEventListener('mouseenter', function () { closeSpots(s); s.setAttribute('aria-expanded', 'true'); });
      s.addEventListener('mouseleave', function () { s.setAttribute('aria-expanded', 'false'); });
      s.addEventListener('focus', function () { closeSpots(s); s.setAttribute('aria-expanded', 'true'); });
      s.addEventListener('blur', function () { s.setAttribute('aria-expanded', 'false'); });
    });
    document.addEventListener('click', function () { closeSpots(null); });
  }

  /* ==================================================================
     modals
     ================================================================== */
  var modalRelease = null, openModalEl = null;
  function showModal(m) {
    if (!m) return;
    openModalEl = m;
    m.classList.add('on');
    m.removeAttribute('aria-hidden');
    lock();
    var f = $(FOCUSABLE, m);
    if (f) f.focus();
    modalRelease = trap(m, hideModal);
  }
  function hideModal() {
    if (!openModalEl) return;
    openModalEl.classList.remove('on');
    openModalEl.setAttribute('aria-hidden', 'true');
    openModalEl = null;
    unlock();
    if (modalRelease) { modalRelease(); modalRelease = null; }
  }
  $$('.modal').forEach(function (m) {
    m.addEventListener('click', function (e) { if (e.target === m) hideModal(); });
    $$('[data-modal-close]', m).forEach(function (b) { b.addEventListener('click', hideModal); });
  });
  $$('[data-modal-open]').forEach(function (b) {
    b.addEventListener('click', function (e) {
      e.preventDefault();
      e.stopPropagation();
      showModal($('#' + b.getAttribute('data-modal-open')));
    });
  });

  /* ==================================================================
     PDP gallery: views, zoom lens, lightbox
     ================================================================== */
  var plate = $('[data-plate]');
  var plateLabel = $('[data-plate-label]');
  var plateTabs = $$('[data-src]');
  if (plate && plateTabs.length) {
    /* preload the other views so switching never shows an empty stage */
    plateTabs.forEach(function (t) {
      var i = new Image();
      i.src = 'assets/img/' + t.getAttribute('data-src');
    });
    plateTabs.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var file = btn.getAttribute('data-src');
        var src = 'assets/img/' + file;
        var label = btn.getAttribute('data-label');
        /* tabs and thumbnails both carry data-src, so select by value, not node */
        plateTabs.forEach(function (t) {
          t.setAttribute('aria-selected', t.getAttribute('data-src') === file ? 'true' : 'false');
        });
        var alt = 'reboot Water Flosser, ' + label.toLowerCase();
        if (plateLabel) plateLabel.textContent = label;
        if (reduce) { plate.src = src; plate.alt = alt; return; }
        var st = plate.parentNode;
        st.classList.add('swap');
        window.setTimeout(function () {
          plate.src = src; plate.alt = alt;
          st.classList.remove('swap');
        }, 200);
      });
    });

    /* Zoom lens.
       It is laid over the ARTWORK, not the stage. The stage is nearly twice as
       wide as the photograph standing in it, so a lens sized to the stage had
       nowhere to pan to: the clamp pinned the magnified image to the left edge
       and it never moved, which read as a stretched, left-aligned preview.
       Sizing and positioning against the image's own box means the pointer
       lands on the same point of the product at 1x and at 2.4x. */
    var stage = plate.closest('.plate-stage');
    var lens = stage && $('.lens', stage);
    if (stage && lens && !coarse && !reduce) {
      var ZOOM = 2.4;
      var fitLens = function () {
        var s = stage.getBoundingClientRect(), i = plate.getBoundingClientRect();
        lens.style.left = (i.left - s.left) + 'px';
        lens.style.top = (i.top - s.top) + 'px';
        lens.style.width = i.width + 'px';
        lens.style.height = i.height + 'px';
        return i;
      };
      stage.addEventListener('pointerenter', function () {
        lens.style.backgroundImage = 'url("' + (plate.currentSrc || plate.src) + '")';
        fitLens();
        stage.classList.add('lensing');
      });
      stage.addEventListener('pointermove', function (e) {
        var i = fitLens();
        if (!i.width || !i.height) return;
        var zw = i.width * ZOOM, zh = i.height * ZOOM;
        lens.style.setProperty('--zw', zw + 'px');
        lens.style.setProperty('--zh', zh + 'px');
        /* the pointer as a fraction of the artwork, clamped to it, then the
           same fraction of the overhang — so the edges of the photograph are
           reachable and nothing past them ever is */
        var px = Math.min(1, Math.max(0, (e.clientX - i.left) / i.width));
        var py = Math.min(1, Math.max(0, (e.clientY - i.top) / i.height));
        lens.style.setProperty('--bx', (-(zw - i.width) * px) + 'px');
        lens.style.setProperty('--by', (-(zh - i.height) * py) + 'px');
      });
      stage.addEventListener('pointerleave', function () { stage.classList.remove('lensing'); });
    }

    var lb = $('#lightbox'), lbImg = lb && $('[data-lightbox-img]', lb);
    var showLightbox = function () {
      if (!lb || !lbImg) return;
      lbImg.src = plate.currentSrc || plate.src;
      lbImg.alt = plate.alt;
      showModal(lb);
    };
    if (stage) stage.addEventListener('click', showLightbox);
    var lbBtn = $('[data-lightbox-open]');
    if (lbBtn) lbBtn.addEventListener('click', function (e) { e.preventDefault(); showLightbox(); });
  }

  /* ---- swipe the gallery on touch ----
     Horizontal intent only, and only past a real threshold, so a diagonal
     scroll never steals the page's vertical gesture. */
  (function () {
    var stage = $('.plate-stage');
    if (!stage || !plateTabs.length) return;
    var x0 = 0, y0 = 0, tracking = false;
    stage.addEventListener('touchstart', function (e) {
      if (e.touches.length !== 1) return;
      x0 = e.touches[0].clientX; y0 = e.touches[0].clientY; tracking = true;
    }, { passive: true });
    stage.addEventListener('touchend', function (e) {
      if (!tracking) return;
      tracking = false;
      var t = e.changedTouches[0];
      var dx = t.clientX - x0, dy = t.clientY - y0;
      if (Math.abs(dx) < 45 || Math.abs(dx) < Math.abs(dy) * 1.6) return;
      var list = plateTabs.filter(function (b) { return b.closest('.plate-tabs'); });
      var i = list.findIndex(function (b) { return b.getAttribute('aria-selected') === 'true'; });
      if (i < 0) i = 0;
      var nxt = list[(i + (dx < 0 ? 1 : list.length - 1)) % list.length];
      if (nxt) nxt.click();
    }, { passive: true });
  })();

  /* ---- cursor halo over product plates ----
     Writes two percentages; the element never resizes, so this is one
     composite per frame and no layout at all. */
  if (!reduce && !coarse) {
    $$('.halo').forEach(function (el) {
      var pending = false, hx = 50, hy = 50;
      el.addEventListener('pointerenter', function () { el.classList.add('lit'); });
      el.addEventListener('pointerleave', function () { el.classList.remove('lit'); });
      el.addEventListener('pointermove', function (e) {
        var r = el.getBoundingClientRect();
        hx = ((e.clientX - r.left) / r.width) * 100;
        hy = ((e.clientY - r.top) / r.height) * 100;
        if (pending) return;
        pending = true;
        raf(function () {
          pending = false;
          el.style.setProperty('--hx', hx.toFixed(1) + '%');
          el.style.setProperty('--hy', hy.toFixed(1) + '%');
        });
      });
    });
  }

  /* colourway swatches, for when there is more than one to choose */
  var swatches = $$('[data-colour]');
  swatches.forEach(function (btn) {
    btn.addEventListener('click', function () {
      swatches.forEach(function (s) { s.setAttribute('aria-pressed', s === btn ? 'true' : 'false'); });
      $$('[data-colour-label]').forEach(function (l) { l.textContent = btn.getAttribute('data-name'); });
    });
  });

  /* ==================================================================
     CAD inspector
     Hovering a measurement lights the annotation that marks it on the drawing,
     and switches to the elevation that shows it. The annotations are our own
     overlay rather than paths inside the trace, because the traced CAD has no
     semantic structure to target.
     ================================================================== */
  var insp = $('[data-inspector]');
  if (insp) {
    let rows = $$('.insp-row', insp);
    let marks = $$('[data-mark]', insp);
    let els = $$('.insp-el', insp);
    var stageCap = $('[data-insp-cap]', insp);
    let light = function (key) {
      rows.forEach(function (r) { r.classList.toggle('on', !!key && r.getAttribute('data-spec') === key); });
      marks.forEach(function (m) { m.classList.toggle('on', !!key && m.getAttribute('data-mark') === key); });
      if (!key) return;
      var row = rows.filter(function (r) { return r.getAttribute('data-spec') === key; })[0];
      var view = row && row.getAttribute('data-view');
      if (!view) return;
      els.forEach(function (im) {
        var on = im.getAttribute('data-el') === view;
        im.classList.toggle('on', on);
        if (on) im.removeAttribute('aria-hidden'); else im.setAttribute('aria-hidden', 'true');
      });
      if (stageCap) stageCap.textContent = row.getAttribute('data-view-label') || '';
    };
    /* Hover previews, click pins. Without the pin a stray mouseenter — the page
       is still gliding after a click scrolls a row into view — silently
       overrides the choice the reader just made. */
    var pinned = null;
    rows.forEach(function (r) {
      var key = r.getAttribute('data-spec');
      r.addEventListener('mouseenter', function () { if (!pinned) light(key); });
      r.addEventListener('focus', function () { pinned = key; light(key); });
      r.addEventListener('click', function () { pinned = key; light(key); });
    });
    insp.addEventListener('mouseleave', function () { pinned = null; light(null); });
  }

  /* ==================================================================
     anatomy
     The manual's "get to know your flosser" page. Pins are placed as a
     percentage of the photograph rather than in pixels, so they stay on the
     part they name at every size. Taking a row lights its pin and the other
     way round; hover previews, click holds, which is the same contract the
     drawing inspector uses further down the page.
     ================================================================== */
  var anat = $('[data-anat]');
  if (anat) {
    /* `let`, and names of their own. Both this module and the drawing
       inspector below want to call their list of rows `rows`; `var` hoists to
       the enclosing function, so declaring it twice leaves one module reading
       the other's elements. */
    let anatPins = $$('.anat-pin', anat), anatRows = $$('.anat-row', anat);
    let markAnat = function (key) {
      anatPins.forEach(function (p) { p.classList.toggle('on', p.getAttribute('data-part') === key); });
      anatRows.forEach(function (r) { r.classList.toggle('on', r.getAttribute('data-part') === key); });
    };
    let heldAnat = null;
    anatPins.concat(anatRows).forEach(function (el) {
      var key = el.getAttribute('data-part');
      el.addEventListener('mouseenter', function () { if (!coarse) markAnat(key); });
      el.addEventListener('focus', function () { markAnat(key); });
      el.addEventListener('click', function () {
        heldAnat = heldAnat === key ? null : key;
        markAnat(heldAnat);
      });
    });
    anat.addEventListener('mouseleave', function () { markAnat(heldAnat); });
  }

  /* ==================================================================
     pressure simulator
     ================================================================== */
  var sim = $('[data-sim]');
  if (sim) {
    /* Named as the manual names them, in the order the mode button steps
       through them. The manual's own diagram uses a second set of labels
       (Pulse, Soft, Standard, Strong) for the same four positions; the table
       on that page is the one printed in words, so the table wins and the site
       says the same thing as the sheet in the box. */
    var MODES = {
      massage: { label: 'Massage', psi: '40–120', rate: 0.42, db: 4, loud: '~65 dB',
        who: 'Pulsating rather than steady. It clears debris from between the teeth while it works the gums, which is why it sits first on the button rather than last.' },
      soft: { label: 'Soft', psi: '40', rate: 1.4, db: 2, loud: '~58 dB',
        who: 'Gentle pressure, for sensitive gums and for anybody new to this. Where to start, and where to stay while your gums settle. Also the mode to use for the tongue scraper.' },
      normal: { label: 'Normal', psi: '70', rate: 0.95, db: 3, loud: '~65 dB',
        who: 'A steady stream for everyday cleaning. Most people end up here once the first fortnight is behind them, and stop thinking about it.' },
      clean: { label: 'Clean', psi: '120', rate: 0.6, db: 5, loud: '~65 dB',
        who: 'The strongest stream the pump gives, for tough stains and plaque. Useful around brackets, bridges and behind the last molar. No better for being stronger everywhere else.' }
    };
    /* the stop labels are the mode buttons; there is no second, hidden tablist */
    var simBtns = $$('[data-psi-stop]', sim);
    var psiOut = $('[data-sim-psi]', sim), whoOut = $('[data-sim-who]', sim);
    var jets = $$('.jet', sim), bars = $$('.db i', sim), dbOut = $('[data-sim-db]', sim);
    let setMode = function (key) {
      var m = MODES[key];
      if (!m) return;
      if (psiOut) psiOut.textContent = m.psi;
      if (whoOut) {
        whoOut.textContent = m.who;
        whoOut.classList.remove('match-swap'); void whoOut.offsetWidth; whoOut.classList.add('match-swap');
      }
      jets.forEach(function (j) { j.style.setProperty('--rate', m.rate + 's'); });
      bars.forEach(function (b, i) { b.classList.toggle('on', i < m.db); });
      if (dbOut) dbOut.textContent = m.loud;
    };
    /* The slider and the stop labels are two views of one value. A native
       range input carries arrow keys, Home/End and touch dragging already. */
    var ORDER = ['massage', 'soft', 'normal', 'clean'];
    var range = $('[data-psi-range]', sim);
    var stops = $$('[data-psi-stop]', sim);

    let syncControls = function (key) {
      var i = ORDER.indexOf(key);
      if (range) {
        range.value = i;
        range.style.setProperty('--fill', (i / (ORDER.length - 1) * 100) + '%');
        range.setAttribute('aria-valuetext', MODES[key].label + ', ' + MODES[key].psi + ' PSI');
      }
      stops.forEach(function (b) {
        b.setAttribute('aria-current', b.getAttribute('data-psi-stop') === key ? 'true' : 'false');
      });
    };
    /* named for its module. Both this and the review filter were called
       `apply`; `var` hoists to the enclosing function, so the reviews module
       overwrote this one and every press of a pressure stop ran the review
       filter instead. `let` below keeps them block-scoped from now on. */
    let applyMode = function (key) { setMode(key); syncControls(key); };

    if (range) {
      range.addEventListener('input', function () {
        applyMode(ORDER[Math.round(range.value)] || 'soft');
      });
    }
    stops.forEach(function (b) {
      b.addEventListener('click', function () { applyMode(b.getAttribute('data-psi-stop')); });
    });
    applyMode('soft');
  }

  /* ==================================================================
     diagnosis, and the setup it recommends
     Self-selection, not a filter. Every answer is already in the box; the
     choice only decides where the reader starts. Nothing is hidden behind it.
     ================================================================== */
  var diagTabs = $$('[data-case]').filter(function (t) { return t.tagName === 'BUTTON'; });
  var diagSets = $$('.diag-set');
  if (diagTabs.length && diagSets.length) {
    var matchTip = $('[data-match-tip]'), matchMode = $('[data-match-mode]'), matchNote = $('[data-match-note]');
    let pick = function (btn) {
      var key = btn.getAttribute('data-case');
      diagTabs.forEach(function (t) { t.setAttribute('aria-selected', t === btn ? 'true' : 'false'); });
      diagSets.forEach(function (set) { set.hidden = set.getAttribute('data-case') !== key; });
      var live = diagSets.filter(function (s) { return !s.hidden; })[0];
      if (!live || !matchTip) return;
      var cells = $$('.diag-cell b', live);
      var tip = cells[0] ? cells[0].textContent : '', mode = cells[1] ? cells[1].textContent : '';
      matchTip.textContent = tip;
      if (matchMode) matchMode.textContent = mode;
      if (matchNote) {
        matchNote.textContent = 'Fit the ' + tip.toLowerCase() + ' tip and start on ' +
          mode.toLowerCase() + '. Both are already in the box, so this only tells you where to begin.';
      }
      var card = $('[data-match]');
      if (card) { card.classList.remove('match-swap'); void card.offsetWidth; card.classList.add('match-swap'); }
    };
    diagTabs.forEach(function (btn) {
      btn.addEventListener('click', function () { pick(btn); });
      /* left/right arrows move between choices, as a tablist should */
      btn.addEventListener('keydown', function (e) {
        var i = diagTabs.indexOf(btn), n = null;
        if (e.key === 'ArrowRight') n = diagTabs[(i + 1) % diagTabs.length];
        if (e.key === 'ArrowLeft') n = diagTabs[(i - 1 + diagTabs.length) % diagTabs.length];
        if (n) { e.preventDefault(); n.focus(); n.click(); }
      });
    });
    var first = diagTabs.filter(function (t) { return t.getAttribute('aria-selected') === 'true'; })[0];
    if (first) pick(first);
  }

  /* ==================================================================
     reviews: filter, search, helpfulness
     ================================================================== */
  var revRoot = $('[data-reviews]');
  if (revRoot) {
    var cards = $$('.review', revRoot);
    var chips = $$('.chip', revRoot);
    var search = $('[data-rev-search]', revRoot);
    var counter = $('[data-rev-count]', revRoot);
    var none = $('[data-rev-none]', revRoot);
    var filter = 'all';
    let applyFilter = function () {
      var q = ((search && search.value) || '').trim().toLowerCase();
      var shown = 0;
      cards.forEach(function (c) {
        var stars = parseInt(c.getAttribute('data-stars'), 10);
        var topics = (c.getAttribute('data-topics') || '').split(/\s+/);
        var ok;
        if (filter === 'all') ok = true;
        else if (filter === 'critical') ok = stars <= 3;             /* the honest ones */
        else if (/^[1-5]$/.test(filter)) ok = stars === parseInt(filter, 10);
        else ok = topics.indexOf(filter) > -1;                        /* what it is about */
        if (ok && q) ok = c.textContent.toLowerCase().indexOf(q) > -1;
        c.hidden = !ok;
        if (ok) shown++;
      });
      if (counter) counter.textContent = shown + (shown === 1 ? ' review' : ' reviews') + ' shown';
      if (none) none.hidden = shown > 0;
    };
    chips.forEach(function (c) {
      c.addEventListener('click', function () {
        filter = c.getAttribute('data-filter');
        chips.forEach(function (x) { x.setAttribute('aria-pressed', x === c ? 'true' : 'false'); });
        applyFilter();
      });
    });
    if (search) {
      var st;
      search.addEventListener('input', function () {
        clearTimeout(st);
        st = setTimeout(function () {
          applyFilter();
          var q = search.value.trim();
          if (q.length > 2 && window.rbTrack) window.rbTrack('search', { search_term: q });
        }, 220);
      });
    }
    $$('[data-helpful]', revRoot).forEach(function (b) {
      b.addEventListener('click', function () {
        var on = b.getAttribute('aria-pressed') === 'true';
        var n = parseInt(b.getAttribute('data-helpful'), 10);
        b.setAttribute('aria-pressed', on ? 'false' : 'true');
        var out = $('[data-helpful-n]', b);
        if (out) out.textContent = on ? n : n + 1;
      });
    });
    applyFilter();
  }

  /* ==================================================================
     FAQ: animate the close as well as the open
     <details> drops its content from the box tree the moment open is removed,
     so a closing transition has to run while the element is still open.
     ================================================================== */
  $$('.faq details').forEach(function (d) {
    var sum = $('summary', d);
    var ans = $('.ans', d);
    if (!sum || !ans || reduce) return;
    sum.addEventListener('click', function (e) {
      if (!d.open) return;                        /* opening: let the browser do it */
      e.preventDefault();
      d.classList.add('closing');
      var done = function () {
        ans.removeEventListener('transitionend', done);
        clearTimeout(guard);
        d.classList.remove('closing');
        d.open = false;
      };
      var guard = setTimeout(done, 500);          /* if the transition never fires */
      ans.addEventListener('transitionend', done);
    });
  });

  /* ==================================================================
     sticky buy bar
     ================================================================== */
  var sticky = $('.stickybuy');
  var anchor = $('[data-buy-anchor]');
  if (sticky && anchor && 'IntersectionObserver' in window) {
    document.body.classList.add('has-sticky');
    new IntersectionObserver(function (es) {
      es.forEach(function (e) { sticky.classList.toggle('on', !e.isIntersecting); });
    }, { rootMargin: '-90px 0px 0px 0px' }).observe(anchor);
  }

  /* ==================================================================
     forms
     Validation, a busy state, then a success card. Nothing is sent anywhere,
     and the success copy says so rather than implying an email is on its way.
     ================================================================== */
  var EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  $$('form[data-demo]').forEach(function (f) {
    var input = $('input[type=email]', f);
    var err = $('[data-nl-err]', f);
    if (input) {
      input.addEventListener('input', function () {
        if (input.getAttribute('aria-invalid') !== 'true') return;
        if (EMAIL.test(input.value.trim())) {
          input.setAttribute('aria-invalid', 'false');
          if (err) err.hidden = true;
        }
      });
    }
    f.addEventListener('submit', function (e) {
      e.preventDefault();
      if (input) {
        if (!EMAIL.test(input.value.trim())) {
          input.setAttribute('aria-invalid', 'true');
          if (err) { err.hidden = false; err.textContent = 'That does not look like an email address.'; }
          input.focus();
          return;
        }
        input.setAttribute('aria-invalid', 'false');
        if (err) err.hidden = true;
      }
      f.classList.add('busy');
      var btn = $('button', f);
      if (btn) btn.disabled = true;
      window.setTimeout(function () {
        f.classList.remove('busy');
        if (btn) btn.disabled = false;
        var note = $('[data-demo-note]', f);
        if (note) { note.hidden = false; if (note.focus) note.focus(); }
        if (window.rbTrack) window.rbTrack('sign_up', { method: 'email' });
      }, 700);
    });
  });
})();
