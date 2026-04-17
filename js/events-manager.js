// ===== EVENTS MANAGER FOR ADMIN =====
// Gestion complète des événements (CRUD) avec système d'ID unique

let eventsManagerState = {
    currentLang: 'fr',
    events: null
};

// Generate unique ID for events
function generateEventId() {
    return 'evt_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
}

// Get all event IDs across all languages
function getAllEventIds() {
    const payload = window.siteContent || eventsManagerState.events;
    if (!payload || !payload.content) return [];
    
    const allIds = new Set();
    ['fr', 'en', 'sk', 'ua'].forEach(lang => {
        const events = payload.content[lang]?.events?.items || [];
        events.forEach(event => {
            if (event.id) allIds.add(event.id);
        });
    });
    
    return Array.from(allIds);
}

// Get event by ID in a specific language
function getEventById(eventId, lang) {
    const payload = window.siteContent || eventsManagerState.events;
    if (!payload || !payload.content || !payload.content[lang]) return null;
    
    const events = payload.content[lang]?.events?.items || [];
    return events.find(event => event.id === eventId);
}

// Check which languages have translation for an event ID
function getTranslationStatus(eventId) {
    const status = { fr: false, en: false, sk: false, ua: false };
    ['fr', 'en', 'sk', 'ua'].forEach(lang => {
        status[lang] = !!getEventById(eventId, lang);
    });
    return status;
}

// ===== RENDER EVENTS MANAGER =====
function renderEventsManager() {
    const mainContent = document.querySelector('.admin-content');
    if (!mainContent) {
        console.error('Cannot render events manager: missing container');
        return;
    }
    
    const t = (key) => typeof adminI18n !== 'undefined' ? adminI18n.t(key) : key;
    
    mainContent.innerHTML = `
        <div class="events-manager-container">
            <div class="manager-header">
                <h2>📅 ${t('eventsManager.title')}</h2>
                <p>${t('eventsManager.subtitle')}</p>
            </div>
            
            <div class="language-tabs">
                <button class="lang-tab active" data-lang="fr">🇫🇷 Français</button>
                <button class="lang-tab" data-lang="en">🇬🇧 English</button>
                <button class="lang-tab" data-lang="sk">🇸🇰 Slovenčina</button>
                <button class="lang-tab" data-lang="ua">🇺🇦 Українська</button>
            </div>
            
            <div class="manager-actions">
                <button id="add-event-btn" class="btn-primary" data-i18n="eventsManager.addEvent">
                    ➕ ${t('eventsManager.addEvent')}
                </button>
            </div>
            
            <div id="events-list" class="events-list">
                <!-- Events will be rendered here -->
            </div>
        </div>
    `;
    
    addEventsManagerStyles();
    bindEventsManagerEvents();
    loadAndRenderEvents();
    
    // Refresh translations after rendering with a delay
    setTimeout(() => {
        if (typeof window.refreshAdminTranslations === 'function') {
            window.refreshAdminTranslations();
        }
    }, 200);
}

