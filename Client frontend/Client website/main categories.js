// Intersection Observer for scroll-triggered animations
document.addEventListener('DOMContentLoaded', function() {
  // Set up the Intersection Observer
  const observerOptions = {
      threshold: 0.1, // Trigger when 10% of element is visible
      rootMargin: '0px 0px -50px 0px' // Adjust when animation triggers (negative = earlier)
  };

  const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
          if (entry.isIntersecting) {
              entry.target.classList.add('visible');
              // Optional: Unobserve after animation to improve performance
              observer.unobserve(entry.target);
          }
      });
  }, observerOptions);

  // Observe all cards
  const cards = document.querySelectorAll('.image-card, .ag-courses_item');
  cards.forEach(card => {
      observer.observe(card);
  });

  // Optional: For older browsers that don't support IntersectionObserver
  if (!('IntersectionObserver' in window)) {
      cards.forEach(card => card.classList.add('visible'));
  }
});

document.addEventListener('DOMContentLoaded', function() {
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
});

/* =========================
 Back to Top Button Logic
 ========================= */
 const backToTopBtn = document.getElementById('backToTopBtn');
 window.addEventListener('scroll', function() {
     if (window.scrollY > 300) {
         backToTopBtn.classList.add('visible');
     } else {
         backToTopBtn.classList.remove('visible');
     }
 });
 backToTopBtn.addEventListener('click', function() {
     window.scrollTo({ top: 0, behavior: 'smooth' });
 });

 // Animate the exploremore link entrance
 const explore = document.querySelector('.exploremore');
 if (explore) {
     setTimeout(() => {
         explore.classList.add('animated');
     }, 400);
 }

 /* =========================
 Page Loader Hide on Load
 ========================= */
window.addEventListener('load', function() {
  const loader = document.getElementById('page-loader');
  if (loader) {
      loader.classList.add('hide');
      setTimeout(() => loader.style.display = 'none', 500);
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

// Enhanced Carousel JavaScript
document.addEventListener('DOMContentLoaded', function() {
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
    
    carousel.addEventListener('touchstart', (e) => {
      startX = e.touches[0].clientX;
    }, { passive: true });
    
    carousel.addEventListener('touchmove', (e) => {
      if (!startX) return;
      moveX = e.touches[0].clientX;
      const diff = moveX - startX;
      inner.style.transform = `translateX(${diff}px)`;
    }, { passive: true });
    
    carousel.addEventListener('touchend', (e) => {
      if (!startX || !moveX) return;
      const diff = moveX - startX;
      const threshold = carousel.offsetWidth / 4;
      
      if (Math.abs(diff) > threshold) {
        if (diff > 0) {
          $(carousel).carousel('prev');
        } else {
          $(carousel).carousel('next');
        }
      }
      
      // Reset
      inner.style.transform = '';
      startX = null;
      moveX = null;
    }, { passive: true });

    // Pause on hover for better UX
    carousel.addEventListener('mouseenter', () => {
      $(carousel).carousel('pause');
    });
    
    carousel.addEventListener('mouseleave', () => {
      $(carousel).carousel('cycle');
    });
  });

  // Add resize observer for responsive adjustments
  const resizeObserver = new ResizeObserver(entries => {
    entries.forEach(entry => {
      const carousel = entry.target;
      const indicators = carousel.querySelector('.carousel-indicators');
      if (indicators) {
        indicators.style.maxWidth = `${carousel.offsetWidth}px`;
      }
    });
  });

  carousels.forEach(carousel => {
    resizeObserver.observe(carousel);
  });
});


