/**
 * a11y.js — Painel de acessibilidade
 * Funcionalidades: tamanho de fonte, reducao de movimento
 * Persiste preferencias em localStorage
 * WCAG 2.2 Level AA compliant
 */
(function A11y() {
  'use strict';

  const STORAGE_KEY = 'ef-a11y';
  const FONT_SIZES  = ['normal', 'large', 'xlarge'];
  const FONT_VALUES = { normal: '16px', large: '19px', xlarge: '22px' };

  /* ── Estado inicial ──────────────────────────────── */
  let prefs = { fontSize: 'normal', reduceMotion: false };

  function loadPrefs() {
    try {
      const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
      if (FONT_SIZES.includes(stored.fontSize)) prefs.fontSize = stored.fontSize;
      if (typeof stored.reduceMotion === 'boolean') prefs.reduceMotion = stored.reduceMotion;
    } catch (_) {}

    // Respeitar preferencia do sistema operacional
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      prefs.reduceMotion = true;
    }
  }

  function savePrefs() {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs)); } catch (_) {}
  }

  /* ── Font size ───────────────────────────────────── */
  function applyFontSize(size) {
    if (!FONT_SIZES.includes(size)) size = 'normal';
    prefs.fontSize = size;
    document.documentElement.style.fontSize = FONT_VALUES[size];

    // Atualizar botoes
    document.querySelectorAll('.font-size-btn').forEach(btn => {
      const isActive = btn.getAttribute('data-size') === size;
      btn.classList.toggle('active', isActive);
      btn.setAttribute('aria-pressed', String(isActive));
    });

    savePrefs();
  }

  /* ── Reduce motion ───────────────────────────────── */
  function applyMotion(reduce) {
    prefs.reduceMotion = reduce;

    if (reduce) {
      document.documentElement.setAttribute('data-reduce-motion', 'true');
    } else {
      document.documentElement.removeAttribute('data-reduce-motion');
    }

    // Sincronizar toggle
    const toggle = document.getElementById('a11y-motion-toggle');
    if (toggle) toggle.checked = reduce;

    savePrefs();
  }

  /* ── Painel ──────────────────────────────────────── */
  function initPanel() {
    const trigger = document.getElementById('a11y-trigger');
    const panel   = document.getElementById('a11y-panel');
    if (!trigger || !panel) return;

    let isOpen = false;

    function openPanel() {
      isOpen = true;
      panel.classList.add('open');
      trigger.setAttribute('aria-expanded', 'true');
      // Mover foco para dentro do painel (WCAG 2.4.3)
      const firstFocusable = panel.querySelector('button, input, [tabindex]');
      if (firstFocusable) firstFocusable.focus();
    }

    function closePanel() {
      isOpen = false;
      panel.classList.remove('open');
      trigger.setAttribute('aria-expanded', 'false');
      trigger.focus(); // Devolver foco ao trigger (WCAG 2.4.3)
    }

    trigger.addEventListener('click', () => isOpen ? closePanel() : openPanel());

    // Fechar com Escape (WCAG SC 2.1.2)
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && isOpen) closePanel();
    });

    // Fechar ao clicar fora (click outside)
    document.addEventListener('pointerdown', (e) => {
      if (isOpen && !panel.contains(e.target) && !trigger.contains(e.target)) {
        closePanel();
      }
    });

    // Armadilha de foco dentro do painel (WCAG SC 2.1.2)
    panel.addEventListener('keydown', (e) => {
      if (e.key !== 'Tab') return;
      const focusable = Array.from(panel.querySelectorAll('button, input, [tabindex="0"]'))
        .filter(el => !el.disabled);
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last  = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    });
  }

  /* ── Eventos dos controles ───────────────────────── */
  function bindControls() {
    // Font size buttons
    document.querySelectorAll('.font-size-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        applyFontSize(btn.getAttribute('data-size'));
      });
    });

    // Motion toggle
    const motionToggle = document.getElementById('a11y-motion-toggle');
    if (motionToggle) {
      motionToggle.addEventListener('change', () => {
        applyMotion(motionToggle.checked);
      });
    }
  }

  /* ── CSS para data-reduce-motion ─────────────────── */
  function injectMotionCSS() {
    const style = document.createElement('style');
    style.textContent = `
      [data-reduce-motion="true"] *,
      [data-reduce-motion="true"] *::before,
      [data-reduce-motion="true"] *::after {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
        scroll-behavior: auto !important;
      }
    `;
    document.head.appendChild(style);
  }

  /* ── Init ────────────────────────────────────────── */
  function init() {
    injectMotionCSS();
    loadPrefs();
    initPanel();
    bindControls();

    // Aplicar prefs carregadas
    applyFontSize(prefs.fontSize);
    applyMotion(prefs.reduceMotion);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // API publica minima
  window.a11y = { applyFontSize, applyMotion };

})();
