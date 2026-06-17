import os
import shutil
import re

base_dir = r'c:\Users\wilso\OneDrive\Desktop\Projects\minty-lime_2'

# 1. Create consulting folder if it doesn't exist
consulting_dir = os.path.join(base_dir, 'what-we-do', 'consulting')
if not os.path.exists(consulting_dir):
    shutil.copytree(os.path.join(base_dir, 'what-we-do', 'digital-marketing'), consulting_dir)
    consulting_index = os.path.join(consulting_dir, 'index.html')
    with open(consulting_index, 'r', encoding='utf-8') as f:
        content = f.read()
    content = content.replace('Digital Marketing', 'Consulting')
    content = content.replace('digital-marketing', 'consulting')
    with open(consulting_index, 'w', encoding='utf-8') as f:
        f.write(content)

count = 0
for root, dirs, files in os.walk(base_dir):
    for file in files:
        if file.endswith('.html'):
            filepath = os.path.join(root, file)
            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()
            
            modified = False
            
            # Sub-item links
            pattern_sub = r'(<li class=\"menu-item menu-item-type-post_type menu-item-object-what-we-do[^>]*>\s*<a href=\"([^\"]*)digital-marketing/index\.html\" class=\"elementor-sub-item\"([^>]*)>Digital Marketing</a>\s*</li>)'
            
            def replace_sub(match):
                orig = match.group(1)
                prefix = match.group(2)
                attrs = match.group(3)
                cls_attr = 'class="menu-item menu-item-type-post_type menu-item-object-what-we-do menu-item-999"'
                return orig + f'\n\t<li {cls_attr}><a href="{prefix}consulting/index.html" class="elementor-sub-item"{attrs}>Consulting</a></li>\n\t<li {cls_attr}><a href="{prefix}ui-ux/index.html" class="elementor-sub-item"{attrs}>UI / UX</a></li>'
            
            new_content = re.sub(pattern_sub, replace_sub, content)
            if new_content != content:
                modified = True
                content = new_content
                
            # Elementor items
            pattern_item = r'(<li class=\"menu-item menu-item-type-post_type menu-item-object-what-we-do[^>]*>\s*<a href=\"([^\"]*)digital-marketing/index\.html\" class=\"elementor-item\"([^>]*)>Digital Marketing</a>\s*</li>)'
            
            def replace_item(match):
                orig = match.group(1)
                prefix = match.group(2)
                attrs = match.group(3)
                cls_attr = 'class="menu-item menu-item-type-post_type menu-item-object-what-we-do menu-item-999"'
                return orig + f'\n<li {cls_attr}><a href="{prefix}consulting/index.html" class="elementor-item"{attrs}>Consulting</a></li>\n<li {cls_attr}><a href="{prefix}ui-ux/index.html" class="elementor-item"{attrs}>UI / UX</a></li>'
            
            new_content = re.sub(pattern_item, replace_item, content)
            if new_content != content:
                modified = True
                content = new_content
            
            if modified:
                with open(filepath, 'w', encoding='utf-8') as f:
                    f.write(content)
                count += 1

print(f'Updated navigation in {count} files')
