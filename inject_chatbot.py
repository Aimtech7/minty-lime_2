import os
import re

directory = r'c:\Users\wilso\OneDrive\Desktop\Projects\minty-lime_2'
css_link = '<link href="/assets/css/chatbot.css" rel="stylesheet"/>\n'
js_link = '<script src="/assets/js/chatbot.js"></script>\n</body>'

count = 0
for root, dirs, files in os.walk(directory):
    for file in files:
        if file.endswith(".html"):
            filepath = os.path.join(root, file)
            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()

            modified = False

            # 1. Add CSS
            if '/assets/css/chatbot.css' not in content:
                content = content.replace('</head>', css_link + '</head>')
                modified = True

            # 2. Add JS
            if '/assets/js/chatbot.js' not in content:
                content = content.replace('</body>', js_link)
                modified = True

            # 3. Add IDs to the chatbot HTML
            # Target the messages scroll container
            scroll_container_pattern = r'(<div style="flex-grow: 1; padding: 20px; background: #f5f5f5; overflow-y: auto;">)'
            if 'id="ai-chatbot-messages-container"' not in content and re.search(scroll_container_pattern, content):
                content = re.sub(scroll_container_pattern, r'<div id="ai-chatbot-messages-container" style="flex-grow: 1; padding: 20px; background: #f5f5f5; overflow-y: auto;">\n<div id="ai-chatbot-messages">', content)
                # also we need to close the inner div before the next sibling.
                # Actually, wait, it's easier to just find the exact static string and replace it.
                modified = True
            
            # The static string for the messages container:
            old_messages_html = """<div style="flex-grow: 1; padding: 20px; background: #f5f5f5; overflow-y: auto;">
<div style="background: #fff; padding: 15px; border-radius: 8px; margin-bottom: 10px; box-shadow: 0 2px 5px rgba(0,0,0,0.05); font-size: 0.9rem; color: #333;">
                Hello! I am Aimtech's AI Assistant. How can I help you today?
            </div>
</div>"""
            new_messages_html = """<div id="ai-chatbot-messages-container" style="flex-grow: 1; padding: 20px; background: #f5f5f5; overflow-y: auto;">
    <div id="ai-chatbot-messages">
        <div class="chat-message ai-message">
            Hello! I am Aimtech's AI Assistant. How can I help you today?
        </div>
    </div>
</div>"""
            if old_messages_html in content:
                content = content.replace(old_messages_html, new_messages_html)
                modified = True
            else:
                # Let's try regex if spacing differs
                old_messages_regex = re.compile(r'<div style="flex-grow: 1; padding: 20px; background: #f5f5f5; overflow-y: auto;">.*?</div>\s*</div>', re.DOTALL)
                if 'id="ai-chatbot-messages-container"' not in content:
                    content = old_messages_regex.sub(new_messages_html, content)
                    modified = True

            # Target the input field
            old_input = '<input placeholder="Type your message..." style="flex-grow: 1; padding: 10px; border: 1px solid #ddd; border-radius: 20px; outline: none; font-size: 0.9rem;" type="text"/>'
            new_input = '<input id="ai-chat-input" placeholder="Type your message..." style="flex-grow: 1; padding: 10px; border: 1px solid #ddd; border-radius: 20px; outline: none; font-size: 0.9rem;" type="text"/>'
            if old_input in content:
                content = content.replace(old_input, new_input)
                modified = True

            # Target the send button
            old_send_btn = '<button style="background: #9ECC3B; border: none; width: 40px; height: 40px; border-radius: 50%; color: #0b1320; cursor: pointer;"><i class="fas fa-paper-plane"></i></button>'
            new_send_btn = '<button id="ai-chat-send" style="background: #9ECC3B; border: none; width: 40px; height: 40px; border-radius: 50%; color: #0b1320; cursor: pointer;"><i class="fas fa-paper-plane"></i></button>'
            if old_send_btn in content:
                content = content.replace(old_send_btn, new_send_btn)
                modified = True


            if modified:
                with open(filepath, 'w', encoding='utf-8') as f:
                    f.write(content)
                count += 1

print(f"Injected Chatbot logic and IDs into {count} files")
