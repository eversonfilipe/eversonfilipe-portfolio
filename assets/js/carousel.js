/**
 * carousel.js — Multi-instance safe logic for evidence carousels and Lightbox viewer
 * Responsive, accessible (WCAG 2.4.3), multi-instance isolated
 */
(function initCarouselModule() {
  'use strict';

  let currentActiveLightboxImages = [];
  let currentLightboxIndex = 0;
  let carouselListenersBound = false;

  function initCarousel() {
    const carousels = document.querySelectorAll('.evidence-carousel');
    if (carousels.length === 0) return;

    carousels.forEach((carouselEl) => {
      const track = carouselEl.querySelector('.evidence-slide-track');
      const prevBtn = carouselEl.querySelector('.evidence-arrow.prev');
      const nextBtn = carouselEl.querySelector('.evidence-arrow.next');
      const dots = carouselEl.querySelectorAll('.evidence-dot');
      const slides = carouselEl.querySelectorAll('.evidence-slide');
      const viewport = carouselEl.querySelector('.evidence-viewport');
      const dotsContainer = carouselEl.querySelector('.evidence-dots');

      if (!track || slides.length === 0) return;

      let currentCarouselIndex = 0;
      track.style.transform = 'translateX(0%)';

      // Clean single slide handling: hide arrows & dots if only 1 slide in this carousel
      if (slides.length <= 1) {
        if (prevBtn) prevBtn.style.display = 'none';
        if (nextBtn) nextBtn.style.display = 'none';
        if (dotsContainer) dotsContainer.style.display = 'none';
      } else {
        if (prevBtn) prevBtn.style.display = '';
        if (nextBtn) nextBtn.style.display = '';
        if (dotsContainer) dotsContainer.style.display = '';
      }

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
        prevBtn.onclick = (e) => {
          e.stopPropagation();
          updateCarousel(currentCarouselIndex - 1);
        };
      }
      if (nextBtn) {
        nextBtn.onclick = (e) => {
          e.stopPropagation();
          updateCarousel(currentCarouselIndex + 1);
        };
      }

      dots.forEach((dot, index) => {
        dot.onclick = (e) => {
          e.stopPropagation();
          updateCarousel(index);
        };
      });

      if (viewport) {
        let startX = 0;
        let endX = 0;
        viewport.ontouchstart = (e) => {
          startX = e.touches[0].clientX;
        };
        viewport.ontouchend = (e) => {
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

      // Collect images strictly scoped to THIS carousel instance
      const carouselImages = [];
      const evidenceThumbs = carouselEl.querySelectorAll('.evidence-thumb');
      evidenceThumbs.forEach((thumb) => {
        const parentSlide = thumb.closest('.evidence-slide');
        carouselImages.push({
          src: thumb.getAttribute('src'),
          alt: thumb.getAttribute('alt'),
          caption: parentSlide ? (parentSlide.getAttribute('data-caption') || thumb.getAttribute('alt')) : thumb.getAttribute('alt')
        });
      });

      slides.forEach((slide, idx) => {
        slide.onclick = () => openScopedLightbox(carouselImages, idx, slide);
        slide.onkeydown = (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            openScopedLightbox(carouselImages, idx, slide);
          }
        };
      });
    });

    initGlobalLightboxEvents();
  }

  function openScopedLightbox(imagesList, index, triggeringEl) {
    const lightbox = document.getElementById('lightbox-modal');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const lightboxClose = document.getElementById('lightbox-close');
    const lightboxPrev = document.getElementById('lightbox-prev');
    const lightboxNext = document.getElementById('lightbox-next');

    if (!lightbox || !lightboxImg || !imagesList || imagesList.length === 0) return;

    currentActiveLightboxImages = imagesList;
    currentLightboxIndex = index < 0 ? 0 : (index >= imagesList.length ? 0 : index);

    const imgData = currentActiveLightboxImages[currentLightboxIndex];
    if (!imgData) return;

    lightboxImg.src = imgData.src;
    lightboxImg.alt = imgData.alt;
    if (lightboxCaption) lightboxCaption.textContent = imgData.caption || imgData.alt;

    if (currentActiveLightboxImages.length <= 1) {
      if (lightboxPrev) lightboxPrev.style.display = 'none';
      if (lightboxNext) lightboxNext.style.display = 'none';
    } else {
      if (lightboxPrev) lightboxPrev.style.display = 'flex';
      if (lightboxNext) lightboxNext.style.display = 'flex';
    }

    lightbox.classList.add('open');
    lightbox.setAttribute('aria-hidden', 'false');
    window.lightboxCloseTrigger = triggeringEl || document.activeElement;
    setTimeout(() => {
      if (lightboxClose) lightboxClose.focus();
    }, 50);
  }

  function closeLightbox() {
    const lightbox = document.getElementById('lightbox-modal');
    if (!lightbox) return;
    lightbox.classList.remove('open');
    lightbox.setAttribute('aria-hidden', 'true');
    if (window.lightboxCloseTrigger) {
      window.lightboxCloseTrigger.focus();
      window.lightboxCloseTrigger = null;
    }
  }

  function navigateLightbox(dir) {
    if (!currentActiveLightboxImages || currentActiveLightboxImages.length === 0) return;
    let nextIndex = currentLightboxIndex + dir;
    if (nextIndex < 0) nextIndex = currentActiveLightboxImages.length - 1;
    if (nextIndex >= currentActiveLightboxImages.length) nextIndex = 0;
    openScopedLightbox(currentActiveLightboxImages, nextIndex, window.lightboxCloseTrigger);
  }

  function initGlobalLightboxEvents() {
    const lightbox = document.getElementById('lightbox-modal');
    const lightboxClose = document.getElementById('lightbox-close');
    const lightboxPrev = document.getElementById('lightbox-prev');
    const lightboxNext = document.getElementById('lightbox-next');

    if (!lightbox) return;

    if (lightboxClose) lightboxClose.onclick = closeLightbox;

    lightbox.onclick = (e) => {
      if (e.target === lightbox || e.target.classList.contains('lightbox-content')) {
        closeLightbox();
      }
    };

    if (lightboxPrev) lightboxPrev.onclick = () => navigateLightbox(-1);
    if (lightboxNext) lightboxNext.onclick = () => navigateLightbox(1);

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
          const focusables = Array.from(lightbox.querySelectorAll('button'))
            .filter(el => window.getComputedStyle(el).display !== 'none');
          if (focusables.length === 0) return;
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

  window.openLightboxImage = function(src, caption) {
    openScopedLightbox([{ src: src, alt: caption || 'Image', caption: caption || '' }], 0, document.activeElement);
  };

  window.initCarousel = initCarousel;

  document.addEventListener('DOMContentLoaded', initCarousel);
})();
