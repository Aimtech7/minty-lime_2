import os
import re
import uuid

base_dir = r'c:\Users\wilso\OneDrive\Desktop\Projects\minty-lime_2'
whatwedo_index = os.path.join(base_dir, 'what-we-do', 'index.html')

with open(whatwedo_index, 'r', encoding='utf-8') as f:
    content = f.read()

pattern = r'(<div class="jet-listing-grid__item jet-listing-dynamic-post-641".*?Digital Marketing.*?</div></div>)(<div class="jet-listing-grid__item jet-listing-dynamic-post-639")'
matches = list(re.finditer(pattern, content, re.DOTALL))

if matches:
    print("Found Digital Marketing grid item!")
    dm_item = matches[0].group(1)
    
    # Create Consulting item
    consulting_item = dm_item.replace('Digital Marketing', 'Consulting')
    consulting_item = consulting_item.replace('digital-marketing', 'consulting')
    # Change post id slightly to be unique
    consulting_item = consulting_item.replace('641', '999')
    consulting_item = re.sub(r'elementor-element-([a-z0-9]{7})', lambda m: f'elementor-element-{uuid.uuid4().hex[:7]}', consulting_item)
    consulting_item = re.sub(r'data-id="([a-z0-9]{7})"', lambda m: f'data-id="{uuid.uuid4().hex[:7]}"', consulting_item)
    
    # Create UI/UX item
    uiux_item = dm_item.replace('Digital Marketing', 'UI / UX')
    uiux_item = uiux_item.replace('digital-marketing', 'ui-ux')
    uiux_item = uiux_item.replace('641', '998')
    uiux_item = re.sub(r'elementor-element-([a-z0-9]{7})', lambda m: f'elementor-element-{uuid.uuid4().hex[:7]}', uiux_item)
    uiux_item = re.sub(r'data-id="([a-z0-9]{7})"', lambda m: f'data-id="{uuid.uuid4().hex[:7]}"', uiux_item)
    
    # Inject both after the digital marketing item
    new_content = content[:matches[0].end(1)] + "\n" + consulting_item + "\n" + uiux_item + content[matches[0].start(2):]
    
    with open(whatwedo_index, 'w', encoding='utf-8') as f:
        f.write(new_content)
    print("Successfully injected Consulting and UI/UX into the what-we-do grid.")
else:
    print("Could not find Digital Marketing grid item.")
