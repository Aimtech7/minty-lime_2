import os

base_dir = r'c:\Users\wilso\OneDrive\Desktop\Projects\minty-lime_2'
count = 0
for root, dirs, files in os.walk(base_dir):
    for file in files:
        if file.endswith('.html'):
            filepath = os.path.join(root, file)
            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()
            
            link_tag = '<link href="/assets/css/premium-animations.css" rel="stylesheet"/>\n'
            # If we're deep in a subdirectory, the absolute path starts with / which is fine since the server serves from root.
            if link_tag not in content and '</head>' in content:
                content = content.replace('</head>', link_tag + '</head>')
                with open(filepath, 'w', encoding='utf-8') as f:
                    f.write(content)
                count += 1

print(f'Injected CSS into {count} files')
