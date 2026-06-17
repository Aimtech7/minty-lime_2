import os
from bs4 import BeautifulSoup
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

    # Check if AOS is already there
    if 'aos.css' in html or 'aos.js' in html:
        print(f"AOS already exists in {filepath}")
        # Even if it exists, maybe attributes were removed. So we'll re-inject attributes.

    soup = BeautifulSoup(html, 'html.parser')

    # Add AOS CSS to head if not present
    head = soup.find('head')
    if head and 'aos.css' not in str(head):
        head.append(BeautifulSoup(aos_css, 'html.parser'))

    # Add AOS JS to end of body if not present
    body = soup.find('body')
    if body and 'aos.js' not in str(body):
        body.append(BeautifulSoup(aos_js, 'html.parser'))

    # Inject data-aos attributes
    # We want to animate widget containers, but NOT inside the header or footer
    header = soup.find(attrs={"data-elementor-type": "header"})
    footer = soup.find(attrs={"data-elementor-type": "footer"})

    header_widgets = header.find_all(class_='elementor-widget-container') if header else []
    footer_widgets = footer.find_all(class_='elementor-widget-container') if footer else []
    skip_widgets = set(header_widgets + footer_widgets)

    # Animate Headings, Texts, Buttons, Images, Icon Boxes
    target_classes = [
        'elementor-widget-heading',
        'elementor-widget-text-editor',
        'elementor-widget-button',
        'elementor-widget-image',
        'elementor-widget-icon-box',
        'elementor-widget-jet-listing-grid',
        'elementor-widget-jet-listing-dynamic-field'
    ]

    count = 0
    for target_class in target_classes:
        widgets = soup.find_all(class_=target_class)
        for w in widgets:
            if w in skip_widgets or any(parent in skip_widgets for parent in w.parents):
                continue
            
            container = w.find(class_='elementor-widget-container')
            if container:
                # Add data-aos if not already there
                if not container.has_attr('data-aos'):
                    # stagger slightly based on class
                    if target_class == 'elementor-widget-heading':
                        container['data-aos'] = 'fade-down'
                    elif target_class in ['elementor-widget-icon-box', 'elementor-widget-image']:
                        container['data-aos'] = 'zoom-in'
                        container['data-aos-delay'] = '100'
                    else:
                        container['data-aos'] = 'fade-up'
                        container['data-aos-delay'] = '50'
                    count += 1

    # Write back
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(str(soup))
    
    print(f"Injected AOS into {filepath} ({count} animations added)")

# Walk directory
for root, dirs, files in os.walk(base_dir):
    # skip vendor
    if 'vendor' in root or '.git' in root or 'wp-json' in root:
        continue
    for file in files:
        if file.endswith('.html'):
            filepath = os.path.join(root, file)
            process_html_file(filepath)

print("AOS global injection complete!")
