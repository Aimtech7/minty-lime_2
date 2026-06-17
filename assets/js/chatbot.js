class AimtechChatbot {
    constructor() {
        this.inputField = document.getElementById('ai-chat-input');
        this.sendButton = document.getElementById('ai-chat-send');
        this.messagesContainer = document.getElementById('ai-chatbot-messages');
        this.scrollContainer = document.getElementById('ai-chatbot-messages-container');
        this.typingIndicatorId = 'ai-typing-indicator';
        
        this.knowledgeBase = {
            "services": "AimTech & Aimnex Tech Ventures offers comprehensive services including Software Development, Web Development, Mobile Development, Cybersecurity, AI Solutions, Cloud Solutions, Business Automation, Digital Marketing, and Branding & Design.",
            "software": "Our Software Development services focus on building scalable, high-performance web and enterprise applications tailored to your business needs.",
            "cybersecurity": "We offer top-tier Cybersecurity services including Penetration Testing, Vulnerability Assessments, Security Audits, and robust network security reviews.",
            "contact": "You can contact AimTech by emailing us at hello@aimtech.com or calling +1 (555) 123-4567. We'd love to hear from you!",
            "about": "AimTech & Aimnex Tech Ventures is a premier technology consulting firm dedicated to accelerating digital transformation through innovative software, robust cybersecurity, and intelligent AI solutions.",
            "ai": "Our AI Solutions include custom AI Chatbots, business process automation, AI-powered applications, and custom AI integrations to supercharge your workflow.",
            "mobile": "We build high-performance, native-like mobile experiences using Android and cross-platform technologies like Flutter.",
            "portfolio": "Our portfolio includes successful enterprise SaaS platforms, secure mobile banking apps, and highly optimized e-commerce solutions. Check out our Case Studies for more details!"
        };

        this.init();
    }

    init() {
        if (!this.inputField || !this.sendButton || !this.messagesContainer) return;

        // Load conversation
        this.loadConversation();

        // Event Listeners
        this.sendButton.addEventListener('click', () => this.handleSend());
        this.inputField.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                this.handleSend();
            }
        });
    }

    handleSend() {
        const text = this.inputField.value.trim();
        if (!text) return;

        // 1. Append User Message
        this.appendMessage(text, 'user');
        this.inputField.value = '';
        this.saveConversation();

        // 2. Show Typing Indicator
        this.showTypingIndicator();
        this.sendButton.disabled = true;

        // 3. Call AI
        this.callAIProvider(text).then(response => {
            this.removeTypingIndicator();
            this.appendMessage(response, 'ai');
            this.saveConversation();
            this.sendButton.disabled = false;
        }).catch(err => {
            console.error(err);
            this.removeTypingIndicator();
            this.appendMessage("Sorry, I am temporarily unavailable. Please try again later.", 'ai');
            this.saveConversation();
            this.sendButton.disabled = false;
        });
    }

    appendMessage(text, sender, isHistory = false) {
        const msgDiv = document.createElement('div');
        msgDiv.className = `chat-message ${sender}-message`;
        msgDiv.innerHTML = text; // allow basic HTML like strong tags
        
        this.messagesContainer.appendChild(msgDiv);
        if (!isHistory) this.scrollToBottom();
    }

    showTypingIndicator() {
        const indicator = document.createElement('div');
        indicator.id = this.typingIndicatorId;
        indicator.className = 'typing-indicator';
        indicator.innerHTML = `
            <div class="typing-dot"></div>
            <div class="typing-dot"></div>
            <div class="typing-dot"></div>
        `;
        this.messagesContainer.appendChild(indicator);
        this.scrollToBottom();
    }

    removeTypingIndicator() {
        const indicator = document.getElementById(this.typingIndicatorId);
        if (indicator) {
            indicator.remove();
        }
    }

    scrollToBottom() {
        if (this.scrollContainer) {
            this.scrollContainer.scrollTop = this.scrollContainer.scrollHeight;
        }
    }

    saveConversation() {
        const messages = [];
        const nodes = this.messagesContainer.querySelectorAll('.chat-message');
        nodes.forEach(node => {
            messages.push({
                text: node.innerHTML,
                sender: node.classList.contains('user-message') ? 'user' : 'ai'
            });
        });
        localStorage.setItem('aimtech_chat_history', JSON.stringify(messages));
    }

    loadConversation() {
        const history = localStorage.getItem('aimtech_chat_history');
        if (history) {
            try {
                const messages = JSON.parse(history);
                this.messagesContainer.innerHTML = ''; // clear default greeting if history exists
                messages.forEach(msg => {
                    this.appendMessage(msg.text, msg.sender, true);
                });
                // Small delay to ensure render before scroll
                setTimeout(() => this.scrollToBottom(), 100);
            } catch (e) {
                console.error("Could not load chat history", e);
            }
        }
    }

    async callAIProvider(prompt) {
        // Option 1 & 2: Real API Implementation (Gemini/OpenAI)
        // To use a real API, uncomment the fetch block below and replace the URL/Key
        /*
        try {
            const res = await fetch('YOUR_API_ENDPOINT', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: prompt })
            });
            if (!res.ok) throw new Error('API Error');
            const data = await res.json();
            return data.reply;
        } catch(e) { throw e; }
        */

        // Option 3: Client-Side Context Engine (Default for Production-Ready Frontend)
        return new Promise((resolve) => {
            setTimeout(() => {
                const p = prompt.toLowerCase();
                let response = "";

                if (p.includes("service") || p.includes("offer") || p.includes("what do you do")) {
                    response = this.knowledgeBase.services;
                } else if (p.includes("software") || p.includes("app") || p.includes("web")) {
                    response = this.knowledgeBase.software;
                } else if (p.includes("cyber") || p.includes("security") || p.includes("hack")) {
                    response = this.knowledgeBase.cybersecurity;
                } else if (p.includes("contact") || p.includes("email") || p.includes("phone") || p.includes("reach")) {
                    response = this.knowledgeBase.contact;
                } else if (p.includes("ai ") || p.includes("artificial intelligence") || p.includes("bot")) {
                    response = this.knowledgeBase.ai;
                } else if (p.includes("mobile") || p.includes("ios") || p.includes("android")) {
                    response = this.knowledgeBase.mobile;
                } else if (p.includes("portfolio") || p.includes("case stud") || p.includes("work")) {
                    response = this.knowledgeBase.portfolio;
                } else if (p.includes("about") || p.includes("mission") || p.includes("vision") || p.includes("who are")) {
                    response = this.knowledgeBase.about;
                } else {
                    response = "Thank you for reaching out! I am the Aimtech AI Assistant. I can help answer questions about our services, software development, cybersecurity, or contact information. How can I assist you?";
                }
                
                resolve(response);
            }, 800 + Math.random() * 700); // Simulate network latency (800ms - 1500ms)
        });
    }
}

// Initialize on DOM Load
document.addEventListener('DOMContentLoaded', () => {
    window.aimtechChatbot = new AimtechChatbot();
});
