
import os

file_path = r"c:\Users\AIMTECH TSHBA\Desktop\aim22\mintylime.co.ke\wp-content\uploads\elementor\css\post-50.css"

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()
    
index = content.find("https://mintylime.co.ke")
if index != -1:
    start = max(0, index - 50)
    end = min(len(content), index + 150)
    print(f"Context: ...{content[start:end]}...")
else:
    print("Not found")
