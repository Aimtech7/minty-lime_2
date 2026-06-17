import re

filepath = r'c:\Users\wilso\OneDrive\Desktop\Projects\minty-lime_2\index.html'

with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

new_sections_html = """
<!-- ================== PREMIUM SECTIONS (PHASE 1) ================== -->

<!-- 1. Results & Impact Section -->
<section class="results-section">
    <h2 class="section-heading" style="color: #fff;">Our Impact by the Numbers</h2>
    <div class="results-grid">
        <div class="result-card">
            <div class="result-number" data-target="150" data-suffix="+">0</div>
            <div class="result-label">Projects Delivered</div>
        </div>
        <div class="result-card">
            <div class="result-number" data-target="25" data-suffix="+">0</div>
            <div class="result-label">Industries Served</div>
        </div>
        <div class="result-card">
            <div class="result-number" data-target="50" data-suffix="+">0</div>
            <div class="result-label">Technologies Mastered</div>
        </div>
        <div class="result-card">
            <div class="result-number" data-target="100" data-suffix="%">0</div>
            <div class="result-label">Client Satisfaction</div>
        </div>
    </div>
</section>

<!-- 2. Testimonials Section -->
<section class="testimonials-section">
    <h2 class="section-heading">What Our Clients Say</h2>
    <div class="testimonial-carousel">
        <div class="testimonial-track">
            <div class="testimonial-slide">
                <p class="testimonial-content">"AimTech completely transformed our digital infrastructure. Their custom SaaS solution increased our operational efficiency by 40%. The team is highly professional, responsive, and technically brilliant."</p>
                <div class="testimonial-author">
                    <img src="/assets/images/2021/07/Riara-8.jpg" alt="Client 1" class="testimonial-avatar">
                    <div style="text-align: left;">
                        <div class="testimonial-name">Sarah Jenkins</div>
                        <div class="testimonial-company">Operations Director, FinTech Solutions</div>
                    </div>
                </div>
            </div>
            <div class="testimonial-slide">
                <p class="testimonial-content">"Their cybersecurity audit uncovered vulnerabilities we had no idea existed. AimTech's thorough penetration testing and subsequent remediation plan gave us total peace of mind. Highly recommended!"</p>
                <div class="testimonial-author">
                    <img src="/assets/images/2021/07/Navara-Scene-2-_4.jpg" alt="Client 2" class="testimonial-avatar">
                    <div style="text-align: left;">
                        <div class="testimonial-name">Michael Chang</div>
                        <div class="testimonial-company">CTO, SecureData Corp</div>
                    </div>
                </div>
            </div>
            <div class="testimonial-slide">
                <p class="testimonial-content">"The AI chatbot they integrated into our e-commerce platform handles 60% of our tier-1 support queries automatically. It has revolutionized how we interact with our customers."</p>
                <div class="testimonial-author">
                    <img src="/assets/images/2021/08/KNK-Law.jpg" alt="Client 3" class="testimonial-avatar">
                    <div style="text-align: left;">
                        <div class="testimonial-name">Elena Rodriguez</div>
                        <div class="testimonial-company">CEO, Retail Innovations</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="carousel-dots">
            <div class="carousel-dot active"></div>
            <div class="carousel-dot"></div>
            <div class="carousel-dot"></div>
        </div>
    </div>
</section>

<!-- 3. Clients & Partners Section -->
<section class="partners-section">
    <h3 class="partners-heading">Trusted By Leading Businesses &amp; Organizations</h3>
    <div class="marquee">
        <div class="marquee-content">
            <img src="/assets/images/aimnex-logo.png" alt="Partner 1" class="partner-logo">
            <img src="/assets/images/aimtech-logo.png" alt="Partner 2" class="partner-logo">
            <img src="/assets/images/aimnex-logo.png" alt="Partner 3" class="partner-logo">
            <img src="/assets/images/aimtech-logo.png" alt="Partner 4" class="partner-logo">
        </div>
        <div class="marquee-content">
            <img src="/assets/images/aimnex-logo.png" alt="Partner 1" class="partner-logo">
            <img src="/assets/images/aimtech-logo.png" alt="Partner 2" class="partner-logo">
            <img src="/assets/images/aimnex-logo.png" alt="Partner 3" class="partner-logo">
            <img src="/assets/images/aimtech-logo.png" alt="Partner 4" class="partner-logo">
        </div>
    </div>
</section>
"""

if 'class="results-section"' not in content:
    pattern = re.compile(r'(<footer class="elementor.*?">)', re.DOTALL | re.IGNORECASE)
    if pattern.search(content):
        content = pattern.sub(new_sections_html + r'\n\1', content)
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print("Injected successfully!")
    else:
        print("Failed to inject")
else:
    print("Already injected")
