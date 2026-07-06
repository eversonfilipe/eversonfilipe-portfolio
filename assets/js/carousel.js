/**
 * carousel.js — Lógica para o carrossel de evidências e o visualizador Lightbox
 * Responsivo, compatível com acessibilidade (WCAG 2.4.3)
 */
(function initCarouselModule() {
  'use strict';

  let currentCarouselIndex = 0;
  let lightboxIndex = 0;
  let activeImages = [];
  let carouselListenersBound = false;

  function initCarousel() {
    const track = document.getElementById('evidence-track');
    const prevBtn = document.getElementById('evidence-prev');
    const nextBtn = document.getElementById('evidence-next');
    const dots = document.querySelectorAll('.evidence-dot');
    const slides = document.querySelectorAll('.evidence-slide');

    if (!track || slides.length === 0) return;

    currentCarouselIndex = 0;
    track.style.transform = 'translateX(0%)';

    function updateCarousel(index) {
      if (index < 0) index = slides.length - 1;
      if (index >= slides.length) index = 0;
      currentCarouselIndex = index;

      slides.forEach((slide, i) => {
        slide.classList.toggle('active', i === currentCarouselIndex);
      });

      dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === currentCarouselIndex);
        dot.setAttribute('aria-pressed', i === currentCarouselIndex ? 'true' : 'false');
      });

      const offset = -currentCarouselIndex * 100;
      track.style.transform = `translateX(${offset}%)`;
    }

    if (prevBtn) {
      prevBtn.onclick = () => updateCarousel(currentCarouselIndex - 1);
    }
    if (nextBtn) {
      nextBtn.onclick = () => updateCarousel(currentCarouselIndex + 1);
    }

    dots.forEach((dot, index) => {
      dot.onclick = () => updateCarousel(index);
    });

    let startX = 0;
    let endX = 0;
    const container = document.querySelector('.evidence-viewport');
    if (container) {
      container.ontouchstart = (e) => {
        startX = e.touches[0].clientX;
      };
      container.ontouchend = (e) => {
        endX = e.changedTouches[0].clientX;
        const diff = startX - endX;
        if (Math.abs(diff) > 50) {
          if (diff > 0) {
            updateCarousel(currentCarouselIndex + 1);
          } else {
            updateCarousel(currentCarouselIndex - 1);
          }
        }
      };
    }

    // ── 2. LIGHTBOX / MODAL ──
    const lightbox = document.getElementById('lightbox-modal');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const lightboxClose = document.getElementById('lightbox-close');
    const lightboxPrev = document.getElementById('lightbox-prev');
    const lightboxNext = document.getElementById('lightbox-next');

    if (!lightbox || !lightboxImg) return;

    const evidenceThumbs = document.querySelectorAll('.evidence-thumb');
    activeImages = [];

    evidenceThumbs.forEach((thumb, idx) => {
      const parentSlide = thumb.closest('.evidence-slide');
      activeImages.push({
        src: thumb.getAttribute('src'),
        alt: thumb.getAttribute('alt'),
        caption: parentSlide ? parentSlide.getAttribute('data-caption') : ''
      });

      parentSlide.onclick = () => openLightbox(idx);
      parentSlide.onkeydown = (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openLightbox(idx);
        }
      };
    });

    function openLightbox(index) {
      lightboxIndex = index;
      const imgData = activeImages[lightboxIndex];
      if (!imgData) return;

      lightboxImg.src = imgData.src;
      lightboxImg.alt = imgData.alt;
      lightboxCaption.textContent = imgData.caption || imgData.alt;

      lightbox.classList.add('open');
      lightbox.setAttribute('aria-hidden', 'false');
      setTimeout(() => lightboxClose.focus(), 50);
    }

    function closeLightbox() {
      lightbox.classList.remove('open');
      lightbox.setAttribute('aria-hidden', 'true');
      const triggeringSlide = slides[lightboxIndex];
      if (triggeringSlide) triggeringSlide.focus();
    }

    function navigateLightbox(dir) {
      let nextIndex = lightboxIndex + dir;
      if (nextIndex < 0) nextIndex = activeImages.length - 1;
      if (nextIndex >= activeImages.length) nextIndex = 0;
      openLightbox(nextIndex);
    }

    if (lightboxClose) {
      lightboxClose.onclick = closeLightbox;
    }

    lightbox.onclick = (e) => {
      if (e.target === lightbox || e.target.classList.contains('lightbox-content')) {
        closeLightbox();
      }
    };

    if (lightboxPrev) {
      lightboxPrev.onclick = () => navigateLightbox(-1);
    }
    if (lightboxNext) {
      lightboxNext.onclick = () => navigateLightbox(1);
    }

    if (!carouselListenersBound) {
      document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('open')) return;

        if (e.key === 'Escape') {
          closeLightbox();
        } else if (e.key === 'ArrowRight') {
          navigateLightbox(1);
        } else if (e.key === 'ArrowLeft') {
          navigateLightbox(-1);
        } else if (e.key === 'Tab') {
          const focusables = Array.from(lightbox.querySelectorAll('button'));
          const first = focusables[0];
          const last = focusables[focusables.length - 1];

          if (e.shiftKey && document.activeElement === first) {
            e.preventDefault();
            last.focus();
          } else if (!e.shiftKey && document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      });
      carouselListenersBound = true;
    }
  }

  window.initCarousel = initCarousel;

  document.addEventListener('DOMContentLoaded', initCarousel);
})();
