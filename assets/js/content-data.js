const aimtechData = {
    services: [
        {
            category: "TECHNOLOGY SERVICES",
            icon: "fa-laptop-code",
            items: [
                "Software Development", "Website Development", "Mobile App Development",
                "AI Solutions", "AI Chatbots", "Business Systems", "POS Systems",
                "ERP Systems", "E-Commerce Platforms", "API Integrations",
                "Database Solutions", "Cloud Solutions", "IT Consultancy"
            ]
        },
        {
            category: "CYBERSECURITY SERVICES",
            icon: "fa-shield-alt",
            items: [
                "Penetration Testing", "Vulnerability Assessment", "Security Audits",
                "Digital Forensics", "Network Security", "Security Awareness Training",
                "Risk Assessment"
            ]
        },
        {
            category: "MEDIA & CREATIVE SERVICES",
            icon: "fa-camera-retro",
            items: [
                "Professional Photography", "Event Photography", "Product Photography",
                "Corporate Photography", "Professional Videography", "Event Coverage",
                "Documentary Production", "Commercial Video Production",
                "Social Media Content Creation", "Drone Coverage", "Video Editing"
            ]
        },
        {
            category: "GRAPHIC DESIGN SERVICES",
            icon: "fa-paint-brush",
            items: [
                "Logo Design", "Brand Identity Design", "Posters", "Flyers",
                "Brochures", "Company Profiles", "Business Cards", "Certificates",
                "Banners", "Social Media Designs", "Marketing Materials"
            ]
        },
        {
            category: "PRINTING SERVICES",
            icon: "fa-print",
            items: [
                "Bulk Printing", "Business Cards Printing", "Posters Printing",
                "Flyers Printing", "Brochures Printing", "Receipt Books",
                "Certificates", "Branding Materials", "Corporate Printing Solutions"
            ]
        },
        {
            category: "BUSINESS SUPPORT SERVICES",
            icon: "fa-briefcase",
            items: [
                "CV Writing", "CV Redesign", "Resume Preparation", "Cover Letter Writing",
                "LinkedIn Profile Optimization", "Company Profile Development",
                "Proposal Writing", "Tender Documentation", "Business Documentation",
                "Branding Consultancy"
            ]
        },
        {
            category: "DIGITAL MARKETING SERVICES",
            icon: "fa-bullhorn",
            items: [
                "Social Media Management", "Social Media Marketing", "SEO Services",
                "Content Marketing", "Digital Advertising", "Brand Promotion",
                "Online Reputation Management"
            ]
        },
        {
            category: "TRAINING SERVICES",
            icon: "fa-chalkboard-teacher",
            items: [
                "Computer Packages", "Programming Courses", "Web Development",
                "Cybersecurity Training", "AI & Automation Training",
                "Networking Training", "Digital Skills Training", "Corporate ICT Training"
            ]
        }
    ],
    portfolios: [
        { category: "Software Projects" },
        { category: "AI Projects" },
        { category: "Cybersecurity Projects" },
        { category: "Photography Portfolio" },
        { category: "Videography Portfolio" },
        { category: "Graphic Design Portfolio" },
        { category: "Printing Portfolio" },
        { category: "Branding Portfolio" }
    ],
    statistics: [
        { label: "Projects Completed", value: "500+" },
        { label: "Happy Clients", value: "300+" },
        { label: "Students Trained", value: "1000+" },
        { label: "Years of Experience", value: "10+" },
        { label: "Services Offered", value: "50+" }
    ],
    whyChooseUs: [
        { title: "Professional Team", desc: "Expert developers, designers, and consultants." },
        { title: "Affordable Solutions", desc: "Cost-effective services tailored to your budget." },
        { title: "Quality Assurance", desc: "Rigorous testing and highest standards." },
        { title: "Timely Delivery", desc: "We meet deadlines without compromising quality." },
        { title: "Modern Technologies", desc: "Utilizing the latest tech stack and AI tools." },
        { title: "Customer Satisfaction", desc: "Your success is our priority." },
        { title: "End-to-End Support", desc: "From idea to deployment and beyond." }
    ]
};

document.addEventListener("DOMContentLoaded", () => {
    // Render Expanded Services
    const servicesContainer = document.getElementById("dynamic-services-container");
    if (servicesContainer) {
        servicesContainer.innerHTML = aimtechData.services.map(service => `
            <div style="background: #111; padding: 30px; border-radius: 8px; border: 1px solid #333; transition: transform 0.3s; cursor: pointer;" onmouseover="this.style.transform='translateY(-5px)'" onmouseout="this.style.transform='translateY(0)'">
                <i class="fas ${service.icon}" style="font-size: 2rem; color: #9ECC3B; margin-bottom: 20px;"></i>
                <h3 style="color: #fff; font-size: 1.2rem; margin-bottom: 15px;">${service.category}</h3>
                <ul style="list-style: none; padding: 0; margin: 0; color: #ccc; font-size: 0.9rem; line-height: 1.8;">
                    ${service.items.map(item => `<li><i class="fas fa-check" style="color: #9ECC3B; margin-right: 8px; font-size: 0.8rem;"></i>${item}</li>`).join("")}
                </ul>
            </div>
        `).join("");
    }

    // Render Portfolio Categories
    const portfolioContainer = document.getElementById("dynamic-portfolio-container");
    if (portfolioContainer) {
        portfolioContainer.innerHTML = aimtechData.portfolios.map(port => `
            <div style="background: #1a1a1a; padding: 40px 20px; text-align: center; border-radius: 8px; border-bottom: 3px solid #9ECC3B;">
                <h4 style="color: #fff; font-size: 1.1rem; margin: 0;">${port.category}</h4>
            </div>
        `).join("");
    }

    // Render Statistics
    const statsContainer = document.getElementById("dynamic-stats-container");
    if (statsContainer) {
        statsContainer.innerHTML = aimtechData.statistics.map(stat => `
            <div style="text-align: center;">
                <h2 style="color: #9ECC3B; font-size: 3rem; margin: 0; font-weight: bold;">${stat.value}</h2>
                <p style="color: #fff; font-size: 1rem; text-transform: uppercase; letter-spacing: 1px; margin-top: 10px;">${stat.label}</p>
            </div>
        `).join("");
    }

    // Render Why Choose Us
    const whyContainer = document.getElementById("dynamic-why-container");
    if (whyContainer) {
        whyContainer.innerHTML = aimtechData.whyChooseUs.map(reason => `
            <div style="display: flex; align-items: flex-start; gap: 15px; margin-bottom: 20px;">
                <i class="fas fa-check-circle" style="color: #9ECC3B; font-size: 1.5rem; margin-top: 3px;"></i>
                <div>
                    <h4 style="color: #fff; margin: 0 0 5px 0; font-size: 1.1rem;">${reason.title}</h4>
                    <p style="color: #ccc; margin: 0; font-size: 0.9rem;">${reason.desc}</p>
                </div>
            </div>
        `).join("");
    }
});
