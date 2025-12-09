// Trending text scroll
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

// Fade-in and slide-up on scroll
document.addEventListener('DOMContentLoaded', function () {
  const fadeEls = document.querySelectorAll('.fade-in');
  const slideEls = document.querySelectorAll('.slide-up');
  const banners = document.querySelectorAll('.hero-banner, .hero-banner2, .hero-banner5');

  const observer = new window.IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible', 'animated');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  
  fadeEls.forEach(el => observer.observe(el));
  slideEls.forEach(el => observer.observe(el));
  banners.forEach(banner => observer.observe(banner));
  
  // Navbar background on scroll
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 60) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    });
  }
  
  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
  
  // Initialize back to top button
  const backToTopBtn = document.getElementById('backToTopBtn');
  if (backToTopBtn) {
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
  }
  
  // Animate the exploremore link entrance
  const explore = document.querySelector('.exploremore');
  if (explore) {
    setTimeout(() => {
      explore.classList.add('animated');
    }, 400);
  }
});

// Page loader
window.addEventListener('load', function () {
  setTimeout(function () {
    const loader = document.getElementById('page-loader');
    if (loader) {
      loader.style.opacity = '0';
      setTimeout(() => {
        loader.style.display = 'none';
        loader.setAttribute('aria-hidden', 'true');
      }, 600);
    }
  }, 400);
});

