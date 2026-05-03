/*
  GECA - Global English and Computer Academy
  Main JavaScript File
*/

// =====================================================
// DOCUMENT READY
// =====================================================

function initializeApp() {
    // Hide loading spinner
    hideLoadingSpinner();
    
    // Initialize all features
    setupMobileMenu();
    setupScrollEffects();
    setupBackToTop();
    setupAnimations();
    setupFilterableCards();
    setupStatisticsCounter();
    setupSmoothScroll();
}

// =====================================================
// LOADING SPINNER
// =====================================================

function hideLoadingSpinner() {
    const spinner = document.getElementById('loading-spinner');
    if (spinner) {
        spinner.classList.remove('show');
        setTimeout(() => {
            spinner.style.display = 'none';
        }, 300);
    }
}

// =====================================================
// MOBILE MENU
// =====================================================

function setupMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (!hamburger || !navMenu) return;

    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // Close menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.nav-container')) {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        }
    });
}

// =====================================================
// SCROLL EFFECTS
// =====================================================

function setupScrollEffects() {
    const navbar = document.querySelector('.navbar');
    
    if (!navbar) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// =====================================================
// BACK TO TOP BUTTON
// =====================================================

function setupBackToTop() {
    const backToTopBtn = document.getElementById('back-to-top');

    if (!backToTopBtn) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// =====================================================
// SMOOTH SCROLL
// =====================================================

function setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const selector = this.getAttribute('href');

            if (!selector || selector === '#') return;

            e.preventDefault();
            const target = document.querySelector(selector);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
}

// =====================================================
// ANIMATIONS ON SCROLL
// =====================================================

function setupAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe animation elements
    document.querySelectorAll('.page-header-content, .section-title, .about-card, .service-card, .course-card, .course-card-large, .tutorial-card, .blog-card, .team-card, .testimonial-card, .expertise-card, .benefit-item, .info-card').forEach(el => {
        observer.observe(el);
    });
}

// =====================================================
// FILTERABLE CARD ENTRANCE STATES
// =====================================================

function setupFilterableCards() {
    document.querySelectorAll('.course-card-large, .tutorial-card').forEach((card, index) => {
        card.style.animationDelay = `${Math.min(index * 0.06, 0.45)}s`;
        card.classList.add('show');
    });
}

// =====================================================
// STATISTICS COUNTER
// =====================================================

function setupStatisticsCounter() {
    const statNumbers = document.querySelectorAll('.stat-number');

    if (statNumbers.length === 0) return;

    const observerOptions = {
        threshold: 0.5
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                animateCounter(entry.target);
                entry.target.classList.add('counted');
            }
        });
    }, observerOptions);

    statNumbers.forEach(stat => observer.observe(stat));
}

function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target'));
    const increment = target / 50; // 50 steps
    let current = 0;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 30);
}

// =====================================================
// FORM VALIDATION
// =====================================================

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validatePhone(phone) {
    const re = /^[\d\s\-\+\(\)]{10,}$/;
    return re.test(phone);
}

// =====================================================
// TESTIMONIALS SLIDER (Optional)
// =====================================================

function setupTestimonialsSlider() {
    const testimonials = document.querySelectorAll('.testimonial-card');
    if (testimonials.length <= 1) return;

    let currentIndex = 0;
    const slideInterval = 5000;

    setInterval(() => {
        testimonials.forEach(testimonial => {
            testimonial.style.opacity = '0';
            testimonial.style.display = 'none';
        });

        testimonials[currentIndex].style.display = 'block';
        setTimeout(() => {
            testimonials[currentIndex].style.opacity = '1';
        }, 50);

        currentIndex = (currentIndex + 1) % testimonials.length;
    }, slideInterval);
}

// =====================================================
// UTILITY FUNCTIONS
// =====================================================

function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        background: ${type === 'success' ? '#4CAF50' : '#f44336'};
        color: white;
        border-radius: 5px;
        z-index: 10000;
        animation: slideInRight 0.3s ease;
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// =====================================================
// PAGE-SPECIFIC FUNCTIONALITY
// =====================================================

// Initialize on page load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeApp);
} else {
    initializeApp();
}

// =====================================================
// SCROLL REVEAL ANIMATIONS
// =====================================================

const revealElements = () => {
    const reveals = document.querySelectorAll('.about-card, .service-card, .expertise-card, .benefit-item');
    
    reveals.forEach((reveal) => {
        const windowHeight = window.innerHeight;
        const elementTop = reveal.getBoundingClientRect().top;
        const elementVisible = 150;

        if (elementTop < windowHeight - elementVisible) {
            reveal.classList.add('slide-in');
        }
    });
};

window.addEventListener('scroll', revealElements, { passive: true });

// =====================================================
// DARK MODE TOGGLE (Optional Feature)
// =====================================================

function setupDarkModeToggle() {
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    
    if (isDarkMode) {
        document.body.classList.add('dark-mode');
    }

    // You can add a dark mode toggle button in the navbar if needed
}

// =====================================================
// LAZY LOADING IMAGES
// =====================================================

function setupLazyLoadingImages() {
    if ('IntersectionObserver' in window) {
        const images = document.querySelectorAll('img[data-src]');
        
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    }
}

// =====================================================
// PERFORMANCE OPTIMIZATION
// =====================================================

// Debounce function for scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function for frequent events
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// =====================================================
// ERROR HANDLING
// =====================================================

window.addEventListener('error', (e) => {
    console.error('Error:', e.error);
    showNotification('An error occurred. Please refresh the page.', 'error');
});

// =====================================================
// TRACKING & ANALYTICS (Optional)
// =====================================================

function trackEvent(eventName, eventData = {}) {
    console.log('Event:', eventName, eventData);
    // Add your analytics tracking here
}

// Track page views
trackEvent('page_view', {
    page: window.location.pathname,
    timestamp: new Date().toISOString()
});

// Track clicks
document.addEventListener('click', (e) => {
    if (e.target.tagName === 'A') {
        trackEvent('link_click', {
            href: e.target.href,
            text: e.target.textContent
        });
    }
}, true);

// =====================================================
// INITIALIZATION
// =====================================================

// Run setup functions
setupDarkModeToggle();
setupLazyLoadingImages();
setupTestimonialsSlider();
