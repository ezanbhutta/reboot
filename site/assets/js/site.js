/* reboot — storefront prototype. Transform/opacity only; nothing that forces layout. */
(function () {
  'use strict';
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* scroll reveal */
  var rv = document.querySelectorAll('.rv');
  if (reduce || !('IntersectionObserver' in window)) {
    rv.forEach(function (el) { el.classList.add('in'); });
  } else {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.06 });
    rv.forEach(function (el) { io.observe(el); });
  }

  /* mobile nav */
  var burger = document.querySelector('.burger'), nav = document.querySelector('.nav');
  if (burger && nav) {
    burger.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }

  /* colourway + gallery */
  var stage = document.querySelector('[data-stage]');
  var thumbs = document.querySelectorAll('[data-thumb]');
  var swatches = document.querySelectorAll('[data-colour]');
  var colour = 'black';

  function setThumbState(btn) {
    thumbs.forEach(function (t) { t.setAttribute('aria-selected', t === btn ? 'true' : 'false'); });
  }
  function swapStage(src, alt) {
    if (!stage) return;
    if (reduce) { stage.src = src; if (alt) stage.alt = alt; return; }
    stage.style.transition = 'opacity .18s ease';
    stage.style.opacity = '0';
    window.setTimeout(function () {
      stage.src = src; if (alt) stage.alt = alt;
      stage.style.opacity = '1';
    }, 170);
  }

  thumbs.forEach(function (btn) {
    btn.addEventListener('click', function () {
      setThumbState(btn);
      swapStage(btn.getAttribute('data-thumb'), btn.getAttribute('data-alt'));
    });
  });

  swatches.forEach(function (btn) {
    btn.addEventListener('click', function () {
      colour = btn.getAttribute('data-colour');
      swatches.forEach(function (s) { s.setAttribute('aria-pressed', s === btn ? 'true' : 'false'); });
      var label = document.querySelector('[data-colour-label]');
      if (label) label.textContent = btn.getAttribute('data-name');
      // colour-linked media: reset gallery to that colourway's lead image
      var lead = document.querySelector('[data-lead-' + colour + ']');
      if (lead) {
        var src = lead.getAttribute('data-lead-' + colour);
        swapStage(src, 'reboot Water Flosser, ' + btn.getAttribute('data-name') + ', front view');
        if (thumbs.length) setThumbState(thumbs[0]);
      }
    });
  });

  /* sticky mobile buy bar */
  var sticky = document.querySelector('.stickybuy');
  var anchor = document.querySelector('[data-buy-anchor]');
  if (sticky && anchor && 'IntersectionObserver' in window) {
    document.body.classList.add('has-sticky');
    new IntersectionObserver(function (es) {
      es.forEach(function (e) { sticky.classList.toggle('on', !e.isIntersecting); });
    }, { rootMargin: '-90px 0px 0px 0px' }).observe(anchor);
  }

  /* prototype forms: no backend */
  document.querySelectorAll('form[data-demo]').forEach(function (f) {
    f.addEventListener('submit', function (e) {
      e.preventDefault();
      var note = f.querySelector('[data-demo-note]');
      if (note) { note.hidden = false; note.focus && note.focus(); }
    });
  });
})();
