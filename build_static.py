import json
import re
import os

# Relative paths for scalability across any environment (e.g. GitHub Actions or local checkout)
cv_data_path = './assets/js/cv_data.js'
index_html_path = './index.html'
llms_path = './llms.txt'

print("--- 1. Loading cv_data.js ---")
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
    # Try alternate end marker
    end_marker = "};"
    end_idx = cv_content.rfind(end_marker)

json_str = cv_content[json_start:end_idx+1]
try:
    cv_data = json.loads(json_str)
except Exception as e:
    print(f"[ERROR] Failed to parse JSON from cv_data.js: {e}")
    # Show snippet around failure
    exit(1)

# Helper function to strip HTML tags properly
def strip_html(text):
    if not text:
        return ""
    # Strip HTML tags
    clean = re.sub(r'<[^>]+>', '', text)
    # Decode HTML entities
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

# Compile the clean text summary of Everson's CV
noscript_cv_markdown = ""
for lang in ["en", "pt", "es"]:
    noscript_cv_markdown += f"## LANGUAGE: {lang.upper()}\n\n"
    hero = cv_data[lang]["hero"]
    noscript_cv_markdown += f"# {strip_html(hero['name'])}\n"
    noscript_cv_markdown += f"{strip_html(hero['title'])} | {strip_html(hero['tagline'])}\n\n"
    
    about = cv_data[lang]["about"]
    noscript_cv_markdown += f"## About\n{strip_html(about['p1'])}\n{strip_html(about['p2'])}\n{strip_html(about['p3'])}\n\n"
    
    noscript_cv_markdown += "### Core Stack\n"
    noscript_cv_markdown += ", ".join(about["skills"]) + "\n\n"

    # --- Projects Section (SEO/LLMO main focus) ---
    noscript_cv_markdown += "## Main Projects\n"
    if "projects" in cv_data[lang] and cv_data[lang]["projects"]:
        # Sort projects chronological/status descending
        cv_data[lang]["projects"].sort(key=lambda x: get_end_date_value(x.get("date")), reverse=True)
        for proj in cv_data[lang]["projects"]:
            status_label = "In Progress" if proj.get("status") == "in-progress" else "Completed"
            noscript_cv_markdown += f"### {strip_html(proj['title'])} ({strip_html(proj['date'])}) [{status_label}]\n"
            noscript_cv_markdown += f"  Category: {strip_html(proj.get('category', ''))}\n"
            if proj.get("stack"):
                noscript_cv_markdown += f"  Stack: {', '.join(proj['stack'])}\n"
            if proj.get("linkedTo"):
                noscript_cv_markdown += f"  Linked to: {', '.join(proj['linkedTo'])}\n"
            if proj.get("repoUrl"):
                noscript_cv_markdown += f"  Repository: {proj['repoUrl']}\n"
            noscript_cv_markdown += f"  Description:\n  {strip_html(proj.get('descriptionHtml', ''))}\n\n"
    else:
        noscript_cv_markdown += "Under Construction\n\n"
    
    noscript_cv_markdown += "## Experience\n"
    for job in cv_data[lang]["experience"]:
        noscript_cv_markdown += f"### {strip_html(job['role'])} at {strip_html(job['company'])} ({strip_html(job['date'])})\n"
        for bullet in job["bullets"]:
            noscript_cv_markdown += f"- {strip_html(bullet)}\n"
        if "specificAchievements" in job and job["specificAchievements"]:
            noscript_cv_markdown += "Conquistas/Achievements:\n"
            for ach in job["specificAchievements"]:
                noscript_cv_markdown += f"  * [{strip_html(ach['tag'])}] {strip_html(ach['description'])}\n"
        noscript_cv_markdown += "\n"
        
    noscript_cv_markdown += "## Education\n"
    # Sort education chronological/status descending
    cv_data[lang]["education"].sort(key=lambda x: get_end_date_value(x.get("date")), reverse=True)
    for edu in cv_data[lang]["education"]:
        noscript_cv_markdown += f"### {strip_html(edu['degree'])} - {strip_html(edu['institution'])} ({strip_html(edu['date'])}) [{strip_html(edu['type'])}]\n"
        if "highlights" in edu and edu["highlights"]:
            noscript_cv_markdown += "  Highlights: " + ", ".join(edu["highlights"]) + "\n"
        noscript_cv_markdown += "\n"
        
    noscript_cv_markdown += "## Courses\n"
    cv_data[lang]["courses"].sort(key=lambda x: get_end_date_value(x.get("date")), reverse=True)
    for course in cv_data[lang]["courses"]:
        noscript_cv_markdown += f"- {strip_html(course['name'])} ({strip_html(course['provider'])}, {strip_html(course['date'])})\n"
    noscript_cv_markdown += "\n"

    noscript_cv_markdown += "## Publications\n"
    if "publications" in cv_data[lang]:
        cv_data[lang]["publications"].sort(key=lambda x: get_end_date_value(x.get("date")), reverse=True)
        for pub in cv_data[lang]["publications"]:
            noscript_cv_markdown += f"- {strip_html(pub['name'])} ({strip_html(pub['institution'])}, {strip_html(pub['date'])})\n"
    noscript_cv_markdown += "\n"
    
    noscript_cv_markdown += "## Volunteering\n"
    for vol in cv_data[lang]["volunteering"]:
        noscript_cv_markdown += f"### {strip_html(vol['role'])} at {strip_html(vol['org'])} ({strip_html(vol['date'])})\n"
        if "highlights" in vol and vol["highlights"]:
            noscript_cv_markdown += "  Highlights: " + ", ".join(vol["highlights"]) + "\n"
        noscript_cv_markdown += "\n"
        
    noscript_cv_markdown += "## Hackathons\n"
    for hack in cv_data[lang]["hackathons"]:
        noscript_cv_markdown += f"- {strip_html(hack['name'])} ({strip_html(hack['meta'])}, {strip_html(hack['date'])})\n"
    noscript_cv_markdown += "\n"
    
    noscript_cv_markdown += "## Events\n"
    for ev in cv_data[lang]["events"]:
        noscript_cv_markdown += f"- {strip_html(ev['name'])} - Role: {strip_html(ev['role'])} ({strip_html(ev['meta'])}, {strip_html(ev['date'])})\n"
    noscript_cv_markdown += "\n\n"

