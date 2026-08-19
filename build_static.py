import json
import re
import os
import sys
import subprocess
import argparse
from datetime import datetime

# CLI Argument Parser for location overrides, interactive prompts, and custom config
parser = argparse.ArgumentParser(description="Portfolio SSG & SEO/LLMO Audit Pipeline")
parser.add_argument("--interactive", action="store_true", help="Interactively prompt in terminal for missing external URLs")
parser.add_argument("--city", default=os.getenv("LOCATION_CITY", "Catende"), help="Custom city for location schema (default: Caruaru)")
parser.add_argument("--region", default=os.getenv("LOCATION_REGION", "PE"), help="Custom state/region for location schema (default: PE)")
parser.add_argument("--country", default=os.getenv("LOCATION_COUNTRY", "BR"), help="Custom country for location schema (default: BR)")
parser.add_argument("--config-urls", default="./docs/data/urls.json", help="Path to custom JSON file for external URL mappings")
args, _ = parser.parse_known_args()

# Relative paths for scalability across any environment (e.g. GitHub Actions or local checkout)
cv_data_path = './assets/js/cv_data.js'
blog_data_path = './assets/js/blog_data.js'
readme_json_path = './docs/data/readme.json'
index_html_path = './index.html'
llms_path = './llms.txt'
api_dir = './api'
docs_data_dir = './docs/data'
okf_dir = './okf'
today_str = datetime.now().strftime("%Y-%m-%d")

# Load custom URL mappings if config file exists
external_urls_map = {}
if os.path.exists(args.config_urls):
    try:
        with open(args.config_urls, 'r', encoding='utf-8') as uf:
            external_urls_map = json.load(uf)
            print(f"[OK] Loaded external URL config from {args.config_urls}")
    except Exception as e:
        print(f"[WARNING] Could not parse {args.config_urls}: {e}")

def resolve_org_url(org_name):
    if not org_name:
        return None
    key = strip_html(org_name).lower().strip()
    if key in external_urls_map and external_urls_map[key]:
        return external_urls_map[key]
    
    # Standard default fallback mapping
    defaults = {
        "kartado": "https://kartado.com.br",
        "daus": "https://daus.com.br",
        "unifavip wyden": "https://www.wyden.com.br/unifavip",
        "google developers group (gdg barueri)": "https://gdg.community.dev/gdg-barueri/",
        "politize! (politize! caruaru)": "https://www.politize.com.br/",
        "aiesec (aiesec no mackenzie)": "https://aiesec.org.br/",
        "vai na web": "https://vainaweb.com.br/"
    }
    for d_key, d_val in defaults.items():
        if d_key in key or key in d_key:
            return d_val
            
    # If interactive mode enabled and running in tty terminal, prompt user
    if args.interactive and sys.stdin.isatty():
        try:
            val = input(f"-> Enter external URL for '{org_name}' (press Enter to skip): ").strip()
            if val:
                external_urls_map[key] = val
                return val
        except Exception:
            pass
    return None

print("--- 1. Loading cv_data.js, blog_data.js & readme.json ---")
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

# Load blog_data.js via node execution
blog_data = []
if os.path.exists(blog_data_path):
    try:
        cmd = ["node", "-e", "global.window=global; require('./assets/js/blog_data.js'); console.log(JSON.stringify(window.BLOG_DATA));"]
        res = subprocess.run(cmd, capture_output=True, text=True, encoding='utf-8', check=True)
        if res.stdout:
            blog_data = json.loads(res.stdout.strip())
            print(f"[OK] Successfully loaded {len(blog_data)} blog post(s) from blog_data.js")
    except Exception as e:
        print(f"[WARNING] Could not parse blog_data.js via node: {e}")

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
    if isinstance(text, dict):
        tag = text.get("tag", "")
        desc = text.get("description", text.get("text", text.get("title", text.get("name", str(text)))))
        if tag:
            text = f"[{tag}] {desc}"
        else:
            text = desc
    elif not isinstance(text, str):
        text = str(text)
    clean = re.sub(r'<[^>]+>', '', text)
    clean = clean.replace('&middot;', '·')
    clean = clean.replace('&amp;', '&')
    clean = clean.replace('&quot;', '"')
    clean = clean.replace('&lt;', '<')
    clean = clean.replace('&gt;', '>')
    return clean

# ISO 8601 Date Parser Helper
ISO_MONTH_MAP = {
    'jan': '01', 'feb': '02', 'fev': '02', 'mar': '03', 'apr': '04', 'abr': '04',
    'may': '05', 'mai': '05', 'jun': '06', 'jul': '07', 'aug': '08', 'ago': '08',
    'sep': '09', 'set': '09', 'oct': '10', 'out': '10', 'nov': '11', 'dec': '12', 'dez': '12'
}

def to_iso8601_single(val):
    if not val:
        return ""
    v = str(val).strip()
    if re.match(r'^\d{4}-\d{2}(-\d{2})?$', v):
        return v
    if re.match(r'^\d{4}$', v):
        return v
    m = re.search(r'([A-Za-z]{3,9})\.?\s+(\d{4})', v)
    if m:
        mon_str = m.group(1).lower()[:3]
        year_str = m.group(2)
        month_num = ISO_MONTH_MAP.get(mon_str, "01")
        return f"{year_str}-{month_num}"
    y = re.search(r'\b(20\d{2}|19\d{2})\b', v)
    if y:
        return y.group(1)
    return v

def to_iso8601_range(period_str):
    if not period_str:
        return ("", None)
    s = str(period_str).strip()
    parts = re.split(r'\s*(?:–|—|-|\bto\b|\bate\b)\s*', s, maxsplit=1)
    start_raw = parts[0] if len(parts) > 0 else ""
    end_raw = parts[1] if len(parts) > 1 else ""
    
    start_iso = to_iso8601_single(start_raw)
    end_iso = None
    
    if end_raw:
        end_clean = end_raw.lower()
        if any(w in end_clean for w in ['present', 'presente', 'atual', 'actual', 'now', 'hoje']):
            end_iso = None  # Omit endDate for current role
        else:
            end_iso = to_iso8601_single(end_raw)
    elif any(w in s.lower() for w in ['present', 'presente', 'atual', 'actual']):
        end_iso = None
        
    return (start_iso, end_iso)

def get_occupational_category(role_title):
    t = str(role_title).lower()
    if any(w in t for w in ['implementation', 'systems', 'devops', 'automation', 'etl', 'integration', 'analyst']):
        return "15-1211.00 Computer Systems Analysts"
    if any(w in t for w in ['product', 'agile', 'scrum', 'project', 'management']):
        return "15-1299.09 Information Technology Project Managers"
    if any(w in t for w in ['software', 'developer', 'engineer']):
        return "15-1252.00 Software Developers"
    return "15-1252.00 Software Developers"

# Helper to get sorting value for dates
def get_end_date_value(date_str):
    if not date_str:
        return 0
    clean = str(date_str).replace('–', '-').replace('—', '-')
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
        "description": "Structured JSON database for Retrieval-Augmented Generation (RAG) and LLM consumption detailing Everson Filipe's software engineering experience, projects, skills, education, blog articles, and achievements.",
        "lastUpdated": "2026-08-01"
    },
    "cvData": cv_data,
    "blogData": blog_data,
    "githubReadme": readme_data
}

os.makedirs(api_dir, exist_ok=True)
os.makedirs(docs_data_dir, exist_ok=True)
os.makedirs(okf_dir, exist_ok=True)

api_json_path = os.path.join(api_dir, 'portfolio-data.json')
docs_json_path = os.path.join(docs_data_dir, 'portfolio-data.json')

with open(api_json_path, 'w', encoding='utf-8') as f:
    json.dump(rag_data, f, ensure_ascii=False, indent=2)
with open(docs_json_path, 'w', encoding='utf-8') as f:
    json.dump(rag_data, f, ensure_ascii=False, indent=2)
print("[OK] Generated api/portfolio-data.json and docs/data/portfolio-data.json")

# --- 2b. Generate Open Knowledge Format (OKF) Bundle ---
print("--- 2b. Exporting Open Knowledge Format (OKF v0.1) Bundle ---")

hero_en = cv_data.get('en', {}).get('hero', {})
about_en = cv_data.get('en', {}).get('about', {})
exp_en = cv_data.get('en', {}).get('experience', [])
projects_en = cv_data.get('en', {}).get('projects', [])

author_name = strip_html(hero_en.get('name', 'Everson Filipe'))
author_title = strip_html(hero_en.get('title', ''))
author_tagline = strip_html(hero_en.get('tagline', ''))

# 1. okf/manifest.json
okf_manifest = {
    "specVersion": "0.1.0",
    "title": f"{author_name} — Knowledge Bundle & Developer Profile",
    "author": author_name,
    "updated": "2026-08-01",
    "canonicalUrl": "https://eversonfilipe-portfolio.netlify.app/",
    "description": f"{author_title} | {author_tagline}",
    "modules": [
        { "id": "profile", "path": "profile.md", "title": "Profile & Technical Background" },
        { "id": "experience", "path": "experience.md", "title": "Professional Trajectory & Impact" },
        { "id": "projects", "path": "projects.md", "title": "Technical Projects & Applications" },
        { "id": "blog", "path": "blog.md", "title": "Multilingual Technical Blog Articles" }
    ]
}
with open(os.path.join(okf_dir, 'manifest.json'), 'w', encoding='utf-8') as f:
    json.dump(okf_manifest, f, ensure_ascii=False, indent=2)

# 2. okf/profile.md
skills_list = [s['name'] if isinstance(s, dict) else s for s in about_en.get('skills', [])]
skills_str = ", ".join(skills_list)
edu_en = cv_data.get('en', {}).get('education', [])
courses_en = cv_data.get('en', {}).get('courses', [])
pubs_en = cv_data.get('en', {}).get('publications', [])

