import os

directory = r'c:\Users\wilso\OneDrive\Desktop\Projects\minty-lime_2'

chatbot_html = """
<!-- AIMTECH AI CHATBOT -->
<div id="aimtech-chatbot-widget" style="position: fixed; bottom: 80px; right: 20px; z-index: 9999;">
    <!-- Chat Button -->
    <button id="chatbot-toggle-btn" style="background: #0b1320; border: 2px solid #9ECC3B; width: 60px; height: 60px; border-radius: 50%; cursor: pointer; display: flex; align-items: center; justify-content: center; box-shadow: 0 5px 15px rgba(0,0,0,0.2); transition: all 0.3s ease;">
        <i class="fas fa-robot" style="color: #9ECC3B; font-size: 24px;"></i>
    </button>

    <!-- Chat Window -->
    <div id="chatbot-window" style="display: none; position: absolute; bottom: 80px; right: 0; width: 350px; height: 500px; background: #fff; border-radius: 12px; box-shadow: 0 10px 30px rgba(0,0,0,0.15); overflow: hidden; flex-direction: column; border: 1px solid rgba(0,0,0,0.1);">
        <!-- Header -->
        <div style="background: #0b1320; padding: 15px 20px; display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #9ECC3B;">
            <div style="display: flex; align-items: center; gap: 10px;">
                <i class="fas fa-robot" style="color: #9ECC3B; font-size: 20px;"></i>
                <h3 style="color: #fff; margin: 0; font-size: 1.1rem; font-family: sans-serif;">AimTech AI</h3>
            </div>
            <button id="chatbot-close-btn" style="background: none; border: none; color: #fff; cursor: pointer; font-size: 16px;">
                <i class="fas fa-times"></i>
            </button>
        </div>

        <!-- Messages -->
        <div id="ai-chatbot-messages-container" style="flex-grow: 1; padding: 20px; background: #f5f5f5; overflow-y: auto;">
            <div id="ai-chatbot-messages">
                <div class="chat-message ai-message">
                    Hello! I am Aimtech's AI Assistant. How can I help you today?
                </div>
            </div>
        </div>

        <!-- Input Area -->
        <div style="padding: 15px; background: #fff; border-top: 1px solid #eee; display: flex; gap: 10px;">
            <input id="ai-chat-input" placeholder="Type your message..." style="flex-grow: 1; padding: 10px; border: 1px solid #ddd; border-radius: 20px; outline: none; font-size: 0.9rem; font-family: sans-serif;" type="text"/>
            <button id="ai-chat-send" style="background: #9ECC3B; border: none; width: 40px; height: 40px; border-radius: 50%; color: #0b1320; cursor: pointer; display: flex; align-items: center; justify-content: center;">
                <i class="fas fa-paper-plane"></i>
            </button>
        </div>
    </div>
</div>
"""

count = 0
for root, dirs, files in os.walk(directory):
    for file in files:
        if file.endswith(".html"):
            filepath = os.path.join(root, file)
            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()

            modified = False

            if 'id="aimtech-chatbot-widget"' not in content:
                content = content.replace('</body>', chatbot_html + '\n</body>')
                modified = True

            if modified:
                with open(filepath, 'w', encoding='utf-8') as f:
                    f.write(content)
                count += 1

print(f"Injected Chatbot HTML widget into {count} files")
