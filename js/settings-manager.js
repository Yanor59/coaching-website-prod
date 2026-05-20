// ===== SETTINGS MANAGER =====
// Gestion des paramètres du site (contact, réseaux sociaux, liens légaux)

let settingsData = null;

// ===== RENDER SETTINGS MANAGER =====
function renderSettingsManager() {
    const mainContent = document.querySelector('.admin-content');
    if (!mainContent || !siteContent) {
        console.error('Cannot render settings manager');
        return;
    }
    
    const t = (key) => typeof adminI18n !== 'undefined' ? adminI18n.t(key) : key;
    
    // Get site settings
    settingsData = siteContent.site || {
        name: 'Alina Coaching',
        location: 'Bratislava',
        contact: {},
        social: {},
        legal: {}
    };
    
    mainContent.innerHTML = `
        <div class="settings-manager-container">
            <div class="manager-header">
                <h2>⚙️ ${t('settingsManager.title') || 'Paramètres du Site'}</h2>
                <p>${t('settingsManager.subtitle') || 'Gérez les informations de contact, réseaux sociaux et liens légaux'}</p>
            </div>
            
            <!-- Tabs -->
            <div class="settings-tabs">
                <button class="settings-tab active" data-tab="contact">
                    📧 ${t('settingsManager.tabs.contact') || 'Contact'}
                </button>
                <button class="settings-tab" data-tab="social">
                    📱 ${t('settingsManager.tabs.social') || 'Réseaux Sociaux'}
                </button>
                <button class="settings-tab" data-tab="legal">
                    📄 ${t('settingsManager.tabs.legal') || 'Liens Légaux'}
                </button>
            </div>
            
            <!-- Contact Tab -->
            <div id="contact-tab" class="settings-tab-content active">
                <h3>📧 ${t('settingsManager.contact.title') || 'Informations de Contact'}</h3>
                <p class="tab-description">${t('settingsManager.contact.description') || 'Ces informations apparaissent dans la section Contact du site'}</p>
                
                <form id="contact-form" class="settings-form">
                    <div class="form-group">
                        <label for="contact-email">
                            ${t('settingsManager.contact.email') || 'Email'} *
                        </label>
                        <input 
                            type="email" 
                            id="contact-email" 
                            class="form-control" 
                            value="${escapeHtml(settingsData.contact?.email || '')}"
                            placeholder="alina@coaching-bratislava.com"
                            required
                        >
                        <small>${t('settingsManager.contact.emailHelp') || 'Email de contact principal'}</small>
                    </div>
                    
                    <div class="form-group">
                        <label for="contact-phone">
                            ${t('settingsManager.contact.phone') || 'Téléphone'} *
                        </label>
                        <input 
                            type="tel" 
                            id="contact-phone" 
                            class="form-control" 
                            value="${escapeHtml(settingsData.contact?.phone || '')}"
                            placeholder="+421 XXX XXX XXX"
                            required
                        >
                        <small>${t('settingsManager.contact.phoneHelp') || 'Numéro de téléphone / WhatsApp'}</small>
                    </div>
                    
                    <div class="form-group">
                        <label for="contact-address">
                            ${t('settingsManager.contact.address') || 'Adresse'} *
                        </label>
                        <input 
                            type="text" 
                            id="contact-address" 
                            class="form-control" 
                            value="${escapeHtml(settingsData.contact?.address || '')}"
                            placeholder="Bratislava, Slovaquie"
                            required
                        >
                        <small>${t('settingsManager.contact.addressHelp') || 'Ville et pays'}</small>
                    </div>
                    
                    <div class="form-group">
                        <label for="contact-schedule">
                            ${t('settingsManager.contact.schedule') || 'Horaires'}
                        </label>
                        <textarea 
                            id="contact-schedule" 
                            class="form-control" 
                            rows="3"
                            placeholder="Lun-Ven: 7h-20h&#10;Sam: 9h-14h"
                        >${escapeHtml(settingsData.contact?.schedule || '').replace(/<br>/g, '\n')}</textarea>
                        <small>${t('settingsManager.contact.scheduleHelp') || 'Horaires d\'ouverture (utilisez Entrée pour les sauts de ligne)'}</small>
                    </div>
                    
                    <button type="submit" class="btn-primary">
                        💾 ${t('settingsManager.save') || 'Sauvegarder'}
                    </button>
                </form>
            </div>
            
            <!-- Social Tab -->
            <div id="social-tab" class="settings-tab-content">
                <h3>📱 ${t('settingsManager.social.title') || 'Réseaux Sociaux'}</h3>
                <p class="tab-description">${t('settingsManager.social.description') || 'Liens vers vos profils de réseaux sociaux (apparaissent dans le footer)'}</p>
                
                <form id="social-form" class="settings-form">
                    <div class="form-group">
                        <label for="social-instagram">
                            📷 Instagram
                        </label>
                        <input 
                            type="url" 
                            id="social-instagram" 
                            class="form-control" 
                            value="${escapeHtml(settingsData.social?.instagram || '')}"
                            placeholder="https://instagram.com/alina_coaching"
                        >
                        <small>${t('settingsManager.social.help') || 'URL complète de votre profil (laissez vide pour masquer)'}</small>
                    </div>
                    
                    <div class="form-group">
                        <label for="social-youtube">
                            📹 YouTube
                        </label>
                        <input 
                            type="url" 
                            id="social-youtube" 
                            class="form-control" 
                            value="${escapeHtml(settingsData.social?.youtube || '')}"
                            placeholder="https://youtube.com/@alinacoaching"
                        >
                    </div>
                    
                    <div class="form-group">
                        <label for="social-facebook">
                            📘 Facebook
                        </label>
                        <input 
                            type="url" 
                            id="social-facebook" 
                            class="form-control" 
                            value="${escapeHtml(settingsData.social?.facebook || '')}"
                            placeholder="https://facebook.com/alinacoaching"
                        >
                    </div>
                    
                    <div class="form-group">
                        <label for="social-tiktok">
                            🎵 TikTok
                        </label>
                        <input 
                            type="url" 
                            id="social-tiktok" 
                            class="form-control" 
                            value="${escapeHtml(settingsData.social?.tiktok || '')}"
                            placeholder="https://tiktok.com/@alinacoaching"
                        >
                    </div>
                    
                    <div class="form-group">
                        <label for="social-linkedin">
                            💼 LinkedIn
                        </label>
                        <input
                            type="url"
                            id="social-linkedin"
                            class="form-control"
                            value="${escapeHtml(settingsData.social?.linkedin || '')}"
                            placeholder="https://linkedin.com/in/alinacoaching"
                        >
                    </div>
                    
                    <div class="form-group">
                        <label for="social-telegram">
                            ✈️ Telegram
                        </label>
                        <input
                            type="url"
                            id="social-telegram"
                            class="form-control"
                            value="${escapeHtml(settingsData.social?.telegram || '')}"
                            placeholder="https://t.me/alinacoaching"
                        >
                        <small>${t('settingsManager.social.help') || 'URL complète de votre profil (laissez vide pour masquer)'}</small>
                    </div>
                    
                    <button type="submit" class="btn-primary">
                        💾 ${t('settingsManager.save') || 'Sauvegarder'}
                    </button>
                </form>
            </div>
            
            <!-- Legal Tab -->
            <div id="legal-tab" class="settings-tab-content">
                <h3>📄 ${t('settingsManager.legal.title') || 'Liens Légaux'}</h3>
                <p class="tab-description">${t('settingsManager.legal.description') || 'Liens vers vos pages légales (apparaissent dans le footer)'}</p>
                
                <div class="alert alert-info">
                    ℹ️ ${t('settingsManager.legal.info') || 'Vous pouvez créer des pages HTML séparées ou utiliser des liens externes (Google Docs, etc.)'}
                </div>
                
                <form id="legal-form" class="settings-form">
                    <div class="form-group">
                        <label for="legal-privacy">
                            ${t('settingsManager.legal.privacy') || 'Politique de Confidentialité'}
                        </label>
                        <input 
                            type="url" 
                            id="legal-privacy" 
                            class="form-control" 
                            value="${escapeHtml(settingsData.legal?.privacyUrl || '')}"
                            placeholder="privacy.html ou https://..."
                        >
                        <small>${t('settingsManager.legal.privacyHelp') || 'Chemin relatif (privacy.html) ou URL complète'}</small>
                    </div>
                    
                    <div class="form-group">
                        <label for="legal-terms">
                            ${t('settingsManager.legal.terms') || 'Conditions d\'Utilisation'}
                        </label>
                        <input 
                            type="url" 
                            id="legal-terms" 
                            class="form-control" 
                            value="${escapeHtml(settingsData.legal?.termsUrl || '')}"
                            placeholder="terms.html ou https://..."
                        >
                    </div>
                    
                    <div class="form-group">
                        <label for="legal-cookies">
                            ${t('settingsManager.legal.cookies') || 'Politique de Cookies'}
                        </label>
                        <input 
                            type="url" 
                            id="legal-cookies" 
                            class="form-control" 
                            value="${escapeHtml(settingsData.legal?.cookiesUrl || '')}"
                            placeholder="cookies.html ou https://..."
                        >
                    </div>
                    
                    <button type="submit" class="btn-primary">
                        💾 ${t('settingsManager.save') || 'Sauvegarder'}
                    </button>
                </form>
            </div>
        </div>
    `;
    
    attachSettingsEventListeners();
}