// ===== ADD STYLES =====
function addEventsManagerStyles() {
    if (document.getElementById('events-manager-styles')) return;
    
    const style = document.createElement('style');
    style.id = 'events-manager-styles';
    style.textContent = `
        .events-manager-container {
            max-width: 1200px;
            margin: 0 auto;
        }
        
        .manager-header {
            margin-bottom: 2rem;
        }
        
        .manager-header h2 {
            font-size: 1.8rem;
            margin-bottom: 0.5rem;
        }
        
        .manager-actions {
            margin: 2rem 0;
        }
        
        .events-list {
            display: grid;
            gap: 1.5rem;
        }
        
        .event-item {
            background: white;
            padding: 1.5rem;
            border-radius: 12px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
            display: grid;
            grid-template-columns: auto 1fr auto;
            gap: 1.5rem;
            align-items: start;
        }
        
        .event-date-badge {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 1rem;
            border-radius: 8px;
            text-align: center;
            min-width: 80px;
        }
        
        .event-date-badge .day {
            font-size: 2rem;
            font-weight: bold;
            display: block;
        }
        
        .event-date-badge .month {
            font-size: 0.9rem;
            text-transform: uppercase;
        }
        
        .event-details h3 {
            margin: 0 0 0.5rem 0;
            font-size: 1.2rem;
        }
        
        .event-category {
            display: inline-block;
            background: #e3f2fd;
            color: #1976d2;
            padding: 0.25rem 0.75rem;
            border-radius: 4px;
            font-size: 0.85rem;
            margin-bottom: 0.5rem;
        }
        
        .event-meta {
            color: #666;
            font-size: 0.9rem;
            margin: 0.5rem 0;
        }
        
        .event-description {
            color: #555;
            margin: 0.5rem 0;
        }
        
        .event-actions {
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
        }
        
        .event-actions button {
            padding: 0.5rem 1rem;
            border: none;
            border-radius: 6px;
            cursor: pointer;
            font-size: 0.9rem;
            transition: all 0.3s;
        }
        
        .btn-edit {
            background: #2196F3;
            color: white;
        }
        
        .btn-edit:hover {
            background: #1976D2;
        }
        
        .btn-delete {
            background: #f44336;
            color: white;
        }
        
        .btn-delete:hover {
            background: #d32f2f;
        }
        
        .btn-toggle {
            background: #ff9800;
            color: white;
        }
        
        .btn-toggle:hover {
            background: #f57c00;
        }
        
        .event-item.disabled {
            opacity: 0.6;
        }
        
        .event-item.disabled .event-date-badge {
            background: #9e9e9e;
        }
        
        .empty-state {
            text-align: center;
            padding: 3rem;
            color: #999;
        }
        
        .empty-state-icon {
            font-size: 4rem;
            margin-bottom: 1rem;
        }
    `;
    
    document.head.appendChild(style);
}

// ===== BIND EVENTS =====
function bindEventsManagerEvents() {
    // Language tabs
    document.querySelectorAll('.lang-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            document.querySelectorAll('.lang-tab').forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            eventsManagerState.currentLang = tab.dataset.lang;
            loadAndRenderEvents();
        });
    });
    
    // Add event button
    const addBtn = document.getElementById('add-event-btn');
    if (addBtn) {
        addBtn.addEventListener('click', () => openEventModal());
    }
}

// ===== LOAD AND RENDER EVENTS =====
async function loadAndRenderEvents() {
    try {
        const content = await loadSiteContent();
        if (!content || !content.content) {
            throw new Error('No content loaded');
        }
        
        eventsManagerState.events = content;
        renderEventsList();
    } catch (error) {
        console.error('Error loading events:', error);
        showNotification('Erreur de chargement des événements', 'error');
    }
}

