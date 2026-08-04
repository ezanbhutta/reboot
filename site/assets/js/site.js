/* reboot storefront. Transform and opacity only; nothing that forces layout. */
(function () {
  'use strict';
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var raf = window.requestAnimationFrame || function (f) { return setTimeout(f, 16); };

  /* ---------- scroll reveal ---------- */
  var rv = document.querySelectorAll('.rv');
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

  /* ---------- mobile nav ---------- */
  var burger = document.querySelector('.burger'), nav = document.querySelector('.nav');
  if (burger && nav) {
    burger.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }

  /* ---------- scroll progress ---------- */
  var prog = document.querySelector('[data-prog]');

  var ticking = false;
  function onScroll() {
    if (ticking) return;
    ticking = true;
    raf(function () {
      ticking = false;

      if (prog) {
        var h = document.documentElement.scrollHeight - window.innerHeight;
        prog.style.width = (h > 0 ? (window.pageYOffset / h) * 100 : 0) + '%';
      }

    });
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll, { passive: true });
  onScroll();

  /* ---------- colourway ---------- */
  var swatches = document.querySelectorAll('[data-colour]');
  swatches.forEach(function (btn) {
    btn.addEventListener('click', function () {
      swatches.forEach(function (s) { s.setAttribute('aria-pressed', s === btn ? 'true' : 'false'); });
      document.querySelectorAll('[data-colour-label]').forEach(function (l) {
        l.textContent = btn.getAttribute('data-name');
      });
    });
  });


  /* ---------- sticky buy bar ---------- */
  var sticky = document.querySelector('.stickybuy');
  var anchor = document.querySelector('[data-buy-anchor]');
  if (sticky && anchor && 'IntersectionObserver' in window) {
    document.body.classList.add('has-sticky');
    new IntersectionObserver(function (es) {
      es.forEach(function (e) { sticky.classList.toggle('on', !e.isIntersecting); });
    }, { rootMargin: '-90px 0px 0px 0px' }).observe(anchor);
  }

  /* ---------- prototype forms ---------- */
  document.querySelectorAll('form[data-demo]').forEach(function (f) {
    f.addEventListener('submit', function (e) {
      e.preventDefault();
      var note = f.querySelector('[data-demo-note]');
      if (note) { note.hidden = false; if (note.focus) note.focus(); }
    });
  });
})();
