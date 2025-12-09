// Smooth Slide Toggle Utility
function slideUp(element, duration = 300) {
    element.style.height = element.scrollHeight + 'px';
    element.offsetHeight;
    element.style.transitionProperty = 'height, margin, padding';
    element.style.transitionDuration = duration + 'ms';
    element.style.overflow = 'hidden';
    element.style.height = '0';
    element.style.paddingTop = '0';
    element.style.paddingBottom = '0';
    element.style.marginTop = '0';
    element.style.marginBottom = '0';

    window.setTimeout(() => {
        element.classList.remove('show');
        element.style.removeProperty('height');
        element.style.removeProperty('padding-top');
        element.style.removeProperty('padding-bottom');
        element.style.removeProperty('margin-top');
        element.style.removeProperty('margin-bottom');
        element.style.removeProperty('overflow');
        element.style.removeProperty('transition-duration');
        element.style.removeProperty('transition-property');
        element.style.display = 'none';
    }, duration);
}

function slideDown(element, duration = 300) {
    element.classList.add('show');
    element.style.removeProperty('display');
    let display = window.getComputedStyle(element).display;
    if (display === 'none') display = 'block';
    element.style.display = display;

    const height = element.scrollHeight;
    element.style.height = '0';
    element.style.overflow = 'hidden';
    element.style.transitionProperty = 'height, margin, padding';
    element.style.transitionDuration = duration + 'ms';
    element.offsetHeight;

    element.style.height = height + 'px';

    window.setTimeout(() => {
        element.style.removeProperty('height');
        element.style.removeProperty('overflow');
        element.style.removeProperty('transition-duration');
        element.style.removeProperty('transition-property');
    }, duration);
}

// Accordion Functionality (Stable with two items too)
let lastOpenedItem = null;

document.querySelectorAll('.accordion-item').forEach(item => {
    const button = item.querySelector('.accordion-button');
    const collapse = item.querySelector('.accordion-collapse');

    button.addEventListener('click', () => {
        const isOpen = collapse.classList.contains('show');

        if (isOpen) {
            // Close current one
            button.classList.add('collapsed');
            slideUp(collapse);
            lastOpenedItem = null;
        } else {
            // Close previous
            if (lastOpenedItem && lastOpenedItem !== item) {
                const prevButton = lastOpenedItem.querySelector('.accordion-button');
                const prevCollapse = lastOpenedItem.querySelector('.accordion-collapse');
                prevButton.classList.add('collapsed');
                slideUp(prevCollapse);
            }

            // Open current
            button.classList.remove('collapsed');
            slideDown(collapse);
            lastOpenedItem = item;
        }
    });
});

// Back to Top Button
const backToTopBtn = document.getElementById('backToTopBtn');
if (backToTopBtn) {
    const toggleVisibility = () => {
        backToTopBtn.classList.toggle('visible', window.scrollY > 300);
    };

    window.addEventListener('scroll', () => {
        window.requestAnimationFrame(toggleVisibility);
    });

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// Page Loader
window.addEventListener('load', () => {
    const loader = document.getElementById('page-loader');
    if (!loader) return;

    const hideLoader = () => {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none';
            loader.setAttribute('aria-hidden', 'true');
        }, 600);
    };

    setTimeout(hideLoader, 400);
});