noscript_cv_markdown = noscript_cv_markdown.replace('–', '-').replace('—', '-')

print("--- 2. Updating index.html noscript block ---")
if os.path.exists(index_html_path):
    with open(index_html_path, 'r', encoding='utf-8') as f:
        html_content = f.read()

    # Replace the old noscript block with the new clean block
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
        with open(index_html_path, 'w', encoding='utf-8') as f:
            f.write(html_content)
        print("[OK] Updated index.html noscript block.")
    else:
        print("[ERROR] Noscript block not found in index.html.")
else:
    print(f"[ERROR] index.html not found at {index_html_path}")

print("--- 3. Updating llms.txt ---")
# Create clean text version of the CV for AI Agents
llms_txt_content = f"""# Everson Filipe - Portfolio Summary

This file provides a clean, machine-readable summary of Everson Filipe's portfolio for LLM engines, search crawlers, and AI agents.

## Professional Summary
Everson Filipe is an Implementation Engineer & AI Automation Analyst. He specializes in bridging the gap between business requirements and scalable software execution through rigorous data validation, Python automation, JSONLogic configuration, and AWS SaaS parameters.

## Contact & Links
- GitHub: https://github.com/eversonfilipe
- LinkedIn: https://www.linkedin.com/in/eversonfilipe-agile-products-ai/
- Medium: https://eversonfilipe.medium.com/
- Portfolio: https://eversonfilipe.github.io/eversonfilipe-portfolio/

{noscript_cv_markdown}
"""

# Clean up dashes for LLM compliance
llms_txt_content = llms_txt_content.replace('–', '-').replace('—', '-')

with open(llms_path, 'w', encoding='utf-8') as f:
    f.write(llms_txt_content)
print("[OK] Overwritten llms.txt with correct formatting.")
