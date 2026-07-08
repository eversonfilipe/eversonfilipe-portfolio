/**
 * filters.js - Lógica global de filtragem para Experiência, Cursos e Eventos.
 * Adaptado para renderização dinâmica e mudanças de idioma.
 */
(function initFiltersModule() {
  'use strict';

  function applyFilters() {
    // 1. Experience
    const expActive = document.querySelector('#exp-filter-bar .filter-btn.active');
    if (expActive) {
      const val = expActive.getAttribute('data-filter');
      document.querySelectorAll('.timeline-item').forEach(item => {
        if (val === 'all') {
          item.style.display = 'grid';
        } else {
          const tags = Array.from(item.querySelectorAll('.tech-tag')).map(t => t.textContent.trim());
          item.style.display = tags.includes(val) ? 'grid' : 'none';
        }
      });
    }

    // 2. Courses
    const courseActive = document.querySelector('#course-filter-bar .filter-btn.active');
    if (courseActive) {
      const val = courseActive.getAttribute('data-filter');
      document.querySelectorAll('#courses-list .course-card').forEach(row => {
        if (val === 'all') {
          row.style.display = 'flex';
        } else {
          row.style.display = (row.getAttribute('data-type') === val) ? 'flex' : 'none';
        }
      });
    }

    // 4. Publications
    const pubActive = document.querySelector('#publication-filter-bar .filter-btn.active');
    if (pubActive) {
      const val = pubActive.getAttribute('data-filter');
      document.querySelectorAll('#publications-list .course-card').forEach(row => {
        if (val === 'all') {
          row.style.display = 'flex';
        } else {
          row.style.display = (row.getAttribute('data-type') === val) ? 'flex' : 'none';
        }
      });
    }

    // 3. Events
    const eventActive = document.querySelector('#event-filter-bar .filter-btn.active');
    if (eventActive) {
      const val = eventActive.getAttribute('data-filter');
      document.querySelectorAll('.event-card').forEach(card => {
        if (val === 'all') {
          card.style.display = 'flex';
        } else {
          card.style.display = (card.getAttribute('data-type') === val) ? 'flex' : 'none';
        }
      });
    }
  }

  function initFilters() {
    const expBar = document.getElementById('exp-filter-bar');
    if (expBar) {
      const btns = expBar.querySelectorAll('.filter-btn');
      btns.forEach(btn => {
        btn.onclick = () => {
          btns.forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          const lang = (window.i18n && window.i18n.getCurrentLang) ? window.i18n.getCurrentLang() : 'en';
          if (window.renderCV) {
            window.renderCV(lang);
          } else {
            applyFilters();
          }
        };
      });
    }

    const courseBar = document.getElementById('course-filter-bar');
    if (courseBar) {
      const btns = courseBar.querySelectorAll('.filter-btn');
      btns.forEach(btn => {
        btn.onclick = () => {
          btns.forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          const lang = (window.i18n && window.i18n.getCurrentLang) ? window.i18n.getCurrentLang() : 'en';
          if (window.renderCV) {
            window.renderCV(lang);
          } else {
            applyFilters();
          }
        };
      });
    }

    const eventBar = document.getElementById('event-filter-bar');
    if (eventBar) {
      const btns = eventBar.querySelectorAll('.filter-btn');
      btns.forEach(btn => {
        btn.onclick = () => {
          btns.forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          const lang = (window.i18n && window.i18n.getCurrentLang) ? window.i18n.getCurrentLang() : 'en';
          if (window.renderCV) {
            window.renderCV(lang);
          } else {
            applyFilters();
          }
        };
      });
    }

    const pubBar = document.getElementById('publication-filter-bar');
    if (pubBar) {
      const btns = pubBar.querySelectorAll('.filter-btn');
      btns.forEach(btn => {
        btn.onclick = () => {
          btns.forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          const lang = (window.i18n && window.i18n.getCurrentLang) ? window.i18n.getCurrentLang() : 'en';
          if (window.renderCV) {
            window.renderCV(lang);
          } else {
            applyFilters();
          }
        };
      });
    }
  }

  window.initFilters = initFilters;
  window.applyFilters = applyFilters;

  document.addEventListener('DOMContentLoaded', () => {
    initFilters();
    applyFilters();
  });
})();
