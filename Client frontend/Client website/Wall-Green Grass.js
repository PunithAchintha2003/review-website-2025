document.addEventListener('DOMContentLoaded', function() {
    // Set up the Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
  
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
  
    // Observe all animated elements
    const animatedElements = document.querySelectorAll(
        '.image-card, .ag-courses_item, .introduction.class, .carousel'
    );
    animatedElements.forEach(el => observer.observe(el));
  
    // Fallback for older browsers
    if (!('IntersectionObserver' in window)) {
        animatedElements.forEach(el => el.classList.add('visible'));
    }
  
    /* =========================
       Back to Top Button Logic
       ========================= */
    const backToTopBtn = document.getElementById('backToTopBtn');
    if (backToTopBtn) {
        const handleScroll = function() {
            if (window.scrollY > 300) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        };
        
        window.addEventListener('scroll', handleScroll);
        backToTopBtn.addEventListener('click', function() {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
  
        // Initialize state
        handleScroll();
    }
  
    
    const explore = document.querySelector('.exploremore');
    if (explore) {
        setTimeout(() => {
           explore.classList.add('animated');
        }, 400);
    }
  
    /* =========================
       Enhanced Carousel JavaScript
       ========================= */
    const carousels = document.querySelectorAll('.carousel');
    
    carousels.forEach(carousel => {
        // Preload images for smoother transitions
        const images = carousel.querySelectorAll('img');
        images.forEach(img => {
            if (!img.complete) {
                img.style.visibility = 'hidden';
                img.onload = function() {
                    img.style.visibility = 'visible';
                    img.classList.add('loaded');
                };
            } else {
                img.classList.add('loaded');
            }
        });
  
        // Add momentum to manual sliding
        let startX, moveX;
        const inner = carousel.querySelector('.carousel-inner');
        
        const touchStartHandler = (e) => {
            startX = e.touches[0].clientX;
        };
        
        const touchMoveHandler = (e) => {
            if (!startX) return;
            moveX = e.touches[0].clientX;
            const diff = moveX - startX;
            inner.style.transform = `translateX(${diff}px)`;
        };
        
        const touchEndHandler = (e) => {
            if (!startX || !moveX) return;
            const diff = moveX - startX;
            const threshold = carousel.offsetWidth / 4;
            
            if (Math.abs(diff) > threshold) {
                if (diff > 0) {
                    // Check if jQuery is available
                    if (window.jQuery) {
                        $(carousel).carousel('prev');
                    }
                } else {
                    if (window.jQuery) {
                        $(carousel).carousel('next');
                    }
                }
            }
            
            // Reset
            inner.style.transform = '';
            startX = null;
            moveX = null;
        };
  
        carousel.addEventListener('touchstart', touchStartHandler, { passive: true });
        carousel.addEventListener('touchmove', touchMoveHandler, { passive: true });
        carousel.addEventListener('touchend', touchEndHandler, { passive: true });
  
        // Pause on hover for better UX
        if (window.jQuery) {
            carousel.addEventListener('mouseenter', () => {
                $(carousel).carousel('pause');
            });
            
            carousel.addEventListener('mouseleave', () => {
                $(carousel).carousel('cycle');
            });
        }
  
        // Add resize observer for responsive adjustments
        if ('ResizeObserver' in window) {
            const resizeObserver = new ResizeObserver(entries => {
                entries.forEach(entry => {
                    const currentCarousel = entry.target;
                    const indicators = currentCarousel.querySelector('.carousel-indicators');
                    if (indicators) {
                        indicators.style.maxWidth = `${currentCarousel.offsetWidth}px`;
                    }
                });
            });
            
            resizeObserver.observe(carousel);
        }
    });
  });
  
  /* =========================
   Page Loader Hide on Load
   ========================= */
  window.addEventListener('load', function() {
    const loader = document.getElementById('page-loader');
    if (loader) {
        loader.classList.add('hide');
        setTimeout(() => {
            loader.style.display = 'none';
        }, 500);
    }
  });
  
  /* =========================
   Debounced Scroll Event (for future use)
   ========================= */
  let ticking = false;
  window.addEventListener('scroll', function() {
    if (!ticking) {
        window.requestAnimationFrame(function() {
            // Your scroll logic here
            ticking = false;
        });
        ticking = true;
    }
  }, { passive: true });