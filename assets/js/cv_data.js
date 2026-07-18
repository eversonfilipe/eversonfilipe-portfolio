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
            "label": "B2B2G Client environments configured"
          },
          {
            "number": "32",
            "suffix": "%",
            "label": "Team output contribution in the firsts months"
          },
          {
            "number": "99.48",
            "suffix": "%",
            "label": "H1 2026 team delivery (100% personal on-time)"
          },
          {
            "number": "10",
            "suffix": "+",
            "label": "Hackathons"
          }
        ],
        "skills": [
          {
            "name": "Python",
            "icon": "assets/images/python-svgrepo-com.svg"
          },
          {
            "name": "Django",
            "icon": "assets/images/django-svgrepo-com.svg"
          },
          {
            "name": "JSONLogic",
            "icon": "assets/images/json-svgrepo-com.svg"
          },
          {
            "name": "REST API",
            "icon": "assets/images/api-svgrepo-com.svg"
          },
          {
            "name": "AWS",
            "icon": "assets/images/aws_icon.svg"
          },
          {
            "name": "Pandas",
            "icon": "assets/images/python-svgrepo-com.svg"
          },
          {
            "name": "Jira",
            "icon": "assets/images/Jira.svg"
          },
          {
            "name": "ClickUp",
            "icon": "assets/images/clickup.svg"
          }
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
            "Leveraged AWS IAM, Amazon EC2, Amazon ECS (Docker), AWS Step Functions, ODBC, and Amazon Athena across infrastructure, secure access, data integration, and analytics workflows in client environments.",
            "Automated parameterization spreadsheet generation using Python, Pandas, and openpyxl, reducing manual effort in implementation workflows."
          ],
          "tags": [
            "Pandas",
            "Python",
            "ClickUp",
            "EPR Implementations",
            "REST APIs",
            "JSONLogic",
            "GIS",
            "AWS",
            "AWS IAM",
            "GIS",
            "ETL"
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
              },
              {
                "src": "assets/images/chart_july_2026.png",
                "alt": "H1 2026 team delivery (100% personal on-time)",
                "caption": "H1 2026 team delivery (100% personal on-time)"
              }
            ]
          },
          "logo": "assets/images/Simbolo_Kartado_Footer.svg",
          "specificAchievements": [
            {
              "tag": "Recognition",
              "description": "Nominated for the company's Monthly Agility Award in April 2026 for technical implementation performance and bugs fixes."
            },
            {
              "tag": "Delivery",
              "description": "Helped achieve 99.48% on-time implementation delivery while maintaining a 100% personal on-time completion rate throughout H1 2026."
            }
          ]
        },
        {
          "id": "daus",
          "role": "Agile Product Management Learner",
          "company": "Daus",
          "date": "Dec 2024 – Jun 2025",
          "bullets": [
            "Applied Scrum, Kanban, and Lean Thinking frameworks to drive product discovery and requirements analysis across internal and multi-client portfolio projects in a software house environment.",
            "Documented product insights, user flows, and functional requirements across the Atlassian ecosystem (Jira, Confluence) and FigJam.",
            "Mentored two intern cohorts across structured onboarding programs in Agile Product Management workflows and MVP-delivery."
          ],
          "tags": [
            "Requirement Analysis",
            "Scrum",
            "Jira",
            "Agile Methodologies",
            "Mentoring",
            "Product Discovery",
            "Figma"
          ],
          "logo": "assets/images/daus_software_house_logo.jpg",
          "specificAchievements": [
            {
              "tag": "Mentorship",
              "description": "Mentored two concurrent cohorts, including SOFTEX interns and a Porto Digital/Embarque Digital student class."
            }
          ]
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
            "Selected to participate in individual and group technology-focused mentoring through the Lab.AI – Laboratório de Mentes program, offered by Instituto Joule in partnership with Instituto Localiza.",
            "Hands-on laboratories focused on technology and social impact projects enhanced by Artificial Intelligence tools.",
            "Lectures, mentorship sessions, and individual and group activities led by volunteer professionals from the technology industry."
          ]
        },
        {
          "id": "graduacao-ciencia-computacao-unifavipwyden",
          "type": "Bachelor's Degree",
          "degree": "Computer Science",
          "institution": "UniFavip Wyden",
          "date": "Feb 2024 – Present",
          "logo": "assets/images/unifavip_logo.jpg",
          "highlights": [
            "Active participation as an exhibitor at extension project fairs showcasing university projects to invited companies.",
            "Professional development through extracurricular courses, technology events, and lectures offered by the institution.",
            "Selected for a remote academic mobility program conducted in Spanish during the 2024.2 semester, in partnership with Universidad Siglo 21, to develop projects for competitions focused on the United Nations Sustainable Development Goals (SDGs)."
          ]
        }
      ],
      "courses": [
        {
          "id": "curso-postman-zeroaoavancado",
          "type": "api",
          "name": "Postman: From Zero to Advanced + Automated Testing",
          "provider": "Udemy",
          "logo": "assets/images/udemy-3.svg",
          "date": "Dec 2025",
          "credentialUrl": "https://www.udemy.com/certificate/UC-12234f7a-0178-4a06-b809-864522caa58c/"
        },
        {
          "id": "curso-applicationprogramminginterfaces-api",
          "type": "api",
          "name": "Application Programming Interface: API and Web Services",
          "provider": "Udemy",
          "logo": "assets/images/udemy-3.svg",
          "date": "Dec 2025",
          "credentialUrl": "https://www.udemy.com/certificate/UC-9eff9f3e-ab9e-4e05-86e2-181eddd6e921/"
        },
        {
          "id": "curso-labai-mentoria2025",
          "type": "ai",
          "name": "Lab.AI: Preparing the Next Generation for the Future of Work",
          "provider": "Instituto Joule",
          "date": "Sep 2025",
          "logo": "assets/images/instituto_joule_logo.jpg",
          "credentialUrl": "https://academy.institutojoule.org/certificado/?cert_hash=6710237ef0505f06"
        },
        {
          "id": "curso-skillsbuild-customerengagement",
          "type": "softskills",
          "name": "SkillsBuild - Customer Engagement: Problem Solving and Process Controls",
          "provider": "IBM",
          "logo": "assets/images/ibm-svgrepo-com.svg",
          "date": "Aug 2025",
          "credentialUrl": "https://www.credly.com/badges/a9ac260f-4415-43d0-a2e2-479478acbddd/linked_in_profile"
        },
        {
          "id": "curso-efset-2025",
          "type": "languages",
          "name": "EF SET English Certificate 69/100 (C1 Advanced)",
          "logo": "assets/images/idxeymiMn5_1783788580495.jpeg",
          "provider": "EF Education First",
          "date": "Mar 2025",
          "credentialUrl": "https://cert.efset.org/en/88BaNL"
        },
        {
          "id": "curso-competenciatransversal-2023",
          "type": "information technology",
          "name": "Cross-disciplinary Competency - Information and Communication Technology",
          "logo": "assets/images/iconsenai.webp",
          "provider": "SENAI",
          "date": "Nov 2023",
          "credentialUrl": "http://www.sp.senai.br/consulta-certificado?qrcode=00022804/7460876"
        }
      ],
      "projects": [
        /**{
          "id": "project-onboarding-pipeline",
          "title": "AI Automation — B2B Onboarding Pipeline",
          "status": "completed",
          "date": "Mar 2025 - Aug 2025",
          "category": "AI Engineering",
          "images": [],
          "linkedTo": [
            "kartado",
            "curso-labai-mentoria2025"
          ],
          "stack": [
            "Python",
            "JSONLogic",
            "AWS Step Functions",
            "Amazon S3",
            "Django Admin",
            "Postman",
            "Pytest"
          ],
          "descriptionHtml": "<p>Designed and implemented an <strong>automated B2B client onboarding pipeline</strong> integrated with Kartado's SaaS ERP platform. The system reduced average configuration time per client from 3 days to under 4 hours.</p><p>Key components: <em>JSONLogic-driven rule engine</em> for dynamic configuration resolution, AWS Step Functions orchestration, S3 document storage, and Django Admin UI for operations team control.</p><ul><li>Processed 42+ B2B clients through the automated flow</li><li>Achieved 32% team output contribution within first months</li><li>Zero production incidents in 6 months of operation</li></ul>",
          "repoUrl": "https://github.com/eversonfilipe/eversonfilipe-portfolio"
        }**/
      ],
      "certifications": [],
      "volunteering": [
        {
          "id": "co-organizer-gdgbarueri",
          "role": "Co-organizer",
          "org": "Google Developers Group (GDG Barueri)",
          "date": "Aug 2025 - Present",
          "logo": "assets/images/google_developers_group_barueri_logo.jpg",
          "highlights": [
            "Co-organized events focused on Technology, Artificial Intelligence (AI), and Innovation at Google Developers Group Barueri."
          ]
        },
        {
          "id": "ambassador-facilitator-politize",
          "role": "Ambassador & Facilitator",
          "org": "Politize! (Politize! Caruaru)",
          "date": "May 2025 - Present",
          "logo": "assets/images/politize__logo.jpg",
          "highlights": [
            "reated and co-organized workshops on technology, politics, and civic rights applied to society at Politize! Caruaru, while also contributing to internal projects."
          ]
        },
        {
          "id": "aiesecmackenzie-volunteer",
          "role": "OGT & Marketing Committee Member",
          "org": "AIESEC (AIESEC no Mackenzie)",
          "date": "Mar 2025 - Aug 2025",
          "logo": "assets/images/1754110.webp",
          "highlights": [
            "Served as a member of the Outgoing Global Talent (OGT) team at AIESEC Mackenzie and was selected as the committee's Marketing Lead.",
            "Designed marketing materials and facilitated meetings with team leaders, including collaboration with AIESEC committees from other countries, such as Jalandhar, India."
          ]
        },
        {
          "id": "vainaweb-volunteering",
          "role": "Soft Skills Instructor",
          "org": "Vai Na Web",
          "date": "Jan 2025",
          "logo": "assets/images/vai_na_web.jpg",
          "highlights": [
            "Delivered a soft skills lecture at Vai na Web in January 2025, demonstrating their practical application in Information Technology problem-solving.",
            "Highlighted how empathy strengthens the understanding of client and user needs, fostering systems thinking and enabling more effective solutions."
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
          "date": "Sep 2024",
          "logo": "assets/images/campusparty_ltd_logo.jpg"
        },
        {
          "id": "ideathon-caruaru-campusparty-day-event",
          "type": "listener",
          "name": "Caruaru Campus Party Day",
          "role": "Listener",
          "meta": "Caruaru",
          "date": "Aug 2024",
          "logo": "assets/images/campusparty_ltd_logo.jpg"
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
        "copy": "&copy; 2026 Everson Filipe. Last updated: July 2026."
      },
      "hero": {
        "overline": "Junior Implementation Engineer · Aspiring AI Engineer",
        "name": "<strong>Everson</strong> Filipe",
        "title": "Technical Implementation · Integrations · Data Integrity",
        "tagline": "Bridging the gap between business requirements and scalable software execution through rigorous data validation and process automation."
      },
      "publications": [
        {
          "id": "pub-some-trends-doesnt-stay-trend-2024",
          "type": "customer experience",
          "name": "Some trends do not stay as trends: the world is a fractal",
          "institution": "Medium",
          "date": "Nov 2024",
          "url": "https://medium.com/design-bootcamp/some-trends-do-not-stay-as-trends-the-world-is-a-fractal-fe374bdc088f?sharedUserId=eversonfilipe"
        },
        {
          "id": "pub-fishes-and-cars",
          "type": "customer experience",
          "name": "Fishes and cars: UX’s study objects",
          "institution": "Medium",
          "date": "Nov 2024",
          "url": "https://medium.com/design-bootcamp/fishes-and-cars-uxs-study-objects-c8c251f8c9df?sharedUserId=eversonfilipe"
        },
        {
          "id": "pub-using-ai-for-cx",
          "type": "customer experience",
          "name": "Using AI for the Customer Experience Management",
          "institution": "Medium",
          "date": "Dec 2024",
          "url": "https://eversonfilipe.medium.com/using-ai-for-the-customer-experience-management-386ec828542a?sharedUserId=eversonfilipe"
        },
        {
          "id": "pub-creative-economy-northeast-brazil",
          "type": "creative economy",
          "name": "Development of the Creative Economy in Northeastern Brazil",
          "institution": "Medium",
          "date": "Dec 2024",
          "url": "https://eversonfilipe.medium.com/development-of-the-creative-economy-in-northeastern-brazil-f6cc0962a659?sharedUserId=eversonfilipe"
        },
        {
          "id": "pub-alive-architecture-future-esg",
          "type": "creative economy",
          "name": "Alive Architecture: Redefining How We Build a Sustainable Future",
          "institution": "Medium",
          "date": "Dec 2024",
          "url": "https://eversonfilipe.medium.com/illustrative-image-alive-architecture-redefining-how-we-build-a-sustainable-future-a4705fc0685c?sharedUserId=eversonfilipe"
        },
        {
          "id": "pub-design-thinking-medium",
          "type": "design thinking",
          "name": "Design your thinking: the art of being",
          "institution": "Medium",
          "date": "Jan 2025",
          "url": "https://medium.com/design-bootcamp/design-your-thinking-the-art-of-being-5b7e8b9ca3b7?sharedUserId=eversonfilipe"
        },
        {
          "id": "pub-from-problem-to-product",
          "type": "problem solving",
          "name": "From Problem to Solution: A Framework for Building Value-Driven Products",
          "institution": "Medium",
          "date": "Feb 2025",
          "url": "https://eversonfilipe.medium.com/from-problem-to-solution-a-framework-for-building-value-driven-products-c6e5d564d111?sharedUserId=eversonfilipe"
        },
        {
          "id": "pub-too-much-ui-can-break-ux",
          "type": "user experience",
          "name": "Product Optimization: Too much UI can break your UX",
          "institution": "Medium",
          "date": "Mar 2025",
          "url": "https://medium.com/design-bootcamp/product-optimization-too-much-ui-can-break-your-ux-4a00c5a1b125?sharedUserId=eversonfilipe"
        },
        {
          "id": "pub-communication-and-its-paradigms",
          "type": "communication",
          "name": "Communication and its Paradigms",
          "institution": "Medium",
          "date": "Apr 2025",
          "url": "https://eversonfilipe.medium.com/communication-and-its-paradigms-513cedfbb059?sharedUserId=eversonfilipe"
        },
        {
          "id": "pub-from-chaos-to-clarity",
          "type": "problem solving",
          "name": "From Chaos to Clarity",
          "institution": "Medium",
          "date": "Oct 2025",
          "url": "https://eversonfilipe.medium.com/from-chaos-to-clarity-b7fb92368218?sharedUserId=eversonfilipe"
        },
        {
          "id": "pub-the-fallacy-of-plural-mvp",
          "type": "problem solving",
          "name": "The Fallacy of “Plural MVP” in GovTech: Why Unrelenting Focus is the Only Real Metric of Success.",
          "institution": "Medium",
          "date": "Jul 2025",
          "url": "https://medium.com/design-bootcamp/the-fallacy-of-plural-mvp-in-govtech-why-unrelenting-focus-is-the-only-real-metric-of-success-64329bbfe4ec?sharedUserId=eversonfilipe"
        },
        {
          "id": "pub-gestao-agil-simplificada",
          "type": "agile",
          "name": "Gestão Ágil Simplificada",
          "institution": "LinkedIn",
          "date": "Oct 2024",
          "url": "https://www.linkedin.com/pulse/gest%C3%A3o-%C3%A1gil-simplificada-%C3%A9verson-filipe-zgdoe"
        }
      ]
    },
    "pt": {
      "about": {
        "p1": "Como Analista de Implantação especializado em Engenharia de Implantação e Automação orientada por IA, transformo requisitos de negócio complexos em <strong>fluxos de trabalho escaláveis, confiáveis e configurações de software para clientes B2B.</strong>",
        "p2": "Atuando diretamente com sistemas ERP em nuvem e plataformas SaaS, configuro soluções utilizando Python, Django Admin, JSONLogic e AWS, garantindo integrações com APIs REST e serviços de BI em nuvem, como o Amazon Athena.",
        "p3": "Meu trabalho é fundamentado em <strong>integridade de dados e padronização de fluxos de trabalho.</strong> Em ambientes Ágeis, realizo a mentoria de novos profissionais, conduzo onboardings técnicos e contribuo diretamente para ambientes de produção desde o primeiro dia.",
        "current": "Atualmente na <strong>Kartado</strong> &middot; Aprofundando conhecimentos em POO e UML &middot; Bacharelado em Ciência da Computação na UniFavip Wyden",
        "stats": [
          {
            "number": "800",
            "suffix": "+",
            "label": "Tarefas entregues"
          },
          {
            "number": "42",
            "suffix": "+",
            "label": "Ambientes B2B2G configurados"
          },
          {
            "number": "32",
            "suffix": "%",
            "label": "Contribuição para a produção da equipe nos primeiros meses"
          },
          {
            "number": "99.48",
            "suffix": "%",
            "label": "Entrega da equipe no 1º semestre de 2026 (100% de pontualidade pessoal)"
          },
          {
            "number": "10",
            "suffix": "+",
            "label": "Hackathons"
          }
        ],
        "skills": [
          {
            "name": "Python",
            "icon": "assets/images/python-svgrepo-com.svg"
          },
          {
            "name": "Django",
            "icon": "assets/images/django-svgrepo-com.svg"
          },
          {
            "name": "JSONLogic",
            "icon": "assets/images/json-svgrepo-com.svg"
          },
          {
            "name": "REST API",
            "icon": "assets/images/api-svgrepo-com.svg"
          },
          {
            "name": "AWS",
            "icon": "assets/images/aws_icon.svg"
          },
          {
            "name": "Pandas",
            "icon": "assets/images/python-svgrepo-com.svg"
          },
          {
            "name": "Jira",
            "icon": "assets/images/Jira.svg"
          },
          {
            "name": "ClickUp",
            "icon": "assets/images/clickup.svg"
          }
        ]
      },
      "experience": [
        {
          "id": "kartado",
          "role": "Estagiário em Implantação Técnica",
          "company": "Kartado",
          "date": "Set 2025 – Presente",
          "bullets": [
            "Configurou regras em JSONLogic para formulários dinâmicos em mais de 42 ambientes de clientes, utilizando Django Admin para garantir integridade dos dados e consistência funcional.",
            "Desenvolveu scripts de automação ETL em Python integrados ao Django ORM, substituindo processos manuais de transformação e carregamento de dados.",
            "Desenvolveu scripts em Python (Jupyter Notebook) para extração de metadados JSON, validação de esquemas e detecção proativa de inconsistências estruturais em conjuntos de dados exportados.",
            "Corrigiu mapas GIS, ajustou arquivos Shapefile e validou geometrias espaciais para apoiar a parametrização de sistemas de concessionárias de rodovias.",
            "Manteve a documentação de integrações REST API e JWT, além de scripts de validação com Pytest para módulos Django.",
            "Utilizou AWS IAM, EC2, ECS (Docker), Step Functions, ODBC e Amazon Athena em fluxos de infraestrutura, controle de acesso, integração de dados e análises.",
            "Automatizou a geração de planilhas de parametrização utilizando Python, Pandas e openpyxl, reduzindo o esforço manual nos processos de implantação."
          ],
          "tags": [
            "Pandas",
            "Python",
            "ClickUp",
            "EPR Implementations",
            "REST APIs",
            "JSONLogic",
            "GIS",
            "AWS",
            "AWS IAM",
            "GIS",
            "ETL"
          ],
          "carousel": {
            "label": "Evidências de Desempenho e Reconhecimento",
            "slides": [
              {
                "src": "assets/images/kartado_chart.png",
                "alt": "Gráfico de desempenho na Kartado",
                "caption": "Métricas de desempenho — 32% de contribuição para a produção da equipe."
              },
              {
                "src": "assets/images/kartado_award.png",
                "alt": "Indicação ao Prêmio Agilidade da Kartado",
                "caption": "Indicado ao Prêmio Agilidade do Mês — 'Éverson, sempre pronto para corrigir bugs e acelerar processos.'"
              },
              {
                "src": "assets/images/kartado_welcome.png",
                "alt": "Kit de boas-vindas da Kartado",
                "caption": "Kit de boas-vindas recebido ao ingressar na equipe da Kartado."
              },
              {
                "src": "assets/images/chart_july_2026.png",
                "alt": "Entrega de implementação do 1º semestre de 2026 (100% de pontualidade pessoal)",
                "caption": "Entrega de implementação do 1º semestre de 2026 (100% de pontualidade pessoal)"
              }
            ]
          },
          "logo": "assets/images/Simbolo_Kartado_Footer.svg",
          "specificAchievements": [
            {
              "tag": "Reconhecimento",
              "description": "Indicado ao Prêmio Agilidade do Mês da empresa em abril de 2026 pelo desempenho em Implantação Técnica."
            },
            {
              "tag": "Entrega",
              "description": "Contribuiu para que a equipe alcançasse 99,48% de entregas de implantação no prazo, mantendo 100% de pontualidade nas próprias entregas durante o primeiro semestre de 2026."
            }
          ]
        },
        {
          "id": "daus",
          "role": "Aprendiz em Gestão Ágil de Produtos",
          "company": "Daus",
          "date": "Dez 2024 – Jun 2025",
          "bullets": [
            "Aplicou Scrum, Kanban e Lean Thinking para conduzir discovery de produtos e levantamento de requisitos em projetos internos e de múltiplos clientes.",
            "Documentou insights de produto, fluxos de usuários e requisitos funcionais utilizando o ecossistema Atlassian (Jira e Confluence) e FigJam.",
            "Mentoreou dois cohorts simultâneos durante programas estruturados de onboarding em Gestão Ágil de Produtos e desenvolvimento de MVPs."
          ],
          "tags": [
            "Requirement Analysis",
            "Scrum",
            "Jira",
            "Agile Methodologies",
            "Mentoring",
            "Product Discovery",
            "Figma"
          ],
          "logo": "assets/images/daus_software_house_logo.jpg",
          "specificAchievements": [
            {
              "tag": "Mentoria",
              "description": "Mentoreou dois cohorts simultâneos, incluindo estagiários do programa SOFTEX e uma turma do Porto Digital/Embarque Digital."
            }
          ]
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
            "Selecionado para mentorias individuais e coletivas direcionadas á tecnologia através do programa Lab.AI - Laboratório de Mentes, oferecido pelo Instituto Joule em parceria com o Instituto Localiza.",
            "Laboratórios hand-on de projetos de tecnologia e impacto social otimizados por ferramentas de Inteligência Artificial.",
            "Palestras, mentorias e dinâmicas individuais ou coletivas com profissionais voluntários da área."
          ]
        },
        {
          "id": "graduacao-ciencia-computacao-unifavipwyden",
          "type": "Bacharelado",
          "degree": "Ciência da Computação",
          "institution": "UniFavip Wyden",
          "date": "Fev 2024 – Presente",
          "logo": "assets/images/unifavip_logo.jpg",
          "highlights": [
            "Participação ativa em feiras de apresentação de projetos extensionistas com empresas convidadas, como expositor.",
            "Capacitação em cursos extracurriculares, eventos de tecnologia e palestras oferecidas pela instituição.",
            "Selecionado para mobilidade remota em espanhol em 2024.2, em parceria com Universidad Siglo 21 para produção de projetos para competições envolvendo ODS."
          ]
        }
      ],
      "courses": [
        {
          "id": "curso-postman-zeroaoavancado",
          "type": "api",
          "name": "Postman: Do Zero ao Avançado + Testes Automatizados",
          "provider": "Udemy",
          "logo": "assets/images/udemy-3.svg",
          "date": "Dez 2025",
          "credentialUrl": "https://www.udemy.com/certificate/UC-12234f7a-0178-4a06-b809-864522caa58c/"
        },
        {
          "id": "curso-applicationprogramminginterfaces-api",
          "type": "api",
          "name": "Interface de Programação de Aplicação: APIs e Web Services",
          "provider": "Udemy",
          "logo": "assets/images/udemy-3.svg",
          "date": "Dez 2025",
          "credentialUrl": "https://www.udemy.com/certificate/UC-9eff9f3e-ab9e-4e05-86e2-181eddd6e921/"
        },
        {
          "id": "curso-labai-mentoria2025",
          "type": "ai",
          "name": "Lab.AI: Preparando a Próxima Geração para o Futuro do Trabalho",
          "provider": "Instituto Joule",
          "date": "Set 2025",
          "logo": "assets/images/instituto_joule_logo.jpg",
          "credentialUrl": "https://academy.institutojoule.org/certificado/?cert_hash=6710237ef0505f06"
        },
        {
          "id": "curso-skillsbuild-customerengagement",
          "type": "softskills",
          "name": "SkillsBuild - Engajamento do Cliente: Resolução de Problemas e Controles de Processos",
          "provider": "IBM",
          "logo": "assets/images/ibm-svgrepo-com.svg",
          "date": "Ago 2025",
          "credentialUrl": "https://www.credly.com/badges/a9ac260f-4415-43d0-a2e2-479478acbddd/linked_in_profile"
        },
        {
          "id": "curso-efset-2025",
          "type": "languages",
          "name": "Certificado de Inglês EF SET 69/100 (C1 Avançado)",
          "logo": "assets/images/idxeymiMn5_1783788580495.jpeg",
          "provider": "EF Education First",
          "date": "Mar 2025",
          "credentialUrl": "https://cert.efset.org/en/88BaNL"
        },
        {
          "id": "curso-competenciatransversal-2023",
          "type": "information technology",
          "name": "Competência Transversal - Tecnologia da Informação e Comunicação",
          "logo": "assets/images/iconsenai.webp",
          "provider": "SENAI",
          "date": "Nov 2023",
          "credentialUrl": "http://www.sp.senai.br/consulta-certificado?qrcode=00022804/7460876"
        }
      ],
      "projects": [
        /**
        {
          "id": "project-onboarding-pipeline",
          "title": "Automacao com IA - Pipeline de Onboarding B2B",
          "status": "completed",
          "date": "Mar 2025 - Ago 2025",
          "category": "Engenharia de IA",
          "images": [],
          "linkedTo": [
            "kartado",
            "curso-labai-mentoria2025"
          ],
          "stack": [
            "Python",
            "JSONLogic",
            "AWS Step Functions",
            "Amazon S3",
            "Django Admin",
            "Postman",
            "Pytest"
          ],
          "descriptionHtml": "<p>Projetei e implementei um <strong>pipeline automatizado de onboarding B2B</strong> integrado ao ERP SaaS da Kartado. O sistema reduziu o tempo medio de configuracao por cliente de 3 dias para menos de 4 horas.</p><p>Componentes-chave: <em>motor de regras baseado em JSONLogic</em> para resolucao dinamica de configuracoes, orquestracao via AWS Step Functions, armazenamento de documentos no S3 e UI de controle via Django Admin para a equipe de operacoes.</p><ul><li>Mais de 42 clientes B2B processados pelo fluxo automatizado</li><li>Contribuicao de 32% no output da equipe nos primeiros meses</li><li>Zero incidentes em producao em 6 meses de operacao</li></ul>",
          "repoUrl": "https://github.com/eversonfilipe/eversonfilipe-portfolio"
        }
          **/
      ],
      "certifications": [],
      "volunteering": [
        {
          "id": "co-organizer-gdgbarueri",
          "role": "Coorganizador",
          "org": "Google Developers Group (GDG Barueri)",
          "date": "Ago 2025 - Presente",
          "logo": "assets/images/google_developers_group_barueri_logo.jpg",
          "highlights": [
            "Coorganizou eventos voltados para Tecnologia, Inteligência Artificial (IA) e Inovação no Google Developers Group (GDG) Barueri."
          ]
        },
        {
          "id": "ambassador-facilitator-politize",
          "role": "Embaixador e Facilitador",
          "org": "Politize! (Politize! Caruaru)",
          "date": "Mai 2025 - Presente",
          "logo": "assets/images/politize__logo.jpg",
          "highlights": [
            "Criou e coorganizou workshops sobre tecnologia, política e direitos civis aplicados à sociedade na Politize! Caruaru, além de contribuir para projetos internos."
          ]
        },
        {
          "id": "aiesecmackenzie-volunteer",
          "role": "Membro do Comitê de OGT e Marketing",
          "org": "AIESEC (AIESEC no Mackenzie)",
          "date": "Mar 2025 - Ago 2025",
          "logo": "assets/images/1754110.webp",
          "highlights": [
            "Atuou como membro da equipe de Outgoing Global Talent (OGT) da AIESEC Mackenzie e foi selecionado como Líder de Marketing do comitê.",
            "Desenvolveu materiais de marketing e conduziu reuniões com líderes de equipe, incluindo a colaboração com comitês da AIESEC de outros países, como Jalandhar, na Índia."
          ]
        },
        {
          "id": "vainaweb-volunteering",
          "role": "Instrutor de Soft Skills",
          "org": "Vai Na Web",
          "date": "Jan 2025",
          "logo": "assets/images/vai_na_web.jpg",
          "highlights": [
            "Ministrou uma palestra sobre soft skills na Vai na Web, em janeiro de 2025, demonstrando sua aplicação prática na resolução de problemas de Tecnologia da Informação.",
            "Abordou como a empatia fortalece a compreensão das necessidades de clientes e usuários, favorecendo o pensamento sistêmico e a busca por soluções mais eficazes."
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
          "date": "Set 2024",
          "logo": "assets/images/campusparty_ltd_logo.jpg"
        },
        {
          "id": "ideathon-caruaru-campusparty-day-event",
          "type": "listener",
          "name": "Caruaru Campus Party Day",
          "role": "Participante",
          "meta": "Caruaru",
          "date": "Ago 2024",
          "logo": "assets/images/campusparty_ltd_logo.jpg"
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
        "copy": "&copy; 2026 Éverson Filipe. Última atualização: Julho de 2026."
      },
      "hero": {
        "overline": "Engenheiro de Implantação Júnior · Aspirante a AI Engineer",
        "name": "<strong>Éverson</strong> Filipe",
        "title": "Implantação Técnica · Integrações · Integridade de Dados",
        "tagline": "Unindo requisitos de negócio à execução escalável de software por meio de validação de dados e automação de processos."
      },
      "publications": [
        {
          "id": "pub-some-trends-doesnt-stay-trend-2024",
          "type": "customer experience",
          "name": "Some trends do not stay as trends: the world is a fractal",
          "institution": "Medium",
          "date": "Nov 2024",
          "url": "https://medium.com/design-bootcamp/some-trends-do-not-stay-as-trends-the-world-is-a-fractal-fe374bdc088f?sharedUserId=eversonfilipe"
        },
        {
          "id": "pub-fishes-and-cars",
          "type": "customer experience",
          "name": "Fishes and cars: UX’s study objects",
          "institution": "Medium",
          "date": "Nov 2024",
          "url": "https://medium.com/design-bootcamp/fishes-and-cars-uxs-study-objects-c8c251f8c9df?sharedUserId=eversonfilipe"
        },
        {
          "id": "pub-using-ai-for-cx",
          "type": "customer experience",
          "name": "Using AI for the Customer Experience Management",
          "institution": "Medium",
          "date": "Dez 2024",
          "url": "https://eversonfilipe.medium.com/using-ai-for-the-customer-experience-management-386ec828542a?sharedUserId=eversonfilipe"
        },
        {
          "id": "pub-creative-economy-northeast-brazil",
          "type": "creative economy",
          "name": "Development of the Creative Economy in Northeastern Brazil",
          "institution": "Medium",
          "date": "Dez 2024",
          "url": "https://eversonfilipe.medium.com/development-of-the-creative-economy-in-northeastern-brazil-f6cc0962a659?sharedUserId=eversonfilipe"
        },
        {
          "id": "pub-alive-architecture-future-esg",
          "type": "creative economy",
          "name": "Alive Architecture: Redefining How We Build a Sustainable Future",
          "institution": "Medium",
          "date": "Dez 2024",
          "url": "https://eversonfilipe.medium.com/illustrative-image-alive-architecture-redefining-how-we-build-a-sustainable-future-a4705fc0685c?sharedUserId=eversonfilipe"
        },
        {
          "id": "pub-design-thinking-medium",
          "type": "design thinking",
          "name": "Design your thinking: the art of being",
          "institution": "Medium",
          "date": "Jan 2025",
          "url": "https://medium.com/design-bootcamp/design-your-thinking-the-art-of-being-5b7e8b9ca3b7?sharedUserId=eversonfilipe"
        },
        {
          "id": "pub-from-problem-to-product",
          "type": "problem solving",
          "name": "From Problem to Solution: A Framework for Building Value-Driven Products",
          "institution": "Medium",
          "date": "Fev 2025",
          "url": "https://eversonfilipe.medium.com/from-problem-to-solution-a-framework-for-building-value-driven-products-c6e5d564d111?sharedUserId=eversonfilipe"
        },
        {
          "id": "pub-too-much-ui-can-break-ux",
          "type": "user experience",
          "name": "Product Optimization: Too much UI can break your UX",
          "institution": "Medium",
          "date": "Mar 2025",
          "url": "https://medium.com/design-bootcamp/product-optimization-too-much-ui-can-break-your-ux-4a00c5a1b125?sharedUserId=eversonfilipe"
        },
        {
          "id": "pub-communication-and-its-paradigms",
          "type": "communication",
          "name": "Communication and its Paradigms",
          "institution": "Medium",
          "date": "Abr 2025",
          "url": "https://eversonfilipe.medium.com/communication-and-its-paradigms-513cedfbb059?sharedUserId=eversonfilipe"
        },
        {
          "id": "pub-from-chaos-to-clarity",
          "type": "problem solving",
          "name": "From Chaos to Clarity",
          "institution": "Medium",
          "date": "Out 2025",
          "url": "https://eversonfilipe.medium.com/from-chaos-to-clarity-b7fb92368218?sharedUserId=eversonfilipe"
        },
        {
          "id": "pub-the-fallacy-of-plural-mvp",
          "type": "problem solving",
          "name": "The Fallacy of “Plural MVP” in GovTech: Why Unrelenting Focus is the Only Real Metric of Success.",
          "institution": "Medium",
          "date": "Jul 2025",
          "url": "https://medium.com/design-bootcamp/the-fallacy-of-plural-mvp-in-govtech-why-unrelenting-focus-is-the-only-real-metric-of-success-64329bbfe4ec?sharedUserId=eversonfilipe"
        },
        {
          "id": "pub-gestao-agil-simplificada",
          "type": "agile",
          "name": "Gestão Ágil Simplificada",
          "institution": "LinkedIn",
          "date": "Out 2024",
          "url": "https://www.linkedin.com/pulse/gest%C3%A3o-%C3%A1gil-simplificada-%C3%A9verson-filipe-zgdoe"
        }
      ]
    },
    "es": {
      "about": {
        "p1": "Como Analista de Implementación especializado en Ingeniería de Implementación y Automatización impulsada por IA, transformo requisitos de negocio complejos en <strong>flujos de trabajo escalables, confiables y configuraciones de software para clientes B2B.</strong>",
        "p2": "Trabajando directamente con sistemas ERP en la nube y plataformas SaaS, configuro soluciones utilizando Python, Django Admin, JSONLogic y AWS, garantizando integraciones con APIs REST y servicios de BI en la nube, como Amazon Athena.",
        "p3": "Mi trabajo se fundamenta en la <strong>integridad de los datos y la estandarización de los flujos de trabajo.</strong> Trabajando con metodologías Ágiles, asesoro a nuevos ingenieros, lidero el proceso de incorporación técnica (technical onboarding) y contribuyo directamente a entornos de producción desde el primer día.",
        "current": "Actualmente en <strong>Kartado</strong> &middot; Profundizando en POO y UML &middot; Licenciatura en Ciencias de la Computación en UniFavip Wyden",
        "stats": [
          {
            "number": "800",
            "suffix": "+",
            "label": "Tareas entregadas"
          },
          {
            "number": "42",
            "suffix": "+",
            "label": "Entornos de clientes B2B2G configurados"
          },
          {
            "number": "32",
            "suffix": "%",
            "label": "Contribución a la producción del equipo en los primeros meses"
          },
          {
            "number": "99.48",
            "suffix": "%",
            "label": "Entrega del equipo en el primer semestre de 2026 (100% de puntualidad personal)"
          },
          {
            "number": "10",
            "suffix": "+",
            "label": "Hackatones"
          }
        ],
        "skills": [
          {
            "name": "Python",
            "icon": "assets/images/python-svgrepo-com.svg"
          },
          {
            "name": "Django",
            "icon": "assets/images/django-svgrepo-com.svg"
          },
          {
            "name": "JSONLogic",
            "icon": "assets/images/json-svgrepo-com.svg"
          },
          {
            "name": "REST API",
            "icon": "assets/images/api-svgrepo-com.svg"
          },
          {
            "name": "AWS",
            "icon": "assets/images/aws_icon.svg"
          },
          {
            "name": "Pandas",
            "icon": "assets/images/python-svgrepo-com.svg"
          },
          {
            "name": "Jira",
            "icon": "assets/images/Jira.svg"
          },
          {
            "name": "ClickUp",
            "icon": "assets/images/clickup.svg"
          }
        ]
      },
      "experience": [
        {
          "id": "kartado",
          "role": "Practicante de Implementación Técnica",
          "company": "Kartado",
          "date": "Sep 2025 – Presente",
          "bullets": [
            "Configuré reglas de JSONLogic para formularios dinámicos en más de 42 entornos de clientes mediante Django Admin, garantizando la integridad de los datos y la consistencia funcional.",
            "Desarrollé scripts de automatización ETL en Python integrados con Django ORM, reemplazando procesos manuales de transformación y carga de datos.",
            "Desarrollé scripts en Python basados en Jupyter Notebook para la extracción de metadatos JSON, la validación de esquemas y la detección proactiva de inconsistencias estructurales en conjuntos de datos exportados.",
            "Corregí mapas GIS, ajusté archivos Shapefile y validé geometrías espaciales para respaldar la parametrización de sistemas de concesionarias de autopistas.",
            "Mantuve la documentación de integraciones con API REST y JWT junto con scripts de validación en Pytest para módulos de Django.",
            "Utilicé AWS IAM, Amazon EC2, Amazon ECS (Docker), AWS Step Functions, ODBC y Amazon Athena en flujos de infraestructura, acceso seguro, integración de datos y análisis dentro de entornos de clientes.",
            "Automaticé la generación de hojas de cálculo de parametrización utilizando Python, Pandas y openpyxl, reduciendo el esfuerzo manual en los procesos de implementación."
          ],
          "tags": [
            "Pandas",
            "Python",
            "ClickUp",
            "EPR Implementations",
            "REST APIs",
            "JSONLogic",
            "GIS",
            "AWS",
            "AWS IAM",
            "GIS",
            "ETL"
          ],
          "carousel": {
            "label": "Evidencias de Desempeño y Reconocimiento",
            "slides": [
              {
                "src": "assets/images/kartado_chart.png",
                "alt": "Gráfico de desempeño de Kartado",
                "caption": "Métricas de desempeño: 32 % de contribución a la producción del equipo"
              },
              {
                "src": "assets/images/kartado_award.png",
                "alt": "Mentimeter del Premio Agilidad de Kartado",
                "caption": "Nominado al Premio Agilidad del Mes: «Éverson, siempre dispuesto a corregir errores y acelerar procesos»"
              },
              {
                "src": "assets/images/kartado_welcome.png",
                "alt": "Kit de bienvenida de Kartado",
                "caption": "Kit de bienvenida recibido al incorporarme al equipo de Kartado"
              },
              {
                "src": "assets/images/chart_july_2026.png",
                "alt": "Entrega de implementación del 1º semestre de 2026 (100% de pontualidade pessoal)",
                "caption": "Entrega de implementación del 1º semestre de 2026 (100% de pontualidade pessoal)"
              }
            ]
          },
          "logo": "assets/images/Simbolo_Kartado_Footer.svg",
          "specificAchievements": [
            {
              "tag": "Reconocimiento",
              "description": "Nominado al Premio Agilidad del Mes de la empresa en abril de 2026 por su desempeño en implementación técnica y corrección de errores."
            },
            {
              "tag": "Entrega",
              "description": "Contribuí a que el equipo alcanzara un 99,48 % de entregas de implementación a tiempo, manteniendo una tasa personal del 100 % de entregas puntuales durante el primer semestre de 2026."
            }
          ]
        },
        {
          "id": "daus",
          "role": "Aprendiz en Gestión Ágil de Productos",
          "company": "Daus",
          "date": "Dic 2024 – Jun 2025",
          "bullets": [
            "Apliqué los marcos de trabajo Scrum, Kanban y Lean Thinking para impulsar el descubrimiento de productos y el análisis de requisitos en proyectos internos y de múltiples clientes dentro de una software house.",
            "Documenté hallazgos de producto, flujos de usuario y requisitos funcionales utilizando el ecosistema Atlassian (Jira y Confluence) y FigJam.",
            "Mentoricé a dos cohortes de practicantes mediante programas estructurados de incorporación en flujos de trabajo de Gestión Ágil de Productos y entrega de MVP."
          ],
          "tags": [
            "Requirement Analysis",
            "Scrum",
            "Jira",
            "Agile Methodologies",
            "Mentoring",
            "Product Discovery",
            "Figma"
          ],
          "logo": "assets/images/daus_software_house_logo.jpg",
          "specificAchievements": [
            {
              "tag": "Mentoría",
              "description": "Mentoricé dos cohortes simultáneas, incluidos practicantes de SOFTEX y un grupo de estudiantes de Porto Digital/Embarque Digital."
            }
          ]
        }
      ],
      "education": [
        {
          "id": "mentoria-labai-institutojoule-ia2025",
          "type": "Programa de Mentoría",
          "degree": "Programa de Mentoría en Inteligencia Artificial",
          "institution": "Ofrecido por LAB.AI, Instituto Joule",
          "date": "Ago 2025 – Sep 2025",
          "logo": "assets/images/instituto_joule_logo.jpg",
          "highlights": [
            "Seleccionado para participar en mentorías individuales y grupales orientadas a la tecnología a través del programa Lab.AI – Laboratório de Mentes, ofrecido por el Instituto Joule en colaboración con el Instituto Localiza.",
            "Laboratorios prácticos centrados en proyectos de tecnología e impacto social potenciados por herramientas de Inteligencia Artificial.",
            "Conferencias, sesiones de mentoría y actividades individuales y grupales impartidas por profesionales voluntarios de la industria tecnológica."
          ]
        },
        {
          "id": "graduacao-ciencia-computacao-unifavipwyden",
          "type": "Licenciatura",
          "degree": "Ciencias de la Computación",
          "institution": "UniFavip Wyden",
          "date": "Feb 2024 – Presente",
          "logo": "assets/images/unifavip_logo.jpg",
          "highlights": [
            "Participación activa como expositor en ferias de proyectos de extensión universitaria, presentando proyectos académicos a empresas invitadas.",
            "Desarrollo profesional mediante cursos extracurriculares, eventos tecnológicos y conferencias ofrecidos por la institución.",
            "Seleccionado para un programa remoto de movilidad académica impartido en español durante el semestre 2024.2, en colaboración con la Universidad Siglo 21, para desarrollar proyectos destinados a competencias enfocadas en los Objetivos de Desarrollo Sostenible (ODS) de las Naciones Unidas."
          ]
        }
      ],
      "courses": [
        {
          "id": "curso-postman-zeroaoavancado",
          "type": "api",
          "name": "Postman: From Zero to Advanced + Automated Testing",
          "provider": "Udemy",
          "logo": "assets/images/udemy-3.svg",
          "date": "Dec 2025",
          "credentialUrl": "https://www.udemy.com/certificate/UC-12234f7a-0178-4a06-b809-864522caa58c/"
        },
        {
          "id": "curso-applicationprogramminginterfaces-api",
          "type": "api",
          "name": "Application Programming Interface: API and Web Services",
          "provider": "Udemy",
          "logo": "assets/images/udemy-3.svg",
          "date": "Dec 2025",
          "credentialUrl": "https://www.udemy.com/certificate/UC-9eff9f3e-ab9e-4e05-86e2-181eddd6e921/"
        },
        {
          "id": "curso-labai-mentoria2025",
          "type": "ai",
          "name": "Lab.AI: Preparing the Next Generation for the Future of Work",
          "provider": "Instituto Joule",
          "date": "Sep 2025",
          "logo": "assets/images/instituto_joule_logo.jpg",
          "credentialUrl": "https://academy.institutojoule.org/certificado/?cert_hash=6710237ef0505f06"
        },
        {
          "id": "curso-skillsbuild-customerengagement",
          "type": "softskills",
          "name": "SkillsBuild - Customer Engagement: Problem Solving and Process Controls",
          "provider": "IBM",
          "logo": "assets/images/ibm-svgrepo-com.svg",
          "date": "Aug 2025",
          "credentialUrl": "https://www.credly.com/badges/a9ac260f-4415-43d0-a2e2-479478acbddd/linked_in_profile"
        },
        {
          "id": "curso-efset-2025",
          "type": "languages",
          "name": "EF SET English Certificate 69/100 (C1 Advanced)",
          "logo": "assets/images/idxeymiMn5_1783788580495.jpeg",
          "provider": "EF Education First",
          "date": "Mar 2025",
          "credentialUrl": "https://cert.efset.org/en/88BaNL"
        },
        {
          "id": "curso-competenciatransversal-2023",
          "type": "information technology",
          "name": "Competencia Transversal - Tecnologías de la Información y la Comunicación",
          "logo": "assets/images/iconsenai.webp",
          "provider": "SENAI",
          "date": "Nov 2023",
          "credentialUrl": "http://www.sp.senai.br/consulta-certificado?qrcode=00022804/7460876"
        }
      ],
      "projects": [
        /**
        {
          "id": "project-onboarding-pipeline",
          "title": "Automatizacion con IA - Pipeline de Onboarding B2B",
          "status": "completed",
          "date": "Mar 2025 - Ago 2025",
          "category": "Ingenieria de IA",
          "images": [],
          "linkedTo": [
            "kartado",
            "curso-labai-mentoria2025"
          ],
          "stack": [
            "Python",
            "JSONLogic",
            "AWS Step Functions",
            "Amazon S3",
            "Django Admin",
            "Postman",
            "Pytest"
          ],
          "descriptionHtml": "<p>Disene e implemente un <strong>pipeline automatizado de onboarding B2B</strong> integrado con el ERP SaaS de Kartado. El sistema redujo el tiempo promedio de configuracion por cliente de 3 dias a menos de 4 horas.</p><p>Componentes clave: <em>motor de reglas basado en JSONLogic</em> para resolucion dinamica de configuraciones, orquestacion con AWS Step Functions, almacenamiento de documentos en S3 y UI de control via Django Admin para el equipo de operaciones.</p><ul><li>Mas de 42 clientes B2B procesados por el flujo automatizado</li><li>Contribucion del 32% en el output del equipo en los primeros meses</li><li>Cero incidentes en produccion en 6 meses de operacion</li></ul>",
          "repoUrl": "https://github.com/eversonfilipe/eversonfilipe-portfolio"
        }
          **/
      ],
      "certifications": [],
      "volunteering": [
        {
          "id": "co-organizer-gdgbarueri",
          "role": "Coorganizador",
          "org": "Google Developers Group (GDG Barueri)",
          "date": "Ago 2025 – Presente",
          "logo": "assets/images/google_developers_group_barueri_logo.jpg",
          "highlights": [
            "Coorganicé eventos enfocados en Tecnología, Inteligencia Artificial (IA) e Innovación en Google Developers Group Barueri."
          ]
        },
        {
          "id": "ambassador-facilitator-politize",
          "role": "Embajador y Facilitador",
          "org": "Politize! (Politize! Caruaru)",
          "date": "May 2025 – Presente",
          "logo": "assets/images/politize__logo.jpg",
          "highlights": [
            "Creé y coorganicé talleres sobre tecnología, política y derechos cívicos aplicados a la sociedad en Politize! Caruaru, además de contribuir a proyectos internos."
          ]
        },
        {
          "id": "aiesecmackenzie-volunteer",
          "role": "Miembro del equipo de OGT y Marketing",
          "org": "AIESEC (AIESEC en Mackenzie)",
          "date": "Mar 2025 – Ago 2025",
          "logo": "assets/images/1754110.webp",
          "highlights": [
            "Formé parte del equipo de Outgoing Global Talent (OGT) de AIESEC en Mackenzie y fui seleccionado como Líder de Marketing del comité.",
            "Diseñé materiales de marketing y facilité reuniones con líderes de equipo, incluyendo la colaboración con comités de AIESEC de otros países, como Jalandhar, India."
          ]
        },
        {
          "id": "vainaweb-volunteering",
          "role": "Instructor de Habilidades Blandas",
          "org": "Vai Na Web",
          "date": "Ene 2025",
          "logo": "assets/images/vai_na_web.jpg",
          "highlights": [
            "Impartí una conferencia sobre habilidades blandas en Vai Na Web en enero de 2025, demostrando su aplicación práctica en la resolución de problemas de Tecnología de la Información.",
            "Expliqué cómo la empatía fortalece la comprensión de las necesidades de clientes y usuarios, promoviendo el pensamiento sistémico y permitiendo desarrollar soluciones más eficaces."
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
          "date": "Sep 2024",
          "logo": "assets/images/campusparty_ltd_logo.jpg"
        },
        {
          "id": "ideathon-caruaru-campusparty-day-event",
          "type": "listener",
          "name": "Caruaru Campus Party Day",
          "role": "Asistente",
          "meta": "Caruaru",
          "date": "Ago 2024",
          "logo": "assets/images/campusparty_ltd_logo.jpg"
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
        "copy": "&copy; 2026 Éverson Filipe. Última actualización: Julio de 2026."
      },
      "hero": {
        "overline": "Ingeniero de Implementación Junior · Aspirante a AI Engineer",
        "name": "<strong>Éverson</strong> Filipe",
        "title": "Implementación Técnica · Integraciones · Integridad de Datos",
        "tagline": "Conectando requisitos de negocio con ejecución escalable de software a través de validación rigurosa de datos y automatización de procesos."
      },
      "publications": [
        {
          "id": "pub-some-trends-doesnt-stay-trend-2024",
          "type": "customer experience",
          "name": "Some trends do not stay as trends: the world is a fractal",
          "institution": "Medium",
          "date": "Nov 2024",
          "url": "https://medium.com/design-bootcamp/some-trends-do-not-stay-as-trends-the-world-is-a-fractal-fe374bdc088f?sharedUserId=eversonfilipe"
        },
        {
          "id": "pub-fishes-and-cars",
          "type": "customer experience",
          "name": "Fishes and cars: UX’s study objects",
          "institution": "Medium",
          "date": "Nov 2024",
          "url": "https://medium.com/design-bootcamp/fishes-and-cars-uxs-study-objects-c8c251f8c9df?sharedUserId=eversonfilipe"
        },
        {
          "id": "pub-using-ai-for-cx",
          "type": "customer experience",
          "name": "Using AI for the Customer Experience Management",
          "institution": "Medium",
          "date": "Dic 2024",
          "url": "https://eversonfilipe.medium.com/using-ai-for-the-customer-experience-management-386ec828542a?sharedUserId=eversonfilipe"
        },
        {
          "id": "pub-creative-economy-northeast-brazil",
          "type": "creative economy",
          "name": "Development of the Creative Economy in Northeastern Brazil",
          "institution": "Medium",
          "date": "Dic 2024",
          "url": "https://eversonfilipe.medium.com/development-of-the-creative-economy-in-northeastern-brazil-f6cc0962a659?sharedUserId=eversonfilipe"
        },
        {
          "id": "pub-alive-architecture-future-esg",
          "type": "creative economy",
          "name": "Alive Architecture: Redefining How We Build a Sustainable Future",
          "institution": "Medium",
          "date": "Dic 2024",
          "url": "https://eversonfilipe.medium.com/illustrative-image-alive-architecture-redefining-how-we-build-a-sustainable-future-a4705fc0685c?sharedUserId=eversonfilipe"
        },
        {
          "id": "pub-design-thinking-medium",
          "type": "design thinking",
          "name": "Design your thinking: the art of being",
          "institution": "Medium",
          "date": "Enero 2025",
          "url": "https://medium.com/design-bootcamp/design-your-thinking-the-art-of-being-5b7e8b9ca3b7?sharedUserId=eversonfilipe"
        },
        {
          "id": "pub-from-problem-to-product",
          "type": "problem solving",
          "name": "From Problem to Solution: A Framework for Building Value-Driven Products",
          "institution": "Medium",
          "date": "Feb 2025",
          "url": "https://eversonfilipe.medium.com/from-problem-to-solution-a-framework-for-building-value-driven-products-c6e5d564d111?sharedUserId=eversonfilipe"
        },
        {
          "id": "pub-too-much-ui-can-break-ux",
          "type": "user experience",
          "name": "Product Optimization: Too much UI can break your UX",
          "institution": "Medium",
          "date": "Mar 2025",
          "url": "https://medium.com/design-bootcamp/product-optimization-too-much-ui-can-break-your-ux-4a00c5a1b125?sharedUserId=eversonfilipe"
        },
        {
          "id": "pub-communication-and-its-paradigms",
          "type": "communication",
          "name": "Communication and its Paradigms",
          "institution": "Medium",
          "date": "Abr 2025",
          "url": "https://eversonfilipe.medium.com/communication-and-its-paradigms-513cedfbb059?sharedUserId=eversonfilipe"
        },
        {
          "id": "pub-from-chaos-to-clarity",
          "type": "problem solving",
          "name": "From Chaos to Clarity",
          "institution": "Medium",
          "date": "Oct 2025",
          "url": "https://eversonfilipe.medium.com/from-chaos-to-clarity-b7fb92368218?sharedUserId=eversonfilipe"
        },
        {
          "id": "pub-the-fallacy-of-plural-mvp",
          "type": "problem solving",
          "name": "The Fallacy of “Plural MVP” in GovTech: Why Unrelenting Focus is the Only Real Metric of Success.",
          "institution": "Medium",
          "date": "Jul 2025",
          "url": "https://medium.com/design-bootcamp/the-fallacy-of-plural-mvp-in-govtech-why-unrelenting-focus-is-the-only-real-metric-of-success-64329bbfe4ec?sharedUserId=eversonfilipe"
        },
        {
          "id": "pub-gestao-agil-simplificada",
          "type": "agile",
          "name": "Gestão Ágil Simplificada",
          "institution": "LinkedIn",
          "date": "Oct 2024",
          "url": "https://www.linkedin.com/pulse/gest%C3%A3o-%C3%A1gil-simplificada-%C3%A9verson-filipe-zgdoe"
        }
      ]
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
          "id": "REST APIs",
          "label": {
            "en": "REST APIs",
            "pt": "REST APIs",
            "es": "REST APIs"
          }
        },
        {
          "id": "ETL",
          "label": {
            "en": "ETL",
            "pt": "ETL",
            "es": "ETL"
          }
        },
        {
          "id": "Pandas",
          "label": {
            "en": "Pandas",
            "pt": "Pandas",
            "es": "Pandas"
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
        },
        {
          "id": "Figma",
          "label": {
            "en": "Figma",
            "pt": "Figma",
            "es": "Figma"
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
          "id": "cloud",
          "label": {
            "en": "Cloud",
            "pt": "Cloud",
            "es": "Cloud"
          }
        },
        {
          "id": "testing",
          "label": {
            "en": "Testing",
            "pt": "Testes",
            "es": "Pruebas"
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
        },
        {
          "id": "information technology",
          "label": {
            "en": "Information Technology",
            "pt": "Tecnologia da Informação",
            "es": "Tecnología de la Información"
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
            "es": "Ponente"
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
      ],
      "publications": [
        {
          "id": "customer experience",
          "label": {
            "en": "Customer Experience",
            "pt": "Experiência do Cliente",
            "es": "Experiencia del Cliente"
          }
        },
        {
          "id": "creative economy",
          "label": {
            "en": "Creative Economy",
            "pt": "Economia Criativa",
            "es": "Economía Creativa"
          }
        },
        {
          "id": "design thinking",
          "label": {
            "en": "Design Thinking",
            "pt": "Design Thinking",
            "es": "Design Thinking"
          }
        },
        {
          "id": "problem solving",
          "label": {
            "en": "Problem Solving",
            "pt": "Resolução de Problemas",
            "es": "Resolución de Problemas"
          }
        },
        {
          "id": "user experience",
          "label": {
            "en": "User Experience",
            "pt": "Experiência do Usuário",
            "es": "Experiencia de Usuario"
          }
        },
        {
          "id": "communication",
          "label": {
            "en": "Communication",
            "pt": "Comunicação",
            "es": "Comunicación"
          }
        },
        {
          "id": "agile",
          "label": {
            "en": "Agile",
            "pt": "Ágil",
            "es": "Ágil"
          }
        }
      ]
    }
  };
})();
