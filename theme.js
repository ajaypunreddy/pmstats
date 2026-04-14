/* ═══════════════════════════════════════════════════════════════
   BrainzBytes — Theme Toggle + Scroll Animations + Interactions
   ═══════════════════════════════════════════════════════════════ */
(function() {
  'use strict';

  // ── Theme Toggle ──────────────────────────────────────────
  var THEMES = ['midnight', 'light', 'neon'];
  var ICONS = { midnight: '🌙', light: '☀️', neon: '⚡' };
  var saved = localStorage.getItem('bb_theme');
  var current = THEMES.indexOf(saved) >= 0 ? saved : 'midnight';
  document.documentElement.setAttribute('data-theme', current);

  function setTheme(t) {
    current = t;
    document.documentElement.setAttribute('data-theme', t);
    localStorage.setItem('bb_theme', t);
    // Update toggle buttons
    document.querySelectorAll('.theme-btn').forEach(function(btn) {
      btn.classList.toggle('active', btn.dataset.theme === t);
    });
  }

  // Create toggle UI on DOMContentLoaded
  document.addEventListener('DOMContentLoaded', function() {
    var toggle = document.createElement('div');
    toggle.className = 'theme-toggle';
    toggle.setAttribute('aria-label', 'Theme switcher');
    THEMES.forEach(function(t) {
      var btn = document.createElement('button');
      btn.className = 'theme-btn' + (t === current ? ' active' : '');
      btn.dataset.theme = t;
      btn.innerHTML = ICONS[t];
      btn.title = t.charAt(0).toUpperCase() + t.slice(1) + ' theme';
      btn.addEventListener('click', function() { setTheme(t); });
      toggle.appendChild(btn);
    });
    document.body.appendChild(toggle);

    // ── Scroll Reveal Animations ─────────────────────────────
    var reveals = document.querySelectorAll('.reveal, .reveal-left, .reveal-scale');
    if (reveals.length && 'IntersectionObserver' in window) {
      var observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
      reveals.forEach(function(el) { observer.observe(el); });
    } else {
      // Fallback: show everything
      reveals.forEach(function(el) { el.classList.add('revealed'); });
    }

    // ── Stagger children ─────────────────────────────────────
    document.querySelectorAll('.stagger').forEach(function(parent) {
      Array.from(parent.children).forEach(function(child, i) {
        child.style.setProperty('--i', i);
      });
    });

    // ── Smooth anchor scroll ─────────────────────────────────
    document.querySelectorAll('a[href^="#"]').forEach(function(a) {
      a.addEventListener('click', function(e) {
        var target = document.querySelector(a.getAttribute('href'));
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });
  });
})();
