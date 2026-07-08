/**
 * renderer.js - Renderizador dinâmico de dados do currículo.
 * Reage a mudanças de idioma (langchange) e reconstrói o DOM de forma acessível.
 */
(function CVRenderer() {
  'use strict';

  // Section expansion states
  const sectionStates = {
    experience: false,
    hackathons: false,
    events: false
  };

  // Helper to parse experience and items dates to sorting key (e.g. "Dec 2025" -> 202512)
  function getEndDateValue(dateStr) {
    if (!dateStr) return 0;
    const clean = dateStr.replace(/–/g, '-');
    const parts = clean.split('-');
    const endPart = (parts.length > 1 ? parts[1] : parts[0]).trim().toLowerCase();
    
    if (endPart.includes('present') || endPart.includes('atual') || endPart.includes('progress') || endPart.includes('curso') || endPart.includes('presente')) {
      return Infinity; // Currently active
    }
    
    const months = {
      jan: 1, feb: 2, mar: 3, apr: 4, may: 5, jun: 6, jul: 7, aug: 8, sep: 9, oct: 10, nov: 11, dec: 12,
      ene: 1, abr: 4, mai: 5, set: 9, dic: 12, dez: 12, out: 10, ago: 8
    };
    
    const words = endPart.split(/\s+/);
    let year = 0;
    let month = 0;
    
    words.forEach(w => {
      const y = parseInt(w, 10);
      if (y > 1000 && y < 3000) {
        year = y;
      } else {
        const prefix = w.substring(0, 3);
        if (months[prefix]) {
          month = months[prefix];
        }
      }
    });
    
    return year * 100 + month;
  }

  // Helper to apply Expand/Minimize limits to a list section
  function applySectionLimits(containerId, limit, activeFilter, isExpanded) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    let items = [];
    if (containerId === 'exp-timeline') {
      items = container.querySelectorAll('.timeline-item');
    } else if (containerId === 'hackathons-list') {
      items = container.querySelectorAll('.hackathon-item');
    } else if (containerId === 'events-list') {
      items = container.querySelectorAll('.event-card');
    }
    
    const hasFilter = activeFilter && activeFilter !== 'all';
    const toggleContainerId = containerId + '-toggle-container';
    let toggleContainer = document.getElementById(toggleContainerId);
    
    if (!toggleContainer && items.length > 0) {
      toggleContainer = document.createElement('div');
      toggleContainer.className = 'section-toggle-container';
      toggleContainer.id = toggleContainerId;
      
      const btn = document.createElement('button');
      btn.className = 'section-toggle-btn';
      btn.setAttribute('data-section', containerId === 'exp-timeline' ? 'experience' : (containerId === 'hackathons-list' ? 'hackathons' : 'events'));
      toggleContainer.appendChild(btn);
    }
    
    if (items.length <= limit || hasFilter) {
      items.forEach(item => item.classList.remove('hidden-collapsed'));
      if (toggleContainer) toggleContainer.remove();
    } else {
      items.forEach((item, idx) => {
        if (idx >= limit && !isExpanded) {
          item.classList.add('hidden-collapsed');
        } else {
          item.classList.remove('hidden-collapsed');
        }
      });
      
      const btn = toggleContainer.querySelector('.section-toggle-btn');
      if (btn) {
        const lang = (window.i18n && window.i18n.getCurrentLang) ? window.i18n.getCurrentLang() : 'en';
        if (isExpanded) {
          btn.textContent = (window.i18n && window.i18n.t) ? window.i18n.t('btn.minimize', lang) : 'Minimize';
          btn.classList.add('expanded');
        } else {
          btn.textContent = (window.i18n && window.i18n.t) ? window.i18n.t('btn.expand', lang) : 'Expand';
          btn.classList.remove('expanded');
        }
      }
      
      container.appendChild(toggleContainer);
    }
  }

  // Globally expose expand experience function for section link redirect
  window.expandExperienceSection = function() {
    sectionStates.experience = true;
    const activeExp = document.querySelector('#exp-filter-bar .filter-btn.active')?.getAttribute('data-filter') || 'all';
    applySectionLimits('exp-timeline', 4, activeExp, true);
  };

  // Helper to setup horizontal slider arrow behaviors on desktop
  function setupSlider(trackId, leftBtnSelector, rightBtnSelector, limit) {
    const track = document.getElementById(trackId);
    if (!track) return;
    
    const wrapper = track.closest('.slider-wrapper');
    if (!wrapper) return;
    
    const leftBtn = wrapper.querySelector(leftBtnSelector);
    const rightBtn = wrapper.querySelector(rightBtnSelector);
    const controls = wrapper.querySelector('.slider-controls');
    
    const cards = track.children;
    if (cards.length <= limit) {
      if (controls) controls.style.display = 'none';
      return;
    }
    
    if (controls) controls.style.display = 'flex';
    
    const updateArrows = () => {
      const scrollLeft = track.scrollLeft;
      const maxScroll = track.scrollWidth - track.clientWidth;
      
      const isAtStart = scrollLeft <= 5;
      const isAtEnd = scrollLeft >= maxScroll - 5;
      
      if (leftBtn) leftBtn.style.display = isAtStart ? 'none' : 'inline-flex';
      if (rightBtn) rightBtn.style.display = isAtEnd ? 'none' : 'inline-flex';
    };
    
    track.removeEventListener('scroll', updateArrows);
    track.addEventListener('scroll', updateArrows);
    
    if (rightBtn) {
      rightBtn.onclick = () => {
        const cardWidth = cards[0] ? cards[0].offsetWidth : 300;
        track.scrollBy({ left: cardWidth + 16, behavior: 'smooth' });
      };
    }
    
    if (leftBtn) {
      leftBtn.onclick = () => {
        const cardWidth = cards[0] ? cards[0].offsetWidth : 300;
        track.scrollBy({ left: -(cardWidth + 16), behavior: 'smooth' });
      };
    }
    
    setTimeout(updateArrows, 100);
  }


  function renderFilters(filtersData, containerId, activeFilter, lang) {
    const container = document.getElementById(containerId);
    if (!container) return;

    let html = '';
    filtersData.forEach(item => {
      const label = item.label[lang] || item.label.en || item.id;
      const isActive = (item.id === activeFilter) ? 'active' : '';
      html += `<button class="filter-btn ${isActive}" data-filter="${item.id}">${label}</button>\n`;
    });
    container.innerHTML = html;
    
    // Apply Experience limits/expansion logic
    const activeExp = document.querySelector('#exp-filter-bar .filter-btn.active')?.getAttribute('data-filter') || 'all';
    applySectionLimits('exp-timeline', 4, activeExp, sectionStates.experience);
  }

  function renderHero(data) {
    const overline = document.getElementById('hero-overline');
    const name = document.getElementById('hero-name');
    const title = document.getElementById('hero-title');
    const tagline = document.getElementById('hero-tagline');

    if (data.hero) {
      if (overline) overline.innerHTML = data.hero.overline || '';
      if (name) name.innerHTML = data.hero.name || '';
      if (title) title.innerHTML = data.hero.title || '';
      if (tagline) tagline.innerHTML = data.hero.tagline || '';
    }
  }

  function renderAbout(data) {
    const container = document.getElementById('about-text-container');
    if (!container) return;
    container.innerHTML = `
      <p style="font-size:var(--text-base);line-height:var(--leading-relaxed);color:var(--color-text-muted);margin-bottom:var(--space-6);">${data.about.p1}</p>
      <p style="font-size:var(--text-base);line-height:var(--leading-relaxed);color:var(--color-text-muted);margin-bottom:var(--space-6);">${data.about.p2}</p>
      <p style="font-size:var(--text-base);line-height:var(--leading-relaxed);color:var(--color-text-muted);">${data.about.p3}</p>
      <div class="divider"></div>
      <p style="font-size:var(--text-sm);color:var(--color-text-muted);margin-bottom:var(--space-3);">${data.about.current}</p>
    `;

    const detailsContainer = document.getElementById('about-details-container');
    if (detailsContainer) {
      let statsHtml = '';
      if (data.about.stats && data.about.stats.length > 0) {
        statsHtml = '<div class="stats-row" style="margin-block:0;margin-bottom:var(--space-12);border-top:none;">';
        data.about.stats.forEach(stat => {
          statsHtml += `
            <div class="stat-block">
              <span class="stat-number">
                ${stat.number}
                <span style="color:var(--color-accent-electric-text);font-size:var(--text-lg);">${stat.suffix}</span>
              </span>
              <span class="stat-label">${stat.label}</span>
            </div>
          `;
        });
        statsHtml += '</div>';
      }

      let skillsHtml = '';
      if (data.about.skills && data.about.skills.length > 0) {
        skillsHtml = `
          <p class="overline" data-i18n="about.stack.label" style="margin-bottom:var(--space-4);">
            Core stack
          </p>
          <div aria-label="Core technology stack" class="about-tech-stack" role="list">
        `;
        data.about.skills.forEach(skill => {
          skillsHtml += `
            <span class="tech-tag" role="listitem">
              ${skill}
            </span>
          `;
        });
        skillsHtml += '</div>';
      }

      detailsContainer.innerHTML = statsHtml + skillsHtml;
    }
  }

  function renderExperience(data, lang) {
    const container = document.getElementById('exp-timeline');
    if (!container) return;
    
    // Auto-organize experience: present/active first, then most recent end date descending
    data.experience.sort((a, b) => getEndDateValue(b.date) - getEndDateValue(a.date));

    let html = '';
    data.experience.forEach((job, idx) => {
      const delay = idx + 1;
      let bulletsHtml = '';
      job.bullets.forEach(b => {
        bulletsHtml += `<li class="timeline-bullet">${b}</li>`;
      });

      let tagsHtml = '';
      job.tags.forEach(t => {
        tagsHtml += `<span class="tech-tag" role="listitem">${t}</span>`;
      });

      let carouselHtml = '';
      if (job.carousel && job.carousel.slides && job.carousel.slides.length > 0) {
        let slidesHtml = '';
        let dotsHtml = '';
        job.carousel.slides.forEach((slide, sIdx) => {
          const isActive = sIdx === 0 ? 'active' : '';
          const ariaPressed = sIdx === 0 ? 'true' : 'false';
          slidesHtml += `
            <div aria-label="${slide.alt}" class="evidence-slide ${isActive}" data-index="${sIdx}" data-caption="${slide.caption}" role="button" tabindex="0">
              <img alt="${slide.alt}" class="evidence-thumb" src="${slide.src}"/>
            </div>
          `;
          dotsHtml += `
            <button aria-label="Image ${sIdx + 1}" aria-pressed="${ariaPressed}" class="evidence-dot ${isActive}" data-index="${sIdx}"></button>
          `;
        });

        carouselHtml = `
          <div class="evidence-carousel">
            <p class="evidence-label">${job.carousel.label}</p>
            <div class="evidence-slider-container">
              <button aria-label="Previous image" class="evidence-arrow prev" id="evidence-prev">&lt;</button>
              <div class="evidence-viewport">
                <div class="evidence-slide-track" id="evidence-track">
                  ${slidesHtml}
                </div>
              </div>
              <button aria-label="Next image" class="evidence-arrow next" id="evidence-next">&gt;</button>
            </div>
            <div class="evidence-dots" id="evidence-dots">
              ${dotsHtml}
            </div>
          </div>
        `;
      }

      let achievementsHtml = '';
      if (job.specificAchievements && job.specificAchievements.length > 0) {
        const currentLang = lang || (window.i18n && window.i18n.getCurrentLang ? window.i18n.getCurrentLang() : 'en');
        const achLabel = window.i18n && window.i18n.t ? window.i18n.t('exp.achievements.label', currentLang) : 'Specific Achievements';
        let itemsHtml = '';
        job.specificAchievements.forEach(ach => {
          itemsHtml += `
            <li class="specific-achievement-item">
              <span class="specific-achievement-tag">${ach.tag}</span>
              <span class="specific-achievement-desc">${ach.description}</span>
            </li>
          `;
        });
        achievementsHtml = `
          <div class="specific-achievements-box">
            <span class="specific-achievements-label">${achLabel}</span>
            <ul class="specific-achievements-list">
              ${itemsHtml}
            </ul>
          </div>
        `;
      }

      html += `
        <article class="timeline-item reveal reveal-delay-${delay}" id="${job.id}" role="listitem">
          <div style="display: flex; align-items: flex-start; gap: var(--space-4);">
            ${job.logo ? `
              <img src="${job.logo}" alt="${job.company} Logo" style="width: 36px; height: 36px; border-radius: var(--radius-sm); border: 1px solid rgba(182, 204, 215, 0.15); object-fit: contain; flex-shrink: 0; background: var(--color-bg-deep); padding: 2px; margin-top: 4px;" />
            ` : ''}
            <div style="flex-grow: 1; min-width: 0;">
              <div class="timeline-meta">
                <span class="timeline-role">${job.role}</span>
                <span class="timeline-company">${job.company}</span>
                <span class="timeline-date">${job.date}</span>
              </div>
              ${achievementsHtml}
              <div class="timeline-body-box">
                <ul aria-label="Responsibilities at ${job.company}" class="timeline-bullets" style="margin-top: 0;">
                  ${bulletsHtml}
                </ul>
                <div aria-label="Technologies used at ${job.company}" class="timeline-tags" role="list" style="margin-bottom: 0;">
                  ${tagsHtml}
                </div>
                ${carouselHtml}
              </div>
            </div>
          </div>
        </article>
      `;
    });

    container.innerHTML = html;
    
    // Apply Experience limits/expansion logic
    const activeExp = document.querySelector('#exp-filter-bar .filter-btn.active')?.getAttribute('data-filter') || 'all';
    applySectionLimits('exp-timeline', 4, activeExp, sectionStates.experience);
  }

  function renderEducation(data) {
    const container = document.getElementById('education-list');
    if (!container) return;

    let html = '';
    data.education.forEach((edu) => {
      const highlightsHtml = (edu.highlights && edu.highlights.length > 0) ? `
        <button class="edu-vol-toggle-btn" aria-label="Toggle details" aria-expanded="false" data-target="edu-hl-${edu.id}">+</button>
        <div class="edu-vol-highlights-container" id="edu-hl-${edu.id}" style="display: none;">
          ${edu.highlights.map(hl => `<span class="highlight-tag">${hl}</span>`).join('')}
        </div>
      ` : '';

      const contentHtml = `
        <p class="education-card-type">${edu.type}</p>
        <h3 class="education-card-title">${edu.degree}</h3>
        <p class="education-card-institution">${edu.institution}</p>
        <p class="education-card-date">${edu.date}</p>
        ${highlightsHtml}
      `;
      
      html += `
        <article class="education-card" id="${edu.id}" role="listitem">
          ${edu.logo ? `
            <div class="card-layout-with-logo">
              <div class="card-logo-container">
                <img class="card-logo-img" src="${edu.logo}" alt="${edu.institution} Logo" />
              </div>
              <div class="card-logo-content">
                ${contentHtml}
              </div>
            </div>
          ` : contentHtml}
        </article>
      `;
    });
    container.innerHTML = html;

    const coursesContainer = document.getElementById('courses-list');
    if (!coursesContainer) return;

    // Cursos devem se auto-organizar, onde o mais recente é o primeiro
    data.courses.sort((a, b) => getEndDateValue(b.date) - getEndDateValue(a.date));

    const activeCourseFilter = document.querySelector('#course-filter-bar .filter-btn.active')?.getAttribute('data-filter') || 'all';
    const isFiltering = activeCourseFilter !== 'all';

    let coursesCardsHtml = '';
    data.courses.forEach((course) => {
      coursesCardsHtml += `
        <div class="course-card" data-type="${course.type}" id="${course.id}" role="listitem">
          <div class="card-layout-with-logo">
            <div class="card-logo-container">
              ${course.credentialUrl ? `
                <a href="${course.credentialUrl}" target="_blank" rel="noopener noreferrer" aria-label="Show Credential" style="color: var(--color-accent-mist); display: flex; align-items: center; justify-content: center; width: 100%; height: 100%; transition: color var(--duration-fast);">
                  <svg style="width: 24px; height: 24px; fill: none; stroke: currentColor; stroke-width: 2;" viewBox="0 0 24 24">
                    <circle cx="12" cy="8" r="6"></circle>
                    <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline>
                  </svg>
                </a>
              ` : `
                <div style="color: rgba(182, 204, 215, 0.4); display: flex; align-items: center; justify-content: center; width: 100%; height: 100%;">
                  <svg style="width: 24px; height: 24px; fill: none; stroke: currentColor; stroke-width: 2;" viewBox="0 0 24 24">
                    <path d="M22 10v6M2 10l10-5 10 5-10 5z"></path>
                    <path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5"></path>
                  </svg>
                </div>
              `}
            </div>
            <div class="card-logo-content">
              <h3 class="achievement-title" style="margin-bottom: 2px;">${course.name}</h3>
              <p class="achievement-issuer">${course.provider}</p>
              <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; margin-top: 2px; gap: var(--space-2);">
                <p class="achievement-date"><span>${course.date}</span></p>
                ${course.credentialUrl ? `
                  <a href="${course.credentialUrl}" target="_blank" rel="noopener noreferrer" class="credential-btn" style="margin-top: 0;">
                    <span data-i18n="course.credential.btn">Show Credential</span>
                  </a>
                ` : ''}
              </div>
            </div>
          </div>
        </div>
      `;
    });

    if (isFiltering) {
      coursesContainer.innerHTML = `
        <div class="courses-slider-track grid-view" id="courses-slider-track" role="list">
          ${coursesCardsHtml}
        </div>
      `;
    } else {
      coursesContainer.innerHTML = `
        <div class="slider-wrapper">
          <div class="courses-slider-track" id="courses-slider-track" role="list">
            ${coursesCardsHtml}
          </div>
          <div class="slider-controls">
            <button class="slider-arrow-btn prev-btn" aria-label="Scroll left">
              <svg viewBox="0 0 24 24"><path d="M15 18l-6-6 6-6" /></svg>
            </button>
            <button class="slider-arrow-btn next-btn" aria-label="Scroll right">
              <svg viewBox="0 0 24 24"><path d="M9 18l6-6-6-6" /></svg>
            </button>
          </div>
        </div>
      `;
      setupSlider('courses-slider-track', '.prev-btn', '.next-btn', 3);
    }
  }

  function renderProjects(data) {
    const container = document.getElementById('projects-list');
    if (!container) return;

    if (!data.projects || data.projects.length === 0) {
      container.innerHTML = `
        <div class="placeholder-state reveal reveal-delay-1">
          <div class="placeholder-icon">
            <svg aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" viewbox="0 0 24 24">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
            </svg>
          </div>
          <p class="placeholder-label" data-i18n="projects.placeholder.label">Under Construction</p>
          <p class="placeholder-hint" data-i18n="projects.placeholder.hint">Project case studies are currently being curated and will be published soon.</p>
        </div>
      `;
      return;
    }

    let html = '';
    data.projects.forEach((project) => {
      let tagsHtml = '';
      project.tags.forEach(t => {
        tagsHtml += `<span class="tech-tag" role="listitem">${t}</span>`;
      });
      html += `
        <article class="card" id="${project.id}">
          <p class="card-label">${project.category}</p>
          <h3 class="card-title">${project.title}</h3>
          <p class="card-body">${project.description}</p>
          <div class="card-footer" role="list">
            ${tagsHtml}
          </div>
        </article>
      `;
    });
    container.innerHTML = html;
    
    // Apply Experience limits/expansion logic
    const activeExp = document.querySelector('#exp-filter-bar .filter-btn.active')?.getAttribute('data-filter') || 'all';
    applySectionLimits('exp-timeline', 4, activeExp, sectionStates.experience);
  }

  function renderCertifications(data) {
    const container = document.getElementById('certs-list');
    if (!container) return;

    if (!data.certifications || data.certifications.length === 0) {
      container.innerHTML = `
        <div class="placeholder-state reveal reveal-delay-1">
          <div class="placeholder-icon">
            <svg aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" viewbox="0 0 24 24">
              <circle cx="12" cy="8" r="7"></circle>
              <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline>
            </svg>
          </div>
          <p class="placeholder-label" data-i18n="certs.placeholder.label">Under Construction</p>
          <p class="placeholder-hint" data-i18n="certs.placeholder.hint">My official certifications are being compiled for display.</p>
        </div>
      `;
      return;
    }

    let html = '';
    data.certifications.forEach((cert) => {
      html += `
        <article class="education-card" id="${cert.id}">
          <p class="education-card-type">${cert.issuer}</p>
          <h3 class="education-card-title">${cert.title}</h3>
          <p class="education-card-date">${cert.date}</p>
        </article>
      `;
    });
    container.innerHTML = html;
    
    // Apply Experience limits/expansion logic
    const activeExp = document.querySelector('#exp-filter-bar .filter-btn.active')?.getAttribute('data-filter') || 'all';
    applySectionLimits('exp-timeline', 4, activeExp, sectionStates.experience);
  }

  function renderCommunity(data) {
    // Volunteering
    const volContainer = document.getElementById('volunteer-list');
    if (volContainer) {
      // Voluntariados devem se autoorganizar seguindo o mais recente, e o que está atualmente ativo
      data.volunteering.sort((a, b) => getEndDateValue(b.date) - getEndDateValue(a.date));

      let volCardsHtml = '';
      data.volunteering.forEach((vol) => {
        const highlightsHtml = (vol.highlights && vol.highlights.length > 0) ? `
          <button class="edu-vol-toggle-btn" aria-label="Toggle details" aria-expanded="false" data-target="vol-hl-${vol.id}">+</button>
          <div class="edu-vol-highlights-container" id="vol-hl-${vol.id}" style="display: none;">
            ${vol.highlights.map(hl => `<span class="highlight-tag">${hl}</span>`).join('')}
          </div>
        ` : '';

        const contentHtml = `
          <p class="volunteer-card-role">${vol.role}</p>
          <p class="volunteer-card-org">${vol.org}</p>
          <p class="volunteer-card-date">${vol.date}</p>
          ${highlightsHtml}
        `;
        volCardsHtml += `
          <article class="volunteer-card reveal" id="${vol.id}" role="listitem">
            ${vol.logo ? `
              <div class="card-layout-with-logo">
                <div class="card-logo-container">
                  <img class="card-logo-img" src="${vol.logo}" alt="${vol.org} Logo" />
                </div>
                <div class="card-logo-content">
                  ${contentHtml}
                </div>
              </div>
            ` : contentHtml}
          </article>
        `;
      });

      if (data.volunteering.length <= 6) {
        volContainer.innerHTML = `
          <div class="volunteering-slider-track grid-view" id="volunteering-slider-track" role="list">
            ${volCardsHtml}
          </div>
        `;
      } else {
        volContainer.innerHTML = `
          <div class="slider-wrapper">
            <div class="volunteering-slider-track" id="volunteering-slider-track" role="list">
              ${volCardsHtml}
            </div>
            <div class="slider-controls">
              <button class="slider-arrow-btn prev-vol-btn" aria-label="Scroll left">
                <svg viewBox="0 0 24 24"><path d="M15 18l-6-6 6-6" /></svg>
              </button>
              <button class="slider-arrow-btn next-vol-btn" aria-label="Scroll right">
                <svg viewBox="0 0 24 24"><path d="M9 18l6-6-6-6" /></svg>
              </button>
            </div>
          </div>
        `;
        setupSlider('volunteering-slider-track', '.prev-vol-btn', '.next-vol-btn', 6);
      }
    }

    // Hackathons
    const hackContainer = document.getElementById('hackathons-list');
    if (hackContainer) {
      // Auto-organizar pela mais recente concluída, onde a mais antiga fica no final
      data.hackathons.sort((a, b) => getEndDateValue(b.date) - getEndDateValue(a.date));

      let hackHtml = '';
      data.hackathons.forEach((hack) => {
        hackHtml += `
          <div class="hackathon-item" id="${hack.id}" role="listitem">
            <span class="hackathon-name">${hack.name}</span>
            <span class="hackathon-meta">${hack.meta} &middot; <span>${hack.date}</span></span>
          </div>
        `;
      });
      hackContainer.innerHTML = hackHtml;
      applySectionLimits('hackathons-list', 12, 'all', sectionStates.hackathons);
    }

    // Events
    const eventContainer = document.getElementById('events-list');
    if (eventContainer) {
      let eventHtml = '';
      data.events.forEach((ev) => {
        const contentHtml = `
          <div class="event-card-header">
            <span class="event-card-name">${ev.name}</span>
            <span aria-label="Role: ${ev.role}" class="role-badge role-badge--${ev.type}">${ev.role}</span>
          </div>
          <span class="event-card-meta">${ev.meta} &middot; <span>${ev.date}</span></span>
        `;
        eventHtml += `
          <article class="event-card" data-type="${ev.type}" id="${ev.id}" role="listitem">
            ${ev.logo ? `
              <div class="card-layout-with-logo">
                <div class="card-logo-container">
                  <img class="card-logo-img" src="${ev.logo}" alt="${ev.name} Logo" />
                </div>
                <div class="card-logo-content">
                  ${contentHtml}
                </div>
              </div>
            ` : contentHtml}
          </article>
        `;
      });
      eventContainer.innerHTML = eventHtml;
    }

    // Achievements
    const achContainer = document.getElementById('achievements-list');
    if (achContainer) {
      let achHtml = '';
      data.achievements.forEach((ach) => {
        achHtml += `
          <article class="achievement-item reveal" id="${ach.id}" role="listitem">
            <div class="card-layout-with-logo">
              <div class="card-logo-container">
                <img class="card-logo-img" src="${ach.logo}" alt="${ach.issuer} Logo" />
              </div>
              <div class="card-logo-content">
                <h3 class="achievement-title" style="margin-bottom: 2px;">${ach.title}</h3>
                <p class="achievement-issuer">${ach.issuer}</p>
                <p class="achievement-date"><span>${ach.date}</span></p>
              </div>
            </div>
          </article>
        `;
      });
      achContainer.innerHTML = achHtml;
    }
  }

  function renderFooter(data) {
    const el = document.querySelector('.footer-copy');
    if (el && data.footer && data.footer.copy) {
      el.innerHTML = data.footer.copy;
    }
  }

  function getEndDateValue(dateStr) {
    if (!dateStr) return 0;
    const parts = dateStr.split(/[–\-]/);
    const endPart = (parts[1] || parts[0]).trim();
    if (/present|presente|atual|current/i.test(endPart)) {
      return 999912;
    }
    const monthMap = {
      jan: 1, feb: 2, mar: 3, apr: 4, may: 5, jun: 6, jul: 7, aug: 8, sep: 9, oct: 10, nov: 11, dec: 12,
      fev: 2, abr: 4, mai: 5, ago: 8, set: 9, out: 10, dez: 12,
      ene: 1, dic: 12
    };
    const yearMatch = endPart.match(/\d{4}/);
    const year = yearMatch ? parseInt(yearMatch[0], 10) : 2000;
    let month = 1;
    const words = endPart.toLowerCase().match(/[a-z]+/g);
    if (words) {
      for (const w of words) {
        const prefix = w.substring(0, 3);
        if (monthMap[prefix]) {
          month = monthMap[prefix];
          break;
        }
      }
    }
    return year * 100 + month;
  }

  function renderDropdowns(data, lang) {
    // 1. Experience nav dropdown
    const expDropdown = document.getElementById('nav-dropdown-experience');
    if (expDropdown) {
      let expDropdownHtml = '';
      const sortedExperience = [...data.experience].sort((a, b) => {
        return getEndDateValue(b.date) - getEndDateValue(a.date);
      });

      sortedExperience.forEach(job => {
        const isCurrent = /present|presente|atual/i.test(job.date);
        const titleOpacity = isCurrent ? '' : ' style="opacity: 0.55;"';
        expDropdownHtml += `
          <li role="none">
            <a href="#${job.id}" class="nav-dropdown-link" role="menuitem">
              <span class="nav-dropdown-role"${titleOpacity}>${job.role}</span>
              <span class="nav-dropdown-company">${job.company}</span>
            </a>
          </li>
        `;
      });
      expDropdown.innerHTML = expDropdownHtml;
    }

    // 2. Education nav dropdown
    const eduDropdown = document.getElementById('nav-dropdown-education');
    if (eduDropdown) {
      eduDropdown.innerHTML = `
        <li role="none">
          <a href="#education" class="nav-dropdown-link" role="menuitem">
            <span class="nav-dropdown-role">${window.i18n && window.i18n.t ? window.i18n.t('edu.overline', lang) : 'Education'}</span>
          </a>
        </li>
        <li role="none">
          <a href="#courses-list" class="nav-dropdown-link" role="menuitem">
            <span class="nav-dropdown-role">${window.i18n && window.i18n.t ? window.i18n.t('edu.courses.label', lang) : 'Courses'}</span>
          </a>
        </li>
      `;
    }

    // 3. Projects nav dropdown
    const projDropdown = document.getElementById('nav-dropdown-projects');
    if (projDropdown) {
      projDropdown.innerHTML = `
        <li role="none">
          <a href="#projects" class="nav-dropdown-link" role="menuitem">
            <span class="nav-dropdown-role">${window.i18n && window.i18n.t ? window.i18n.t('projects.placeholder.label', lang) : 'Under Construction'}</span>
          </a>
        </li>
      `;
    }

    // 4. Certifications nav dropdown
    const certsDropdown = document.getElementById('nav-dropdown-certifications');
    if (certsDropdown) {
      certsDropdown.innerHTML = `
        <li role="none">
          <a href="#certifications" class="nav-dropdown-link" role="menuitem">
            <span class="nav-dropdown-role">${window.i18n && window.i18n.t ? window.i18n.t('certs.placeholder.label', lang) : 'Under Construction'}</span>
          </a>
        </li>
      `;
    }

    // 5. Community nav dropdown
    const commDropdown = document.getElementById('nav-dropdown-community');
    if (commDropdown) {
      commDropdown.innerHTML = `
        <li role="none">
          <a href="#volunteer-list" class="nav-dropdown-link" role="menuitem">
            <span class="nav-dropdown-role">${window.i18n && window.i18n.t ? window.i18n.t('community.volunteering', lang) : 'Volunteering'}</span>
          </a>
        </li>
        <li role="none">
          <a href="#hackathons-list" class="nav-dropdown-link" role="menuitem">
            <span class="nav-dropdown-role">${window.i18n && window.i18n.t ? window.i18n.t('community.hackathons', lang) : 'Hackathons'}</span>
          </a>
        </li>
        <li role="none">
          <a href="#events-list" class="nav-dropdown-link" role="menuitem">
            <span class="nav-dropdown-role">${window.i18n && window.i18n.t ? window.i18n.t('community.events', lang) : 'Events'}</span>
          </a>
        </li>
        <li role="none">
          <a href="#achievements-list" class="nav-dropdown-link" role="menuitem">
            <span class="nav-dropdown-role">${window.i18n && window.i18n.t ? window.i18n.t('community.achievements', lang) : 'Achievements'}</span>
          </a>
        </li>
      `;
    }
  }

  function renderCV(lang) {
    const data = window.CV_DATA[lang] || window.CV_DATA.en;
    if (!data) return;

    // Capture currently active filters to prevent reset
    const activeExp = document.querySelector('#exp-filter-bar .filter-btn.active')?.getAttribute('data-filter') || 'all';
    const activeCourse = document.querySelector('#course-filter-bar .filter-btn.active')?.getAttribute('data-filter') || 'all';
    const activeEvent = document.querySelector('#event-filter-bar .filter-btn.active')?.getAttribute('data-filter') || 'all';

    // Render filter bars dynamically
    const filters = window.CV_DATA.filters;
    if (filters) {
      renderFilters(filters.experience, 'exp-filter-bar', activeExp, lang);
      renderFilters(filters.courses, 'course-filter-bar', activeCourse, lang);
      renderFilters(filters.events, 'event-filter-bar', activeEvent, lang);
    }

    renderHero(data);
    window.renderCV = renderCV;
    renderAbout(data);
    renderExperience(data, lang);
    renderEducation(data);
    renderProjects(data);
    renderCertifications(data);
    renderCommunity(data);
    renderFooter(data);
    renderDropdowns(data, lang);

    // Rebind active filters and layout bindings
    if (window.initFilters) window.initFilters();
    if (window.applyFilters) window.applyFilters();
    if (window.initCarousel) window.initCarousel();
    if (window.initScrollReveal) window.initScrollReveal();

    // Re-translate raw static elements within dynamic sections
    if (window.i18n && window.i18n.t) {
      document.querySelectorAll('#projects-list [data-i18n], #certs-list [data-i18n], .evidence-carousel [data-i18n], #courses-list [data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        el.textContent = window.i18n.t(key, lang);
      });
    }
  }

  // Handle Expand/Minimize button clicks
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('.section-toggle-btn');
    if (!btn) return;
    
    const section = btn.getAttribute('data-section');
    if (section === 'experience') {
      sectionStates.experience = !sectionStates.experience;
      const activeExp = document.querySelector('#exp-filter-bar .filter-btn.active')?.getAttribute('data-filter') || 'all';
      applySectionLimits('exp-timeline', 4, activeExp, sectionStates.experience);
      
      if (!sectionStates.experience) {
        const timeline = document.getElementById('experience');
        if (timeline) {
          const navH = document.getElementById('main-nav')?.offsetHeight || 0;
          const top = timeline.getBoundingClientRect().top + window.scrollY - navH - 16;
          window.scrollTo({ top, behavior: 'smooth' });
        }
      }
    } else if (section === 'hackathons') {
      sectionStates.hackathons = !sectionStates.hackathons;
      applySectionLimits('hackathons-list', 12, 'all', sectionStates.hackathons);
      
      if (!sectionStates.hackathons) {
        const timeline = document.getElementById('community');
        if (timeline) {
          const navH = document.getElementById('main-nav')?.offsetHeight || 0;
          const top = timeline.getBoundingClientRect().top + window.scrollY - navH - 16;
          window.scrollTo({ top, behavior: 'smooth' });
        }
      }
    } else if (section === 'events') {
      sectionStates.events = !sectionStates.events;
      const activeEvent = document.querySelector('#event-filter-bar .filter-btn.active')?.getAttribute('data-filter') || 'all';
      applySectionLimits('events-list', 12, activeEvent, sectionStates.events);
      
      if (!sectionStates.events) {
        const timeline = document.getElementById('community');
        if (timeline) {
          const navH = document.getElementById('main-nav')?.offsetHeight || 0;
          const top = timeline.getBoundingClientRect().top + window.scrollY - navH - 16;
          window.scrollTo({ top, behavior: 'smooth' });
        }
      }
    }
  });

  document.addEventListener('DOMContentLoaded', () => {
    const initialLang = (window.i18n && window.i18n.getCurrentLang) ? window.i18n.getCurrentLang() : 'en';
    renderCV(initialLang);

    document.addEventListener('langchange', (e) => {
      renderCV(e.detail.lang);
    });
  });
})();
