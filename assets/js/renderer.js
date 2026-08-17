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

  function slugifySegment(str) {
    if (!str) return '';
    return str.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
  }

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
  window.expandExperienceSection = function () {
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

  function renderCompanyTicker(data, lang) {
    const track = document.getElementById('company-ticker-track');
    if (!track || !data || !data.experience) return;

    // Extract unique companies (1 square per company: Kartado, Daus, etc.)
    const companiesMap = new Map();
    data.experience.forEach(job => {
      const compKey = slugifySegment(job.company);
      if (!companiesMap.has(compKey)) {
        companiesMap.set(compKey, {
          id: job.id,
          companyId: compKey,
          name: job.company,
          logo: job.logo,
          about: job.optional_more_about_company || '',
          jobs: []
        });
      }
      companiesMap.get(compKey).jobs.push(job);
    });

    const uniqueCompanies = Array.from(companiesMap.values());
    if (uniqueCompanies.length === 0) return;

    // Build logo cards HTML WITHOUT duplication (1 unique square icon per company)
    let html = '';
    uniqueCompanies.forEach(comp => {
      const logoHtml = comp.logo
        ? `<img class="company-card-logo" src="${comp.logo}" alt="${comp.name}" loading="lazy" decoding="async"/>`
        : `<span class="company-card-fallback">${comp.name.substring(0, 2).toUpperCase()}</span>`;

      html += `
        <button class="company-card" data-company-id="${comp.companyId}" title="${comp.name}" aria-label="${comp.name} info" type="button">
          ${logoHtml}
          <span class="company-card-name-tag">${comp.name}</span>
        </button>
      `;
    });

    track.innerHTML = html;

    // Bind click events to open company mini-modal
    track.querySelectorAll('.company-card').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const compId = btn.getAttribute('data-company-id');
        if (window.openCompanyModal) {
          window.openCompanyModal(compId);
        }
      });
    });
  }

  function renderProviderTicker(data, lang) {
    const track = document.getElementById('provider-ticker-track');
    if (!track || !data || !data.courses) return;

    // Extract unique providers (1 square card per provider: Simplilearn, Udemy, etc.)
    const providersMap = new Map();
    data.courses.forEach(course => {
      if (!course.provider) return;
      const providerKey = course.provider.toLowerCase().trim();
      if (!providersMap.has(providerKey)) {
        providersMap.set(providerKey, {
          providerId: providerKey,
          name: course.provider,
          logo: course.logo,
          courses: []
        });
      }
      providersMap.get(providerKey).courses.push(course);
    });

    const uniqueProviders = Array.from(providersMap.values());
    if (uniqueProviders.length === 0) return;

    let html = '';
    uniqueProviders.forEach(prov => {
      const logoHtml = prov.logo
        ? `<img class="company-card-logo" src="${prov.logo}" alt="${prov.name}" loading="lazy" decoding="async"/>`
        : `<span class="company-card-fallback">${prov.name.substring(0, 2).toUpperCase()}</span>`;

      html += `
        <button class="company-card" data-provider-id="${prov.providerId}" title="${prov.name}" aria-label="${prov.name} courses info" type="button">
          ${logoHtml}
          <span class="company-card-name-tag">${prov.name}</span>
        </button>
      `;
    });

    track.innerHTML = html;

    // Bind click events to open provider mini-modal
    track.querySelectorAll('.company-card').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const provId = btn.getAttribute('data-provider-id');
        if (window.openProviderModal) {
          window.openProviderModal(provId);
        }
      });
    });
  }

  // Globally expose modal control functions
  window.openCompanyModal = function (companyId) {
    const modal = document.getElementById('company-mini-modal');
    if (!modal) return;

    const lang = (window.i18n && window.i18n.getCurrentLang) ? window.i18n.getCurrentLang() : 'pt';
    const cvData = (window.CV_DATA && window.CV_DATA[lang]) ? window.CV_DATA[lang] : (window.CV_DATA ? window.CV_DATA.en : null);
    if (!cvData || !cvData.experience) return;

    // Find all experience entries for this company
    const matchingJobs = cvData.experience.filter(j =>
      slugifySegment(j.company) === slugifySegment(companyId) || j.company.toLowerCase().trim() === companyId.toLowerCase().trim() || j.id.toLowerCase() === companyId.toLowerCase()
    );

    if (matchingJobs.length === 0) return;

    // Sort roles: Present/Active first, then most recent end date descending
    matchingJobs.sort((a, b) => getEndDateValue(b.date) - getEndDateValue(a.date));

    const mainJob = matchingJobs[0];
    const logoEl = document.getElementById('company-modal-logo');
    const titleEl = document.getElementById('company-modal-title');
    const subTitleEl = document.getElementById('company-modal-subtitle');
    const aboutEl = document.getElementById('company-modal-about');
    const rolesListEl = document.getElementById('company-modal-roles-list');

    if (logoEl) {
      if (mainJob.logo) {
        logoEl.src = mainJob.logo;
        logoEl.alt = `${mainJob.role} \u2014 ${mainJob.company}`;
        logoEl.style.display = 'block';
      } else {
        logoEl.style.display = 'none';
      }
    }

    if (titleEl) titleEl.textContent = mainJob.company;
    if (subTitleEl) subTitleEl.textContent = (window.i18n && window.i18n.t) ? window.i18n.t('exp.company_modal.roles', lang) : 'Positions & Roles';

    if (aboutEl) {
      aboutEl.innerHTML = mainJob.optional_more_about_company || (window.i18n && window.i18n.t ? window.i18n.t('exp.about.company.btn', lang) : 'Company Info');
    }

    if (rolesListEl) {
      let rolesHtml = '';
      matchingJobs.forEach(job => {
        rolesHtml += `
          <li>
            <button class="company-modal-role-btn" data-target-exp="${job.id}" type="button">
              <div>
                <div class="company-modal-role-title">${job.role}</div>
                <div class="company-modal-role-date">${job.date}</div>
              </div>
              <span class="company-modal-role-arrow">&rarr;</span>
            </button>
          </li>
        `;
      });
      rolesListEl.innerHTML = rolesHtml;

      // Bind role button clicks: close modal & smooth scroll to target timeline item
      rolesListEl.querySelectorAll('.company-modal-role-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          const expId = btn.getAttribute('data-target-exp');

          window.closeCompanyModal();

          // 1. Reset filter bar to 'all' if active filter would hide this item
          const expFilterBar = document.getElementById('exp-filter-bar');
          if (expFilterBar) {
            const allBtn = expFilterBar.querySelector('.filter-btn[data-filter="all"]');
            if (allBtn && !allBtn.classList.contains('active')) {
              allBtn.click();
            }
          }

          // 2. Expand experience section if collapsed
          if (window.expandExperienceSection) {
            window.expandExperienceSection();
          }

          // 3. Update Browser URL bar to /{lang}/experience/{company_id}/{expId} (e.g. /pt/experience/kartado/kartado-systems-implementation-intern)
          const activeLang = (window.i18n && window.i18n.getCurrentLang) ? window.i18n.getCurrentLang() : 'pt';
          const targetJob = matchingJobs.find(j => j.id === expId);
          const compSlug = (targetJob && targetJob.company) ? slugifySegment(targetJob.company) : slugifySegment(companyId);
          if (window.history && window.history.pushState) {
            window.history.pushState(null, '', `/${activeLang}/experience/${compSlug}/${expId}`);
          }

          // 4. Scroll to target timeline element
          setTimeout(() => {
            let targetEl = document.getElementById(expId) || document.querySelector(`.timeline-item[data-exp-id="${expId}"]`);
            if (!targetEl) {
              const items = document.querySelectorAll('.timeline-item');
              items.forEach(item => {
                if (item.id === expId || (item.getAttribute('data-exp-id') === expId)) {
                  targetEl = item;
                }
              });
            }

            if (targetEl) {
              targetEl.classList.remove('hidden-collapsed');
              targetEl.style.display = '';
              expandExperienceCard(targetEl);

              const navH = document.getElementById('main-nav')?.offsetHeight || 70;
              const topPos = targetEl.getBoundingClientRect().top + window.scrollY - navH - 24;
              window.scrollTo({ top: Math.max(0, topPos), behavior: 'smooth' });

              targetEl.classList.add('highlight-flash');
              setTimeout(() => targetEl.classList.remove('highlight-flash'), 2500);
            }
          }, 150);
        });
      });
    }

    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    // Update URL route to /experience/experiences-select?company=companyId
    if (window.history && window.history.pushState) {
      const activeLang = (window.i18n && window.i18n.getCurrentLang) ? window.i18n.getCurrentLang() : 'pt';
      const compSlug = slugifySegment(companyId);
      window.history.pushState({ company: compSlug }, '', `/${activeLang}/experience/experiences-select?company=${encodeURIComponent(compSlug)}`);
    }
  };

  window.closeCompanyModal = function () {
    const modal = document.getElementById('company-mini-modal');
    if (!modal) return;

    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';

    // Update route back to /experience cleanly
    if (window.history && window.history.pushState && (window.location.pathname.includes('experience-select') || window.location.pathname.includes('experiences-select'))) {
      const activeLang = (window.i18n && window.i18n.getCurrentLang) ? window.i18n.getCurrentLang() : 'pt';
      window.history.pushState(null, '', `/${activeLang}/experience`);
    }
  };

  // Globally expose provider modal control functions (/courses-select)
  window.openProviderModal = function (providerId) {
    const modal = document.getElementById('provider-mini-modal');
    if (!modal) return;

    const lang = (window.i18n && window.i18n.getCurrentLang) ? window.i18n.getCurrentLang() : 'pt';
    const cvData = (window.CV_DATA && window.CV_DATA[lang]) ? window.CV_DATA[lang] : (window.CV_DATA ? window.CV_DATA.en : null);
    if (!cvData || !cvData.courses) return;

    const matchingCourses = cvData.courses.filter(c =>
      c.provider && (c.provider.toLowerCase().trim() === providerId.toLowerCase().trim() || c.provider.toLowerCase().replace(/\s+/g, '-') === providerId.toLowerCase())
    );

    if (matchingCourses.length === 0) return;

    // Sort: most recent to oldest
    matchingCourses.sort((a, b) => getEndDateValue(b.date) - getEndDateValue(a.date));

    const mainCourse = matchingCourses[0];
    const logoEl = document.getElementById('provider-modal-logo');
    const titleEl = document.getElementById('provider-modal-title');
    const subTitleEl = document.getElementById('provider-modal-subtitle');
    const credentialsListEl = document.getElementById('provider-modal-credentials-list');
    const coursesListEl = document.getElementById('provider-modal-courses-list');

    if (logoEl) {
      if (mainCourse.logo) {
        logoEl.src = mainCourse.logo;
        logoEl.alt = `${mainCourse.provider}`;
        logoEl.style.display = 'block';
      } else {
        logoEl.style.display = 'none';
      }
    }

    if (titleEl) titleEl.textContent = mainCourse.provider;
    if (subTitleEl) subTitleEl.textContent = (window.i18n && window.i18n.t) ? window.i18n.t('edu.provider_ticker.title', lang) : 'Course Providers';

    // Credential Links list (bullet point - link - (course name))
    if (credentialsListEl) {
      let credsHtml = '';
      const tCred = (window.i18n && window.i18n.t) ? window.i18n.t('course.credential.btn', lang) : 'Show Credential';
      matchingCourses.forEach(c => {
        if (c.credentialUrl) {
          credsHtml += `
            <li class="provider-credential-item">
              <span class="provider-credential-bullet">&bull;</span>
              <a href="${c.credentialUrl}" target="_blank" rel="noopener noreferrer" class="provider-credential-link">
                ${tCred}
              </a>
              <span class="provider-credential-course-name">(${c.name})</span>
            </li>
          `;
        }
      });
      credentialsListEl.innerHTML = credsHtml || `<li class="provider-credential-item" style="color:var(--color-text-muted);">—</li>`;
    }

    // All courses list for this provider
    if (coursesListEl) {
      let coursesHtml = '';
      matchingCourses.forEach(c => {
        coursesHtml += `
          <li>
            <button class="company-modal-role-btn" data-target-course="${c.id}" type="button">
              <div>
                <div class="company-modal-role-title">${c.name}</div>
                <div class="company-modal-role-date">${c.date}</div>
              </div>
              <span class="company-modal-role-arrow">&rarr;</span>
            </button>
          </li>
        `;
      });
      coursesListEl.innerHTML = coursesHtml;

      coursesListEl.querySelectorAll('.company-modal-role-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          const courseId = btn.getAttribute('data-target-course');

          window.closeProviderModal();

          const courseFilterBar = document.getElementById('course-filter-bar');
          if (courseFilterBar) {
            const allBtn = courseFilterBar.querySelector('.filter-btn[data-filter="all"]');
            if (allBtn && !allBtn.classList.contains('active')) {
              allBtn.click();
            }
          }

          const activeLang = (window.i18n && window.i18n.getCurrentLang) ? window.i18n.getCurrentLang() : 'pt';
          if (window.history && window.history.pushState) {
            window.history.pushState(null, '', `/${activeLang}/education/courses/${courseId}`);
          }

          setTimeout(() => {
            let targetEl = document.getElementById(courseId) || document.querySelector(`.course-card[id="${courseId}"]`);
            if (targetEl) {
              const navH = document.getElementById('main-nav')?.offsetHeight || 70;
              const topPos = targetEl.getBoundingClientRect().top + window.scrollY - navH - 24;
              window.scrollTo({ top: Math.max(0, topPos), behavior: 'smooth' });

              targetEl.classList.add('highlight-flash');
              setTimeout(() => targetEl.classList.remove('highlight-flash'), 2500);
            }
          }, 150);
        });
      });
    }

    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    // Update route to /education/courses-select?provider=providerId
    if (window.history && window.history.pushState) {
      const activeLang = (window.i18n && window.i18n.getCurrentLang) ? window.i18n.getCurrentLang() : 'pt';
      window.history.pushState({ provider: providerId }, '', `/${activeLang}/education/courses-select?provider=${encodeURIComponent(providerId)}`);
    }
  };

  window.closeProviderModal = function () {
    const modal = document.getElementById('provider-mini-modal');
    if (!modal) return;

    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';

    if (window.history && window.history.pushState && (window.location.pathname.includes('course-select') || window.location.pathname.includes('courses-select'))) {
      const activeLang = (window.i18n && window.i18n.getCurrentLang) ? window.i18n.getCurrentLang() : 'pt';
      window.history.pushState(null, '', `/${activeLang}/education`);
    }
  };

  // Close handlers on modal overlay and close button
  document.addEventListener('click', (e) => {
    if (e.target.closest('#company-modal-close-btn') || e.target.closest('[data-close-company-modal="true"]')) {
      window.closeCompanyModal();
    }
    if (e.target.closest('#provider-modal-close-btn') || e.target.closest('[data-close-provider-modal="true"]')) {
      window.closeProviderModal();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      const compModal = document.getElementById('company-mini-modal');
      if (compModal && compModal.classList.contains('active')) {
        window.closeCompanyModal();
      }
      const provModal = document.getElementById('provider-mini-modal');
      if (provModal && provModal.classList.contains('active')) {
        window.closeProviderModal();
      }
    }
  });

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

    const activeFilter = document.querySelector('#exp-filter-bar .filter-btn.active')?.getAttribute('data-filter') || 'all';
    const currentLang = lang || (window.i18n && window.i18n.getCurrentLang ? window.i18n.getCurrentLang() : 'en');
    const expandText = (window.i18n && window.i18n.t) ? (window.i18n.t('exp.card.expand', currentLang) || 'Expand details') : 'Expand details';
    const collapseText = (window.i18n && window.i18n.t) ? (window.i18n.t('exp.card.collapse', currentLang) || 'Collapse details') : 'Collapse details';

    let html = '';
    data.experience.forEach((job, idx) => {
      const delay = idx + 1;
      const isExpanded = (activeFilter !== 'all') || (idx === 0);
      const toggleLabel = isExpanded ? collapseText : expandText;

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
              <picture>
                <source srcset="${slide.src.replace(/\.(png|jpg|jpeg)$/i, '.webp')}" type="image/webp" />
                <img alt="${slide.alt}" class="evidence-thumb" src="${slide.src}" loading="lazy" decoding="async" />
              </picture>
            </div>
          `;
          dotsHtml += `
            <button aria-label="Image ${sIdx + 1}" aria-pressed="${ariaPressed}" class="evidence-dot ${isActive}" data-index="${sIdx}"></button>
          `;
        });

        carouselHtml = `
          <div class="evidence-carousel" data-job-id="${job.id}">
            <p class="evidence-label">${job.carousel.label}</p>
            <div class="evidence-slider-container">
              <button aria-label="Previous image" class="evidence-arrow prev" id="evidence-prev-${job.id}">&lt;</button>
              <div class="evidence-viewport">
                <div class="evidence-slide-track" id="evidence-track-${job.id}">
                  ${slidesHtml}
                </div>
              </div>
              <button aria-label="Next image" class="evidence-arrow next" id="evidence-next-${job.id}">&gt;</button>
            </div>
            <div class="evidence-dots" id="evidence-dots-${job.id}">
              ${dotsHtml}
            </div>
          </div>
        `;
      }

      let achievementsHtml = '';
      if (job.specificAchievements && job.specificAchievements.length > 0) {
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

      let aboutCompanyHtml = '';
      if (job.optional_more_about_company) {
        const btnLabel = window.i18n && window.i18n.t ? window.i18n.t('exp.about.company.btn', currentLang) : 'About the Company';
        const closeLbl = window.i18n && window.i18n.t ? window.i18n.t('exp.about.company.close', currentLang) : 'Close company info';
        const panelId = `about-company-${job.id}`;
        aboutCompanyHtml = `
          <div class="about-company-wrapper">
            <button
              class="about-company-btn credential-btn"
              aria-expanded="false"
              aria-controls="${panelId}"
              aria-label="${btnLabel} — ${job.company}"
              data-about-company-trigger
            >
              <span class="about-company-btn-icon" aria-hidden="true">&#9432;</span>
              <span>${btnLabel}</span>
            </button>
            <div
              class="about-company-panel"
              id="${panelId}"
              role="region"
              aria-label="${btnLabel} — ${job.company}"
              hidden
            >
              <button
                class="about-company-close"
                aria-label="${closeLbl}"
                data-about-company-close
              >&#10005;</button>
              <div class="about-company-content">${job.optional_more_about_company}</div>
            </div>
          </div>
        `;
      }

      const compSlug = job.company ? slugifySegment(job.company) : 'company';

      html += `
        <article class="timeline-item reveal reveal-delay-${delay} ${isExpanded ? 'is-expanded' : 'is-collapsed'}" id="${job.id}" data-exp-id="${job.id}" data-company-slug="${compSlug}" role="listitem">
          <div class="exp-card-box">
            <div class="exp-card-header">
              ${job.logo ? `
                <img src="${job.logo}" alt="${job.role} — ${job.company}" class="exp-card-logo" />
              ` : ''}
              <div class="exp-card-meta-wrap">
                <div class="timeline-meta">
                  <div class="timeline-title-group">
                    <span class="timeline-role">${job.role}</span>
                    <span class="timeline-company">${job.company}</span>
                  </div>
                  <span class="timeline-date">${job.date}</span>
                </div>
                <div aria-label="Technologies used at ${job.company}" class="exp-tags-scroll-row timeline-tags" role="list">
                  ${tagsHtml}
                </div>
              </div>
              <button
                type="button"
                class="exp-card-toggle-btn"
                aria-expanded="${isExpanded ? 'true' : 'false'}"
                aria-controls="exp-details-${job.id}"
                data-exp-card-toggle
              >
                <span class="exp-card-toggle-text">${toggleLabel}</span>
                <span class="exp-card-toggle-icon" aria-hidden="true">${isExpanded ? '&#9650;' : '&#9660;'}</span>
              </button>
            </div>
            <div class="exp-card-details" id="exp-details-${job.id}" role="region" aria-label="${job.role} at ${job.company}">
              ${achievementsHtml}
              ${aboutCompanyHtml}
              <div class="timeline-body-box">
                <ul aria-label="Responsibilities at ${job.company}" class="timeline-bullets" style="margin-top: 0;">
                  ${bulletsHtml}
                </ul>
                ${carouselHtml}
              </div>
            </div>
          </div>
        </article>
      `;
    });

    container.innerHTML = html;

    // Apply Experience limits/expansion logic
    applySectionLimits('exp-timeline', 4, activeFilter, sectionStates.experience);

    // Bind event delegation for card expansion toggle buttons
    if (!container.dataset.expCardToggleBound) {
      container.dataset.expCardToggleBound = '1';
      container.addEventListener('click', function handleExpCardToggle(e) {
        const toggleBtn = e.target.closest('[data-exp-card-toggle]');
        if (!toggleBtn) return;
        const item = toggleBtn.closest('.timeline-item');
        if (!item) return;

        const isExpanded = item.classList.contains('is-expanded');
        const expId = item.getAttribute('data-exp-id') || item.id;
        const compSlug = item.getAttribute('data-company-slug') || 'company';
        const activeLang = (window.i18n && window.i18n.getCurrentLang) ? window.i18n.getCurrentLang() : 'en';
        const expLabel = (window.i18n && window.i18n.t) ? (window.i18n.t('exp.card.expand', activeLang) || 'Expand details') : 'Expand details';
        const colLabel = (window.i18n && window.i18n.t) ? (window.i18n.t('exp.card.collapse', activeLang) || 'Collapse details') : 'Collapse details';

        if (isExpanded) {
          // Collapse card -> Revert URL 2 levels back to /{lang}/experience
          item.classList.remove('is-expanded');
          item.classList.add('is-collapsed');
          toggleBtn.setAttribute('aria-expanded', 'false');
          const textEl = toggleBtn.querySelector('.exp-card-toggle-text');
          const iconEl = toggleBtn.querySelector('.exp-card-toggle-icon');
          if (textEl) textEl.textContent = expLabel;
          if (iconEl) iconEl.innerHTML = '&#9660;';

          if (window.history && window.history.pushState) {
            window.history.pushState({ section: 'experience' }, '', `/${activeLang}/experience`);
          }
          if (window.i18n && window.i18n.t) {
            document.title = window.i18n.t('meta.title', activeLang);
          }
        } else {
          // Expand card -> Push URL to /{lang}/experience/{compSlug}/{expId}
          item.classList.remove('is-collapsed');
          item.classList.add('is-expanded');
          toggleBtn.setAttribute('aria-expanded', 'true');
          const textEl = toggleBtn.querySelector('.exp-card-toggle-text');
          const iconEl = toggleBtn.querySelector('.exp-card-toggle-icon');
          if (textEl) textEl.textContent = colLabel;
          if (iconEl) iconEl.innerHTML = '&#9650;';

          if (window.history && window.history.pushState) {
            window.history.pushState({ expId: expId, company: compSlug }, '', `/${activeLang}/experience/${compSlug}/${expId}`);
          }
          const roleEl = item.querySelector('.timeline-role');
          const compEl = item.querySelector('.timeline-company');
          if (roleEl && compEl) {
            document.title = `${roleEl.textContent.trim()} @ ${compEl.textContent.trim()} | Everson Filipe`;
          }
        }
      });
    }

    // ── About the Company toggle (event delegation, registrado 1x) ──
    // Guard: evita duplicar listeners a cada re-render (troca de idioma)
    if (!container.dataset.aboutCompanyBound) {
      container.dataset.aboutCompanyBound = '1';

      container.addEventListener('click', function handleAboutCompanyClick(e) {
        const trigger = e.target.closest('[data-about-company-trigger]');
        const closeBtn = e.target.closest('[data-about-company-close]');

        if (trigger) {
          const panelId = trigger.getAttribute('aria-controls');
          const panel = document.getElementById(panelId);
          if (!panel) return;
          const isOpen = trigger.getAttribute('aria-expanded') === 'true';
          trigger.setAttribute('aria-expanded', String(!isOpen));
          if (isOpen) {
            panel.hidden = true;
          } else {
            panel.hidden = false;
            panel.querySelector('[data-about-company-close]')?.focus();
          }
        }

        if (closeBtn) {
          const panel = closeBtn.closest('.about-company-panel');
          if (!panel) return;
          panel.hidden = true;
          const wrapper = panel.closest('.about-company-wrapper');
          const btn = wrapper?.querySelector('[data-about-company-trigger]');
          if (btn) {
            btn.setAttribute('aria-expanded', 'false');
            btn.focus();
          }
        }
      });

      // Fechar com Escape (WCAG SC 2.1.2)
      container.addEventListener('keydown', function handleAboutCompanyEsc(e) {
        if (e.key !== 'Escape') return;
        const openPanel = container.querySelector('.about-company-panel:not([hidden])');
        if (!openPanel) return;
        openPanel.hidden = true;
        const wrapper = openPanel.closest('.about-company-wrapper');
        const btn = wrapper?.querySelector('[data-about-company-trigger]');
        if (btn) {
          btn.setAttribute('aria-expanded', 'false');
          btn.focus();
        }
      });
    }
  }

  function expandExperienceCard(targetEl) {
    if (!targetEl) return;
    targetEl.classList.remove('is-collapsed');
    targetEl.classList.add('is-expanded');

    const toggleBtn = targetEl.querySelector('[data-exp-card-toggle]');
    if (toggleBtn) {
      toggleBtn.setAttribute('aria-expanded', 'true');
      const activeLang = (window.i18n && window.i18n.getCurrentLang) ? window.i18n.getCurrentLang() : 'pt';
      const colLabel = (window.i18n && window.i18n.t) ? (window.i18n.t('exp.card.collapse', activeLang) || 'Recolher detalhes') : 'Recolher detalhes';
      const textEl = toggleBtn.querySelector('.exp-card-toggle-text');
      const iconEl = toggleBtn.querySelector('.exp-card-toggle-icon');
      if (textEl) textEl.textContent = colLabel;
      if (iconEl) iconEl.innerHTML = '&#9650;';
    }
  }

  window.expandExperienceCard = expandExperienceCard;



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
                <img class="card-logo-img" src="${edu.logo}" alt="${edu.degree} — ${edu.institution}" />
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
                    <img src="${course.logo}" alt="${course.name} — ${course.provider}" style="width: 100%; height: 100%; object-fit: contain; border-radius: var(--radius-sm);" loading="lazy"/>
                  </a>
                ` : `
                  <img src="${course.logo}" alt="${course.name} — ${course.provider}" style="width: 100%; height: 100%; object-fit: contain; border-radius: var(--radius-sm);" loading="lazy"/>
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
                  <img class="card-logo-img" src="${vol.logo}" alt="${vol.role} — ${vol.org}" />
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
                  <img class="card-logo-img" src="${ev.logo}" alt="${ev.name} — ${ev.meta}" />
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
                <img class="card-logo-img" src="${ach.logo}" alt="${ach.title} — ${ach.issuer}" />
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

  function renderEndorsements(data, lang) {
    const container = document.getElementById('endorsements-list');
    if (!container) return;

    const currentLang = lang || ((window.i18n && window.i18n.getCurrentLang) ? window.i18n.getCurrentLang() : 'en');
    const t = (key) => (window.i18n && window.i18n.t) ? window.i18n.t(key, currentLang) : key;

    const endorsements = data.endorsements || [];
    if (endorsements.length === 0) {
      container.innerHTML = '';
      return;
    }

    const sorted = [...endorsements].sort((a, b) => getEndDateValue(b.date) - getEndDateValue(a.date));

    function resolveLinkedItem(id) {
      const activeLang = (window.i18n && window.i18n.getCurrentLang) ? window.i18n.getCurrentLang() : 'pt';
      const allData = window.CV_DATA;
      const langs = ['en', 'pt', 'es'];
      for (const l of langs) {
        const d = allData[l];
        if (!d) continue;
        const exp = (d.experience || []).find(e => e.id === id || (e.company && e.company.toLowerCase().trim() === id.toLowerCase().trim()));
        if (exp) {
          const compSlug = exp.company ? slugifySegment(exp.company) : 'company';
          return { label: exp.company || exp.role, icon: exp.logo || null, href: `/${activeLang}/experience/${compSlug}/${exp.id}` };
        }
        const ach = (d.achievements || []).find(a => a.id === id);
        if (ach) return { label: ach.title || ach.name, icon: ach.logo || null, href: `/${activeLang}/community/achievements/${ach.id}` };
        const hack = (d.hackathons || []).find(h => h.id === id);
        if (hack) return { label: hack.name, icon: hack.logo || null, href: `/${activeLang}/community/hackathons/${hack.id}` };
        const ev = (d.events || []).find(e => e.id === id);
        if (ev) return { label: ev.name, icon: ev.logo || null, href: `/${activeLang}/community/events/${ev.id}` };
        const vol = (d.volunteering || []).find(v => v.id === id);
        if (vol) return { label: vol.org || vol.role, icon: vol.logo || null, href: `/${activeLang}/community/volunteering/${vol.id}` };
        const edu = (d.education || []).find(e => e.id === id);
        if (edu) return { label: edu.institution || edu.degree, icon: edu.logo || null, href: `/${activeLang}/education/academic/${edu.id}` };
        const course = (d.courses || []).find(c => c.id === id);
        if (course) return { label: course.name, icon: course.logo || null, href: `/${activeLang}/education/courses/${course.id}` };
        const pub = (d.publications || []).find(p => p.id === id);
        if (pub) return { label: pub.name, icon: null, href: `/${activeLang}/education/publications/${pub.id}` };
      }
      return { label: id, icon: null, href: '#' };
    }

    let html = '';
    sorted.forEach((item) => {
      const linkedItems = (item.linkedTo || []).map(id => resolveLinkedItem(id));
      const linkedPillsHtml = linkedItems.map(link => `
        <a href="${link.href}" class="project-linked-badge" style="display:inline-flex; align-items:center; gap:var(--space-1); text-decoration:none;">
          ${link.icon ? `<img src="${link.icon}" alt="" style="width:14px; height:14px; object-fit:contain; border-radius:2px;" aria-hidden="true" />` : ''}
          <span>${link.label}</span>
        </a>
      `).join('');

      const proofImgHtml = item.image ? `
        <div class="endorsement-proof-wrapper" style="margin-top:var(--space-4); border-radius:var(--radius-md); overflow:hidden; border:1px solid var(--color-border-subtle); background:var(--color-bg-elevated);">
          <button type="button" class="endorsement-proof-btn" data-lightbox-src="${item.image}" data-lightbox-caption="${item.role} — ${item.company}" aria-label="View proof image" style="background:none; border:none; padding:0; width:100%; cursor:pointer; display:block;">
            <img src="${item.image}" alt="Professional endorsement by ${item.author}, ${item.role}" style="width:100%; max-height:220px; object-fit:cover; display:block; transition:transform var(--duration-fast);" loading="lazy" />
          </button>
        </div>
      ` : '';

      const proofLinkBtn = item.profileUrl ? `
        <a href="${item.profileUrl}" target="_blank" rel="noopener noreferrer" class="credential-btn" style="margin-top:var(--space-3); width:fit-content; display:inline-flex; align-items:center; gap:var(--space-2);">
          <span data-i18n="endorsements.credential.btn">${t('endorsements.credential.btn')}</span>
          <svg aria-hidden="true" width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 6h8M7 3l3 3-3 3"/></svg>
        </a>
      ` : '';

      html += `
        <article class="project-card endorsement-card" id="${item.id}" role="listitem" style="flex:0 0 min(100%, 380px); scroll-snap-align:start; display:flex; flex-direction:column; background:var(--color-bg-surface); border:1px solid var(--color-border-subtle); border-radius:var(--radius-lg); padding:var(--space-6); transition:border-color var(--duration-fast);">
          <header class="endorsement-card-header" style="display:flex; justify-content:space-between; align-items:flex-start; gap:var(--space-4); margin-bottom:var(--space-4);">
            <div>
              ${item.company ? `<p class="project-card-category" style="font-size:var(--text-xs); color:var(--color-accent-mist); text-transform:uppercase; letter-spacing:0.05em; font-weight:600;">${item.company}</p>` : ''}
              <h4 class="project-card-title" style="font-size:var(--text-lg); font-weight:700; color:var(--color-text-main); margin-block:var(--space-1);">${item.author}</h4>
              <p style="font-size:var(--text-xs); color:var(--color-text-muted); font-weight:500;">${item.role}</p>
            </div>
            <span class="project-card-date" style="font-size:var(--text-xs); color:var(--color-text-muted); background:var(--color-bg-elevated); padding:var(--space-1) var(--space-3); border-radius:var(--radius-full); white-space:nowrap;">${item.date}</span>
          </header>

          ${linkedPillsHtml ? `<div class="project-card-linked" style="margin-bottom:var(--space-4); display:flex; flex-wrap:wrap; gap:var(--space-2);"><span class="project-linked-label" style="font-size:var(--text-xs); color:var(--color-text-muted);">${t('projects.linked.label')}:</span>${linkedPillsHtml}</div>` : ''}

          <div class="endorsement-text-box" id="endorsement-text-${item.id}" style="font-size:var(--text-sm); line-height:var(--leading-relaxed); color:var(--color-text-muted); margin-bottom:var(--space-4); max-height:140px; overflow:hidden; transition:max-height var(--duration-normal) ease; position:relative;">
            ${item.textHtml || ''}
          </div>
          
          <button type="button" class="endorsement-toggle-btn credential-btn" data-target="endorsement-text-${item.id}" aria-expanded="false" style="align-self:flex-start; margin-bottom:var(--space-3);">
            <span class="toggle-btn-text">${t('endorsements.readMore')}</span>
          </button>

          ${proofImgHtml}
          ${proofLinkBtn}
        </article>
      `;
    });

    const noticeHtml = `
      <aside class="hackathon-item endorsement-notice-card" style="margin-bottom:var(--space-6); background:var(--color-bg-surface); border:1px solid var(--color-border-subtle); border-radius:var(--radius-md); padding:var(--space-4); display:flex; align-items:flex-start; gap:var(--space-3);" aria-label="Endorsements note">
        <span style="color:var(--color-accent-mist); font-size:var(--text-base); flex-shrink:0; margin-top:1px;" aria-hidden="true">&#9432;</span>
        <div style="font-size:var(--text-xs); line-height:var(--leading-relaxed); color:var(--color-text-muted);">
          <span data-i18n="endorsements.notice.text">${t('endorsements.notice.text')}</span>
        </div>
      </aside>
    `;

    container.innerHTML = `
      ${noticeHtml}
      <div class="slider-wrapper">
        <div class="endorsements-slider-track" id="endorsements-slider-track" role="list" style="display:flex; gap:var(--space-6); overflow-x:auto; scroll-snap-type:x mandatory; scrollbar-width:none; padding-bottom:var(--space-4);">
          ${html}
        </div>
        <div class="slider-controls" style="display:flex; justify-content:flex-end; gap:var(--space-3); margin-top:var(--space-4);">
          <button class="slider-arrow-btn prev-end-btn" aria-label="Scroll left">
            <svg aria-hidden="true" viewBox="0 0 24 24" style="width:20px; height:20px; fill:none; stroke:currentColor; stroke-width:2;"><path d="M15 18l-6-6 6-6" /></svg>
          </button>
          <button class="slider-arrow-btn next-end-btn" aria-label="Scroll right">
            <svg aria-hidden="true" viewBox="0 0 24 24" style="width:20px; height:20px; fill:none; stroke:currentColor; stroke-width:2;"><path d="M9 18l6-6-6-6" /></svg>
          </button>
        </div>
      </div>
    `;

    setupSlider('endorsements-slider-track', '.prev-end-btn', '.next-end-btn', 3);

    container.querySelectorAll('.endorsement-toggle-btn').forEach(btn => {
      const targetId = btn.getAttribute('data-target');
      const box = document.getElementById(targetId);
      if (!box) return;

      // Smart check: hide toggle button if text fits without overflowing 145px
      if (box.scrollHeight <= 145) {
        btn.style.display = 'none';
        box.style.maxHeight = 'none';
      } else {
        btn.style.display = 'inline-flex';
        box.style.maxHeight = '140px';
      }

      btn.addEventListener('click', () => {
        const textSpan = btn.querySelector('.toggle-btn-text');
        const isExpanded = btn.getAttribute('aria-expanded') === 'true';
        if (isExpanded) {
          box.style.maxHeight = '140px';
          btn.setAttribute('aria-expanded', 'false');
          if (textSpan) textSpan.textContent = t('endorsements.readMore');
        } else {
          box.style.maxHeight = '1000px';
          btn.setAttribute('aria-expanded', 'true');
          if (textSpan) textSpan.textContent = t('endorsements.readLess');
        }
      });
    });
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
        const compSlug = job.company ? slugifySegment(job.company) : 'company';
        expDropdownHtml += `
          <li role="none">
            <a href="/${lang}/experience/${compSlug}/${job.id}" data-route="experience/${job.id}" class="nav-dropdown-link" role="menuitem">
              <span class="nav-dropdown-role"${titleOpacity}>${job.role}</span>
              <span class="nav-dropdown-company">${job.company}</span>
            </a>
          </li>
        `;
      });

      const tEndorsements = (window.i18n && window.i18n.t) ? window.i18n.t('nav.experience.endorsements', lang) : 'Recomendações';
      expDropdownHtml += `
        <li role="none" style="border-top:1px solid var(--color-border-subtle); margin-top:var(--space-2); padding-top:var(--space-2);">
          <a href="/${lang}/experience/endorsements" data-route="experience/endorsements" class="nav-dropdown-link" role="menuitem">
            <span class="nav-dropdown-role" style="font-weight:600; color:var(--color-accent-mist);">${tEndorsements}</span>
          </a>
        </li>
      `;
      expDropdown.innerHTML = expDropdownHtml;
    }

    // 2. Education nav dropdown
    const eduDropdown = document.getElementById('nav-dropdown-education');
    if (eduDropdown) {
      const tAcademic = (window.i18n && window.i18n.t) ? window.i18n.t('edu.overline', lang) : 'Academic Background';
      const tCourses = (window.i18n && window.i18n.t) ? window.i18n.t('edu.courses.label', lang) : 'Courses';
      const tPubs = (window.i18n && window.i18n.t) ? window.i18n.t('edu.publications.label', lang) : 'Articles & Publications';

      eduDropdown.innerHTML = `
        <li role="none">
          <a href="/${lang}/education/academic" data-route="education/academic" class="nav-dropdown-link" role="menuitem">
            <span class="nav-dropdown-role">${tAcademic}</span>
          </a>
        </li>
        <li role="none">
          <a href="/${lang}/education/courses" data-route="education/courses" class="nav-dropdown-link" role="menuitem">
            <span class="nav-dropdown-role">${tCourses}</span>
          </a>
        </li>
        <li role="none">
          <a href="/${lang}/education/publications" data-route="education/publications" class="nav-dropdown-link" role="menuitem">
            <span class="nav-dropdown-role">${tPubs}</span>
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
      const tVol = (window.i18n && window.i18n.t) ? window.i18n.t('community.volunteering', lang) : 'Volunteering';
      const tHack = (window.i18n && window.i18n.t) ? window.i18n.t('community.hackathons', lang) : 'Hackathons';
      const tEvent = (window.i18n && window.i18n.t) ? window.i18n.t('community.events', lang) : 'Events';
      const tAch = (window.i18n && window.i18n.t) ? window.i18n.t('community.achievements', lang) : 'Achievements';
      const tBlog = (window.i18n && window.i18n.t) ? window.i18n.t('blog.title', lang) : 'Blog';

      commDropdown.innerHTML = `
        <li role="none">
          <a href="/${lang}/community/volunteering" data-route="community/volunteering" class="nav-dropdown-link" role="menuitem">
            <span class="nav-dropdown-role">${tVol}</span>
          </a>
        </li>
        <li role="none">
          <a href="/${lang}/community/hackathons" data-route="community/hackathons" class="nav-dropdown-link" role="menuitem">
            <span class="nav-dropdown-role">${tHack}</span>
          </a>
        </li>
        <li role="none">
          <a href="/${lang}/community/events" data-route="community/events" class="nav-dropdown-link" role="menuitem">
            <span class="nav-dropdown-role">${tEvent}</span>
          </a>
        </li>
        <li role="none">
          <a href="/${lang}/community/achievements" data-route="community/achievements" class="nav-dropdown-link" role="menuitem">
            <span class="nav-dropdown-role">${tAch}</span>
          </a>
        </li>
        <li role="none">
          <a href="/${lang}/community/blog" data-route="community/blog" class="nav-dropdown-link" role="menuitem">
            <span class="nav-dropdown-role">${tBlog}</span>
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

  // ── Blog Section ─────────────────────────────────────────────────
  function renderBlog(lang) {
    const track = document.getElementById('blog-carousel-track');
    const dotsContainer = document.getElementById('blog-carousel-dots');
    const prevBtn = document.getElementById('blog-prev-btn');
    const nextBtn = document.getElementById('blog-next-btn');
    if (!track) return;

    const currentLang = lang || (window.i18n && window.i18n.getCurrentLang ? window.i18n.getCurrentLang() : 'en');
    const t = (key) => (window.i18n && window.i18n.t) ? window.i18n.t(key, currentLang) : key;

    const posts = (window.BLOG_DATA || []).slice().sort((a, b) => {
      return new Date(b.publishedAt) - new Date(a.publishedAt);
    });

    // Update static i18n elements in blog section
    document.querySelectorAll('.blog-section [data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      el.textContent = t(key);
    });

    if (posts.length === 0) {
      track.innerHTML = `<div class="blog-card blog-card--empty" role="listitem"><p style="color:var(--color-text-muted);font-family:var(--font-primary);">— ${t('blog.overline')} —</p></div>`;
      if (dotsContainer) dotsContainer.innerHTML = '';
      return;
    }

    // Build cards
    let cardsHtml = '';
    let dotsHtml = '';
    posts.forEach((post, idx) => {
      const loc = post[currentLang] || post.en || {};
      const title = loc.title || '';
      const summary = loc.summary || '';
      const dateFormatted = post.publishedAt
        ? new Intl.DateTimeFormat(currentLang === 'pt' ? 'pt-BR' : currentLang === 'es' ? 'es' : 'en-US', { year: 'numeric', month: 'long', day: 'numeric' }).format(new Date(post.publishedAt + 'T12:00:00'))
        : '';

      const coverHtml = post.coverImage
        ? `<div class="blog-card-cover"><img src="${post.coverImage}" alt="${title}" loading="lazy" /></div>`
        : `<div class="blog-card-cover blog-card-cover--placeholder" aria-hidden="true"><svg fill="none" stroke="currentColor" stroke-width="1.2" viewBox="0 0 40 24"><path d="M4 4h32v16H4z" rx="2"/><path d="M4 8h32M12 4v16"/></svg></div>`;

      cardsHtml += `
        <article class="blog-card" id="blog-card-${post.id}" role="listitem" data-post-id="${post.id}" tabindex="0" aria-label="${title}">
          ${coverHtml}
          <div class="blog-card-body">
            <p class="blog-card-date">${t('blog.published')} ${dateFormatted}</p>
            <h3 class="blog-card-title">${title}</h3>
            <p class="blog-card-summary">${summary}</p>
            <button class="blog-card-read-btn credential-btn" aria-label="${t('blog.read.btn')}: ${title}" data-blog-read="${post.id}">
              <span>${t('blog.read.btn')}</span>
              <svg aria-hidden="true" width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 6h8M7 3l3 3-3 3"/></svg>
            </button>
          </div>
        </article>`;

      dotsHtml += `<button class="blog-carousel-dot${idx === 0 ? ' active' : ''}" aria-label="Post ${idx + 1}" data-blog-dot="${idx}" type="button"></button>`;
    });

    track.innerHTML = cardsHtml;
    if (dotsContainer) dotsContainer.innerHTML = dotsHtml;

    // ── Carousel navigation ─────────────────────────────────────────
    let currentIdx = 0;
    const cards = track.querySelectorAll('.blog-card');
    const dots = dotsContainer ? dotsContainer.querySelectorAll('.blog-carousel-dot') : [];

    function goToSlide(idx) {
      currentIdx = Math.max(0, Math.min(idx, cards.length - 1));
      track.style.transform = `translateX(-${currentIdx * 100}%)`;
      dots.forEach((d, i) => d.classList.toggle('active', i === currentIdx));

      // Intelligent arrow visibility logic:
      // - If 0 or 1 post: hide both arrows
      // - At index 0 (most recent post): hide prevBtn (left), show nextBtn (if posts > 1)
      // - At index > 0: show prevBtn (left)
      // - At last post: hide nextBtn (right)
      if (cards.length <= 1) {
        if (prevBtn) prevBtn.style.display = 'none';
        if (nextBtn) nextBtn.style.display = 'none';
      } else {
        if (prevBtn) {
          prevBtn.style.display = currentIdx === 0 ? 'none' : 'flex';
          prevBtn.disabled = currentIdx === 0;
        }
        if (nextBtn) {
          nextBtn.style.display = currentIdx === cards.length - 1 ? 'none' : 'flex';
          nextBtn.disabled = currentIdx === cards.length - 1;
        }
      }
    }

    goToSlide(0);

    // Guard: attach carousel controls only once per blog section init
    if (prevBtn && !prevBtn.dataset.blogBound) {
      prevBtn.dataset.blogBound = '1';
      prevBtn.addEventListener('click', () => goToSlide(currentIdx - 1));
    }
    if (nextBtn && !nextBtn.dataset.blogBound) {
      nextBtn.dataset.blogBound = '1';
      nextBtn.addEventListener('click', () => goToSlide(currentIdx + 1));
    }
    dots.forEach((dot, i) => {
      dot.addEventListener('click', () => goToSlide(i));
    });

    // Cards: keyboard support (Enter/Space to open modal)
    cards.forEach(card => {
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          const btn = card.querySelector('[data-blog-read]');
          if (btn) btn.click();
        }
      });
    });

    // ── Markdown Parser (marked.js CDN + Zero-dependency Fallback) ──
    function renderMarkdown(md) {
      if (!md) return '';
      let text = String(md).replace(/\r\n/g, '\n').replace(/\r/g, '\n').trim();

      try {
        if (window.marked) {
          if (typeof window.marked.parse === 'function') {
            return window.marked.parse(text, { breaks: true, gfm: true });
          } else if (typeof window.marked === 'function') {
            return window.marked(text, { breaks: true, gfm: true });
          }
        }
      } catch (e) { }

      let html = text
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');

      html = html.replace(/```([a-z0-9_-]*)\n([\s\S]*?)```/gim, (match, lang, code) => {
        return `<pre><code class="language-${lang}">${code.trim()}</code></pre>`;
      });

      html = html.replace(/`([^`\n]+)`/g, '<code>$1</code>');

      html = html
        .replace(/^#### (.*$)/gim, '<h4>$1</h4>')
        .replace(/^### (.*$)/gim, '<h3>$1</h3>')
        .replace(/^## (.*$)/gim, '<h2>$1</h2>')
        .replace(/^# (.*$)/gim, '<h1>$1</h1>');

      html = html.replace(/^---$/gim, '<hr />').replace(/^\*\*\*$/gim, '<hr />');

      html = html
        .replace(/\*\*\*(.*?)\*\*\*/g, '<strong><em>$1</em></strong>')
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.*?)\*/g, '<em>$1</em>');

      html = html.replace(/^&gt;\s?(.*$)/gim, '<blockquote>$1</blockquote>');

      html = html.replace(/^\|(.+)\|$/gim, (match) => {
        if (match.includes('---')) return '<!-- tbl-hr -->';
        const cells = match.split('|').filter(c => c.trim() !== '');
        return '<tr>' + cells.map(c => `<td>${c.trim()}</td>`).join('') + '</tr>';
      });
      html = html.replace(/<!-- tbl-hr -->\n?/g, '');
      html = html.replace(/(<tr>.*<\/tr>\n?)+/g, (match) => `<table><tbody>${match}</tbody></table>`);

      html = html.replace(/^[\-\*]\s+(.*$)/gim, '<li>$1</li>');
      html = html.replace(/(<li>.*<\/li>\n?)+/g, (match) => `<ul>${match}</ul>`);

      html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');

      const blocks = html.split(/\n\n+/);
      html = blocks.map(block => {
        const b = block.trim();
        if (!b) return '';
        if (/^<(h[1-6]|ul|ol|li|blockquote|pre|table|tr|hr)/i.test(b)) {
          return b;
        }
        return `<p>${b.replace(/\n/g, '<br />')}</p>`;
      }).join('\n');

      return html;
    }
    window.renderMarkdown = renderMarkdown;

    // ── Global Blog Modal Renderer ──────────────────────────────────
    function openBlogModal(postId, targetLang) {
      const modal = document.getElementById('blog-modal');
      if (!modal || !window.BLOG_DATA) return;

      const currentLang = targetLang || (window.i18n && window.i18n.getCurrentLang ? window.i18n.getCurrentLang() : 'pt');
      const posts = window.BLOG_DATA || [];
      const post = posts.find(p => p.id === postId);
      if (!post) return;

      const loc = post[currentLang] || post.en || {};
      const modalContainer = modal.querySelector('.blog-modal-container');
      const modalTitle = document.getElementById('blog-modal-title');
      const modalBody = document.getElementById('blog-modal-body');
      const modalDate = document.getElementById('blog-modal-date');
      const modalClose = document.getElementById('blog-modal-close');
      const shareBtn = document.getElementById('blog-modal-share-btn');

      const dateFormatted = post.publishedAt
        ? new Intl.DateTimeFormat(
          currentLang === 'pt' ? 'pt-BR' : currentLang === 'es' ? 'es' : 'en-US',
          { year: 'numeric', month: 'long', day: 'numeric' }
        ).format(new Date(post.publishedAt + 'T12:00:00'))
        : '';

      const tPub = (window.i18n && window.i18n.t) ? window.i18n.t('blog.published', currentLang) : 'Published';
      const tClose = (window.i18n && window.i18n.t) ? window.i18n.t('blog.close.btn', currentLang) : 'Close article';
      const tShare = (window.i18n && window.i18n.t) ? window.i18n.t('blog.share.btn', currentLang) : 'Copy link';

      if (modalTitle) modalTitle.textContent = loc.title || '';
      if (modalDate) modalDate.textContent = post.publishedAt ? `${tPub} ${dateFormatted}` : '';
      if (modalClose) modalClose.setAttribute('aria-label', tClose);

      const shareTextEl = document.getElementById('blog-modal-share-text');
      if (shareTextEl) shareTextEl.textContent = tShare;

      if (shareBtn && !shareBtn.dataset.bound) {
        shareBtn.dataset.bound = '1';
        shareBtn.addEventListener('click', () => {
          const currentModalPost = modal.dataset.currentPost;
          if (!currentModalPost) return;
          const activeLang = window.i18n ? window.i18n.getCurrentLang() : 'pt';
          const shareUrl = `https://eversonfilipe-portfolio.netlify.app/${activeLang}/community/blog/${currentModalPost}`;

          navigator.clipboard.writeText(shareUrl).then(() => {
            const btnTextEl = document.getElementById('blog-modal-share-text');
            const copiedLabel = (window.i18n && window.i18n.t) ? window.i18n.t('blog.share.copied', activeLang) : 'Copied!';
            if (btnTextEl) btnTextEl.textContent = copiedLabel;
            shareBtn.classList.add('copied');

            setTimeout(() => {
              const resetLabel = (window.i18n && window.i18n.t) ? window.i18n.t('blog.share.btn', activeLang) : 'Copy link';
              if (btnTextEl) btnTextEl.textContent = resetLabel;
              shareBtn.classList.remove('copied');
            }, 2000);
          }).catch(err => {
            console.warn('Unable to copy share link:', err);
          });
        });
      }

      if (modalBody) {
        modalBody.innerHTML = window.renderMarkdown(loc.content || '');
      }

      modal.dataset.currentPost = postId;
      modal.hidden = false;
      document.body.style.overflow = 'hidden';
      if (modalContainer) {
        modalContainer.scrollTop = 0;
        modalContainer.focus();
      }
    }
    window.openBlogModal = openBlogModal;

    // Lightweight fallback Markdown parser (no dependencies)
    function simpleMarkdown(md) {
      return md
        // Escape HTML entities first
        .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
        // Headings
        .replace(/^### (.+)$/gm, '<h3>$1</h3>')
        .replace(/^## (.+)$/gm, '<h2>$1</h2>')
        .replace(/^# (.+)$/gm, '<h1>$1</h1>')
        // Bold + italic
        .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.+?)\*/g, '<em>$1</em>')
        // Inline code
        .replace(/`([^`]+)`/g, '<code>$1</code>')
        // Horizontal rule
        .replace(/^---$/gm, '<hr />')
        // Table (simple: | col | col |)
        .replace(/\|(.+)\|/g, (match) => {
          const cells = match.split('|').filter(c => c.trim() !== '');
          const isHeader = false;
          return '<tr>' + cells.map(c => `<td>${c.trim()}</td>`).join('') + '</tr>';
        })
        // Blockquote
        .replace(/^> (.+)$/gm, '<blockquote>$1</blockquote>')
        // Unordered list items
        .replace(/^[\-\*] (.+)$/gm, '<li>$1</li>')
        // Paragraphs (double newline)
        .replace(/\n\n(?!<[hH]|<li|<hr|<block)/g, '</p><p>')
        // Wrap in paragraphs
        .replace(/^(?!<[hH1-6]|<li|<hr|<block|<tr)(.+)$/gm, (line) => line.startsWith('<') ? line : `<p>${line}</p>`)
        // Wrap consecutive <li> in <ul>
        .replace(/(<li>.*<\/li>\n?)+/g, (match) => `<ul>${match}</ul>`)
        // Clean up empty <p></p>
        .replace(/<p><\/p>/g, '');
    }

    // ── Blog Modal Infrastructure ──────────────────────────────────
    const modal = document.getElementById('blog-modal');
    if (modal && !modal.dataset.blogModalBound) {
      modal.dataset.blogModalBound = '1';
      const modalContainer = modal.querySelector('.blog-modal-container');
      const modalClose = document.getElementById('blog-modal-close');
      const modalBackdrop = document.getElementById('blog-modal-backdrop');

      function closeModal() {
        modal.hidden = true;
        document.body.style.overflow = '';
        const postId = modal.dataset.currentPost;
        if (postId) {
          const triggerCard = document.getElementById(`blog-card-${postId}`);
          if (triggerCard) triggerCard.focus();
        }
      }

      if (modalClose) modalClose.addEventListener('click', closeModal);
      if (modalBackdrop) modalBackdrop.addEventListener('click', closeModal);

      // ESC close (WCAG SC 2.1.2)
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !modal.hidden) closeModal();
      });

      // Focus trap within modal
      modal.addEventListener('keydown', (e) => {
        if (e.key !== 'Tab' || !modalContainer) return;
        const focusable = Array.from(
          modalContainer.querySelectorAll('a, button, input, [tabindex]:not([tabindex="-1"])')
        ).filter(el => !el.disabled);
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey) {
          if (document.activeElement === first) { e.preventDefault(); last.focus(); }
        } else {
          if (document.activeElement === last) { e.preventDefault(); first.focus(); }
        }
      });
    }

    // Re-bind read button delegation on track
    track.addEventListener('click', (e) => {
      const btn = e.target.closest('[data-blog-read]');
      if (btn && window.openBlogModal) {
        window.openBlogModal(btn.getAttribute('data-blog-read'));
      }
    });
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
    renderCompanyTicker(data, lang);
    renderProviderTicker(data, lang);
    renderExperience(data, lang);
    renderEndorsements(data, lang);
    renderEducation(data);
    renderProjects(data, lang);
    renderCertifications(data);
    renderCommunity(data);
    renderBlog(lang);
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
