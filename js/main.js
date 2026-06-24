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

  // --- request access forms (Formspree) ---
  document.querySelectorAll('.cta-form').forEach(function (form) {
    form.addEventListener('submit', function (event) {
      event.preventDefault();

      var emailInput = form.querySelector('input[type="email"]');
      var errEl      = form.querySelector('.cta-err');
      var msgEl      = form.querySelector('.cta-msg');
      var failEl     = form.querySelector('.cta-fail');
      var submitBtn  = form.querySelector('button[type="submit"]');

      // Validate: non-empty, has @, has a dot after @
      var email = emailInput ? emailInput.value.trim() : '';
      var atIdx = email.indexOf('@');
      var valid = atIdx > 0 && email.indexOf('.', atIdx + 1) > atIdx + 1;

      if (!valid) {
        if (errEl)  { errEl.hidden  = false; }
        if (msgEl)  { msgEl.hidden  = true;  }
        if (failEl) { failEl.hidden = true;  }
        if (emailInput) { emailInput.focus(); }
        return;
      }
      if (errEl) { errEl.hidden = true; }

      // Disable button while submitting
      var origHTML = submitBtn ? submitBtn.innerHTML : '';
      if (submitBtn) { submitBtn.disabled = true; submitBtn.innerHTML = 'Sending\u2026'; }

      fetch('https://formspree.io/f/mlgygonp', {
        method:  'POST',
        body:    new FormData(form),
        headers: { 'Accept': 'application/json' }
      })
      .then(function (res) {
        if (res.ok) {
          if (msgEl)  { msgEl.hidden  = false; }
          if (failEl) { failEl.hidden = true;  }
          form.reset();
        } else {
          if (failEl) { failEl.hidden = false; }
          if (msgEl)  { msgEl.hidden  = true;  }
        }
      })
      .catch(function () {
        if (failEl) { failEl.hidden = false; }
        if (msgEl)  { msgEl.hidden  = true;  }
      })
      .finally(function () {
        if (submitBtn) { submitBtn.disabled = false; submitBtn.innerHTML = origHTML; }
      });
    });
  });

  // --- footer year ---
  var y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();
})();
