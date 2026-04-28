(function () {
  'use strict';

  // -----------------------------
  // Theme toggle
  // -----------------------------
  var root = document.documentElement;
  var themeBtn = document.getElementById('theme-toggle');
  if (themeBtn) {
    themeBtn.addEventListener('click', function () {
      var current = root.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
      var next = current === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      try { localStorage.setItem('theme', next); } catch (e) {}
    });
  }

  // -----------------------------
  // Mobile menu
  // -----------------------------
  var menuBtn = document.getElementById('menu-toggle');
  var mobileMenu = document.getElementById('mobile-menu');
  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', function () {
      var open = mobileMenu.classList.toggle('open');
      mobileMenu.hidden = !open;
      menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }

  // -----------------------------
  // Search panel
  // -----------------------------
  var searchBtn = document.getElementById('search-toggle');
  var searchPanel = document.getElementById('search-panel');
  var searchClose = document.getElementById('search-close');
  var searchInput = document.getElementById('lunr-input');

  function openSearch() {
    if (!searchPanel) return;
    searchPanel.hidden = false;
    if (searchInput) setTimeout(function () { searchInput.focus(); }, 50);
  }
  function closeSearch() {
    if (!searchPanel) return;
    searchPanel.hidden = true;
  }
  if (searchBtn) searchBtn.addEventListener('click', openSearch);
  if (searchClose) searchClose.addEventListener('click', closeSearch);
  document.addEventListener('keydown', function (e) {
    if (e.key === '/' && document.activeElement && document.activeElement.tagName !== 'INPUT' && document.activeElement.tagName !== 'TEXTAREA') {
      e.preventDefault();
      openSearch();
    } else if (e.key === 'Escape' && searchPanel && !searchPanel.hidden) {
      closeSearch();
    }
  });

  // -----------------------------
  // Reading progress on post pages
  // -----------------------------
  var progressEl = document.getElementById('reading-progress');
  if (progressEl) {
    var update = function () {
      var doc = document.documentElement;
      var scrollTop = window.scrollY || doc.scrollTop;
      var height = doc.scrollHeight - doc.clientHeight;
      var pct = height > 0 ? (scrollTop / height) * 100 : 0;
      progressEl.style.width = pct + '%';
    };
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    update();
  }

  // -----------------------------
  // Disqus lazy load on click
  // -----------------------------
  document.querySelectorAll('.show-comments').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var c = document.getElementById('comments');
      if (c) c.style.display = 'block';
      btn.style.display = 'none';
    });
  });

  // -----------------------------
  // Smooth scroll for in-page anchors
  // -----------------------------
  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener('click', function (e) {
      var href = link.getAttribute('href');
      if (href.length <= 1) return;
      var target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
})();
