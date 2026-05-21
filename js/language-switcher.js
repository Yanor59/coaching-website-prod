// ===== LANGUAGE SWITCHER =====
// Manages language selection and applies translations from site-content.json

// Change language function
function changeLanguage(lang) {
    const supportedLanguages = ['fr', 'en', 'sk', 'ua'];
    
    if (!supportedLanguages.includes(lang)) {
        console.error(`Language ${lang} not supported`);
        return;
    }
    
    // Save selected language
    localStorage.setItem('preferredLanguage', lang);
    
    // Apply content from site-content.json via content-loader.js
    if (typeof window.applySiteContent === 'function') {
        window.applySiteContent(lang);
    } else {
        console.warn('applySiteContent function not available');
    }
    
    // Render events for the new language
    if (typeof window.renderEventsForLanguage === 'function') {
        window.renderEventsForLanguage(lang);
    }
    
    // Update language buttons
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-lang') === lang) {
            btn.classList.add('active');
        }
    });
    
    // Update legal links for the new language
    if (typeof updateLegalLinks === 'function') {
        updateLegalLinks();
    }
    
    // Update HTML lang attribute
    document.documentElement.lang = lang;
}

// Initialize language switcher on page load
document.addEventListener('DOMContentLoaded', () => {
    // Toggle dropdown
    const langToggle = document.getElementById('publicLangToggle');
    const langDropdown = document.getElementById('publicLangDropdown');
    
    if (langToggle && langDropdown) {
        langToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            langDropdown.classList.toggle('active');
        });
        
        // Close dropdown when clicking outside
        document.addEventListener('click', (e) => {
            if (!langToggle.contains(e.target) && !langDropdown.contains(e.target)) {
                langDropdown.classList.remove('active');
            }
        });
    }
    
    // Add event listeners to language buttons
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const lang = btn.getAttribute('data-lang');
            changeLanguage(lang);
            
            // Close dropdown after selection
            if (langDropdown) {
                langDropdown.classList.remove('active');
            }
        });
    });
});

// Made with Bob