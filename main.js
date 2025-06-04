// DOM Elements
const preloader = document.querySelector('.preloader');
const header = document.getElementById('header');
const mobileMenu = document.querySelector('.mobile-menu');
const navLinks = document.querySelector('.nav-links');
const navLinksItems = document.querySelectorAll('.nav-link');
const backToTop = document.getElementById('backToTop');
const planoToggle = document.getElementById('plano-toggle');
const planosPriceAnnual = document.querySelectorAll('.plano-price.annual');
const planosPriceMonthly = document.querySelectorAll('.plano-price.monthly');
const toggleLabels = document.querySelectorAll('.toggle-label');
const faqItems = document.querySelectorAll('.faq-item');
const screenDots = document.querySelectorAll('.screen-dot');
const appScreens = document.querySelectorAll('.app-screen');
const kmRange = document.getElementById('km-mensal');
const kmValue = document.getElementById('km-value');
const calcularBtn = document.getElementById('calcular-btn');
const economiaValor = document.getElementById('economia-valor');
const economiaPercent = document.getElementById('economia-percent');
const testimonialTrack = document.querySelector('.testimonial-track');
const testimonialDots = document.querySelectorAll('.testimonial-dots .dot');
const testimonialPrev = document.getElementById('testimonial-prev');
const testimonialNext = document.getElementById('testimonial-next');
const videoModal = document.getElementById('video-modal');
const openVideo = document.getElementById('open-video');
const closeVideo = document.getElementById('close-video');
const playVideoBtn = document.getElementById('play-video-btn');
const contactForm = document.getElementById('contactForm');

// Initialize AOS (Animate on Scroll)
AOS.init({
    duration: 800,
    easing: 'ease-out',
    once: true,
    offset: 100
});

// Preloader
window.addEventListener('load', () => {
    setTimeout(() => {
        preloader.classList.add('fade-out');
    }, 500);
});

// Mobile Menu Toggle
mobileMenu?.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
    navLinks.classList.toggle('active');
    
    // Prevent scrolling when menu is open
    if (navLinks.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = 'auto';
    }
});

// Close mobile menu when clicking on links
navLinksItems.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        navLinks.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
});

const logoImg = document.querySelector('div.logo img');
let ticking = false;

function updateLogo() {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
        logoImg.src = 'logo-black.png';
    } else {
        header.classList.remove('scrolled');
        logoImg.src = 'logo.png';
    }
    ticking = false;
}

// Header scroll effect
window.addEventListener('scroll', function() {
    if (!ticking) {
        requestAnimationFrame(updateLogo);
        ticking = true;
    }
});
// Back to top button
backToTop?.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// FAQ accordion
faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    
    question.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        
        // Close all items
        faqItems.forEach(faqItem => {
            faqItem.classList.remove('active');
        });
        
        // Open clicked item if it wasn't active
        if (!isActive) {
            item.classList.add('active');
        }
    });
});

// App screen slider
screenDots.forEach(dot => {
    dot.addEventListener('click', () => {
        const screenId = dot.getAttribute('data-screen');
        
        // Remove active class from all screens and dots
        appScreens.forEach(screen => screen.classList.remove('active'));
        screenDots.forEach(d => d.classList.remove('active'));
        
        // Add active class to selected screen and dot
        document.getElementById(screenId).classList.add('active');
        dot.classList.add('active');
    });
});

// Animate counter values
function animateValue(element, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const value = Math.floor(progress * (end - start) + start);
        element.textContent = value.toLocaleString();
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// Animate stats on scroll
const statNumbers = document.querySelectorAll('.stat-number');
const counters = document.querySelectorAll('.counter');

function animateStats() {
    statNumbers.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-count'));
        animateValue(stat, 0, target, 2000);
    });
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-count'));
        animateValue(counter, 0, target, 2000);
    });
}

// Animate chart bars
const barFills = document.querySelectorAll('.bar-fill');

