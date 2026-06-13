// This file contains all the dynamically injected content to make updates easy.

const servicesData = [
    { title: "Technology", description: "Software development, mobile apps, systems integration, and tech consulting.", icon: "fas fa-laptop-code" },
    { title: "Cybersecurity", description: "Network security, vulnerability assessments, penetration testing, and audits.", icon: "fas fa-shield-alt" },
    { title: "Media & Creative", description: "Video production, photography, motion graphics, and content creation.", icon: "fas fa-video" },
    { title: "Graphic Design", description: "Brand identity, UI/UX design, marketing collateral, and illustrations.", icon: "fas fa-paint-brush" },
    { title: "Printing Services", description: "High-quality offset and digital printing, large format, and corporate gifts.", icon: "fas fa-print" },
    { title: "Business Support", description: "Enterprise solutions, workflow automation, and business consulting.", icon: "fas fa-briefcase" },
    { title: "Digital Marketing", description: "SEO, social media management, PPC campaigns, and email marketing.", icon: "fas fa-chart-line" },
    { title: "Training Institute", description: "Professional courses in IT, design, cybersecurity, and productivity.", icon: "fas fa-chalkboard-teacher" }
];

const portfolioData = [
    { title: "Web Applications", image: "/assets/images/2021/07/6101c40a07655.jpg" },
    { title: "Corporate Branding", image: "/assets/images/2021/07/BIZ_0426.jpg" },
    { title: "Cybersecurity Audits", image: "/assets/images/2021/07/Best-UI-UX-course-tutorial-class-certification-training-online.jpg" },
    { title: "Media Campaigns", image: "/assets/images/2024/05/Navara-Scene-7-_1.webp" },
    { title: "UI/UX Overhauls", image: "/assets/images/2021/07/Web-Development.jpg" },
    { title: "E-Commerce Systems", image: "/assets/images/2024/05/KNK-Law-1.webp" },
    { title: "Print & Packaging", image: "/assets/images/2024/05/Riara-25.webp" },
    { title: "Custom Software", image: "/assets/images/2021/07/Web-Development.jpg" }
];

const statsData = [
    { number: "500+", label: "Projects Completed" },
    { number: "150+", label: "Happy Clients" },
    { number: "10+", label: "Years Experience" },
    { number: "24/7", label: "Support Available" }
];

const whyChooseUsData = [
    { title: "End-to-End Solutions", description: "From software development to creative branding, we handle everything under one ecosystem.", icon: "fas fa-check-circle" },
    { title: "Expert Team", description: "Our certified professionals bring years of industry experience.", icon: "fas fa-users" },
    { title: "Client-Centric", description: "We tailor our solutions specifically to meet your unique business goals.", icon: "fas fa-handshake" },
    { title: "Innovative Approach", description: "Leveraging the latest technologies like AI and automation to keep you ahead.", icon: "fas fa-lightbulb" }
];

// NEW ADVANCED FEATURES DATA

const testimonialsData = [
    { name: "Michael Kamau", company: "Tech Innovators Ltd", text: "Aimtech transformed our business operations. Their custom software is flawless." },
    { name: "Sarah Wanjiku", company: "Creative Minds", text: "Aimnex handled our complete rebrand and media campaign. The results were astounding." },
    { name: "Michael Johnson", company: "Global Logistics", text: "The cybersecurity audit was thorough and eye-opening. We feel much safer now." },
    { name: "Sarah Williams", company: "EduCare Group", text: "The corporate training provided by Aimtech Institute upskilled our entire IT department." }
];

const pricingData = [
    { tier: "SME Starter Solution", price: "Contact Us", features: ["5 Page Website", "Initial Security Audit", "Mobile Responsive", "1 Month Support"] },
    { tier: "Corporate Branding", price: "Contact Us", features: ["Logo Design", "Brand Guidelines", "Business Cards", "Letterheads"] },
    { tier: "Digital Marketing", price: "Contact Us", features: ["Social Media Management", "Content Creation", "Monthly Reports", "Ad Campaign Setup"] }
];

const blogData = [
    { title: "Top 5 AI Trends for Businesses in 2026", date: "May 10, 2026", category: "Technology" },
    { title: "Why Your Company Needs a Cybersecurity Audit Now", date: "April 28, 2026", category: "Security" },
    { title: "The Power of cohesive Corporate Branding", date: "April 15, 2026", category: "Branding" }
];

