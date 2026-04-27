// DOM Elements
const statNumbers = document.querySelectorAll('.stat-number');
const featureCards = document.querySelectorAll('.feature-card');
const navbar = document.querySelector('.navbar');

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

// Animate stats when they come into view
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statItem = entry.target;
            statItem.classList.add('animate');

            // Animate counter
            const target = parseInt(statItem.querySelector('.stat-number').dataset.target);
            animateCounter(statItem.querySelector('.stat-number'), target);
            statsObserver.unobserve(statItem);
        }
    });
}, observerOptions);

// Observe stat items
document.querySelectorAll('.stat-item').forEach(item => {
    statsObserver.observe(item);
});

// Animate feature cards on scroll
const featuresObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, index * 200);
            featuresObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

// Initial state for feature cards
featureCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'all 0.6s ease';
    featuresObserver.observe(card);
});

// Counter animation function
function animateCounter(element, target) {
    const duration = 2000; // 2 seconds
    const start = 0;
    const startTime = performance.now();

    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Easing function for smooth animation
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const current = Math.floor(start + (target - start) * easeOutQuart);

        element.textContent = current.toLocaleString();

        if (progress < 1) {
            requestAnimationFrame(update);
        } else {
            element.textContent = target.toLocaleString();
        }
    }

    requestAnimationFrame(update);
}

// Navbar scroll effect
let lastScrollY = window.scrollY;

window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;

    if (currentScrollY > 100) {
        navbar.style.background = 'rgba(10, 10, 10, 0.95)';
        navbar.style.backdropFilter = 'blur(30px)';
    } else {
        navbar.style.background = 'rgba(10, 10, 10, 0.8)';
        navbar.style.backdropFilter = 'blur(20px)';
    }

    lastScrollY = currentScrollY;
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add loading animation to body
document.addEventListener('DOMContentLoaded', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';

    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Mouse movement effect for hero background shapes
document.addEventListener('mousemove', (e) => {
    const shapes = document.querySelectorAll('.shape');
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;

    shapes.forEach((shape, index) => {
        const speed = (index + 1) * 0.5;
        const x = (mouseX - 0.5) * speed * 100;
        const y = (mouseY - 0.5) * speed * 100;

        shape.style.transform = `translate(${x}px, ${y}px)`;
    });
});

// Add glow effect to CTA button on hover
const ctaButton = document.querySelector('.cta-button');
ctaButton.addEventListener('mouseenter', () => {
    ctaButton.style.boxShadow = '0 0 30px rgba(102, 126, 234, 0.6), 0 12px 40px rgba(102, 126, 234, 0.4)';
});

ctaButton.addEventListener('mouseleave', () => {
    ctaButton.style.boxShadow = '0 8px 32px rgba(102, 126, 234, 0.3)';
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const rate = scrolled * -0.5;

    document.querySelector('.hero-bg').style.transform = `translateY(${rate}px)`;
});