okf_profile = f"""---
id: profile
title: {author_name} — {author_title}
author: {author_name}
tagline: {author_tagline}
canonical: https://eversonfilipe-portfolio.netlify.app/
languages: [en, pt, es]
---

# Profile & Technical Summary

## {author_name}
**{author_title}**
*{author_tagline}*

### About & Professional Summary
{strip_html(about_en.get('p1', ''))}

{strip_html(about_en.get('p2', ''))}

{strip_html(about_en.get('p3', ''))}

### Core Technical Stack & Skills
{skills_str}

### Academic Background & Formal Education
"""
for edu in edu_en:
    degree = strip_html(edu.get('degree', ''))
    inst = strip_html(edu.get('institution', ''))
    date = strip_html(edu.get('date', edu.get('period', '')))
    okf_profile += f"#### {degree} — {inst} ({date})\n"
    highlights = edu.get('highlights', [])
    for h in highlights:
        okf_profile += f"- {strip_html(h)}\n"
    okf_profile += "\n"

if courses_en:
    okf_profile += "### Certifications & Specialized Courses\n"
    for course in courses_en:
        c_title = strip_html(course.get('name', course.get('title', '')))
        c_inst = strip_html(course.get('provider', course.get('institution', '')))
        c_date = strip_html(course.get('date', ''))
        if c_title:
            if c_inst:
                okf_profile += f"- **{c_title}**, {c_inst} ({c_date})\n"
            else:
                okf_profile += f"- **{c_title}** ({c_date})\n"
    okf_profile += "\n"

if pubs_en:
    okf_profile += "### Articles & Technical Publications\n"
    for pub in pubs_en:
        p_title = strip_html(pub.get('name', pub.get('title', '')))
        p_pub = strip_html(pub.get('institution', pub.get('publisher', '')))
        p_date = strip_html(pub.get('date', ''))
        p_url = pub.get('url', pub.get('link', ''))
        p_desc = strip_html(pub.get('descriptionHtml', pub.get('description', '')))
        
        if p_title:
            okf_profile += f"#### {p_title} ({p_date})\n"
            if p_pub:
                okf_profile += f"- **Publisher/Platform**: {p_pub}\n"
            if p_url:
                okf_profile += f"- **URL**: {p_url}\n"
            if p_desc:
                okf_profile += f"- **Summary**: {p_desc}\n"
            okf_profile += "\n"

with open(os.path.join(okf_dir, 'profile.md'), 'w', encoding='utf-8') as f:
    f.write(okf_profile)

# Helper function to extract Tech Stack and Methodologies from experience entries
def extract_stack_and_methodologies(exp):
    tech_stack = None
    methodologies = None
    bullets = exp.get('bullets', [])
    for b in bullets:
        b_clean = strip_html(b).strip()
        if 'tech stack:' in b_clean.lower():
            tech_stack = re.sub(r'(?i)tech stack:\s*', '', b_clean).rstrip('.')
        elif 'methodologies:' in b_clean.lower() or 'methodology:' in b_clean.lower():
            methodologies = re.sub(r'(?i)methodologies:\s*|methodology:\s*', '', b_clean).rstrip('.')
            
    if not tech_stack and exp.get('tags'):
        tech_stack = ", ".join(exp.get('tags'))
        
    return tech_stack, methodologies

# 3. okf/experience.md
okf_exp = f"""---
id: experience
title: Professional Trajectory & Experience
author: {author_name}
---

# Professional Trajectory & Experience

"""
for exp in exp_en:
    role = strip_html(exp.get('role', ''))
    company = strip_html(exp.get('company', ''))
    date = strip_html(exp.get('date', ''))
    about_comp = strip_html(exp.get('optional_more_about_company', ''))
    desc = strip_html(exp.get('descriptionHtml', exp.get('description', '')))
    
    okf_exp += f"## {role} at {company} ({date})\n"
    if about_comp:
        okf_exp += f"### About {company}:\n{about_comp}\n\n"
    if desc:
        okf_exp += f"{desc}\n\n"
        
    achievements = exp.get('specificAchievements', [])
    if achievements:
        okf_exp += "### Key Achievements:\n"
        for ach in achievements:
            okf_exp += f"- {strip_html(ach)}\n"
        okf_exp += "\n"
        
    t_stack, m_eth = extract_stack_and_methodologies(exp)
    if t_stack or m_eth:
        okf_exp += "### Technical Stack & Methodologies:\n"
        if t_stack:
            okf_exp += f"- [Tech Stack] {t_stack}\n"
        if m_eth:
            okf_exp += f"- [Methodologies] {m_eth}\n"
        okf_exp += "\n"

endorsements_en = cv_data.get('en', {}).get('endorsements', [])
if endorsements_en:
    okf_exp += "## Peer Endorsements & Recommendations\n\n"
    for end in endorsements_en:
        e_role = strip_html(end.get('role', ''))
        e_comp = strip_html(end.get('company', ''))
        e_auth = strip_html(end.get('author', ''))
        e_date = strip_html(end.get('date', ''))
        e_text = strip_html(end.get('textHtml', '')).strip()
        okf_exp += f"### {e_role} — {e_comp} ({e_date})\n"
        okf_exp += f"**Recommender/Validator**: {e_auth}\n\n"
        okf_exp += f"> {e_text}\n\n"

with open(os.path.join(okf_dir, 'experience.md'), 'w', encoding='utf-8') as f:
    f.write(okf_exp)

# 4. okf/projects.md
achievements_en = cv_data.get('en', {}).get('achievements', [])
hackathons_en = cv_data.get('en', {}).get('hackathons', [])
events_en = cv_data.get('en', {}).get('events', [])
volunteering_en = cv_data.get('en', {}).get('volunteering', [])

okf_proj = f"""---
id: projects
title: Key Technical Projects, Hackathons, Events & Community Leadership
author: {author_name}
---

# Technical Projects, Hackathons & Community Systems

"""
if projects_en:
    okf_proj += "## Technical Projects\n\n"
    for proj in projects_en:
        p_title = strip_html(proj.get('title', ''))
        p_date = strip_html(proj.get('date', ''))
        p_status = "In Progress" if proj.get('status') == 'in-progress' else "Completed"
        p_cat = strip_html(proj.get('category', ''))
        p_stack = ", ".join(proj.get('stack', []))
        p_repo = proj.get('repoUrl', 'https://github.com/eversonfilipe/eversonfilipe-portfolio')
        p_desc = strip_html(proj.get('descriptionHtml', proj.get('description', '')))
        
        okf_proj += f"### {p_title} ({p_date}) [{p_status}]\n"
        if p_cat:
            okf_proj += f"- **Category**: {p_cat}\n"
        if p_stack:
            okf_proj += f"- **Stack**: {p_stack}\n"
        if p_repo:
            okf_proj += f"- **Repository**: {p_repo}\n"
        if p_desc:
            okf_proj += f"- **Description**: {p_desc}\n"
        okf_proj += "\n"

if achievements_en:
    okf_proj += "## Key Technical Achievements & Recognition\n\n"
    for ach in achievements_en:
        ach_title = strip_html(ach.get('title', ach.get('name', '')))
        ach_date = strip_html(ach.get('date', ach.get('period', '')))
        ach_desc = strip_html(ach.get('descriptionHtml', ach.get('description', '')))
        okf_proj += f"### {ach_title} ({ach_date})\n"
        if ach_desc:
            okf_proj += f"{ach_desc}\n\n"

if hackathons_en:
    okf_proj += "## Hackathons & Technical Competitions\n\n"
    for hack in hackathons_en:
        h_title = strip_html(hack.get('title', hack.get('name', '')))
        h_date = strip_html(hack.get('date', hack.get('period', '')))
        h_role = strip_html(hack.get('role', ''))
        h_desc = strip_html(hack.get('descriptionHtml', hack.get('description', '')))
        okf_proj += f"### {h_title} ({h_date})\n"
        if h_role:
            okf_proj += f"- **Role**: {h_role}\n"
        if h_desc:
            okf_proj += f"- **Summary**: {h_desc}\n"
        okf_proj += "\n"

if events_en:
    okf_proj += "## Tech Events & Industry Conferences\n\n"
    for evt in events_en:
        e_name = strip_html(evt.get('name', evt.get('title', '')))
        e_date = strip_html(evt.get('date', evt.get('period', '')))
        e_role = strip_html(evt.get('role', ''))
        e_desc = strip_html(evt.get('descriptionHtml', evt.get('description', '')))
        okf_proj += f"### {e_name} ({e_date})\n"
        if e_role:
            okf_proj += f"- **Role**: {e_role}\n"
        if e_desc:
            okf_proj += f"- **Summary**: {e_desc}\n"
        okf_proj += "\n"

if volunteering_en:
    okf_proj += "## Volunteering & Community Leadership\n\n"
    for vol in volunteering_en:
        v_role = strip_html(vol.get('role', ''))
        v_org = strip_html(vol.get('org', vol.get('organization', '')))
        v_date = strip_html(vol.get('date', vol.get('period', '')))
        v_desc = strip_html(vol.get('descriptionHtml', vol.get('description', '')))
        if v_org:
            okf_proj += f"### {v_role} at {v_org} ({v_date})\n"
        else:
            okf_proj += f"### {v_role} ({v_date})\n"
        if v_desc:
            okf_proj += f"{v_desc}\n\n"

with open(os.path.join(okf_dir, 'projects.md'), 'w', encoding='utf-8') as f:
    f.write(okf_proj)

