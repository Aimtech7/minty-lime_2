document.addEventListener('DOMContentLoaded', () => {
    const heroSlider = document.getElementById('minty-hero-slider');
    const slides = document.querySelectorAll('#minty-hero-slider .slide');
    const overlay = document.querySelector('#minty-hero-slider .overlay');
    const prevBtn = document.querySelector('#minty-hero-slider .nav-prev');
    const nextBtn = document.querySelector('#minty-hero-slider .nav-next');
    const dots = document.querySelectorAll('#minty-hero-slider .dot');
    
    if (slides.length === 0) return;

    let currentSlide = 0;
    let isAnimating = false;
    let slideTimer;
    const slideInterval = 7000; // 7 seconds per slide
    const kenBurnsDuration = 12000; // Ken Burns effect duration (longer than slide interval for smooth overlap)
    
    // Initialize slides with Ken Burns animation data
    slides.forEach((slide, index) => {
        // Random zoom direction for variety
        const zoomDirection = index % 2 === 0 ? 'in' : 'out';
        const panDirection = index % 3 === 0 ? 'left' : (index % 3 === 1 ? 'right' : 'center');
        
        slide.setAttribute('data-zoom', zoomDirection);
        slide.setAttribute('data-pan', panDirection);
        slide.style.opacity = '0';
        slide.style.transition = 'opacity 1.5s ease-in-out';
    });

    // Set first slide active
    slides[0].style.opacity = '1';
    slides[0].classList.add('active');
    startKenBurnsEffect(slides[0]);
    updateDots(0);

    // Navigation button event listeners
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            goToSlide((currentSlide - 1 + slides.length) % slides.length);
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            goToSlide((currentSlide + 1) % slides.length);
        });
    }

    // Dot navigation
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            goToSlide(index);
        });
    });

    function goToSlide(index) {
        if (isAnimating || index === currentSlide) return;
        
        // Reset timer when manually navigating
        clearInterval(slideTimer);
        slideTimer = setInterval(changeSlide, slideInterval);
        
        manualChangeSlide(index);
    }

    function manualChangeSlide(targetIndex) {
        if (isAnimating) return;
        isAnimating = true;

        const currentSlideEl = slides[currentSlide];
        const targetSlideEl = slides[targetIndex];

        // Stop Ken Burns on current slide
        stopKenBurnsEffect(currentSlideEl);

        // Crossfade transition
        currentSlideEl.style.opacity = '0';
        currentSlideEl.classList.remove('active');

        // Start Ken Burns on target slide before it becomes visible
        startKenBurnsEffect(targetSlideEl);
        
        // Fade in target slide
        setTimeout(() => {
            targetSlideEl.style.opacity = '1';
            targetSlideEl.classList.add('active');
            
            // Reset current slide for next cycle
            setTimeout(() => {
                stopKenBurnsEffect(currentSlideEl);
                currentSlideEl.style.transform = 'translateY(0) scale(1)';
                currentSlideEl.style.backgroundPosition = '50% 50%';
                
                currentSlide = targetIndex;
                updateDots(currentSlide);
                isAnimating = false;
            }, 1500);
        }, 100);
    }

    function updateDots(activeIndex) {
        dots.forEach((dot, index) => {
            if (index === activeIndex) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }

    // Parallax effect on scroll
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                const scrolled = window.pageYOffset;
                const parallaxSpeed = 0.4;
                
                slides.forEach(slide => {
                    const yOffset = scrolled * parallaxSpeed;
                    slide.style.transform = `translateY(${yOffset}px) scale(${getScale(slide)})`;
                });
                
                // Parallax overlay for cinematic depth
                if (overlay) {
                    overlay.style.transform = `translateY(${scrolled * 0.2}px)`;
                }
                
                ticking = false;
            });
            ticking = true;
        }
    });

    // Mouse parallax for subtle movement
    document.addEventListener('mousemove', (e) => {
        if (!heroSlider) return;
        
        const mouseX = (e.clientX / window.innerWidth - 0.5) * 20;
        const mouseY = (e.clientY / window.innerHeight - 0.5) * 20;
        
        const activeSlide = document.querySelector('#minty-hero-slider .slide.active');
        if (activeSlide) {
            activeSlide.style.transform = `translate(${mouseX}px, ${mouseY}px) scale(${getScale(activeSlide)})`;
        }
    });

    function getScale(slide) {
        if (!slide.classList.contains('active')) return 1;
        
        const zoomDirection = slide.getAttribute('data-zoom');
        const baseScale = 1.1;
        const scaleVariation = 0.05;
        
        // Calculate scale based on time for smooth Ken Burns
        const startTime = parseInt(slide.getAttribute('data-start-time') || Date.now());
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / kenBurnsDuration, 1);
        
        if (zoomDirection === 'in') {
            return baseScale + (scaleVariation * progress);
        } else {
            return baseScale + (scaleVariation * (1 - progress));
        }
    }

    function startKenBurnsEffect(slide) {
        slide.setAttribute('data-start-time', Date.now());
        
        const zoomDirection = slide.getAttribute('data-zoom');
        const panDirection = slide.getAttribute('data-pan');
        
        let startX = '50%';
        let startY = '50%';
        let endX = '50%';
        let endY = '50%';
        
        // Set pan directions
        if (panDirection === 'left') {
            startX = '60%';
            endX = '40%';
        } else if (panDirection === 'right') {
            startX = '40%';
            endX = '60%';
        }
        
        slide.style.backgroundPosition = `${startX} ${startY}`;
        slide.style.transition = `background-position ${kenBurnsDuration}ms ease-out, transform ${kenBurnsDuration}ms ease-out`;
        
        // Trigger reflow
        slide.offsetHeight;
        
        // Apply Ken Burns animation
        setTimeout(() => {
            slide.style.backgroundPosition = `${endX} ${endY}`;
        }, 50);
    }

    function stopKenBurnsEffect(slide) {
        slide.style.transition = 'none';
    }

    function changeSlide() {
        if (isAnimating) return;
        
        const nextSlideIndex = (currentSlide + 1) % slides.length;
        manualChangeSlide(nextSlideIndex);
    }

    // Start slideshow
    slideTimer = setInterval(changeSlide, slideInterval);

    // Add smooth loading animation
    heroSlider.style.opacity = '0';
    heroSlider.style.transition = 'opacity 1s ease-in-out';
    
    window.addEventListener('load', () => {
        setTimeout(() => {
            heroSlider.style.opacity = '1';
        }, 300);
    });

    // Pause on hover for better user experience
    heroSlider.addEventListener('mouseenter', () => {
        heroSlider.setAttribute('data-paused', 'true');
        clearInterval(slideTimer);
    });

    heroSlider.addEventListener('mouseleave', () => {
        heroSlider.setAttribute('data-paused', 'false');
        slideTimer = setInterval(changeSlide, slideInterval);
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            goToSlide((currentSlide - 1 + slides.length) % slides.length);
        } else if (e.key === 'ArrowRight') {
            goToSlide((currentSlide + 1) % slides.length);
        }
    });

    // Animated Headline Rotation (fallback for Elementor)
    const animatedHeadlines = document.querySelectorAll('.elementor-headline-animation-type-wave .elementor-headline-dynamic-text');
    if (animatedHeadlines.length > 0) {
        let currentHeadlineIndex = 0;
        const headlineInterval = 2500; // 2.5 seconds per word

        function rotateHeadline() {
            animatedHeadlines.forEach((headline, index) => {
                headline.classList.remove('elementor-headline-text-active');
                if (index === currentHeadlineIndex) {
                    headline.classList.add('elementor-headline-text-active');
                }
            });
            
            currentHeadlineIndex = (currentHeadlineIndex + 1) % animatedHeadlines.length;
        }

        // Start headline rotation
        setInterval(rotateHeadline, headlineInterval);
    }

    // Mobile Dropdown Accordion
    const menuItemsWithChildren = document.querySelectorAll('.menu-item-has-children');
    
    menuItemsWithChildren.forEach(menuItem => {
        const parentLink = menuItem.querySelector('.elementor-item');
        
        if (parentLink && window.innerWidth <= 1024) {
            parentLink.addEventListener('click', (e) => {
                e.preventDefault();
                menuItem.classList.toggle('active');
            });
        }
    });

    // Handle window resize for dropdown behavior
    window.addEventListener('resize', () => {
        menuItemsWithChildren.forEach(menuItem => {
            if (window.innerWidth > 1024) {
                menuItem.classList.remove('active');
            }
        });
    });

    // Keyboard navigation for dropdowns
    menuItemsWithChildren.forEach(menuItem => {
        const parentLink = menuItem.querySelector('.elementor-item');
        const dropdown = menuItem.querySelector('.professional-dropdown');
        
        if (parentLink && dropdown) {
            parentLink.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    menuItem.classList.toggle('active');
                }
            });
        }
    });

    // Animated Counter Function
    function animateCounters() {
        const counters = document.querySelectorAll('.counter');
        
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'));
            const duration = 2000; // 2 seconds
            const step = target / (duration / 16); // 60fps
            let current = 0;
            
            const updateCounter = () => {
                current += step;
                if (current < target) {
                    counter.textContent = Math.floor(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target;
                }
            };
            
            // Use Intersection Observer to trigger animation when visible
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        updateCounter();
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.5 });
            
            observer.observe(counter);
        });
    }

    // Initialize counters when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', animateCounters);
    } else {
        animateCounters();
    }
});
