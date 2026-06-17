import re

with open('diff_animations.txt', 'r', encoding='utf-8') as f:
    diff = f.read()

removed_animations = []
for line in diff.split('\n'):
    if line.startswith('-') and not line.startswith('---'):
        l = line.lower()
        if 'animation' in l or 'fadein' in l or 'wow ' in l or 'animated' in l or 'elementor-invisible' in l or 'aos' in l:
            removed_animations.append(line)

print(f'Found {len(removed_animations)} lines with removed animations.')
for l in removed_animations[:10]:
    print(l)