// ===== RENDER EVENTS LIST =====
function renderEventsList() {
    const container = document.getElementById('events-list');
    if (!container) return;
    
    const lang = eventsManagerState.currentLang;
    const events = eventsManagerState.events?.content?.[lang]?.events?.items || [];
    
    if (events.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <div class="empty-state-icon">📅</div>
                <h3>Aucun événement</h3>
                <p>Cliquez sur "Ajouter un événement" pour créer votre premier événement.</p>
            </div>
        `;
        return;
    }
    
    container.innerHTML = events.map((event, index) => {
        const translationStatus = event.id ? getTranslationStatus(event.id) : null;
        const translationBadges = translationStatus ? `
            <div style="display: flex; gap: 0.25rem; margin-top: 0.5rem;">
                ${['fr', 'en', 'sk', 'ua'].map(lang => {
                    const hasTranslation = translationStatus[lang];
                    const flag = { fr: '🇫🇷', en: '🇬🇧', sk: '🇸🇰', ua: '🇺🇦' }[lang];
                    return `<span style="padding: 0.2rem 0.4rem; border-radius: 4px; font-size: 0.75rem; background: ${hasTranslation ? '#4CAF50' : '#e0e0e0'}; color: ${hasTranslation ? 'white' : '#999'};">${flag}</span>`;
                }).join('')}
            </div>
        ` : '';
        
        const hasMissingTranslations = translationStatus && Object.values(translationStatus).some(v => !v);
        
        return `
            <div class="event-item ${event.enabled === false ? 'disabled' : ''}" data-index="${index}">
                <div class="event-date-badge">
                    <span class="day">${escapeHtml(event.day || '')}</span>
                    <span class="month">${escapeHtml(event.month || '')}</span>
                </div>
                <div class="event-details">
                    <span class="event-category">${escapeHtml(event.category || '')}</span>
                    <h3>${escapeHtml(event.title || '')}</h3>
                    <p class="event-meta">🕐 ${escapeHtml(event.time || '')} · 📍 ${escapeHtml(event.location || '')}</p>
                    <p class="event-description">${escapeHtml(event.description || '')}</p>
                    ${translationBadges}
                </div>
                <div class="event-actions">
                    <button class="btn-edit" onclick="editEvent(${index})">✏️ Modifier</button>
                    ${event.id && hasMissingTranslations ? `
                        <button class="btn-translate" onclick="translateEvent('${event.id}')" style="background: #9C27B0; color: white;">
                            🌍 Traduire
                        </button>
                    ` : ''}
                    <button class="btn-toggle" onclick="toggleEvent(${index})">
                        ${event.enabled === false ? '✅ Activer' : '🚫 Désactiver'}
                    </button>
                    <button class="btn-delete" onclick="deleteEvent(${index})">🗑️ Supprimer</button>
                </div>
            </div>
        `;
    }).join('');
}

// ===== OPEN EVENT MODAL =====
function openEventModal(eventIndex = null) {
    const lang = eventsManagerState.currentLang;
    const events = eventsManagerState.events?.content?.[lang]?.events?.items || [];
    const event = eventIndex !== null ? events[eventIndex] : null;
    const isEdit = event !== null;
    
    const t = (key) => typeof adminI18n !== 'undefined' ? adminI18n.t(key) : key;
    
    const modal = document.createElement('div');
    modal.className = 'modal active';
    modal.id = 'event-modal';
    modal.innerHTML = `
        <div class="modal-overlay"></div>
        <div class="modal-content" style="max-width: 700px;">
            <div class="modal-header">
                <h3>${isEdit ? '✏️ Modifier l\'événement' : '➕ Ajouter un événement'}</h3>
                <button class="modal-close">✕</button>
            </div>
            <div class="modal-body">
                <form id="event-form" style="display: grid; gap: 1rem;">
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
                        <div class="form-group">
                            <label>Jour *</label>
                            <input type="text" id="event-day" class="form-control" value="${escapeHtml(event?.day || '')}" placeholder="18" required>
                        </div>
                        <div class="form-group">
                            <label>Mois *</label>
                            <input type="text" id="event-month" class="form-control" value="${escapeHtml(event?.month || '')}" placeholder="Mai" required>
                        </div>
                    </div>
                    
                    <div class="form-group">
                        <label>Catégorie *</label>
                        <input type="text" id="event-category" class="form-control" value="${escapeHtml(event?.category || '')}" placeholder="Yoga au parc" required>
                    </div>
                    
                    <div class="form-group">
                        <label>Titre *</label>
                        <input type="text" id="event-title" class="form-control" value="${escapeHtml(event?.title || '')}" placeholder="Session outdoor au lever du soleil" required>
                    </div>
                    
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
                        <div class="form-group">
                            <label>Heure *</label>
                            <input type="text" id="event-time" class="form-control" value="${escapeHtml(event?.time || '')}" placeholder="10h00" required>
                        </div>
                        <div class="form-group">
                            <label>Lieu *</label>
                            <input type="text" id="event-location" class="form-control" value="${escapeHtml(event?.location || '')}" placeholder="Parc de Bratislava" required>
                        </div>
                    </div>
                    
                    <div class="form-group">
                        <label>Description *</label>
                        <textarea id="event-description" class="form-control" rows="3" required placeholder="Une séance accessible à toutes...">${escapeHtml(event?.description || '')}</textarea>
                    </div>
                    
                    <div class="form-group">
                        <label>Lien du bouton (optionnel)</label>
                        <input type="text" id="event-link" class="form-control" value="${escapeHtml(event?.ctaLink || '#contact')}" placeholder="#contact">
                    </div>
                    
                    <div class="form-group">
                        <label>Texte du bouton (optionnel)</label>
                        <input type="text" id="event-cta" class="form-control" value="${escapeHtml(event?.ctaLabel || '')}" placeholder="Réserver">
                    </div>
                    
                    <div style="display: flex; gap: 1rem; margin-top: 1rem;">
                        <button type="submit" class="btn-primary" style="flex: 1;">
                            💾 ${isEdit ? 'Enregistrer' : 'Ajouter'}
                        </button>
                        <button type="button" class="btn-secondary modal-close" style="flex: 1;">
                            ❌ Annuler
                        </button>
                    </div>
                </form>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';
    
    // Close handlers
    const closeModal = () => {
        if (document.body.contains(modal)) {
            document.body.removeChild(modal);
        }
        document.body.style.overflow = 'auto';
    };
    
    modal.querySelectorAll('.modal-close').forEach(btn => {
        btn.addEventListener('click', closeModal);
    });
    
    modal.querySelector('.modal-overlay').addEventListener('click', closeModal);
    
    // Form submit
    const form = modal.querySelector('#event-form');
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const newEvent = {
            enabled: event?.enabled !== false,
            day: document.getElementById('event-day').value,
            month: document.getElementById('event-month').value,
            category: document.getElementById('event-category').value,
            title: document.getElementById('event-title').value,
            time: document.getElementById('event-time').value,
            location: document.getElementById('event-location').value,
            description: document.getElementById('event-description').value,
            ctaLink: document.getElementById('event-link').value || '#contact',
            ctaLabel: document.getElementById('event-cta').value || 'Réserver'
        };
        
        await saveEvent(newEvent, eventIndex);
        closeModal();
    });
}

