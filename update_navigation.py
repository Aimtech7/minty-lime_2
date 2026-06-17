import os
import re

base_dir = r'c:\Users\wilso\OneDrive\Desktop\Projects\minty-lime_2'
count = 0

new_dropdown_html = """<a class="elementor-item" href="what-we-do/index.html">
    Services
   </a>
   <ul class="sub-menu elementor-nav-menu--dropdown">
    <li class="menu-item menu-item-type-post_type menu-item-object-what-we-do">
     <a class="elementor-sub-item" href="what-we-do/index.html#software">
      Software Development
     </a>
    </li>
    <li class="menu-item menu-item-type-post_type menu-item-object-what-we-do">
     <a class="elementor-sub-item" href="what-we-do/index.html#mobile">
      Mobile Development
     </a>
    </li>
    <li class="menu-item menu-item-type-post_type menu-item-object-what-we-do">
     <a class="elementor-sub-item" href="what-we-do/index.html#cybersecurity">
      Cybersecurity
     </a>
    </li>
    <li class="menu-item menu-item-type-post_type menu-item-object-what-we-do">
     <a class="elementor-sub-item" href="what-we-do/index.html#ai">
      AI &amp; Automation
     </a>
    </li>
    <li class="menu-item menu-item-type-post_type menu-item-object-what-we-do">
     <a class="elementor-sub-item" href="what-we-do/index.html#consulting">
      Consulting
     </a>
    </li>
    <li class="menu-item menu-item-type-post_type menu-item-object-what-we-do">
     <a class="elementor-sub-item" href="what-we-do/index.html">
      All Services
     </a>
    </li>
   </ul>"""

for root, dirs, files in os.walk(base_dir):
    for file in files:
        if file.endswith('.html'):
            filepath = os.path.join(root, file)
            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()
            
            modified = False
            
            # Inject CSS link if not present
            link_tag = '<link href="/assets/css/premium-navigation.css" rel="stylesheet"/>\n'
            if link_tag not in content and '</head>' in content:
                content = content.replace('</head>', link_tag + '</head>')
                modified = True
                
            # Find the "What we do" nav item and replace its inner HTML.
            # Using regex to find the specific block starting from <a class="elementor-item" href="what-we-do/index.html">
            # down to </ul> inside the menu-item-458 or similar.
            
            # The structure is:
            # <a class="elementor-item" href="what-we-do/index.html"> What we do </a> <ul class="sub-menu elementor-nav-menu--dropdown"> ... </ul>
            # We can use regex to replace it.
            pattern = re.compile(r'<a[^>]*href="[^"]*what-we-do[^"]*"[^>]*>\s*What we do\s*</a>\s*<ul class="sub-menu elementor-nav-menu--dropdown">.*?</ul>', re.DOTALL)
            
            if pattern.search(content):
                content = pattern.sub(new_dropdown_html, content)
                modified = True
                
            if modified:
                with open(filepath, 'w', encoding='utf-8') as f:
                    f.write(content)
                count += 1

print(f'Updated navigation and injected CSS in {count} files')