// ===== ATTACH EVENT LISTENERS =====
function attachSettingsEventListeners() {
    // Tab switching
    const tabs = document.querySelectorAll('.settings-tab');
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const tabName = tab.dataset.tab;
            switchSettingsTab(tabName);
        });
    });
    
    // Form submissions
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactFormSubmit);
    }
    
    const socialForm = document.getElementById('social-form');
    if (socialForm) {
        socialForm.addEventListener('submit', handleSocialFormSubmit);
    }
    
    const legalForm = document.getElementById('legal-form');
    if (legalForm) {
        legalForm.addEventListener('submit', handleLegalFormSubmit);
    }
}

// ===== SWITCH TAB =====
function switchSettingsTab(tabName) {
    // Update tab buttons
    document.querySelectorAll('.settings-tab').forEach(tab => {
        tab.classList.remove('active');
        if (tab.dataset.tab === tabName) {
            tab.classList.add('active');
        }
    });
    
    // Update tab content
    document.querySelectorAll('.settings-tab-content').forEach(content => {
        content.classList.remove('active');
    });
    document.getElementById(`${tabName}-tab`)?.classList.add('active');
}

// ===== HANDLE CONTACT FORM SUBMIT =====
async function handleContactFormSubmit(e) {
    e.preventDefault();
    
    const t = (key) => typeof adminI18n !== 'undefined' ? adminI18n.t(key) : key;
    const submitBtn = e.target.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    
    submitBtn.disabled = true;
    submitBtn.textContent = `⏳ ${t('settingsManager.saving') || 'Sauvegarde...'}`;
    
    try {
        // Update contact data
        const schedule = document.getElementById('contact-schedule').value.trim();
        siteContent.site.contact = {
            email: document.getElementById('contact-email').value.trim(),
            phone: document.getElementById('contact-phone').value.trim(),
            address: document.getElementById('contact-address').value.trim(),
            schedule: schedule.replace(/\n/g, '<br>')
        };
        
        // Save to server
        await saveSiteContent(siteContent);
        
        // Reload content
        await loadSiteContent();
        
        // Re-render
        renderSettingsManager();
        
        if (typeof showNotification === 'function') {
            showNotification(t('notifications.settingsSaved') || 'Paramètres sauvegardés avec succès', 'success');
        }
    } catch (error) {
        console.error('Error saving contact settings:', error);
        if (typeof showNotification === 'function') {
            showNotification(t('notifications.error') || 'Erreur lors de la sauvegarde', 'error');
        }
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
    }
}