// ===== SAVE EVENT =====
async function saveEvent(eventData, eventIndex = null) {
    try {
        const lang = eventsManagerState.currentLang;
        
        // Ensure structure exists
        if (!eventsManagerState.events.content[lang].events) {
            eventsManagerState.events.content[lang].events = { items: [] };
        }
        if (!eventsManagerState.events.content[lang].events.items) {
            eventsManagerState.events.content[lang].events.items = [];
        }
        
        const events = eventsManagerState.events.content[lang].events.items;
        
        if (eventIndex !== null) {
            // Update existing event
            events[eventIndex] = eventData;
        } else {
            // Add new event
            events.push(eventData);
        }
        
        // Save to server
        await saveSiteContent(eventsManagerState.events);
        
        showNotification('✅ Événement enregistré avec succès!', 'success');
        renderEventsList();
    } catch (error) {
        console.error('Error saving event:', error);
        showNotification('❌ Erreur lors de la sauvegarde', 'error');
    }
}

// ===== EDIT EVENT =====
window.editEvent = function(index) {
    openEventModal(index);
};

// ===== TOGGLE EVENT =====
window.toggleEvent = async function(index) {
    try {
        const lang = eventsManagerState.currentLang;
        const events = eventsManagerState.events.content[lang].events.items;
        
        events[index].enabled = events[index].enabled === false;
        
        await saveSiteContent(eventsManagerState.events);
        
        showNotification('✅ Événement mis à jour!', 'success');
        renderEventsList();
    } catch (error) {
        console.error('Error toggling event:', error);
        showNotification('❌ Erreur lors de la mise à jour', 'error');
    }
};

// ===== DELETE EVENT =====
window.deleteEvent = async function(index) {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cet événement ?')) {
        return;
    }
    
    try {
        const lang = eventsManagerState.currentLang;
        const events = eventsManagerState.events.content[lang].events.items;
        
        events.splice(index, 1);
        
        await saveSiteContent(eventsManagerState.events);
        
        showNotification('✅ Événement supprimé!', 'success');
        renderEventsList();
    } catch (error) {
        console.error('Error deleting event:', error);
        showNotification('❌ Erreur lors de la suppression', 'error');
    }
};

// ===== HELPER FUNCTION =====
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// ===== NOTIFICATION HELPER =====
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        background: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#2196F3'};
        color: white;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.2);
        z-index: 10000;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Add animations
