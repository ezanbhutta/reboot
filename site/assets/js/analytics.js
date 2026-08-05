/* reboot — GA4 and Meta Pixel.
   SRS §6 requires both installed. They are installed here and wired to the
   events the store actually needs, but they stay dormant until real IDs are
   filled in below, so the prototype cannot send traffic to anyone's property
   by accident. Put the IDs in and both go live with no other change.

   On Shopify this file becomes a snippet included from theme.liquid, and the
   two IDs come from theme settings rather than being edited here. */
(function () {
  'use strict';

  var CONFIG = {
    ga4: '',        /* e.g. 'G-XXXXXXXXXX'  — GA4 Measurement ID */
    pixel: ''       /* e.g. '123456789012345' — Meta Pixel ID    */
  };

  /* Do Not Track and Global Privacy Control are honoured before anything loads.
     A store that argues for honesty should not quietly ignore these. */
  var optedOut = navigator.doNotTrack === '1' || window.doNotTrack === '1' ||
                 navigator.globalPrivacyControl === true;

  var live = { ga4: false, pixel: false };

  function script(src) {
    var s = document.createElement('script');
    s.async = true; s.src = src;
    document.head.appendChild(s);
    return s;
  }

  /* ---------- GA4 ---------- */
  window.dataLayer = window.dataLayer || [];
  function gtag() { window.dataLayer.push(arguments); }
  window.gtag = gtag;

  if (CONFIG.ga4 && !optedOut) {
    script('https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(CONFIG.ga4));
    gtag('js', new Date());
    /* anonymise_ip is the default in GA4; stated here so the intent is on record */
    gtag('config', CONFIG.ga4, { anonymize_ip: true });
    live.ga4 = true;
  }

  /* ---------- Meta Pixel ---------- */
  if (CONFIG.pixel && !optedOut) {
    /* Meta's stub, rewritten readably. It queues calls until the SDK arrives. */
    var fbq = window.fbq = window.fbq || function () {
      fbq.callMethod ? fbq.callMethod.apply(fbq, arguments) : fbq.queue.push(arguments);
    };
    window._fbq = window._fbq || fbq;
    fbq.push = fbq; fbq.loaded = true; fbq.version = '2.0'; fbq.queue = [];
    script('https://connect.facebook.net/en_US/fbevents.js');
    fbq('init', CONFIG.pixel);
    fbq('track', 'PageView');
    live.pixel = true;
  }

  /* ---------- one call site for both ----------
     Everything the store reports goes through track(). If an ID is missing the
     call is simply dropped, so page code never has to check. */
  function track(name, params) {
    params = params || {};
    if (live.ga4) gtag('event', name, params);
    if (live.pixel && META[name]) window.fbq('track', META[name], params);
  }
  var META = {
    view_item: 'ViewContent',
    add_to_cart: 'AddToCart',
    begin_checkout: 'InitiateCheckout',
    sign_up: 'Lead',
    search: 'Search'
  };
  window.rbTrack = track;

  /* ---------- wire the events this store has ---------- */
  document.addEventListener('DOMContentLoaded', function () {
    var item = document.querySelector('[data-track-item]');
    if (item) {
      track('view_item', {
        currency: 'USD',
        value: parseFloat(item.getAttribute('data-price')) || undefined,
        items: [{ item_id: item.getAttribute('data-sku'),
                  item_name: item.getAttribute('data-track-item') }]
      });
    }

    document.querySelectorAll('[data-track-add]').forEach(function (el) {
      el.addEventListener('click', function () {
        track('add_to_cart', {
          currency: 'USD',
          value: parseFloat(el.getAttribute('data-price')) || undefined,
          items: [{ item_id: el.getAttribute('data-sku'),
                    item_name: el.getAttribute('data-track-add') }]
        });
      });
    });

    document.querySelectorAll('form[data-demo]').forEach(function (f) {
      f.addEventListener('submit', function () { track('sign_up', { method: 'email' }); });
    });
  });
})();
