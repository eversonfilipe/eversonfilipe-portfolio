/**
 * cv_data.js - Centralized database of Everson Filipe's CV in EN, PT, ES.
 * decoupled from DOM layout for long-term scalability and easy updating.
 */
(function CVDatabase() {
  'use strict';
  window.CV_DATA = {
    "en": {
      "about": {
        "p1": "I'm an early-career Systems Analyst focused on AI Engineering and Workflows Implementation, where I transform business requirements into reliable software configurations, standardized workflows, and production-ready solutions for B2B environments. Working with ERP and SaaS platforms has strengthened my foundation in systems analysis, software implementation, process automation, data validation, and cloud-based integrations using technologies such as Python, Django, REST APIs and AWS. While still at the beginning of my career, I've already contributed to production environments, delivering measurable results through structured execution and continuous learning.",
        "p2": "My professional interests naturally extend toward AI Engineering, where I explore how intelligent systems can improve software delivery and operational efficiency. I study and build practical projects involving LLMs, Agentic AI, Retrieval-Augmented Generation (RAG), LangChain, LangGraph, GenAI, and workflow automation, always approaching AI from a systems implementation perspective. Rather than treating AI as a standalone technology, I see it as an extension of software engineering, combining automation, structured reasoning, and scalable architectures to solve real business problems.",
        "p3": "I enjoy working at the intersection of systems, automation, and artificial intelligence, continuously expanding my technical foundation while collaborating with multidisciplinary teams and learning from real-world challenges. My goal is to grow into an engineer capable of designing reliable AI systems and intelligent automation that create measurable business value. I'm always open to connecting with professionals, discussing technology, sharing ideas, and exploring opportunities in Systems Analysis, Implementation Engineering, AI Engineering, and Automation. Let's connect and build intelligent systems together!",
        "current": "Currently at <strong>Kartado</strong> &middot; Studying LangChain, LangGraph, MCP and LLM evaluation &middot; Co-organizer at <strong>GDG Barueri</strong> (AI and Innovation) &middot; Speaker at FLISoL 2026 &middot; Bachelor's in Computer Science at UniFavip Wyden",
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
          "id": "kartado-systems-implementation-intern",
          "role": "Systems Implementation Intern",
          "company": "Kartado",
          "date": "Sep 2025 – Present",
          "optional_more_about_company": "Kartado is a B2B SaaS company serving the highway concession sector, providing an integrated platform for asset management, field-service operations, construction, maintenance, and regulatory compliance. Founded in Florianópolis in 2017, the company developed a web and mobile solution designed for infrastructure operators, concessionaires, contractors, engineering firms, and service providers.",
          "bullets": [
            "As a Systems Implementation Intern, I turned client business requirements into software configurations and automated workflows across 42+ B2B client environments, operating within Agile frameworks.",
            "Configured JSONLogic rules for dynamic forms across 42+ client environments via Django Admin, ensuring data integrity and functional consistency; corrected GIS maps, adjusted Shapefiles, and validated spatial geometries for highway concession system parameterization;",
            "Developed Python ETL automation scripts integrated with Django ORM, replacing manual data transformation workflows; automated the generation of parameterization spreadsheets using Python, Pandas, and openpyxl, reducing manual effort;",
            "Built notebook-based Python scripts for JSON metadata extraction, schema validation, and proactive detection of structural inconsistencies in exported datasets; maintained REST API/JWT integration documentation and Pytest validation scripts for Django modules;",
            "Leveraged AWS IAM, Amazon EC2, Amazon ECS (Docker), AWS Step Functions, ODBC, and Amazon Athena across infrastructure, secure access, data integration, and analytics workflows in client environments;",
            "Tech Stack: JSONLogic, Django, Python, Pandas, OpenpyXL, GIS, AWS."
          ],
          "tags": [
            "Pandas",
            "Python",
            "ClickUp",
            "ERP Implementations",
            "REST APIs",
            "JSONLogic",
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
              "description": "Nominated for the company's Monthly Agility Award in March 2026 for technical implementation performance and bugs fixes."
            },
            {
              "tag": "Delivery",
              "description": "Helped achieve 99.48% on-time implementation delivery while maintaining a 100% personal on-time completion rate throughout H1 2026."
            },
            {
              "tag": "Re-implementation",
              "description": "Co-led the July re-implementation of 4 companies for a major Northeast Brazil highway concessionaire with a Commercial Consultant, translating client specifications into agile configurations, custom scripts, and validated tests; project highlighted in the company-wide results review."
            }
          ]
        },
        {
          "id": "daus-agile-product-management-learner",
          "role": "Agile Product Management Learner",
          "company": "Daus",
          "date": "Dec 2024 – Jun 2025",
          "optional_more_about_company": "Daus is a Recife-based software house and startup, founded in 2023, that delivers internal and multi-client portfolio projects by combining product strategy, UX/UI design, software development, AI, automation, and SaaS capabilities. Operating from Porto Digital, the studio co-creates secure, scalable digital products—from websites and landing pages to e-commerce platforms, web systems, and applications—supporting clients from discovery through delivery.",
          "bullets": [
            "As a Product Management Learner focused on requirements gathering, I combined hands-on delivery with structured learning: while building fluency in Agile Product Management, I supported product discovery and requirements analysis, turning stakeholder needs into documented, actionable delivery artifacts.",
            "Applied Scrum, Kanban, and Lean Thinking frameworks to drive product discovery in a software house environment;",
            "Conducted requirements analysis across internal and multi-client portfolio projects;",
            "Documented product insights, user flows, and functional requirements across the Atlassian ecosystem (Jira, Confluence) and FigJam;",
            "Tech Stack: Figma, FigJam, Jira, Confluence.",
            "Methodologies: Scrum, Kanban, Lean Thinking."
          ],
          "tags": [
            "Requirement Analysis",
            "Scrum",
            "Jira",
            "Agile Methodologies",
            "Mentoring",
            "Product Discovery",
            "Product Management",
            "Figma"
          ],
          "carousel": {
            "label": "Daus Software House - Website & Mission",
            "slides": [
              {
                "src": "assets/images/print-landing-page-daus.webp",
                "alt": "Screenshot of Daus Landing Page, where I (Everson Filipe) was an apprentice of Product Manager/Agilista.",
                "caption": "Screenshot of Daus Landing Page, where I (Everson Filipe) was an apprentice of Product Manager/Agilista."
              }
            ]
          },
          "logo": "assets/images/daus_software_house_logo.jpg",
          "specificAchievements": [
            {
              "tag": "Enablement & impact",
              "description": "Mentored two intern cohorts across structured onboarding programs in Agile Product Management workflows and MVP-delivery."
            }
          ]
        },
        {
          "id": "product-manager-intern-ttet",
          "role": "Product Manager Intern",
          "company": "TT&T Soluções em Informática",
          "date": "Sep 2024 – Feb 2025",
          "optional_more_about_company": "TT&T Soluções em Informática Ltda is a São Paulo based software company founded in 1996 that develops internal and external systems, including the HiApps product line, while maintaining a strong academic and internship oriented profile, offering students opportunities to gain practical experience in software development, information technology, agile methods, and emerging technologies.",
          "bullets": [
            "As a Product Manager Intern, I combined hands-on delivery with structured learning: while deepening my command of Agile methodologies, I coordinated ceremonies and translated requirements throughout the sprints.",
            "Coordinated and participated in Agile ceremonies and other Agile methodology artifacts throughout the sprints, including dailies",
            "Collaborated closely with UX/UI teams on the company's internal and external systems, the HiApps product line",
            "Documented functional requirements and translated business requirements for technical teams",
            "Applied prioritization and analysis matrices such as the Eisenhower Matrix and 5W2H in day-to-day product work",
            "Organized and maintained product documentation in Google Drive repositories, with intensive use of spreadsheets",
            "Tools: Google Drive, Spreadsheets.",
            "Methodologies: Agile methodologies, Eisenhower Matrix, 5W2H."
          ],
          "tags": [
            "Agile Methodologies",
            "Product Management",
            "Google Drive"
          ],
          "logo": "assets/images/tt_t_solues_em_informtica_ltda_logo.webp",
          "specificAchievements": [
            {
              "tag": "Presentation",
              "description": "Took part in Sponsor's Days, events held during the sprints for results presentations across departments, where I presented development updates on HiEmergência, one of the flagship internal products in the HiApps line."
            }
          ]
        }
      ],
      "education": [
        {
          "id": "inoveai-ufpe-innovation2025",
          "type": "Innovation Program",
          "degree": "Inove Aí's Innovation Journey ( Part of REPE Program) — Executor, Squad 03",
          "institution": "Offered by UFPE, through Public Call No. 26/2024 – Jornada REPE (FACEPE)",
          "date": "Mar 2025 – May 2025",
          "logo": "assets/images/aigenerated_illustrative_image_facepesecti_x_ufpe_2025.webp",
          "highlights": [
            "Selected through Public Call No. 26/2024 – Jornada REPE: Rede de Ecossistemas de Pernambuco (FACEPE) to serve as an Executor in Squad 03, on a unification project for one of the state's Environment and Sustainability secretariats. <a href=\"https://sites.ufpe.br/parquetec/2025/01/15/ufpe-tem-duas-propostas-aprovadas-no-edital-jornada-repe-da-facepe/\" target=\"_blank\" rel=\"noopener\">See UFPE's article on the public call</a>",
            "Product immersions, success cases, and problem-solving sessions using Agile methodologies, heuristics, and problem-solving frameworks.",
            "Application of innovation and sustainability concepts, such as the Lean Canvas, in on-site workshops at Porto Digital (Armazém da Criatividade) and at UFPE Campus Agreste, in Caruaru.",
            "I left the program to prioritize mentoring two intern cohorts at Daus, compounded by the distance factor, as most sessions were held in person."
          ]
        },
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
          "id": "introduction-to-safe",
          "type": "agile",
          "name": "Introduction to SAFe",
          "provider": "Simplilearn",
          "logo": "assets/images/simplilearn_logo.webp",
          "date": "Jul 2026",
          "credentialUrl": "https://simpli-web.app.link/e/BQljCvpb84b"
        },
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
          "id": "curso-aspireleaders-2025",
          "type": "softskills",
          "name": "2025 Aspire Leaders Program",
          "provider": "Aspire Institute",
          "logo": "assets/images/aspire-institute-logo-large-updated-2048x695.webp",
          "date": "Dec 2025",
          "credentialUrl": "https://engage.aspireleaders.org/share/certificate/did:rcw:bbe75782-e060-4363-8078-a1fade3ab696"
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
          "id": "curso-empreendedorismo-ignite",
          "type": "softskills",
          "name": "Ignite Entrepreneurship Program",
          "provider": "Wadhwani Foundation",
          "date": "Jul 2025",
          "logo": "assets/images/wadhwani-foundation.webp",
          "credentialUrl": "https://github.com/eversonfilipe/eversonfilipe/blob/d4521ab193c9ce4fdf4b00cb2cfff4276e341e24/certificates-extra/Certificado%20Ignite%20-%20Wadhwani.pdf"
        },
        {
          "id": "curso-skillsbuild-customerengagement",
          "type": "softskills",
          "name": "SkillsBuild - Customer Engagement: Problem Solving and Process Controls",
          "provider": "IBM",
          "logo": "assets/images/ibm-svgrepo-com.svg",
          "date": "Jul 2025",
          "credentialUrl": "https://www.credly.com/badges/a9ac260f-4415-43d0-a2e2-479478acbddd/linked_in_profile"
        },
        {
          "id": "curso-efset-2025",
          "type": "languages",
          "name": "EF SET English Certificate 69/100 (C1 Advanced)",
          "logo": "assets/images/idxeymiMn5_1783788580495.jpeg",
          "provider": "EF Education First",
          "date": "Feb 2025",
          "credentialUrl": "https://cert.efset.org/en/88BaNL"
        },
        {
          "id": "curso-campusb-intercambio-2024",
          "type": "languages",
          "name": "Comunicación Intercultural - Proyecto Internacional",
          "logo": "assets/images/campusb_logo.webp",
          "provider": "Campus B",
          "date": "Oct 2024",
          "credentialUrl": "https://www.brasilopenbadge.com.br/pages/badge/e661e5f36942fe4cdf319e4ecb18d452"
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
            "Created and co-organized workshops on technology, politics, and civic rights applied to society at Politize! Caruaru, while also contributing to internal projects."
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
          "date": "Mar 2026"
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
        "overline": "AI Engineering, GenAI & Automation · Python, Django, AWS, REST APIs",
        "name": "<strong>Everson</strong> Filipe",
        "title": "Systems Analyst & Implementation · Agentic AI",
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
      ],
      "endorsements": [
        {
          "id": "rec-li-brenno-carvalho",
          "author": "Brenno Carvalho",
          "role": "Military | Businesses Management | Human Resources",
          "company": "Brazilian Navy | Alumni Aspire",
          "date": "Oct 2025",
          "linkedTo": ["curso-aspireleaders-2025"],
          "image": "assets/images/print-endorsement-to-everson-1.webp",
          "profileUrl": null,
          "textHtml": "<p>I was in the same group as Éverson at Aspire Leaders 2025. From the very beginning, he proved to be a highly dedicated and resilient person, helping and answering many questions from other people in the group. He is a humble person, of exemplary character, always ready to solve any problem that may arise.</p>"
        },
        {
          "id": "rec-li-sebastiao-rogerio",
          "author": "Sebastião Rogério, Ph.D.",
          "role": "System Analyst @FCx Labs | PhD in Computer Engineering | AI & Data Science Researcher | Professor",
          "company": "FCx Labs | Ex- Educational Coordinator @UniFavipWyden",
          "date": "May 2025",
          "linkedTo": ["graduacao-ciencia-computacao-unifavipwyden"],
          "image": "assets/images/print-endorsement-to-everson-2.webp",
          "profileUrl": null,
          "textHtml": "<p>Éverson is a very dedicated student, always seeking to improve himself. In addition, he is always engaged in the course activities.</p>"
        },
        {
          "id": "rec-li-fabiola-cavalcanti",
          "author": "Fabíola Cavalcanti",
          "role": "DevOps/DevSecOps Engineer | AWS Cloud | IaC (Terraform) | K8s | 20+ years of expertise in Business Operations & Retail | AWS Certified",
          "company": "AI/R - UOL | Ideathon AC Ex-Participant",
          "date": "Feb 2025",
          "linkedTo": ["ideathon-ac"],
          "image": "assets/images/print-endorsement-to-everson-3.webp",
          "profileUrl": null,
          "textHtml": "<p>Everson Filipe is a strategic and results-oriented product leader with a passion for creating exceptional products that customers love.</p><p>I had the pleasure of working with Everson Filipe at the Ideathon at Armazém de Ideias. During that time, I was impressed by his ability to:</p><ul><li>Understand customer needs and translate them into clear and concise product roadmaps.</li><li>Prioritize and manage a complex product backlog.</li><li>Collaborate effectively with cross-functional teams, including engineering, design and marketing.</li><li>Launch successful products that met or exceeded customer expectations.</li><li>Analyze product data and use insights to make informed decisions.</li></ul><p>Everson is a passionate and experienced product leader who is always looking for ways to improve his products and processes. He is a valuable team player and a mentor to other product managers.</p><p>I strongly recommend Everson for any product management role. He is a valuable asset to any team.</p>"
        },
        {
          "id": "rec-li-luciana-servulo-da-cunha",
          "author": "Luciana Sérvulo da Cunha",
          "role": "Project & Social Impact Manager | Advocacy, Human Rights & Gender Equality | Audiovisual, Storytelling and Strategic Communication",
          "company": "Brasil 247",
          "date": "Feb 2025",
          "linkedTo": [],
          "image": "assets/images/print-endorsement-to-everson-4.webp",
          "profileUrl": null,
          "textHtml": "<p>He understands everything about technology. I recommend him!</p>"
        },
        {
          "id": "rec-li-julia-zultauskas",
          "author": "Julia Zultauskas",
          "role": "Psychology Student | Psychology Intern at Centro de Reabilitação Neurológica Matheus Alvares | ABA and Naturalistic Strategies | Social Psychology | 5/10 Psychologist",
          "company": "Centro de Reabilitação Neurológica Matheus Alvares (Neurological Rehabilitation Center) | Ex-Human Resources Intern @TT&T",
          "date": "Jan 2025",
          "linkedTo": ["product-manager-intern-ttet"],
          "image": "assets/images/print-endorsement-to-everson-5.webp",
          "profileUrl": null,
          "textHtml": "<p>Éverson went through my Recruitment &amp; Selection process and the company's initial training, and we also crossed paths several times within the company.</p><p>He is a hard-working, communicative, responsible and very competent guy. Always chasing down the tasks assigned to him.</p><p>He is also very easy to work with, and his communication is very clear and assertive.</p><p>I am sure that whoever has him on their team is in good hands!</p>"
        },
        {
          "id": "rec-li-marcos-torres",
          "author": "Marcos Torres",
          "role": "Head of Controllership & Industrial Finance | Accounting | Tax | Cost Management | FP&A | Business Partner | SAP CO | IFRS | Cosmetics • Pharmaceutical • Manufacturing",
          "company": "Amend Cosmetics",
          "date": "Jan 2025",
          "linkedTo": [],
          "image": "assets/images/print-endorsement-to-everson-6.webp",
          "profileUrl": null,
          "textHtml": "<p>I was fortunate to count on Éverson's support to understand the automation tools, and the experience was incredible. He has a unique way of explaining complex things in a simple and practical way, which made all the difference for me to adapt quickly to the new tools.</p><p>Beyond mastering the subject, Éverson is extremely approachable and proactive. He was always ready to help and looked for solutions that truly met our needs. His support was essential to understanding how the tools work.</p><p>I recommend Éverson with my eyes closed! He is a competent and committed professional, who makes a point of seeing everyone around him achieve results.</p>"
        },
        {
          "id": "rec-li-felipe-gp-carvalho",
          "author": "Felipe G. P. Carvalho",
          "role": "I am an architect of possibilities: I translate ideas into digital solutions that connect purpose to performance. I help companies innovate and turn processes into concrete results.",
          "company": "Ex-CSO @Daus | CEO @Proveai",
          "date": "Jan 2025",
          "linkedTo": ["daus-agile-product-management-learner"],
          "image": "assets/images/print-endorsement-to-everson-7.webp",
          "profileUrl": null,
          "textHtml": "<p>Éverson is an extraordinary professional: engaged, proactive and committed. His dedication, fast learning ability and clarity in sharing knowledge are inspiring. I had the privilege of witnessing his talent in projects and events, and I have no doubt that he will have a brilliant future.</p>"
        },
        {
          "id": "rec-li-thalita-costa",
          "author": "Thalita Costa",
          "role": "Human Resources | Recruitment & Selection | Tech Recruiter | HR Generalist",
          "company": "HR Assistant @S4Sys | Ex-Tech Recruiter @TT&T",
          "date": "Jan 2025",
          "linkedTo": ["product-manager-intern-ttet"],
          "image": "assets/images/print-endorsement-to-everson-8.webp",
          "profileUrl": null,
          "textHtml": "<p>Éverson is a super engaged and proactive professional. In the meetings and events I attended alongside him, such as the company's Sponsor Day, I could see his commitment and dedication to the projects he carried out. In addition to his willingness to share knowledge and explain processes in detail. It was a privilege to have had contact with such a competent professional, even if only briefly. 🤗</p>"
        },
        {
          "id": "rec-li-edil-dias",
          "author": "Edil Dias",
          "role": "Co-Founder, Umans - Intelligent Agents | Digital Products | UX / UI | Automation | SaaS | Agentic Development",
          "company": "Co-founder @Umans | CEO @Daus",
          "date": "Jan 2025",
          "linkedTo": ["daus-agile-product-management-learner"],
          "image": "assets/images/print-endorsement-to-everson-9.webp",
          "profileUrl": null,
          "textHtml": "<p>Working with Everson day to day is rewarding, he is a completely engaged and proactive guy. He likes to learn and learns fast. The kind of person you know will have a brilliant future.</p>"
        },
        {
          "id": "rec-li-felipe-reis-andrade",
          "author": "Felipe dos Reis de Andrade",
          "role": "Endemic Disease Control Agent",
          "company": "Municipal Government of Frei Miguelinho",
          "date": "Jan 2025",
          "linkedTo": [],
          "image": "assets/images/print-endorsement-to-everson-10.webp",
          "profileUrl": null,
          "textHtml": "<p>I had the privilege of counting on Éverson Filipe's support in matters related to Information Systems, and his help was fundamental to the success of my learning. Éverson Filipe demonstrated technical knowledge, as well as a lot of patience and dedication in sharing his knowledge.</p>"
        },
        {
          "id": "rec-li-luis-daniel-infante-pena",
          "author": "Luis Daniel Infante Pena",
          "role": "Relationship management | Localization",
          "company": "Relationship Manager @SIL Global | Ex-Program Assistant @Campus b",
          "date": "Oct 2024",
          "linkedTo": ["curso-campusb-intercambio-2024"],
          "image": "assets/images/print-endorsement-to-everson-11.webp",
          "profileUrl": null,
          "textHtml": "<p>I had the pleasure of supporting Éverson as a Program Assistant in the “Comunicación Intercultural” program offered by Campus B in partnership with YDUQS. He was a participative and proactive student, demonstrating great ability to solve problems related to teamwork, especially in an international context. His commitment to attending the sessions and his willingness to help his colleagues were remarkable. Éverson also developed significant soft skills, such as intercultural intelligence and teamwork, and demonstrated fluency in a second language.</p>"
        }
      ]
    },
    "pt": {
      "about": {
        "p1": "Sou um Analista de Sistemas em início de carreira, com foco em Engenharia de IA e Implantação de Workflows, transformando requisitos de negócio em configurações de software confiáveis, fluxos de trabalho padronizados e soluções prontas para produção em ambientes B2B. Atuando com plataformas ERP e SaaS, fortaleço minha base em análise de sistemas, implantação de software, automação de processos, validação de dados e integrações em nuvem utilizando tecnologias como Python, Django, APIs REST e AWS. Embora esteja no início da minha trajetória profissional, já contribuo diretamente em ambientes de produção, entregando resultados mensuráveis por meio de execução estruturada e aprendizado contínuo.",
        "p2": "Meus interesses profissionais se estendem naturalmente para a Engenharia de IA, área em que exploro como sistemas inteligentes podem aprimorar a entrega de software e a eficiência operacional. Estudo e desenvolvo projetos práticos envolvendo LLMs, IA Agêntica (Agentic AI), Retrieval-Augmented Generation (RAG), LangChain, LangGraph, IA Generativa (GenAI) e automação de workflows, sempre abordando a IA sob a perspectiva da implantação de sistemas. Em vez de enxergar a IA como uma tecnologia isolada, vejo-a como uma extensão da engenharia de software, combinando automação, raciocínio estruturado e arquiteturas escaláveis para resolver problemas reais de negócio.",
        "p3": "Gosto de atuar na interseção entre sistemas, automação e inteligência artificial, expandindo continuamente minha base técnica enquanto colaboro com equipes multidisciplinares e aprendo com desafios do mundo real. Meu objetivo é evoluir como engenheiro capaz de projetar sistemas de IA confiáveis e automações inteligentes que gerem valor mensurável para os negócios. Estou sempre aberto a me conectar com profissionais, discutir tecnologia, compartilhar ideias e explorar oportunidades em Análise de Sistemas, Engenharia de Implantação, Engenharia de IA e Automação. Vamos nos conectar e construir sistemas inteligentes juntos!",
        "current": "Atualmente na <strong>Kartado</strong> &middot; Trabalhando com MCP, orquestração de agentes e avaliação de LLM &middot; Coorganizador no <strong>GDG Barueri</strong> (IA e Inovação) &middot; Palestrante no FLISoL 2026 &middot; Bacharelado em Ciência da Computação na UniFavip Wyden",
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
          "id": "kartado-systems-implementation-intern",
          "role": "Estagiário em Implantação de Sistemas",
          "company": "Kartado",
          "optional_more_about_company": "A Kartado é uma empresa B2B de SaaS que atende ao setor de concessões rodoviárias, oferecendo uma plataforma integrada para gestão de ativos, operações de serviços de campo, construção, manutenção e conformidade regulatória. Fundada em Florianópolis em 2017, a empresa desenvolveu uma solução web e móvel voltada para operadores de infraestrutura, concessionárias, empreiteiras, empresas de engenharia e prestadores de serviços.",
          "date": "Set 2025 – Presente",
          "bullets": [
            "Como Estagiário de Implantação de Sistemas, traduzi requisitos de negócio em configurações de software e fluxos automatizados em mais de 42 ambientes de clientes B2B, atuando em frameworks ágeis.",
            "Configurei regras JSONLogic para formulários dinâmicos em mais de 42 ambientes de clientes via Django Admin, garantindo integridade de dados e consistência funcional; corrigi mapas GIS, ajustei Shapefiles e validei geometrias espaciais para a parametrização de sistemas de concessão rodoviária;",
            "Desenvolvi scripts Python de automação ETL integrados ao Django ORM, substituindo fluxos manuais de transformação de dados; automatizei a geração de planilhas de parametrização com Python, Pandas e openpyxl, reduzindo o esforço manual;",
            "Construí scripts Python em notebooks para extração de metadados JSON, validação de schema e detecção proativa de inconsistências estruturais em datasets exportados; mantive a documentação de integração REST API/JWT e scripts de validação Pytest para módulos Django;",
            "Utilizei AWS IAM, Amazon EC2, Amazon ECS (Docker), AWS Step Functions, ODBC e Amazon Athena em fluxos de infraestrutura, acesso seguro, integração de dados e analytics nos ambientes dos clientes;",
            "Tech Stack: JSONLogic, Django, Python, Pandas, OpenpyXL, GIS, AWS."
          ],
          "tags": [
            "Pandas",
            "Python",
            "ClickUp",
            "ERP Implementations",
            "REST APIs",
            "JSONLogic",
            "GIS",
            "AWS",
            "AWS IAM",
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
              "description": "Indicado ao Prêmio Agilidade do Mês da empresa em março de 2026 pelo desempenho em Implantação Técnica."
            },
            {
              "tag": "Entrega",
              "description": "Contribuiu para que a equipe alcançasse 99,48% de entregas de implantação no prazo, mantendo 100% de pontualidade nas próprias entregas durante o primeiro semestre de 2026."
            },
            {
              "tag": "Reimplantação",
              "description": "Cocordenei em julho a reimplantação de 4 empresas de uma grande concessionária rodoviária do Nordeste com um Consultor Comercial, traduzindo especificações do cliente em configurações ágeis, scripts sob demanda e testes validados; projeto destacado na reunião geral de resultados."
            }
          ]
        },
        {
          "id": "daus-agile-product-management-learner",
          "role": "Aprendiz em Gestão Ágil de Produtos",
          "company": "Daus",
          "date": "Dez 2024 – Jun 2025",
          "optional_more_about_company": "A Daus é uma software house e startup sediada no Recife, fundada em 2023, que desenvolve projetos internos e soluções para múltiplos clientes, combinando estratégia de produto, design UX/UI, desenvolvimento de software, inteligência artificial, automação e SaaS. Atuando a partir do Porto Digital, o studio coc cria produtos digitais seguros e escaláveis — de websites e landing pages a plataformas de e-commerce, sistemas web e aplicações — apoiando os clientes desde a descoberta até a entrega.",
          "bullets": [
            "Como Aprendiz em Gestão de Produtos focado em levantamento de requisitos, combinei prática e aprendizado estruturado: ao mesmo tempo que desenvolvia fluência em Gestão Ágil de Produtos, atuei em product discovery e análise de requisitos, transformando necessidades de stakeholders em artefatos de entrega documentados e acionáveis.",
            "Apliquei os frameworks Scrum, Kanban e Lean Thinking para conduzir product discovery em ambiente de software house;",
            "Realizei análise de requisitos em projetos internos e de portfólio multi-cliente;",
            "Documentei insights de produto, user flows e requisitos funcionais no ecossistema Atlassian (Jira, Confluence) e no FigJam;",
            "Tech Stack: Figma, FigJam, Jira, Confluence.",
            "Metodologias: Scrum, Kanban, Lean Thinking."
          ],
          "tags": [
            "Requirement Analysis",
            "Scrum",
            "Jira",
            "Agile Methodologies",
            "Mentoring",
            "Product Discovery",
            "Product Management",
            "Figma"
          ],
          "carousel": {
            "label": "Daus Software House - Website & Missão",
            "slides": [
              {
                "src": "assets/images/print-landing-page-daus.webp",
                "alt": "Captura de tela da Landing Page da Daus, em que Éverson Filipe (eu) fui aprendiz de Product Manager/Agilista.",
                "caption": "Captura de tela da Landing Page da Daus, em que Éverson Filipe (eu) fui aprendiz de Product Manager/Agilista."
              }
            ]
          },
          "logo": "assets/images/daus_software_house_logo.jpg",
          "specificAchievements": [
            {
              "tag": "Capacitação e impacto",
              "description": "Mentorei duas turmas de estagiários em programas estruturados de onboarding, cobrindo workflows de Agile Product Management e entrega de MVP."
            }
          ]
        },
        {
          "id": "product-manager-intern-ttet",
          "role": "Gestor de Produtos Estagiário",
          "company": "TT&T Soluções em Informática",
          "date": "Set 2024 – Fev 2025",
          "optional_more_about_company": "A TT&T Soluções em Informática Ltda é uma empresa de software sediada em São Paulo, fundada em 1996, que desenvolve sistemas internos e externos, incluindo a linha de produtos HiApps, mantendo também um forte perfil acadêmico e voltado à formação de estagiários, com oportunidades para estudantes adquirirem experiência prática em desenvolvimento de software, tecnologia da informação, metodologias ágeis e tecnologias emergentes.",
          "bullets": [
            "Como Estagiário de Gestão de Produtos, combinei entrega prática com aprendizado estruturado: aprofundando meu domínio de metodologias Ágeis, coordenei cerimônias e traduzi requisitos ao longo dos sprints.",
            "Coordenou e participou de cerimônias Ágeis e outros artefatos de metodologia Ágil ao longo dos sprints, incluindo dailies",
            "Colaborou estreitamente com equipes de UX/UI nos sistemas internos e externos da empresa, a linha de produtos HiApps",
            "Documentou requisitos funcionais e traduziu requisitos de negócios para equipes técnicas",
            "Aplicou matrizes de priorização e análise, como a Matriz de Eisenhower e o 5W2H, no trabalho de produto do dia a dia",
            "Organizou e manteve a documentação do produto em repositórios do Google Drive, com uso intensivo de planilhas",
            "Ferramentas: Google Drive, Planilhas.",
            "Metodologias: Metodologias ágeis, Matriz de Eisenhower, 5W2H."
          ],
          "tags": [
            "Agile Methodologies",
            "Product Management",
            "Google Drive"
          ],
          "logo": "assets/images/tt_t_solues_em_informtica_ltda_logo.webp",
          "specificAchievements": [
            {
              "tag": "Apresentação",
              "description": "Participou do Sponsor's Days, eventos realizados durante os sprints para apresentação de resultados entre departamentos, onde apresentou atualizações de desenvolvimento do HiEmergência, um dos principais produtos internos da linha HiApps."
            }
          ]
        }
      ],
      "education": [
        {
          "id": "inoveai-ufpe-innovation2025",
          "type": "Programa de Inovação",
          "degree": "Jornada de Inovação Inove Aí (Parte do programa REPE) — Executor, Squad 03",
          "institution": "Oferecido pela UFPE, via Edital nº 26/2024 – Jornada REPE (FACEPE)",
          "date": "Mar 2025 – Mai 2025",
          "logo": "assets/images/aigenerated_illustrative_image_facepesecti_x_ufpe_2025.webp",
          "highlights": [
            "Selecionado pelo Edital nº 26/2024 – Jornada REPE: Rede de Ecossistemas de Pernambuco (FACEPE) para atuar como Executor no Squad 03, em um projeto de unificação para uma das secretarias de Meio Ambiente e Sustentabilidade do estado. <a href=\"https://sites.ufpe.br/parquetec/2025/01/15/ufpe-tem-duas-propostas-aprovadas-no-edital-jornada-repe-da-facepe/\" target=\"_blank\" rel=\"noopener\">Ver matéria da UFPE sobre o edital</a>",
            "Imersões de produto, cases de sucesso e resolução de problemas utilizando metodologias ágeis, heurísticas e frameworks de resolução de problemas.",
            "Aplicação de conceitos de inovação e sustentabilidade, como o Lean Canvas, em workshops presenciais no Porto Digital (Armazém da Criatividade) e na UFPE Campus Agreste, em Caruaru.",
            "Saí do programa para priorizar a mentoria de dois cohortes de estagiários na Daus, somado ao fator de distância, já que a maioria dos encontros era presencial."
          ]
        },
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
          "id": "introduction-to-safe",
          "type": "agile",
          "name": "Introdução ao SAFe",
          "provider": "Simplilearn",
          "logo": "assets/images/simplilearn_logo.webp",
          "date": "Jul 2026",
          "credentialUrl": "https://simpli-web.app.link/e/BQljCvpb84b"
        },
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
          "id": "curso-aspireleaders-2025",
          "type": "softskills",
          "name": "2025 Aspire Leaders Program",
          "provider": "Aspire Institute",
          "logo": "assets/images/aspire-institute-logo-large-updated-2048x695.webp",
          "date": "Dec 2025",
          "credentialUrl": "https://engage.aspireleaders.org/share/certificate/did:rcw:bbe75782-e060-4363-8078-a1fade3ab696"
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
          "id": "curso-empreendedorismo-ignite",
          "type": "softskills",
          "name": "Programa de Empreendedorismo Ignite",
          "provider": "Wadhwani Foundation",
          "date": "Jul 2025",
          "logo": "assets/images/wadhwani-foundation.webp",
          "credentialUrl": "https://github.com/eversonfilipe/eversonfilipe/blob/d4521ab193c9ce4fdf4b00cb2cfff4276e341e24/certificates-extra/Certificado%20Ignite%20-%20Wadhwani.pdf"
        },
        {
          "id": "curso-skillsbuild-customerengagement",
          "type": "softskills",
          "name": "SkillsBuild - Engajamento do Cliente: Resolução de Problemas e Controles de Processos",
          "provider": "IBM",
          "logo": "assets/images/ibm-svgrepo-com.svg",
          "date": "Jul 2025",
          "credentialUrl": "https://www.credly.com/badges/a9ac260f-4415-43d0-a2e2-479478acbddd/linked_in_profile"
        },
        {
          "id": "curso-efset-2025",
          "type": "languages",
          "name": "Certificado de Inglês EF SET 69/100 (C1 Avançado)",
          "logo": "assets/images/idxeymiMn5_1783788580495.jpeg",
          "provider": "EF Education First",
          "date": "Fev 2025",
          "credentialUrl": "https://cert.efset.org/en/88BaNL"
        },
        {
          "id": "curso-campusb-intercambio-2024",
          "type": "languages",
          "name": "Comunicación Intercultural - Proyecto Internacional",
          "logo": "assets/images/campusb_logo.webp",
          "provider": "Campus B",
          "date": "Oct 2024",
          "credentialUrl": "https://www.brasilopenbadge.com.br/pages/badge/e661e5f36942fe4cdf319e4ecb18d452"
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
          "date": "Mar 2026"
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
        "overline": "AI Engineering, GenAI e Automação · Python, Django, AWS, REST APIs",
        "name": "<strong>Éverson</strong> Filipe",
        "title": "Analista de Sistemas e Implantação · Agentic AI",
        "tagline": "Unindo requisitos de negócio à execução escalável de software por meio de validação rigorosa de dados e automação de processos."
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
      ],
      "endorsements": [
        {
          "id": "rec-li-brenno-carvalho",
          "author": "Brenno Carvalho",
          "role": "Militar | Gestão de Negócios | Recursos Humanos",
          "company": "Marinha do Brasil | Alumni Aspire",
          "date": "Oct 2025",
          "linkedTo": ["curso-aspireleaders-2025"],
          "image": "assets/images/print-endorsement-to-everson-1.webp",
          "profileUrl": null,
          "textHtml": "<p>Estive no mesmo grupo que Éverson no Aspire Leaders 2025. Desde o início, se mostrou uma pessoa altamente dedicada e resiliente, ajudando e tirando dúvidas diversas de outras pessoas no grupo. É uma pessoa humilde, de caráter exemplar, sempre pronto para resolver qualquer problema que venha a surgir.</p>"
        },
        {
          "id": "rec-li-sebastiao-rogerio",
          "author": "Sebastião Rogério, Ph.D.",
          "role": "Analista de Sistemas @FCx Labs | Doutor em Engenharia da Computação | Pesquisador em IA & Ciência de Dados | Professor",
          "company": "FCx Labs | Ex-Coordenador Educacional @UniFavipWyden",
          "date": "May 2025",
          "linkedTo": ["graduacao-ciencia-computacao-unifavipwyden"],
          "image": "assets/images/print-endorsement-to-everson-2.webp",
          "profileUrl": null,
          "textHtml": "<p>Éverson é um aluno muito dedicado, sempre buscando se aperfeiçoar. Além disso, está sempre engajado nas atividades do curso.</p>"
        },
        {
          "id": "rec-li-fabiola-cavalcanti",
          "author": "Fabíola Cavalcanti",
          "role": "Engenheira DevOps/DevSecOps | AWS Cloud | IaC (Terraform) | K8s | 20+ anos de experiência em Operações de Negócio & Varejo | AWS Certified",
          "company": "AI/R - UOL | Ex-participante Ideathon AC",
          "date": "Feb 2025",
          "linkedTo": ["ideathon-ac"],
          "image": "assets/images/print-endorsement-to-everson-3.webp",
          "profileUrl": null,
          "textHtml": "<p>Everson Filipe é um líder de produto estratégico e orientado para resultados com paixão por criar produtos excepcionais que os clientes adoram.</p><p>Tive o prazer de trabalhar com Everson Filipe no Ideathon no Armazém de Ideias. Durante esse tempo, fiquei impressionado com sua capacidade de:</p><ul><li>Entender as necessidades dos clientes e traduzi-las em roteiros de produtos claros e concisos.</li><li>Priorizar e gerenciar um backlog de produtos complexo.</li><li>Colaborar de forma eficaz com equipes multifuncionais, incluindo engenharia, design e marketing.</li><li>Lançar produtos de sucesso que atenderam ou excederam as expectativas dos clientes.</li><li>Analisar dados de produtos e usar insights para tomar decisões informadas.</li></ul><p>Everson é um líder de produto apaixonado e experiente que está sempre procurando maneiras de melhorar seus produtos e processos. Ele é um jogador de equipe valioso e um mentor para outros gerentes de produto.</p><p>Eu recomendo fortemente Everson para qualquer função de gerenciamento de produto. Ele é um ativo valioso para qualquer equipe.</p>"
        },
        {
          "id": "rec-li-luciana-servulo-da-cunha",
          "author": "Luciana Sérvulo da Cunha",
          "role": "Gerente de Projetos & Impacto Social | Advocacy, Direitos Humanos & Equidade de Gênero | Audiovisual, Storytelling e Comunicação Estratégica",
          "company": "Brasil 247",
          "date": "Feb 2025",
          "linkedTo": [],
          "image": "assets/images/print-endorsement-to-everson-4.webp",
          "profileUrl": null,
          "textHtml": "<p>Entende de tudo de tecnologia. Recomendo!</p>"
        },
        {
          "id": "rec-li-julia-zultauskas",
          "author": "Julia Zultauskas",
          "role": "Acadêmica de Psicologia | Estagiária de Psicologia no Centro de Reabilitação Neurológica Matheus Alvares | ABA e Estratégias Naturalistas | Psicologia Social | 5/10 Psicóloga",
          "company": "Centro de Reabilitação Neurológica Matheus Alvares | Ex-Estagiária de RH @TT&T",
          "date": "Jan 2025",
          "linkedTo": ["product-manager-intern-ttet"],
          "image": "assets/images/print-endorsement-to-everson-5.webp",
          "profileUrl": null,
          "textHtml": "<p>Éverson passou por mim no R&amp;S e no Treinamento inicial da empresa, além de termos cruzado caminhos diversas vezes dentro da empresa.</p><p>É um cara esforçado, comunicativo, responsável e muito competente. Sempre correndo atrás das tarefas que lhe são solicitadas.</p><p>Também é muito tranquilo de trabalhar e de comunicação muito clara e assertiva.</p><p>Tenho certeza que quem o tiver no time, está em boas mãos!</p>"
        },
        {
          "id": "rec-li-marcos-torres",
          "author": "Marcos Torres",
          "role": "Head de Controladoria & Finanças Industriais | Contabilidade | Tributário | Gestão de Custos | FP&A | Business Partner | SAP CO | IFRS | Cosméticos • Farmacêutico • Manufatura",
          "company": "Amend Cosméticos",
          "date": "Jan 2025",
          "linkedTo": [],
          "image": "assets/images/print-endorsement-to-everson-6.webp",
          "profileUrl": null,
          "textHtml": "<p>Tive a felicidade de contar com o suporte do Éverson para entender as ferramentas de automação, e a experiência foi incrível. Ele tem um jeito único de explicar coisas complexas de forma simples e prática, o que fez toda a diferença para que eu pudesse me adaptar rapidamente às novas ferramentas.</p><p>Além de dominar o assunto, Éverson é extremamente acessível e proativo. Ele estava sempre pronto para ajudar e buscava soluções que realmente atendiam às nossas necessidades. Seu apoio foi essencial para entender a dinâmica das ferramentas.</p><p>Recomendo o Éverson de olhos fechados! Ele é um profissional competente e comprometido, que faz questão de ver todo mundo ao seu redor alcançar resultados.</p>"
        },
        {
          "id": "rec-li-felipe-gp-carvalho",
          "author": "Felipe G. P. Carvalho",
          "role": "Sou um arquiteto de possibilidades: traduzo ideias em soluções digitais que conectam propósito à performance. Ajudo empresas a inovar e transformar processos em resultados concretos.",
          "company": "Ex-CSO @Daus | CEO @Proveai",
          "date": "Jan 2025",
          "linkedTo": ["daus-agile-product-management-learner"],
          "image": "assets/images/print-endorsement-to-everson-7.webp",
          "profileUrl": null,
          "textHtml": "<p>Éverson é um profissional extraordinário, engajado, proativo e comprometido. Sua dedicação, rápida capacidade de aprendizado e clareza ao compartilhar conhecimento são inspiradoras. Tive o privilégio de testemunhar seu talento em projetos e eventos, e não tenho dúvidas de que ele terá um futuro brilhante.</p>"
        },
        {
          "id": "rec-li-thalita-costa",
          "author": "Thalita Costa",
          "role": "Recursos Humanos | Recrutamento & Seleção | Tech Recruiter | RH Generalista",
          "company": "Assistente de RH @S4Sys | Ex-Tech Recruiter @TT&T",
          "date": "Jan 2025",
          "linkedTo": ["product-manager-intern-ttet"],
          "image": "assets/images/print-endorsement-to-everson-8.webp",
          "profileUrl": null,
          "textHtml": "<p>Éverson é um profissional super engajado e proativo. Nas reuniões e eventos, como o Sponsor Day da empresa, que participei junto a ele pude ver seu compromisso e dedicação aos projetos por ele realizado. Além da sua disposição em compartilhar conhecimento e explicar processos de forma detalhada. Foi um privilégio ter tido contato com um profissional tão competente, mesmo que de forma breve. 🤗</p>"
        },
        {
          "id": "rec-li-edil-dias",
          "author": "Edil Dias",
          "role": "Co-Founder, Umans - Agentes Inteligentes | Produtos digitais | UX / UI | Automação | SaaS | Agentic Development",
          "company": "Co-founder @Umans | CEO @Daus",
          "date": "Jan 2025",
          "linkedTo": ["daus-agile-product-management-learner"],
          "image": "assets/images/print-endorsement-to-everson-9.webp",
          "profileUrl": null,
          "textHtml": "<p>Trabalhar com Everson no dia a dia é gratificante, ele é cara completamente engajado e proativo. Gosta de aprender e aprende rápido. Aquele tipo de pessoa que você sabe que terá um futuro brilhante.</p>"
        },
        {
          "id": "rec-li-felipe-reis-andrade",
          "author": "Felipe dos Reis de Andrade",
          "role": "Agente de Endemias",
          "company": "Prefeitura Municipal de Frei Miguelinho",
          "date": "Jan 2025",
          "linkedTo": [],
          "image": "assets/images/print-endorsement-to-everson-10.webp",
          "profileUrl": null,
          "textHtml": "<p>Tive o privilégio de contar com o apoio de Éverson Filipe em assuntos relacionados a Sistemas de Informação, e sua ajuda foi fundamental para o sucesso do meu aprendizado. Éverson Filipe demonstrou um conhecimento técnico, além de muita paciência e dedicação ao compartilhar seu conhecimento.</p>"
        },
        {
          "id": "rec-li-luis-daniel-infante-pena",
          "author": "Luis Daniel Infante Pena",
          "role": "Gestão de Relacionamento | Localização",
          "company": "Gerente de Relacionamento @SIL Global | Ex-Assistente de Programas @Campus b",
          "date": "Oct 2024",
          "linkedTo": ["curso-campusb-intercambio-2024"],
          "image": "assets/images/print-endorsement-to-everson-11.webp",
          "profileUrl": null,
          "textHtml": "<p>Tive o prazer de acompanhar como Program Assistant ao Éverson no programa de “Comunicación Intercultural” oferecido pela Campus B em parceria com a YDUQS. Ele foi um aluno participativo e proativo, demonstrando grande habilidade em resolver problemas relacionados com trabalho em equipe, especialmente em um contexto internacional. Seu compromisso com a assistência às sessões e sua disposição em ajudar os colegas foram notáveis. O Éverson também desenvolveu significativas soft skills, como inteligência intercultural e trabalho em equipe, e demonstrou fluência em uma segunda língua.</p>"
        }
      ]
    },
    "es": {
      "about": {
        "p1": "Soy un Analista de Sistemas en etapa inicial de carrera, enfocado en Ingeniería de IA e Implementación de Workflows, transformando requisitos de negocio en configuraciones de software confiables, flujos de trabajo estandarizados y soluciones listas para producción en entornos B2B. Trabajando con plataformas ERP y SaaS, he fortalecido mi base en análisis de sistemas, implementación de software, automatización de procesos, validación de datos e integraciones en la nube utilizando tecnologías como Python, Django, APIs REST y AWS. Aunque aún me encuentro al inicio de mi trayectoria profesional, ya he contribuido en entornos de producción, entregando resultados medibles mediante una ejecución estructurada y aprendizaje continuo.",
        "p2": "Mis intereses profesionales se extienden de forma natural hacia la Ingeniería de IA, donde exploro cómo los sistemas inteligentes pueden mejorar el desarrollo de software y la eficiencia operativa. Estudio y desarrollo proyectos prácticos con LLMs, IA Agéntica (Agentic AI), Retrieval-Augmented Generation (RAG), LangChain, LangGraph, IA Generativa (GenAI) y automatización de workflows, abordando siempre la IA desde la perspectiva de la implementación de sistemas. En lugar de considerar la IA como una tecnología aislada, la veo como una extensión de la ingeniería de software, combinando automatización, razonamiento estructurado y arquitecturas escalables para resolver problemas reales de negocio.",
        "p3": "Disfruto trabajar en la intersección entre sistemas, automatización e inteligencia artificial, ampliando continuamente mi base técnica mientras colaboro con equipos multidisciplinarios y aprendo de desafíos del mundo real. Mi objetivo es crecer como ingeniero capaz de diseñar sistemas de IA confiables y automatizaciones inteligentes que generen un valor medible para las empresas. Siempre estoy abierto a conectar con otros profesionales, conversar sobre tecnología, compartir ideas y explorar oportunidades en Análisis de Sistemas, Ingeniería de Implementación, Ingeniería de IA y Automatización. ¡Conectemos y construyamos juntos sistemas inteligentes!",
        "current": "Actualmente en <strong>Kartado</strong> &middot; Trabajando con MCP, orquestación de agentes y evaluación de LLM &middot; Coorganizador en <strong>GDG Barueri</strong> (IA e Innovación) &middot; Ponente en FLISoL 2026 &middot; Licenciatura en Ciencias de la Computación en UniFavip Wyden",
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
          "id": "kartado-systems-implementation-intern",
          "role": "Practicante en Implementación de Sistemas",
          "company": "Kartado",
          "optional_more_about_company": "Kartado es una empresa B2B de SaaS que presta servicios al sector de concesiones viales, ofreciendo una plataforma integrada para la gestión de activos, las operaciones de servicios de campo, la construcción, el mantenimiento y el cumplimiento normativo. Fundada en Florianópolis en 2017, la empresa desarrolló una solución web y móvil dirigida a operadores de infraestructura, concesionarias, contratistas, empresas de ingeniería y proveedores de servicios.",
          "date": "Sep 2025 – Presente",
          "bullets": [
            "Como Pasante de Implementación de Sistemas, traduje requisitos de negocio en configuraciones de software y flujos automatizados en más de 42 entornos de clientes B2B, operando dentro de marcos ágiles.",
            "Configuré reglas de JSONLogic para formularios dinámicos en más de 42 entornos de clientes vía Django Admin, garantizando integridad de datos y consistencia funcional; corregí mapas GIS, ajusté Shapefiles y validé geometrías espaciales para la parametrización de sistemas de concesión vial;",
            "Desarrollé scripts Python de automatización ETL integrados al Django ORM, sustituyendo flujos manuales de transformación de datos; automatizé la generación de planilhas de parametrización con Python, Pandas y openpyxl, reduciendo el esfuerzo manual;",
            "Construí scripts Python en notebooks para extracción de metadatos JSON, validación de schema y detección proactiva de inconsistencias estructurales en datasets exportados; mantuve la documentación de integración REST API/JWT y scripts de validación Pytest para módulos Django;",
            "Utilicé AWS IAM, Amazon EC2, Amazon ECS (Docker), AWS Step Functions, ODBC y Amazon Athena en flujos de infraestructura, acceso seguro, integración de datos y analytics en los ambientes de los clientes;",
            "Tech Stack: JSONLogic, Django, Python, Pandas, OpenpyXL, GIS, AWS."
          ],
          "tags": [
            "Pandas",
            "Python",
            "ClickUp",
            "ERP Implementations",
            "REST APIs",
            "JSONLogic",
            "GIS",
            "AWS",
            "AWS IAM",
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
              "description": "Nominado al Premio Agilidad del Mes de la empresa en marzo de 2026 por su desempeño en implementación técnica y corrección de errores."
            },
            {
              "tag": "Entrega",
              "description": "Contribuí a que el equipo alcanzara un 99,48 % de entregas de implementación a tiempo, manteniendo una tasa personal del 100 % de entregas puntuales durante el primer semestre de 2026."
            },
            {
              "tag": "Reimplementación",
              "description": "Cocoordiné en julio la reimplementación de 4 empresas para una importante concesionaria vial del Nordeste de Brasil junto con un Consultor Comercial, traduciendo especificaciones del cliente en configuraciones ágiles, scripts personalizados y pruebas validadas; proyecto destacado en la reunión general de resultados."
            }
          ]
        },
        {
          "id": "daus-agile-product-management-learner",
          "role": "Aprendiz en Gestión Ágil de Productos",
          "company": "Daus",
          "date": "Dic 2024 – Jun 2025",
          "optional_more_about_company": "Daus es una software house y startup con sede en Recife, fundada en 2023, que desarrolla proyectos internos y soluciones para múltiples clientes, combinando estrategia de producto, diseño UX/UI, desarrollo de software, inteligencia artificial, automatización y SaaS. Desde Porto Digital, el estudio co-crea productos digitales seguros y escalables —desde sitios web y landing pages hasta plataformas de comercio electrónico, sistemas web y aplicaciones— y acompaña a sus clientes desde la etapa de descubrimiento hasta la entrega.",
          "bullets": [
            "Como Aprendiz en Gestión de Productos enfocado en levantamiento de requisitos, combiné práctica y aprendizaje estructurado: al mismo tiempo que desarrollaba fluidez en Gestión Ágil de Productos, participé en product discovery y análisis de requisitos, transformando necesidades de stakeholders en artefactos de entrega documentados y accionables.",
            "Apliqué metodologías ágiles Scrum, Kanban y Lean Thinking para facilitar procesos de descubrimiento de productos y análisis de requisitos en una software house, trabajando en proyectos internos y con clientes externos.",
            "Apoyé el análisis de requisitos en proyectos de portafolio multi-cliente, contribuyendo a la definición de productos y funcionalidades.",
            "Documenté información clave de producto, flujos de usuario y requisitos funcionales utilizando herramientas del ecosistema Atlassian (Jira y Confluence), así como FigJam.",
            "Tech Stack: Figma, FigJam, Jira, Confluence.",
            "Metodologías: Scrum, Kanban, Lean Thinking."
          ],
          "tags": [
            "Requirement Analysis",
            "Scrum",
            "Jira",
            "Agile Methodologies",
            "Mentoring",
            "Product Discovery",
            "Product Management",
            "Figma"
          ],
          "carousel": {
            "label": "Daus Software House - Sitio Web y Misión",
            "slides": [
              {
                "src": "assets/images/print-landing-page-daus.webp",
                "alt": "Captura de pantalla de la Landing Page de Daus, en la que Éverson Filipe (yo) fui aprendiz de Product Manager/Agilista.",
                "caption": "Captura de pantalla de la Landing Page de Daus, en la que Éverson Filipe (yo) fui aprendiz de Product Manager/Agilista."
              }
            ]
          },
          "logo": "assets/images/daus_software_house_logo.jpg",
          "specificAchievements": [
            {
              "tag": "Capacitación y impacto",
              "description": "Mentoricé a dos grupos de practicantes en programas estructurados de incorporación, cubriendo flujos de trabajo de Gestión Ágil de Productos y entrega de MVP."
            }
          ]
        },
        {
          "id": "product-manager-intern-ttet",
          "role": "Gestor de Products Practicante",
          "company": "TT&T Soluções em Informática",
          "date": "Sep 2024 – Feb 2025",
          "optional_more_about_company": "TT&T Soluções em Informática Ltda es una empresa de software con sede en São Paulo, fundada en 1996, que desarrolla sistemas internos y externos, incluida la línea de productos HiApps, y mantiene un marcado perfil académico y orientado a la formación de estudiantes en prácticas, brindándoles experiencia práctica en desarrollo de software, tecnologías de la información, metodologías ágiles y tecnologías emergentes.",
          "bullets": [
            "Como Pasante de Gestión de Productos, combiné la entrega práctica con el aprendizaje estructurado: profundizando mi dominio de las metodologías Ágiles, coordiné ceremonias y traduje requisitos a lo largo de los sprints.",
            "Coordiné y participé en ceremonias Ágiles y otros artefactos de metodología Ágil a lo largo de los sprints, incluyendo dailies",
            "Colaboré estrechamente con equipos de UX/UI en los sistemas internos y externos de la empresa, la línea de productos HiApps",
            "Documenté requisitos funcionales y traduje requisitos de negocios para equipos técnicos",
            "Aplicó matrices de priorización y análisis, como la Matriz de Eisenhower y el 5W2H, en el trabajo de producto del día a día",
            "Organizó y mantuvo la documentación del producto en repositorios del Google Drive, con uso intensivo de planilhas",
            "Herramientas: Google Drive, Planilhas.",
            "Metodologías: Metodologías ágiles, Matriz de Eisenhower, 5W2H."
          ],
          "tags": [
            "Agile Methodologies",
            "Product Management",
            "Google Drive"
          ],
          "logo": "assets/images/tt_t_solues_em_informtica_ltda_logo.webp",
          "specificAchievements": [
            {
              "tag": "Presentación",
              "description": "Participó en Sponsor's Days, eventos realizados durante los sprints para presentación de resultados entre departamentos, donde presentó actualizaciones de desarrollo del HiEmergência, uno de los principales productos internos de la línea HiApps."
            }
          ]
        }
      ],
      "education": [
        {
          "id": "inoveai-ufpe-innovation2025",
          "type": "Programa de Innovación",
          "degree": "Jornada de Innovación Inove Aí (Parte del programa REPE) — Ejecutor, Squad 03",
          "institution": "Ofrecido por la UFPE, mediante la Convocatoria n.º 26/2024 – Jornada REPE (FACEPE)",
          "date": "Mar 2025 – May 2025",
          "logo": "assets/images/aigenerated_illustrative_image_facepesecti_x_ufpe_2025.webp",
          "highlights": [
            "Seleccionado mediante la Convocatoria n.º 26/2024 – Jornada REPE: Rede de Ecossistemas de Pernambuco (FACEPE) para actuar como Ejecutor en el Squad 03, en un proyecto de unificación para una de las secretarías de Medio Ambiente y Sostenibilidad del estado. <a href=\"https://sites.ufpe.br/parquetec/2025/01/15/ufpe-tem-duas-propostas-aprovadas-no-edital-jornada-repe-da-facepe/\" target=\"_blank\" rel=\"noopener\">Ver la nota de la UFPE sobre la convocatoria</a>",
            "Inmersiones de producto, casos de éxito y resolución de problemas utilizando metodologías ágiles, heurísticas y frameworks de resolución de problemas.",
            "Aplicación de conceptos de innovación y sostenibilidad, como el Lean Canvas, en talleres presenciales en el Porto Digital (Armazém da Criatividade) y en la UFPE Campus Agreste, en Caruaru.",
            "Salí del programa para priorizar la mentoría de dos cohortes de becarios en Daus, sumado al factor de distancia, ya que la mayoría de los encuentros eran presenciales."
          ]
        },
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
          "id": "introduction-to-safe",
          "type": "agile",
          "name": "Introducción al SAFe",
          "provider": "Simplilearn",
          "logo": "assets/images/simplilearn_logo.webp",
          "date": "Jul 2026",
          "credentialUrl": "https://simpli-web.app.link/e/BQljCvpb84b"
        },
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
          "id": "curso-aspireleaders-2025",
          "type": "softskills",
          "name": "2025 Aspire Leaders Program",
          "provider": "Aspire Institute",
          "logo": "assets/images/aspire-institute-logo-large-updated-2048x695.webp",
          "date": "Dec 2025",
          "credentialUrl": "https://engage.aspireleaders.org/share/certificate/did:rcw:bbe75782-e060-4363-8078-a1fade3ab696"
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
          "id": "curso-empreendedorismo-ignite",
          "type": "softskills",
          "name": "Programa de Emprendimiento Ignite",
          "provider": "Wadhwani Foundation",
          "date": "Jul 2025",
          "logo": "assets/images/wadhwani-foundation.webp",
          "credentialUrl": "https://github.com/eversonfilipe/eversonfilipe/blob/d4521ab193c9ce4fdf4b00cb2cfff4276e341e24/certificates-extra/Certificado%20Ignite%20-%20Wadhwani.pdf"
        },
        {
          "id": "curso-skillsbuild-customerengagement",
          "type": "softskills",
          "name": "SkillsBuild - Customer Engagement: Problem Solving and Process Controls",
          "provider": "IBM",
          "logo": "assets/images/ibm-svgrepo-com.svg",
          "date": "Jul 2025",
          "credentialUrl": "https://www.credly.com/badges/a9ac260f-4415-43d0-a2e2-479478acbddd/linked_in_profile"
        },
        {
          "id": "curso-efset-2025",
          "type": "languages",
          "name": "EF SET English Certificate 69/100 (C1 Advanced)",
          "logo": "assets/images/idxeymiMn5_1783788580495.jpeg",
          "provider": "EF Education First",
          "date": "Feb 2025",
          "credentialUrl": "https://cert.efset.org/en/88BaNL"
        },
        {
          "id": "curso-campusb-intercambio-2024",
          "type": "languages",
          "name": "Comunicación Intercultural - Proyecto Internacional",
          "logo": "assets/images/campusb_logo.webp",
          "provider": "Campus B",
          "date": "Oct 2024",
          "credentialUrl": "https://www.brasilopenbadge.com.br/pages/badge/e661e5f36942fe4cdf319e4ecb18d452"
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
          "date": "Mar 2026"
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
        "overline": "AI Engineering, GenAI y Automatización · Python, Django, AWS, REST APIs",
        "name": "<strong>Éverson</strong> Filipe",
        "title": "Analista de Sistemas e Implementación · Agentic AI",
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
      ],
      "endorsements": [
        {
          "id": "rec-li-brenno-carvalho",
          "author": "Brenno Carvalho",
          "role": "Militar | Gestión de Negocios | Recursos Humanos",
          "company": "Marina de Brasil | Alumni Aspire",
          "date": "Oct 2025",
          "linkedTo": ["curso-aspireleaders-2025"],
          "image": "assets/images/print-endorsement-to-everson-1.webp",
          "profileUrl": null,
          "textHtml": "<p>Estuve en el mismo grupo que Éverson en Aspire Leaders 2025. Desde el principio, demostró ser una persona altamente dedicada y resiliente, ayudando y resolviendo diversas dudas de otras personas del grupo. Es una persona humilde, de carácter ejemplar, siempre dispuesta a resolver cualquier problema que pueda surgir.</p>"
        },
        {
          "id": "rec-li-sebastiao-rogerio",
          "author": "Sebastião Rogério, Ph.D.",
          "role": "Analista de Sistemas @FCx Labs | Doctor en Ingeniería de Computación | Investigador en IA y Ciencia de Datos | Profesor",
          "company": "FCx Labs | Ex-Coordenador Educacional @UniFavipWyden",
          "date": "May 2025",
          "linkedTo": ["graduacao-ciencia-computacao-unifavipwyden"],
          "image": "assets/images/print-endorsement-to-everson-2.webp",
          "profileUrl": null,
          "textHtml": "<p>Éverson es un alumno muy dedicado, siempre buscando perfeccionarse. Además, siempre está comprometido con las actividades del curso.</p>"
        },
        {
          "id": "rec-li-fabiola-cavalcanti",
          "author": "Fabíola Cavalcanti",
          "role": "Ingeniera DevOps/DevSecOps | AWS Cloud | IaC (Terraform) | K8s | Más de 20 años de experiencia en Operaciones de Negocio y Retail | AWS Certified",
          "company": "AI/R - UOL | Ex-participante Ideathon AC",
          "date": "Feb 2025",
          "linkedTo": ["ideathon-ac"],
          "image": "assets/images/print-endorsement-to-everson-3.webp",
          "profileUrl": null,
          "textHtml": "<p>Everson Filipe es un líder de producto estratégico y orientado a resultados, con pasión por crear productos excepcionales que los clientes adoran.</p><p>Tuve el placer de trabajar con Everson Filipe en el Ideathon en Armazém de Ideias. Durante ese tiempo, quedé impresionada con su capacidad de:</p><ul><li>Entender las necesidades de los clientes y traducirlas en hojas de ruta de producto claras y concisas.</li><li>Priorizar y gestionar un backlog de producto complejo.</li><li>Colaborar de forma eficaz con equipos multifuncionales, incluyendo ingeniería, diseño y marketing.</li><li>Lanzar productos exitosos que cumplieron o superaron las expectativas de los clientes.</li><li>Analizar datos de producto y usar los insights para tomar decisiones informadas.</li></ul><p>Everson es un líder de producto apasionado y experimentado que siempre está buscando maneras de mejorar sus productos y procesos. Es un miembro de equipo valioso y un mentor para otros gerentes de producto.</p><p>Recomiendo firmemente a Everson para cualquier función de gestión de producto. Es un activo valioso para cualquier equipo.</p>"
        },
        {
          "id": "rec-li-luciana-servulo-da-cunha",
          "author": "Luciana Sérvulo da Cunha",
          "role": "Gerente de Proyectos e Impacto Social | Advocacy, Derechos Humanos e Igualdad de Género | Audiovisual, Storytelling y Comunicación Estratégica",
          "company": "Brasil 247",
          "date": "Feb 2025",
          "linkedTo": [],
          "image": "assets/images/print-endorsement-to-everson-4.webp",
          "profileUrl": null,
          "textHtml": "<p>Entiende de todo sobre tecnología. ¡Lo recomiendo!</p>"
        },
        {
          "id": "rec-li-julia-zultauskas",
          "author": "Julia Zultauskas",
          "role": "Estudiante de Psicología | Practicante de Psicología en el Centro de Reabilitação Neurológica Matheus Alvares | ABA y Estrategias Naturalistas | Psicología Social | 5/10 Psicóloga",
          "company": "Centro de Reabilitação Neurológica Matheus Alvares (Centro de Rehabilitación Neurológica) | Ex-Practicante de RH @TT&T",
          "date": "Jan 2025",
          "linkedTo": ["product-manager-intern-ttet"],
          "image": "assets/images/print-endorsement-to-everson-5.webp",
          "profileUrl": null,
          "textHtml": "<p>Éverson pasó por mí en el proceso de Reclutamiento y Selección y en la capacitación inicial de la empresa, además de habernos cruzado varias veces dentro de la empresa.</p><p>Es una persona esforzada, comunicativa, responsable y muy competente. Siempre va tras las tareas que le son asignadas.</p><p>También es muy fácil trabajar con él y su comunicación es muy clara y asertiva.</p><p>¡Estoy segura de que quien lo tenga en su equipo está en buenas manos!</p>"
        },
        {
          "id": "rec-li-marcos-torres",
          "author": "Marcos Torres",
          "role": "Head de Contraloría y Finanzas Industriales | Contabilidad | Impuestos | Gestión de Costos | FP&A | Business Partner | SAP CO | IFRS | Cosméticos • Farmacéutico • Manufactura",
          "company": "Amend Cosméticos",
          "date": "Jan 2025",
          "linkedTo": [],
          "image": "assets/images/print-endorsement-to-everson-6.webp",
          "profileUrl": null,
          "textHtml": "<p>Tuve la fortuna de contar con el apoyo de Éverson para entender las herramientas de automatización, y la experiencia fue increíble. Tiene una forma única de explicar cosas complejas de manera simple y práctica, lo que marcó toda la diferencia para que yo pudiera adaptarme rápidamente a las nuevas herramientas.</p><p>Además de dominar el tema, Éverson es extremadamente accesible y proactivo. Siempre estuvo dispuesto a ayudar y buscaba soluciones que realmente atendieran nuestras necesidades. Su apoyo fue esencial para entender la dinámica de las herramientas.</p><p>¡Recomiendo a Éverson con los ojos cerrados! Es un profesional competente y comprometido, que se empeña en ver a todos a su alrededor alcanzar resultados.</p>"
        },
        {
          "id": "rec-li-felipe-gp-carvalho",
          "author": "Felipe G. P. Carvalho",
          "role": "Soy un arquitecto de posibilidades: traduzco ideas en soluciones digitales que conectan propósito con desempeño. Ayudo a las empresas a innovar y a transformar procesos en resultados concretos.",
          "company": "Ex-CSO @Daus | CEO @Proveai",
          "date": "Jan 2025",
          "linkedTo": ["daus-agile-product-management-learner"],
          "image": "assets/images/print-endorsement-to-everson-7.webp",
          "profileUrl": null,
          "textHtml": "<p>Éverson es un profesional extraordinario, comprometido, proactivo y dedicado. Su dedicación, rápida capacidad de aprendizaje y claridad al compartir conocimiento son inspiradoras. Tuve el privilegio de presenciar su talento en proyectos y eventos, y no tengo dudas de que tendrá un futuro brillante.</p>"
        },
        {
          "id": "rec-li-thalita-costa",
          "author": "Thalita Costa",
          "role": "Recursos Humanos | Reclutamiento y Selección | Tech Recruiter | Generalista de RR. HH.",
          "company": "Asistente de RH @S4Sys | Ex-Tech Recruiter @TT&T",
          "date": "Jan 2025",
          "linkedTo": ["product-manager-intern-ttet"],
          "image": "assets/images/print-endorsement-to-everson-8.webp",
          "profileUrl": null,
          "textHtml": "<p>Éverson es un profesional súper comprometido y proactivo. En las reuniones y eventos, como el Sponsor Day de la empresa, en los que participé junto a él, pude ver su compromiso y dedicación a los proyectos que realizó. Además de su disposición para compartir conocimiento y explicar procesos de forma detallada. Fue un privilegio haber tenido contacto con un profesional tan competente, aunque fuera de forma breve. 🤗</p>"
        },
        {
          "id": "rec-li-edil-dias",
          "author": "Edil Dias",
          "role": "Co-Fundador, Umans - Agentes Inteligentes | Productos digitales | UX / UI | Automatización | SaaS | Agentic Development",
          "company": "Co-founder @Umans | CEO @Daus",
          "date": "Jan 2025",
          "linkedTo": ["daus-agile-product-management-learner"],
          "image": "assets/images/print-endorsement-to-everson-9.webp",
          "profileUrl": null,
          "textHtml": "<p>Trabajar con Everson en el día a día es gratificante, es una persona completamente comprometida y proactiva. Le gusta aprender y aprende rápido. Ese tipo de persona que sabes que tendrá un futuro brillante.</p>"
        },
        {
          "id": "rec-li-felipe-reis-andrade",
          "author": "Felipe dos Reis de Andrade",
          "role": "Agente de Control de Endemias",
          "company": "Ayuntamiento de Frei Miguelinho",
          "date": "Jan 2025",
          "linkedTo": [],
          "image": "assets/images/print-endorsement-to-everson-10.webp",
          "profileUrl": null,
          "textHtml": "<p>Tuve el privilegio de contar con el apoyo de Éverson Filipe en asuntos relacionados con Sistemas de Información, y su ayuda fue fundamental para el éxito de mi aprendizaje. Éverson Filipe demostró conocimiento técnico, además de mucha paciencia y dedicación al compartir su conocimiento.</p>"
        },
        {
          "id": "rec-li-luis-daniel-infante-pena",
          "author": "Luis Daniel Infante Pena",
          "role": "Gestión de Relaciones | Localización",
          "company": "Gerente de Relaciones @SIL Global | Ex-Asistente de Programas @Campus B",
          "date": "Oct 2024",
          "linkedTo": ["curso-campusb-intercambio-2024"],
          "image": "assets/images/print-endorsement-to-everson-11.webp",
          "profileUrl": null,
          "textHtml": "<p>Tuve el placer de acompañar como Program Assistant a Éverson en el programa de «Comunicación Intercultural» ofrecido por Campus B en alianza con YDUQS. Fue un alumno participativo y proactivo, demostrando gran habilidad para resolver problemas relacionados con el trabajo en equipo, especialmente en un contexto internacional. Su compromiso con la asistencia a las sesiones y su disposición para ayudar a los compañeros fueron notables. Éverson también desarrolló soft skills significativas, como inteligencia intercultural y trabajo en equipo, y demostró fluidez en un segundo idioma.</p>"
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
        },
        {
          "id": "Product Management",
          "label": {
            "en": "Product Management",
            "pt": "Gestão de Produtos",
            "es": "Gestión de Productos"
          }
        },
        {
          "id": "Mentoring",
          "label": {
            "en": "Mentoring",
            "pt": "Mentoria",
            "es": "Mentoring"
          }
        },
        {
          "id": "Product Discovery",
          "label": {
            "en": "Product Discovery",
            "pt": "Descoberta de Produtos",
            "es": "Descubrimiento de Productos"
          }
        },
        {
          "id": "Google Drive",
          "label": {
            "en": "Google Drive",
            "pt": "Google Drive",
            "es": "Google Drive"
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
          "id": "agile",
          "label": {
            "en": "Agile",
            "pt": "Ágil",
            "es": "Agile"
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