const teamData = [
    { name: "Executive Director", role: "Leadership", image: "/assets/images/2021/07/6101c40a07655.jpg" },
    { name: "Head of Technology", role: "Aimtech", image: "/assets/images/2021/07/BIZ_0426.jpg" },
    { name: "Head of Creative", role: "Aimnex Tech Ventures", image: "/assets/images/2024/05/Navara-Scene-7-_1.webp" }
];


document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Services
    const servicesContainer = document.getElementById('dynamic-services-container');
    if (servicesContainer) {
        servicesData.forEach(service => {
            servicesContainer.innerHTML += `
                <div style="background: #111; padding: 40px 30px; border-radius: 8px; text-align: center; border-bottom: 4px solid #9ECC3B; transition: transform 0.3s; cursor: pointer;" onmouseover="this.style.transform='translateY(-10px)'" onmouseout="this.style.transform='translateY(0)'">
                    <i class="${service.icon}" style="font-size: 3rem; color: #9ECC3B; margin-bottom: 20px;"></i>
                    <h3 style="color: #fff; font-size: 1.5rem; margin-bottom: 15px;">${service.title}</h3>
                    <p style="color: #ccc; line-height: 1.6;">${service.description}</p>
                </div>
            `;
        });
    }

    // 2. Portfolio
    const portfolioContainer = document.getElementById('dynamic-portfolio-container');
    if (portfolioContainer) {
        portfolioData.forEach(item => {
            portfolioContainer.innerHTML += `
                <div style="position: relative; overflow: hidden; border-radius: 8px; cursor: pointer;" class="portfolio-item">
                    <img src="${item.image}" alt="${item.title}" style="width: 100%; height: 250px; object-fit: cover; transition: transform 0.5s;">
                    <div style="position: absolute; bottom: 0; left: 0; right: 0; background: rgba(11, 19, 32, 0.9); padding: 20px; text-align: center;">
                        <h4 style="color: #fff; margin: 0; font-size: 1.2rem;">${item.title}</h4>
                    </div>
                </div>
            `;
        });
        
        // Add simple CSS for hover
        const style = document.createElement('style');
        style.innerHTML = `.portfolio-item:hover img { transform: scale(1.1); }`;
        document.head.appendChild(style);
    }

    // 3. Stats
    const statsContainer = document.getElementById('dynamic-stats-container');
    if (statsContainer) {
        statsData.forEach(stat => {
            statsContainer.innerHTML += `
                <div style="text-align: center;">
                    <h2 style="color: #9ECC3B; font-size: 4rem; margin-bottom: 10px; font-weight: bold;">${stat.number}</h2>
                    <p style="color: #fff; font-size: 1.2rem; text-transform: uppercase; letter-spacing: 2px;">${stat.label}</p>
                </div>
            `;
        });
    }

    // 4. Why Choose Us
    const whyContainer = document.getElementById('dynamic-why-container');
    if (whyContainer) {
        whyChooseUsData.forEach(item => {
            whyContainer.innerHTML += `
                <div style="display: flex; align-items: flex-start; margin-bottom: 30px;">
                    <i class="${item.icon}" style="color: #9ECC3B; font-size: 2rem; margin-right: 20px; margin-top: 5px;"></i>
                    <div>
                        <h4 style="color: #fff; font-size: 1.2rem; margin-bottom: 10px;">${item.title}</h4>
                        <p style="color: #ccc; line-height: 1.6; margin: 0;">${item.description}</p>
                    </div>
                </div>
            `;
        });
    }

    // 5. Testimonials Carousel (Simple JS based)
    const testimonialsContainer = document.getElementById('dynamic-testimonials-container');
    if (testimonialsContainer) {
        let tHTML = `<div style="display: flex; overflow-x: auto; gap: 20px; padding: 20px 0; scroll-snap-type: x mandatory;">`;
        testimonialsData.forEach(t => {
            tHTML += `
                <div style="min-width: 300px; background: #111; padding: 30px; border-radius: 8px; border-left: 4px solid #9ECC3B; scroll-snap-align: start;">
                    <p style="color: #ccc; font-style: italic; margin-bottom: 20px;">"${t.text}"</p>
                    <h4 style="color: #fff; margin: 0;">${t.name}</h4>
                    <span style="color: #9ECC3B; font-size: 0.9rem;">${t.company}</span>
                </div>
            `;
        });
        tHTML += `</div>`;
        testimonialsContainer.innerHTML = tHTML;
    }

    // 6. Pricing Packages
    const pricingContainer = document.getElementById('dynamic-pricing-container');
    if (pricingContainer) {
        pricingData.forEach(p => {
            let featuresHTML = p.features.map(f => `<li style="margin-bottom: 10px;"><i class="fas fa-check" style="color: #9ECC3B; margin-right: 10px;"></i>${f}</li>`).join('');
            pricingContainer.innerHTML += `
                <div style="background: #111; padding: 40px; border-radius: 8px; text-align: center; border: 1px solid #333; transition: transform 0.3s;" onmouseover="this.style.transform='translateY(-10px)'" onmouseout="this.style.transform='translateY(0)'">
                    <h3 style="color: #fff; font-size: 1.5rem; margin-bottom: 20px;">${p.tier}</h3>
                    <h2 style="color: #9ECC3B; font-size: 2.5rem; margin-bottom: 30px;">${p.price}</h2>
                    <ul style="list-style: none; padding: 0; color: #ccc; text-align: left; margin-bottom: 30px;">
                        ${featuresHTML}
                    </ul>
                    <a href="mailto:info@aimtech.co.ke" style="display: inline-block; background: #9ECC3B; color: #0b1320; padding: 10px 20px; border-radius: 5px; text-decoration: none; font-weight: bold;">Inquire Now</a>
                </div>
            `;
        });
    }

    // 7. Blog / Insights
    const blogContainer = document.getElementById('dynamic-blog-container');
    if (blogContainer) {
        blogData.forEach(b => {
            blogContainer.innerHTML += `
                <div style="background: #111; border-radius: 8px; overflow: hidden;">
                    <div style="padding: 30px;">
                        <span style="background: #9ECC3B; color: #0b1320; padding: 5px 10px; border-radius: 3px; font-size: 0.8rem; font-weight: bold;">${b.category}</span>
                        <h3 style="color: #fff; font-size: 1.3rem; margin: 20px 0;">${b.title}</h3>
                        <p style="color: #888; font-size: 0.9rem;">${b.date}</p>
                    </div>
                </div>
            `;
        });
    }

    // 8. Team Showcase
    const teamContainer = document.getElementById('dynamic-team-container');
    if (teamContainer) {
        teamData.forEach(t => {
            teamContainer.innerHTML += `
                <div style="text-align: center;">
                    <img src="${t.image}" alt="${t.name}" style="width: 150px; height: 150px; border-radius: 50%; object-fit: cover; margin-bottom: 20px; border: 4px solid #9ECC3B;">
                    <h4 style="color: #fff; font-size: 1.2rem; margin-bottom: 5px;">${t.name}</h4>
                    <p style="color: #9ECC3B;">${t.role}</p>
                </div>
            `;
        });
    }

    // 9. Dark Mode Toggle Setup (If button exists)
    const darkModeBtn = document.getElementById('dark-mode-toggle');
    if (darkModeBtn) {
        darkModeBtn.addEventListener('click', () => {
            document.body.classList.toggle('light-mode');
            const isLight = document.body.classList.contains('light-mode');
            darkModeBtn.innerHTML = isLight ? '<i class="fas fa-moon"></i>' : '<i class="fas fa-sun"></i>';
            
            if(isLight) {
                // Apply light mode styles globally
                document.documentElement.style.setProperty('--bg-color', '#ffffff');
                document.documentElement.style.setProperty('--text-color', '#333333');
            } else {
                // Revert to dark mode
                document.documentElement.style.removeProperty('--bg-color');
                document.documentElement.style.removeProperty('--text-color');
            }
        });
    }

    // 10. AI Chatbot Widget Logic
    const chatbotBtn = document.getElementById('ai-chatbot-btn');
    const chatbotWindow = document.getElementById('ai-chatbot-window');
    const chatbotClose = document.getElementById('ai-chatbot-close');
    
    if (chatbotBtn && chatbotWindow && chatbotClose) {
        chatbotBtn.addEventListener('click', () => {
            chatbotWindow.style.display = chatbotWindow.style.display === 'none' || chatbotWindow.style.display === '' ? 'flex' : 'none';
        });
        chatbotClose.addEventListener('click', () => {
            chatbotWindow.style.display = 'none';
        });
    }

});