function animateCharts() {
    barFills.forEach(bar => {
        const height = bar.getAttribute('data-height');
        setTimeout(() => {
            bar.style.height = height;
        }, 300);
    });
}

// Contact form submission
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Show loading state
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
        
        // Hide previous responses
        const successResponse = contactForm.querySelector('.form-response.success');
        const errorResponse = contactForm.querySelector('.form-response.error');
        successResponse.style.display = 'none';
        errorResponse.style.display = 'none';
        
        // Simulate form submission (replace with actual AJAX in production)
        setTimeout(() => {
            // Show success message
            successResponse.style.display = 'flex';
            
            // Reset form
            contactForm.reset();
            
            // Reset button
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;
            
            // Hide success message after 5 seconds
            setTimeout(() => {
                successResponse.style.display = 'none';
            }, 5000);
        }, 2000);
    });
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.2
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            if (entry.target.classList.contains('economia-chart')) {
                animateCharts();
            }
            
            if (entry.target.classList.contains('hero-stats') || 
                entry.target.classList.contains('economia-stats') || 
                entry.target.classList.contains('map-stats')) {
                animateStats();
            }
        }
    });
}, observerOptions);

// Observe elements
document.querySelectorAll('.economia-chart, .hero-stats, .economia-stats, .map-stats').forEach(el => {
    observer.observe(el);
});

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    // Set default display for pricing
    planosPriceMonthly.forEach(price => price.style.display = 'none');
    
    // Set active nav link based on scroll position
    updateActiveNavLink();
});

// Update active nav link on scroll
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinksItems.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// Adicionando ao main.js existente

// Termos Modal
const termosModal = document.getElementById('termos-modal');
const openTermos = document.querySelectorAll('a[href="#termos-modal"]');
const closeTermos = document.getElementById('close-termos');

if (openTermos.length > 0) {
    openTermos.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            termosModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });
}

if (closeTermos) {
    closeTermos.addEventListener('click', () => {
        termosModal.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
}

// Close modal when clicking outside
if (termosModal) {
    termosModal.addEventListener('click', (e) => {
        if (e.target === termosModal) {
            termosModal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
}

// Form Validation for Cadastro Form
const cadastroForm = document.getElementById('cadastroForm');
if (cadastroForm) {
    cadastroForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Show loading state
        const submitBtn = cadastroForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
        
        // Simulate form submission (replace with actual AJAX in production)
        setTimeout(() => {
            // Show success message
            alert('Cadastro enviado com sucesso! Nossa equipe entrará em contato em breve para dar continuidade ao processo de credenciamento.');
            
            // Reset form
            cadastroForm.reset();
            
            // Reset button
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalText;
        }, 2000);
    });
}

// Mask for CNPJ and phone inputs
const cnpjInput = document.getElementById('cnpj');
const phoneInput = document.getElementById('telefone');
const contatoPhoneInput = document.getElementById('contato-telefone');

function maskCNPJ(input) {
    let value = input.value.replace(/\D/g, '');
    value = value.replace(/^(\d{2})(\d)/, '$1.$2');
    value = value.replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3');
    value = value.replace(/\.(\d{3})(\d)/, '.$1/$2');
    value = value.replace(/(\d{4})(\d)/, '$1-$2');
    input.value = value;
}

function maskPhone(input) {
    let value = input.value.replace(/\D/g, '');
    value = value.replace(/^(\d{2})(\d)/g, '($1) $2');
    value = value.replace(/(\d)(\d{4})$/, '$1-$2');
    input.value = value;
}

if (cnpjInput) {
    cnpjInput.addEventListener('input', () => maskCNPJ(cnpjInput));
}

if (phoneInput) {
    phoneInput.addEventListener('input', () => maskPhone(phoneInput));
}

if (contatoPhoneInput) {
    contatoPhoneInput.addEventListener('input', () => maskPhone(contatoPhoneInput));
}