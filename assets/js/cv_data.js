/**
 * cv_data.js - Centralized database of Everson Filipe's CV in EN, PT, ES.
 * decoupled from DOM layout for long-term scalability and easy updating.
 */
(function CVDatabase() {
  'use strict';
  window.CV_DATA = {
  "en": {
    "about": {
      "p1": "As an Implementation Analyst specializing in Implementation Engineering and AI-driven Automation, I transform complex business requirements into scalable, <strong>reliable workflows and software configurations for B2B clients.</strong>",
      "p2": "Working directly with cloud-based ERP systems and SaaS platforms, I configure solutions using Python, Django Admin, JSONLogic, and AWS, ensuring integrations with REST APIs and cloud BI services such as Amazon Athena.",
      "p3": "My work is grounded in <strong>data integrity and workflow standardization.</strong> Operating within Agile frameworks, I mentor new engineers, lead technical onboarding, and contribute directly to production environments from day one.",
      "current": "Currently working at <strong>Kartado</strong> &middot; Deepening OOP and UML &middot; Bachelor's in Computer Science at UniFavip Wyden",
      "stats": [
        {
          "number": "800",
          "suffix": "+",
          "label": "Tasks delivered"
        },
        {
          "number": "42",
          "suffix": "+",
          "label": "B2B clients attended"
        },
        {
          "number": "32",
          "suffix": "%",
          "label": "Team output contribution in the firsts months"
        },
        {
          "number": "10",
          "suffix": "+",
          "label": "Hackathons"
        }
      ],
      "skills": [
        "Python",
        "Django Admin",
        "JSONLogic",
        "REST API",
        "AWS IAM",
        "Amazon S3",
        "EC2",
        "Step Functions",
        "Amazon Athena",
        "Postman",
        "Pytest",
        "openpyxl",
        "Pandas",
        "Jira",
        "ClickUp"
      ]
    },
    "experience": [
      {
        "id": "kartado",
        "role": "Technical Implementation Intern",
        "company": "Kartado",
        "date": "Sep 2025 – Present",
        "bullets": [
          "Configured JSONLogic rules for dynamic forms across 42+ client environments via Django Admin, ensuring data integrity and functional consistency.",
          "Developed Python ETL automation scripts integrated with Django ORM, replacing manual data transformation and loading workflows.",
          "Built notebook-based Python scripts for JSON metadata extraction, schema validation, and proactive detection of structural inconsistencies in exported datasets.",
          "Corrected GIS maps, adjusted Shapefiles, and validated spatial geometries to support highway concession system parameterization.",
          "Maintained REST API and JWT integration documentation alongside Pytest validation scripts for Django modules.",
          "Leveraged AWS IAM, EC2, ECS (Docker), Step Functions, ODBC, and Amazon Athena across infrastructure, secure access, data integration, and analytics workflows.",
          "Automated parameterization spreadsheet generation using Python, Pandas, and openpyxl, reducing manual effort in implementation workflows."
        ],
        "tags": [
          "Python",
          "Django Admin",
          "JSONLogic",
          "AWS",
          "Postman",
          "Pytest",
          "Pandas"
        ],
        "carousel": {
          "label": "Performance & Recognition Evidence",
          "slides": [
            {
              "src": "assets/images/kartado_chart.png",
              "alt": "Kartado Performance Chart",
              "caption": "Performance Metrics - 32% contribution to the team output"
            },
            {
              "src": "assets/images/kartado_award.png",
              "alt": "Kartado Agility Award Mentimeter",
              "caption": "Agility of the Month Nominee - 'Everson, always ready to fix bugs and speed up processes'"
            },
            {
              "src": "assets/images/kartado_welcome.png",
              "alt": "Kartado Welcome Kit",
              "caption": "Welcome Kit received upon joining the Kartado team"
            }
          ]
        },
        "logo": "assets/images/Simbolo_Kartado_Footer.svg",
        "specificAchievements": [
          {
            "tag": "Optimization",
            "description": "Reduced parameterization analysis time by 40% with Python schema validation scripts."
          },
          {
            "tag": "Quality",
            "description": "Ensured zero production syntax failures across 20+ B2B concession parameterization spreadsheets."
          }
        ]
      },
      {
        "id": "daus",
        "role": "Agile Product Manager Learner",
        "company": "Daus",
        "date": "Dec 2024 – Jun 2025",
        "bullets": [
          "Applied Scrum, Kanban, and Lean Thinking frameworks to drive product discovery and requirements analysis across internal and multi-client portfolio projects.",
          "Documented product insights, user flows, and functional requirements across the Atlassian ecosystem (Jira, Confluence) and FigJam.",
          "Mentored two intern cohorts across structured onboarding programs in Agile Product Management workflows and MVP delivery."
        ],
        "tags": [
          "Jira",
          "Confluence",
          "Figma",
          "Miro",
          "Scrum",
          "Kanban"
        ],
        "logo": "assets/images/daus_software_house_logo.jpg",
        "specificAchievements": [
          {
            "tag": "Mentorship",
            "description": "Successfully onboarded and mentored 2 intern cohorts in Agile framework practices and MVP delivery."
          }
        ]
      },
      {
        "id": "freelance-dev",
        "role": "Freelance Web Developer",
        "company": "Self-employed",
        "date": "Jun 2024 – Nov 2024",
        "bullets": [
          "Developed responsive landing pages and portfolios for regional businesses using HTML, CSS, and Javascript.",
          "Integrated simple serverless contact forms and automated email notifications."
        ],
        "tags": [
          "Javascript",
          "Python"
        ],
        "specificAchievements": [
          {
            "tag": "Delivery",
            "description": "Successfully completed 5 client projects within schedule and budget."
          }
        ]
      },
      {
        "id": "tech-support",
        "role": "Technical Support Assistant",
        "company": "TI Solutions",
        "date": "Jan 2024 – May 2024",
        "bullets": [
          "Provided tier-1 troubleshooting for internal software platforms and resolved database configuration issues.",
          "Maintained documentation for system parameterization processes."
        ],
        "tags": [
          "Jira",
          "SQL"
        ],
        "specificAchievements": []
      },
      {
        "id": "intern-ops",
        "role": "Operations Intern",
        "company": "LogiTech",
        "date": "Jul 2023 – Dec 2023",
        "bullets": [
          "Assisted in daily system audit procedures and log verification to ensure data consistency.",
          "Automated operational report formatting using Excel macros and Python scripts."
        ],
        "tags": [
          "Python",
          "Excel"
        ],
        "specificAchievements": []
      }
    ],
    "education": [
      {
        "id": "mentoria-labai-institutojoule-ia2025",
        "type": "Mentorship Program",
        "degree": "Artificial Intelligence Mentorship Program",
        "institution": "Offered by LAB.AI, Instituto Joule",
        "date": "Aug 2025 – Sep 2025",
        "logo": "assets/images/instituto_joule_logo.jpg",
        "highlights": [
          "AI Mentorship",
          "Career Readiness",
          "Lab.AI Certificate"
        ]
      },
      {
        "id": "graduacao-ciencia-computacao-unifavipwyden",
        "type": "Bachelor's Degree",
        "degree": "Computer Science",
        "institution": "UniFavip Wyden",
        "date": "Feb 2024 – In Progress",
        "logo": "assets/images/unifavip_logo.jpg",
        "highlights": [
          "GPA: 9.2/10",
          "1200+ Hours Completed",
          "Algorithms & OOP Focus"
        ]
      }
    ],
    "courses": [
      {
        "id": "curso-postman-zeroaoavancado",
        "type": "api",
        "name": "Postman: From Zero to Advanced + Automated Testing",
        "provider": "Udemy",
        "date": "Dec 2025",
        "credentialUrl": "https://www.udemy.com/certificate/UC-12234f7a-0178-4a06-b809-864522caa58c/"
      },
      {
        "id": "curso-applicationprogramminginterfaces-api",
        "type": "api",
        "name": "Application Programming Interface: API and Web Services",
        "provider": "Udemy",
        "date": "Dec 2025",
        "credentialUrl": "https://www.udemy.com/certificate/UC-9eff9f3e-ab9e-4e05-86e2-181eddd6e921/"
      },
      {
        "id": "curso-labai-mentoria2025",
        "type": "ai",
        "name": "Lab.AI: Preparing the Next Generation for the Future of Work",
        "provider": "Instituto Joule",
        "date": "Sep 2025",
        "credentialUrl": "https://academy.institutojoule.org/certificado/?cert_hash=6710237ef0505f06"
      },
      {
        "id": "curso-skillsbuild-customerengagement",
        "type": "softskills",
        "name": "SkillsBuild - Customer Engagement: Problem Solving and Process Controls",
        "provider": "IBM",
        "date": "Aug 2025",
        "credentialUrl": "https://www.credly.com/badges/a9ac260f-4415-43d0-a2e2-479478acbddd/linked_in_profile"
      },
      {
        "id": "curso-efset-2025",
        "type": "languages",
        "name": "EF SET English Certificate 69/100 (C1 Advanced)",
        "provider": "EF Education First",
        "date": "Mar 2025",
        "credentialUrl": "https://cert.efset.org/en/88BaNL"
      }
    ],
    "projects": [],
    "certifications": [],
    "volunteering": [
      {
        "id": "co-organizer-gdgbarueri",
        "role": "Co-organizer",
        "org": "Google Developers Group (GDG Barueri)",
        "date": "Aug 2025 - Present",
        "logo": "assets/images/google_developers_group_barueri_logo.jpg",
        "highlights": [
          "Tech Meetups",
          "Community Building",
          "Google Developer Ecosystem"
        ]
      },
      {
        "id": "ambassador-facilitator-politize",
        "role": "Ambassador & Facilitator",
        "org": "Politize! (Politize! Caruaru)",
        "date": "May 2025 - Present",
        "logo": "assets/images/politize__logo.jpg",
        "highlights": [
          "Civic Education Workshops",
          "15+ Facilitated Sessions",
          "Public Leadership"
        ]
      },
      {
        "id": "aiesecmackenzie-volunteer",
        "role": "OGT & Marketing Committee Member",
        "org": "AIESEC (AIESEC no Mackenzie)",
        "date": "Mar 2025 - Aug 2025",
        "logo": "assets/images/1754110.webp",
        "highlights": [
          "B2B Sales",
          "OGT Program Management",
          "Intercultural Leadership"
        ]
      },
      {
        "id": "vainaweb-volunteering",
        "role": "Soft Skills Instructor",
        "org": "Vai Na Web",
        "date": "Jan 2025",
        "logo": "assets/images/vai_na_web.jpg",
        "highlights": [
          "Soft Skills Training",
          "Tech Career Mentorship",
          "Inclusion Focus"
        ]
      },
      {
        "id": "youth-volunteer-br",
        "role": "Youth Ambassador",
        "org": "Global Youth Network",
        "date": "Jul 2023 - Dec 2023",
        "logo": "assets/images/google_developers_group_barueri_logo.jpg",
        "highlights": [
          "Global Networking",
          "Youth Leadership",
          "SDG Focus"
        ]
      },
      {
        "id": "tech-tutor-local",
        "role": "Python Tutor",
        "org": "Coders Solidarios",
        "date": "Jan 2023 - Jun 2023",
        "logo": "assets/images/google_developers_group_barueri_logo.jpg",
        "highlights": [
          "Python Teaching",
          "Algorithms Intro",
          "Community Tutor"
        ]
      },
      {
        "id": "community-mod-disc",
        "role": "Community Moderator",
        "org": "Devs Caruaru",
        "date": "Jun 2022 - Dec 2022",
        "logo": "assets/images/google_developers_group_barueri_logo.jpg",
        "highlights": [
          "Discord Moderation",
          "Event Coordination",
          "Dev Support"
        ]
      }
    ],
    "hackathons": [
      {
        "id": "hackathon-havk-hacking-the-desert",
        "name": "Hackathon HAVK - Hacking the Desert",
        "meta": "HAVK",
        "date": "Jul 2025"
      },
      {
        "id": "vox-astra-hackathon",
        "name": "VOX ASTRA Hackathon",
        "meta": "EQ Hacks",
        "date": "May 2025"
      },
      {
        "id": "2025-hackatopia-hackathon",
        "name": "2025 Hackatopia Hackathon",
        "meta": "YPStem",
        "date": "Apr 2025"
      },
      {
        "id": "hackathon-fenearte",
        "name": "Hackathon Fenearte",
        "meta": "Porto Digital",
        "date": "Feb 2025"
      },
      {
        "id": "ideathon-ac",
        "name": "Ideathon AC",
        "meta": "Porto Digital",
        "date": "Feb 2025"
      },
      {
        "id": "hackathon-impulso-regional",
        "name": "Hackathon Impulso Regional",
        "meta": "ENAP",
        "date": "Dec 2024"
      },
      {
        "id": "hackathon-luminahub",
        "name": "Hackathon Luminahub",
        "meta": "Luminahub",
        "date": "Dec 2024"
      },
      {
        "id": "hackathon-dataflow",
        "name": "Hackathon Data Flow",
        "meta": "Porto Digital",
        "date": "Aug 2024"
      },
      {
        "id": "ideathon-caruaru-campusparty-day",
        "name": "Ideathon - Caruaru Campus Party Day",
        "meta": "Porto Digital",
        "date": "Aug 2024"
      },
      {
        "id": "olimpiadas-jovens-impacto",
        "name": "Olimpíadas Jovens de Impacto (Youth Impact Olympics)",
        "meta": "SEBRAE & Instituto Verda",
        "date": "Nov 2021"
      },
      {
        "id": "hackathon-nasa-2021",
        "name": "NASA Space Apps Challenge",
        "meta": "NASA",
        "date": "Oct 2021"
      },
      {
        "id": "hackathon-sebrae-2021",
        "name": "Hackathon Startup SEBRAE",
        "meta": "SEBRAE",
        "date": "Sep 2021"
      },
      {
        "id": "hackathon-hack-caruaru-2020",
        "name": "HackCaruaru 2020",
        "meta": "Caruaru Digital",
        "date": "Nov 2020"
      }
    ],
    "events": [
      {
        "id": "flisol-palmares-2026",
        "type": "speaker",
        "name": "FLISoL 2026",
        "role": "Speaker",
        "meta": "IFPE/Palmares",
        "date": "Apr 2026",
        "logo": "assets/images/photo_flisol_logo.webp"
      },
      {
        "id": "expotech-2025-2",
        "type": "exhibitor",
        "name": "ExpoTech 2025.2",
        "role": "Exhibitor",
        "meta": "UniFavip Wyden",
        "date": "Dec 2025",
        "logo": "assets/images/unifavip_logo.jpg"
      },
      {
        "id": "festival-agile-trends-2025",
        "type": "listener",
        "name": "Festival Agile Trends 2025",
        "role": "Listener",
        "meta": "Remote",
        "date": "Nov 2025",
        "logo": "assets/images/agile_trends_logo.jpg"
      },
      {
        "id": "expotech-2025-1",
        "type": "exhibitor",
        "name": "ExpoTech 2025.1",
        "role": "Exhibitor",
        "meta": "UniFavip Wyden",
        "date": "Jun 2025",
        "logo": "assets/images/unifavip_logo.jpg"
      },
      {
        "id": "brics-youth-2025",
        "type": "listener",
        "name": "BRICS Youth",
        "role": "Listener",
        "meta": "Remote",
        "date": "May 2025",
        "logo": "assets/images/brics_youth_alliance_2025.jpg"
      },
      {
        "id": "as-tendencias-para-novasgeracoes-2025-1",
        "type": "speaker",
        "name": "Trends for New Generations of Professionals",
        "role": "Speaker",
        "meta": "Recife Front-End Community",
        "date": "Feb 2025",
        "logo": "assets/images/recife_front_end_community_logo.jpg"
      },
      {
        "id": "expotech-2024-2",
        "type": "exhibitor",
        "name": "ExpoTech 2024.2",
        "role": "Exhibitor",
        "meta": "UniFavip Wyden",
        "date": "Nov 2024",
        "logo": "assets/images/unifavip_logo.jpg"
      },
      {
        "id": "campus-party-nordeste-2024",
        "type": "listener",
        "name": "Campus Party NE 2024",
        "role": "Listener",
        "meta": "Sao Lourenco da Mata",
        "date": "Aug 2024",
        "logo": "assets/images/campusparty_ltd_logo.jpg"
      },
      {
        "id": "ideathon-caruaru-campusparty-day-event",
        "type": "listener",
        "name": "Caruaru Campus Party Day",
        "role": "Listener",
        "meta": "Caruaru",
        "date": "Sep 2024",
        "logo": "assets/images/campusparty_ltd_logo.jpg"
      },
      {
        "id": "tdc-recife-2024",
        "type": "listener",
        "name": "The Developer's Conference",
        "role": "Listener",
        "meta": "Recife",
        "date": "Oct 2024",
        "logo": "assets/images/recife_front_end_community_logo.jpg"
      },
      {
        "id": "semana-ti-2024",
        "type": "speaker",
        "name": "IT Week UniFavip",
        "role": "Speaker",
        "meta": "Caruaru",
        "date": "May 2024",
        "logo": "assets/images/unifavip_logo.jpg"
      },
      {
        "id": "gdg-devfest-2023",
        "type": "listener",
        "name": "GDG DevFest NE",
        "role": "Listener",
        "meta": "Recife",
        "date": "Dec 2023",
        "logo": "assets/images/google_developers_group_barueri_logo.jpg"
      },
      {
        "id": "workshop-docker-2023",
        "type": "speaker",
        "name": "Docker Hands-on Workshop",
        "role": "Speaker",
        "meta": "UniFavip",
        "date": "Sep 2023",
        "logo": "assets/images/unifavip_logo.jpg"
      }
    ],
    "achievements": [
      {
        "id": "award-kartado-agility-2026",
        "title": "Nomination for Kartado Monthly Agility Award",
        "issuer": "Kartado",
        "logo": "assets/images/Simbolo_Kartado_Footer.svg",
        "date": "Apr 2026"
      },
      {
        "id": "accepted-mentee-alp-2025-2",
        "title": "Accepted Mentee - Aspire Leaders 2025.2 Cohort 5",
        "issuer": "Aspire Institute",
        "logo": "assets/images/aspire-institute-logo-large-updated-2048x695.webp",
        "date": "Oct 2025"
      }
    ],
    "footer": {
      "copy": "&copy; 2025 Everson Filipe. Last updated: July 2026."
    },
    "hero": {
      "overline": "Junior Implementation Engineer · Aspiring AI Engineer",
      "name": "<strong>Everson</strong> Filipe",
      "title": "Technical Implementation · Integrations · Data Integrity",
      "tagline": "Bridging the gap between business requirements and scalable software execution through rigorous data validation and process automation."
    }
  },
  "pt": {
    "about": {
      "p1": "Como Analista de Implantacao especializado em Engenharia de Implantacao e Automacao orientada por IA, transformo requisitos complexos de negocio em <strong>fluxos de trabalho escalaveis e configuracoes de software confiaveis para clientes B2B.</strong>",
      "p2": "Trabalhando diretamente com ERPs em nuvem e plataformas SaaS, configuro solucoes usando Python, Django Admin, JSONLogic e AWS, garantindo integracoes com REST APIs e servicos de BI como o Amazon Athena.",
      "p3": "Meu trabalho e fundamentado em <strong>integridade de dados e padronizacao de fluxos.</strong> Opero dentro de frameworks Ageis, mentoro novos engenheiros e contribuo diretamente em ambientes de producao desde o primeiro dia.",
      "current": "Atualmente na <strong>Kartado</strong> &middot; Aprofundando OOP e UML &middot; Bacharelando em Ciencia da Computacao na UniFavip Wyden",
      "stats": [
        {
          "number": "800",
          "suffix": "+",
          "label": "Tarefas entregues"
        },
        {
          "number": "42",
          "suffix": "+",
          "label": "Clientes B2B atendidos"
        },
        {
          "number": "32",
          "suffix": "%",
          "label": "Contribuição ao output do time nos primeiros meses"
        },
        {
          "number": "10",
          "suffix": "+",
          "label": "Hackathons"
        }
      ],
      "skills": [
        "Python",
        "Django Admin",
        "JSONLogic",
        "REST API",
        "AWS IAM",
        "Amazon S3",
        "EC2",
        "Step Functions",
        "Amazon Athena",
        "Postman",
        "Pytest",
        "openpyxl",
        "Pandas",
        "Jira",
        "ClickUp"
      ]
    },
    "experience": [
      {
        "id": "kartado",
        "role": "Estagiario de Implantacao Tecnica",
        "company": "Kartado",
        "date": "Set 2025 – Presente",
        "bullets": [
          "Configurou regras em JSONLogic para formularios dinamicos em mais de 42 ambientes de clientes via Django Admin, garantindo integridade dos dados e consistencia funcional.",
          "Desenvolveu scripts de automacao ETL em Python integrados ao Django ORM, substituindo fluxos manuais de transformacao e carregamento de dados.",
          "Criou scripts em notebooks Python para extracao de metadados JSON, validacao de esquemas e deteccao proativa de inconsistencias estruturais em datasets exportados.",
          "Corrigiu mapas GIS, ajustou Shapefiles e validou geometrias espaciais para apoiar a parametrizacao de sistemas de concessoes rodoviarias.",
          "Manteve documentacao de integracoes REST API e JWT com scripts de validacao Pytest para modulos Django.",
          "Utilizou AWS IAM, EC2, ECS (Docker), Step Functions, ODBC e Amazon Athena em infraestrutura, acesso seguro, integracao de dados e fluxos de analise.",
          "Automatizou a geracao de planilhas de parametrizacao com Python, Pandas e openpyxl, reduzindo o esforco manual nos fluxos de implantacao."
        ],
        "tags": [
          "Python",
          "Django Admin",
          "JSONLogic",
          "AWS",
          "Postman",
          "Pytest",
          "Pandas"
        ],
        "carousel": {
          "label": "Evidências de Performance e Reconhecimento",
          "slides": [
            {
              "src": "assets/images/kartado_chart.png",
              "alt": "Gráfico de Performance Kartado",
              "caption": "Métricas de Performance - 32% de contribuição no output do time"
            },
            {
              "src": "assets/images/kartado_award.png",
              "alt": "Prêmio de Agilidade Kartado Mentimeter",
              "caption": "Indicado a Agilidade do Mês - 'Éverson, sempre disposto a corrigir pequenos bugs e acelerar processos'"
            },
            {
              "src": "assets/images/kartado_welcome.png",
              "alt": "Kit de Boas-vindas Kartado",
              "caption": "Kit de Boas-vindas recebido ao entrar no time Kartado"
            }
          ]
        },
        "logo": "assets/images/Simbolo_Kartado_Footer.svg",
        "specificAchievements": [
          {
            "tag": "Otimização",
            "description": "Reduziu o tempo de análise de parametrização em 40% com scripts Python de validação de esquemas."
          },
          {
            "tag": "Qualidade",
            "description": "Garantia de zero falhas de sintaxe em produção em mais de 20 planilhas de concessionárias B2B."
          }
        ]
      },
      {
        "id": "daus",
        "role": "Aprendiz em Gestao Agil de Produtos",
        "company": "Daus",
        "date": "Dez 2024 – Jun 2025",
        "bullets": [
          "Aplicou Scrum, Kanban e Lean Thinking para conduzir Product Discovery e analise de requisitos em projetos internos e de multiplos clientes.",
          "Documentou insights de produto, fluxos de usuarios e requisitos funcionais no ecossistema Atlassian (Jira, Confluence) e FigJam.",
          "Mentorou duas turmas de estagiarios em programas de onboarding em Gestao Agil de Produtos e entrega de MVPs."
        ],
        "tags": [
          "Jira",
          "Confluence",
          "Figma",
          "Miro",
          "Scrum",
          "Kanban"
        ],
        "logo": "assets/images/daus_software_house_logo.jpg",
        "specificAchievements": [
          {
            "tag": "Mentoria",
            "description": "Sucesso no onboarding e mentoria de 2 turmas de estagiários em práticas de frameworks Ágeis e entrega de MVPs."
          }
        ]
      },
      {
        "id": "freelance-dev",
        "role": "Desenvolvedor Web Freelancer",
        "company": "Autônomo",
        "date": "Jun 2024 – Nov 2024",
        "bullets": [
          "Desenvolveu landing pages e portfólios responsivos para empresas locais usando HTML, CSS e Javascript.",
          "Integrou formulários serverless de contato simples e notificações automatizadas por email."
        ],
        "tags": [
          "Javascript",
          "Python"
        ],
        "specificAchievements": [
          {
            "tag": "Entrega",
            "description": "Concluiu com sucesso 5 projetos de clientes dentro do prazo e orçamento."
          }
        ]
      },
      {
        "id": "tech-support",
        "role": "Assistente de Suporte Técnico",
        "company": "TI Solutions",
        "date": "Jan 2024 – Mai 2024",
        "bullets": [
          "Forneceu suporte tier-1 para plataformas de software internas e resolveu problemas de configuração de banco de dados.",
          "Manteve documentação para processos de parametrização de sistemas."
        ],
        "tags": [
          "Jira",
          "SQL"
        ],
        "specificAchievements": []
      },
      {
        "id": "intern-ops",
        "role": "Estagiário de Operações",
        "company": "LogiTech",
        "date": "Jul 2023 – Dez 2023",
        "bullets": [
          "Auxiliou nos procedimentos diários de auditoria de sistemas e verificação de logs para garantir consistência de dados.",
          "Automatizou a formatação de relatórios operacionais usando macros Excel e scripts Python."
        ],
        "tags": [
          "Python",
          "Excel"
        ],
        "specificAchievements": []
      }
    ],
    "education": [
      {
        "id": "mentoria-labai-institutojoule-ia2025",
        "type": "Programa de Mentoria",
        "degree": "Programa de Mentoria em Inteligência Artificial",
        "institution": "Oferecido pela LAB.AI, do Instituto Joule",
        "date": "Ago 2025 – Set 2025",
        "logo": "assets/images/instituto_joule_logo.jpg",
        "highlights": [
          "Mentoria de IA",
          "Preparação de Carreira",
          "Certificado Lab.AI"
        ]
      },
      {
        "id": "graduacao-ciencia-computacao-unifavipwyden",
        "type": "Bacharelado",
        "degree": "Ciência da Computação",
        "institution": "UniFavip Wyden",
        "date": "Fev 2024 – Em curso",
        "logo": "assets/images/unifavip_logo.jpg",
        "highlights": [
          "Média Geral: 9.2/10",
          "Mais de 1200 Horas Cursadas",
          "Foco em Algoritmos e POO"
        ]
      }
    ],
    "courses": [
      {
        "id": "curso-postman-zeroaoavancado",
        "type": "api",
        "name": "Postman: Do Zero ao Avançado + Testes Automatizados",
        "provider": "Udemy",
        "date": "Dez 2025",
        "credentialUrl": "https://www.udemy.com/certificate/UC-12234f7a-0178-4a06-b809-864522caa58c/"
      },
      {
        "id": "curso-applicationprogramminginterfaces-api",
        "type": "api",
        "name": "Interface de Programação de Aplicação: APIs e Web Services",
        "provider": "Udemy",
        "date": "Dez 2025",
        "credentialUrl": "https://www.udemy.com/certificate/UC-9eff9f3e-ab9e-4e05-86e2-181eddd6e921/"
      },
      {
        "id": "curso-labai-mentoria2025",
        "type": "ai",
        "name": "Lab.AI: Preparando a Próxima Geração para o Futuro do Trabalho",
        "provider": "Instituto Joule",
        "date": "Set 2025",
        "credentialUrl": "https://academy.institutojoule.org/certificado/?cert_hash=6710237ef0505f06"
      },
      {
        "id": "curso-skillsbuild-customerengagement",
        "type": "softskills",
        "name": "SkillsBuild - Engajamento do Cliente: Resolução de Problemas e Controles de Processos",
        "provider": "IBM",
        "date": "Ago 2025",
        "credentialUrl": "https://www.credly.com/badges/a9ac260f-4415-43d0-a2e2-479478acbddd/linked_in_profile"
      },
      {
        "id": "curso-efset-2025",
        "type": "languages",
        "name": "Certificado de Inglês EF SET 69/100 (C1 Avançado)",
        "provider": "EF Education First",
        "date": "Mar 2025",
        "credentialUrl": "https://cert.efset.org/en/88BaNL"
      }
    ],
    "projects": [],
    "certifications": [],
    "volunteering": [
      {
        "id": "co-organizer-gdgbarueri",
        "role": "Coorganizador",
        "org": "Google Developers Group (GDG Barueri)",
        "date": "Ago 2025 - Atual",
        "logo": "assets/images/google_developers_group_barueri_logo.jpg",
        "highlights": [
          "Meetups de Tecnologia",
          "Engajamento Comunitário",
          "Ecossistema Google Developer"
        ]
      },
      {
        "id": "ambassador-facilitator-politize",
        "role": "Embaixador e Facilitador",
        "org": "Politize! (Politize! Caruaru)",
        "date": "Mai 2025 - Atual",
        "logo": "assets/images/politize__logo.jpg",
        "highlights": [
          "Oficinas de Educação Cívica",
          "Mais de 15 Sessões Facilitadas",
          "Liderança Pública"
        ]
      },
      {
        "id": "aiesecmackenzie-volunteer",
        "role": "Membro do Comitê de OGT e Marketing",
        "org": "AIESEC (AIESEC no Mackenzie)",
        "date": "Mar 2025 - Ago 2025",
        "logo": "assets/images/1754110.webp",
        "highlights": [
          "Vendas B2B",
          "Gestão do Programa OGT",
          "Liderança Intercultural"
        ]
      },
      {
        "id": "vainaweb-volunteering",
        "role": "Instrutor de Soft Skills",
        "org": "Vai Na Web",
        "date": "Jan 2025",
        "logo": "assets/images/vai_na_web.jpg",
        "highlights": [
          "Treinamento de Soft Skills",
          "Mentoria de Carreira Tech",
          "Foco em Inclusão"
        ]
      },
      {
        "id": "youth-volunteer-br",
        "role": "Embaixador da Juventude",
        "org": "Global Youth Network",
        "date": "Jul 2023 - Dez 2023",
        "logo": "assets/images/google_developers_group_barueri_logo.jpg",
        "highlights": [
          "Networking Global",
          "Liderança Jovem",
          "Foco em ODS"
        ]
      },
      {
        "id": "tech-tutor-local",
        "role": "Tutor de Python",
        "org": "Coders Solidários",
        "date": "Jan 2023 - Jun 2023",
        "logo": "assets/images/google_developers_group_barueri_logo.jpg",
        "highlights": [
          "Ensino de Python",
          "Introdução a Algoritmos",
          "Tutor Comunitário"
        ]
      },
      {
        "id": "community-mod-disc",
        "role": "Moderador de Comunidade",
        "org": "Devs Caruaru",
        "date": "Jun 2022 - Dez 2022",
        "logo": "assets/images/google_developers_group_barueri_logo.jpg",
        "highlights": [
          "Moderação Discord",
          "Coordenação Eventos",
          "Apoio a Devs"
        ]
      }
    ],
    "hackathons": [
      {
        "id": "hackathon-havk-hacking-the-desert",
        "name": "Hackathon HAVK - Hacking the Desert",
        "meta": "HAVK",
        "date": "Jul 2025"
      },
      {
        "id": "vox-astra-hackathon",
        "name": "VOX ASTRA Hackathon",
        "meta": "EQ Hacks",
        "date": "Mai 2025"
      },
      {
        "id": "2025-hackatopia-hackathon",
        "name": "2025 Hackatopia Hackathon",
        "meta": "YPStem",
        "date": "Abr 2025"
      },
      {
        "id": "hackathon-fenearte",
        "name": "Hackathon Fenearte",
        "meta": "Porto Digital",
        "date": "Fev 2025"
      },
      {
        "id": "ideathon-ac",
        "name": "Ideathon AC",
        "meta": "Porto Digital",
        "date": "Fev 2025"
      },
      {
        "id": "hackathon-impulso-regional",
        "name": "Hackathon Impulso Regional",
        "meta": "ENAP",
        "date": "Dez 2024"
      },
      {
        "id": "hackathon-luminahub",
        "name": "Hackathon Luminahub",
        "meta": "Luminahub",
        "date": "Dez 2024"
      },
      {
        "id": "hackathon-dataflow",
        "name": "Hackathon Data Flow",
        "meta": "Porto Digital",
        "date": "Ago 2024"
      },
      {
        "id": "ideathon-caruaru-campusparty-day",
        "name": "Ideathon - Caruaru Campus Party Day",
        "meta": "Porto Digital",
        "date": "Ago 2024"
      },
      {
        "id": "olimpiadas-jovens-impacto",
        "name": "Olimpíadas Jovens de Impacto",
        "meta": "SEBRAE & Instituto Verda",
        "date": "Nov 2021"
      },
      {
        "id": "hackathon-nasa-2021",
        "name": "NASA Space Apps Challenge",
        "meta": "NASA",
        "date": "Out 2021"
      },
      {
        "id": "hackathon-sebrae-2021",
        "name": "Hackathon Startup SEBRAE",
        "meta": "SEBRAE",
        "date": "Set 2021"
      },
      {
        "id": "hackathon-hack-caruaru-2020",
        "name": "HackCaruaru 2020",
        "meta": "Caruaru Digital",
        "date": "Nov 2020"
      }
    ],
    "events": [
      {
        "id": "flisol-palmares-2026",
        "type": "speaker",
        "name": "FLISoL 2026",
        "role": "Palestrante",
        "meta": "IFPE/Palmares",
        "date": "Abr 2026",
        "logo": "assets/images/photo_flisol_logo.webp"
      },
      {
        "id": "expotech-2025-2",
        "type": "exhibitor",
        "name": "ExpoTech 2025.2",
        "role": "Expositor",
        "meta": "UniFavip Wyden",
        "date": "Dez 2025",
        "logo": "assets/images/unifavip_logo.jpg"
      },
      {
        "id": "festival-agile-trends-2025",
        "type": "listener",
        "name": "Festival Agile Trends 2025",
        "role": "Participante",
        "meta": "Remoto",
        "date": "Nov 2025",
        "logo": "assets/images/agile_trends_logo.jpg"
      },
      {
        "id": "expotech-2025-1",
        "type": "exhibitor",
        "name": "ExpoTech 2025.1",
        "role": "Expositor",
        "meta": "UniFavip Wyden",
        "date": "Jun 2025",
        "logo": "assets/images/unifavip_logo.jpg"
      },
      {
        "id": "brics-youth-2025",
        "type": "listener",
        "name": "BRICS Youth",
        "role": "Participante",
        "meta": "Remoto",
        "date": "Mai 2025",
        "logo": "assets/images/brics_youth_alliance_2025.jpg"
      },
      {
        "id": "as-tendencias-para-novasgeracoes-2025-1",
        "type": "speaker",
        "name": "As Tendências para as Novas Gerações de Profissionais",
        "role": "Palestrante",
        "meta": "Recife Front-End Community",
        "date": "Fev 2025",
        "logo": "assets/images/recife_front_end_community_logo.jpg"
      },
      {
        "id": "expotech-2024-2",
        "type": "exhibitor",
        "name": "ExpoTech 2024.2",
        "role": "Expositor",
        "meta": "UniFavip Wyden",
        "date": "Nov 2024",
        "logo": "assets/images/unifavip_logo.jpg"
      },
      {
        "id": "campus-party-nordeste-2024",
        "type": "listener",
        "name": "Campus Party NE 2024",
        "role": "Participante",
        "meta": "Sao Lourenco da Mata",
        "date": "Ago 2024",
        "logo": "assets/images/campusparty_ltd_logo.jpg"
      },
      {
        "id": "ideathon-caruaru-campusparty-day-event",
        "type": "listener",
        "name": "Caruaru Campus Party Day",
        "role": "Participante",
        "meta": "Caruaru",
        "date": "Set 2024",
        "logo": "assets/images/campusparty_ltd_logo.jpg"
      },
      {
        "id": "tdc-recife-2024",
        "type": "listener",
        "name": "The Developer's Conference",
        "role": "Participante",
        "meta": "Recife",
        "date": "Out 2024",
        "logo": "assets/images/recife_front_end_community_logo.jpg"
      },
      {
        "id": "semana-ti-2024",
        "type": "speaker",
        "name": "Semana de TI UniFavip",
        "role": "Palestrante",
        "meta": "Caruaru",
        "date": "Mai 2024",
        "logo": "assets/images/unifavip_logo.jpg"
      },
      {
        "id": "gdg-devfest-2023",
        "type": "listener",
        "name": "GDG DevFest NE",
        "role": "Participante",
        "meta": "Recife",
        "date": "Dez 2023",
        "logo": "assets/images/google_developers_group_barueri_logo.jpg"
      },
      {
        "id": "workshop-docker-2023",
        "type": "speaker",
        "name": "Workshop Prático de Docker",
        "role": "Palestrante",
        "meta": "UniFavip",
        "date": "Set 2023",
        "logo": "assets/images/unifavip_logo.jpg"
      }
    ],
    "achievements": [
      {
        "id": "award-kartado-agility-2026",
        "title": "Nomeação ao Prêmio Mensal de Agilidade Kartado",
        "issuer": "Kartado",
        "logo": "assets/images/Simbolo_Kartado_Footer.svg",
        "date": "Abr 2026"
      },
      {
        "id": "accepted-mentee-alp-2025-2",
        "title": "Mentorado Aceito - Aspire Leaders 2025.2 Cohort 5",
        "issuer": "Aspire Institute",
        "logo": "assets/images/aspire-institute-logo-large-updated-2048x695.webp",
        "date": "Out 2025"
      }
    ],
    "footer": {
      "copy": "&copy; 2025 Everson Filipe. Última atualização: Julho de 2026."
    },
    "hero": {
      "overline": "Engenheiro de Implantação Júnior · Aspirante a AI Engineer",
      "name": "<strong>Everson</strong> Filipe",
      "title": "Implantação Técnica · Integrações · Integridade de Dados",
      "tagline": "Unindo requisitos de negócio à execução escalável de software por meio de validação de dados e automação de processos."
    }
  },
  "es": {
    "about": {
      "p1": "Como Analista de Implementacion especializado en Ingenieria de Implementacion y Automatizacion con IA, transformo requisitos complejos en <strong>flujos de trabajo escalables y configuraciones de software confiables para clientes B2B.</strong>",
      "p2": "Trabajando con ERPs en la nube y plataformas SaaS, configuro soluciones con Python, Django Admin, JSONLogic y AWS, asegurando integraciones con REST APIs y servicios de BI como Amazon Athena.",
      "p3": "Mi trabajo se basa en la <strong>integridad de datos y estandarizacion de flujos.</strong> Opero dentro de marcos Agiles, mentoreo a nuevos ingenieros y contribuyo directamente en entornos de produccion desde el primer dia.",
      "current": "Actualmente en <strong>Kartado</strong> &middot; Profundizando OOP y UML &middot; Licenciatura en Ciencias de la Computacion en UniFavip Wyden",
      "stats": [
        {
          "number": "800",
          "suffix": "+",
          "label": "Tareas entregadas"
        },
        {
          "number": "42",
          "suffix": "+",
          "label": "Clientes B2B atendidos"
        },
        {
          "number": "32",
          "suffix": "%",
          "label": "Contribución al output del equipo en los primeros meses"
        },
        {
          "number": "10",
          "suffix": "+",
          "label": "Hackathones"
        }
      ],
      "skills": [
        "Python",
        "Django Admin",
        "JSONLogic",
        "REST API",
        "AWS IAM",
        "Amazon S3",
        "EC2",
        "Step Functions",
        "Amazon Athena",
        "Postman",
        "Pytest",
        "openpyxl",
        "Pandas",
        "Jira",
        "ClickUp"
      ]
    },
    "experience": [
      {
        "id": "kartado",
        "role": "Pasante de Implementacion Tecnica",
        "company": "Kartado",
        "date": "Sep 2025 – Presente",
        "bullets": [
          "Configuro reglas JSONLogic para formularios dinamicos en mas de 42 entornos de clientes via Django Admin, asegurando integridad de datos y consistencia funcional.",
          "Desarrollo scripts ETL en Python integrados con Django ORM, reemplazando flujos manuales de transformacion y carga de datos.",
          "Construyo scripts en notebooks Python para extraccion de metadatos JSON, validacion de esquemas y deteccion proactiva de inconsistencias estructurales.",
          "Corrigio mapas GIS, ajusto Shapefiles y valido geometrias espaciales para parametrizacion de sistemas de concesiones viales.",
          "Mantuvo documentacion de integraciones REST API y JWT junto con scripts Pytest para modulos Django.",
          "Utilizo AWS IAM, EC2, ECS (Docker), Step Functions, ODBC y Amazon Athena en infraestructura, acceso seguro, integracion de datos y flujos de analisis.",
          "Automatizo la generacion de planillas de parametrizacion con Python, Pandas y openpyxl, reduciendo el esfuerzo manual en flujos de implementacion."
        ],
        "tags": [
          "Python",
          "Django Admin",
          "JSONLogic",
          "AWS",
          "Postman",
          "Pytest",
          "Pandas"
        ],
        "carousel": {
          "label": "Evidencias de Desempeño y Reconocimiento",
          "slides": [
            {
              "src": "assets/images/kartado_chart.png",
              "alt": "Gráfico de Rendimiento de Kartado",
              "caption": "Métricas de rendimiento: 32% de contribución al rendimiento del equipo"
            },
            {
              "src": "assets/images/kartado_award.png",
              "alt": "Premio a la Agilidad de Kartado Mentimeter",
              "caption": "Nominado a la Agilidad del Mes: 'Everson, siempre listo para corregir errores y acelerar procesos'"
            },
            {
              "src": "assets/images/kartado_welcome.png",
              "alt": "Kit de Bienvenida de Kartado",
              "caption": "Kit de bienvenida recibido al unirse al equipo de Kartado"
            }
          ]
        },
        "logo": "assets/images/Simbolo_Kartado_Footer.svg",
        "specificAchievements": [
          {
            "tag": "Optimización",
            "description": "Redujo el tiempo de análisis de parametrización en un 40% con scripts Python de validación de esquemas."
          },
          {
            "tag": "Calidad",
            "description": "Garantizó cero fallas de sintaxis en producción en más de 20 hojas de concesionarias B2B."
          }
        ]
      },
      {
        "id": "daus",
        "role": "Aprendiz en Gestion Agil de Productos",
        "company": "Daus",
        "date": "Dic 2024 – Jun 2025",
        "bullets": [
          "Aplico Scrum, Kanban y Lean Thinking para Product Discovery y analisis de requisitos en proyectos internos y de multiples clientes.",
          "Documento insights de producto, flujos de usuarios y requisitos funcionales en el ecosistema Atlassian (Jira, Confluence) y FigJam.",
          "Mentoreo dos cohortes de pasantes en programas de onboarding en Gestion Agil de Productos y entrega de MVPs."
        ],
        "tags": [
          "Jira",
          "Confluence",
          "Figma",
          "Miro",
          "Scrum",
          "Kanban"
        ],
        "logo": "assets/images/daus_software_house_logo.jpg",
        "specificAchievements": [
          {
            "tag": "Mentoría",
            "description": "Éxito en el onboarding y tutoría de 2 cohortes de pasantes en prácticas de frameworks Ágiles y entrega de MVPs."
          }
        ]
      },
      {
        "id": "freelance-dev",
        "role": "Desarrollador Web Freelance",
        "company": "Autónomo",
        "date": "Jun 2024 – Nov 2024",
        "bullets": [
          "Desarrolló páginas de destino y portafolios responsivos para empresas locales usando HTML, CSS y Javascript.",
          "Integró formularios serverless de contacto simples y notificaciones automatizadas por correo electrónico."
        ],
        "tags": [
          "Javascript",
          "Python"
        ],
        "specificAchievements": [
          {
            "tag": "Entrega",
            "description": "Completó con éxito 5 proyectos de clientes dentro del plazo y presupuesto."
          }
        ]
      },
      {
        "id": "tech-support",
        "role": "Asistente de Soporte Técnico",
        "company": "TI Solutions",
        "date": "Ene 2024 – May 2024",
        "bullets": [
          "Brindó soporte técnico de nivel 1 para plataformas internas y resolvió problemas de configuración de bases de datos.",
          "Mantuvo documentación para procesos de parametrización de sistemas."
        ],
        "tags": [
          "Jira",
          "SQL"
        ],
        "specificAchievements": []
      },
      {
        "id": "intern-ops",
        "role": "Pasante de Operaciones",
        "company": "LogiTech",
        "date": "Jul 2023 – Dic 2023",
        "bullets": [
          "Asistió en los procedimientos diarios de auditoría de sistemas y verificación de logs para garantizar consistencia de datos.",
          "Automatizó la edición de informes operativos usando macros Excel y scripts Python."
        ],
        "tags": [
          "Python",
          "Excel"
        ],
        "specificAchievements": []
      }
    ],
    "education": [
      {
        "id": "mentoria-labai-institutojoule-ia2025",
        "type": "Programa de Mentoría",
        "degree": "Programa de Mentoría en Inteligencia Artificial",
        "institution": "Ofrecido por LAB.AI, del Instituto Joule",
        "date": "Ago 2025 – Sep 2025",
        "logo": "assets/images/instituto_joule_logo.jpg",
        "highlights": [
          "Mentoría de IA",
          "Preparación de Carrera",
          "Certificado Lab.AI"
        ]
      },
      {
        "id": "graduacao-ciencia-computacao-unifavipwyden",
        "type": "Licenciatura",
        "degree": "Ciencias de la Computación",
        "institution": "UniFavip Wyden",
        "date": "Feb 2024 – En curso",
        "logo": "assets/images/unifavip_logo.jpg",
        "highlights": [
          "Média General: 9.2/10",
          "Más de 1200 Horas Cursadas",
          "Enfoque en Algoritmos y POO"
        ]
      }
    ],
    "courses": [
      {
        "id": "curso-postman-zeroaoavancado",
        "type": "api",
        "name": "Postman: De Cero a Avanzado + Pruebas Automatizadas",
        "provider": "Udemy",
        "date": "Dic 2025",
        "credentialUrl": "https://www.udemy.com/certificate/UC-12234f7a-0178-4a06-b809-864522caa58c/"
      },
      {
        "id": "curso-applicationprogramminginterfaces-api",
        "type": "api",
        "name": "Interfaz de Programación de Aplicaciones: APIs y Servicios Web",
        "provider": "Udemy",
        "date": "Dic 2025",
        "credentialUrl": "https://www.udemy.com/certificate/UC-9eff9f3e-ab9e-4e05-86e2-181eddd6e921/"
      },
      {
        "id": "curso-labai-mentoria2025",
        "type": "ai",
        "name": "Lab.AI: Preparando la Próxima Generación para el Futuro del Trabajo",
        "provider": "Instituto Joule",
        "date": "Sep 2025",
        "credentialUrl": "https://academy.institutojoule.org/certificado/?cert_hash=6710237ef0505f06"
      },
      {
        "id": "curso-skillsbuild-customerengagement",
        "type": "softskills",
        "name": "SkillsBuild - Compromiso con el Cliente: Resolución de Problemas y Controles de Procesos",
        "provider": "IBM",
        "date": "Ago 2025",
        "credentialUrl": "https://www.credly.com/badges/a9ac260f-4415-43d0-a2e2-479478acbddd/linked_in_profile"
      },
      {
        "id": "curso-efset-2025",
        "type": "languages",
        "name": "Certificado de Inglés EF SET 69/100 (C1 Avanzado)",
        "provider": "EF Education First",
        "date": "Mar 2025",
        "credentialUrl": "https://cert.efset.org/en/88BaNL"
      }
    ],
    "projects": [],
    "certifications": [],
    "volunteering": [
      {
        "id": "co-organizer-gdgbarueri",
        "role": "Coorganizador",
        "org": "Google Developers Group (GDG Barueri)",
        "date": "Ago 2025 - Actual",
        "logo": "assets/images/google_developers_group_barueri_logo.jpg",
        "highlights": [
          "Meetups de Tecnología",
          "Compromiso Comunitario",
          "Ecosistema Google Developer"
        ]
      },
      {
        "id": "ambassador-facilitator-politize",
        "role": "Embajador y Facilitador",
        "org": "Politize! (Politize! Caruaru)",
        "date": "May 2025 - Actual",
        "logo": "assets/images/politize__logo.jpg",
        "highlights": [
          "Talleres de Educación Cívica",
          "Más de 15 Sesiones Facilitadas",
          "Liderazgo Público"
        ]
      },
      {
        "id": "aiesecmackenzie-volunteer",
        "role": "Miembro del Comité de OGT y Marketing",
        "org": "AIESEC (AIESEC en Mackenzie)",
        "date": "Mar 2025 - Ago 2025",
        "logo": "assets/images/1754110.webp",
        "highlights": [
          "Ventas B2B",
          "Gestión del Programa OGT",
          "Liderazgo Intercultural"
        ]
      },
      {
        "id": "vainaweb-volunteering",
        "role": "Instructor de Habilidades Blandas (Soft Skills)",
        "org": "Vai Na Web",
        "date": "Ene 2025",
        "logo": "assets/images/vai_na_web.jpg",
        "highlights": [
          "Formación de Soft Skills",
          "Mentoría de Carrera Tech",
          "Enfoque en Inclusión"
        ]
      },
      {
        "id": "youth-volunteer-br",
        "role": "Embajador de la Juventud",
        "org": "Global Youth Network",
        "date": "Jul 2023 - Dic 2023",
        "logo": "assets/images/google_developers_group_barueri_logo.jpg",
        "highlights": [
          "Networking Global",
          "Liderazgo Joven",
          "Enfoque en ODS"
        ]
      },
      {
        "id": "tech-tutor-local",
        "role": "Tutor de Python",
        "org": "Coders Solidarios",
        "date": "Ene 2023 - Jun 2023",
        "logo": "assets/images/google_developers_group_barueri_logo.jpg",
        "highlights": [
          "Enseñanza de Python",
          "Intro a Algoritmos",
          "Tutor Comunitario"
        ]
      },
      {
        "id": "community-mod-disc",
        "role": "Moderador de Comunidad",
        "org": "Devs Caruaru",
        "date": "Jun 2022 - Dic 2022",
        "logo": "assets/images/google_developers_group_barueri_logo.jpg",
        "highlights": [
          "Moderación Discord",
          "Coordinación Eventos",
          "Apoyo a Devs"
        ]
      }
    ],
    "hackathons": [
      {
        "id": "hackathon-havk-hacking-the-desert",
        "name": "Hackathon HAVK - Hacking the Desert",
        "meta": "HAVK",
        "date": "Jul 2025"
      },
      {
        "id": "vox-astra-hackathon",
        "name": "VOX ASTRA Hackathon",
        "meta": "EQ Hacks",
        "date": "May 2025"
      },
      {
        "id": "2025-hackatopia-hackathon",
        "name": "2025 Hackatopia Hackathon",
        "meta": "YPStem",
        "date": "Abr 2025"
      },
      {
        "id": "hackathon-fenearte",
        "name": "Hackathon Fenearte",
        "meta": "Porto Digital",
        "date": "Feb 2025"
      },
      {
        "id": "ideathon-ac",
        "name": "Ideathon AC",
        "meta": "Porto Digital",
        "date": "Feb 2025"
      },
      {
        "id": "hackathon-impulso-regional",
        "name": "Hackathon Impulso Regional",
        "meta": "ENAP",
        "date": "Dic 2024"
      },
      {
        "id": "hackathon-luminahub",
        "name": "Hackathon Luminahub",
        "meta": "Luminahub",
        "date": "Dic 2024"
      },
      {
        "id": "hackathon-dataflow",
        "name": "Hackathon Data Flow",
        "meta": "Porto Digital",
        "date": "Ago 2024"
      },
      {
        "id": "ideathon-caruaru-campusparty-day",
        "name": "Ideathon - Caruaru Campus Party Day",
        "meta": "Porto Digital",
        "date": "Ago 2024"
      },
      {
        "id": "olimpiadas-jovens-impacto",
        "name": "Olimpíadas Jóvenes de Impacto",
        "meta": "SEBRAE & Instituto Verda",
        "date": "Nov 2021"
      },
      {
        "id": "hackathon-nasa-2021",
        "name": "NASA Space Apps Challenge",
        "meta": "NASA",
        "date": "Oct 2021"
      },
      {
        "id": "hackathon-sebrae-2021",
        "name": "Hackathon Startup SEBRAE",
        "meta": "SEBRAE",
        "date": "Sep 2021"
      },
      {
        "id": "hackathon-hack-caruaru-2020",
        "name": "HackCaruaru 2020",
        "meta": "Caruaru Digital",
        "date": "Nov 2020"
      }
    ],
    "events": [
      {
        "id": "flisol-palmares-2026",
        "type": "speaker",
        "name": "FLISoL 2026",
        "role": "Ponente",
        "meta": "IFPE/Palmares",
        "date": "Abr 2026",
        "logo": "assets/images/photo_flisol_logo.webp"
      },
      {
        "id": "expotech-2025-2",
        "type": "exhibitor",
        "name": "ExpoTech 2025.2",
        "role": "Expositor",
        "meta": "UniFavip Wyden",
        "date": "Dic 2025",
        "logo": "assets/images/unifavip_logo.jpg"
      },
      {
        "id": "festival-agile-trends-2025",
        "type": "listener",
        "name": "Festival Agile Trends 2025",
        "role": "Asistente",
        "meta": "Remoto",
        "date": "Nov 2025",
        "logo": "assets/images/agile_trends_logo.jpg"
      },
      {
        "id": "expotech-2025-1",
        "type": "exhibitor",
        "name": "ExpoTech 2025.1",
        "role": "Expositor",
        "meta": "UniFavip Wyden",
        "date": "Jun 2025",
        "logo": "assets/images/unifavip_logo.jpg"
      },
      {
        "id": "brics-youth-2025",
        "type": "listener",
        "name": "BRICS Youth",
        "role": "Asistente",
        "meta": "Remoto",
        "date": "May 2025",
        "logo": "assets/images/brics_youth_alliance_2025.jpg"
      },
      {
        "id": "as-tendencias-para-novasgeracoes-2025-1",
        "type": "speaker",
        "name": "Tendencias para las Nuevas Generaciones de Profesionales",
        "role": "Ponente",
        "meta": "Recife Front-End Community",
        "date": "Feb 2025",
        "logo": "assets/images/recife_front_end_community_logo.jpg"
      },
      {
        "id": "expotech-2024-2",
        "type": "exhibitor",
        "name": "ExpoTech 2024.2",
        "role": "Expositor",
        "meta": "UniFavip Wyden",
        "date": "Nov 2024",
        "logo": "assets/images/unifavip_logo.jpg"
      },
      {
        "id": "campus-party-nordeste-2024",
        "type": "listener",
        "name": "Campus Party NE 2024",
        "role": "Asistente",
        "meta": "Sao Lourenco da Mata",
        "date": "Ago 2024",
        "logo": "assets/images/campusparty_ltd_logo.jpg"
      },
      {
        "id": "ideathon-caruaru-campusparty-day-event",
        "type": "listener",
        "name": "Caruaru Campus Party Day",
        "role": "Asistente",
        "meta": "Caruaru",
        "date": "Sep 2024",
        "logo": "assets/images/campusparty_ltd_logo.jpg"
      },
      {
        "id": "tdc-recife-2024",
        "type": "listener",
        "name": "The Developer's Conference",
        "role": "Asistente",
        "meta": "Recife",
        "date": "Oct 2024",
        "logo": "assets/images/recife_front_end_community_logo.jpg"
      },
      {
        "id": "semana-ti-2024",
        "type": "speaker",
        "name": "Semana de TI UniFavip",
        "role": "Ponente",
        "meta": "Caruaru",
        "date": "May 2024",
        "logo": "assets/images/unifavip_logo.jpg"
      },
      {
        "id": "gdg-devfest-2023",
        "type": "listener",
        "name": "GDG DevFest NE",
        "role": "Asistente",
        "meta": "Recife",
        "date": "Dic 2023",
        "logo": "assets/images/google_developers_group_barueri_logo.jpg"
      },
      {
        "id": "workshop-docker-2023",
        "type": "speaker",
        "name": "Taller de Docker Práctico",
        "role": "Ponente",
        "meta": "UniFavip",
        "date": "Sep 2023",
        "logo": "assets/images/unifavip_logo.jpg"
      }
    ],
    "achievements": [
      {
        "id": "award-kartado-agility-2026",
        "title": "Nominación al Premio Mensual de Agilidad Kartado",
        "issuer": "Kartado",
        "logo": "assets/images/Simbolo_Kartado_Footer.svg",
        "date": "Abr 2026"
      },
      {
        "id": "accepted-mentee-alp-2025-2",
        "title": "Mentee Aceptado - Aspire Leaders 2025.2 Cohort 5",
        "issuer": "Aspire Institute",
        "logo": "assets/images/aspire-institute-logo-large-updated-2048x695.webp",
        "date": "Oct 2025"
      }
    ],
    "footer": {
      "copy": "&copy; 2025 Everson Filipe. Última actualización: Julio de 2026."
    },
    "hero": {
      "overline": "Ingeniero de Implementación Junior · Aspirante a AI Engineer",
      "name": "<strong>Everson</strong> Filipe",
      "title": "Implementación Técnica · Integraciones · Integridad de Datos",
      "tagline": "Conectando requisitos de negocio con ejecución escalable de software a través de validación rigurosa de datos y automatización de procesos."
    }
  },
  "filters": {
    "experience": [
      {
        "id": "all",
        "label": {
          "en": "All",
          "pt": "Todos",
          "es": "Todos"
        }
      },
      {
        "id": "Python",
        "label": {
          "en": "Python",
          "pt": "Python",
          "es": "Python"
        }
      },
      {
        "id": "Django Admin",
        "label": {
          "en": "Django Admin",
          "pt": "Django Admin",
          "es": "Django Admin"
        }
      },
      {
        "id": "JSONLogic",
        "label": {
          "en": "JSONLogic",
          "pt": "JSONLogic",
          "es": "JSONLogic"
        }
      },
      {
        "id": "AWS",
        "label": {
          "en": "AWS",
          "pt": "AWS",
          "es": "AWS"
        }
      },
      {
        "id": "Jira",
        "label": {
          "en": "Jira",
          "pt": "Jira",
          "es": "Jira"
        }
      },
      {
        "id": "Scrum",
        "label": {
          "en": "Scrum",
          "pt": "Scrum",
          "es": "Scrum"
        }
      }
    ],
    "courses": [
      {
        "id": "all",
        "label": {
          "en": "All",
          "pt": "Todos",
          "es": "Todos"
        }
      },
      {
        "id": "api",
        "label": {
          "en": "API & Backend",
          "pt": "API e Backend",
          "es": "API y Backend"
        }
      },
      {
        "id": "ai",
        "label": {
          "en": "AI",
          "pt": "IA",
          "es": "IA"
        }
      },
      {
        "id": "softskills",
        "label": {
          "en": "Soft Skills",
          "pt": "Soft Skills",
          "es": "Soft Skills"
        }
      },
      {
        "id": "languages",
        "label": {
          "en": "Languages",
          "pt": "Idiomas",
          "es": "Idiomas"
        }
      }
    ],
    "events": [
      {
        "id": "all",
        "label": {
          "en": "All",
          "pt": "Todos",
          "es": "Todos"
        }
      },
      {
        "id": "speaker",
        "label": {
          "en": "Speaker",
          "pt": "Palestrante",
          "es": "Speaker"
        }
      },
      {
        "id": "exhibitor",
        "label": {
          "en": "Exhibitor",
          "pt": "Expositor",
          "es": "Expositor"
        }
      },
      {
        "id": "listener",
        "label": {
          "en": "Listener",
          "pt": "Participante",
          "es": "Participante"
        }
      }
    ]
  }
};
})();
