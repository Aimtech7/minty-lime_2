import os
import re

base_dir = r'c:\Users\wilso\OneDrive\Desktop\Projects\minty-lime_2'
whatwedo_index = os.path.join(base_dir, 'what-we-do', 'index.html')

with open(whatwedo_index, 'r', encoding='utf-8') as f:
    content = f.read()

# We need to find the column containing the "Digital Marketing" image box, so we can duplicate the column for Consulting and UI/UX
# Wait, let's look for the elementor-column that contains Digital Marketing.
pattern = r'(<div class="elementor-column elementor-col-25 elementor-top-column elementor-element elementor-element-[a-z0-9]+".*?Digital Marketing.*?</div>\s*</div>\s*</div>\s*</div>)'
matches = list(re.finditer(pattern, content, re.DOTALL))

if matches:
    print("Found Digital Marketing column!")
    dm_col = matches[0].group(1)
    
    # Create Consulting column
    import uuid
    def repl(m):
        return f'{uuid.uuid4().hex[:7]}'
    
    consulting_col = dm_col.replace('Digital Marketing', 'Consulting')
    consulting_col = consulting_col.replace('digital-marketing', 'consulting')
    # Change the widget IDs so they don't conflict
    consulting_col = re.sub(r'elementor-element-([a-z0-9]{7})', lambda m: f'elementor-element-{uuid.uuid4().hex[:7]}', consulting_col)
    consulting_col = re.sub(r'data-id="([a-z0-9]{7})"', lambda m: f'data-id="{uuid.uuid4().hex[:7]}"', consulting_col)
    
    # Create UI/UX column
    uiux_col = dm_col.replace('Digital Marketing', 'UI / UX')
    uiux_col = uiux_col.replace('digital-marketing', 'ui-ux')
    uiux_col = re.sub(r'elementor-element-([a-z0-9]{7})', lambda m: f'elementor-element-{uuid.uuid4().hex[:7]}', uiux_col)
    uiux_col = re.sub(r'data-id="([a-z0-9]{7})"', lambda m: f'data-id="{uuid.uuid4().hex[:7]}"', uiux_col)
    
    # Inject both after the digital marketing column
    new_content = content[:matches[0].end()] + "\n" + consulting_col + "\n" + uiux_col + content[matches[0].end():]
    
    with open(whatwedo_index, 'w', encoding='utf-8') as f:
        f.write(new_content)
    print("Injected Consulting and UI/UX into what-we-do/index.html grid")
else:
    print("Could not find Digital Marketing column.")
