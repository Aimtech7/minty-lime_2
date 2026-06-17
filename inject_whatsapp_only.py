import os
import re

directory = r'c:\Users\wilso\OneDrive\Desktop\Projects\minty-lime_2'

css_link = '<link href="/assets/css/whatsapp.css" rel="stylesheet"/>'

whatsapp_html = """
<!-- LIVE WHATSAPP INTEGRATION -->
<a id="whatsapp-float" href="https://wa.me/254700000000?text=Hello%20AimTech%2C%20I%20would%20like%20to%20inquire%20about%20your%20services." target="_blank" rel="noopener noreferrer">
    <i class="fab fa-whatsapp"></i>
</a>
"""

count = 0
for root, dirs, files in os.walk(directory):
    for file in files:
        if file.endswith(".html"):
            filepath = os.path.join(root, file)
            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()

            modified = False

            # Inject CSS in head
            if css_link not in content:
                content = content.replace('</head>', css_link + '\n</head>')
                modified = True

            # Inject WhatsApp HTML before closing body
            if 'id="whatsapp-float"' not in content:
                content = content.replace('</body>', whatsapp_html + '\n</body>')
                modified = True

            if modified:
                with open(filepath, 'w', encoding='utf-8') as f:
                    f.write(content)
                count += 1

print(f"Injected WhatsApp into {count} files")
