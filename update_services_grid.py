import os
import re

new_grid_html = """
<div class="premium-services-container">
    <div class="premium-services-grid">
        
        <!-- Software Development -->
        <div class="service-card" data-aos="fade-up" data-aos-delay="100" id="software">
            <div class="service-icon">
                <svg viewBox="0 0 24 24"><path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"/></svg>
            </div>
            <h3>Software Development</h3>
            <p>End-to-end custom software solutions engineered for scalability, performance, and business growth.</p>
            <ul class="service-features">
                <li>Custom Web Applications</li>
                <li>Enterprise Software Solutions</li>
                <li>SaaS Development</li>
                <li>API Development & Integration</li>
            </ul>
            <a href="#" class="service-cta">Learn More <svg viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></a>
        </div>

        <!-- Mobile Development -->
        <div class="service-card" data-aos="fade-up" data-aos-delay="200" id="mobile">
            <div class="service-icon">
                <svg viewBox="0 0 24 24"><path d="M17 1.01L7 1c-1.1 0-2 .9-2 2v18c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V3c0-1.1-.9-1.99-2-1.99zM17 19H7V5h10v14z"/></svg>
            </div>
            <h3>Mobile Development</h3>
            <p>High-performance, native-like mobile experiences that engage users and drive mobile-first success.</p>
            <ul class="service-features">
                <li>Android Applications</li>
                <li>Cross-Platform Flutter Apps</li>
                <li>Mobile Backend Services</li>
                <li>App Maintenance & Support</li>
            </ul>
            <a href="#" class="service-cta">Learn More <svg viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></a>
        </div>

        <!-- Cybersecurity -->
        <div class="service-card" data-aos="fade-up" data-aos-delay="300" id="cybersecurity">
            <div class="service-icon">
                <svg viewBox="0 0 24 24"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z"/></svg>
            </div>
            <h3>Cybersecurity</h3>
            <p>Comprehensive security frameworks to protect your digital assets, infrastructure, and user data.</p>
            <ul class="service-features">
                <li>Penetration Testing</li>
                <li>Vulnerability Assessment</li>
                <li>Security Audits & Reviews</li>
                <li>Security Awareness Training</li>
            </ul>
            <a href="#" class="service-cta">Learn More <svg viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></a>
        </div>

        <!-- AI & Automation -->
        <div class="service-card" data-aos="fade-up" data-aos-delay="400" id="ai">
            <div class="service-icon">
                <svg viewBox="0 0 24 24"><path d="M21 11.5v-1c0-.83-.67-1.5-1.5-1.5H16v-2c0-1.1-.9-2-2-2h-4c-1.1 0-2 .9-2 2v2H4.5C3.67 9 3 9.67 3 10.5v1c0 .83.67 1.5 1.5 1.5v4c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2v-4c.83 0 1.5-.67 1.5-1.5zm-5.5 0h-7v-2h7v2zm-2.5 4h-2v-2h2v2z"/></svg>
            </div>
            <h3>AI & Automation</h3>
            <p>Intelligent systems that automate workflows, generate insights, and supercharge business efficiency.</p>
            <ul class="service-features">
                <li>AI-Powered Applications</li>
                <li>Business Process Automation</li>
                <li>AI Chatbots & Assistants</li>
                <li>Custom AI Integrations</li>
            </ul>
            <a href="#" class="service-cta">Learn More <svg viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></a>
        </div>

        <!-- Consulting -->
        <div class="service-card" data-aos="fade-up" data-aos-delay="500" id="consulting">
            <div class="service-icon">
                <svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg>
            </div>
            <h3>Consulting</h3>
            <p>Strategic technology consulting to modernize systems and align digital transformation with business goals.</p>
            <ul class="service-features">
                <li>Digital Transformation</li>
                <li>Technical Architecture</li>
                <li>Technology Strategy</li>
                <li>System Modernization</li>
            </ul>
            <a href="#" class="service-cta">Learn More <svg viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></a>
        </div>

    </div>
</div>
"""

with open(r'c:\Users\wilso\OneDrive\Desktop\Projects\minty-lime_2\what-we-do\index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Make sure CSS is linked
link_tag = '<link href="/assets/css/premium-services.css" rel="stylesheet"/>\n'
if link_tag not in content:
    content = content.replace('</head>', link_tag + '</head>')

# We need to replace the jet-engine-listing grid.
# Find <div class="jet-listing-grid jet-listing"> down to the end of the section
# Using regex to find the jet-listing-grid and replace it, but we have to be careful with closing tags.
# Let's just find <div class="jet-listing-grid jet-listing"> and replace it with our grid.
# The previous jet-listing-grid is a very long string of HTML. We can use re.sub.
pattern = re.compile(r'<div class="jet-listing-grid jet-listing">.*?<script src="https://unpkg.com/aos', re.DOTALL)
if pattern.search(content):
    content = pattern.sub(new_grid_html + '\n<script src="https://unpkg.com/aos', content)
    with open(r'c:\Users\wilso\OneDrive\Desktop\Projects\minty-lime_2\what-we-do\index.html', 'w', encoding='utf-8') as f:
        f.write(content)
    print("Replaced jet-listing-grid with custom premium grid")
else:
    print("Could not find pattern. Check HTML structure.")
