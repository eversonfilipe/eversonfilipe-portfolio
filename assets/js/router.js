/**
 * router.js — Dynamic Client-Side Router for Everson Filipe Portfolio
 *
 * Clean, hierarchical, SEO/LLMO-optimized URLs:
 *   - /{lang}                                (e.g., /pt, /en, /es)
 *   - /{lang}/{section}                      (e.g., /pt/experience, /en/projects, /pt/community)
 *   - /{lang}/community/{subsection}         (e.g., /pt/community/volunteering, /pt/community/hackathons, /pt/community/events, /pt/community/achievements, /pt/community/blog)
 *   - /{lang}/{section}/{slug}               (e.g., /pt/experience/kartado, /en/community/blog/post-slug)
 *
 * Full Bidirectional Synchronization:
 *   1. URL -> UI: Initializes language, scrolls to section/subsection without jump glitches.
 *   2. UI -> URL: Updates history state (pushState/replaceState) on nav click, language change, modal open/close.
 *   3. SEO/LLMO: Dynamic canonical link, OpenGraph tags, Page Titles, and JSON-LD schema injection.
 */
(function DynamicRouter() {
  'use strict';

  const SUPPORTED_LANGS = ['en', 'pt', 'es'];
  const DEFAULT_LANG = 'pt';
  const CANONICAL_BASE = 'https://eversonfilipe-portfolio.netlify.app';

  // Flag to prevent infinite navigation loops
  let isNavigating = false;

  function normalizeLang(lang) {
    if (!lang) return null;
    const l = lang.toLowerCase().trim();
    return SUPPORTED_LANGS.includes(l) ? l : null;
  }

  function slugifySegment(str) {
    if (!str) return '';
    return str.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
  }

  /**
   * Parses any URL path string into route components (lang, section, subsection, slug)
   */
  function parseRouteFromUrl(urlPath) {
    let cleanPath = urlPath || window.location.pathname;

    // Handle hash fallback if pathname is root and hash starts with #/
    if ((cleanPath === '/' || cleanPath === '/index.html') && window.location.hash.startsWith('#/')) {
      cleanPath = window.location.hash.substring(1);
    }

    cleanPath = cleanPath.split('?')[0].split('#')[0];

    const segments = cleanPath.split('/')
      .map(s => decodeURIComponent(s.trim()))
      .filter(Boolean);

    let lang = null;
    let section = null;
    let subsection = null;
    let slug = null;

    // 1. Language prefix
    if (segments.length > 0 && normalizeLang(segments[0])) {
      lang = normalizeLang(segments[0]);
      segments.shift();
    }

    // 2. Section & Subsection & Slug
    if (segments.length > 0) {
      const seg0 = segments[0].toLowerCase();
      if (['experience', 'experiencia', 'experiences', 'experience-select', 'experiences-select'].includes(seg0)) {
        section = 'experience';
        if (['experience-select', 'experiences-select'].includes(seg0)) {
          subsection = 'experience-select';
        }
        if (segments.length > 1) {
          const seg1 = segments[1].toLowerCase();
          if (['endorsements', 'endorsement', 'recomendacoes', 'recomendacao', 'avales'].includes(seg1)) {
            subsection = 'endorsements';
          } else if (['select', 'experience-select', 'experiences-select'].includes(seg1)) {
            subsection = 'experience-select';
          } else if (segments.length > 2) {
            // Format: /experience/{company_id}/{role_id}
            slug = segments[2];
          } else {
            slug = segments[1];
          }
        }
      } else if (seg0 === 'community') {
        section = 'community';
        if (segments.length > 1) {
          const seg1 = segments[1].toLowerCase();
          if (['volunteering', 'voluntariado', 'hackathons', 'events', 'eventos', 'achievements', 'conquistas', 'blog'].includes(seg1)) {
            if (seg1 === 'voluntariado') subsection = 'volunteering';
            else if (seg1 === 'eventos') subsection = 'events';
            else if (seg1 === 'conquistas') subsection = 'achievements';
            else subsection = seg1;

            if (segments.length > 2) {
              slug = segments[2];
            }
          } else {
            slug = segments[1];
          }
        }
      } else if (seg0 === 'education') {
        section = 'education';
        if (segments.length > 1) {
          const seg1 = segments[1].toLowerCase();
          if (['academic', 'formacao', 'academic-formation', 'background', 'courses', 'cursos', 'publications', 'publicacoes', 'articles', 'artigos'].includes(seg1)) {
            if (['academic', 'formacao', 'academic-formation', 'background'].includes(seg1)) subsection = 'academic';
            else if (['courses', 'cursos'].includes(seg1)) subsection = 'courses';
            else if (['publications', 'publicacoes', 'articles', 'artigos'].includes(seg1)) subsection = 'publications';

            if (segments.length > 2) {
              slug = segments[2];
            }
          } else {
            slug = segments[1];
          }
        }
      } else if (seg0 === 'blog') {
        section = 'community';
        subsection = 'blog';
        if (segments.length > 1) slug = segments[1];
      } else {
        let isExpSlug = false;
        if (window.CV_DATA) {
          const allExps = [];
          ['en', 'pt', 'es'].forEach(l => {
            if (window.CV_DATA[l] && window.CV_DATA[l].experience) {
              window.CV_DATA[l].experience.forEach(e => allExps.push(e.id));
            }
          });
          if (allExps.includes(seg0)) {
            section = 'experience';
            slug = seg0;
            isExpSlug = true;
          }
        }
        if (!isExpSlug) {
          section = seg0;
          if (segments.length > 1) slug = segments[1];
        }
      }
    }

    // Fallback language if not in URL
    if (!lang) {
      lang = (window.i18n && window.i18n.getCurrentLang)
        ? window.i18n.getCurrentLang()
        : DEFAULT_LANG;
    }

    return { lang, section, subsection, slug };
  }

  /**
   * Parses current location into route components
   */
  function parseRoute() {
    return parseRouteFromUrl(window.location.pathname);
  }

  /**
   * Constructs a canonical URL path string from route components
   */
  function buildPath(lang, section, subsection, slug) {
    const l = normalizeLang(lang) || DEFAULT_LANG;
    let path = `/${l}`;

    if (section) {
      if (section === 'community') {
        path += `/community`;
        if (subsection) {
          path += `/${subsection}`;
          if (slug) {
            path += `/${slug}`;
          }
        } else if (slug) {
          path += `/${slug}`;
        }
      } else if (section === 'education') {
        path += `/education`;
        if (subsection) {
          path += `/${subsection}`;
          if (slug) {
            path += `/${slug}`;
          }
        } else if (slug) {
          path += `/${slug}`;
        }
      } else if (section === 'experience') {
        path += `/experience`;
        if (subsection) {
          if (subsection === 'experience-select' || subsection === 'experiences-select') {
            path += `/experiences-select`;
          } else {
            path += `/${subsection}`;
          }
        } else if (slug) {
          let companySlug = null;
          if (window.CV_DATA) {
            const cvData = window.CV_DATA[l] || window.CV_DATA.pt || window.CV_DATA.en;
            if (cvData && cvData.experience) {
              const job = cvData.experience.find(j => j.id === slug);
              if (job && job.company) {
                companySlug = slugifySegment(job.company);
              }
            }
          }
          if (companySlug) {
            path += `/${companySlug}/${slug}`;
          } else {
            path += `/${slug}`;
          }
        }
      } else {
        path += `/${section}`;
        if (slug) {
          path += `/${slug}`;
        }
      }
    }

    return path;
  }

  /**
   * Updates Document Title, Canonical Link, OpenGraph, Twitter Card, and JSON-LD schema.
   * Ensures Prerender.io snapshots per route carry full social-sharing meta.
   */
  function updateMetadata(route) {
    const { lang, section, subsection, slug } = route;
    const path = buildPath(lang, section, subsection, slug);
    const canonicalUrl = `${CANONICAL_BASE}${path}`;

    // ── Helper: set OG + Twitter meta tags ──────────────────────────────────
    function setMetaTags(title, description, imageUrl) {
      const ogTitle     = document.querySelector('meta[property="og:title"]');
      const ogDesc      = document.querySelector('meta[property="og:description"]');
      const ogImg       = document.querySelector('meta[property="og:image"]');
      const ogUrl       = document.querySelector('meta[property="og:url"]');
      const twTitle     = document.querySelector('meta[name="twitter:title"]');
      const twDesc      = document.querySelector('meta[name="twitter:description"]');
      const twImg       = document.querySelector('meta[name="twitter:image"]');
      const metaDesc    = document.querySelector('meta[name="description"]');

      if (ogTitle) ogTitle.content   = title;
      if (ogDesc)  ogDesc.content    = description;
      if (ogImg && imageUrl) ogImg.content = imageUrl;
      if (ogUrl)   ogUrl.content     = canonicalUrl;
      if (twTitle) twTitle.content   = title;
      if (twDesc)  twDesc.content    = description;
      if (twImg && imageUrl) twImg.content = imageUrl;
      if (metaDesc) metaDesc.content = description;
    }

    // 1. Update Canonical Link
    let canonicalTag = document.querySelector('link[rel="canonical"]');
    if (!canonicalTag) {
      canonicalTag = document.createElement('link');
      canonicalTag.rel = 'canonical';
      document.head.appendChild(canonicalTag);
    }
    canonicalTag.href = canonicalUrl;

    // 2. Dynamic Title, OG & Twitter per route
    if (section === 'community' && subsection === 'blog' && slug) {
      const posts = window.BLOG_DATA || [];
      const post = posts.find(p => p.id === slug);
      if (post) {
        const loc = post[lang] || post.en || {};
        const postTitle   = loc.title || 'Blog Post';
        const postSummary = (post.seo && post.seo.description) || loc.summary || '';
        const postImage   = post.image || `${CANONICAL_BASE}/assets/images/profile.png`;

        document.title = `${postTitle} | Blog — Everson Filipe`;
        setMetaTags(`${postTitle} | Blog — Everson Filipe`, postSummary, postImage);

        injectJSONLD('dynamic-blog-jsonld', {
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          "headline": postTitle,
          "description": postSummary,
          "datePublished": post.publishedAt,
          "author": {
            "@type": "Person",
            "name": "Everson Filipe",
            "url": CANONICAL_BASE
          },
          "mainEntityOfPage": canonicalUrl
        });
        return;
      }
    }

    if (section === 'education' && subsection) {
      let key = 'edu.overline';
      if (subsection === 'courses') key = 'edu.courses.label';
      else if (subsection === 'publications') key = 'edu.publications.label';
      const subTitle = (window.i18n && window.i18n.t) ? window.i18n.t(key, lang) : subsection;
      const title = `${subTitle} | Everson Filipe`;
      document.title = title;
      setMetaTags(title, 'Academic background, courses, certifications and publications by Everson Filipe — Systems Analyst & AI Engineer.', null);
      removeJSONLD('dynamic-blog-jsonld');
      return;
    }

    if (section === 'experience') {
      if (subsection === 'endorsements') {
        const key = 'nav.experience.endorsements';
        const subTitle = (window.i18n && window.i18n.t) ? window.i18n.t(key, lang) : 'Recomendações';
        const title = `${subTitle} | Everson Filipe`;
        document.title = title;
        setMetaTags(title, 'Peer endorsements and professional recommendations for Everson Filipe.', null);
        removeJSONLD('dynamic-blog-jsonld');
        return;
      }
      if (slug) {
        const cvData = (window.CV_DATA && window.CV_DATA[lang]) ? window.CV_DATA[lang] : null;
        if (cvData && cvData.experience) {
          const job = cvData.experience.find(j => j.id === slug);
          if (job) {
            const expTitle = `${job.role} @ ${job.company} | Everson Filipe`;
            const expDesc  = (job.bullets && job.bullets.length > 0)
              ? job.bullets[0].replace(/<[^>]+>/g, '').slice(0, 155)
              : `Professional experience as ${job.role} at ${job.company}.`;
            const expImage = job.logo || `${CANONICAL_BASE}/assets/images/profile.png`;

            document.title = expTitle;
            setMetaTags(expTitle, expDesc, expImage);

            injectJSONLD('dynamic-blog-jsonld', {
              "@context": "https://schema.org",
              "@type": "EmployerAggregateRating",
              "name": `${job.role} at ${job.company}`,
              "description": expDesc,
              "url": canonicalUrl
            });
            return;
          }
        }
      }
    }

    if (section === 'projects' && slug) {
      const cvData = (window.CV_DATA && window.CV_DATA[lang]) ? window.CV_DATA[lang] : null;
      if (cvData && cvData.projects) {
        const proj = cvData.projects.find(p => p.id === slug);
        if (proj) {
          const projTitle = `${proj.title} | Everson Filipe`;
          const projDesc  = proj.description
            ? proj.description.replace(/<[^>]+>/g, '').slice(0, 155)
            : `Project: ${proj.title}`;
          const projImage = (proj.images && proj.images[0]) || `${CANONICAL_BASE}/assets/images/profile.png`;

          document.title = projTitle;
          setMetaTags(projTitle, projDesc, projImage);
          removeJSONLD('dynamic-blog-jsonld');
          return;
        }
      }
    }

    // Default Section Title — reset to homepage defaults
    removeJSONLD('dynamic-blog-jsonld');
    if (window.i18n && window.i18n.t) {
      const defaultTitle = window.i18n.t('meta.title', lang);
      const defaultDesc  = 'Implementation Engineer & AI Automation Analyst specializing in Python, JSONLogic, AWS integrations, and B2B SaaS configurations.';
      document.title = defaultTitle;
      setMetaTags(defaultTitle, defaultDesc, `${CANONICAL_BASE}/assets/images/profile.png`);
    }
  }

  function injectJSONLD(scriptId, data) {
    let script = document.getElementById(scriptId);
    if (!script) {
      script = document.createElement('script');
      script.id = scriptId;
      script.type = 'application/ld+json';
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(data, null, 2);
  }

  function removeJSONLD(scriptId) {
    const script = document.getElementById(scriptId);
    if (script) script.remove();
  }

  /**
   * Applies route changes to UI (language, scroll, modals)
   */
  function applyRouteToUI(route, options = {}) {
    if (isNavigating) return;
    isNavigating = true;

    try {
      const { lang, section, subsection, slug } = route;

      // 1. Language Sync
      if (window.i18n && window.i18n.getCurrentLang() !== lang) {
        window.i18n.applyLang(lang);
      }

      // 2. Metadata Sync
      updateMetadata(route);

      // 3. Modals & Item Triggers
      if (section === 'community' && subsection === 'blog' && slug) {
        // Open Blog Post Reader Modal using unified renderer
        setTimeout(() => {
          const activeLang = window.i18n ? window.i18n.getCurrentLang() : lang;
          if (window.openBlogModal) {
            window.openBlogModal(slug, activeLang);
          }
        }, 50);
      } else {
        // Ensure blog modal is closed if not on blog post route
        const modal = document.getElementById('blog-modal');
        if (modal && !modal.hidden) {
          modal.hidden = true;
          document.body.style.overflow = '';
        }
      }

      // 4. Scroll to Section / Subsection (skipped if options.noScroll is true)
      if (section && !options.noScroll) {
        let targetId = section;
        if (section === 'community') {
          if (slug) targetId = slug;
          else if (subsection === 'volunteering') targetId = 'volunteer-list';
          else if (subsection === 'hackathons') targetId = 'hackathons-list';
          else if (subsection === 'events') targetId = 'events-list';
          else if (subsection === 'achievements') targetId = 'achievements-list';
          else if (subsection === 'blog') targetId = 'blog';
          else targetId = 'community';
        } else if (section === 'education') {
          if (slug) targetId = slug;
          else if (subsection === 'academic' || subsection === 'background') targetId = 'education-list';
          else if (subsection === 'courses') targetId = 'courses-list';
          else if (subsection === 'publications' || subsection === 'articles') targetId = 'publications-list';
          else targetId = 'education';
        } else if (section === 'experience') {
          if (subsection === 'experience-select') {
            targetId = 'experience';
            const urlParams = new URLSearchParams(window.location.search);
            const comp = urlParams.get('company') || slug || 'kartado';
            if (window.openCompanyModal) {
              window.openCompanyModal(comp);
            }
          } else if (subsection === 'endorsements') {
            targetId = 'endorsements-section';
          } else if (slug) {
            targetId = slug;
            if (window.expandExperienceSection) {
              window.expandExperienceSection();
            }
          } else {
            targetId = 'experience';
          }
        }

        const targetEl = document.getElementById(targetId) || document.getElementById(`${targetId}-heading`);
        if (targetEl) {
          if (targetEl.classList.contains('timeline-item')) {
            targetEl.classList.remove('hidden-collapsed');
            targetEl.style.display = '';
            if (window.expandExperienceCard) {
              window.expandExperienceCard(targetEl);
            }
          }
          const navH = document.getElementById('main-nav')?.offsetHeight || 70;
          const topPos = targetEl.getBoundingClientRect().top + window.scrollY - navH - 16;
          window.scrollTo({ top: Math.max(0, topPos), behavior: options.isInitial ? 'auto' : 'smooth' });
        }
      }

    } finally {
      isNavigating = false;
    }
  }

  /**
   * Pushes/replaces route state and updates UI
   */
  function navigateTo(lang, section, subsection, slug, options = {}) {
    const route = {
      lang: normalizeLang(lang) || (window.i18n ? window.i18n.getCurrentLang() : DEFAULT_LANG),
      section: section || null,
      subsection: subsection || null,
      slug: slug || null
    };

    const newPath = buildPath(route.lang, route.section, route.subsection, route.slug);
    const currentPath = window.location.pathname;

    if (currentPath !== newPath) {
      if (options.replace) {
        window.history.replaceState(route, '', newPath);
      } else {
        window.history.pushState(route, '', newPath);
      }
    }

    applyRouteToUI(route, options);
  }

  /**
   * Global event listener setup
   */
  function setupEventListeners() {
    // 1. Popstate (Browser Back/Forward)
    window.addEventListener('popstate', () => {
      const route = parseRoute();
      applyRouteToUI(route, { noScroll: false });
    });

    // 2. Language Switcher Sync (noScroll = true to prevent jump)
    document.addEventListener('langchange', (e) => {
      if (isNavigating) return;
      const newLang = e.detail.lang;
      const route = parseRoute();

      // If blog modal is open, re-render its content in the new language
      const modal = document.getElementById('blog-modal');
      if (modal && !modal.hidden && modal.dataset.currentPost && window.openBlogModal) {
        window.openBlogModal(modal.dataset.currentPost, newLang);
      }

      navigateTo(newLang, route.section, route.subsection, route.slug, { noScroll: true, replace: true });
    });

    // 3. Dynamic Nav & Path Links Interception
    document.addEventListener('click', (e) => {
      const link = e.target.closest('a[href], [data-route]');
      if (!link) return;

      const routeAttr = link.getAttribute('data-route');
      if (routeAttr) {
        e.preventDefault();
        const route = parseRouteFromUrl('/' + routeAttr);
        navigateTo(route.lang, route.section, route.subsection, route.slug);
        return;
      }

      const href = link.getAttribute('href');
      if (href && href.startsWith('/') && !href.startsWith('//') && !link.hasAttribute('download') && link.target !== '_blank') {
        e.preventDefault();
        const route = parseRouteFromUrl(href);
        navigateTo(route.lang, route.section, route.subsection, route.slug);
        return;
      }

      const anchorLink = e.target.closest('a[href^="#"]');
      if (anchorLink) {
        const href = anchorLink.getAttribute('href');
        if (href && href.length > 1) {
          const targetId = href.substring(1);
          const currentLang = window.i18n ? window.i18n.getCurrentLang() : DEFAULT_LANG;

          if (window.CV_DATA) {
            const data = window.CV_DATA[currentLang] || {};
            if ((data.experience || []).some(ex => ex.id === targetId)) {
              e.preventDefault();
              navigateTo(currentLang, 'experience', null, targetId);
              return;
            }
            if ((data.achievements || []).some(a => a.id === targetId)) {
              e.preventDefault();
              navigateTo(currentLang, 'community', 'achievements', targetId);
              return;
            }
            if ((data.hackathons || []).some(h => h.id === targetId)) {
              e.preventDefault();
              navigateTo(currentLang, 'community', 'hackathons', targetId);
              return;
            }
            if ((data.events || []).some(ev => ev.id === targetId)) {
              e.preventDefault();
              navigateTo(currentLang, 'community', 'events', targetId);
              return;
            }
            if ((data.volunteering || []).some(v => v.id === targetId)) {
              e.preventDefault();
              navigateTo(currentLang, 'community', 'volunteering', targetId);
              return;
            }
            if ((data.courses || []).some(c => c.id === targetId)) {
              e.preventDefault();
              navigateTo(currentLang, 'education', 'courses', targetId);
              return;
            }
            if ((data.publications || []).some(p => p.id === targetId)) {
              e.preventDefault();
              navigateTo(currentLang, 'education', 'publications', targetId);
              return;
            }
          }
          let sec = targetId;
          let subsec = null;

          if (targetId === 'blog') {
            sec = 'community';
            subsec = 'blog';
          } else if (targetId === 'volunteer-list') {
            sec = 'community';
            subsec = 'volunteering';
          } else if (targetId === 'hackathons-list') {
            sec = 'community';
            subsec = 'hackathons';
          } else if (targetId === 'events-list') {
            sec = 'community';
            subsec = 'events';
          } else if (targetId === 'achievements-list') {
            sec = 'community';
            subsec = 'achievements';
          } else if (targetId === 'courses-list') {
            sec = 'education';
            subsec = 'courses';
          } else if (targetId === 'publications-list') {
            sec = 'education';
            subsec = 'publications';
          }

          navigateTo(currentLang, sec, subsec, null);
        }
      }
    });

    // 4. Blog Modal Interception (noScroll = true)
    document.addEventListener('click', (e) => {
      const readBtn = e.target.closest('[data-blog-read]');
      if (readBtn) {
        const postId = readBtn.getAttribute('data-blog-read');
        const currentLang = window.i18n ? window.i18n.getCurrentLang() : DEFAULT_LANG;
        navigateTo(currentLang, 'community', 'blog', postId, { noScroll: true });
        return;
      }

      const closeBtn = e.target.closest('#blog-modal-close, #blog-modal-backdrop');
      if (closeBtn) {
        const currentLang = window.i18n ? window.i18n.getCurrentLang() : DEFAULT_LANG;
        navigateTo(currentLang, 'community', 'blog', null, { noScroll: true });
      }
    });
  }

  /**
   * Initializes router on DOM load
   */
  function init() {
    setupEventListeners();
    const initialRoute = parseRoute();
    applyRouteToUI(initialRoute, { isInitial: true });
  }

  // Expose Router API globally
  window.DynamicRouter = {
    parseRoute,
    buildPath,
    navigateTo,
    updateMetadata
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
