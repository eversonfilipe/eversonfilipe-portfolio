import json
import re
import os

# Relative paths for scalability across any environment (e.g. GitHub Actions or local checkout)
cv_data_path = './assets/js/cv_data.js'
readme_json_path = './docs/data/readme.json'
index_html_path = './index.html'
llms_path = './llms.txt'
api_dir = './api'
docs_data_dir = './docs/data'

print("--- 1. Loading cv_data.js & readme.json ---")
if not os.path.exists(cv_data_path):
    print(f"[ERROR] cv_data.js not found at {cv_data_path}")
    exit(1)

with open(cv_data_path, 'r', encoding='utf-8') as f:
    cv_content = f.read()

start_marker = "window.CV_DATA = "
start_idx = cv_content.find(start_marker)
if start_idx == -1:
    print("[ERROR] Start marker not found in cv_data.js")
    exit(1)

json_start = cv_content.find('{', start_idx)
end_marker = "};\n})();"
end_idx = cv_content.rfind(end_marker)
if end_idx == -1:
    end_marker = "};"
    end_idx = cv_content.rfind(end_marker)

json_str = cv_content[json_start:end_idx+1]
# Strip JS-style block comments to ensure it parses as strict JSON (without breaking URL protocols)
json_str = re.sub(r'/\*.*?\*/', '', json_str, flags=re.DOTALL)
try:
    cv_data = json.loads(json_str)
except Exception as e:
    print(f"[ERROR] Failed to parse JSON from cv_data.js: {e}")
    exit(1)

readme_data = {}
if os.path.exists(readme_json_path):
    try:
        with open(readme_json_path, 'r', encoding='utf-8') as rf:
            readme_data = json.load(rf)
    except Exception as e:
        print(f"[WARNING] Could not parse readme.json: {e}")

# Helper function to strip HTML tags properly
def strip_html(text):
    if not text:
        return ""
    clean = re.sub(r'<[^>]+>', '', text)
    clean = clean.replace('&middot;', '·')
    clean = clean.replace('&amp;', '&')
    clean = clean.replace('&quot;', '"')
    clean = clean.replace('&lt;', '<')
    clean = clean.replace('&gt;', '>')
    return clean

# Helper to get sorting value for dates
def get_end_date_value(date_str):
    if not date_str:
        return 0
    clean = date_str.replace('–', '-').replace('—', '-')
    parts = clean.split('-')
    end_part = (parts[1] if len(parts) > 1 else parts[0]).strip().lower()
    
    if any(word in end_part for word in ['present', 'atual', 'progress', 'curso', 'presente', 'in progress', 'actual', 'en curso']):
        return float('inf')
        
    months = {
        'jan': 1, 'feb': 2, 'mar': 3, 'apr': 4, 'may': 5, 'jun': 6, 'jul': 7, 'aug': 8, 'sep': 9, 'oct': 10, 'nov': 11, 'dec': 12,
        'ene': 1, 'abr': 4, 'mai': 5, 'set': 9, 'dic': 12, 'dez': 12, 'out': 10, 'ago': 8, 'fev': 2
    }
    
    words = end_part.split()
    year = 0
    month = 0
    for w in words:
        if w.isdigit() and len(w) == 4:
            year = int(w)
        else:
            prefix = w[:3]
            if prefix in months:
                month = months[prefix]
    return year * 100 + month

# --- 2. Build RAG Static JSON Endpoint ---
print("--- 2. Exporting Static RAG JSON Endpoints ---")
rag_data = {
    "_meta": {
        "title": "Everson Filipe — Developer Portfolio & RAG Dataset",
        "author": "Everson Filipe (Éverson Filipe)",
        "canonical": "https://eversonfilipe-portfolio.netlify.app/",
        "description": "Structured JSON database for Retrieval-Augmented Generation (RAG) and LLM consumption detailing Everson Filipe's software engineering experience, projects, skills, education, and achievements.",
        "lastUpdated": "2026-07-29"
    },
    "cvData": cv_data,
    "githubReadme": readme_data
}

os.makedirs(api_dir, exist_ok=True)
os.makedirs(docs_data_dir, exist_ok=True)

api_json_path = os.path.join(api_dir, 'portfolio-data.json')
docs_json_path = os.path.join(docs_data_dir, 'portfolio-data.json')

