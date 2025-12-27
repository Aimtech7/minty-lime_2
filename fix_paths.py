
import os

def fix_file(file_path, replacements):
    try:
        if not os.path.exists(file_path):
            print(f"Skipping {file_path} (not found)")
            return
        
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        original_content = content
        for old, new in replacements:
            content = content.replace(old, new)
        
        if content != original_content:
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(content)
            print(f"Updated {file_path}")
        else:
            print(f"No changes for {file_path}")
            
    except Exception as e:
        print(f"Error processing {file_path}: {e}")

# Fix Google Fonts CSS
google_fonts_dir = r"wp-content/uploads/elementor/google-fonts/css"
if os.path.exists(google_fonts_dir):
    for filename in os.listdir(google_fonts_dir):
        if filename.endswith(".css"):
            fix_file(os.path.join(google_fonts_dir, filename), [
                ("http://mintylime.co.ke/wp-content/uploads/elementor/google-fonts/fonts/", "../fonts/"),
                ("https://mintylime.co.ke/wp-content/uploads/elementor/google-fonts/fonts/", "../fonts/")
            ])

# Fix Elementor CSS
elementor_css_dir = r"wp-content/uploads/elementor/css"
if os.path.exists(elementor_css_dir):
    for filename in os.listdir(elementor_css_dir):
        if filename.endswith(".css"):
            fix_file(os.path.join(elementor_css_dir, filename), [
                ("https://mintylime.co.ke/wp-content/uploads/", "../../"),
                ("http://mintylime.co.ke/wp-content/uploads/", "../../")
            ])

print("Done.")
