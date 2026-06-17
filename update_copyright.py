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

            # Replace 2024 with 2026
            if '2024' in content:
                content = content.replace('2024', '2026')
                modified = True

            # Replace 2025 with 2026
            if '2025' in content:
                content = content.replace('2025', '2026')
                modified = True

            if modified:
                with open(filepath, 'w', encoding='utf-8') as f:
                    f.write(content)
                count += 1
                print(f'Updated copyright in: {filepath}')

print(f'Total files updated: {count}')
