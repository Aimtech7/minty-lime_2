import os
import re

directory = r'c:\Users\wilso\OneDrive\Desktop\Projects\minty-lime_2'

css_links = """
<link href="/assets/css/whatsapp.css" rel="stylesheet"/>
<link href="/assets/css/transitions.css" rel="stylesheet"/>
"""

js_links = """
<script src="/assets/js/page-transitions.js"></script>
"""

whatsapp_html = """
<!-- LIVE WHATSAPP INTEGRATION -->
<a id="whatsapp-float" href="https://wa.me/254700000000?text=Hello%20AimTech%2C%20I%20would%20like%20to%20inquire%20about%20your%20services." target="_blank" rel="noopener noreferrer">
    <i class="fab fa-whatsapp"></i>
</a>
"""

og_tags = """
<meta property="og:title" content="AimTech & Aimnex Tech Ventures - Premium Technology Consulting" />
<meta property="og:description" content="Accelerating digital transformation through innovative software, robust cybersecurity, and intelligent AI solutions." />
<meta property="og:type" content="website" />
"""

count = 0
for root, dirs, files in os.walk(directory):
    for file in files:
        if file.endswith(".html"):
            filepath = os.path.join(root, file)
            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()

            modified = False

            # Inject CSS and OG tags in head
            if '/assets/css/whatsapp.css' not in content:
                content = content.replace('</head>', css_links + '</head>')
                modified = True
            
            if 'property="og:title"' not in content:
                content = content.replace('</head>', og_tags + '</head>')
                modified = True

            # Inject WhatsApp HTML and JS before closing body
            if 'id="whatsapp-float"' not in content:
                content = content.replace('</body>', whatsapp_html + js_links + '</body>')
                modified = True
            
            # Global image lazy loading (skip if already has it)
            # Find all <img> tags without loading attribute
            img_pattern = re.compile(r'<img(?![^>]*loading=)([^>]+)>')
            if img_pattern.search(content):
                content = img_pattern.sub(r'<img loading="lazy"\1>', content)
                modified = True

            if modified:
                with open(filepath, 'w', encoding='utf-8') as f:
                    f.write(content)
                count += 1

print(f"Injected global Phase 1 features into {count} files")
