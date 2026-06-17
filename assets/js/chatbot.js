class AimtechChatbot {
    constructor() {
        this.inputField = document.getElementById('ai-chat-input');
        this.sendButton = document.getElementById('ai-chat-send');
        this.messagesContainer = document.getElementById('ai-chatbot-messages');
        this.scrollContainer = document.getElementById('ai-chatbot-messages-container');
        this.typingIndicatorId = 'ai-typing-indicator';
        this.clearButton = null;
        
        this.knowledgeBase = {
            // Company Information
            "company": "AimTech & Aimnex Tech Ventures is a premier technology consulting firm dedicated to accelerating digital transformation through innovative software, robust cybersecurity, and intelligent AI solutions. We partner with businesses to deliver cutting-edge technology solutions that drive growth and efficiency.",
            "about": "AimTech & Aimnex Tech Ventures is a premier technology consulting firm dedicated to accelerating digital transformation through innovative software, robust cybersecurity, and intelligent AI solutions. Founded with a vision to empower businesses through technology, we've grown into a trusted partner for organizations across education, healthcare, finance, and government sectors.",
            "mission": "Our mission is to empower businesses with innovative technology solutions that drive growth, enhance security, and enable digital transformation. We believe in delivering excellence through cutting-edge software, robust cybersecurity, and intelligent AI solutions.",
            "vision": "Our vision is to be the leading technology partner for businesses across Africa and beyond, recognized for innovation, reliability, and exceptional service delivery in software development, cybersecurity, and AI solutions.",
            "values": "Our core values include: Innovation - staying ahead with cutting-edge technology; Excellence - delivering quality in every project; Integrity - building trust through transparency; Collaboration - working together with clients as partners; Security - prioritizing data protection and cybersecurity.",
            
            // Services
            "services": "AimTech & Aimnex Tech Ventures offers comprehensive services including Software Development, Web Development, Mobile Development, Cybersecurity, AI Solutions, Cloud Solutions, Business Automation, Digital Marketing, and Branding & Design. Each service is tailored to meet your specific business needs.",
            "software": "Our Software Development services focus on building scalable, high-performance web and enterprise applications tailored to your business needs. We use modern frameworks like React, Next.js, Python, Django, and Node.js to deliver robust solutions.",
            "web": "Our Web Development services include custom website development, e-commerce platforms, web applications, and content management systems. We build responsive, SEO-optimized websites that drive engagement and conversions.",
            "mobile": "We build high-performance, native-like mobile experiences using Android, iOS, and cross-platform technologies like Flutter and React Native. Our mobile apps are designed for optimal user experience and performance.",
            "cybersecurity": "We offer top-tier Cybersecurity services including Penetration Testing, Vulnerability Assessments, Security Audits, Network Security, Digital Forensics, Security Training, and Security Monitoring. Our team uses industry-standard tools like Kali Linux, Burp Suite, OWASP, and Wireshark.",
            "penetration": "Our Penetration Testing services identify vulnerabilities in your systems before malicious actors do. We conduct comprehensive security assessments using industry-standard methodologies and provide detailed reports with remediation recommendations.",
            "vulnerability": "Our Vulnerability Assessment services scan your systems and applications for known security weaknesses. We provide prioritized recommendations to address vulnerabilities and strengthen your security posture.",
            "security": "Our Security services include comprehensive security audits, network security assessments, and security monitoring. We help protect your digital assets and ensure compliance with industry standards.",
            "ai": "Our AI Solutions include custom AI Chatbots, AI Assistants, AI Automation, Predictive Analytics, Machine Learning, Business Intelligence, and AI Integrations. We leverage technologies like OpenAI, Gemini, and LangChain to deliver intelligent solutions.",
            "chatbot": "We develop custom AI Chatbots and Assistants that can handle customer inquiries, automate support, and provide 24/7 service. Our chatbots are trained on your business knowledge and can integrate with your existing systems.",
            "automation": "Our AI Automation services help streamline business processes by implementing intelligent workflows that reduce manual work and increase efficiency. We identify automation opportunities and implement solutions that deliver measurable results.",
            "cloud": "Our Cloud Solutions include cloud migration, cloud architecture design, and cloud management. We work with AWS, Azure, and Google Cloud to deliver scalable, secure, and cost-effective cloud infrastructure.",
            "aws": "We provide AWS services including cloud architecture design, migration, and management. Our AWS-certified experts help you leverage the full potential of AWS services for your business.",
            "azure": "Our Azure services include cloud migration, application development, and infrastructure management. We help businesses leverage Microsoft Azure for scalable and secure cloud solutions.",
            "business": "Our Business Automation services help streamline operations, reduce manual work, and increase efficiency. We implement workflow automation, process optimization, and integration solutions.",
            "marketing": "Our Digital Marketing services include SEO, social media marketing, content marketing, and paid advertising. We help businesses build their online presence and reach their target audience effectively.",
            "branding": "Our Branding & Design services include logo design, brand identity development, UI/UX design, and graphic design. We create compelling visual identities that resonate with your target audience.",
            
            // Projects
            "portfolio": "Our portfolio includes successful enterprise SaaS platforms, secure mobile apps, and robust systems like EduWell (Education), CyberCafe POS (Retail/Business), HealthMate Pro (Healthcare), THA Buyer, and AIM Player. Check out our Case Studies for more details!",
            "projects": "We've delivered numerous successful projects across various industries. Notable projects include EduWell (Education Management System), CyberCafe POS (Point of Sale System), HealthMate Pro (Healthcare Platform), THA Buyer (E-commerce Platform), and AIM Player (Media Player Application).",
            "eduwell": "EduWell is a comprehensive education management system that helps schools and educational institutions manage students, classes, assessments, and communications. Features include student tracking, grade management, attendance, and parent communication.",
            "cybercafe": "CyberCafe POS is a robust point-of-sale system designed for cyber cafes and retail businesses. It includes inventory management, sales tracking, customer management, and reporting features.",
            "healthmate": "HealthMate Pro is a healthcare platform that enables patients to book appointments, access medical records, and communicate with healthcare providers. It includes telemedicine features and health tracking capabilities.",
            "tha": "THA Buyer is an e-commerce platform designed for seamless online shopping experiences. It features product catalogs, secure payments, order tracking, and vendor management.",
            "aim": "AIM Player is a media player application with advanced features for playing and managing media files. It supports multiple formats and includes playlist management and streaming capabilities.",
            
            // Contact
            "contact": "You can contact AimTech by visiting our Contact page at /contact, emailing us at hello@aimtech.com, or calling +1 (555) 123-4567. We're available Monday through Friday, 9 AM to 5 PM. We'd love to hear from you!",
            "email": "You can reach us via email at hello@aimtech.com. We typically respond within 24 hours during business days.",
            "phone": "You can call us at +1 (555) 123-4567 during business hours (Monday-Friday, 9 AM - 5 PM). For urgent matters outside business hours, please email us.",
            "location": "Our office is located at [Your Address]. We serve clients globally with a focus on Africa and emerging markets. Visit our Contact page for more details.",
            "hours": "Our business hours are Monday through Friday, 9 AM to 5 PM. We're closed on weekends and public holidays. For urgent matters, please email us and we'll respond as soon as possible.",
            
            // Technology
            "technology": "Our technology stack includes Frontend: React, Next.js, TypeScript, HTML, CSS; Backend: Python, Django, FastAPI, Node.js; Database: PostgreSQL, MySQL, Redis; Cloud: AWS, Azure, Google Cloud; Security: Kali Linux, Burp Suite, OWASP, Wireshark; AI: OpenAI, Gemini, LangChain.",
            "react": "We use React for building modern, responsive user interfaces. React's component-based architecture allows us to create reusable UI components and deliver fast, interactive web applications.",
            "python": "Python is our primary backend language for its versatility and powerful frameworks. We use Django for rapid development, FastAPI for high-performance APIs, and various Python libraries for data processing and AI.",
            "database": "We work with PostgreSQL for relational databases, MySQL for web applications, and Redis for caching and real-time data. We design efficient database schemas that scale with your business needs.",
            
            // Industries
            "industries": "We serve various industries including Education, Healthcare, Government, NGOs, Retail, Manufacturing, Agriculture, Finance, SMEs, and Startups. Our solutions are tailored to meet the unique needs of each sector.",
            "education": "For the Education sector, we provide learning management systems, student information systems, online learning platforms, and educational apps. Our solutions help institutions digitize operations and enhance learning experiences.",
            "healthcare": "Our Healthcare solutions include telemedicine platforms, patient management systems, health tracking apps, and medical record systems. We prioritize HIPAA compliance and data security in all healthcare projects.",
            "government": "We serve Government agencies with secure, scalable solutions for public services, citizen engagement platforms, and administrative systems. Our solutions comply with government security standards.",
            "finance": "For the Finance sector, we provide secure fintech solutions, payment systems, financial management platforms, and compliance tools. We prioritize security and regulatory compliance in all financial projects.",
            
            // Pricing
            "pricing": "We offer flexible pricing based on project requirements. Visit our Pricing page at /pricing for detailed information on our service packages. We also provide custom quotes for enterprise projects.",
            "quote": "To get a quote for your project, please use our Project Request Wizard or contact us directly. We'll review your requirements and provide a detailed proposal within 2-3 business days.",
            
            // Support
            "support": "We provide comprehensive support for all our projects including maintenance, updates, and technical assistance. Our support team is available during business hours and we offer different support packages based on your needs.",
            "help": "I'm here to help! You can ask me about our services, projects, technology, contact information, or any other questions about AimTech. How can I assist you today?",
            
            // Greetings
            "hello": "Hello! Welcome to AimTech & Aimnex Tech Ventures. I'm your AI assistant, here to help you with information about our services, projects, and how we can help your business. How can I assist you today?",
            "hi": "Hi there! Welcome to AimTech. I'm here to help answer your questions about our technology solutions, services, and projects. What would you like to know?",
            "hey": "Hey! Great to connect with you. I'm the AimTech AI assistant. Feel free to ask me anything about our software development, cybersecurity, AI solutions, or how we can help transform your business.",
            "thanks": "You're welcome! If you have any more questions about AimTech or need assistance with anything else, feel free to ask. We're here to help!",
            "thank": "Thank you for reaching out! Is there anything else you'd like to know about our services or how we can assist your business?",
            "bye": "Goodbye! It was great assisting you. Feel free to reach out anytime if you have more questions. Have a wonderful day!",
            "goodbye": "Goodbye! Thank you for your interest in AimTech. We look forward to potentially working with you. Visit our website or contact us anytime!"
        };

        this.init();
    }

    init() {
        if (!this.inputField || !this.sendButton || !this.messagesContainer) return;

        // Load conversation
        this.loadConversation();

        // Add clear button if it doesn't exist
        this.addClearButton();

        // Event Listeners
        this.sendButton.addEventListener('click', () => this.handleSend());
        this.inputField.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                this.handleSend();
            }
        });

        // Add welcome message if no history
        if (!localStorage.getItem('aimtech_chat_history')) {
            this.appendMessage(this.knowledgeBase.hello, 'ai');
            this.saveConversation();
        }
    }

    addClearButton() {
        const chatbotContainer = document.querySelector('.ai-chatbot-container');
        if (!chatbotContainer) return;

        // Check if clear button already exists
        if (chatbotContainer.querySelector('.clear-chat-btn')) return;

        const clearBtn = document.createElement('button');
        clearBtn.className = 'clear-chat-btn';
        clearBtn.innerHTML = '🗑️ Clear Chat';
        clearBtn.style.cssText = `
            position: absolute;
            top: 10px;
            right: 10px;
            background: rgba(255, 255, 255, 0.1);
            border: 1px solid rgba(255, 255, 255, 0.2);
            color: #fff;
            padding: 5px 12px;
            border-radius: 15px;
            font-size: 12px;
            cursor: pointer;
            z-index: 1000;
            transition: all 0.3s ease;
        `;
        clearBtn.addEventListener('mouseenter', () => {
            clearBtn.style.background = 'rgba(158, 204, 59, 0.3)';
        });
        clearBtn.addEventListener('mouseleave', () => {
            clearBtn.style.background = 'rgba(255, 255, 255, 0.1)';
        });
        clearBtn.addEventListener('click', () => this.clearConversation());
        
        chatbotContainer.appendChild(clearBtn);
        this.clearButton = clearBtn;
    }

    clearConversation() {
        if (confirm('Are you sure you want to clear the chat history?')) {
            this.messagesContainer.innerHTML = '';
            localStorage.removeItem('aimtech_chat_history');
            this.appendMessage(this.knowledgeBase.hello, 'ai');
            this.saveConversation();
        }
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

        // Option 3: Enhanced Client-Side Context Engine (Default for Production-Ready Frontend)
        return new Promise((resolve) => {
            setTimeout(() => {
                const p = prompt.toLowerCase();
                let response = "";
                let matched = false;

                // Check for greetings first
                if (p.includes("hello") || p.startsWith("hi ") || p === "hi") {
                    response = this.knowledgeBase.hello;
                    matched = true;
                } else if (p.includes("hey")) {
                    response = this.knowledgeBase.hey;
                    matched = true;
                } else if (p.includes("thank")) {
                    response = this.knowledgeBase.thank;
                    matched = true;
                } else if (p.includes("bye") || p.includes("goodbye")) {
                    response = this.knowledgeBase.goodbye;
                    matched = true;
                }

                // Company information
                if (!matched && (p.includes("company") || p.includes("who are you") || p.includes("about aimtech"))) {
                    response = this.knowledgeBase.company;
                    matched = true;
                } else if (!matched && (p.includes("mission") || p.includes("purpose"))) {
                    response = this.knowledgeBase.mission;
                    matched = true;
                } else if (!matched && (p.includes("vision") || p.includes("future"))) {
                    response = this.knowledgeBase.vision;
                    matched = true;
                } else if (!matched && (p.includes("values") || p.includes("principles"))) {
                    response = this.knowledgeBase.values;
                    matched = true;
                }

                // Services
                if (!matched && (p.includes("service") || p.includes("offer") || p.includes("what do you do") || p.includes("capabilities"))) {
                    response = this.knowledgeBase.services;
                    matched = true;
                } else if (!matched && (p.includes("software") || p.includes("application") || p.includes("web app"))) {
                    response = this.knowledgeBase.software;
                    matched = true;
                } else if (!matched && (p.includes("web") || p.includes("website") || p.includes("ecommerce"))) {
                    response = this.knowledgeBase.web;
                    matched = true;
                } else if (!matched && (p.includes("mobile") || p.includes("ios") || p.includes("android") || p.includes("flutter"))) {
                    response = this.knowledgeBase.mobile;
                    matched = true;
                } else if (!matched && (p.includes("cyber") || p.includes("security") || p.includes("hack") || p.includes("penetration"))) {
                    response = this.knowledgeBase.cybersecurity;
                    matched = true;
                } else if (!matched && (p.includes("penetration") || p.includes("pentest"))) {
                    response = this.knowledgeBase.penetration;
                    matched = true;
                } else if (!matched && (p.includes("vulnerability") || p.includes("vuln"))) {
                    response = this.knowledgeBase.vulnerability;
                    matched = true;
                } else if (!matched && (p.includes("ai ") || p.includes("artificial intelligence") || p.includes("bot") || p.includes("machine learning"))) {
                    response = this.knowledgeBase.ai;
                    matched = true;
                } else if (!matched && (p.includes("chatbot") || p.includes("assistant"))) {
                    response = this.knowledgeBase.chatbot;
                    matched = true;
                } else if (!matched && (p.includes("automation") || p.includes("workflow"))) {
                    response = this.knowledgeBase.automation;
                    matched = true;
                } else if (!matched && (p.includes("cloud") || p.includes("aws") || p.includes("azure"))) {
                    response = this.knowledgeBase.cloud;
                    matched = true;
                } else if (!matched && p.includes("aws")) {
                    response = this.knowledgeBase.aws;
                    matched = true;
                } else if (!matched && p.includes("azure")) {
                    response = this.knowledgeBase.azure;
                    matched = true;
                } else if (!matched && (p.includes("business") || p.includes("process"))) {
                    response = this.knowledgeBase.business;
                    matched = true;
                } else if (!matched && (p.includes("marketing") || p.includes("seo") || p.includes("social media"))) {
                    response = this.knowledgeBase.marketing;
                    matched = true;
                } else if (!matched && (p.includes("branding") || p.includes("design") || p.includes("logo"))) {
                    response = this.knowledgeBase.branding;
                    matched = true;
                }

                // Projects
                if (!matched && (p.includes("portfolio") || p.includes("case stud") || p.includes("work") || p.includes("project"))) {
                    response = this.knowledgeBase.portfolio;
                    matched = true;
                } else if (!matched && p.includes("eduwell")) {
                    response = this.knowledgeBase.eduwell;
                    matched = true;
                } else if (!matched && p.includes("cybercafe")) {
                    response = this.knowledgeBase.cybercafe;
                    matched = true;
                } else if (!matched && p.includes("healthmate")) {
                    response = this.knowledgeBase.healthmate;
                    matched = true;
                } else if (!matched && p.includes("tha")) {
                    response = this.knowledgeBase.tha;
                    matched = true;
                } else if (!matched && p.includes("aim player")) {
                    response = this.knowledgeBase.aim;
                    matched = true;
                }

                // Contact
                if (!matched && (p.includes("contact") || p.includes("email") || p.includes("phone") || p.includes("reach") || p.includes("get in touch"))) {
                    response = this.knowledgeBase.contact;
                    matched = true;
                } else if (!matched && p.includes("email")) {
                    response = this.knowledgeBase.email;
                    matched = true;
                } else if (!matched && p.includes("phone") || p.includes("call")) {
                    response = this.knowledgeBase.phone;
                    matched = true;
                } else if (!matched && (p.includes("location") || p.includes("address") || p.includes("office") || p.includes("where"))) {
                    response = this.knowledgeBase.location;
                    matched = true;
                } else if (!matched && (p.includes("hours") || p.includes("open") || p.includes("time"))) {
                    response = this.knowledgeBase.hours;
                    matched = true;
                }

                // Technology
                if (!matched && (p.includes("technology") || p.includes("tech stack") || p.includes("frameworks") || p.includes("tools"))) {
                    response = this.knowledgeBase.technology;
                    matched = true;
                } else if (!matched && p.includes("react")) {
                    response = this.knowledgeBase.react;
                    matched = true;
                } else if (!matched && p.includes("python")) {
                    response = this.knowledgeBase.python;
                    matched = true;
                } else if (!matched && p.includes("database") || p.includes("db")) {
                    response = this.knowledgeBase.database;
                    matched = true;
                }

                // Industries
                if (!matched && (p.includes("industry") || p.includes("sector") || p.includes("serve"))) {
                    response = this.knowledgeBase.industries;
                    matched = true;
                } else if (!matched && p.includes("education")) {
                    response = this.knowledgeBase.education;
                    matched = true;
                } else if (!matched && p.includes("healthcare") || p.includes("medical")) {
                    response = this.knowledgeBase.healthcare;
                    matched = true;
                } else if (!matched && p.includes("government")) {
                    response = this.knowledgeBase.government;
                    matched = true;
                } else if (!matched && p.includes("finance") || p.includes("fintech")) {
                    response = this.knowledgeBase.finance;
                    matched = true;
                }

                // Pricing
                if (!matched && (p.includes("pricing") || p.includes("cost") || p.includes("price") || p.includes("how much"))) {
                    response = this.knowledgeBase.pricing;
                    matched = true;
                } else if (!matched && (p.includes("quote") || p.includes("estimate") || p.includes("proposal"))) {
                    response = this.knowledgeBase.quote;
                    matched = true;
                }

                // Support
                if (!matched && (p.includes("support") || p.includes("help") || p.includes("assist"))) {
                    response = this.knowledgeBase.support;
                    matched = true;
                }

                // Default response
                if (!matched) {
                    response = "I'm not sure I understood that. I can help you with information about our services (Software Development, Cybersecurity, AI Solutions, Cloud Services), our projects (EduWell, CyberCafe POS, HealthMate Pro, etc.), technology stack, industries we serve, or how to contact us. What would you like to know?";
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