if (!document.getElementById('notification-animations')) {
    const style = document.createElement('style');
    style.id = 'notification-animations';
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(400px); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideOut {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(400px); opacity: 0; }
        }
    `;
    document.head.appendChild(style);
}

console.log('✅ Events Manager loaded');

// Made with Bob
// ===== TRANSLATE EVENT TO ANOTHER LANGUAGE =====
window.translateEvent = function(eventId) {
    const t = (key) => typeof adminI18n !== 'undefined' ? adminI18n.t(key) : key;
    const currentLang = eventsManagerState.currentLang;
    
    // Get the source event (from current language)
    const sourceEvent = getEventById(eventId, currentLang);
    if (!sourceEvent) {
        showNotification('❌ Événement source introuvable', 'error');
        return;
    }
    
    // Check which languages are missing
    const translationStatus = getTranslationStatus(eventId);
    const missingLangs = Object.keys(translationStatus).filter(lang => !translationStatus[lang]);
    
    if (missingLangs.length === 0) {
        showNotification('✅ Cet événement est déjà traduit dans toutes les langues', 'info');
        return;
    }
    
    // Create modal to select target language
    const modal = document.createElement('div');
    modal.className = 'modal active';
    modal.id = 'translate-modal';
    
    const langNames = { fr: '🇫🇷 Français', en: '🇬🇧 English', sk: '🇸🇰 Slovenčina', ua: '🇺🇦 Українська' };
    
    modal.innerHTML = `
        <div class="modal-overlay"></div>
        <div class="modal-content" style="max-width: 500px;">
            <div class="modal-header">
                <h3>🌍 Traduire l'événement</h3>
                <button class="modal-close">✕</button>
            </div>
            <div class="modal-body">
                <p style="margin-bottom: 1rem;">Sélectionnez la langue cible pour la traduction :</p>
                <div style="display: grid; gap: 0.5rem;">
                    ${missingLangs.map(lang => `
                        <button class="translate-lang-btn" data-lang="${lang}" style="padding: 1rem; border: 2px solid #e0e0e0; background: white; border-radius: 8px; cursor: pointer; text-align: left; transition: all 0.3s;">
                            ${langNames[lang]}
                        </button>
                    `).join('')}
                </div>
                <p style="margin-top: 1rem; font-size: 0.9rem; color: #666;">
                    💡 Le formulaire sera pré-rempli avec les données actuelles. Vous pourrez les modifier avant d'enregistrer.
                </p>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';
    
    const closeModal = () => {
        if (document.body.contains(modal)) {
            document.body.removeChild(modal);
        }
        document.body.style.overflow = 'auto';
    };
    
    modal.querySelectorAll('.modal-close').forEach(btn => {
        btn.addEventListener('click', closeModal);
    });
    
    modal.querySelector('.modal-overlay').addEventListener('click', closeModal);
    
    // Handle language selection
    modal.querySelectorAll('.translate-lang-btn').forEach(btn => {
        btn.addEventListener('mouseenter', () => {
            btn.style.borderColor = '#6366f1';
            btn.style.background = '#f5f5ff';
        });
        btn.addEventListener('mouseleave', () => {
            btn.style.borderColor = '#e0e0e0';
            btn.style.background = 'white';
        });
        btn.addEventListener('click', () => {
            const targetLang = btn.dataset.lang;
            closeModal();
            
            // Switch to target language
            eventsManagerState.currentLang = targetLang;
            document.querySelectorAll('.lang-tab').forEach(tab => {
                tab.classList.toggle('active', tab.dataset.lang === targetLang);
            });
            
            // Open modal with pre-filled data
            setTimeout(() => {
                openEventModalForTranslation(sourceEvent);
            }, 300);
        });
    });
};

