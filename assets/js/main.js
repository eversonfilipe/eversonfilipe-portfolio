/**
 * main.js — Lógica principal: nav, scroll reveal, active section
 * Sem dependências externas. Vanilla JS.
 */
(function main() {
  'use strict';

  // ── Nav ──────────────────────────────────────────
  const nav        = document.getElementById('main-nav');
  const navToggle  = document.getElementById('nav-toggle');
  const navLinks   = document.getElementById('nav-links');
  const allLinks   = navLinks ? navLinks.querySelectorAll('.nav-link') : [];

  // Mobile toggle
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      const expanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', String(!expanded));
      navLinks.classList.toggle('open');
    });

    function closeAllMobileSubmenus() {
      document.querySelectorAll('.nav-mobile-toggle').forEach(t => t.setAttribute('aria-expanded', 'false'));
      document.querySelectorAll('.nav-dropdown').forEach(m => m.classList.remove('open-mobile'));
    }

    // Fechar ao clicar em qualquer link de navegacao
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navToggle.setAttribute('aria-expanded', 'false');
        navLinks.classList.remove('open');
        closeAllMobileSubmenus();
      });
    });
  }

  // ── Active Section via Intersection Observer ──────
  const sections = document.querySelectorAll('section[id]');

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const id = entry.target.id;
      allLinks.forEach(link => {
        const href = link.getAttribute('href');
        link.classList.toggle('active', href === `#${id}`);
      });
    });
  }, { rootMargin: '-40% 0px -55% 0px' });

  sections.forEach(s => sectionObserver.observe(s));

  // ── Scroll Reveal ─────────────────────────────────
  let revealObserver;

  function initScrollReveal() {
    if (revealObserver) {
      revealObserver.disconnect();
    }

    const reveals = document.querySelectorAll('.reveal');
    if (reveals.length > 0) {
      revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target);
          }
        });
      }, { threshold: 0.1 });

      reveals.forEach(el => revealObserver.observe(el));
    }
  }

  window.initScrollReveal = initScrollReveal;
  initScrollReveal();

  // ── Smooth scroll para âncoras (Event Delegation) ──
  document.addEventListener('click', (e) => {
    const anchor = e.target.closest('a[href^="#"]');
    if (!anchor) return;
    const href = anchor.getAttribute('href');
    if (href === '#' || href === '') return;
    const target = document.querySelector(href);
    if (!target) return;
    e.preventDefault();
    const navH = nav ? nav.offsetHeight : 0;
    const top  = target.getBoundingClientRect().top + window.scrollY - navH - 16;
    window.scrollTo({ top, behavior: 'smooth' });
  });

  // Handle mobile menu submenu toggle clicks
  document.addEventListener('click', (e) => {
    const toggle = e.target.closest('.nav-mobile-toggle');
    if (!toggle) return;
    
    e.preventDefault();
    e.stopPropagation();
    
    const parent = toggle.closest('.nav-item-dropdown');
    if (!parent) return;
    
    const submenu = parent.querySelector('.nav-dropdown');
    if (!submenu) return;
    
    const expanded = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!expanded));
    submenu.classList.toggle('open-mobile', !expanded);
  });

  // Handle dropdown aria-expanded accessibility
  const dropdownItems = document.querySelectorAll('.nav-item-dropdown');
  dropdownItems.forEach(item => {
    const trigger = item.querySelector('.nav-link');
    if (!trigger) return;
    
    const showMenu = () => trigger.setAttribute('aria-expanded', 'true');
    const hideMenu = () => trigger.setAttribute('aria-expanded', 'false');
    
    item.addEventListener('mouseenter', showMenu);
    item.addEventListener('mouseleave', hideMenu);
    item.addEventListener('focusin', showMenu);
    item.addEventListener('focusout', (e) => {
      if (!item.contains(e.relatedTarget)) {
        hideMenu();
      }
    });
  });

  // ── Keyboard: fechar nav com Escape ──────────────
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navLinks && navLinks.classList.contains('open')) {
      navToggle.setAttribute('aria-expanded', 'false');
      navLinks.classList.remove('open');
      navToggle.focus();
    }
  });

})();
