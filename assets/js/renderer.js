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
            const isObj = skill && typeof skill === 'object' && skill.name;
            const skillName = isObj ? skill.name : skill;
            const iconPath = isObj ? skill.icon : null;
            
            let iconHtml = '';
            if (iconPath) {
              iconHtml = `
                <img class="tech-tag-icon" src="${iconPath}" alt="" aria-hidden="true" loading="lazy"/>
              `;
            }
            
            skillsHtml += `
              <span class="tech-tag" role="listitem">
                ${iconHtml}
                <span>${skillName}</span>
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

    // Sort education: In Progress or most recent first
    data.education.sort((a, b) => getEndDateValue(b.date) - getEndDateValue(a.date));

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
              ${course.logo ? `
                ${course.credentialUrl ? `
                  <a href="${course.credentialUrl}" target="_blank" rel="noopener noreferrer" aria-label="Show Credential" style="display: flex; align-items: center; justify-content: center; width: 100%; height: 100%;">
                    <img src="${course.logo}" alt="${course.provider} logo" style="width: 100%; height: 100%; object-fit: contain; border-radius: var(--radius-sm);" loading="lazy"/>
                  </a>
                ` : `
                  <img src="${course.logo}" alt="${course.provider} logo" style="width: 100%; height: 100%; object-fit: contain; border-radius: var(--radius-sm);" loading="lazy"/>
                `}
              ` : `
                ${course.credentialUrl ? `
                  <a href="${course.credentialUrl}" target="_blank" rel="noopener noreferrer" aria-label="Show Credential" style="color: var(--color-accent-mist); display: flex; align-items: center; justify-content: center; width: 100%; height: 100%; transition: color var(--duration-fast);">
                    <svg aria-hidden="true" style="width: 24px; height: 24px; fill: none; stroke: currentColor; stroke-width: 2;" viewBox="0 0 24 24">
                      <circle cx="12" cy="8" r="6"></circle>
                      <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline>
                    </svg>
                  </a>
                ` : `
                  <div style="color: rgba(182, 204, 215, 0.4); display: flex; align-items: center; justify-content: center; width: 100%; height: 100%;">
                    <svg aria-hidden="true" style="width: 24px; height: 24px; fill: none; stroke: currentColor; stroke-width: 2;" viewBox="0 0 24 24">
                      <path d="M22 10v6M2 10l10-5 10 5-10 5z"></path>
                      <path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5"></path>
                    </svg>
                  </div>
                `}
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
              <svg aria-hidden="true" viewBox="0 0 24 24"><path d="M15 18l-6-6 6-6" /></svg>
            </button>
            <button class="slider-arrow-btn next-btn" aria-label="Scroll right">
              <svg aria-hidden="true" viewBox="0 0 24 24"><path d="M9 18l6-6-6-6" /></svg>
            </button>
          </div>
        </div>
      `;
      setupSlider('courses-slider-track', '.prev-btn', '.next-btn', 3);
    }

    // Render Publications sub-section
    const publicationsContainer = document.getElementById('publications-list');
    if (publicationsContainer && data.publications) {
      // Sort publications by date descending
      data.publications.sort((a, b) => getEndDateValue(b.date) - getEndDateValue(a.date));

      const activePubFilter = document.querySelector('#publication-filter-bar .filter-btn.active')?.getAttribute('data-filter') || 'all';
      const isPubFiltering = activePubFilter !== 'all';

      let pubCardsHtml = '';
      data.publications.forEach((pub) => {
        pubCardsHtml += `
          <div class="course-card" data-type="${pub.type}" id="${pub.id}" role="listitem">
            <div class="card-layout-with-logo">
              <div class="card-logo-container">
                ${pub.url ? `
                  <a href="${pub.url}" target="_blank" rel="noopener noreferrer" aria-label="View publication" style="color: var(--color-accent-mist); display: flex; align-items: center; justify-content: center; width: 100%; height: 100%; transition: color var(--duration-fast);">
                    <svg aria-hidden="true" style="width: 24px; height: 24px; fill: none; stroke: currentColor; stroke-width: 2;" viewBox="0 0 24 24">
                      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
                      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
                    </svg>
                  </a>
                ` : `
                  <div style="color: rgba(182, 204, 215, 0.4); display: flex; align-items: center; justify-content: center; width: 100%; height: 100%;">
                    <svg aria-hidden="true" style="width: 24px; height: 24px; fill: none; stroke: currentColor; stroke-width: 2;" viewBox="0 0 24 24">
                      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
                      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
                    </svg>
                  </div>
                `}
              </div>
              <div class="card-logo-content">
                <h3 class="achievement-title" style="margin-bottom: 2px;">${pub.name}</h3>
                <p class="achievement-issuer">${pub.institution}</p>
                <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; margin-top: 2px; gap: var(--space-2);">
                  <p class="achievement-date"><span>${pub.date}</span></p>
                  ${pub.url ? `
                    <a href="${pub.url}" target="_blank" rel="noopener noreferrer" class="credential-btn" style="margin-top: 0;">
                      <span data-i18n="publication.view.btn">View</span>
                    </a>
                  ` : ''}
                </div>
              </div>
            </div>
          </div>
        `;
      });

      if (isPubFiltering) {
        publicationsContainer.innerHTML = `
          <div class="courses-slider-track grid-view" id="publications-slider-track" role="list">
            ${pubCardsHtml}
          </div>
        `;
      } else {
        publicationsContainer.innerHTML = `
          <div class="slider-wrapper">
            <div class="courses-slider-track" id="publications-slider-track" role="list">
              ${pubCardsHtml}
            </div>
            <div class="slider-controls">
              <button class="slider-arrow-btn prev-pub-btn" aria-label="Scroll left">
                <svg aria-hidden="true" viewBox="0 0 24 24"><path d="M15 18l-6-6 6-6" /></svg>
              </button>
              <button class="slider-arrow-btn next-pub-btn" aria-label="Scroll right">
                <svg aria-hidden="true" viewBox="0 0 24 24"><path d="M9 18l6-6-6-6" /></svg>
              </button>
            </div>
          </div>
        `;
        setupSlider('publications-slider-track', '.prev-pub-btn', '.next-pub-btn', 3);
      }
    }
  }

  function renderProjects(data, lang) {
    const container = document.getElementById('projects-list');
    if (!container) return;

    const currentLang = lang || ((window.i18n && window.i18n.getCurrentLang) ? window.i18n.getCurrentLang() : 'en');
    const t = (key) => (window.i18n && window.i18n.t) ? window.i18n.t(key, currentLang) : key;

    // --- Collect all stack tags across all projects for filter bar ---
    const allProjects = data.projects || [];

    // Sort: in-progress first (Infinity), then most recent end date
    const sorted = [...allProjects].sort((a, b) => getEndDateValue(b.date) - getEndDateValue(a.date));

    // Build set of stack tags for filter bar
    const stackTagSet = new Set();
    sorted.forEach(p => (p.stack || []).forEach(s => stackTagSet.add(s)));

    // Render filter bar
    const filterBar = document.getElementById('project-filter-bar');
    let activeFilter = 'all';
    if (filterBar) {
      activeFilter = filterBar.querySelector('.filter-btn.active')?.getAttribute('data-filter') || 'all';
      let filterHtml = `<button class="filter-btn${activeFilter === 'all' ? ' active' : ''}" data-filter="all">${t('filter.all')}</button>`;
      stackTagSet.forEach(tag => {
        filterHtml += `<button class="filter-btn${activeFilter === tag ? ' active' : ''}" data-filter="${tag}">${tag}</button>`;
      });
      filterBar.innerHTML = filterHtml;
      // Bind filter buttons for projects
      filterBar.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          filterBar.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          const selectedFilter = btn.getAttribute('data-filter');
          container.querySelectorAll('.project-card').forEach(card => {
            if (selectedFilter === 'all') {
              card.style.display = '';
            } else {
              const cardTags = card.getAttribute('data-stack-tags') || '';
              card.style.display = cardTags.split(',').includes(selectedFilter) ? '' : 'none';
            }
          });
          // Recalculate slider controls based on visible children count
          const visible = Array.from(container.querySelectorAll('.project-card')).filter(c => c.style.display !== 'none');
          const controls = document.getElementById('projects-slider-controls');
          if (controls) {
            if (visible.length <= 2) {
              controls.style.display = 'none';
            } else {
              controls.style.display = 'flex';
              container.dispatchEvent(new Event('scroll'));
            }
          }
        });
      });
    }

    // --- Render placeholder if no projects ---
    if (sorted.length === 0) {
      container.innerHTML = `
        <div class="placeholder-state reveal reveal-delay-1">
          <div class="placeholder-icon">
            <svg aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" viewbox="0 0 24 24">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
            </svg>
          </div>
          <p class="placeholder-label" data-i18n="projects.placeholder.label">${t('projects.placeholder.label')}</p>
          <p class="placeholder-hint" data-i18n="projects.placeholder.hint">${t('projects.placeholder.hint')}</p>
        </div>
      `;
      return;
    }

    // --- Helper: resolve a linkedTo ID to a label + optional icon src ---
    function resolveLinkedItem(id) {
      const allData = window.CV_DATA;
      // Search all languages for matching id
      const langs = ['en', 'pt', 'es'];
      for (const l of langs) {
        const d = allData[l];
        if (!d) continue;
        // experience
        const exp = (d.experience || []).find(e => e.id === id);
        if (exp) return { label: exp.company || exp.role, icon: exp.logo || null, href: `#experience` };
        // volunteering
        const vol = (d.volunteering || []).find(v => v.id === id);
        if (vol) return { label: vol.org || vol.role, icon: vol.logo || null, href: `#community` };
        // education
        const edu = (d.education || []).find(e => e.id === id);
        if (edu) return { label: edu.institution || edu.degree, icon: edu.logo || null, href: `#education` };
        // hackathons
        const hack = (d.hackathons || []).find(h => h.id === id);
        if (hack) return { label: hack.name, icon: null, href: `#community` };
        // events
        const ev = (d.events || []).find(e => e.id === id);
        if (ev) return { label: ev.name, icon: null, href: `#community` };
        // courses
        const course = (d.courses || []).find(c => c.id === id);
        if (course) return { label: course.name, icon: course.logo || null, href: `#education` };
      }
      return { label: id, icon: null, href: '#' };
    }

    // --- Build HTML for all project cards ---
    let html = '';
    sorted.forEach((project, pIdx) => {
      // Dynamic fallback for fields in case of multilingual data entry omissions
      const id = project.id;
      const getFallbackField = (field, defaultVal) => {
        if (project[field] !== undefined && project[field] !== null && (typeof project[field] !== 'string' || project[field].trim() !== '')) {
          return project[field];
        }
        const langs = ['en', 'pt', 'es'];
        for (const l of langs) {
          const otherData = window.CV_DATA[l];
          if (otherData && otherData.projects) {
            const otherProj = otherData.projects.find(p => p.id === id);
            if (otherProj && otherProj[field] !== undefined && otherProj[field] !== null && (typeof otherProj[field] !== 'string' || otherProj[field].trim() !== '')) {
              return otherProj[field];
            }
          }
        }
        return defaultVal;
      };

      const images = getFallbackField('images', []);
      const stack = getFallbackField('stack', []);
      const linkedTo = getFallbackField('linkedTo', []);
      const repoUrl = getFallbackField('repoUrl', '');
      const status = getFallbackField('status', 'completed');
      const category = getFallbackField('category', '');
      const date = getFallbackField('date', '');

      const statusKey = status === 'in-progress' ? 'projects.status.inprogress' : 'projects.status.completed';
      const statusClass = status === 'in-progress' ? 'inprogress' : 'completed';
      const stackTagsAttr = stack.join(',');
      const hasDesc = !!project.descriptionHtml;
      const hasRepo = !!repoUrl;

      // --- Carousel HTML ---
      let carouselHtml;
      if (images.length === 0) {
        carouselHtml = `
          <div class="project-card-carousel">
            <div class="project-carousel-placeholder">
              <svg aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.5" viewbox="0 0 24 24">
                <rect x="3" y="3" width="18" height="18" rx="2"/>
                <circle cx="8.5" cy="8.5" r="1.5"/>
                <polyline points="21 15 16 10 5 21"/>
              </svg>
            </div>
          </div>`;
      } else if (images.length === 1) {
        carouselHtml = `
          <div class="project-card-carousel">
            <div class="project-carousel-viewport">
              <div class="project-carousel-track">
                <button class="project-carousel-slide" aria-label="${images[0].caption || project.title}" type="button"
                  data-lightbox-src="${images[0].src}" data-lightbox-caption="${images[0].caption || project.title}">
                  <img class="project-carousel-img" src="${images[0].src}" alt="${images[0].caption || project.title}" loading="lazy"/>
                </button>
              </div>
            </div>
          </div>`;
      } else {
        let slidesHtml = '';
        let dotsHtml = '';
        images.forEach((img, idx) => {
          slidesHtml += `
            <button class="project-carousel-slide" aria-label="${img.caption || project.title}" type="button"
              data-lightbox-src="${img.src}" data-lightbox-caption="${img.caption || project.title}">
              <img class="project-carousel-img" src="${img.src}" alt="${img.caption || project.title}" loading="lazy"/>
            </button>`;
          dotsHtml += `<button class="project-carousel-dot${idx === 0 ? ' active' : ''}" aria-label="Go to image ${idx + 1}" data-idx="${idx}" type="button"></button>`;
        });
        carouselHtml = `
          <div class="project-card-carousel">
            <button class="project-carousel-arrow prev" aria-label="Previous image" type="button">&#8249;</button>
            <div class="project-carousel-viewport">
              <div class="project-carousel-track">${slidesHtml}</div>
            </div>
            <button class="project-carousel-arrow next" aria-label="Next image" type="button">&#8250;</button>
            <div class="project-carousel-dots">${dotsHtml}</div>
          </div>`;
      }

      // --- Linked-to HTML ---
      let linkedHtml = '';
      if (linkedTo.length > 0) {
        let tagsHtml = '';
        linkedTo.slice(0, 3).forEach(id => {
          const resolved = resolveLinkedItem(id);
          const iconHtml = resolved.icon
            ? `<img class="project-linked-icon" src="${resolved.icon}" alt="" aria-hidden="true" loading="lazy"/>`
            : '';
          tagsHtml += `
            <a class="project-linked-tag" href="${resolved.href}" aria-label="Linked to ${resolved.label}">
              ${iconHtml}
              ${resolved.label}
            </a>`;
        });
        linkedHtml = `
          <hr class="project-section-divider" aria-hidden="true"/>
          <div class="project-linked-section">
            <span class="project-linked-label">${t('projects.linked.label')}</span>
            <div class="project-linked-tags">${tagsHtml}</div>
          </div>`;
      }

      // --- Stack HTML ---
      let stackHtml = '';
      if (stack.length > 0) {
        let stackTagsHtml = '';
        stack.forEach(s => {
          stackTagsHtml += `<span class="tech-tag" role="listitem">${s}</span>`;
        });
        stackHtml = `
          <hr class="project-section-divider" aria-hidden="true"/>
          <div class="project-stack-section">
            <span class="project-stack-label">${t('projects.stack.label')}</span>
            <div class="project-stack-track" role="list">${stackTagsHtml}</div>
          </div>`;
      }

      // --- Description HTML ---
      let descHtml = '';
      if (hasDesc) {
        const toggleId = `project-desc-toggle-${pIdx}`;
        const descId = `project-desc-box-${pIdx}`;
        descHtml = `
          <hr class="project-section-divider" aria-hidden="true"/>
          <div class="project-desc-section">
            <button class="project-desc-toggle" id="${toggleId}" aria-expanded="false" aria-controls="${descId}" type="button">
              <svg class="project-desc-toggle-icon" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2.5" viewbox="0 0 24 24">
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
              ${t('projects.desc.expand')}
            </button>
            <div class="project-desc-box" id="${descId}" aria-expanded="false">
              <div class="project-desc-inner">${project.descriptionHtml}</div>
            </div>
          </div>`;
      }

      // --- Repo link HTML ---
      let repoHtml = '';
      if (hasRepo) {
        repoHtml = `
          <a class="project-repo-link" href="${repoUrl}" target="_blank" rel="noopener noreferrer" aria-label="${t('projects.repo.link')} — ${project.title}">
            <svg aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" viewbox="0 0 24 24">
              <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22"/>
            </svg>
            ${t('projects.repo.link')}
          </a>`;
      }

      html += `
        <article class="project-card reveal" id="${project.id}" role="listitem"
          data-stack-tags="${stackTagsAttr}">
          ${carouselHtml}
          <div class="project-card-body">
            <p class="project-card-overline">${category}</p>
            <div class="project-card-title-row">
              <h3 class="project-card-title">${project.title}</h3>
              <span class="project-status-badge project-status-badge--${statusClass}">${t(statusKey)}</span>
            </div>
            <p class="project-card-date">${date}</p>
            ${linkedHtml}
            ${stackHtml}
            ${descHtml}
            ${hasRepo ? `<hr class="project-section-divider" aria-hidden="true"/><div>${repoHtml}</div>` : ''}
          </div>
        </article>`;
    });

    container.innerHTML = html;

    // --- Setup per-card carousels ---
    container.querySelectorAll('.project-card').forEach(card => {
      const track = card.querySelector('.project-carousel-track');
      if (!track) return;
      const slides = track.querySelectorAll('.project-carousel-slide');
      if (slides.length <= 1) return;

      let currentIdx = 0;
      const dots = card.querySelectorAll('.project-carousel-dot');
      const prevBtn = card.querySelector('.project-carousel-arrow.prev');
      const nextBtn = card.querySelector('.project-carousel-arrow.next');

      function goTo(idx) {
        currentIdx = (idx + slides.length) % slides.length;
        track.style.transform = `translateX(-${currentIdx * 100}%)`;
        dots.forEach((d, i) => d.classList.toggle('active', i === currentIdx));
      }

      if (prevBtn) prevBtn.addEventListener('click', (e) => { e.stopPropagation(); goTo(currentIdx - 1); });
      if (nextBtn) nextBtn.addEventListener('click', (e) => { e.stopPropagation(); goTo(currentIdx + 1); });
      dots.forEach((dot, i) => dot.addEventListener('click', () => goTo(i)));

      // Slides click → open lightbox
      slides.forEach(slide => {
        slide.addEventListener('click', () => {
          const src = slide.getAttribute('data-lightbox-src');
          const caption = slide.getAttribute('data-lightbox-caption');
          if (src && window.openLightboxImage) window.openLightboxImage(src, caption);
        });
      });
    });

    // --- Setup description toggle per card ---
    container.querySelectorAll('.project-desc-toggle').forEach(btn => {
      btn.addEventListener('click', () => {
        const descBox = document.getElementById(btn.getAttribute('aria-controls'));
        if (!descBox) return;
        const expanded = btn.getAttribute('aria-expanded') === 'true';
        btn.setAttribute('aria-expanded', String(!expanded));
        descBox.classList.toggle('expanded', !expanded);
        const label = !expanded ? t('projects.desc.minimize') : t('projects.desc.expand');
        // Update only text node, preserving the SVG icon
        const textNode = [...btn.childNodes].find(n => n.nodeType === 3 && n.textContent.trim());
        if (textNode) textNode.textContent = ` ${label}`;
      });
    });

    // Apply current filter initially
    if (activeFilter && activeFilter !== 'all') {
      container.querySelectorAll('.project-card').forEach(card => {
        const cardTags = card.getAttribute('data-stack-tags') || '';
        card.style.display = cardTags.split(',').includes(activeFilter) ? '' : 'none';
      });
      const visible = Array.from(container.querySelectorAll('.project-card')).filter(c => c.style.display !== 'none');
      const controls = document.getElementById('projects-slider-controls');
      if (controls && visible.length <= 2) {
        controls.style.display = 'none';
      }
    }

    // --- Dynamic JSON-LD Structured Data for Projects (SEO & LLMO) ---
    let existingJsonLd = document.getElementById('jsonld-projects');
    if (existingJsonLd) {
      existingJsonLd.remove();
    }

    if (sorted.length > 0) {
      const projectsSchema = {
        "@context": "https://schema.org",
        "@graph": sorted.map(proj => ({
          "@type": "SoftwareSourceCode",
          "@id": `https://eversonfilipe.github.io/eversonfilipe-portfolio/#${proj.id}`,
          "name": proj.title,
          "description": proj.descriptionHtml.replace(/<[^>]*>/g, '').trim(),
          "programmingLanguage": proj.stack || [],
          "codeRepository": proj.repoUrl || "",
          "author": {
            "@type": "Person",
            "name": "Everson Filipe",
            "url": "https://eversonfilipe.github.io/eversonfilipe-portfolio/"
          },
          "creativeWorkStatus": proj.status === 'in-progress' ? 'http://schema.org/ActiveActionStatus' : 'http://schema.org/CompletedActionStatus'
        }))
      };

      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.id = 'jsonld-projects';
      script.textContent = JSON.stringify(projectsSchema);
      document.head.appendChild(script);
    }

    // --- Setup horizontal slider (desktop arrows) ---
    setupSlider('projects-list', '#projects-prev', '#projects-next', 2);
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
        volContainer.classList.remove('slider-active');
        volContainer.innerHTML = volCardsHtml;
      } else {
        volContainer.classList.add('slider-active');
        volContainer.innerHTML = `
          <div class="slider-wrapper">
            <div class="volunteering-slider-track" id="volunteering-slider-track" role="list">
              ${volCardsHtml}
            </div>
            <div class="slider-controls">
              <button class="slider-arrow-btn prev-vol-btn" aria-label="Scroll left">
                <svg aria-hidden="true" viewBox="0 0 24 24"><path d="M15 18l-6-6 6-6" /></svg>
              </button>
              <button class="slider-arrow-btn next-vol-btn" aria-label="Scroll right">
                <svg aria-hidden="true" viewBox="0 0 24 24"><path d="M9 18l6-6-6-6" /></svg>
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
        <li role="none">
          <a href="#publications-list" class="nav-dropdown-link" role="menuitem">
            <span class="nav-dropdown-role">${window.i18n && window.i18n.t ? window.i18n.t('edu.publications.label', lang) : 'Publications'}</span>
          </a>
        </li>
      `;
    }

    // 3. Projects nav dropdown
    const projDropdown = document.getElementById('nav-dropdown-projects');
    if (projDropdown) {
      const projectsList = (window.CV_DATA[lang] || window.CV_DATA.en).projects || [];
      if (projectsList.length > 0) {
        // Resolve fallbacks dynamically and sort chronologically (recent first)
        const enriched = projectsList.map(p => {
          const id = p.id;
          const getFallbackField = (field, defaultVal) => {
            if (p[field] !== undefined && p[field] !== null && (typeof p[field] !== 'string' || p[field].trim() !== '')) {
              return p[field];
            }
            const langs = ['en', 'pt', 'es'];
            for (const l of langs) {
              const otherData = window.CV_DATA[l];
              if (otherData && otherData.projects) {
                const otherProj = otherData.projects.find(op => op.id === id);
                if (otherProj && otherProj[field] !== undefined && otherProj[field] !== null && (typeof otherProj[field] !== 'string' || otherProj[field].trim() !== '')) {
                  return otherProj[field];
                }
              }
            }
            return defaultVal;
          };

          return {
            id: p.id,
            title: getFallbackField('title', p.title),
            status: getFallbackField('status', 'completed'),
            date: getFallbackField('date', '')
          };
        });

        const sortedProjects = [...enriched].sort((a, b) => getEndDateValue(b.date) - getEndDateValue(a.date));

        projDropdown.innerHTML = sortedProjects.map(p => {
          const isCompleted = p.status === 'completed';
          const titleOpacity = isCompleted ? ' style="opacity: 0.55;"' : '';
          return `
            <li role="none">
              <a href="#${p.id}" class="nav-dropdown-link" role="menuitem">
                <span class="nav-dropdown-role"${titleOpacity}>${p.title}</span>
              </a>
            </li>
          `;
        }).join('');
      } else {
        projDropdown.innerHTML = `
          <li role="none">
            <a href="#projects" class="nav-dropdown-link" role="menuitem">
              <span class="nav-dropdown-role">${window.i18n && window.i18n.t ? window.i18n.t('projects.heading', lang) : 'Main Projects'}</span>
            </a>
          </li>
        `;
      }
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

  function updateSectionCounters(data, lang) {
    const expCounter = document.getElementById('exp-total-counter');
    const courseCounter = document.getElementById('course-total-counter');
    const pubCounter = document.getElementById('publication-total-counter');
    const eventCounter = document.getElementById('event-total-counter');
    const projCounter = document.getElementById('project-total-counter');

    if (expCounter && data.experience && window.i18n && window.i18n.t) {
      const text = window.i18n.t('exp.total.count', lang).replace('__count__', data.experience.length);
      expCounter.textContent = text;
    }
    if (courseCounter && data.courses && window.i18n && window.i18n.t) {
      const text = window.i18n.t('edu.courses.total.count', lang).replace('__count__', data.courses.length);
      courseCounter.textContent = text;
    }
    if (pubCounter && data.publications && window.i18n && window.i18n.t) {
      const text = window.i18n.t('edu.publications.total.count', lang).replace('__count__', data.publications.length);
      pubCounter.textContent = text;
    }
    if (eventCounter && data.events && window.i18n && window.i18n.t) {
      const text = window.i18n.t('community.events.total.count', lang).replace('__count__', data.events.length);
      eventCounter.textContent = text;
    }
    if (projCounter && data.projects && window.i18n && window.i18n.t) {
      const count = data.projects.length;
      if (count > 0) {
        const text = window.i18n.t('projects.total.count', lang).replace('__count__', count);
        projCounter.textContent = text;
        projCounter.style.display = '';
      } else {
        projCounter.style.display = 'none';
      }
    }
  }

  function renderCV(lang) {
    const data = window.CV_DATA[lang] || window.CV_DATA.en;
    if (!data) return;

    // Capture currently active filters to prevent reset
    const activeExp = document.querySelector('#exp-filter-bar .filter-btn.active')?.getAttribute('data-filter') || 'all';
    const activeCourse = document.querySelector('#course-filter-bar .filter-btn.active')?.getAttribute('data-filter') || 'all';
    const activeEvent = document.querySelector('#event-filter-bar .filter-btn.active')?.getAttribute('data-filter') || 'all';
    const activePub = document.querySelector('#publication-filter-bar .filter-btn.active')?.getAttribute('data-filter') || 'all';

    // Render filter bars dynamically
    const filters = window.CV_DATA.filters;
    if (filters) {
      renderFilters(filters.experience, 'exp-filter-bar', activeExp, lang);
      renderFilters(filters.courses, 'course-filter-bar', activeCourse, lang);
      renderFilters(filters.events, 'event-filter-bar', activeEvent, lang);
      if (filters.publications) {
        renderFilters(filters.publications, 'publication-filter-bar', activePub, lang);
      }
    }

    renderHero(data);
    window.renderCV = renderCV;

    // Dynamic SEO / Meta updates on language switch
    if (window.i18n && window.i18n.t) {
      document.title = window.i18n.t('meta.title', lang);
      
      let metaDesc = document.querySelector('meta[name="description"]');
      if (!metaDesc) {
        metaDesc = document.createElement('meta');
        metaDesc.name = 'description';
        document.head.appendChild(metaDesc);
      }
      metaDesc.content = window.i18n.t('meta.description', lang);
      
      let metaKeywords = document.querySelector('meta[name="keywords"]');
      if (!metaKeywords) {
        metaKeywords = document.createElement('meta');
        metaKeywords.name = 'keywords';
        document.head.appendChild(metaKeywords);
      }
      metaKeywords.content = window.i18n.t('meta.keywords', lang);
      
      let ogTitle = document.querySelector('meta[property="og:title"]');
      if (ogTitle) ogTitle.content = window.i18n.t('meta.title', lang);
      
      let ogDesc = document.querySelector('meta[property="og:description"]');
      if (ogDesc) ogDesc.content = window.i18n.t('meta.description', lang);
    }
    renderAbout(data);
    renderExperience(data, lang);
    renderEducation(data);
    renderProjects(data, lang);
    renderCertifications(data);
    renderCommunity(data);
    renderFooter(data);
    renderDropdowns(data, lang);
    updateSectionCounters(data, lang);

    // Rebind active filters and layout bindings
    if (window.initFilters) window.initFilters();
    if (window.applyFilters) window.applyFilters();
    if (window.initCarousel) window.initCarousel();
    if (window.initScrollReveal) window.initScrollReveal();

    // Re-translate raw static elements within dynamic sections
    if (window.i18n && window.i18n.t) {
      document.querySelectorAll('#projects-list [data-i18n], #certs-list [data-i18n], .evidence-carousel [data-i18n], #courses-list [data-i18n], #publications-list [data-i18n]').forEach(el => {
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
