//new//

// Intersection Observer setup for animations and lazy loading
function setupIntersectionObserver() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Handle different element types
                if (entry.target.classList.contains('image-card')) {
                    // Animate image cards
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0) scale(1)';
                } else if (entry.target.classList.contains('ag-courses_item')) {
                    // Animate course items
                    entry.target.classList.add('visible');
                } else if (entry.target.classList.contains('exploremore')) {
                    // Animate explore more section
                    entry.target.classList.add('animated');
                } else if (entry.target.classList.contains('rating-grid')) {
                    // Animate rating numbers
                    animateRatingNumbers();
                }
                
                // Stop observing after animation
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all elements that need animation
    const elementsToObserve = [
        ...document.querySelectorAll('.image-card'),
        ...document.querySelectorAll('.ag-courses_item'),
        ...document.querySelectorAll('.exploremore'),
        ...document.querySelectorAll('.rating-grid')
    ];

    elementsToObserve.forEach(el => {
        if (el) observer.observe(el);
    });

    // Fallback for browsers without IntersectionObserver
    if (!('IntersectionObserver' in window)) {
        document.querySelectorAll('.image-card').forEach(card => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0) scale(1)';
        });
        document.querySelectorAll('.ag-courses_item').forEach(item => {
            item.classList.add('visible');
        });
        document.querySelector('.exploremore')?.classList.add('animated');
        animateRatingNumbers();
    }
}


// Filter reviews function
function filterReviews(type) {
    const sections = {
        professional: document.getElementById('professional-reviews'),
        user: document.getElementById('user-reviews'),
        all: document.getElementById('all-reviews')
    };
    
    // Update section visibility
    for (let key in sections) {
        if (sections[key]) {
            sections[key].classList.toggle('hidden', key !== type);
            sections[key].classList.toggle('visible', key === type);
        }
    }
    
    // Update button active state
    const buttons = document.querySelectorAll('.review-filter button');
    buttons.forEach(btn => btn.classList.toggle('active', 
        (type === 'professional' && btn === buttons[0]) ||
        (type === 'user' && btn === buttons[1]) ||
        (type === 'all' && btn === buttons[2])
    ));
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Set up Intersection Observer
    setupIntersectionObserver();

    // Back to top button
    const backToTopBtn = document.getElementById('backToTopBtn');
    if (backToTopBtn) {
        window.addEventListener('scroll', function() {
            backToTopBtn.classList.toggle('visible', window.scrollY > 300);
        });
        
        backToTopBtn.addEventListener('click', function() {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // Enhanced hover effect for cards
    document.querySelectorAll('.image-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const angleX = (y - centerY) / 20;
            const angleY = (centerX - x) / 20;
            
            card.style.transform = `translateY(-5px) rotateX(${angleX}deg) rotateY(${angleY}deg)`;
            card.style.boxShadow = `0 15px 30px rgba(0,0,0,0.2)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) rotateX(0) rotateY(0)';
            card.style.boxShadow = '0 4px 8px rgba(0,0,0,0.1)';
        });
    });

    // Page loader
    window.addEventListener('load', function() {
        const loader = document.getElementById('page-loader');
        if (loader) {
            loader.classList.add('hide');
            setTimeout(() => loader.style.display = 'none', 500);
        }
    });
});