with open(api_json_path, 'w', encoding='utf-8') as f:
    json.dump(rag_data, f, ensure_ascii=False, indent=2)
with open(docs_json_path, 'w', encoding='utf-8') as f:
    json.dump(rag_data, f, ensure_ascii=False, indent=2)
print("[OK] Generated api/portfolio-data.json and docs/data/portfolio-data.json")

# Compile the clean text summary of Everson's CV
noscript_cv_markdown = ""
for lang in ["en", "pt", "es"]:
    lang_markdown = ""
    hero = cv_data[lang]["hero"]
    lang_markdown += f"# {strip_html(hero['name'])}\n"
    lang_markdown += f"{strip_html(hero['title'])} | {strip_html(hero['tagline'])}\n\n"
    
    about = cv_data[lang]["about"]
    lang_markdown += f"## About\n{strip_html(about['p1'])}\n{strip_html(about['p2'])}\n{strip_html(about['p3'])}\n\n"
    
    lang_markdown += "### Core Stack\n"
    skills_names = [s["name"] if isinstance(s, dict) else s for s in about["skills"]]
    lang_markdown += ", ".join(skills_names) + "\n\n"

    # --- Projects Section (SEO/LLMO main focus) ---
    lang_markdown += "## Main Projects\n"
    if "projects" in cv_data[lang] and cv_data[lang]["projects"]:
        cv_data[lang]["projects"].sort(key=lambda x: get_end_date_value(x.get("date")), reverse=True)
        for proj in cv_data[lang]["projects"]:
            status_label = "In Progress" if proj.get("status") == "in-progress" else "Completed"
            lang_markdown += f"### {strip_html(proj['title'])} ({strip_html(proj['date'])}) [{status_label}]\n"
            lang_markdown += f"  Category: {strip_html(proj.get('category', ''))}\n"
            if proj.get("stack"):
                lang_markdown += f"  Stack: {', '.join(proj['stack'])}\n"
            if proj.get("linkedTo"):
                lang_markdown += f"  Linked to: {', '.join(proj['linkedTo'])}\n"
            if proj.get("repoUrl"):
                lang_markdown += f"  Repository: {proj['repoUrl']}\n"
            lang_markdown += f"  Description:\n  {strip_html(proj.get('descriptionHtml', ''))}\n\n"
    else:
        lang_markdown += "Under Construction\n\n"
    
    lang_markdown += "## Experience\n"
    for job in cv_data[lang]["experience"]:
        lang_markdown += f"### {strip_html(job['role'])} at {strip_html(job['company'])} ({strip_html(job['date'])})\n"
        for bullet in job["bullets"]:
            lang_markdown += f"- {strip_html(bullet)}\n"
        if "specificAchievements" in job and job["specificAchievements"]:
            lang_markdown += "Conquistas/Achievements:\n"
            for ach in job["specificAchievements"]:
                lang_markdown += f"  * [{strip_html(ach['tag'])}] {strip_html(ach['description'])}\n"
        lang_markdown += "\n"
        
    lang_markdown += "## Education\n"
    cv_data[lang]["education"].sort(key=lambda x: get_end_date_value(x.get("date")), reverse=True)
    for edu in cv_data[lang]["education"]:
        lang_markdown += f"### {strip_html(edu['degree'])} - {strip_html(edu['institution'])} ({strip_html(edu['date'])}) [{strip_html(edu['type'])}]\n"
        if "highlights" in edu and edu["highlights"]:
            lang_markdown += "  Highlights: " + ", ".join(edu["highlights"]) + "\n"
        lang_markdown += "\n"
        
    lang_markdown += "## Courses\n"
    cv_data[lang]["courses"].sort(key=lambda x: get_end_date_value(x.get("date")), reverse=True)
    for course in cv_data[lang]["courses"]:
        lang_markdown += f"- {strip_html(course['name'])} ({strip_html(course['provider'])}, {strip_html(course['date'])})\n"
    lang_markdown += "\n"

    lang_markdown += "## Publications\n"
    if "publications" in cv_data[lang]:
        cv_data[lang]["publications"].sort(key=lambda x: get_end_date_value(x.get("date")), reverse=True)
        for pub in cv_data[lang]["publications"]:
            lang_markdown += f"- {strip_html(pub['name'])} ({strip_html(pub['institution'])}, {strip_html(pub['date'])})\n"
    lang_markdown += "\n"
    
    lang_markdown += "## Volunteering\n"
    for vol in cv_data[lang]["volunteering"]:
        lang_markdown += f"### {strip_html(vol['role'])} at {strip_html(vol['org'])} ({strip_html(vol['date'])})\n"
        if "highlights" in vol and vol["highlights"]:
            lang_markdown += "  Highlights: " + ", ".join(vol["highlights"]) + "\n"
        lang_markdown += "\n"
        
    lang_markdown += "## Hackathons\n"
    for hack in cv_data[lang]["hackathons"]:
        lang_markdown += f"- {strip_html(hack['name'])} ({strip_html(hack['meta'])}, {strip_html(hack['date'])})\n"
    lang_markdown += "\n"
    
    lang_markdown += "## Events\n"
    for ev in cv_data[lang]["events"]:
        lang_markdown += f"- {strip_html(ev['name'])} - Role: {strip_html(ev['role'])} ({strip_html(ev['meta'])}, {strip_html(ev['date'])})\n"
    lang_markdown += "\n"

    # Save individual language resume markdown
    lang_markdown = lang_markdown.replace('–', '-').replace('—', '-')
    resume_path = os.path.join(docs_data_dir, f"resume-{lang}.md")
    with open(resume_path, "w", encoding="utf-8") as rf:
        rf.write(lang_markdown)

    # Accumulate into noscript
    noscript_cv_markdown += f"## LANGUAGE: {lang.upper()}\n\n" + lang_markdown + "\n\n"

