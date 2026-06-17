import os
import re

base_dir = r"c:\Users\wilso\OneDrive\Desktop\Projects\minty-lime_2"

aos_css = '<link href="https://unpkg.com/aos@2.3.1/dist/aos.css" rel="stylesheet">'
aos_js = '<script src="https://unpkg.com/aos@2.3.1/dist/aos.js"></script><script>AOS.init({duration: 800, once: true, offset: 50});</script>'

def process_html_file(filepath):
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            html = f.read()
    except Exception as e:
        print(f"Error reading {filepath}: {e}")
        return

    # 1. Inject CSS
    if 'aos.css' not in html:
        html = html.replace('</head>', f'{aos_css}\n</head>')

    # 2. Inject JS
    if 'aos.js' not in html:
        html = html.replace('</body>', f'{aos_js}\n</body>')

    # 3. Inject animations
    # We want to animate widget containers.
    # To prevent animating the header/footer, we can skip replacing inside `<header ...>` and `<footer ...>`
    # But for a simpler approach: we'll just inject `data-aos="fade-up"` to `class="elementor-widget-container"` 
    # except if the file is header or footer.
    
    # We will use regex to find specific elementor widgets:
    # Heading: elementor-widget-heading
    # Text: elementor-widget-text-editor
    # Icon box: elementor-widget-icon-box
    # Image: elementor-widget-image
    # Button: elementor-widget-button
    
    # Find all widgets
    widget_pattern = re.compile(r'(class="elementor-element\s+elementor-element-[a-z0-9]+\s+[^"]*elementor-widget-(?:heading|text-editor|icon-box|image|button|jet-listing-grid)[^"]*"\s+data-id="[a-z0-9]+"\s+data-element_type="widget"[^>]*>)\s*<div\s+class="elementor-widget-container"(?!\s+data-aos)', re.IGNORECASE)
    
    count = 0
    def repl(match):
        nonlocal count
        count += 1
        widget_class = match.group(1)
        if 'icon-box' in widget_class or 'image' in widget_class:
            return match.group(1) + '\n\t\t\t\t<div class="elementor-widget-container" data-aos="zoom-in" data-aos-delay="100">'
        elif 'heading' in widget_class:
            return match.group(1) + '\n\t\t\t\t<div class="elementor-widget-container" data-aos="fade-down">'
        else:
            return match.group(1) + '\n\t\t\t\t<div class="elementor-widget-container" data-aos="fade-up" data-aos-delay="50">'

    new_html = widget_pattern.sub(repl, html)

    if html != new_html or 'aos.css' in html: # write if changed
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_html)
        print(f"Updated {filepath} with {count} animations.")

for root, dirs, files in os.walk(base_dir):
    if 'vendor' in root or '.git' in root or 'wp-json' in root:
        continue
    for file in files:
        if file.endswith('.html'):
            filepath = os.path.join(root, file)
            process_html_file(filepath)

print("AOS global injection complete!")
