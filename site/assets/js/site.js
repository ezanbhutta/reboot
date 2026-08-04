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

  /* ---------- turntable ---------- */
  var turn = document.querySelector('[data-turn]');
  var turnImg = document.querySelector('[data-turn-img]');
  var turnDeg = document.querySelector('[data-turn-deg]');
  var FRAMES = 24, frames = [], loaded = false, lastFrame = -1;

  function pad(n) { return (n < 10 ? '0' : '') + n; }

  function preload() {
    if (loaded) return; loaded = true;
    for (var i = 0; i < FRAMES; i++) {
      var im = new Image();
      im.src = 'assets/img/turn/t' + pad(i) + '.webp';
      frames.push(im);
    }
  }
  if (turnImg) {
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (es, o) {
        es.forEach(function (e) { if (e.isIntersecting) { preload(); o.disconnect(); } });
      }, { rootMargin: '600px' }).observe(turn);
    } else { preload(); }
  }

  function setFrame(p) {
    var i = Math.min(FRAMES - 1, Math.max(0, Math.round(p * (FRAMES - 1))));
    if (i === lastFrame) return;
    lastFrame = i;
    turnImg.src = 'assets/img/turn/t' + pad(i) + '.webp';
    if (turnDeg) turnDeg.textContent = Math.round(i * (360 / FRAMES));
  }

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

      if (turnImg && turn && !reduce) {
        var track = turn.querySelector('.turn-track');
        var r = track.getBoundingClientRect();
        var span = r.height - window.innerHeight;
        if (span > 0) {
          var p = (-r.top) / span;
          if (p >= -0.05 && p <= 1.05) setFrame(Math.min(1, Math.max(0, p)));
        }
      }
    });
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll, { passive: true });
  onScroll();

  /* ---------- product gallery ---------- */
  var stage = document.querySelector('[data-stage]');
  var thumbs = document.querySelectorAll('[data-thumb]');
  var swatches = document.querySelectorAll('[data-colour]');

  function markThumb(btn) {
    thumbs.forEach(function (t) { t.setAttribute('aria-selected', t === btn ? 'true' : 'false'); });
  }
  function swapStage(src, alt) {
    if (!stage) return;
    if (reduce) { stage.src = src; if (alt) stage.alt = alt; return; }
    stage.style.opacity = '0';
    window.setTimeout(function () {
      stage.src = src; if (alt) stage.alt = alt; stage.style.opacity = '1';
    }, 170);
  }
  thumbs.forEach(function (btn) {
    btn.addEventListener('click', function () {
      markThumb(btn);
      swapStage(btn.getAttribute('data-thumb'), btn.getAttribute('data-alt'));
    });
  });
  swatches.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var colour = btn.getAttribute('data-colour');
      swatches.forEach(function (s) { s.setAttribute('aria-pressed', s === btn ? 'true' : 'false'); });
      document.querySelectorAll('[data-colour-label]').forEach(function (l) {
        l.textContent = btn.getAttribute('data-name');
      });
      var lead = document.querySelector('[data-lead-' + colour + ']');
      if (lead) {
        swapStage(lead.getAttribute('data-lead-' + colour),
                  'reboot Water Flosser, ' + btn.getAttribute('data-name') + ', front view');
        if (thumbs.length) markThumb(thumbs[0]);
      }
    });
  });


  /* ---------- drag-to-rotate gallery ---------- */
  var spin = document.querySelector('[data-spin]');
  if (spin) {
    var sImg = spin.querySelector('img');
    var sDeg = spin.querySelector('[data-spin-deg]');
    var sBar = spin.querySelector('.spin-track b');
    var N = 24, idx = 0, dragging = false, startX = 0, startIdx = 0, ready = false;

    function pad2(n){ return (n < 10 ? '0' : '') + n; }
    function paint(i) {
      idx = ((i % N) + N) % N;
      sImg.src = 'assets/img/turn/t' + pad2(idx) + '.webp';
      var deg = Math.round(idx * (360 / N));
      if (sDeg) sDeg.textContent = deg + '\u00B0';
      if (sBar) sBar.style.width = ((idx / (N - 1)) * 100) + '%';
      spin.setAttribute('aria-valuenow', deg);
      spin.setAttribute('aria-valuetext', deg + ' degrees');
    }
    // preload the sequence, then drop the loading bar
    var got = 0;
    for (var i = 0; i < N; i++) {
      var im = new Image();
      im.onload = im.onerror = function () {
        if (++got === N && !ready) { ready = true; spin.classList.add('is-ready'); }
      };
      im.src = 'assets/img/turn/t' + pad2(i) + '.webp';
    }
    window.setTimeout(function(){ if(!ready){ ready = true; spin.classList.add('is-ready'); } }, 4000);

    spin.addEventListener('pointerdown', function (e) {
      dragging = true; startX = e.clientX; startIdx = idx;
      spin.classList.add('touched');
      if (spin.setPointerCapture) spin.setPointerCapture(e.pointerId);
    });
    spin.addEventListener('pointermove', function (e) {
      if (!dragging) return;
      var dx = e.clientX - startX;
      paint(startIdx + Math.round(dx / 14));
    });
    ['pointerup','pointercancel','pointerleave'].forEach(function (ev) {
      spin.addEventListener(ev, function () { dragging = false; });
    });
    spin.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowRight') { paint(idx + 1); spin.classList.add('touched'); e.preventDefault(); }
      if (e.key === 'ArrowLeft')  { paint(idx - 1); spin.classList.add('touched'); e.preventDefault(); }
    });
    paint(0);
  }

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
