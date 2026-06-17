import os

directory = r'c:\Users\wilso\OneDrive\Desktop\Projects\minty-lime_2'

count = 0
for root, dirs, files in os.walk(directory):
    for file in files:
        if file.endswith(".html"):
            filepath = os.path.join(root, file)
            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()

            modified = False

            # Replace old email
            old_email = 'aimtechnology037@gmail.com'
            new_email = 'aimtechnologies037@gmail.com'
            if old_email in content:
                content = content.replace(old_email, new_email)
                modified = True
            
            # Replace old phone numbers
            old_phone_string1 = '0732374557/+2547058239'
            new_phone_string = '0732374557 / 0705823941'
            if old_phone_string1 in content:
                content = content.replace(old_phone_string1, new_phone_string)
                modified = True

            # Also replace any other variations if they exist
            # e.g., if there's href="tel:0732374557" we can leave it or update it. I'll leave the href as is, since 0732374557 is correct.
            
            # Update WhatsApp link
            old_wa = 'wa.me/254700000000'
            new_wa = 'wa.me/254705823941'
            if old_wa in content:
                content = content.replace(old_wa, new_wa)
                modified = True

            if modified:
                with open(filepath, 'w', encoding='utf-8') as f:
                    f.write(content)
                count += 1

print(f"Updated contact details in {count} files")
