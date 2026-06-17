import os
import re

base_dir = r'c:\Users\wilso\OneDrive\Desktop\Projects\minty-lime_2'
count = 0

for root, dirs, files in os.walk(base_dir):
    for file in files:
        if file.endswith('.html'):
            filepath = os.path.join(root, file)
            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()
            
            modified = False
            
            # Replace aimtech-logo.png with aimtech.dev.jpg
            if '/assets/images/aimtech-logo.png' in content:
                content = content.replace('/assets/images/aimtech-logo.png', '/aimtech.dev.jpg')
                modified = True
            
            # Replace aimnex-logo.png with aimnex_logo1.jpeg
            if '/assets/images/aimnex-logo.png' in content:
                content = content.replace('/assets/images/aimnex-logo.png', '/aimnex_logo1.jpeg')
                modified = True
            
            if modified:
                with open(filepath, 'w', encoding='utf-8') as f:
                    f.write(content)
                count += 1
                print(f'Updated logos in: {filepath}')

print(f'Total files updated: {count}')
