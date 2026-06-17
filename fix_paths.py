import os
import re

directory = r'c:\Users\wilso\OneDrive\Desktop\Projects\minty-lime_2'

count = 0
for root, dirs, files in os.walk(directory):
    for file in files:
        if file.endswith(".html"):
            filepath = os.path.join(root, file)
            # Calculate depth relative to root directory
            rel_dir = os.path.relpath(root, directory)
            if rel_dir == '.':
                prefix = './'
            else:
                depth = len(rel_dir.split(os.sep))
                prefix = '../' * depth

            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()

            modified = False

            # Replace specific absolute paths we injected
            paths_to_fix = [
                '/assets/images/austinemakwaka.png',
                '/assets/css/chatbot.css',
                '/assets/js/chatbot.js',
                '/assets/css/whatsapp.css'
            ]

            for p in paths_to_fix:
                if f'src="{p}"' in content or f"src='{p}'" in content or f'href="{p}"' in content or f"href='{p}'" in content:
                    new_path = prefix + p.lstrip('/')
                    content = content.replace(f'src="{p}"', f'src="{new_path}"')
                    content = content.replace(f"src='{p}'", f"src='{new_path}'")
                    content = content.replace(f'href="{p}"', f'href="{new_path}"')
                    content = content.replace(f"href='{p}'", f"href='{new_path}'")
                    modified = True

            if modified:
                with open(filepath, 'w', encoding='utf-8') as f:
                    f.write(content)
                count += 1

print(f"Fixed absolute paths to relative paths in {count} files")
