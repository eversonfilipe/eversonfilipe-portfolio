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

    // Fechar ao clicar em link
    navLinks.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navToggle.setAttribute('aria-expanded', 'false');
        navLinks.classList.remove('open');
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

  // ── Smooth scroll para âncoras ────────────────────
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const href = anchor.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      const navH = nav ? nav.offsetHeight : 0;
      const top  = target.getBoundingClientRect().top + window.scrollY - navH - 16;
      window.scrollTo({ top, behavior: 'smooth' });
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
