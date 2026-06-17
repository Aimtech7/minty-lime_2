import os

base_dir = r'c:\Users\wilso\OneDrive\Desktop\Projects\minty-lime_2'
count = 0

for root, dirs, files in os.walk(base_dir):
    for file in files:
        if file.endswith('.html'):
            filepath = os.path.join(root, file)
            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()
            
            old_init = '<script>AOS.init({duration: 800, once: true, offset: 50});</script>'
            new_init = '<script>AOS.init({duration: 1000, once: true, offset: 50, easing: "ease-out-cubic"});</script>'
            
            if old_init in content:
                content = content.replace(old_init, new_init)
                with open(filepath, 'w', encoding='utf-8') as f:
                    f.write(content)
                count += 1
                
print(f'Updated AOS init in {count} files')
