// Fade-in and slide-up on scroll
document.addEventListener('DOMContentLoaded', function () {
  // Elements to animate
  const fadeEls = document.querySelectorAll('.fade-in');
  const slideEls = document.querySelectorAll('.slide-up');
  const silhouettes = document.querySelectorAll('.silhouettes img');

  // Intersection Observer for fade-in/slide-up
  const observer = new window.IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        entry.target.classList.add('animated');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  fadeEls.forEach(el => observer.observe(el));
  slideEls.forEach(el => observer.observe(el));
  silhouettes.forEach((img, idx) => {
    setTimeout(() => img.classList.add('visible'), 400 + idx * 200);
  });

  // Navbar background on scroll
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', function () {
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
});