noscript_cv_markdown = noscript_cv_markdown.replace('–', '-').replace('—', '-')

print("--- 3. Updating index.html noscript block & Schema.org JSON-LD ---")
if os.path.exists(index_html_path):
    with open(index_html_path, 'r', encoding='utf-8') as f:
        html_content = f.read()

    # Update noscript block
    noscript_start = html_content.find("  <noscript>")
    noscript_end = html_content.find("  </noscript>") + len("  </noscript>")

    if noscript_start != -1 and noscript_end != -1:
        new_noscript_block = f"""  <noscript>
    <div style="padding: 20px; background: #374f5b; color: #ffffff;">
      <p>This page requires JavaScript to render the interactive portfolio. Here is the text summary for screen readers and search crawlers:</p>
      {noscript_cv_markdown}
    </div>
  </noscript>"""
        html_content = html_content[:noscript_start] + new_noscript_block + html_content[noscript_end:]
        print("[OK] Updated index.html noscript block.")

    # Update JSON-LD schema with ProfilePage + Person graph
    json_ld_schema = [
        {
            "@context": "https://schema.org",
            "@type": "ProfilePage",
            "@id": "https://eversonfilipe-portfolio.netlify.app/#profilepage",
            "url": "https://eversonfilipe-portfolio.netlify.app/",
            "name": "Everson Filipe | Systems Implementation & AI Professional",
            "description": "Official interactive developer portfolio of Éverson Filipe (Everson Filipe) — Systems Implementation Intern, DevOps & AI Automation Professional.",
            "inLanguage": ["en", "pt", "es"],
            "mainEntity": {
                "@id": "https://eversonfilipe-portfolio.netlify.app/#person"
            }
        },
        {
            "@context": "https://schema.org",
            "@type": "Person",
            "@id": "https://eversonfilipe-portfolio.netlify.app/#person",
            "name": "Everson Filipe",
            "alternateName": [
                "Éverson Filipe",
                "Everson Filipe Silva",
                "Éverson Filipe Silva",
                "eversonfilipe"
            ],
            "jobTitle": "Systems Implementation Intern",
            "description": "Systems Implementation Intern and AI Automation Developer specialized in B2B SaaS onboarding pipelines, Python ETL workflows, JSONLogic rule engines, and AWS cloud orchestration. Currently at Kartado.",
            "url": "https://eversonfilipe-portfolio.netlify.app/",
            "image": "https://eversonfilipe-portfolio.netlify.app/assets/images/profile.png",
            "email": "mailto:eversonfilipe124@gmail.com",
            "nationality": "Brazilian",
            "knowsLanguage": ["en", "pt", "es"],
            "sameAs": [
                "https://github.com/eversonfilipe",
                "https://www.linkedin.com/in/eversonfilipe-agile-products-ai/",
                "https://eversonfilipe.medium.com/"
            ],
            "knowsAbout": [
                "Systems Implementation",
                "Implementation Engineering",
                "DevOps",
                "AI Engineering",
                "Python",
                "Django Admin",
                "JSONLogic",
                "AWS Step Functions",
                "Amazon S3",
                "Amazon Athena",
                "REST API Validation",
                "ETL Automation",
                "GIS Spatial Data",
                "Agile Product Management",
                "Scrum & Kanban",
                "Scaled Agile Framework (SAFe)"
            ],
            "alumniOf": {
                "@type": "EducationalOrganization",
                "name": "UniFavip Wyden",
                "url": "https://www.unifavip.edu.br/"
            },
            "worksFor": {
                "@type": "Organization",
                "name": "Kartado"
            },
            "hasOccupation": {
                "@type": "Occupation",
                "name": "Systems Implementation Intern",
                "occupationLocation": {
                    "@type": "Country",
                    "name": "Brazil"
                },
                "skills": "Python, Django Admin, JSONLogic, AWS, REST API, ETL, GIS, SAFe"
            }
        },
        {
            "@context": "https://schema.org",
            "@type": "WebSite",
            "@id": "https://eversonfilipe-portfolio.netlify.app/#website",
            "name": "Everson Filipe — Developer Portfolio",
            "url": "https://eversonfilipe-portfolio.netlify.app/",
            "description": "Interactive multilingual portfolio of Everson Filipe — Systems Implementation Intern, DevOps & AI Automation professional.",
            "inLanguage": ["en", "pt", "es"],
            "publisher": {
                "@id": "https://eversonfilipe-portfolio.netlify.app/#person"
            }
        }
    ]

    json_ld_str = json.dumps(json_ld_schema, ensure_ascii=False, indent=2)
    ld_start = html_content.find('<script type="application/ld+json">')
    ld_end = html_content.find('</script>', ld_start)

    if ld_start != -1 and ld_end != -1:
        new_ld_block = f'<script type="application/ld+json">\n{json_ld_str}\n  </script>'
        html_content = html_content[:ld_start] + new_ld_block + html_content[ld_end + len('</script>'):]
        print("[OK] Updated index.html JSON-LD Schema.org block.")

    with open(index_html_path, 'w', encoding='utf-8') as f:
        f.write(html_content)

