/**
 * i18n.js - Sistema de internacionalizacao (EN / PT / ES)
 * Retém apenas rótulos e textos estáticos da interface (UI).
 * O conteúdo do currículo foi movido para cv_data.js.
 */
(function I18n() {
  'use strict';

  /* ── Traducoes ──────────────────────────────────── */
  const TRANSLATIONS = {
    en: {
      'nav.about': 'About',
      'nav.experience': 'Experience',
      'nav.education': 'Education',
      'nav.projects': 'Projects',
      'nav.certifications': 'Certifications',
      'nav.community': 'Community',
      'nav.skip': 'Skip to main content',
      'social.github': 'GitHub profile',
      'social.linkedin': 'LinkedIn profile',
      'social.medium': 'Medium profile',
      'social.email': 'Email address',      'hero.cta.work': 'View experience',
      'hero.cta.contact': 'Get in touch',
      'hero.scroll': 'scroll',
      'about.overline': 'About',
      'about.heading': 'Who Everson Filipe is',
      'about.stat.items': 'Validated work items',
      'about.stat.units': 'Operational units',
      'about.stat.output': 'Team output contribution',
      'about.stat.hacks': 'Hackathons',
      'about.stack.label': 'Core stack',
      'exp.overline': 'Professional Trajectory',
      'exp.achievements.label': 'Specific Achievements',
      'exp.heading': 'Where I have worked',
      'edu.overline': 'Academic Background',
      'edu.heading': 'Education',
      'edu.courses.label': 'Courses',
      'edu.publications.label': 'Articles & Publications',
      'publication.view.btn': 'View',
      'community.overline': 'Community & Impact',
      'community.heading': 'Beyond the code',
      'community.volunteering': 'Volunteering',
      'community.hackathons': 'Hackathons',
      'community.events': 'Events',
      'community.achievements': 'Achievements & Recognition',
      'projects.overline': 'Hands-on',
      'projects.heading': 'Main Projects',
      'projects.placeholder.label': 'Under Construction',
      'projects.placeholder.hint': 'Project case studies are currently being curated and will be published soon.',
      'certs.overline': 'Validation',
      'certs.heading': 'Certifications',
      'certs.placeholder.label': 'Under Construction',
      'certs.placeholder.hint': 'My official certifications are being compiled for display.',
      'a11y.panel.title': 'Accessibility',
      'a11y.fontsize.label': 'Font size',
      'a11y.fontsize.hint': 'Normal / Large / Extra large',
      'a11y.motion.label': 'Reduce motion',
      'a11y.motion.hint': 'Disables animations',
      'a11y.lang.label': 'Language',
      'filter.all': 'All',
      'filter.course.api': 'API & Backend',
      'filter.course.ai': 'AI',
      'filter.course.softskills': 'Soft Skills',
      'filter.course.languages': 'Languages',
      'filter.event.speaker': 'Speaker',
      'filter.event.exhibitor': 'Exhibitor',
      'filter.event.listener': 'Listener',
      'course.credential.btn': 'Show Credential',
      'btn.expand': 'Expand',
      'btn.minimize': 'Minimize',
      'meta.title': 'Everson Filipe | Implementation Engineer, DevOps & AI Professional',
      'meta.description': 'Implementation Engineer & AI Automation Analyst specializing in Python, JSONLogic, AWS integrations, and B2B SaaS configurations. View my portfolio.',
      'meta.keywords': 'implementation engineer, devops, AI automation, python, django, jsonlogic, aws integration, b2b saas, software configuration, everson filipe',
      'exp.total.count': 'Total experiences: __count__',
      'edu.courses.total.count': 'Total courses: __count__',
      'edu.publications.total.count': 'Total publications: __count__',
      'community.events.total.count': 'Total events: __count__',
      'projects.total.count': 'Total projects: __count__',
      'projects.linked.label': 'Linked to',
      'projects.stack.label': 'Stack',
      'projects.desc.expand': 'Description',
      'projects.desc.minimize': 'Minimize',
      'projects.repo.link': 'View repository',
      'projects.status.inprogress': 'In Progress',
      'projects.status.completed': 'Completed',
    },
    pt: {
      'nav.about': 'Sobre',
      'nav.experience': 'Experiencia',
      'nav.education': 'Formacao',
      'nav.projects': 'Projetos',
      'nav.certifications': 'Certificações',
      'nav.community': 'Comunidade',
      'nav.skip': 'Pular para o conteúdo principal',
      'social.github': 'Perfil do GitHub',
      'social.linkedin': 'Perfil do LinkedIn',
      'social.medium': 'Perfil do Medium',
      'social.email': 'E-mail de contato',      'hero.cta.work': 'Ver experiencia',
      'hero.cta.contact': 'Entrar em contato',
      'hero.scroll': 'rolar',
      'about.overline': 'Sobre',
      'about.heading': 'Quem e Everson Filipe',
      'about.stat.items': 'Itens de trabalho validados',
      'about.stat.units': 'Unidades operacionais',
      'about.stat.output': 'Contribuicao ao output do time',
      'about.stat.hacks': 'Hackathons',
      'about.stack.label': 'Stack principal',
      'exp.overline': 'Trajetoria Profissional',
      'exp.achievements.label': 'Conquistas Específicas',
      'exp.heading': 'Onde trabalhei',
      'edu.overline': 'Formacao Academica',
      'edu.heading': 'Educacao',
      'edu.courses.label': 'Cursos',
      'edu.publications.label': 'Artigos e Produções',
      'publication.view.btn': 'Visualizar',
      'community.overline': 'Comunidade e Impacto',
      'community.heading': 'Alem do codigo',
      'community.volunteering': 'Voluntariado',
      'community.hackathons': 'Hackathons',
      'community.events': 'Eventos',
      'community.achievements': 'Conquistas e Reconhecimentos',
      'projects.overline': 'Prática',
      'projects.heading': 'Projetos Selecionados',
      'projects.placeholder.label': 'Em Construção',
      'projects.placeholder.hint': 'Os estudos de caso dos projetos estão sendo selecionados e serão publicados em breve.',
      'certs.overline': 'Validação',
      'certs.heading': 'Certificações',
      'certs.placeholder.label': 'Em Construção',
      'certs.placeholder.hint': 'Minhas certificações oficiais estão sendo compiladas para exibição.',
      'a11y.panel.title': 'Acessibilidade',
      'a11y.fontsize.label': 'Tamanho da fonte',
      'a11y.fontsize.hint': 'Normal / Grande / Extra grande',
      'a11y.motion.label': 'Reduzir animacoes',
      'a11y.motion.hint': 'Desativa animacoes',
      'a11y.lang.label': 'Idioma',
      'filter.all': 'Todos',
      'filter.course.api': 'API e Backend',
      'filter.course.ai': 'IA',
      'filter.course.softskills': 'Soft Skills',
      'filter.course.languages': 'Idiomas',
      'filter.event.speaker': 'Palestrante',
      'filter.event.exhibitor': 'Expositor',
      'filter.event.listener': 'Participante',
      'course.credential.btn': 'Exibir credencial',
      'btn.expand': 'Expandir',
      'btn.minimize': 'Minimizar',
      'meta.title': 'Everson Filipe | Ingeniero de Implantación, DevOps & IA',
      'meta.description': 'Ingeniero de Implantación y Analista de Automatización de IA especializado en Python, JSONLogic, integraciones AWS y configuraciones SaaS B2B. Vea mi portafolio.',
      'meta.keywords': 'ingenieria de implantacion, devops, automatizacion ia, python, django admin, jsonlogic, integraciones aws, saas b2b, everson filipe',
      'meta.title': 'Everson Filipe | Engenheiro de Implantação, DevOps & IA',
      'meta.description': 'Engenheiro de Implantação e Analista de Automação de IA especializado em Python, JSONLogic, integrações AWS e configurações SaaS B2B. Conheça meu portfólio.',
      'meta.keywords': 'engenharia de implantacao, devops, automacao ia, python, django admin, jsonlogic, integracoes aws, saas b2b, everson filipe',
      'exp.total.count': 'Experiências totais: __count__',
      'edu.courses.total.count': 'Cursos totais: __count__',
      'edu.publications.total.count': 'Produções totais: __count__',
      'community.events.total.count': 'Eventos totais: __count__',
      'projects.total.count': 'Projetos totais: __count__',
      'projects.linked.label': 'Vinculado a',
      'projects.stack.label': 'Stack',
      'projects.desc.expand': 'Descrição',
      'projects.desc.minimize': 'Minimizar',
      'projects.repo.link': 'Ver repositório',
      'projects.status.inprogress': 'Em Andamento',
      'projects.status.completed': 'Concluído',
    },
    es: {
      'nav.about': 'Acerca',
      'nav.experience': 'Experiencia',
      'nav.education': 'Formación',
      'nav.projects': 'Proyectos',
      'nav.certifications': 'Certificaciones',
      'nav.community': 'Comunidad',
      'nav.skip': 'Ir al contenido principal',
      'social.github': 'Perfil de GitHub',
      'social.linkedin': 'Perfil de LinkedIn',
      'social.medium': 'Perfil de Medium',
      'social.email': 'Correo de contacto',      'hero.cta.work': 'Ver experiencia',
      'hero.cta.contact': 'Contactar',
      'hero.scroll': 'desplazar',
      'about.overline': 'Acerca',
      'about.heading': 'Quien es Everson Filipe',
      'about.stat.items': 'Items de trabajo validados',
      'about.stat.units': 'Unidades operacionales',
      'about.stat.output': 'Contribucion al output del equipo',
      'about.stat.hacks': 'Hackathones',
      'about.stack.label': 'Stack principal',
      'exp.overline': 'Trayectoria Profesional',
      'exp.achievements.label': 'Logros Específicos',
      'exp.heading': 'Donde he trabajado',
      'edu.overline': 'Formacion Academica',
      'edu.heading': 'Educacion',
      'edu.courses.label': 'Cursos',
      'edu.publications.label': 'Artículos y Publicaciones',
      'publication.view.btn': 'Visualizar',
      'community.overline': 'Comunidad e Impacto',
      'community.heading': 'Mas alla del codigo',
      'community.volunteering': 'Voluntariado',
      'community.hackathons': 'Hackathones',
      'community.events': 'Eventos',
      'community.achievements': 'Logros y Reconocimientos',
      'projects.overline': 'Práctica',
      'projects.heading': 'Proyectos Seleccionados',
      'projects.placeholder.label': 'En Construcción',
      'projects.placeholder.hint': 'Los casos de estudio de los proyectos están siendo curados y se publicarán pronto.',
      'certs.overline': 'Validación',
      'certs.heading': 'Certificaciones',
      'certs.placeholder.label': 'En Construcción',
      'certs.placeholder.hint': 'Mis certificaciones oficiales se están compilando para su visualización.',
      'a11y.panel.title': 'Accesibilidad',
      'a11y.fontsize.label': 'Tamano de fuente',
      'a11y.fontsize.hint': 'Normal / Grande / Extra grande',
      'a11y.motion.label': 'Reducir animaciones',
      'a11y.motion.hint': 'Desactiva animaciones',
      'a11y.lang.label': 'Idioma',
      'filter.all': 'Todos',
      'filter.course.api': 'API y Backend',
      'filter.course.ai': 'IA',
      'filter.course.softskills': 'Habilidades Blandas',
      'filter.course.languages': 'Idiomas',
      'filter.event.speaker': 'Ponente',
      'filter.event.exhibitor': 'Expositor',
      'filter.event.listener': 'Asistente',
      'course.credential.btn': 'Mostrar credencial',
      'btn.expand': 'Expandir',
      'btn.minimize': 'Minimizar',
      'meta.title': 'Everson Filipe | Ingeniero de Implantación, DevOps & IA',
      'meta.description': 'Ingeniero de Implantación y Analista de Automatización de IA especializado en Python, JSONLogic, integraciones AWS y configuraciones SaaS B2B. Vea mi portafolio.',
      'meta.keywords': 'ingenieria de implantacion, devops, automatizacion ia, python, django admin, jsonlogic, integraciones aws, saas b2b, everson filipe',
      'exp.total.count': 'Experiencias totales: __count__',
      'edu.courses.total.count': 'Cursos totales: __count__',
      'edu.publications.total.count': 'Producciones totales: __count__',
      'community.events.total.count': 'Eventos totales: __count__',
      'projects.total.count': 'Proyectos totales: __count__',
      'projects.linked.label': 'Vinculado a',
      'projects.stack.label': 'Stack',
      'projects.desc.expand': 'Descripción',
      'projects.desc.minimize': 'Minimizar',
      'projects.repo.link': 'Ver repositorio',
      'projects.status.inprogress': 'En Curso',
      'projects.status.completed': 'Completado',
    },
  };

  const SUPPORTED = ['en', 'pt', 'es'];
  const STORAGE_KEY = 'portfolio_lang';

  const LANG_META = {
    en: { htmlLang: 'en' },
    pt: { htmlLang: 'pt-BR' },
    es: { htmlLang: 'es' }
  };

  let currentLang = 'en';

  function safeLang(lang) {
    return SUPPORTED.includes(lang) ? lang : 'en';
  }

  function t(key, lang) {
    const l = safeLang(lang);
    if (TRANSLATIONS[l] && TRANSLATIONS[l][key] !== undefined) {
      return TRANSLATIONS[l][key];
    }
    if (TRANSLATIONS['en'] && TRANSLATIONS['en'][key] !== undefined) {
      return TRANSLATIONS['en'][key];
    }
    return key;
  }

  function detectLang() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved && SUPPORTED.includes(saved)) return saved;
    } catch (_) {}

    const navLang = navigator.language.split('-')[0];
    return safeLang(navLang);
  }

  function applyLang(lang) {
    const l = safeLang(lang);
    currentLang = l;

    document.documentElement.setAttribute('lang', LANG_META[l].htmlLang);

    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      const value = t(key, l);
      if (el.hasAttribute('data-i18n-html')) {
        el.innerHTML = value;
      } else {
        el.textContent = value;
      }
    });

    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const key = el.getAttribute('data-i18n-placeholder');
      el.placeholder = t(key, l);
    });

    document.querySelectorAll('[data-i18n-aria]').forEach(el => {
      const key = el.getAttribute('data-i18n-aria');
      el.setAttribute('aria-label', t(key, l));
    });

    document.querySelectorAll('.lang-btn').forEach(btn => {
      const isActive = btn.getAttribute('data-lang') === l;
      btn.classList.toggle('active', isActive);
      btn.setAttribute('aria-pressed', String(isActive));
    });

    try {
      localStorage.setItem(STORAGE_KEY, l);
    } catch (_) {}

    document.dispatchEvent(new CustomEvent('langchange', { detail: { lang: l } }));
  }

  window.i18n = { t, applyLang, getCurrentLang: () => currentLang, SUPPORTED };

  function init() {
    const lang = detectLang();
    applyLang(lang);

    document.querySelectorAll('.lang-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const target = btn.getAttribute('data-lang');
        applyLang(target);
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