// ===== OPEN EVENT MODAL FOR TRANSLATION =====
function openEventModalForTranslation(sourceEvent) {
    const t = (key) => typeof adminI18n !== 'undefined' ? adminI18n.t(key) : key;
    
    const modal = document.createElement('div');
    modal.className = 'modal active';
    modal.id = 'event-modal';
    modal.innerHTML = `
        <div class="modal-overlay"></div>
        <div class="modal-content" style="max-width: 700px;">
            <div class="modal-header">
                <h3>🌍 Traduire l'événement</h3>
                <button class="modal-close">✕</button>
            </div>
            <div class="modal-body">
                <div style="background: #e3f2fd; padding: 1rem; border-radius: 8px; margin-bottom: 1rem;">
                    <p style="margin: 0; color: #1976d2;">
                        💡 Les champs sont pré-remplis. Traduisez le contenu dans la langue cible.
                    </p>
                </div>
                <form id="event-form" style="display: grid; gap: 1rem;">
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
                        <div class="form-group">
                            <label>${t('eventsManager.form.day')} *</label>
                            <input type="text" id="event-day" class="form-control" value="${escapeHtml(sourceEvent.day || '')}" required>
                        </div>
                        <div class="form-group">
                            <label>${t('eventsManager.form.month')} *</label>
                            <input type="text" id="event-month" class="form-control" value="${escapeHtml(sourceEvent.month || '')}" placeholder="${t('eventsManager.form.monthPlaceholder')}" required>
                        </div>
                    </div>
                    
                    <div class="form-group">
                        <label>${t('eventsManager.form.category')} *</label>
                        <input type="text" id="event-category" class="form-control" value="${escapeHtml(sourceEvent.category || '')}" required>
                    </div>
                    
                    <div class="form-group">
                        <label>${t('eventsManager.form.title')} *</label>
                        <input type="text" id="event-title" class="form-control" value="${escapeHtml(sourceEvent.title || '')}" required>
                    </div>
                    
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
                        <div class="form-group">
                            <label>${t('eventsManager.form.time')} *</label>
                            <input type="text" id="event-time" class="form-control" value="${escapeHtml(sourceEvent.time || '')}" required>
                        </div>
                        <div class="form-group">
                            <label>${t('eventsManager.form.location')} *</label>
                            <input type="text" id="event-location" class="form-control" value="${escapeHtml(sourceEvent.location || '')}" required>
                        </div>
                    </div>
                    
                    <div class="form-group">
                        <label>${t('eventsManager.form.description')} *</label>
                        <textarea id="event-description" class="form-control" rows="3" required>${escapeHtml(sourceEvent.description || '')}</textarea>
                    </div>
                    
                    <div class="form-group">
                        <label>${t('eventsManager.form.link')}</label>
                        <input type="text" id="event-link" class="form-control" value="${escapeHtml(sourceEvent.ctaLink || '#contact')}">
                    </div>
                    
                    <div class="form-group">
                        <label>${t('eventsManager.form.ctaLabel')}</label>
                        <input type="text" id="event-cta" class="form-control" value="${escapeHtml(sourceEvent.ctaLabel || '')}" placeholder="${t('eventsManager.form.ctaPlaceholder')}">
                    </div>
                    
                    <div style="display: flex; gap: 1rem; margin-top: 1rem;">
                        <button type="submit" class="btn-primary" style="flex: 1;">
                            💾 ${t('eventsManager.form.save')}
                        </button>
                        <button type="button" class="btn-secondary modal-close" style="flex: 1;">
                            ❌ ${t('eventsManager.form.cancel')}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';
    
    const closeModal = () => {
        if (document.body.contains(modal)) {
            document.body.removeChild(modal);
        }
        document.body.style.overflow = 'auto';
    };
    
    modal.querySelectorAll('.modal-close').forEach(btn => {
        btn.addEventListener('click', closeModal);
    });
    
    modal.querySelector('.modal-overlay').addEventListener('click', closeModal);
    
    // Form submit
    const form = modal.querySelector('#event-form');
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const newEvent = {
            id: sourceEvent.id, // SAME ID as source event!
            enabled: true,
            day: document.getElementById('event-day').value,
            month: document.getElementById('event-month').value,
            category: document.getElementById('event-category').value,
            title: document.getElementById('event-title').value,
            time: document.getElementById('event-time').value,
            location: document.getElementById('event-location').value,
            description: document.getElementById('event-description').value,
            ctaLink: document.getElementById('event-link').value || '#contact',
            ctaLabel: document.getElementById('event-cta').value || 'Réserver'
        };
        
        await saveEvent(newEvent, null); // null = add new event
        closeModal();
    });
}
