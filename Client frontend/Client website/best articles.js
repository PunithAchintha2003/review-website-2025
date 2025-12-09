/**
 * Main Application Scripts
 * Contains all DOM manipulation and event handlers
 */
(function() {
    'use strict';

    // DOM Ready handler
    document.addEventListener('DOMContentLoaded', function() {
        initializeTrendingTextScroll();
        setupNavbarScrollEffect();
        setupSmoothScrolling();
        initializeBackToTopButton();
        setupPageLoader();
        setPublishedDate();
        setupImageCardsAnimation();
        setupArticleAnimations();
        setupImageHoverEffects();
        setupFAQBarAnimation();
        initializeGlobalAnimations();
    });

    // ==============================================
    // ANIMATION & SCROLL EFFECTS
    // ==============================================

    /**
     * Initialize trending text scroll animation
     */
    function initializeTrendingTextScroll() {
        const text = document.getElementById('scrollingText');
        if (!text) return;

        let pos = text.offsetWidth;
        
        function scroll() {
            pos--;
            if (pos < -text.offsetWidth) {
                pos = text.parentElement.offsetWidth;
            }
            text.style.transform = `translateX(${pos}px)`;
            requestAnimationFrame(scroll);
        }
        
        scroll();
    }

    /**
     * Setup navbar background change on scroll
     */
    function setupNavbarScrollEffect() {
        const navbar = document.querySelector('.navbar');
        if (!navbar) return;

        function updateNavbarState() {
            if (window.scrollY > 60) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }

        window.addEventListener('scroll', updateNavbarState);
        updateNavbarState(); // Initialize state
    }

    /**
     * Setup smooth scrolling for anchor links
     */
    function setupSmoothScrolling() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;
                
                const target = document.querySelector(targetId);
                if (target) {
                    e.preventDefault();
                    const navbar = document.querySelector('.navbar');
                    const navbarHeight = navbar ? navbar.offsetHeight : 0;
                    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                    
                    // Update URL without jumping
                    if (history.pushState) {
                        history.pushState(null, null, targetId);
                    } else {
                        window.location.hash = targetId;
                    }
                }
            });
        });
    }

    /**
     * Initialize back to top button functionality
     */
    function initializeBackToTopButton() {
        const backToTopBtn = document.getElementById('backToTopBtn');
        if (!backToTopBtn) return;

        window.addEventListener('scroll', function() {
            if (window.scrollY > 300) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        });
        
        backToTopBtn.addEventListener('click', function() {
            window.scrollTo({ 
                top: 0, 
                behavior: 'smooth' 
            });
        });
    }

    // ==============================================
    // PAGE LOADING & INITIALIZATION
    // ==============================================

    /**
     * Setup page loader transition
     */
    function setupPageLoader() {
        window.addEventListener('load', function() {
            setTimeout(function() {
                const loader = document.getElementById('page-loader');
                if (loader) {
                    loader.classList.add('hide');
                    setTimeout(() => {
                        loader.style.display = 'none';
                    }, 600);
                }
            }, 400);
        });
    }

    /**
     * Set the current published date
     */
    function setPublishedDate() {
        const dateElement = document.getElementById('published-date');
        if (!dateElement) return;

        dateElement.textContent = new Date().toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }

    // ==============================================
    // CONTENT ANIMATIONS
    // ==============================================

    /**
     * Setup image cards entrance animation
     */
    function setupImageCardsAnimation() {
        const imageCardsSection = document.querySelector('.image-cards-container');
        if (!imageCardsSection) return;

        const sectionTitle = imageCardsSection.querySelector('.section-title');
        const imageCards = imageCardsSection.querySelectorAll('.image-card');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    imageCardsSection.classList.add('loaded');
                    
                    // Animate title first
                    if (sectionTitle) {
                        sectionTitle.classList.add('visible');
                    }
                    
                    // Animate cards with staggered delay
                    imageCards.forEach((card, index) => {
                        setTimeout(() => {
                            card.classList.add('visible');
                        }, 150 * (index + 1));
                    });
                    
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        });
        
        observer.observe(imageCardsSection);
    }

    /**
     * Setup article content animations
     */
    function setupArticleAnimations() {
        // Paragraph and heading animations
        const animateOnScroll = () => {
            const articleContent = document.querySelector('.article-content');
            if (!articleContent) return;

            const paragraphs = articleContent.querySelectorAll('p');
            const headings = articleContent.querySelectorAll('h2');
            
            const observer = new IntersectionObserver((entries) => {
                entries.forEach((entry, index) => {
                    if (entry.isIntersecting) {
                        setTimeout(() => {
                            entry.target.classList.add('visible');
                        }, index * 50);
                        observer.unobserve(entry.target);
                    }
                });
            }, {
                threshold: 0.1,
                rootMargin: '0px 0px -100px 0px'
            });
            
            paragraphs.forEach(para => observer.observe(para));
            headings.forEach(heading => observer.observe(heading));
        };

        // Article header animations
        const articleHeader = document.querySelector('.article-header');
        if (articleHeader) {
            const headerObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const h1 = entry.target.querySelector('h1');
                        const subtitle = entry.target.querySelector('.subtitle');
                        const authorInfo = entry.target.querySelector('.author-info');
                        
                        setTimeout(() => {
                            if (h1) h1.classList.add('visible');
                        }, 100);
                        
                        setTimeout(() => {
                            if (subtitle) subtitle.classList.add('visible');
                        }, 200);
                        
                        setTimeout(() => {
                            if (authorInfo) authorInfo.classList.add('visible');
                        }, 300);
                        
                        headerObserver.unobserve(entry.target);
                    }
                });
            }, {
                threshold: 0.2
            });
            
            headerObserver.observe(articleHeader);
        }

        // Initialize the paragraph animations after a short delay
        setTimeout(animateOnScroll, 500);
    }

    // ==============================================
    // INTERACTIVE ELEMENTS
    // ==============================================

    /**
     * Setup image hover effects
     */
    function setupImageHoverEffects() {
        const images = document.querySelectorAll('.article-content img, .image-card-img');
        images.forEach(img => {
            img.addEventListener('mouseenter', () => {
                img.style.transform = 'scale(1.02)';
                img.style.boxShadow = '0 10px 20px rgba(0,0,0,0.1)';
            });
            img.addEventListener('mouseleave', () => {
                img.style.transform = 'scale(1)';
                img.style.boxShadow = 'none';
            });
        });
    }

    /**
     * Setup FAQ bar text animation
     */
    function setupFAQBarAnimation() {
        const faqBarText = document.querySelector('.faq-bar span');
        if (!faqBarText) return;

        const faqObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    faqObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.5
        });
        
        faqObserver.observe(faqBarText);
    }

    // ==============================================
    // GLOBAL ANIMATIONS
    // ==============================================

    /**
     * Initialize all elements with fade-in or slide-up classes
     */
    function initializeGlobalAnimations() {
        const animatedElements = document.querySelectorAll('.fade-in, .slide-up');
        
        const animationObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    animationObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        });
        
        animatedElements.forEach(el => {
            animationObserver.observe(el);
        });

        console.log('Enhanced article loaded successfully with animations!');
    }
})();