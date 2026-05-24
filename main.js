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

  // --- footer year ---
  var y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();
})();
