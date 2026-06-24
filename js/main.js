/* VellumGuard — site interactions */
(function () {
  'use strict';

  // --- mobile nav toggle ---
  var toggle = document.querySelector('.nav-toggle');
  var links = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', function () {
      links.classList.toggle('open');
    });
    links.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () { links.classList.remove('open'); });
    });
  }

  // --- scroll reveal ---
  var revealEls = document.querySelectorAll('.reveal');
  function showAll() {
    revealEls.forEach(function (el) { el.classList.add('in'); });
  }
  if ('IntersectionObserver' in window && revealEls.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -8% 0px' });
    revealEls.forEach(function (el) { io.observe(el); });
    // Unconditional safety net: regardless of load timing or capture
    // contexts, ensure nothing stays invisible.
    setTimeout(showAll, 3000);
  } else {
    showAll();
  }

  // --- request access forms (mailto) ---
  document.querySelectorAll('.cta-form').forEach(function (form) {
    form.addEventListener('submit', function (event) {
      event.preventDefault();
      var input  = form.querySelector('input[type="email"]');
      var errEl  = form.querySelector('.cta-err');
      var msgEl  = form.querySelector('.cta-msg');
      var email  = (input.value || '').trim();

      // Basic validation: non-empty, has @, has a dot after @
      var atIdx = email.indexOf('@');
      var valid = atIdx > 0 && email.indexOf('.', atIdx + 1) > atIdx + 1;

      if (!valid) {
        if (errEl) { errEl.hidden = false; }
        input.focus();
        return;
      }
      if (errEl) { errEl.hidden = true; }

      var subject = 'VellumGuard design partner access request';
      var body = [
        'Hello VellumGuard team,',
        '',
        'I am interested in design partner access.',
        '',
        'Email:',
        email,
        '',
        'Company:',
        '(please add your company name)',
        '',
        'Use case:',
        '(please add a short note about what you are building)'
      ].join('\n');

      window.location.href =
        'mailto:beta@vellumguard.com' +
        '?subject=' + encodeURIComponent(subject) +
        '&body='    + encodeURIComponent(body);

      if (msgEl) { msgEl.hidden = false; }
      setTimeout(function () { input.value = ''; }, 400);
    });
  });

  // --- footer year ---
  var y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();
})();
