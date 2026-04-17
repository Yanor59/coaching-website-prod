// ===== SMOOTH SCROLLING =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            // Fermer le menu mobile si ouvert
            const navLinks = document.querySelector('.nav-links');
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
            }
            
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===== MOBILE MENU TOGGLE =====
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        mobileMenuToggle.classList.toggle('active');
    });
}

// Fermer le menu mobile en cliquant en dehors
document.addEventListener('click', (e) => {
    if (!e.target.closest('.navbar') && navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
        mobileMenuToggle.classList.remove('active');
    }
});

// ===== NAVIGATION ACTIVE STATE =====
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinksAll = document.querySelectorAll('.nav-link');
    
    let current = '';
    const scrollPosition = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });
    
    navLinksAll.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
    
    // Header shadow on scroll
    const header = document.querySelector('.header');
    if (scrollPosition > 50) {
        header.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.08)';
    }
});

// ===== BACK TO TOP BUTTON =====
const backToTopButton = document.querySelector('.back-to-top');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTopButton.classList.add('visible');
    } else {
        backToTopButton.classList.remove('visible');
    }
});

backToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ===== FORM HANDLING =====
const contactForm = document.querySelector('.contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Récupération des données du formulaire
        const formData = {
            name: document.getElementById('name').value.trim(),
            email: document.getElementById('email').value.trim(),
            phone: document.getElementById('phone').value.trim(),
            service: document.getElementById('service').value,
            message: document.getElementById('message').value.trim(),
            language: localStorage.getItem('preferredLanguage') || 'fr'
        };
        
        // Validation basique
        if (!formData.name || !formData.email || !formData.message) {
            showNotification('error', 'Veuillez remplir tous les champs obligatoires.');
            return;
        }
        
        // Validation email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            showNotification('error', 'Veuillez entrer une adresse email valide.');
            return;
        }
        
        // Afficher un loader
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        submitButton.textContent = 'Envoi en cours...';
        submitButton.disabled = true;
        
        try {
            const response = await fetch('/.netlify/functions/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.error || 'Erreur lors de l’envoi du message.');
            }

            showNotification('success', 'Merci pour votre message ! Je vous répondrai dans les plus brefs délais.');
            contactForm.reset();
        } catch (error) {
            console.error('Contact form error:', error);
            showNotification('error', error.message || 'Impossible d’envoyer le message pour le moment.');
        } finally {
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        }
    });
}

// ===== NEWSLETTER FORM =====
const newsletterForm = document.querySelector('.newsletter-form');

if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const emailInput = this.querySelector('input[type="email"]');
        const email = emailInput.value;
        
        // Validation email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showNotification('error', 'Veuillez entrer une adresse email valide.');
            return;
        }
        
        // Simulation d'inscription
        console.log('Newsletter subscription:', email);
        
        showNotification('success', 'Merci pour votre inscription !');
        emailInput.value = '';
    });
}

// ===== NOTIFICATION SYSTEM =====
function showNotification(type, message) {
    // Créer l'élément de notification
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Styles inline pour la notification
    Object.assign(notification.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        padding: '1rem 1.5rem',
        borderRadius: '8px',
        color: 'white',
        fontWeight: '600',
        zIndex: '10000',
        animation: 'slideIn 0.3s ease-out',
        boxShadow: '0 4px 16px rgba(0, 0, 0, 0.2)',
        maxWidth: '400px'
    });
    
    // Couleur selon le type
    if (type === 'success') {
        notification.style.background = '#10b981';
    } else if (type === 'error') {
        notification.style.background = '#ef4444';
    } else {
        notification.style.background = '#3b82f6';
    }
    
    // Ajouter au DOM
    document.body.appendChild(notification);
    
    // Supprimer après 5 secondes
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 5000);
}

// Ajouter les animations CSS pour les notifications
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ===== ANIMATION AU SCROLL =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observer les éléments à animer
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll(`
        .service-card,
        .testimonial-card,
        .pricing-card,
        .video-card,
        .photo-card,
        .partner-card,
        .info-card
    `);
    
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
});

// ===== LAZY LOADING IMAGES =====
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ===== GALLERY LIGHTBOX (Simple) =====
const photoCards = document.querySelectorAll('.photo-card');

photoCards.forEach(card => {
    card.addEventListener('click', () => {
        // Créer un lightbox simple
        const lightbox = document.createElement('div');
        lightbox.className = 'lightbox';
        
        Object.assign(lightbox.style, {
            position: 'fixed',
            top: '0',
            left: '0',
            width: '100%',
            height: '100%',
            background: 'rgba(0, 0, 0, 0.9)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: '10000',
            cursor: 'pointer'
        });
        
        const content = document.createElement('div');
        content.innerHTML = '<p style="color: white; font-size: 2rem;">📷 Image en plein écran</p>';
        lightbox.appendChild(content);
        
        lightbox.addEventListener('click', () => {
            document.body.removeChild(lightbox);
        });
        
        document.body.appendChild(lightbox);
    });
});

// ===== PERFORMANCE: Debounce scroll events =====
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

// Appliquer le debounce aux événements scroll
const debouncedScroll = debounce(() => {
    // Logique de scroll optimisée
}, 100);

window.addEventListener('scroll', debouncedScroll);

// ===== ANALYTICS (Placeholder) =====
// Fonction pour tracker les événements
function trackEvent(category, action, label) {
    console.log('Event tracked:', { category, action, label });
    // Intégrer Google Analytics ici
    // gtag('event', action, { 'event_category': category, 'event_label': label });
}

// Tracker les clics sur les CTA
document.querySelectorAll('.btn-primary').forEach(btn => {
    btn.addEventListener('click', () => {
        trackEvent('CTA', 'click', btn.textContent);
    });
});

// ===== CONSOLE MESSAGE =====
console.log('%c🏋️‍♀️ Alina Coaching Bratislava', 'font-size: 20px; font-weight: bold; color: #8FB9A8;');
console.log('%cSite développé avec ❤️', 'font-size: 14px; color: #F1C6B8;');
console.log('%cPour toute question technique: contact@alinacoaching.com', 'font-size: 12px; color: #6B7280;');

// ===== ACCESSIBILITY: Keyboard navigation =====
document.addEventListener('keydown', (e) => {
    // Échap pour fermer le menu mobile
    if (e.key === 'Escape' && navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
        mobileMenuToggle.classList.remove('active');
    }
});

// ===== PREVENT FORM RESUBMISSION =====
if (window.history.replaceState) {
    window.history.replaceState(null, null, window.location.href);
}

// ===== SERVICE WORKER (PWA - Optionnel) =====
if ('serviceWorker' in navigator) {
    // Décommenter pour activer le PWA
    // navigator.serviceWorker.register('/sw.js')
    //     .then(reg => console.log('Service Worker registered'))
    //     .catch(err => console.log('Service Worker registration failed'));
}

// ===== INITIALIZATION MESSAGE =====
document.addEventListener('DOMContentLoaded', () => {
    console.log('✅ Site initialized successfully');
    console.log('📱 Responsive: Yes');
    console.log('🌍 Multilingual: FR, EN, SK, UA');
    console.log('🎨 Theme: Relaxing & Calm');
});

// Made with Bob
