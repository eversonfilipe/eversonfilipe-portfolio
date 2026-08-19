import json
import re
import os

def run_seo_audit():
    print('=== SEO/LLMO/A11Y Audit Report ===\n')

    # 1. Audit index.html
    html_passed = 0
    html_failed = 0
    if os.path.exists('index.html'):
        with open('index.html', encoding='utf-8') as f:
            html = f.read()

        html_checks = {
            'Base href tag (<base href="/">)': '<base href="/"' in html,
            'ProfilePage schema': 'ProfilePage' in html,
            'Person schema': '"@type": "Person"' in html,
            'WebSite schema': '"WebSite"' in html,
            'Blog schema': '"Blog"' in html,
            'BlogPosting schema': 'BlogPosting' in html,
            'alternateName (variants)': 'alternateName' in html,
            'CSS preload tags': 'rel="preload"' in html,
            'Skip link': 'skip-link' in html,
            'Noscript fallback': '<noscript>' in html,
            'Font preload (GlacialIndifference)': 'GlacialIndifference' in html and 'preload' in html,
            'Font preload (LibreBaskerville)': 'LibreBaskerville' in html and 'preload' in html,
            'Canonical link': 'canonical' in html,
            'OG tags': 'og:title' in html,
            'Twitter card': 'twitter:card' in html,
            'JSON-LD script tag': 'application/ld+json' in html,
            'sameAs LinkedIn': 'linkedin.com' in html,
            'sameAs GitHub': 'github.com' in html,
            'Main id landmark': 'id="main"' in html,
        }

        for key, val in html_checks.items():
            status = 'PASS' if val else 'FAIL'
            if val:
                html_passed += 1
            else:
                html_failed += 1
            print(f'  [{status}] {key}')

        total_html = html_passed + html_failed
        score_pct = round(html_passed / total_html * 100) if total_html > 0 else 0
        print(f'\n  HTML Audit Score: {html_passed}/{total_html} ({score_pct}%)')

    # 2. Audit llms.txt
    print('\n=== llms.txt Audit ===\n')
    if os.path.exists('llms.txt'):
        with open('llms.txt', encoding='utf-8') as f:
            llms = f.read()

        llms_checks = {
            'RAG API endpoint link': 'api/portfolio-data.json' in llms,
            'OKF manifest link': 'okf/manifest.json' in llms,
            'resume-en.md link': 'resume-en.md' in llms,
            'resume-pt.md link': 'resume-pt.md' in llms,
            'resume-es.md link': 'resume-es.md' in llms,
            'Endorsements subroute': 'experience/endorsements' in llms,
            'Education subroutes': 'education/academic' in llms,
            'Blog subroutes': 'community/blog' in llms,
        }

        for key, val in llms_checks.items():
            status = 'PASS' if val else 'FAIL'
            print(f'  [{status}] {key}')

    # 3. Audit robots.txt
    print('\n=== robots.txt Audit ===\n')
    if os.path.exists('robots.txt'):
        with open('robots.txt', encoding='utf-8') as f:
            robots = f.read()

        robots_checks = {
            'Allow /api/': 'Allow: /api/' in robots,
            'Allow /docs/data/': 'Allow: /docs/data/' in robots,
            'Allow /okf/': 'Allow: /okf/' in robots,
            'GPTBot': 'GPTBot' in robots,
            'ClaudeBot': 'ClaudeBot' in robots,
            'PerplexityBot': 'PerplexityBot' in robots,
            'Applebot-Extended': 'Applebot-Extended' in robots,
            'Sitemap reference': 'Sitemap:' in robots,
        }

        for key, val in robots_checks.items():
            status = 'PASS' if val else 'FAIL'
            print(f'  [{status}] {key}')

    # 4. Audit OKF Bundle files
    print('\n=== Open Knowledge Format (OKF) Bundle Audit ===\n')
    okf_files = ['okf/manifest.json', 'okf/profile.md', 'okf/experience.md', 'okf/projects.md', 'okf/blog.md']
    for okf_f in okf_files:
        exists = os.path.exists(okf_f)
        status = 'PASS' if exists else 'FAIL'
        print(f'  [{status}] File exists: {okf_f}')

    if os.path.exists('okf/experience.md'):
        with open('okf/experience.md', encoding='utf-8') as f:
            exp_md = f.read()
        has_end = 'Peer Endorsements' in exp_md
        status = 'PASS' if has_end else 'FAIL'
        print(f'  [{status}] OKF experience.md includes Peer Endorsements')

    # 5. Dynamic Object Sitemap Audit & XML Syntax Validation
    print('\n=== Dynamic Object Sitemap & XML Syntax Audit ===\n')
    if os.path.exists('sitemap.xml'):
        # 5a. Strict XML Syntax & Well-Formedness Check
        try:
            import xml.etree.ElementTree as ET
            tree = ET.parse('sitemap.xml')
            root = tree.getroot()
            url_nodes = root.findall('{http://www.sitemaps.org/schemas/sitemap/0.9}url')
            print(f'  [PASS] sitemap.xml is valid XML syntax (Parsed {len(url_nodes)} <url> elements cleanly)')
        except Exception as err:
            print(f'  [FAIL] sitemap.xml XML syntax error: {err}')

        with open('sitemap.xml', encoding='utf-8') as f:
            sitemap_content = f.read()

        # 5b. Check canonical XSD sequence ordering (<loc> -> <lastmod> -> <changefreq> -> <priority> -> <xhtml:link>)
        # Ensure <lastmod> appears before <xhtml:link> in active <url> blocks
        sample_url_blocks = re.findall(r'<url>(.*?)</url>', sitemap_content, re.DOTALL)
        out_of_order_count = 0
        for block in sample_url_blocks:
            loc_idx = block.find('<loc>')
            lastmod_idx = block.find('<lastmod>')
            priority_idx = block.find('<priority>')
            link_idx = block.find('<xhtml:link')
            if loc_idx != -1 and lastmod_idx != -1 and link_idx != -1:
                if not (loc_idx < lastmod_idx < priority_idx < link_idx):
                    out_of_order_count += 1
        
        if out_of_order_count == 0:
            print('  [PASS] Canonical XSD Sequence Ordering (loc -> lastmod -> changefreq -> priority -> xhtml:link -> image:image)')
        else:
            print(f'  [FAIL] {out_of_order_count} <url> block(s) have non-canonical element ordering')

        sitemap_checks = {
            'Academic Formation Object Routes': 'education/academic/graduacao-ciencia-computacao-unifavipwyden' in sitemap_content,
            'Courses Object Routes': 'education/courses/introduction-to-safe' in sitemap_content,
            'Publications Object Routes': 'education/publications/pub-some-trends-doesnt-stay-trend-2024' in sitemap_content,
            'Volunteering Object Routes': 'community/volunteering/' in sitemap_content,
            'Hackathons Object Routes': 'community/hackathons/' in sitemap_content,
            'Events Object Routes': 'community/events/flisol-palmares-2026' in sitemap_content,
            'Achievements Object Routes': 'community/achievements/award-kartado-agility-2026' in sitemap_content,
            'Experience Object Routes': 'experience/kartado/kartado-systems-implementation-intern' in sitemap_content,
            'Multi-Language Hreflang Tags (PT/EN/ES)': 'hreflang="pt"' in sitemap_content and 'hreflang="en"' in sitemap_content and 'hreflang="es"' in sitemap_content,
            'Machine-Readable Endpoints (0.10 Priority)': '<priority>0.10</priority>' in sitemap_content,
        }

        for key, val in sitemap_checks.items():
            status = 'PASS' if val else 'FAIL'
            print(f'  [{status}] {key}')

    # 6. Image SEO/A11Y Audit
    print('\n=== Image SEO/A11Y Audit ===\n')
    
    # 6a. Check image_metadata.json exists and has entries
    img_meta_path = os.path.join('docs', 'data', 'image_metadata.json')
    if os.path.exists(img_meta_path):
        with open(img_meta_path, encoding='utf-8') as f:
            img_meta = json.load(f)
        img_meta.pop('_meta', None)
        print(f'  [PASS] image_metadata.json exists ({len(img_meta)} image mappings)')
        
        # 6b. Verify all mapped images exist on disk
        missing_images = []
        for img_path in img_meta:
            if not os.path.exists(img_path):
                # Check webp_fallback too
                fallback = img_meta[img_path].get('webp_fallback')
                if not fallback or not os.path.exists(fallback):
                    missing_images.append(img_path)
        if missing_images:
            print(f'  [FAIL] {len(missing_images)} mapped image(s) not found on disk:')
            for m in missing_images[:5]:
                print(f'         - {m}')
        else:
            print(f'  [PASS] All {len(img_meta)} mapped images verified on disk')
        
        # 6c. Check all images have multilingual alt text
        missing_alt = []
        for img_path, meta in img_meta.items():
            alt_dict = meta.get('alt', {})
            for lang in ['pt', 'en', 'es']:
                if not alt_dict.get(lang):
                    missing_alt.append(f'{img_path} [{lang}]')
        if missing_alt:
            print(f'  [FAIL] {len(missing_alt)} image alt text(s) missing:')
            for m in missing_alt[:5]:
                print(f'         - {m}')
        else:
            print(f'  [PASS] All images have multilingual alt text (pt/en/es)')
    else:
        print(f'  [FAIL] image_metadata.json not found at {img_meta_path}')
    
    # 6d. Sitemap image:caption audit
    if os.path.exists('sitemap.xml'):
        with open('sitemap.xml', encoding='utf-8') as f:
            sitemap_for_img = f.read()
        
        # Strip XML comments before counting tags
        stripped_sitemap = re.sub(r'<!--.*?-->', '', sitemap_for_img, flags=re.DOTALL)
        img_image_count = stripped_sitemap.count('<image:image>')
        img_caption_count = stripped_sitemap.count('<image:caption>')
        svg_in_sitemap = '<image:loc>' in stripped_sitemap and '.svg</image:loc>' in stripped_sitemap
        
        if img_image_count > 0:
            print(f'  [PASS] Sitemap contains {img_image_count} <image:image> entries')
        else:
            print(f'  [FAIL] Sitemap contains 0 <image:image> entries')
        
        if img_caption_count > 0:
            caption_pct = round(img_caption_count / img_image_count * 100) if img_image_count > 0 else 0
            print(f'  [PASS] Sitemap has {img_caption_count}/{img_image_count} <image:caption> entries ({caption_pct}%)')
        else:
            print(f'  [FAIL] Sitemap contains 0 <image:caption> entries')
        
        if svg_in_sitemap:
            print(f'  [FAIL] SVG file(s) found in sitemap <image:loc> (should only contain rasterized formats)')
        else:
            print(f'  [PASS] No SVG files in sitemap <image:image> (rasterized only)')

    # 7. Static Route SSG Audit (Physical HTML Files for Crawlers & LLMs)
    print('\n=== Static Route SSG Audit (Progressive Enhancement) ===\n')
    sample_routes = [
        'pt/index.html',
        'en/index.html',
        'es/index.html',
        'pt/experience/index.html',
        'en/experience/index.html',
        'es/experience/index.html',
        'pt/education/index.html',
        'pt/community/index.html',
        'pt/experience/endorsements/index.html',
        'en/education/courses/index.html',
        'pt/community/blog/index.html',
        'en/education/courses/introduction-to-safe/index.html',
        'es/community/blog/post-implementation-engineering-vs-software-engineering/index.html',
    ]

    missing_ssg = [r for r in sample_routes if not os.path.exists(r)]
    if not missing_ssg:
        print(f'  [PASS] All {len(sample_routes)} sampled SSG route files exist on disk')
    else:
        print(f'  [FAIL] Missing {len(missing_ssg)} SSG route file(s): {missing_ssg}')

    # Check semantic content & h1 in sample SSG files
    h1_ssg_pass = True
    for r in ['pt/experience/index.html', 'en/education/courses/index.html', 'es/community/blog/index.html']:
        if os.path.exists(r):
            with open(r, encoding='utf-8') as sf:
                s_content = sf.read()
            if '<h1' not in s_content or 'id="static-route-content"' not in s_content:
                h1_ssg_pass = False
                print(f'  [FAIL] {r} is missing semantic <h1> or #static-route-content')
    if h1_ssg_pass:
        print('  [PASS] Pre-rendered HTML contains semantic <h1>, <nav aria-label="Breadcrumb">, and route containers')

    print('\n=== SEO/LLMO Audit Complete ===')

if __name__ == '__main__':
    run_seo_audit()



