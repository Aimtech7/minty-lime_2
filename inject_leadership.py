import re

filepath = r'c:\Users\wilso\OneDrive\Desktop\Projects\minty-lime_2\about-us\index.html'
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

leadership_html = """
<!-- Leadership Section -->
<section class="elementor-section elementor-top-section elementor-section-boxed" style="padding: 80px 0; background-color: #f8fafc;">
    <div class="elementor-container elementor-column-gap-default">
        <div class="elementor-column elementor-col-100">
            <div class="elementor-widget-wrap">
                <div class="elementor-widget elementor-widget-heading">
                    <div class="elementor-widget-container" style="text-align: center; margin-bottom: 50px;">
                        <h2 style="font-size: 2.5rem; color: #0b1320; font-family: 'Poppins', sans-serif;">Our Leadership<span style="color: #99cc00;">.</span></h2>
                    </div>
                </div>
                
                <div class="elementor-widget elementor-widget-image-box" style="max-width: 400px; margin: 0 auto; text-align: center; background: #fff; padding: 30px; border-radius: 12px; box-shadow: 0 10px 30px rgba(0,0,0,0.05);">
                    <div class="elementor-image-box-wrapper">
                        <figure class="elementor-image-box-img" style="margin-bottom: 20px;">
                            <img src="/assets/images/austinemakwaka.png" alt="Austine Makwaka" style="border-radius: 50%; width: 200px; height: 200px; object-fit: cover; border: 4px solid #9ECC3B;" loading="lazy">
                        </figure>
                        <div class="elementor-image-box-content">
                            <h3 class="elementor-image-box-title" style="font-size: 1.5rem; color: #0b1320; margin-bottom: 5px; font-family: 'Poppins', sans-serif;">Austine Makwaka</h3>
                            <p class="elementor-image-box-description" style="color: #9ECC3B; font-weight: bold; margin-bottom: 15px; font-family: 'Poppins', sans-serif;">Founder &amp; CEO</p>
                            <p style="color: #475569; font-family: 'Roboto', sans-serif;">Leading AimTech &amp; Aimnex Tech Ventures with a vision for innovative software, robust cybersecurity, and transformative AI solutions.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>
"""

pattern = re.compile(r'(<footer class="elementor)', re.IGNORECASE)
if pattern.search(content):
    content = pattern.sub(leadership_html + r'\n\1', content)
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
    print('Injected leadership section successfully.')
else:
    print('Failed to find footer.')
