/**
 * ux-validator.js — Nielsen Heuristics Runtime Validator
 * Portfolio Everson Filipe · Dev Mode Only
 * Executa apenas em localhost. Sem impacto em producao.
 */
(function UXValidator() {
  'use strict';

  const isDev = location.hostname === 'localhost' || location.hostname === '127.0.0.1';
  if (!isDev) return;

  const results = { critical: [], warning: [], info: [], passed: [] };

  const fail = (h, id, msg) => results.critical.push({ heuristic: h, id, message: msg });
  const warn = (h, id, msg) => results.warning.push({ heuristic: h, id, message: msg });
  const info = (h, id, msg) => results.info.push({ heuristic: h, id, message: msg });
  const pass = (id) => results.passed.push(id);

  function checkH1() {
    const focusable = document.querySelectorAll('a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])');
    let issues = 0;
    focusable.forEach(el => {
      const s = getComputedStyle(el);
      if (s.outlineStyle === 'none' && s.outlineWidth === '0px') issues++;
    });
    issues > 0 ? warn('H1', 'focus-visible', `${issues} focusable elements without visible outline.`) : pass('H1-focus');
  }

  function checkH2() {
    const inputs = document.querySelectorAll('form input, form textarea');
    inputs.forEach(input => {
      const label = input.id ? document.querySelector(`label[for="${input.id}"]`) : null;
      if (!label && !input.getAttribute('aria-label')) {
        fail('H2', 'form-label', `Input without label: id="${input.id}"`);
      }
    });
    pass('H2-done');
  }

  function checkH3() {
    const skip = document.querySelector('.skip-link, a[href="#main"], a[href="#content"]');
    skip ? pass('H3-skip') : warn('H3', 'skip-link', 'Skip-to-content link missing.');

    let hasRM = false;
    Array.from(document.styleSheets).forEach(sheet => {
      try {
        Array.from(sheet.cssRules || []).forEach(rule => {
          if (rule.conditionText && rule.conditionText.includes('prefers-reduced-motion')) hasRM = true;
        });
      } catch (_) {}
    });
    hasRM ? pass('H3-reduced-motion') : fail('H3', 'reduced-motion', '@media prefers-reduced-motion not found.');
  }

  function checkH4() {
    document.querySelectorAll('[style]').forEach(el => {
      if (/color\s*:\s*#[0-9a-f]{3,6}/i.test(el.getAttribute('style') || '')) {
        warn('H4', 'hardcoded-color', `Hardcoded color found inline on: ${el.tagName.toLowerCase()}`);
      }
    });

    const root = getComputedStyle(document.documentElement);
    ['--color-bg-base', '--color-text-primary', '--color-accent-electric', '--font-primary'].forEach(t => {
      root.getPropertyValue(t).trim() ? pass(`H4-${t}`) : fail('H4', 'missing-token', `Token missing: ${t}`);
    });
  }

  function checkH5() {
    document.querySelectorAll('a[target="_blank"]').forEach(a => {
      if (!a.rel.includes('noopener')) {
        warn('H5', 'noopener', `External link without rel="noopener": ${a.href}`);
      }
    });
    pass('H5-done');
  }

  function checkH6() {
    const nav = document.querySelector('nav');
    nav ? pass('H6-nav') : fail('H6', 'nav-missing', '<nav> element not found.');

    document.querySelectorAll('svg').forEach(icon => {
      if (!icon.getAttribute('aria-label') && icon.getAttribute('aria-hidden') !== 'true' && !icon.querySelector('title')) {
        warn('H6', 'icon-label', 'SVG icon without aria-label or aria-hidden="true".');
      }
    });
  }

  function checkH7() {
    document.documentElement.getAttribute('lang') ? pass('H7-lang') : fail('H7', 'html-lang', '<html> missing lang attribute.');
    document.querySelector('meta[name="viewport"]') ? pass('H7-viewport') : fail('H7', 'viewport', 'Meta viewport missing.');
  }

  function checkH8() {
    const h1s = document.querySelectorAll('h1');
    if (h1s.length === 0) fail('H8', 'h1-missing', 'No <h1> found.');
    else if (h1s.length > 1) warn('H8', 'multiple-h1', `${h1s.length} <h1> elements found. Use only one per page.`);
    else pass('H8-h1');

    document.title && document.title.trim() ? pass('H8-title') : fail('H8', 'page-title', '<title> missing or empty.');
    const desc = document.querySelector('meta[name="description"]');
    desc && desc.content.trim() ? pass('H8-meta-desc') : warn('H8', 'meta-description', 'Meta description missing.');
  }

  function checkH9() {
    document.querySelectorAll('[required]').forEach(el => {
      const label = el.id ? document.querySelector(`label[for="${el.id}"]`) : null;
      if (label && !label.textContent.includes('*')) {
        info('H9', 'required-indicator', `Required field without visual indicator (*): id="${el.id}"`);
      }
    });
    pass('H9-done');
  }

  function checkH10() {
    document.querySelectorAll('button:not([aria-label])').forEach(btn => {
      if (!btn.textContent.trim()) fail('H10', 'icon-button', `Button without text or aria-label.`);
    });
    pass('H10-done');
  }

  function report() {
    const total = results.critical.length + results.warning.length + results.info.length + results.passed.length;
    const score = Math.round((results.passed.length / total) * 100);

    console.group(`[UX-VALIDATOR] Nielsen Score: ${score}% (${results.passed.length}/${total})`);
    if (results.critical.length) {
      console.group(`CRITICAL (${results.critical.length})`);
      results.critical.forEach(r => console.error(`[${r.heuristic}] ${r.id}: ${r.message}`));
      console.groupEnd();
    }
    if (results.warning.length) {
      console.group(`WARNING (${results.warning.length})`);
      results.warning.forEach(r => console.warn(`[${r.heuristic}] ${r.id}: ${r.message}`));
      console.groupEnd();
    }
    if (results.info.length) {
      console.group(`INFO (${results.info.length})`);
      results.info.forEach(r => console.info(`[${r.heuristic}] ${r.id}: ${r.message}`));
      console.groupEnd();
    }
    console.log(`PASSED: ${results.passed.length} checks.`);
    console.groupEnd();
    window.__UXReport = results;
  }

  function run() {
    checkH1(); checkH2(); checkH3(); checkH4(); checkH5();
    checkH6(); checkH7(); checkH8(); checkH9(); checkH10();
    report();
  }

  document.readyState === 'loading' ? document.addEventListener('DOMContentLoaded', run) : run();
})();