// ===== HANDLE SOCIAL FORM SUBMIT =====
async function handleSocialFormSubmit(e) {
    e.preventDefault();
    
    const t = (key) => typeof adminI18n !== 'undefined' ? adminI18n.t(key) : key;
    const submitBtn = e.target.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    
    submitBtn.disabled = true;
    submitBtn.textContent = `⏳ ${t('settingsManager.saving') || 'Sauvegarde...'}`;
    
    try {
        // Update social data
        siteContent.site.social = {
            instagram: document.getElementById('social-instagram').value.trim(),
            youtube: document.getElementById('social-youtube').value.trim(),
            facebook: document.getElementById('social-facebook').value.trim(),
            tiktok: document.getElementById('social-tiktok').value.trim(),
            linkedin: document.getElementById('social-linkedin').value.trim(),
            telegram: document.getElementById('social-telegram').value.trim()
        };
        
        // Save to server
        await saveSiteContent(siteContent);
        
        // Reload content
        await loadSiteContent();
        
        // Re-render
        renderSettingsManager();
        
        if (typeof showNotification === 'function') {
            showNotification(t('notifications.settingsSaved') || 'Paramètres sauvegardés avec succès', 'success');
        }
    } catch (error) {
        console.error('Error saving social settings:', error);
        if (typeof showNotification === 'function') {
            showNotification(t('notifications.error') || 'Erreur lors de la sauvegarde', 'error');
        }
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
    }
}

// ===== HANDLE LEGAL FORM SUBMIT =====
async function handleLegalFormSubmit(e) {
    e.preventDefault();
    
    const t = (key) => typeof adminI18n !== 'undefined' ? adminI18n.t(key) : key;
    const submitBtn = e.target.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    
    submitBtn.disabled = true;
    submitBtn.textContent = `⏳ ${t('settingsManager.saving') || 'Sauvegarde...'}`;
    
    try {
        // Update legal data
        siteContent.site.legal = {
            privacyUrl: document.getElementById('legal-privacy').value.trim(),
            termsUrl: document.getElementById('legal-terms').value.trim(),
            cookiesUrl: document.getElementById('legal-cookies').value.trim()
        };
        
        // Save to server
        await saveSiteContent(siteContent);
        
        // Reload content
        await loadSiteContent();
        
        // Re-render
        renderSettingsManager();
        
        if (typeof showNotification === 'function') {
            showNotification(t('notifications.settingsSaved') || 'Paramètres sauvegardés avec succès', 'success');
        }
    } catch (error) {
        console.error('Error saving legal settings:', error);
        if (typeof showNotification === 'function') {
            showNotification(t('notifications.error') || 'Erreur lors de la sauvegarde', 'error');
        }
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
    }
}

// ===== ESCAPE HTML =====
function escapeHtml(value) {
    if (value == null) return '';
    const div = document.createElement('div');
    div.textContent = String(value);
    return div.innerHTML;
}

// Made with Bob