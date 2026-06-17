import os
base_dir = r'c:\Users\wilso\OneDrive\Desktop\Projects\minty-lime_2'
count = 0
for root, dirs, files in os.walk(base_dir):
    for f in files:
        if f.endswith('.html'):
            path = os.path.join(root, f)
            try:
                with open(path, 'r', encoding='utf-8') as file:
                    content = file.read()
            except:
                continue
            if '>>' in content and 'data-aos' in content:
                content = content.replace('>>', '>')
                with open(path, 'w', encoding='utf-8') as file:
                    file.write(content)
                count += 1
print(f'Fixed double angle brackets in {count} files.')