print("--- 4. Updating llms.txt ---")
# Create clean text version of the CV for AI Agents following the Jeremy Howard spec
llms_txt_content = """# Everson Filipe

> Éverson Filipe (Everson Filipe) is a Systems Implementation Intern and AI Automation Developer specialized in B2B SaaS onboarding pipelines, Python ETL workflows, and AWS cloud orchestration. Key technical milestones at Kartado include designing a JSONLogic rule engine for dynamic forms across 42+ highway concession environments (reducing client parameters setup from 3 days to <4 hours), building Python-Django automation scripts replacing legacy spreadsheet processes (driving 32% team output capacity), and developing custom dataset schema validation notebooks that reduced parameterization analysis times by 40% with zero production syntax incidents. Proficient in Python, Django Admin, JSONLogic, AWS (Step Functions, Athena, S3, IAM, EC2), REST APIs/JWT, GIS spatial maps, and Agile Scrum methodologies.

This website provides an interactive multi-language developer portfolio. Below is a curated index of resources, structured resumes, RAG endpoints, and data schemas optimized for LLMs, AI agents, and search engines.

**Core RAG Endpoints & Machine-Readable Data (JSON)**
- [RAG API Endpoint (JSON)](https://eversonfilipe-portfolio.netlify.app/api/portfolio-data.json): Primary Machine-Readable static JSON endpoint containing the complete structured records of Everson Filipe for Retrieval-Augmented Generation (RAG) and AI agent tool consumption.
- [Docs Portfolio Dataset (JSON)](https://eversonfilipe-portfolio.netlify.app/docs/data/portfolio-data.json): Alternate static endpoint for structured JSON extraction.
- [Curriculum JSON Data](https://github.com/eversonfilipe/eversonfilipe-portfolio/blob/main/assets/js/cv_data.js): Vivo, dynamic JavaScript database file containing raw, complete JSON records.

**Core Technical Projects**
- *AI Automation - B2B Onboarding Pipeline (Kartado)*: Designed and parameterised a JSONLogic-driven rule engine for B2B SaaS onboarding, reducing client configuration time from 3 days to under 4 hours for 42+ clients. Orchestrated via AWS Step Functions with S3 storage and a Django Admin management UI.

**Core Professional Experiences**
- *Systems Implementation Intern at Kartado (Sep 2025 - Present)*: Configures JSONLogic form rules, implements Python ETL migration scripts, extracts dataset metadata, validates GIS spatial shapefiles, and manages REST/JWT API testing (Pytest), achieving a 40% reduction in parameterization analysis time.
- *Agile Product Manager Learner at Daus (Dec 2024 - Jun 2025)*: Directed product discovery and requirement documentation (Jira, Confluence) using Scrum/Kanban, and successfully mentored 2 intern cohorts in MVP delivery.

**Education & Certifications**
- *Computer Science (B.S.) at UniFavip Wyden (Feb 2024 - In Progress)*: GPA 9.2/10, focused on OOP and algorithms.
- *Introduction to SAFe (Simplilearn, Jul 2026)*: Scaled Agile Framework certification.
- *Artificial Intelligence Mentorship (Lab.AI / Instituto Joule, Sep 2025)*: Applied AI readiness and career mentorship.
- *EF SET English Certificate*: C1 Advanced score of 69/100 (March 2025).

**Core Volunteering & Community**
- *Co-organizer at Google Developers Group (GDG Barueri, Aug 2025 - Present)*: Technical community organizing and meetups.
- *Ambassador & Facilitator at Politize! (May 2025 - Present)*: Civic education and public leadership workshops.

## Profiles & Contacts

- [GitHub Profile](https://github.com/eversonfilipe): Open-source repositories, automation scripts, and DevOps configurations.
- [LinkedIn Profile](https://www.linkedin.com/in/eversonfilipe-agile-products-ai/): Professional trajectory, career updates, and industry network.
- [Medium Blog](https://eversonfilipe.medium.com/): Articles on technical implementation, scaling SaaS configs, and JSONLogic.
- [Email Address](mailto:eversonfilipe124@gmail.com): Direct contact for project opportunities.

## Resumes & Core Data (Markdown)

Detailed professional backgrounds, projects, publications, education, and volunteering structured in plain Markdown for language models.

- [English Resume (EN)](https://eversonfilipe-portfolio.netlify.app/docs/data/resume-en.md): Complete curriculum, experiences, projects, stack, and education in English.
- [Portuguese Resume (PT)](https://eversonfilipe-portfolio.netlify.app/docs/data/resume-pt.md): Currículo completo, experiências, projetos e educação em português.
- [Spanish Resume (ES)](https://eversonfilipe-portfolio.netlify.app/docs/data/resume-es.md): Currículum completo, experiencia, proyectos y educación en español.

## Technical Publications

Articles and essays sharing insights on parameterization, automation engineering, and career metrics.

- [The Fallacy of Plural MVP in GovTech](https://medium.com/design-bootcamp/the-fallacy-of-plural-mvp-in-govtech-why-unrelenting-focus-is-the-only-real-metric-of-success-64329bbfe4ec?sharedUserId=eversonfilipe): Analysis on why unrelenting focus is the core metric of success for GovTech MVPs.
- [From Problem to Solution: Value-Driven Products](https://eversonfilipe.medium.com/from-problem-to-solution-a-framework-for-building-value-driven-products-c6e5d564d111?sharedUserId=eversonfilipe): Product discovery framework focusing on problem definition and value execution.
- [Gestão Ágil Simplificada (PT)](https://www.linkedin.com/pulse/gest%C3%A3o-%C3%A1gil-simplificada-%C3%A9verson-filipe-zgdoe): Simplified methodologies for agile team operations and project management.
"""

llms_txt_content = llms_txt_content.replace('–', '-').replace('—', '-')

with open(llms_path, 'w', encoding='utf-8') as f:
    f.write(llms_txt_content)
print("[OK] Overwritten llms.txt with correct RAG index formatting.")
