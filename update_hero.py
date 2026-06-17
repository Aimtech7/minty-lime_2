import re
import os

filepath = r'c:\Users\wilso\OneDrive\Desktop\Projects\minty-lime_2\index.html'

with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. We want to remove the background_slideshow settings from the hero container so Elementor doesn't crash or double-load.
# Finding: data-settings='{"background_background":"slideshow", ... "background_slideshow_ken_burns_zoom_direction":"in",...}'
# Let's just remove the data-settings attribute completely from the 6a313cb element, or just the background_background part.
# It's safer to just replace `background_background":"slideshow"` with `background_background":""`
# Wait, I'll just use regex to replace the entire data-settings for that specific container to `{}` or something minimal.

pattern_container = re.compile(r'(<div class="elementor-element elementor-element-6a313cb.*?)data-settings=\'.*?\'(.*?>)', re.DOTALL)
if pattern_container.search(content):
    content = pattern_container.sub(r'\1 \2', content)

# 2. Inject the custom HTML slider inside the hero container but before .e-con-inner
# The container looks like: <div class="elementor-element elementor-element-6a313cb e-flex e-con-boxed e-con e-parent" data-element_type="container" data-id="6a313cb" >
# And right after is: <div class="e-con-inner">
custom_slider_html = """
<div id="minty-hero-slider">
    <div class="slide" style="background-image: url('/assets/images/2021/07/Navara-Scene-6-_3.jpg')"></div>
    <div class="slide" style="background-image: url('/assets/images/2021/08/KNK-Law.jpg')"></div>
    <div class="slide" style="background-image: url('/assets/images/2021/07/Riara-25.jpg')"></div>
    <div class="overlay"></div>
</div>
<div class="e-con-inner">
"""

content = content.replace('<div class="e-con-inner">', custom_slider_html, 1)

# 3. Add the script tag to link hero-slider.js at the end of body
script_tag = '<script src="/assets/js/hero-slider.js"></script>\n</body>'
if '/assets/js/hero-slider.js' not in content:
    content = content.replace('</body>', script_tag)

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)

print("Updated index.html with custom hero slider.")
