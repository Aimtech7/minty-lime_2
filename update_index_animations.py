import os
import re

with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Inject the CSS link before </head>
link_tag = '<link href="/assets/css/premium-animations.css" rel="stylesheet"/>\n'
if link_tag not in content:
    content = content.replace('</head>', link_tag + '</head>')

# 2. Update hero text animations to fade-up and staggered delays
content = content.replace('<div class="elementor-widget-container" data-aos="fade-down">\n<h2 class="elementor-heading-title elementor-size-default">AI-Powered</h2>', '<div class="elementor-widget-container" data-aos="fade-up" data-aos-delay="200">\n<h2 class="elementor-heading-title elementor-size-default">AI-Powered</h2>')

content = re.sub(r'(<div class="elementor-widget-container">\n<h3 class="elementor-headline elementor-headline-animation-type-wave elementor-headline-letters">)', r'<div class="elementor-widget-container" data-aos="fade-up" data-aos-delay="400">\n<h3 class="elementor-headline elementor-headline-animation-type-wave elementor-headline-letters">', content)

content = content.replace('<div class="elementor-widget-container" data-aos="fade-down">\n<h2 class="elementor-heading-title elementor-size-default">Solutions<span style="color:#9ECC3B">.</span> </h2>', '<div class="elementor-widget-container" data-aos="fade-up" data-aos-delay="600">\n<h2 class="elementor-heading-title elementor-size-default">Solutions<span style="color:#9ECC3B">.</span> </h2>')

content = content.replace('<div class="elementor-widget-container" data-aos="fade-down" data-aos-delay="50">\n<p>A boutique digital agency that solves big problems</p></div>', '<div class="elementor-widget-container" data-aos="fade-up" data-aos-delay="800">\n<p>A boutique digital agency that solves big problems</p></div>')

content = content.replace('<div class="elementor-widget-container" data-aos="fade-up" data-aos-delay="100">\n<div class="elementor-button-wrapper">\n<a class="elementor-button elementor-button-link elementor-size-xs"', '<div class="elementor-widget-container" data-aos="fade-up" data-aos-delay="1000">\n<div class="elementor-button-wrapper">\n<a class="elementor-button elementor-button-link elementor-size-xs"')

# 3. Add Ken Burns parameter
content = content.replace('"background_slideshow_slide_transition":"fade"', '"background_slideshow_slide_transition":"fade","background_slideshow_ken_burns":"yes","background_slideshow_ken_burns_zoom_direction":"in"')

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(content)
print('Updated index.html')