# 5. okf/blog.md
okf_blog = f"""---
id: blog
title: Multilingual Technical Blog Articles
author: {author_name}
---

# Technical Blog Articles

"""
for post in blog_data:
    p_id = post.get('id', '')
    p_date = post.get('publishedAt', '')
    en_loc = post.get('en', {})
    pt_loc = post.get('pt', {})
    es_loc = post.get('es', {})
    
    okf_blog += f"## {strip_html(en_loc.get('title', ''))}\n"
    okf_blog += f"- **ID**: {p_id}\n"
    okf_blog += f"- **Published Date**: {p_date}\n"
    okf_blog += f"- **English URL**: https://eversonfilipe-portfolio.netlify.app/en/community/blog/{p_id}\n"
    okf_blog += f"- **Portuguese URL**: https://eversonfilipe-portfolio.netlify.app/pt/community/blog/{p_id}\n"
    okf_blog += f"- **Spanish URL**: https://eversonfilipe-portfolio.netlify.app/es/community/blog/{p_id}\n"
    okf_blog += f"- **English Summary**: {strip_html(en_loc.get('summary', ''))}\n"
    if pt_loc.get('summary'):
        okf_blog += f"- **Portuguese Summary**: {strip_html(pt_loc.get('summary', ''))}\n"
    if es_loc.get('summary'):
        okf_blog += f"- **Spanish Summary**: {strip_html(es_loc.get('summary', ''))}\n"
    okf_blog += "\n"

with open(os.path.join(okf_dir, 'blog.md'), 'w', encoding='utf-8') as f:
    f.write(okf_blog)

print("[OK] Generated 100% data-driven Open Knowledge Format (OKF) bundle in ./okf/")

# Compile the clean text summary of Everson's CV (per language for noscript generation)
noscript_cv_markdown = ""
noscript_by_lang = {}
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
    cv_data[lang]["experience"].sort(key=lambda x: get_end_date_value(x.get("date")), reverse=True)
    for exp in cv_data[lang]["experience"]:
        exp_desc = exp.get('descriptionHtml', exp.get('description', ''))
        about_comp = exp.get('optional_more_about_company', '')
        lang_markdown += f"### {strip_html(exp['role'])} at {strip_html(exp['company'])} ({strip_html(exp['date'])})\n"
        if about_comp:
            lang_markdown += f"**About {strip_html(exp['company'])}**: {strip_html(about_comp)}\n\n"
        if exp_desc:
            lang_markdown += f"{strip_html(exp_desc)}\n\n"
        if "bullets" in exp and exp["bullets"]:
            lang_markdown += "Key Responsibilities:\n"
            for bullet in exp["bullets"]:
                lang_markdown += f"- {strip_html(bullet)}\n"
            lang_markdown += "\n"
        if "specificAchievements" in exp and exp["specificAchievements"]:
            lang_markdown += "Key Achievements:\n"
            for ach in exp["specificAchievements"]:
                ach_text = strip_html(ach.get('description', str(ach))) if isinstance(ach, dict) else strip_html(str(ach))
                tag_prefix = f"[{ach.get('tag')}] " if isinstance(ach, dict) and ach.get('tag') else ""
                lang_markdown += f"- {tag_prefix}{ach_text}\n"
            lang_markdown += "\n"
        t_stack, m_eth = extract_stack_and_methodologies(exp)
        if t_stack:
            lang_markdown += f"- **Tech Stack**: {t_stack}\n"
        if m_eth:
            lang_markdown += f"- **Methodologies**: {m_eth}\n"
        lang_markdown += "\n"
        
    lang_markdown += "## Education & Qualifications\n"
    for edu in cv_data[lang]["education"]:
        edu_date = edu.get('period', edu.get('date', ''))
        edu_desc = edu.get('descriptionHtml', edu.get('description', ''))
        lang_markdown += f"- **{strip_html(edu.get('degree', ''))}**, {strip_html(edu.get('institution', ''))} ({strip_html(edu_date)}) - {strip_html(edu_desc)}\n"
        if "highlights" in edu and edu["highlights"]:
            for h in edu["highlights"]:
                lang_markdown += f"  - {strip_html(h)}\n"
    lang_markdown += "\n"
    
    lang_markdown += "## Certifications & Courses\n"
    cv_data[lang]["courses"].sort(key=lambda x: get_end_date_value(x.get("date")), reverse=True)
    for course in cv_data[lang]["courses"]:
        c_title = strip_html(course.get('name', course.get('title', '')))
        c_inst = strip_html(course.get('provider', course.get('institution', '')))
        c_date = strip_html(course.get('date', ''))
        c_url = course.get('credentialUrl', '')
        if c_url:
            lang_markdown += f"- **{c_title}**, {c_inst} ({c_date}) — [Credential/Proof]({c_url})\n"
        else:
            lang_markdown += f"- **{c_title}**, {c_inst} ({c_date})\n"
    lang_markdown += "\n"

    if "achievements" in cv_data[lang] and cv_data[lang]["achievements"]:
        lang_markdown += "## Achievements & Recognition\n"
        cv_data[lang]["achievements"].sort(key=lambda x: get_end_date_value(x.get("date")), reverse=True)
        for ach in cv_data[lang]["achievements"]:
            a_title = strip_html(ach.get("title", ach.get("name", "")))
            a_issuer = strip_html(ach.get("issuer", ""))
            a_date = strip_html(ach.get("date", ""))
            if a_issuer:
                lang_markdown += f"- **{a_title}**, {a_issuer} ({a_date})\n"
            else:
                lang_markdown += f"- **{a_title}** ({a_date})\n"
        lang_markdown += "\n"

    if "hackathons" in cv_data[lang] and cv_data[lang]["hackathons"]:
        lang_markdown += "## Hackathons & Technical Competitions\n"
        cv_data[lang]["hackathons"].sort(key=lambda x: get_end_date_value(x.get("date")), reverse=True)
        for hack in cv_data[lang]["hackathons"]:
            h_name = strip_html(hack.get("name", hack.get("title", "")))
            h_meta = strip_html(hack.get("meta", ""))
            h_date = strip_html(hack.get("date", ""))
            lang_markdown += f"- **{h_name}** ({h_meta}, {h_date})\n"
        lang_markdown += "\n"

    if "events" in cv_data[lang] and cv_data[lang]["events"]:
        lang_markdown += "## Tech Events & Industry Conferences\n"
        cv_data[lang]["events"].sort(key=lambda x: get_end_date_value(x.get("date")), reverse=True)
        for evt in cv_data[lang]["events"]:
            e_name = strip_html(evt.get("name", evt.get("title", "")))
            e_role = strip_html(evt.get("role", ""))
            e_meta = strip_html(evt.get("meta", ""))
            e_date = strip_html(evt.get("date", ""))
            lang_markdown += f"- **{e_name}** ({e_role} — {e_meta}, {e_date})\n"
        lang_markdown += "\n"
    
    lang_markdown += "## Publications\n"
    for pub in cv_data[lang]["publications"]:
        p_title = strip_html(pub.get('name', pub.get('title', '')))
        p_inst = strip_html(pub.get('institution', pub.get('publisher', '')))
        p_date = strip_html(pub.get('date', ''))
        pub_desc = pub.get('descriptionHtml', pub.get('description', ''))
        p_url = pub.get('url', '')
        if p_url:
            lang_markdown += f"- **{p_title}** ({p_inst}, {p_date}) — [URL]({p_url}) - {strip_html(pub_desc)}\n"
        else:
            lang_markdown += f"- **{p_title}** ({p_inst}, {p_date}) - {strip_html(pub_desc)}\n"
    lang_markdown += "\n"
    
    lang_markdown += "## Volunteering\n"
    cv_data[lang]["volunteering"].sort(key=lambda x: get_end_date_value(x.get("period", x.get("date"))), reverse=True)
    for vol in cv_data[lang]["volunteering"]:
        vol_date = vol.get('period', vol.get('date', ''))
        vol_desc = vol.get('descriptionHtml', vol.get('description', ''))
        v_role = strip_html(vol.get('role', ''))
        v_org = strip_html(vol.get('org', vol.get('organization', '')))
        lang_markdown += f"- **{v_role}**, {v_org} ({vol_date}) - {strip_html(vol_desc)}\n"
        if "highlights" in vol and vol["highlights"]:
            for h in vol["highlights"]:
                lang_markdown += f"  - {strip_html(h)}\n"
    lang_markdown += "\n"

    if "endorsements" in cv_data[lang] and cv_data[lang]["endorsements"]:
        lang_markdown += "## Endorsements & Peer Recommendations\n"
        cv_data[lang]["endorsements"].sort(key=lambda x: get_end_date_value(x.get("date")), reverse=True)
        for end in cv_data[lang]["endorsements"]:
            e_role = strip_html(end.get('role', ''))
            e_comp = strip_html(end.get('company', ''))
            e_auth = strip_html(end.get('author', ''))
            e_date = strip_html(end.get('date', ''))
            e_text = strip_html(end.get('textHtml', '')).strip()
            lang_markdown += f"### {e_auth} — {e_role} ({e_date})\n"
            if e_comp and e_comp != "null":
                lang_markdown += f"**Company/Context**: {e_comp}\n"
            lang_markdown += f"**Testimonial**: {e_text}\n\n"

    # --- Blog Articles Section ---
    if blog_data:
        lang_markdown += "## Blog Articles\n"
        for post in blog_data:
            loc = post.get(lang, post.get('en', {}))
            post_url = f"https://eversonfilipe-portfolio.netlify.app/{lang}/community/blog/{post['id']}"
            lang_markdown += f"### {strip_html(loc.get('title', ''))}\n"
            lang_markdown += f"  Published: {post.get('publishedAt', '')}\n"
            lang_markdown += f"  URL: {post_url}\n"
            lang_markdown += f"  Summary: {strip_html(loc.get('summary', ''))}\n\n"

    # Write localized Markdown resume file
    resume_file_path = os.path.join(docs_data_dir, f'resume-{lang}.md')
    with open(resume_file_path, 'w', encoding='utf-8') as rf:
        rf.write(lang_markdown)
    print(f"[OK] Written {resume_file_path}")

    noscript_by_lang[lang] = lang_markdown
    if lang == "en":
        noscript_cv_markdown = lang_markdown

