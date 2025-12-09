document.addEventListener('DOMContentLoaded', function() {
    /* =========================
       Page Loader Hide on Load
    ========================= */
    const loader = document.getElementById('page-loader');
    if (loader) {
        window.addEventListener('load', function() {
            loader.classList.add('hide');
            setTimeout(() => {
                loader.style.display = 'none';
            }, 500);
        });
    }

    /* =========================
       Scroll-triggered animations (Intersection Observer)
    ========================= */
    const observeElements = (selectors, className = 'visible', threshold = 0.1, rootMargin = '0px 0px -50px 0px') => {
        if ('IntersectionObserver' in window) {
            const observerOptions = {
                threshold: threshold,
                rootMargin: rootMargin
            };
    
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add(className);
                        observer.unobserve(entry.target);
                    }
                });
            }, observerOptions);
    
            const elements = document.querySelectorAll(selectors);
            elements.forEach(el => observer.observe(el));
        } else {
            // Fallback for older browsers
            document.querySelectorAll(selectors).forEach(el => el.classList.add(className));
        }
    };

    // Observe the correct elements - matches your HTML classes
    observeElements('.image-cards', 'visible');
    observeElements('.introduction.class', 'visible');
    observeElements('.exploremore', 'animated');

    /* =========================
       Back to Top Button
    ========================= */
    const backToTopBtn = document.querySelector('.back-to-top');
    if (backToTopBtn) {
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        });
    
        backToTopBtn.addEventListener('click', function() {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    /* =========================
       Read More / Read Less Toggle
    ========================= */
    const readMoreBtns = document.querySelectorAll('.read-more-btn');
    readMoreBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const cardText = this.previousElementSibling;
            cardText.classList.toggle('expanded');
            this.textContent = cardText.classList.contains('expanded') ? 'Read less' : 'Read more';
        });
    });

    /* =========================
       Comment Button Toggle
    ========================= */
    const commentBtns = document.querySelectorAll('.comment-btn');
    commentBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const commentsSection = this.closest('.image-card-footer').nextElementSibling;
            commentsSection.style.display = commentsSection.style.display === 'block' ? 'none' : 'block';
        });
    });

    /* =========================
       Like / Dislike Functionality
    ========================= */
    const likeBtns = document.querySelectorAll('.like-btn, .dislike-btn');
    likeBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const parent = this.closest('.interaction-buttons');
            parent.querySelectorAll('.like-btn, .dislike-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Update count
            const countElement = this.querySelector('i').nextSibling;
            if (countElement && countElement.nodeType === Node.TEXT_NODE) {
                let count = parseInt(countElement.textContent.trim()) || 0;
                countElement.textContent = ' ' + (count + 1);
            }
        });
    });

    /* =========================
       Scrolling Text Animation
    ========================= */
    const text = document.getElementById('scrollingText');
    if (text) {
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
});