# Ensure noscript_by_lang is always populated (fallback to EN if a language is missing)
for _lang in ['pt', 'en', 'es']:
    if _lang not in noscript_by_lang:
        noscript_by_lang[_lang] = noscript_by_lang.get('en', '')

# --- 3. Update index.html noscript block & JSON-LD ---
print("--- 3. Updating index.html noscript block & Schema.org JSON-LD ---")
if os.path.exists(index_html_path):
    with open(index_html_path, 'r', encoding='utf-8') as f:
        html_content = f.read()

    noscript_start = html_content.find('<noscript>')
    noscript_end = html_content.find('</noscript>')
    if noscript_start != -1 and noscript_end != -1:
        # Include leading whitespace line start to ensure idempotent indentation
        line_start = html_content.rfind('\n', 0, noscript_start)
        if line_start != -1 and html_content[line_start + 1:noscript_start].strip() == '':
            noscript_start = line_start + 1
        new_noscript_block = f"""  <noscript>
    <div style="padding: 20px; background: #374f5b; color: #ffffff;">
      <p>This page requires JavaScript to render the interactive portfolio. Here is the text summary for screen readers and search crawlers:</p>
      {noscript_cv_markdown}
    </div>
  </noscript>"""
        html_content = html_content[:noscript_start] + new_noscript_block + html_content[noscript_end + len('</noscript>'):]
        print("[OK] Updated index.html noscript block.")

    # Build BlogPosting schema array dynamically from blog_data
    base_url = "https://eversonfilipe-portfolio.netlify.app"
    blog_schema_items = []
    for post in blog_data:
        loc = post.get('en', {})
        seo = post.get('seo', {})
        tags = post.get('tags', [])
        blog_schema_items.append({
            "@type": "BlogPosting",
            "@id": f"{base_url}/en/community/blog/{post['id']}#article",
            "headline": loc.get('title', ''),
            "description": seo.get('description', loc.get('summary', '')),
            "datePublished": post.get('publishedAt', ''),
            "url": f"{base_url}/en/community/blog/{post['id']}",
            "inLanguage": "en",
            "author": {
                "@type": "Person",
                "@id": f"{base_url}/#person",
                "name": "Everson Filipe"
            },
            "creator": {
                "@id": f"{base_url}/#person"
            },
            "publisher": {
                "@id": f"{base_url}/#person"
            },
            "keywords": seo.get('keywords', ', '.join(tags)),
            "articleBody": strip_html(loc.get('content', '')),
            "isPartOf": {
                "@id": f"{base_url}/#blog"
            }
        })

    # ── 100% DATA-DRIVEN JSON-LD SCHEMA GRAPH ──────────────────────────
    # Every field below is dynamically sourced from cv_data / blog_data.
    # No hardcoded names, titles, skills, or descriptions.

    person_id = f"{base_url}/#person"

    # Extract dynamic fields from cv_data (EN as canonical)
    en = cv_data.get('en', {})
    hero = en.get('hero', {})
    about = en.get('about', {})
    experience = en.get('experience', [])
    education = en.get('education', [])
    courses = en.get('courses', [])
    volunteering = en.get('volunteering', [])
    achievements = en.get('achievements', [])
    hackathons = en.get('hackathons', [])
    events = en.get('events', [])
    endorsements = en.get('endorsements', [])
    publications = en.get('publications', [])

    # Person name (strip HTML tags from hero.name)
    person_name = strip_html(hero.get('name', 'Everson Filipe'))
    person_title = strip_html(hero.get('title', ''))
    person_tagline = strip_html(hero.get('tagline', ''))
    person_overline = strip_html(hero.get('overline', ''))
    person_about_p1 = strip_html(about.get('p1', ''))
    person_about_p2 = strip_html(about.get('p2', ''))

    # Current job = first experience with "Present" in date
    current_job = None
    for exp in experience:
        date_str = str(exp.get('date', '')).lower()
        if any(w in date_str for w in ['present', 'atual', 'actual', 'presente']):
            current_job = exp
            break
    if not current_job and experience:
        current_job = experience[0]

    # knowsAbout: merge skills + all unique tags from all experiences
    skills_set = []
    for s in about.get('skills', []):
        name = s['name'] if isinstance(s, dict) else s
        if name not in skills_set:
            skills_set.append(name)
    for exp in experience:
        for tag in exp.get('tags', []):
            if tag not in skills_set:
                skills_set.append(tag)

    credentials = []
    member_of = []
    alumni_of = []

    # Academic Education: In-progress degree (UniFavip Wyden) is represented via
    # EducationalOccupationalCredential (hasCredential) & student OrganizationRole (memberOf)
    # to avoid false 'alumniOf' graduation claim while accurately declaring degree name, institution, and student status.
    # Completed degrees (with end date in past) will dynamically populate alumniOf.
    for edu in education:
        inst_name = strip_html(edu.get('institution', ''))
        degree_title = strip_html(edu.get('degree', edu.get('name', 'Computer Science')))
        edu_date = edu.get('date', edu.get('period', 'Feb 2024 – Present'))
        edu_start, edu_end = to_iso8601_range(edu_date)
        edu_url = edu.get('url', resolve_org_url(inst_name))

        if inst_name and not any(w in inst_name.lower() for w in ['joule', 'lab.ai', 'mentorship']):
            cred_entry = {
                "@type": "EducationalOccupationalCredential",
                "credentialCategory": "degree",
                "educationalLevel": "Bachelor",
                "name": f"Bachelor of {degree_title} (B.S.)",
                "dateCreated": edu_start,
                "recognizedBy": {
                    "@type": "EducationalOrganization",
                    **({"@id": f"{base_url}/#unifavip"} if "unifavip" in inst_name.lower() else {}),
                    "name": inst_name,
                    **({"url": edu_url} if edu_url else {})
                }
            }
            credentials.append(cred_entry)

            if edu_end:
                # Completed degree -> alumniOf
                alumni_of.append({
                    "@type": "EducationalOrganization",
                    **({"@id": f"{base_url}/#unifavip"} if "unifavip" in inst_name.lower() else {}),
                    "name": inst_name,
                    **({"url": edu_url} if edu_url else {})
                })
            else:
                # Active degree -> Student OrganizationRole under memberOf
                student_role = {
                    "@type": "OrganizationRole",
                    "roleName": f"{degree_title} Student (B.S.)",
                    "startDate": edu_start,
                    "memberOf": {
                        "@type": "EducationalOrganization",
                        **({"@id": f"{base_url}/#unifavip"} if "unifavip" in inst_name.lower() else {}),
                        "name": inst_name,
                        **({"url": edu_url} if edu_url else {})
                    }
                }
                member_of.append(student_role)

    # hasCredential: build from courses
    for course in courses:
        c_name = strip_html(course.get('name', course.get('title', '')))
        c_provider = strip_html(course.get('provider', course.get('institution', '')))
        c_date = strip_html(course.get('date', ''))
        c_url = course.get('credentialUrl', course.get('url', ''))
        if c_name:
            cred = {
                "@type": "EducationalOccupationalCredential",
                "name": c_name,
                "credentialCategory": course.get('type', 'certificate'),
                "dateCreated": to_iso8601_single(c_date)
            }
            if c_provider:
                cred["recognizedBy"] = {
                    "@type": "Organization",
                    "name": c_provider
                }
            if c_url:
                cred["url"] = c_url
            credentials.append(cred)

    # memberOf: build from volunteering as structured OrganizationRole
    for vol in volunteering:
        v_role = strip_html(vol.get('role', ''))
        v_org = strip_html(vol.get('org', vol.get('organization', '')))
        v_date = vol.get('period', vol.get('date', ''))
        vol_desc = vol.get('descriptionHtml', vol.get('description', ''))
        if v_org:
            v_start, v_end = to_iso8601_range(v_date)
            v_url = vol.get('url', resolve_org_url(v_org))
            org_role = {
                "@type": "OrganizationRole",
                "roleName": v_role,
                "startDate": v_start,
                "memberOf": {
                    "@type": "Organization",
                    "name": v_org,
                    **({"url": v_url} if v_url else {}),
                    **({"description": strip_html(vol_desc)} if vol_desc else {})
                }
            }
            if v_end:
                org_role["endDate"] = v_end
            member_of.append(org_role)

    # Build complete list of Occupations and EmployeeRoles for ALL experiences in cv_data (present & past)
    occupations_list = []
    works_for_list = []

    for exp in experience:
        job_role = strip_html(exp.get('role', ''))
        company_name = strip_html(exp.get('company', ''))
        date_range = strip_html(exp.get('date', ''))
        about_comp = strip_html(exp.get('optional_more_about_company', ''))
        bullets_list = [strip_html(b) for b in exp.get('bullets', [])]
        achievements_list = [strip_html(a.get('description', str(a))) if isinstance(a, dict) else strip_html(str(a)) for a in exp.get('specificAchievements', [])]
        t_stack, m_eth = extract_stack_and_methodologies(exp)
        start_iso, end_iso = to_iso8601_range(date_range)
        soc_cat = get_occupational_category(job_role)
        comp_url = exp.get('url', resolve_org_url(company_name))

        # Occupation entity (NO startDate / NO endDate - described by Occupation schema specs)
        occ_obj = {
            "@type": "Occupation",
            "name": job_role,
            "description": f"{job_role} at {company_name}",
            "occupationalCategory": soc_cat,
            "occupationLocation": {
                "@type": "Country",
                "name": "Brazil"
            }
        }
        if t_stack:
            occ_obj["skills"] = t_stack
        if bullets_list:
            occ_obj["responsibilities"] = bullets_list
        if achievements_list:
            occ_obj["qualifications"] = achievements_list

        occupations_list.append(occ_obj)

        # EmployeeRole object for worksFor (HAS startDate/endDate, NO occupationalCategory)
        emp_role = {
            "@type": "EmployeeRole",
            "roleName": job_role,
            "startDate": start_iso,
            "worksFor": {
                "@type": "Organization",
                "name": company_name,
                **({"url": comp_url} if comp_url else {}),
                **({"description": about_comp} if about_comp else {})
            }
        }
        if end_iso:
            emp_role["endDate"] = end_iso

        works_for_list.append(emp_role)

    # Endorsements as Recommendation schema (ItemList)
    endorsement_items = []
    for idx, end in enumerate(endorsements):
        e_author = strip_html(end.get('author', ''))
        e_role = strip_html(end.get('role', ''))
        e_company = strip_html(end.get('company', ''))
        e_text = strip_html(end.get('textHtml', '')).strip()
        e_date = strip_html(end.get('date', ''))
        endorsement_items.append({
            "@type": "ListItem",
            "position": idx + 1,
            "item": {
                "@type": "Recommendation",
                "author": {
                    "@type": "Person",
                    "name": e_author,
                    "jobTitle": e_role,
                    **({"worksFor": {"@type": "Organization", "name": e_company}} if e_company and e_company != "null" else {})
                },
                "reviewBody": e_text,
                "datePublished": to_iso8601_single(e_date),
                "itemReviewed": {
                    "@id": person_id
                }
            }
        })

    # Event schema items (categorized strictly by role: speaker -> performerIn)
    performer_events = []
    contributor_events = []
    attendee_events = []

    for evt in events:
        e_name = strip_html(evt.get('name', ''))
        e_role = strip_html(evt.get('role', ''))
        e_date = strip_html(evt.get('date', ''))
        e_meta = strip_html(evt.get('meta', ''))
        e_type = evt.get('type', '')
        if e_name:
            event_item = {
                "@type": "Event",
                "name": e_name,
                "startDate": to_iso8601_single(e_date),
                "location": {
                    "@type": "Place",
                    "name": e_meta
                }
            }
            if e_type == 'speaker':
                event_item["performer"] = {"@id": person_id}
                performer_events.append(event_item)
            elif e_type == 'exhibitor':
                event_item["contributor"] = {"@id": person_id}
                contributor_events.append(event_item)
            else:
                event_item["attendee"] = {"@id": person_id}
                attendee_events.append(event_item)

    # Hackathons ItemList entity
    hackathon_items = []
    for h_idx, hack in enumerate(hackathons):
        h_name = strip_html(hack.get('name', hack.get('title', '')))
        h_meta = strip_html(hack.get('meta', ''))
        h_date = strip_html(hack.get('date', ''))
        if h_name:
            hackathon_items.append({
                "@type": "ListItem",
                "position": h_idx + 1,
                "item": {
                    "@type": "Event",
                    "name": h_name,
                    "startDate": to_iso8601_single(h_date),
                    "location": {
                        "@type": "Place",
                        "name": h_meta
                    },
                    "attendee": {
                        "@id": person_id
                    }
                }
            })

    # Exhibitions / Contributor Events ItemList entity (#exhibitions)
    exhibition_items = []
    for ex_idx, evt in enumerate(contributor_events):
        e_name = evt.get('name', '')
        e_date = evt.get('startDate', '')
        e_meta = evt.get('location', {}).get('name', '')
        exhibition_items.append({
            "@type": "ListItem",
            "position": ex_idx + 1,
            "item": {
                "@type": "Event",
                "name": e_name,
                "startDate": e_date,
                "location": {
                    "@type": "Place",
                    "name": e_meta
                },
                "contributor": {
                    "@id": person_id
                }
            }
        })

    # Build awards list (achievements section + experience specific achievements)
    awards_list = []
    for ach in achievements:
        a_title = strip_html(ach.get('title', ach.get('name', '')))
        a_issuer = strip_html(ach.get('issuer', ''))
        a_date = strip_html(ach.get('date', ''))
        if a_title:
            entry = f"{a_title}" + (f" ({a_issuer}, {a_date})" if a_issuer else f" ({a_date})" if a_date else "")
            awards_list.append(entry)

    for exp in experience:
        c_name = strip_html(exp.get('company', ''))
        for ach in exp.get('specificAchievements', []):
            ach_text = strip_html(ach.get('description', str(ach))) if isinstance(ach, dict) else strip_html(str(ach))
            if ach_text:
                awards_list.append(f"{ach_text} ({c_name})")

    # Build the Person entity dynamically
    person_schema = {
        "@context": "https://schema.org",
        "@type": "Person",
        "@id": person_id,
        "name": person_name,
        "alternateName": [
            "Éverson Filipe",
            "Everson Filipe Silva",
            "Éverson Filipe Silva",
            "eversonfilipe"
        ],
        "jobTitle": strip_html(current_job.get('role', '')) if current_job else person_overline,
        "description": f"{person_about_p1} {person_about_p2}".strip(),
        "url": f"{base_url}/",
        "image": f"{base_url}/assets/images/profile.png",
        "email": "mailto:eversonfilipe124@gmail.com",
        "nationality": "Brazilian",
        "address": {
            "@type": "PostalAddress",
            "addressLocality": args.city,
            "addressRegion": args.region,
            "addressCountry": args.country
        },
        "homeLocation": {
            "@type": "Place",
            "name": f"{args.city}, Pernambuco, Brazil" if args.region == "PE" else f"{args.city}, {args.region}, {args.country}"
        },
        "knowsLanguage": ["en", "pt", "es"],
        "sameAs": [
            "https://github.com/eversonfilipe",
            "https://www.linkedin.com/in/eversonfilipe-agile-products-ai/",
            "https://eversonfilipe.medium.com/"
        ],
        "knowsAbout": skills_set,
        "subjectOf": [
            {"@id": f"{base_url}/#endorsements"},
            {"@id": f"{base_url}/#hackathons"},
            {"@id": f"{base_url}/#exhibitions"}
        ]
    }

    if alumni_of:
        person_schema["alumniOf"] = alumni_of if len(alumni_of) > 1 else alumni_of[0]
    if works_for_list:
        person_schema["worksFor"] = works_for_list
    if occupations_list:
        person_schema["hasOccupation"] = occupations_list
    if credentials:
        person_schema["hasCredential"] = credentials
    if member_of:
        person_schema["memberOf"] = member_of
    if performer_events:
        person_schema["performerIn"] = performer_events
    if awards_list:
        person_schema["award"] = awards_list

    # Build the full JSON-LD graph
    json_ld_schema = [
        {
            "@context": "https://schema.org",
            "@type": "ProfilePage",
            "@id": f"{base_url}/#profilepage",
            "url": f"{base_url}/",
            "name": f"{person_name} | {person_title}",
            "description": f"Official interactive developer portfolio of {person_name} — {person_overline}.",
            "inLanguage": "en",
            "dateModified": today_str,
            "mainEntity": {
                "@id": person_id
            }
        },
        person_schema,
        {
            "@context": "https://schema.org",
            "@type": "WebSite",
            "@id": f"{base_url}/#website",
            "name": f"{person_name} — Developer Portfolio",
            "url": f"{base_url}/",
            "description": f"Interactive multilingual portfolio of {person_name} — {person_overline}.",
            "inLanguage": "en",
            "publisher": {
                "@id": person_id
            }
        },
        {
            "@context": "https://schema.org",
            "@type": "Blog",
            "@id": f"{base_url}/#blog",
            "name": f"{person_name} Tech Blog",
            "url": f"{base_url}/en/community/blog",
            "description": f"Technical articles by {person_name} on {person_title} — {person_tagline}",
            "publisher": {
                "@id": person_id
            },
            "blogPost": blog_schema_items
        }
    ]

    # Add endorsements ItemList as separate entity if endorsements exist
    if endorsement_items:
        json_ld_schema.append({
            "@context": "https://schema.org",
            "@type": "ItemList",
            "@id": f"{base_url}/#endorsements",
            "name": f"Peer Endorsements & Recommendations for {person_name}",
            "description": f"Professional recommendations and peer validations received by {person_name} across corporate environments, projects, and mentorships.",
            "numberOfItems": len(endorsement_items),
            "itemListElement": endorsement_items
        })

    # Add hackathons ItemList entity
    if hackathon_items:
        json_ld_schema.append({
            "@context": "https://schema.org",
            "@type": "ItemList",
            "@id": f"{base_url}/#hackathons",
            "name": f"Hackathons & Technical Competitions for {person_name}",
            "description": f"Hackathons, ideathons, and technical competitions participated in by {person_name}.",
            "numberOfItems": len(hackathon_items),
            "itemListElement": hackathon_items
        })

    # Add exhibitions / contributor events ItemList entity
    if exhibition_items:
        json_ld_schema.append({
            "@context": "https://schema.org",
            "@type": "ItemList",
            "@id": f"{base_url}/#exhibitions",
            "name": f"Academic Fairs & Technical Exhibitions for {person_name}",
            "description": f"Academic technology fairs and university project exhibitions contributed to by {person_name} at UniFavip Wyden.",
            "numberOfItems": len(exhibition_items),
            "itemListElement": exhibition_items
        })

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

This website provides an interactive multi-language developer portfolio with clean dynamic routing (/{lang}/{section}/{subsection}/{slug}). Below is a curated index of resources, structured resumes, RAG endpoints, Open Knowledge Format (OKF) bundles, blog articles, and data schemas optimized for LLMs, AI agents, and search engines.

**Core RAG Endpoints & Machine-Readable Data (JSON)**
- [RAG API Endpoint (JSON)](https://eversonfilipe-portfolio.netlify.app/api/portfolio-data.json): Primary Machine-Readable static JSON endpoint containing complete structured records of Everson Filipe (experiences, projects, education, blog posts, skills) for Retrieval-Augmented Generation (RAG) and AI agent tool consumption.
- [OKF Manifest (JSON)](https://eversonfilipe-portfolio.netlify.app/okf/manifest.json): Open Knowledge Format (OKF v0.1) manifest listing agent-readable profile modules.
- [OKF Profile Module](https://eversonfilipe-portfolio.netlify.app/okf/profile.md): Structured E-E-A-T profile background and technical focus.
- [OKF Experience Module](https://eversonfilipe-portfolio.netlify.app/okf/experience.md): Structured Implementation Engineering experience and Kartado metrics.
- [OKF Projects Module](https://eversonfilipe-portfolio.netlify.app/okf/projects.md): Structured AI Automation & B2B SaaS onboarding projects dataset.
- [OKF Blog Module](https://eversonfilipe-portfolio.netlify.app/okf/blog.md): Structured index of technical blog articles.
- [Docs Portfolio Dataset (JSON)](https://eversonfilipe-portfolio.netlify.app/docs/data/portfolio-data.json): Alternate static endpoint for structured JSON extraction.
- [Curriculum JSON Data](https://github.com/eversonfilipe/eversonfilipe-portfolio/blob/main/assets/js/cv_data.js): Vivo, dynamic JavaScript database file containing raw, complete JSON records.
- [Blog JSON Data](https://github.com/eversonfilipe/eversonfilipe-portfolio/blob/main/assets/js/blog_data.js): Multilingual database file containing technical articles in Markdown format (EN, PT, ES).

**Core Dynamic Navigation Routes**
- [Company Select Experiences Route](https://eversonfilipe-portfolio.netlify.app/en/experience/experiences-select): Interactive subroute showcasing company profiles, B2B SaaS onboarding contexts, and specific implementation roles.
- [Endorsements & Recommendations Route](https://eversonfilipe-portfolio.netlify.app/en/experience/endorsements): Direct route to peer recommendations and social proof validations.
- [Academic Background Route](https://eversonfilipe-portfolio.netlify.app/en/education/academic): Direct route to Everson's computer science academic degree.
- [Courses Route](https://eversonfilipe-portfolio.netlify.app/en/education/courses): Direct route to Everson's technical certifications and courses.
- [Publications Route](https://eversonfilipe-portfolio.netlify.app/en/education/publications): Direct route to published articles and research papers.
- [Blog Route](https://eversonfilipe-portfolio.netlify.app/en/community/blog): Direct route to the interactive technical blog.

**Technical Blog Articles**
- [Implementation Engineering vs. Software Engineering](https://eversonfilipe-portfolio.netlify.app/en/community/blog/post-implementation-engineering-vs-software-engineering): A practical perspective from the field comparing software creation vs client environment configuration, Python ETL workflows, and JSONLogic rule engines.

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

Detailed professional backgrounds, projects, blog articles, publications, education, and volunteering structured in plain Markdown for language models.

- [English Resume (EN)](https://eversonfilipe-portfolio.netlify.app/docs/data/resume-en.md): Complete curriculum, experiences, projects, stack, blog articles, and education in English.
- [Portuguese Resume (PT)](https://eversonfilipe-portfolio.netlify.app/docs/data/resume-pt.md): Currículo completo, experiências, projetos, artigos do blog e educação em português.
- [Spanish Resume (ES)](https://eversonfilipe-portfolio.netlify.app/docs/data/resume-es.md): Currículum completo, experiencia, proyectos, artículos del blog y educación en español.

## Technical Publications

Articles and essays sharing insights on parameterization, automation engineering, and career metrics.

- [Implementation Engineering vs. Software Engineering](https://eversonfilipe-portfolio.netlify.app/en/community/blog/post-implementation-engineering-vs-software-engineering): In-depth comparison of core software engineering vs. implementation engineering.
- [The Fallacy of Plural MVP in GovTech](https://medium.com/design-bootcamp/the-fallacy-of-plural-mvp-in-govtech-why-unrelenting-focus-is-the-only-real-metric-of-success-64329bbfe4ec?sharedUserId=eversonfilipe): Analysis on why unrelenting focus is the core metric of success for GovTech MVPs.
- [From Problem to Solution: Value-Driven Products](https://eversonfilipe.medium.com/from-problem-to-solution-a-framework-for-building-value-driven-products-c6e5d564d111?sharedUserId=eversonfilipe): Product discovery framework focusing on problem definition and value execution.
- [Gestão Ágil Simplificada (PT)](https://www.linkedin.com/pulse/gest%C3%A3o-%C3%A1gil-simplificada-%C3%A9verson-filipe-zgdoe): Simplified methodologies for agile team operations and project management.
"""

llms_txt_content = llms_txt_content.replace('–', '-').replace('—', '-')

with open(llms_path, 'w', encoding='utf-8') as f:
    f.write(llms_txt_content)
print("[OK] Overwritten llms.txt with correct RAG index formatting.")

# --- 3b. Generate per-language index.html files (Fix: unique noscript per lang for Google) ---
# This eliminates the duplicate-content issue where PT/ES pages appeared identical to EN to crawlers.
# Each language gets its own index.html with: <html lang=XX>, og:locale, noscript in that language.
LANG_META = {
    'en': {
        'lang_attr': 'en',
        'locale': 'en_US',
        'noscript_intro': 'This page requires JavaScript to render the interactive portfolio. Here is the full text summary for screen readers and search crawlers:',
        'canonical_suffix': '/en/',
    },
    'pt': {
        'lang_attr': 'pt-BR',
        'locale': 'pt_BR',
        'noscript_intro': 'Esta página requer JavaScript para exibir o portfólio interativo. Aqui está o resumo completo para leitores de tela e rastreadores de busca:',
        'canonical_suffix': '/pt/',
    },
    'es': {
        'lang_attr': 'es',
        'locale': 'es_ES',
        'noscript_intro': 'Esta página requiere JavaScript para mostrar el portafolio interactivo. Aquí está el resumen completo para lectores de pantalla y rastreadores de búsqueda:',
        'canonical_suffix': '/es/',
    },
}

if os.path.exists(index_html_path):
    with open(index_html_path, 'r', encoding='utf-8') as _f:
        _base_html = _f.read()

    for _lang, _meta in LANG_META.items():
        _lang_html = _base_html

        # 1. Update <html lang="..."> attribute
        _lang_html = re.sub(r'<html lang="[^"]*"', f'<html lang="{_meta["lang_attr"]}"', _lang_html)

        # 2. Inject/update og:locale after og:site_name (or before twitter:card)
        _locale_tag = f'<meta property="og:locale" content="{_meta["locale"]}" />'
        if 'og:locale' not in _lang_html:
            _lang_html = _lang_html.replace('<meta name="twitter:card"', f'{_locale_tag}\n  <meta name="twitter:card"')
        else:
            _lang_html = re.sub(r'<meta property="og:locale"[^/]*/>', _locale_tag, _lang_html)

        # 3. Add static hreflang <link> tags to <head> for bots that read HTML before JS runs
        _hreflang_block = f"""  <link rel="alternate" hreflang="pt" href="{base_url}/pt/" />
  <link rel="alternate" hreflang="en" href="{base_url}/en/" />
  <link rel="alternate" hreflang="es" href="{base_url}/es/" />
  <link rel="alternate" hreflang="x-default" href="{base_url}/pt/" />"""
        if 'hreflang="pt"' not in _lang_html:
            _lang_html = _lang_html.replace('<link rel="canonical"', f'{_hreflang_block}\n  <link rel="canonical"')

        # 4. Replace noscript block with language-specific content
        _ns_content = noscript_by_lang.get(_lang, noscript_by_lang.get('en', ''))
        _new_noscript = f"""  <noscript>
    <div style="padding: 20px; background: #374f5b; color: #ffffff;">
      <p>{_meta['noscript_intro']}</p>
      {_ns_content}
    </div>
  </noscript>"""
        _ns_start = _lang_html.find('<noscript>')
        _ns_end = _lang_html.find('</noscript>')
        if _ns_start != -1 and _ns_end != -1:
            _line_start = _lang_html.rfind('\n', 0, _ns_start)
            if _line_start != -1 and _lang_html[_line_start + 1:_ns_start].strip() == '':
                _ns_start = _line_start + 1
            _lang_html = _lang_html[:_ns_start] + _new_noscript + _lang_html[_ns_end + len('</noscript>'):]

        # 5. Write to lang/index.html
        _out_dir = os.path.join('.', _lang)
        os.makedirs(_out_dir, exist_ok=True)
        _out_path = os.path.join(_out_dir, 'index.html')
        with open(_out_path, 'w', encoding='utf-8') as _lf:
            _lf.write(_lang_html)
        print(f'[OK] Generated {_out_path} (lang={_meta["lang_attr"]}, locale={_meta["locale"]})')

# Also inject hreflang + og:locale into root index.html (EN defaults)
if os.path.exists(index_html_path):
    with open(index_html_path, 'r', encoding='utf-8') as _f:
        _root_html = _f.read()
    _locale_tag = '<meta property="og:locale" content="en_US" />'
    if 'og:locale' not in _root_html:
        _root_html = _root_html.replace('<meta name="twitter:card"', f'{_locale_tag}\n  <meta name="twitter:card"')
    _hreflang_block = f"""  <link rel="alternate" hreflang="pt" href="{base_url}/pt/" />
  <link rel="alternate" hreflang="en" href="{base_url}/en/" />
  <link rel="alternate" hreflang="es" href="{base_url}/es/" />
  <link rel="alternate" hreflang="x-default" href="{base_url}/pt/" />"""
    if 'hreflang="pt"' not in _root_html:
        _root_html = _root_html.replace('<link rel="canonical"', f'{_hreflang_block}\n  <link rel="canonical"')
    with open(index_html_path, 'w', encoding='utf-8') as _f:
        _f.write(_root_html)
    print('[OK] Updated root index.html with og:locale + static hreflang tags')

print("--- 4b. Generating 100% Dynamic, Bidirectional & Audited sitemap.xml ---")
today_str = datetime.now().strftime("%Y-%m-%d")

# Load image metadata for sitemap <image:caption> enrichment
image_metadata = {}
img_meta_path = os.path.join('docs', 'data', 'image_metadata.json')
if os.path.exists(img_meta_path):
    with open(img_meta_path, encoding='utf-8') as f:
        image_metadata = json.load(f)
    # Remove _meta key
    image_metadata.pop('_meta', None)
    print(f"[OK] Loaded image metadata for {len(image_metadata)} images")
else:
    print("[WARNING] docs/data/image_metadata.json not found — sitemap images will lack captions")

def xml_escape(text):
    """Escape special XML characters in text content."""
    if not text:
        return ''
    return text.replace('&', '&amp;').replace('<', '&lt;').replace('>', '&gt;').replace('"', '&quot;').replace("'", '&apos;')

def slugify_segment(text):
    """Convert string to clean URL-safe ASCII slug."""
    if not text:
        return ''
    import unicodedata
    s = unicodedata.normalize('NFD', text).encode('ascii', 'ignore').decode('utf-8').lower()
    s = re.sub(r'[^a-z0-9]+', '-', s).strip('-')
    return s

# Portfolio launch date — used as fallback lastmod for items without explicit dates.
# This ensures Google sees stable, realistic dates instead of today_str (which changes every build
# and degrades the freshness signal by making everything appear to change constantly).
PORTFOLIO_LAUNCH_DATE = "2026-07-01"

def parse_item_lastmod(date_str, fallback_str=PORTFOLIO_LAUNCH_DATE):
    if not date_str or not isinstance(date_str, str):
        return fallback_str
    s = date_str.strip()
    # Items with 'Present/Atual/Presente' use today's date (actively updated content)
    if "present" in s.lower() or "atual" in s.lower() or "presente" in s.lower():
        return today_str
    if re.match(r'^\d{4}-\d{2}-\d{2}$', s):
        return s
    years = re.findall(r'\b(20\d{2}|19\d{2})\b', s)
    if years:
        year = years[-1]
        month_map = {
            'jan': '01', 'feb': '02', 'fev': '02', 'mar': '03', 'apr': '04', 'abr': '04',
            'may': '05', 'mai': '05', 'jun': '06', 'jul': '07', 'aug': '08', 'ago': '08',
            'sep': '09', 'set': '09', 'oct': '10', 'out': '10', 'nov': '11', 'dez': '12', 'dec': '12', 'ene': '01', 'dic': '12'
        }
        found_month = '01'
        for m_key, m_val in month_map.items():
            if re.search(r'\b' + m_key + r'\b', s, re.IGNORECASE):
                found_month = m_val
                break
        return f"{year}-{found_month}-01"
    return fallback_str

def resolve_sitemap_img(img_url):
    if not img_url or not isinstance(img_url, str):
        return None
    s = img_url.strip()
    if s.lower().endswith('.svg'):
        base_no_ext = os.path.splitext(s)[0]
        if os.path.exists(base_no_ext + '.webp'):
            return base_no_ext + '.webp'
        clean_base = base_no_ext.lower().replace(' ', '_') + '.webp'
        if os.path.exists(clean_base):
            return clean_base
        return None
    return s

def make_hreflang_tags(path_suffix):
    return f"""    <xhtml:link rel="alternate" hreflang="pt" href="{base_url}/pt{path_suffix}"/>
    <xhtml:link rel="alternate" hreflang="en" href="{base_url}/en{path_suffix}"/>
    <xhtml:link rel="alternate" hreflang="es" href="{base_url}/es{path_suffix}"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="{base_url}/pt{path_suffix}"/>"""

def make_image_block(img_url, lang='pt'):
    """Build <image:image> XML block with optional <image:caption> from metadata."""
    resolved_img = resolve_sitemap_img(img_url)
    if not resolved_img:
        return ""
    full_img = resolved_img if resolved_img.startswith("http") else f"{base_url}/{resolved_img.lstrip('/')}"
    # Look up caption from image_metadata.json (try original path first, then resolved)
    meta = image_metadata.get(img_url) or image_metadata.get(resolved_img) or {}
    caption_dict = meta.get('caption') or meta.get('alt') or {}
    caption = caption_dict.get(lang, '')
    caption_xml = f"\n      <image:caption>{xml_escape(caption)}</image:caption>" if caption else ""
    return f"""
    <image:image>
      <image:loc>{full_img}</image:loc>{caption_xml}
    </image:image>"""

def make_sitemap_url_entry(lang, path_suffix, lastmod, priority="0.60", changefreq="monthly", img_url=None, extra_images=None):
    loc = f"{base_url}/{lang}{path_suffix}"
    hreflangs = make_hreflang_tags(path_suffix)
    # Primary image
    img_block = make_image_block(img_url, lang) if img_url else ""
    # Extra images (e.g. carousel slides)
    if extra_images:
        for extra_img in extra_images:
            img_block += make_image_block(extra_img, lang)
    # Strict Canonical XSD Sequence Order: <loc> -> <lastmod> -> <changefreq> -> <priority> -> <xhtml:link> -> <image:image>
    return f"""  <url>
    <loc>{loc}</loc>
    <lastmod>{lastmod}</lastmod>
    <changefreq>{changefreq}</changefreq>
    <priority>{priority}</priority>
{hreflangs}{img_block}
  </url>
"""

def make_cluster_url_entries(path_suffix, lastmod, priority="0.60", changefreq="monthly", img_url=None, extra_images=None):
    entries = []
    for l in ['pt', 'en', 'es']:
        entries.append(make_sitemap_url_entry(l, path_suffix, lastmod, priority, changefreq, img_url, extra_images))
    return "".join(entries)

def get_unique_objects(category_key):
    seen = set()
    objects = []
    for lang in ['pt', 'en', 'es']:
        cat = cv_data.get(lang, {}).get(category_key, [])
        for item in cat:
            i_id = item.get('id')
            if i_id and i_id not in seen:
                seen.add(i_id)
                objects.append(item)
    return objects

sitemap_xml = f"""<?xml version="1.0" encoding="UTF-8"?>
<!--
  Sitemap - eversonfilipe-portfolio.netlify.app
  Revisao: {today_str}

  CONVENCOES APLICADAS
  1. Ordem canonica dentro de <url> (sitemaps.org XSD, xsd:sequence):
     <loc> -> <lastmod> -> <changefreq> -> <priority> -> <xhtml:link> -> <image:image>
  2. Somente URLs finais com status 200 OK. A raiz "/" faz 301 -> /pt e por isso
     NAO e listada; as tres homes de idioma (/pt, /en, /es) sao listadas diretamente.
  3. hreflang autorreferencial em todos os clusters (pt, en, es + x-default -> /pt).
  4. Escala de <priority>:
     1.00 homes de idioma | 0.90 secoes | 0.80 hubs | 0.60 itens folha
     0.30 rotas utilitarias | 0.10 endpoints machine-readable (nao-HTML)
  5. Secao /projects sem itens publicados: bloco desativado abaixo (reativar quando
     houver ao menos 1 projeto renderizado).
-->
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">

  <!-- Language Homes (1.00 / monthly — stable entry points) -->
{make_cluster_url_entries("", today_str, priority="1.00", changefreq="monthly", img_url="assets/images/profile.webp")}

  <!-- Main Section Routes (0.80 / monthly — structural hubs, content loaded via JS) -->
{make_cluster_url_entries("/experience", today_str, priority="0.80", changefreq="monthly")}
{make_cluster_url_entries("/education", today_str, priority="0.80", changefreq="monthly")}
{make_cluster_url_entries("/community", today_str, priority="0.80", changefreq="monthly")}

  <!-- Utility Routes (0.10 / yearly — selector/filter UX routes, low crawl-budget value) -->
{make_cluster_url_entries("/experience/experiences-select", PORTFOLIO_LAUNCH_DATE, priority="0.10", changefreq="yearly")}
{make_cluster_url_entries("/education/courses-select", PORTFOLIO_LAUNCH_DATE, priority="0.10", changefreq="yearly")}
"""

projects_list = get_unique_objects('projects')
if projects_list:
    sitemap_xml += "\n  <!-- Projects Main Section & Objects -->\n"
    sitemap_xml += make_cluster_url_entries("/projects", today_str, priority="0.90", changefreq="weekly")
    for prj in projects_list:
        p_id = prj.get('id')
        if not p_id: continue
        prj_lastmod = parse_item_lastmod(prj.get('date'))
        prj_img = prj.get('logo') or prj.get('image')
        sitemap_xml += f"  <!-- Project Route: {p_id} -->\n"
        sitemap_xml += make_cluster_url_entries(f"/projects/{p_id}", prj_lastmod, priority="0.60", img_url=prj_img)
else:
    sitemap_xml += f"""
  <!-- ===================================================================
       /projects - DESATIVADO ate a publicacao do primeiro projeto.
       Motivo: a rota renderiza uma secao vazia (thin content). Submeter a
       URL agora tende a gerar 'Rastreada - no momento nao indexada' no GSC
       e contradiz a priority alta que estava declarada (0.90 sem conteudo).
       REATIVACAO: descomentar o bloco e ajustar priority para 0.90 quando
       houver ao menos 1 item em /projects.
  <url>
    <loc>{base_url}/pt/projects</loc>
    <lastmod>{today_str}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.60</priority>
    <xhtml:link rel="alternate" hreflang="pt" href="{base_url}/pt/projects"/>
    <xhtml:link rel="alternate" hreflang="en" href="{base_url}/en/projects"/>
    <xhtml:link rel="alternate" hreflang="es" href="{base_url}/es/projects"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="{base_url}/pt/projects"/>
  </url>
  <url>
    <loc>{base_url}/en/projects</loc>
    <lastmod>{today_str}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.60</priority>
    <xhtml:link rel="alternate" hreflang="pt" href="{base_url}/pt/projects"/>
    <xhtml:link rel="alternate" hreflang="en" href="{base_url}/en/projects"/>
    <xhtml:link rel="alternate" hreflang="es" href="{base_url}/es/projects"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="{base_url}/pt/projects"/>
  </url>
  <url>
    <loc>{base_url}/es/projects</loc>
    <lastmod>{today_str}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.60</priority>
    <xhtml:link rel="alternate" hreflang="pt" href="{base_url}/pt/projects"/>
    <xhtml:link rel="alternate" hreflang="en" href="{base_url}/en/projects"/>
    <xhtml:link rel="alternate" hreflang="es" href="{base_url}/es/projects"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="{base_url}/pt/projects"/>
  </url>
       =================================================================== -->
"""

# Experience Hubs & Objects (Hub 0.80, Item 0.60)
sitemap_xml += "\n  <!-- Experience Hub: endorsements (0.70 / monthly) -->\n"
sitemap_xml += make_cluster_url_entries("/experience/endorsements", today_str, priority="0.70", changefreq="monthly")

for job in get_unique_objects('experience'):
    j_id = job.get('id')
    comp_id = slugify_segment(job.get('company', ''))
    if not j_id or not comp_id: continue
    job_lastmod = parse_item_lastmod(job.get('date'))
    job_logo = job.get('logo')
    # Collect carousel slide images as extra_images for multi-image sitemap entries
    carousel_images = []
    if job.get('carousel') and job['carousel'].get('slides'):
        for slide in job['carousel']['slides']:
            slide_src = slide.get('src')
            if slide_src:
                carousel_images.append(slide_src)
    sitemap_xml += f"  <!-- Experience Route: {comp_id}/{j_id} (0.80/weekly — real unique content) -->\n"
    sitemap_xml += make_cluster_url_entries(f"/experience/{comp_id}/{j_id}", job_lastmod, priority="0.80", changefreq="weekly", img_url=job_logo, extra_images=carousel_images if carousel_images else None)

# Education Hubs & Objects (Hub 0.80, Item 0.60)
sitemap_xml += "\n  <!-- Education Hubs (0.70 / monthly) -->\n"
for sub in ["academic", "courses", "publications"]:
    sitemap_xml += make_cluster_url_entries(f"/education/{sub}", today_str, priority="0.70", changefreq="monthly")

for edu in get_unique_objects('education'):
    e_id = edu.get('id')
    if not e_id: continue
    edu_lastmod = parse_item_lastmod(edu.get('date'))
    edu_logo = edu.get('logo')
    sitemap_xml += f"  <!-- Academic Formation Route: {e_id} (0.80/weekly) -->\n"
    sitemap_xml += make_cluster_url_entries(f"/education/academic/{e_id}", edu_lastmod, priority="0.80", changefreq="weekly", img_url=edu_logo)

for course in get_unique_objects('courses'):
    c_id = course.get('id')
    if not c_id: continue
    course_lastmod = parse_item_lastmod(course.get('date'))
    course_logo = course.get('logo')
    sitemap_xml += f"  <!-- Course Route: {c_id} (0.75/weekly) -->\n"
    sitemap_xml += make_cluster_url_entries(f"/education/courses/{c_id}", course_lastmod, priority="0.75", changefreq="weekly", img_url=course_logo)

for pub in get_unique_objects('publications'):
    p_id = pub.get('id')
    if not p_id: continue
    pub_lastmod = parse_item_lastmod(pub.get('date'))
    pub_logo = pub.get('logo') or pub.get('coverImage')
    sitemap_xml += f"  <!-- Publication Route: {p_id} (0.75/weekly) -->\n"
    sitemap_xml += make_cluster_url_entries(f"/education/publications/{p_id}", pub_lastmod, priority="0.75", changefreq="weekly", img_url=pub_logo)

# Community Hubs & Objects (Hub 0.80, Item 0.60)
sitemap_xml += "\n  <!-- Community Hubs (0.70 / monthly) -->\n"
for sub in ["volunteering", "hackathons", "events", "achievements", "blog"]:
    sitemap_xml += make_cluster_url_entries(f"/community/{sub}", today_str, priority="0.70", changefreq="monthly")

for post in blog_data:
    p_id = post.get('id')
    if not p_id: continue
    post_lastmod = parse_item_lastmod(post.get('date') or post.get('publishedAt'))
    post_cover = post.get('coverImage') or post.get('image')
    sitemap_xml += f"  <!-- Blog Post Route: {p_id} (0.85/weekly — highest value content) -->\n"
    sitemap_xml += make_cluster_url_entries(f"/community/blog/{p_id}", post_lastmod, priority="0.85", changefreq="weekly", img_url=post_cover)

for vol in get_unique_objects('volunteering'):
    v_id = vol.get('id')
    if not v_id: continue
    vol_lastmod = parse_item_lastmod(vol.get('date'))
    vol_logo = vol.get('logo')
    sitemap_xml += f"  <!-- Volunteering Route: {v_id} (0.75/weekly) -->\n"
    sitemap_xml += make_cluster_url_entries(f"/community/volunteering/{v_id}", vol_lastmod, priority="0.75", changefreq="weekly", img_url=vol_logo)

for hack in get_unique_objects('hackathons'):
    h_id = hack.get('id')
    if not h_id: continue
    hack_lastmod = parse_item_lastmod(hack.get('date'))
    hack_logo = hack.get('logo') or hack.get('image')
    sitemap_xml += f"  <!-- Hackathon Route: {h_id} (0.75/weekly) -->\n"
    sitemap_xml += make_cluster_url_entries(f"/community/hackathons/{h_id}", hack_lastmod, priority="0.75", changefreq="weekly", img_url=hack_logo)

for ev in get_unique_objects('events'):
    e_id = ev.get('id')
    if not e_id or e_id == 'ideathon-caruaru-campusparty-day-event':
        continue
    ev_lastmod = parse_item_lastmod(ev.get('date'))
    ev_logo = ev.get('logo') or ev.get('image')
    sitemap_xml += f"  <!-- Event Route: {e_id} (0.75/weekly) -->\n"
    sitemap_xml += make_cluster_url_entries(f"/community/events/{e_id}", ev_lastmod, priority="0.75", changefreq="weekly", img_url=ev_logo)

for ach in get_unique_objects('achievements'):
    a_id = ach.get('id')
    if not a_id: continue
    ach_lastmod = parse_item_lastmod(ach.get('date'))
    ach_logo = ach.get('logo') or ach.get('image')
    sitemap_xml += f"  <!-- Achievement Route: {a_id} (0.75/weekly) -->\n"
    sitemap_xml += make_cluster_url_entries(f"/community/achievements/{a_id}", ach_lastmod, priority="0.75", changefreq="weekly", img_url=ach_logo)

# Machine-Readable Data & OKF Endpoints (0.05/yearly — for LLMs/agents, not crawl-budget priority)
sitemap_xml += f"""  <!-- Machine-Readable Data & OKF Endpoints (0.05/yearly) -->
  <url>
    <loc>{base_url}/okf/manifest.json</loc>
    <lastmod>{today_str}</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.05</priority>
  </url>
  <url>
    <loc>{base_url}/api/portfolio-data.json</loc>
    <lastmod>{today_str}</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.05</priority>
  </url>
  <url>
    <loc>{base_url}/llms.txt</loc>
    <lastmod>{today_str}</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.05</priority>
  </url>
</urlset>
"""

# Post-generation XML validation — never save a broken sitemap
import xml.etree.ElementTree as ET
try:
    ET.fromstring(sitemap_xml)
    # Strip XML comments before counting tags (commented-out blocks may contain <url> tags)
    stripped_xml = re.sub(r'<!--.*?-->', '', sitemap_xml, flags=re.DOTALL)
    open_count = stripped_xml.count('<url>')
    close_count = stripped_xml.count('</url>')
    assert open_count == close_count, f"Mismatched <url> tags: {open_count} opens vs {close_count} closes"
    with open("sitemap.xml", "w", encoding="utf-8") as f:
        f.write(sitemap_xml)
    # Count image entries
    img_count = sitemap_xml.count('<image:image>')
    caption_count = sitemap_xml.count('<image:caption>')
    print(f"[OK] Generated 100% dynamic sitemap.xml ({open_count} URLs, {img_count} images, {caption_count} captions)")
except ET.ParseError as e:
    print(f"[CRITICAL] sitemap.xml XML validation FAILED — NOT SAVED: {e}")
    print("[CRITICAL] Fix the sitemap generation code before deploying!")
except Exception as e:
    print(f"[CRITICAL] sitemap.xml post-validation FAILED — NOT SAVED: {e}")

print("\n--- 5. Running SEO/LLMO/A11Y Audit Suite ---")
try:
    from audit_seo import run_seo_audit
    run_seo_audit()
except Exception as e:
    print(f"[WARNING] Could not execute audit_seo.py: {e}")

