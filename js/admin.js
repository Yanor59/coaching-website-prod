// ===== ADMIN INTERFACE JAVASCRIPT =====

const ADMIN_API_URL = '/.netlify/functions/content';
const ADMIN_UPLOAD_URL = '/.netlify/functions/upload-image';
let adminSiteContent = null;

// ===== LANGUAGE SELECTOR TOGGLE =====
const langToggle = document.getElementById('langToggle');
const langDropdown = document.getElementById('langDropdown');

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
    
    // Close dropdown after selecting a language
    document.querySelectorAll('.admin-lang-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            langDropdown.classList.remove('active');
        });
    });
}

// ===== SIDEBAR TOGGLE (Mobile) =====
const sidebarToggle = document.querySelector('.sidebar-toggle');
const sidebar = document.querySelector('.admin-sidebar');

if (sidebarToggle) {
    sidebarToggle.addEventListener('click', () => {
        sidebar.classList.toggle('active');
    });
}

// Fermer la sidebar en cliquant en dehors (mobile)
document.addEventListener('click', (e) => {
    if (window.innerWidth <= 1024 && sidebar) {
        if (!e.target.closest('.admin-sidebar') && !e.target.closest('.sidebar-toggle')) {
            sidebar.classList.remove('active');
        }
    }
});

// ===== API HELPERS =====
async function loadAdminContent() {
    const response = await fetch(ADMIN_API_URL, { cache: 'no-store' });

    if (!response.ok) {
        throw new Error(`Erreur chargement contenu (${response.status})`);
    }

    adminSiteContent = await response.json();
    return adminSiteContent;
}

async function saveAdminContent() {
    if (!adminSiteContent) {
        throw new Error('Aucun contenu à sauvegarder');
    }
    
    // PROTECTION: Vérifier que le contenu n'est pas vide
    if (!adminSiteContent.content || Object.keys(adminSiteContent.content).length === 0) {
        throw new Error('❌ ERREUR: Impossible de sauvegarder un contenu vide. Rechargez la page et réessayez.');
    }
    
    // Vérifier que les langues principales existent
    const requiredLangs = ['fr', 'en', 'sk', 'ua'];
    const hasAllLangs = requiredLangs.every(lang => adminSiteContent.content[lang]);
    
    if (!hasAllLangs) {
        throw new Error('❌ ERREUR: Données incomplètes. Rechargez la page et réessayez.');
    }

    // Get JWT token from localStorage (stored during login)
    const authToken = localStorage.getItem('authToken');
    
    if (!authToken) {
        throw new Error('❌ ERREUR: Session expirée. Veuillez vous reconnecter.');
    }

    console.log('💾 Saving content to server...');

    const response = await fetch(ADMIN_API_URL, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`
        },
        body: JSON.stringify(adminSiteContent)
    });

    if (!response.ok) {
        // Try to get error details from response
        let errorMessage = `Erreur sauvegarde contenu (${response.status})`;
        try {
            const errorData = await response.json();
            console.error('❌ Server error details:', errorData);
            if (errorData.error) {
                errorMessage = `❌ ${errorData.error}`;
            }
            if (errorData.message) {
                errorMessage += `: ${errorData.message}`;
            }
        } catch (e) {
            console.error('❌ Could not parse error response');
        }
        
        if (response.status === 401) {
            throw new Error('❌ ERREUR: Session expirée. Veuillez vous reconnecter.');
        }
        throw new Error(errorMessage);
    }

    const result = await response.json();
    console.log('✅ Content saved successfully:', result);
    return result;
}

function readFileAsDataURL(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = () => reject(new Error('Lecture fichier impossible'));
        reader.readAsDataURL(file);
    });
}

async function uploadImageFile(file) {
    const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/svg+xml'];
    const maxSize = 5 * 1024 * 1024;

    if (!validTypes.includes(file.type)) {
        throw new Error(`Format non supporté: ${file.name}`);
    }

    if (file.size > maxSize) {
        throw new Error(`Fichier trop volumineux: ${file.name}`);
    }

    // Get JWT token from localStorage (stored during login)
    const authToken = localStorage.getItem('authToken');
    
    if (!authToken) {
        throw new Error('❌ ERREUR: Session expirée. Veuillez vous reconnecter.');
    }

    const dataUrl = await readFileAsDataURL(file);
    const response = await fetch(ADMIN_UPLOAD_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`
        },
        body: JSON.stringify({
            image: dataUrl,
            filename: file.name
        })
    });

    if (!response.ok) {
        if (response.status === 401) {
            throw new Error('❌ ERREUR: Session expirée. Veuillez vous reconnecter.');
        }
        throw new Error(`Erreur upload image (${response.status})`);
    }

    const payload = await response.json();
    return payload.url || payload.path;
}

function getSectionConfig(sectionKey) {
    const configs = {
        hero: {
            titleKey: 'title',
            textKey: 'description'
        },
        about: {
            titleKey: 'title',
            textKey: 'bio1'
        },
        services: {
            titleKey: 'title',
            textKey: 'description'
        },
        events: {
            titleKey: 'title',
            textKey: 'description'
        },
        gallery: {
            titleKey: 'title',
            textKey: 'description'
        },
        partners: {
            titleKey: 'title',
            textKey: 'description'
        },
        testimonials: {
            titleKey: 'title',
            textKey: 'tag'
        },
        pricing: {
            titleKey: 'title',
            textKey: 'description'
        },
        contact: {
            titleKey: 'title',
            textKey: 'description'
        },
        footer: {
            titleKey: 'newsletter',
            textKey: 'subscribe'
        }
    };

    return configs[sectionKey] || { titleKey: 'title', textKey: 'description' };
}

function getSectionData(lang, sectionKey) {
    if (!adminSiteContent || !adminSiteContent.content || !adminSiteContent.content[lang]) {
        return null;
    }

    return adminSiteContent.content[lang][sectionKey] || null;
}

function updateSectionData(lang, sectionKey, titleValue, textValue) {
    if (!adminSiteContent || !adminSiteContent.content || !adminSiteContent.content[lang]) {
        return;
    }

    const section = adminSiteContent.content[lang][sectionKey];
    if (!section || typeof section !== 'object') {
        return;
    }

    const config = getSectionConfig(sectionKey);
    section[config.titleKey] = titleValue;
    section[config.textKey] = textValue;
}

function populateEditorFields(modal) {
    const sectionKey = modal.querySelector('#contentSection').value;
    const lang = modal.querySelector('.lang-tab.active').dataset.lang;
    const titleInput = modal.querySelector('#contentTitle');
    const textInput = modal.querySelector('#contentText');
    const section = getSectionData(lang, sectionKey);
    const config = getSectionConfig(sectionKey);

    if (!section) {
        titleInput.value = '';
        textInput.value = '';
        return;
    }

    titleInput.value = section[config.titleKey] || '';
    textInput.value = section[config.textKey] || '';
}

function ensureObject(target, key) {
    if (!target[key] || typeof target[key] !== 'object') {
        target[key] = {};
    }

    return target[key];
}

function getActiveLang(modal) {
    const activeTab = modal.querySelector('.lang-tab.active');
    return activeTab ? activeTab.dataset.lang : 'fr';
}

function createLangTabsHtml() {
    return `
        <button type="button" class="lang-tab active" data-lang="fr" style="padding: 0.5rem 1rem; border: 2px solid #6366f1; background: #6366f1; color: white; border-radius: 8px; cursor: pointer;">🇫🇷 FR</button>
        <button type="button" class="lang-tab" data-lang="en" style="padding: 0.5rem 1rem; border: 2px solid #e5e7eb; background: white; color: #6b7280; border-radius: 8px; cursor: pointer;">🇬🇧 EN</button>
        <button type="button" class="lang-tab" data-lang="sk" style="padding: 0.5rem 1rem; border: 2px solid #e5e7eb; background: white; color: #6b7280; border-radius: 8px; cursor: pointer;">🇸🇰 SK</button>
        <button type="button" class="lang-tab" data-lang="ua" style="padding: 0.5rem 1rem; border: 2px solid #e5e7eb; background: white; color: #6b7280; border-radius: 8px; cursor: pointer;">🇺🇦 UA</button>
    `;
}

function bindLangTabs(modal, onChange) {
    modal.querySelectorAll('.lang-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            modal.querySelectorAll('.lang-tab').forEach(t => {
                t.style.background = 'white';
                t.style.color = '#6b7280';
                t.style.borderColor = '#e5e7eb';
                t.classList.remove('active');
            });

            tab.style.background = '#6366f1';
            tab.style.color = 'white';
            tab.style.borderColor = '#6366f1';
            tab.classList.add('active');

            if (typeof onChange === 'function') {
                onChange();
            }
        });
    });
}

function openDynamicModal(modalId, title, bodyHtml) {
    const modal = document.createElement('div');
    modal.className = 'modal active';
    modal.id = modalId;
    modal.innerHTML = `
        <div class="modal-overlay"></div>
        <div class="modal-content" style="max-width: 900px;">
            <div class="modal-header">
                <h3>${title}</h3>
                <button class="modal-close">✕</button>
            </div>
            <div class="modal-body">
                ${bodyHtml}
            </div>
        </div>
    `;

    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';

    const closeModalLocal = () => {
        if (document.body.contains(modal)) {
            document.body.removeChild(modal);
        }
        document.body.style.overflow = 'auto';
    };

    modal.querySelector('.modal-close').addEventListener('click', closeModalLocal);
    modal.querySelector('.modal-overlay').addEventListener('click', closeModalLocal);

    return { modal, closeModalLocal };
}

// ===== NAVIGATION ACTIVE STATE =====
const navItems = document.querySelectorAll('.nav-item');

navItems.forEach(item => {
    item.addEventListener('click', (e) => {
        e.preventDefault();

        navItems.forEach(nav => nav.classList.remove('active'));
        item.classList.add('active');

        const section = item.getAttribute('href').substring(1);
        console.log(`Navigation vers: ${section}`);

        // Handle different sections
        if (section === 'content') {
            if (typeof renderContentEditor === 'function') {
                renderContentEditor();
            }
        } else if (section === 'events') {
            if (typeof renderEventsManager === 'function') {
                renderEventsManager();
            }
        } else if (section === 'partners') {
            if (typeof renderPartnersManager === 'function') {
                renderPartnersManager();
            }
        } else if (section === 'pricing') {
            if (typeof renderPricingManager === 'function') {
                renderPricingManager();
            }
        } else if (section === 'testimonials') {
            if (typeof renderTestimonialsManager === 'function') {
                renderTestimonialsManager();
            }
        } else if (section === 'gallery') {
            if (typeof renderGalleryManager === 'function') {
                renderGalleryManager();
            }
        } else if (section === 'dashboard') {
            // Reload dashboard
            location.reload();
        }

        if (window.innerWidth <= 1024 && sidebar) {
            sidebar.classList.remove('active');
        }
    });
});

// ===== QUICK ACTIONS =====
const actionButtons = document.querySelectorAll('.action-btn');

actionButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        const action = btn.querySelector('.action-text').textContent;
        console.log(`Action: ${action}`);

        if (action.includes('photo')) {
            openModal('uploadModal');
            showNotification('info', 'Modal d\'upload ouvert - Glissez vos photos !');
        } else if (action.includes('vidéo')) {
            openVideoModal();
        } else if (action.includes('témoignage')) {
            openTestimonialModal();
        } else if (action.includes('contenu')) {
            openContentEditor();
        } else {
            showNotification('info', `Action: ${action}`);
        }
    });
});

// ===== MESSAGE ACTIONS =====
const messageActions = document.querySelectorAll('.message-actions .btn-sm');

messageActions.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const action = btn.textContent.trim();
        const messageItem = btn.closest('.message-item');

        if (action === 'Répondre') {
            const messageName = messageItem.querySelector('.message-name').textContent;
            showNotification('info', `Ouverture de la réponse pour ${messageName}`);
        } else if (action === 'Archiver') {
            messageItem.style.opacity = '0.5';
            showNotification('success', 'Message archivé');
            setTimeout(() => {
                messageItem.remove();
            }, 500);
        } else if (action === 'Voir') {
            showNotification('info', 'Affichage du message complet');
        }
    });
});

// ===== REVIEW ACTIONS =====
const reviewActions = document.querySelectorAll('.review-actions .btn-sm');

reviewActions.forEach(btn => {
    btn.addEventListener('click', () => {
        const reviewItem = btn.closest('.review-item');
        const action = btn.classList.contains('btn-success') ? 'approuvé' : 'rejeté';

        reviewItem.style.opacity = '0.5';
        showNotification('success', `Contenu ${action}`);

        setTimeout(() => {
            reviewItem.remove();

            const badge = document.querySelector('.section-header .badge-count');
            if (badge) {
                const count = parseInt(badge.textContent) - 1;
                if (count > 0) {
                    badge.textContent = count;
                } else {
                    badge.remove();
                }
            }
        }, 500);
    });
});

// ===== MEDIA ACTIONS =====
const mediaActions = document.querySelectorAll('.media-action');

mediaActions.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const mediaItem = btn.closest('.media-item');
        const mediaName = mediaItem.querySelector('.media-name').textContent;

        const menu = document.createElement('div');
        menu.className = 'context-menu';
        menu.innerHTML = `
            <div class="context-menu-item" data-action="edit">✏️ Modifier</div>
            <div class="context-menu-item" data-action="download">⬇️ Télécharger</div>
            <div class="context-menu-item" data-action="delete">🗑️ Supprimer</div>
        `;

        const rect = btn.getBoundingClientRect();
        menu.style.position = 'fixed';
        menu.style.top = `${rect.bottom + 5}px`;
        menu.style.left = `${rect.left - 100}px`;
        menu.style.background = 'white';
        menu.style.border = '1px solid #e5e7eb';
        menu.style.borderRadius = '8px';
        menu.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
        menu.style.zIndex = '1000';
        menu.style.minWidth = '150px';

        document.body.appendChild(menu);

        menu.querySelectorAll('.context-menu-item').forEach(item => {
            item.style.padding = '0.75rem 1rem';
            item.style.cursor = 'pointer';
            item.style.transition = 'background 0.2s';

            item.addEventListener('mouseenter', () => {
                item.style.background = '#f9fafb';
            });

            item.addEventListener('mouseleave', () => {
                item.style.background = 'white';
            });

            item.addEventListener('click', () => {
                const action = item.dataset.action;
                showNotification('info', `${action} - ${mediaName}`);
                document.body.removeChild(menu);
            });
        });

        setTimeout(() => {
            document.addEventListener('click', function closeMenu() {
                if (document.body.contains(menu)) {
                    document.body.removeChild(menu);
                }
                document.removeEventListener('click', closeMenu);
            });
        }, 100);
    });
});

// ===== NOTIFICATION SYSTEM =====
function showNotification(type, message) {
    const notification = document.createElement('div');
    notification.className = `admin-notification admin-notification-${type}`;

    const icons = {
        success: '✓',
        error: '✕',
        warning: '⚠',
        info: 'ℹ'
    };

    notification.innerHTML = `
        <span class="notification-icon">${icons[type] || 'ℹ'}</span>
        <span class="notification-message">${message}</span>
        <button class="notification-close">✕</button>
    `;

    Object.assign(notification.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        padding: '1rem 1.5rem',
        borderRadius: '8px',
        background: 'white',
        boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
        zIndex: '10000',
        animation: 'slideInRight 0.3s ease-out',
        minWidth: '300px',
        maxWidth: '500px'
    });

    const colors = {
        success: '#10b981',
        error: '#ef4444',
        warning: '#f59e0b',
        info: '#3b82f6'
    };

    notification.style.borderLeft = `4px solid ${colors[type] || colors.info}`;

    document.body.appendChild(notification);

    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.style.background = 'none';
    closeBtn.style.border = 'none';
    closeBtn.style.cursor = 'pointer';
    closeBtn.style.fontSize = '1.25rem';
    closeBtn.style.color = '#6b7280';
    closeBtn.style.marginLeft = 'auto';

    closeBtn.addEventListener('click', () => {
        notification.style.animation = 'slideOutRight 0.3s ease-out';
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 300);
    });

    setTimeout(() => {
        if (document.body.contains(notification)) {
            notification.style.animation = 'slideOutRight 0.3s ease-out';
            setTimeout(() => {
                if (document.body.contains(notification)) {
                    document.body.removeChild(notification);
                }
            }, 300);
        }
    }, 5000);
}

const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }

    .notification-icon {
        font-weight: bold;
        font-size: 1.25rem;
    }

    .notification-message {
        flex: 1;
        color: #111827;
    }
`;
document.head.appendChild(style);

// ===== MODAL MANAGEMENT =====
const modal = document.getElementById('uploadModal');
const modalOverlay = modal ? modal.querySelector('.modal-overlay') : null;
const modalClose = modal ? modal.querySelector('.modal-close') : null;

function openModal(modalId) {
    const targetModal = document.getElementById(modalId);
    if (targetModal) {
        targetModal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }
}

function closeModal(modalId) {
    const targetModal = document.getElementById(modalId);
    if (targetModal) {
        targetModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

if (modalOverlay) {
    modalOverlay.addEventListener('click', () => {
        closeModal('uploadModal');
    });
}

if (modalClose) {
    modalClose.addEventListener('click', () => {
        closeModal('uploadModal');
    });
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal && modal.style.display === 'flex') {
        closeModal('uploadModal');
    }
});

// ===== UPLOAD AREA =====
const uploadArea = document.querySelector('.upload-area');
const fileInput = uploadArea ? uploadArea.querySelector('input[type="file"]') : null;
const uploadButton = uploadArea ? uploadArea.querySelector('.btn-primary') : null;

if (uploadArea && fileInput) {
    uploadButton.addEventListener('click', () => {
        fileInput.click();
    });

    uploadArea.addEventListener('click', (e) => {
        if (e.target === uploadArea || e.target.closest('.upload-icon, p')) {
            fileInput.click();
        }
    });

    fileInput.addEventListener('change', (e) => {
        const files = Array.from(e.target.files);
        if (files.length > 0) {
            handleFiles(files);
        }
    });

    uploadArea.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadArea.style.borderColor = '#6366f1';
        uploadArea.style.background = 'rgba(99, 102, 241, 0.05)';
    });

    uploadArea.addEventListener('dragleave', () => {
        uploadArea.style.borderColor = '#e5e7eb';
        uploadArea.style.background = 'transparent';
    });

    uploadArea.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadArea.style.borderColor = '#e5e7eb';
        uploadArea.style.background = 'transparent';

        const files = Array.from(e.dataTransfer.files);
        handleFiles(files);
    });
}

async function handleFiles(files) {
    for (const file of files) {
        try {
            showNotification('info', `Upload en cours: ${file.name}`);
            const uploadedPath = await uploadImageFile(file);
            showNotification('success', `${file.name} uploadé avec succès: ${uploadedPath}`);
        } catch (error) {
            console.error(error);
            showNotification('error', error.message || `Erreur upload: ${file.name}`);
        }
    }

    setTimeout(() => {
        closeModal('uploadModal');
    }, 800);
}

// ===== STATS ANIMATION =====
function animateValue(element, start, end, duration) {
    const range = end - start;
    const increment = range / (duration / 16);
    let current = start;

    const timer = setInterval(() => {
        current += increment;
        if ((increment > 0 && current >= end) || (increment < 0 && current <= end)) {
            current = end;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current).toLocaleString();
    }, 16);
}

document.addEventListener('DOMContentLoaded', () => {
    const statValues = document.querySelectorAll('.stat-value');
    statValues.forEach(stat => {
        const value = parseInt(stat.textContent.replace(/,/g, ''));
        if (!isNaN(value)) {
            stat.textContent = '0';
            setTimeout(() => {
                animateValue(stat, 0, value, 1000);
            }, 300);
        }
    });
});

// ===== LOGOUT =====
const logoutBtn = document.querySelector('.btn-logout');

if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
        showNotification('info', 'Déconnexion désactivée en mode localhost');
    });
}

// ===== VIEW SITE BUTTON =====
const viewSiteBtn = document.querySelector('.btn-view-site');

if (viewSiteBtn) {
    viewSiteBtn.addEventListener('click', (e) => {
        e.preventDefault();
        window.open('index.html', '_blank');
    });
}

// ===== SEARCH FUNCTIONALITY =====
function searchContent(query) {
    console.log('Recherche:', query);
}

// ===== AUTO-SAVE =====
let autoSaveTimer;

function autoSave() {
    clearTimeout(autoSaveTimer);
    autoSaveTimer = setTimeout(() => {
        showNotification('success', 'Modifications sauvegardées automatiquement');
    }, 2000);
}

// ===== KEYBOARD SHORTCUTS =====
document.addEventListener('keydown', async (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();

        if (!adminSiteContent) {
            showNotification('warning', 'Aucun contenu chargé');
            return;
        }

        try {
            await saveAdminContent();
            showNotification('success', 'Sauvegarde manuelle effectuée');
        } catch (error) {
            console.error(error);
            showNotification('error', 'Échec de la sauvegarde');
        }
    }

    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        showNotification('info', 'Fonction de recherche à venir');
    }
});

// ===== CONSOLE MESSAGE =====
console.log('%c🔐 Admin Panel - Alina Coaching', 'font-size: 20px; font-weight: bold; color: #6366f1;');
console.log('%cInterface d\'administration chargée avec succès', 'font-size: 14px; color: #10b981;');
console.log('%cVersion: 1.0.0 | Mode: Localhost JSON', 'font-size: 12px; color: #6b7280;');

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', async () => {
    console.log('✅ Admin interface initialized');

    try {
        await loadAdminContent();
        showNotification('success', 'Contenu JSON chargé avec succès');
    } catch (error) {
        console.error(error);
        showNotification('error', 'Impossible de charger le contenu JSON');
    }

    setTimeout(() => {
        showNotification('info', 'Bienvenue dans votre espace d\'administration!');
    }, 500);
});

// ===== EXPORT FUNCTIONS =====
window.adminFunctions = {
    showNotification,
    openModal,
    closeModal,
    searchContent,
    autoSave
};

// ===== ADDITIONAL MODALS =====
function openVideoModal() {
    const { modal, closeModalLocal } = openDynamicModal('mediaHubModal', 'Gestion Média', `
        <div class="form-group">
            <label>Actions rapides</label>
            <div style="display:grid; gap:1rem;">
                <button type="button" id="manageAboutImage" style="padding:1rem; border:none; border-radius:8px; background:#6366f1; color:white; cursor:pointer;">
                    Gérer l'image de la section À propos
                </button>
                <button type="button" id="managePartners" style="padding:1rem; border:none; border-radius:8px; background:#8b5cf6; color:white; cursor:pointer;">
                    Gérer les partenaires
                </button>
                <button type="button" id="manageTestimonials" style="padding:1rem; border:none; border-radius:8px; background:#ec4899; color:white; cursor:pointer;">
                    Gérer les témoignages
                </button>
                <button type="button" id="managePricing" style="padding:1rem; border:none; border-radius:8px; background:#14b8a6; color:white; cursor:pointer;">
                    Gérer les tarifs
                </button>
                <button type="button" id="manageEvents" style="padding:1rem; border:none; border-radius:8px; background:#f59e0b; color:white; cursor:pointer;">
                    Gérer les événements
                </button>
                <button type="button" id="saveVideo" style="padding:1rem; border:none; border-radius:8px; background:#e5e7eb; color:#374151; cursor:pointer;">
                    Ajouter une vidéo (placeholder)
                </button>
            </div>
        </div>
    `);

    modal.querySelector('#manageAboutImage').addEventListener('click', () => {
        closeModalLocal();
        openAboutImageModal();
    });

    modal.querySelector('#managePartners').addEventListener('click', () => {
        closeModalLocal();
        openPartnersModal();
    });

    modal.querySelector('#manageTestimonials').addEventListener('click', () => {
        closeModalLocal();
        openTestimonialsModal();
    });

    modal.querySelector('#managePricing').addEventListener('click', () => {
        closeModalLocal();
        openPricingModal();
    });

    modal.querySelector('#manageEvents').addEventListener('click', () => {
        closeModalLocal();
        openEventsModal();
    });

    modal.querySelector('#saveVideo').addEventListener('click', () => {
        showNotification('info', 'Gestion vidéo avancée à brancher ensuite');
    });
}

function openAboutImageModal() {
    const { modal, closeModalLocal } = openDynamicModal('aboutImageModal', 'Image - Section À propos', `
        <div class="form-group">
            <label>Langue</label>
            <div style="display:flex; gap:0.5rem; margin-bottom:1rem;">
                ${createLangTabsHtml()}
            </div>
        </div>
        <div class="form-group">
            <label>Chemin image actuel</label>
            <input type="text" id="aboutImagePath" readonly style="width:100%; padding:0.75rem; border:2px solid #e5e7eb; border-radius:8px; background:#f9fafb;">
        </div>
        <div class="form-group">
            <label>Texte alternatif</label>
            <input type="text" id="aboutImageAlt" placeholder="Photo d'Alina" style="width:100%; padding:0.75rem; border:2px solid #e5e7eb; border-radius:8px;">
        </div>
        <div class="form-group">
            <label>Placeholder</label>
            <input type="text" id="aboutImagePlaceholder" placeholder="Photo d'Alina" style="width:100%; padding:0.75rem; border:2px solid #e5e7eb; border-radius:8px;">
        </div>
        <div class="form-group">
            <label>Nouvelle image</label>
            <input type="file" id="aboutImageFile" accept="image/*" style="width:100%;">
        </div>
        <div style="display:flex; gap:1rem;">
            <button type="button" id="saveAboutImage" style="flex:1; padding:1rem; border:none; border-radius:8px; background:#6366f1; color:white; cursor:pointer;">
                Enregistrer
            </button>
            <button type="button" id="removeAboutImage" style="flex:1; padding:1rem; border:none; border-radius:8px; background:#e5e7eb; color:#374151; cursor:pointer;">
                Supprimer l'image
            </button>
        </div>
    `);

    function fillAboutImageFields() {
        const lang = getActiveLang(modal);
        const section = getSectionData(lang, 'about');

        if (!section) {
            return;
        }

        const image = ensureObject(section, 'image');
        modal.querySelector('#aboutImagePath').value = image.src || '';
        modal.querySelector('#aboutImageAlt').value = image.alt || '';
        modal.querySelector('#aboutImagePlaceholder').value = image.placeholder || '';
    }

    bindLangTabs(modal, fillAboutImageFields);
    fillAboutImageFields();

    modal.querySelector('#saveAboutImage').addEventListener('click', async () => {
        const lang = getActiveLang(modal);
        const section = getSectionData(lang, 'about');

        if (!section) {
            showNotification('error', 'Section À propos introuvable');
            return;
        }

        const image = ensureObject(section, 'image');
        const selectedFile = modal.querySelector('#aboutImageFile').files[0];

        try {
            if (selectedFile) {
                image.src = await uploadImageFile(selectedFile);
            }

            image.alt = modal.querySelector('#aboutImageAlt').value.trim();
            image.placeholder = modal.querySelector('#aboutImagePlaceholder').value.trim();

            await saveAdminContent();
            fillAboutImageFields();
            showNotification('success', 'Image À propos sauvegardée');
            closeModalLocal();
        } catch (error) {
            console.error(error);
            showNotification('error', error.message || 'Erreur sauvegarde image À propos');
        }
    });

    modal.querySelector('#removeAboutImage').addEventListener('click', async () => {
        const lang = getActiveLang(modal);
        const section = getSectionData(lang, 'about');

        if (!section) {
            showNotification('error', 'Section À propos introuvable');
            return;
        }

        const image = ensureObject(section, 'image');

        try {
            image.src = '';
            image.alt = modal.querySelector('#aboutImageAlt').value.trim();
            image.placeholder = modal.querySelector('#aboutImagePlaceholder').value.trim();

            await saveAdminContent();
            fillAboutImageFields();
            showNotification('success', 'Image À propos supprimée');
        } catch (error) {
            console.error(error);
            showNotification('error', error.message || 'Erreur suppression image À propos');
        }
    });
}

function openPartnersModal() {
    const { modal, closeModalLocal } = openDynamicModal('partnersModal', 'Partenaires', `
        <div class="form-group">
            <label>Langue</label>
            <div style="display:flex; gap:0.5rem; margin-bottom:1rem;">
                ${createLangTabsHtml()}
            </div>
        </div>
        <div class="form-group">
            <label>Partenaire 1 - Nom</label>
            <input type="text" id="partner1Name" style="width:100%; padding:0.75rem; border:2px solid #e5e7eb; border-radius:8px;">
        </div>
        <div class="form-group">
            <label>Partenaire 1 - Spécialité</label>
            <input type="text" id="partner1Specialty" style="width:100%; padding:0.75rem; border:2px solid #e5e7eb; border-radius:8px;">
        </div>
        <div class="form-group">
            <label>Partenaire 1 - Description</label>
            <textarea id="partner1Description" rows="3" style="width:100%; padding:0.75rem; border:2px solid #e5e7eb; border-radius:8px; resize:vertical;"></textarea>
        </div>
        <div class="form-group">
            <label>Partenaire 1 - Nouvelle image</label>
            <input type="file" id="partner1Image" accept="image/*" style="width:100%;">
        </div>
        <button type="button" id="savePartners" style="width:100%; padding:1rem; border:none; border-radius:8px; background:#6366f1; color:white; cursor:pointer;">
            Enregistrer partenaires
        </button>
    `);

    function fillPartnerFields() {
        const lang = getActiveLang(modal);
        const section = getSectionData(lang, 'partners');

        if (!section || !Array.isArray(section.items) || !section.items[0]) {
            return;
        }

        modal.querySelector('#partner1Name').value = section.items[0].name || '';
        modal.querySelector('#partner1Specialty').value = section.items[0].specialty || '';
        modal.querySelector('#partner1Description').value = section.items[0].description || '';
    }

    bindLangTabs(modal, fillPartnerFields);
    fillPartnerFields();

    modal.querySelector('#savePartners').addEventListener('click', async () => {
        const lang = getActiveLang(modal);
        const section = getSectionData(lang, 'partners');

        if (!section) {
            showNotification('error', 'Section partenaires introuvable');
            return;
        }

        if (!Array.isArray(section.items)) {
            section.items = [];
        }

        if (!section.items[0]) {
            section.items[0] = {
                name: '',
                specialty: '',
                description: '',
                image: ''
            };
        }

        try {
            section.items[0].name = modal.querySelector('#partner1Name').value.trim();
            section.items[0].specialty = modal.querySelector('#partner1Specialty').value.trim();
            section.items[0].description = modal.querySelector('#partner1Description').value.trim();

            const imageFile = modal.querySelector('#partner1Image').files[0];
            if (imageFile) {
                section.items[0].image = await uploadImageFile(imageFile);
            }

            await saveAdminContent();
            showNotification('success', 'Premier partenaire sauvegardé');
            closeModalLocal();
        } catch (error) {
            console.error(error);
            showNotification('error', error.message || 'Erreur sauvegarde partenaires');
        }
    });
}

function openTestimonialsModal() {
    const { modal, closeModalLocal } = openDynamicModal('testimonialsModal', 'Témoignages', `
        <div class="form-group">
            <label>Langue</label>
            <div style="display:flex; gap:0.5rem; margin-bottom:1rem;">
                ${createLangTabsHtml()}
            </div>
        </div>
        <div class="form-group">
            <label>Témoignage 1 - Nom</label>
            <input type="text" id="testimonial1Name" style="width:100%; padding:0.75rem; border:2px solid #e5e7eb; border-radius:8px;">
        </div>
        <div class="form-group">
            <label>Témoignage 1 - Durée</label>
            <input type="text" id="testimonial1Duration" style="width:100%; padding:0.75rem; border:2px solid #e5e7eb; border-radius:8px;">
        </div>
        <div class="form-group">
            <label>Témoignage 1 - Note</label>
            <select id="testimonial1Rating" style="width:100%; padding:0.75rem; border:2px solid #e5e7eb; border-radius:8px;">
                <option value="5">5</option>
                <option value="4">4</option>
                <option value="3">3</option>
                <option value="2">2</option>
                <option value="1">1</option>
            </select>
        </div>
        <div class="form-group">
            <label>Témoignage 1 - Texte</label>
            <textarea id="testimonial1Text" rows="4" style="width:100%; padding:0.75rem; border:2px solid #e5e7eb; border-radius:8px; resize:vertical;"></textarea>
        </div>
        <div class="form-group">
            <label>Témoignage 1 - Nouvelle image</label>
            <input type="file" id="testimonial1Image" accept="image/*" style="width:100%;">
        </div>
        <button type="button" id="saveTestimonials" style="width:100%; padding:1rem; border:none; border-radius:8px; background:#6366f1; color:white; cursor:pointer;">
            Enregistrer témoignage
        </button>
    `);

    function fillTestimonialFields() {
        const lang = getActiveLang(modal);
        const section = getSectionData(lang, 'testimonials');

        if (!section || !Array.isArray(section.items) || !section.items[0]) {
            return;
        }

        modal.querySelector('#testimonial1Name').value = section.items[0].name || '';
        modal.querySelector('#testimonial1Duration').value = section.items[0].duration || '';
        modal.querySelector('#testimonial1Rating').value = String(section.items[0].rating || 5);
        modal.querySelector('#testimonial1Text').value = section.items[0].text || '';
    }

    bindLangTabs(modal, fillTestimonialFields);
    fillTestimonialFields();

    modal.querySelector('#saveTestimonials').addEventListener('click', async () => {
        const lang = getActiveLang(modal);
        const section = getSectionData(lang, 'testimonials');

        if (!section) {
            showNotification('error', 'Section témoignages introuvable');
            return;
        }

        if (!Array.isArray(section.items)) {
            section.items = [];
        }

        if (!section.items[0]) {
            section.items[0] = {
                name: '',
                duration: '',
                rating: 5,
                text: '',
                image: ''
            };
        }

        try {
            section.items[0].name = modal.querySelector('#testimonial1Name').value.trim();
            section.items[0].duration = modal.querySelector('#testimonial1Duration').value.trim();
            section.items[0].rating = Number(modal.querySelector('#testimonial1Rating').value || 5);
            section.items[0].text = modal.querySelector('#testimonial1Text').value.trim();

            const imageFile = modal.querySelector('#testimonial1Image').files[0];
            if (imageFile) {
                section.items[0].image = await uploadImageFile(imageFile);
            }

            await saveAdminContent();
            showNotification('success', 'Premier témoignage sauvegardé');
            closeModalLocal();
        } catch (error) {
            console.error(error);
            showNotification('error', error.message || 'Erreur sauvegarde témoignage');
        }
    });
}

function openPricingModal() {
    const { modal, closeModalLocal } = openDynamicModal('pricingModal', 'Tarifs', `
        <div class="form-group">
            <label>Langue</label>
            <div style="display:flex; gap:0.5rem; margin-bottom:1rem;">
                ${createLangTabsHtml()}
            </div>
        </div>
        <div class="form-group">
            <label>Formule 1 - Nom</label>
            <input type="text" id="pricing1Name" style="width:100%; padding:0.75rem; border:2px solid #e5e7eb; border-radius:8px;">
        </div>
        <div class="form-group">
            <label>Formule 1 - Prix</label>
            <input type="text" id="pricing1Price" style="width:100%; padding:0.75rem; border:2px solid #e5e7eb; border-radius:8px;">
        </div>
        <div class="form-group">
            <label>Formule 1 - Période</label>
            <input type="text" id="pricing1Period" style="width:100%; padding:0.75rem; border:2px solid #e5e7eb; border-radius:8px;">
        </div>
        <div class="form-group">
            <label>Formule 1 - Fonctionnalités (une par ligne)</label>
            <textarea id="pricing1Features" rows="5" style="width:100%; padding:0.75rem; border:2px solid #e5e7eb; border-radius:8px; resize:vertical;"></textarea>
        </div>
        <div class="form-group" style="display:flex; align-items:center; gap:0.5rem;">
            <input type="checkbox" id="pricing1Featured" style="width:20px; height:20px;">
            <label for="pricing1Featured" style="margin:0;">Mettre en avant</label>
        </div>
        <button type="button" id="savePricing" style="width:100%; padding:1rem; border:none; border-radius:8px; background:#6366f1; color:white; cursor:pointer;">
            Enregistrer tarif
        </button>
    `);

    function fillPricingFields() {
        const lang = getActiveLang(modal);
        const section = getSectionData(lang, 'pricing');

        if (!section || !Array.isArray(section.plans) || !section.plans[0]) {
            return;
        }

        modal.querySelector('#pricing1Name').value = section.plans[0].name || '';
        modal.querySelector('#pricing1Price').value = section.plans[0].price || '';
        modal.querySelector('#pricing1Period').value = section.plans[0].period || '';
        modal.querySelector('#pricing1Features').value = (section.plans[0].features || []).join('\n');
        modal.querySelector('#pricing1Featured').checked = !!section.plans[0].featured;
    }

    bindLangTabs(modal, fillPricingFields);
    fillPricingFields();

    modal.querySelector('#savePricing').addEventListener('click', async () => {
        const lang = getActiveLang(modal);
        const section = getSectionData(lang, 'pricing');

        if (!section) {
            showNotification('error', 'Section tarifs introuvable');
            return;
        }

        if (!Array.isArray(section.plans)) {
            section.plans = [];
        }

        if (!section.plans[0]) {
            section.plans[0] = {
                name: '',
                price: '',
                period: '',
                featured: false,
                features: []
            };
        }

        try {
            section.plans[0].name = modal.querySelector('#pricing1Name').value.trim();
            section.plans[0].price = modal.querySelector('#pricing1Price').value.trim();
            section.plans[0].period = modal.querySelector('#pricing1Period').value.trim();
            section.plans[0].featured = modal.querySelector('#pricing1Featured').checked;
            section.plans[0].features = modal.querySelector('#pricing1Features').value
                .split('\n')
                .map(line => line.trim())
                .filter(Boolean);

            await saveAdminContent();
            showNotification('success', 'Première formule sauvegardée');
            closeModalLocal();
        } catch (error) {
            console.error(error);
            showNotification('error', error.message || 'Erreur sauvegarde tarifs');
        }
    });
}

function openEventsModal() {
    const { modal, closeModalLocal } = openDynamicModal('eventsModal', 'Prochains événements', `
        <div class="form-group">
            <label>Langue</label>
            <div style="display:flex; gap:0.5rem; margin-bottom:1rem;">
                ${createLangTabsHtml()}
            </div>
        </div>
        <div class="form-group">
            <label>Titre de section</label>
            <input type="text" id="eventsSectionTitle" style="width:100%; padding:0.75rem; border:2px solid #e5e7eb; border-radius:8px;">
        </div>
        <div class="form-group">
            <label>Description de section</label>
            <textarea id="eventsSectionDescription" rows="3" style="width:100%; padding:0.75rem; border:2px solid #e5e7eb; border-radius:8px; resize:vertical;"></textarea>
        </div>
        <div style="display:flex; justify-content:space-between; align-items:center; margin:1.5rem 0 1rem;">
            <h4 style="margin:0; color:#111827;">Liste des événements</h4>
            <button type="button" id="addEventItem" style="padding:0.75rem 1rem; border:none; border-radius:8px; background:#10b981; color:white; cursor:pointer;">
                + Ajouter un événement
            </button>
        </div>
        <div id="eventsItemsContainer" style="display:grid; gap:1rem;"></div>
        <button type="button" id="saveEvents" style="width:100%; padding:1rem; border:none; border-radius:8px; background:#6366f1; color:white; cursor:pointer; margin-top:1rem;">
            Enregistrer événements
        </button>
    `);

    function createEmptyEvent() {
        return {
            enabled: true,
            day: '',
            month: '',
            category: '',
            title: '',
            time: '',
            location: '',
            description: '',
            ctaLabel: '',
            ctaLink: '#contact'
        };
    }

    function ensureEventsSection(lang) {
        if (!adminSiteContent.content[lang].events || typeof adminSiteContent.content[lang].events !== 'object') {
            adminSiteContent.content[lang].events = {
                tag: 'Prochains événements',
                title: '',
                description: '',
                cta: 'Réserver',
                items: []
            };
        }

        if (!Array.isArray(adminSiteContent.content[lang].events.items)) {
            adminSiteContent.content[lang].events.items = [];
        }

        return adminSiteContent.content[lang].events;
    }

    function renderEventItems() {
        const lang = getActiveLang(modal);
        const section = ensureEventsSection(lang);
        const container = modal.querySelector('#eventsItemsContainer');

        container.innerHTML = '';

        if (!section.items.length) {
            const emptyState = document.createElement('div');
            emptyState.style.padding = '1rem';
            emptyState.style.border = '2px dashed #d1d5db';
            emptyState.style.borderRadius = '12px';
            emptyState.style.color = '#6b7280';
            emptyState.textContent = 'Aucun événement. Cliquez sur "Ajouter un événement".';
            container.appendChild(emptyState);
            return;
        }

        section.items.forEach((item, index) => {
            const card = document.createElement('div');
            card.style.padding = '1rem';
            card.style.border = '1px solid #e5e7eb';
            card.style.borderRadius = '12px';
            card.style.background = '#f9fafb';
            card.innerHTML = `
                <div style="display:flex; justify-content:space-between; align-items:center; gap:0.75rem; margin-bottom:1rem;">
                    <h5 style="margin:0; color:#111827;">Événement ${index + 1}</h5>
                    <div style="display:flex; gap:0.5rem; flex-wrap:wrap;">
                        <button type="button" class="move-event-up" data-index="${index}" style="padding:0.5rem 0.75rem; border:none; border-radius:8px; background:#e5e7eb; color:#111827; cursor:pointer;">
                            ↑ Monter
                        </button>
                        <button type="button" class="move-event-down" data-index="${index}" style="padding:0.5rem 0.75rem; border:none; border-radius:8px; background:#e5e7eb; color:#111827; cursor:pointer;">
                            ↓ Descendre
                        </button>
                        <button type="button" class="remove-event-item" data-index="${index}" style="padding:0.5rem 0.75rem; border:none; border-radius:8px; background:#ef4444; color:white; cursor:pointer;">
                            Supprimer
                        </button>
                    </div>
                </div>
                <div class="form-group">
                    <label>Catégorie</label>
                    <input type="text" class="event-input" data-index="${index}" data-field="category" value="${item.category || ''}" style="width:100%; padding:0.75rem; border:2px solid #e5e7eb; border-radius:8px;">
                </div>
                <div class="form-group">
                    <label>Titre</label>
                    <input type="text" class="event-input" data-index="${index}" data-field="title" value="${item.title || ''}" style="width:100%; padding:0.75rem; border:2px solid #e5e7eb; border-radius:8px;">
                </div>
                <div style="display:grid; grid-template-columns:repeat(2, 1fr); gap:1rem;">
                    <div class="form-group">
                        <label>Jour</label>
                        <input type="text" class="event-input" data-index="${index}" data-field="day" value="${item.day || ''}" style="width:100%; padding:0.75rem; border:2px solid #e5e7eb; border-radius:8px;">
                    </div>
                    <div class="form-group">
                        <label>Mois</label>
                        <input type="text" class="event-input" data-index="${index}" data-field="month" value="${item.month || ''}" style="width:100%; padding:0.75rem; border:2px solid #e5e7eb; border-radius:8px;">
                    </div>
                </div>
                <div style="display:grid; grid-template-columns:repeat(2, 1fr); gap:1rem;">
                    <div class="form-group">
                        <label>Heure</label>
                        <input type="text" class="event-input" data-index="${index}" data-field="time" value="${item.time || ''}" style="width:100%; padding:0.75rem; border:2px solid #e5e7eb; border-radius:8px;">
                    </div>
                    <div class="form-group">
                        <label>Lieu</label>
                        <input type="text" class="event-input" data-index="${index}" data-field="location" value="${item.location || ''}" style="width:100%; padding:0.75rem; border:2px solid #e5e7eb; border-radius:8px;">
                    </div>
                </div>
                <div class="form-group">
                    <label>Description</label>
                    <textarea class="event-input" data-index="${index}" data-field="description" rows="3" style="width:100%; padding:0.75rem; border:2px solid #e5e7eb; border-radius:8px; resize:vertical;">${item.description || ''}</textarea>
                </div>
                <div style="display:grid; grid-template-columns:repeat(2, 1fr); gap:1rem;">
                    <div class="form-group">
                        <label>Libellé du bouton</label>
                        <input type="text" class="event-input" data-index="${index}" data-field="ctaLabel" value="${item.ctaLabel || ''}" style="width:100%; padding:0.75rem; border:2px solid #e5e7eb; border-radius:8px;">
                    </div>
                    <div class="form-group">
                        <label>Lien bouton</label>
                        <input type="text" class="event-input" data-index="${index}" data-field="ctaLink" value="${item.ctaLink || '#contact'}" style="width:100%; padding:0.75rem; border:2px solid #e5e7eb; border-radius:8px;">
                    </div>
                </div>
                <div class="form-group" style="display:flex; align-items:center; gap:0.5rem; margin-bottom:0;">
                    <input type="checkbox" class="event-enabled" data-index="${index}" ${item.enabled !== false ? 'checked' : ''} style="width:20px; height:20px;">
                    <label style="margin:0;">Afficher cet événement</label>
                </div>
            `;
            container.appendChild(card);
        });

        container.querySelectorAll('.remove-event-item').forEach(button => {
            button.addEventListener('click', () => {
                const index = Number(button.dataset.index);
                section.items.splice(index, 1);
                renderEventItems();
            });
        });

        container.querySelectorAll('.move-event-up').forEach(button => {
            button.addEventListener('click', () => {
                const index = Number(button.dataset.index);
                if (index <= 0) return;
                [section.items[index - 1], section.items[index]] = [section.items[index], section.items[index - 1]];
                renderEventItems();
            });
        });

        container.querySelectorAll('.move-event-down').forEach(button => {
            button.addEventListener('click', () => {
                const index = Number(button.dataset.index);
                if (index >= section.items.length - 1) return;
                [section.items[index], section.items[index + 1]] = [section.items[index + 1], section.items[index]];
                renderEventItems();
            });
        });
    }

    function fillEventFields() {
        const lang = getActiveLang(modal);
        const section = ensureEventsSection(lang);

        modal.querySelector('#eventsSectionTitle').value = section.title || '';
        modal.querySelector('#eventsSectionDescription').value = section.description || '';
        renderEventItems();
    }

    bindLangTabs(modal, fillEventFields);
    fillEventFields();

    modal.querySelector('#addEventItem').addEventListener('click', () => {
        const lang = getActiveLang(modal);
        const section = ensureEventsSection(lang);
        section.items.push(createEmptyEvent());
        renderEventItems();
    });

    modal.querySelector('#saveEvents').addEventListener('click', async () => {
        const lang = getActiveLang(modal);
        const section = ensureEventsSection(lang);

        try {
            section.title = modal.querySelector('#eventsSectionTitle').value.trim();
            section.description = modal.querySelector('#eventsSectionDescription').value.trim();

            const items = section.items.map(() => createEmptyEvent());

            modal.querySelectorAll('.event-input').forEach(input => {
                const index = Number(input.dataset.index);
                const field = input.dataset.field;
                items[index][field] = input.value.trim();
            });

            modal.querySelectorAll('.event-enabled').forEach(input => {
                const index = Number(input.dataset.index);
                items[index].enabled = input.checked;
            });

            section.items = items.filter(item =>
                item.title || item.category || item.description || item.location || item.day || item.month
            );

            await saveAdminContent();
            showNotification('success', 'Événements sauvegardés');
            closeModalLocal();
        } catch (error) {
            console.error(error);
            showNotification('error', error.message || 'Erreur sauvegarde événements');
        }
    });
}

function openTestimonialModal() {
    const modal = document.createElement('div');
    modal.className = 'modal active';
    modal.id = 'testimonialModal';
    modal.innerHTML = `
        <div class="modal-overlay"></div>
        <div class="modal-content">
            <div class="modal-header">
                <h3>Nouveau Témoignage</h3>
                <button class="modal-close">✕</button>
            </div>
            <div class="modal-body">
                <div class="form-group">
                    <label>Nom du client</label>
                    <input type="text" id="clientName" placeholder="Marie D." style="width: 100%; padding: 0.75rem; border: 2px solid #e5e7eb; border-radius: 8px; font-size: 1rem;">
                </div>
                <div class="form-group">
                    <label>Note</label>
                    <select id="rating" style="width: 100%; padding: 0.75rem; border: 2px solid #e5e7eb; border-radius: 8px; font-size: 1rem;">
                        <option value="5">⭐⭐⭐⭐⭐ (5/5)</option>
                        <option value="4">⭐⭐⭐⭐ (4/5)</option>
                        <option value="3">⭐⭐⭐ (3/5)</option>
                        <option value="2">⭐⭐ (2/5)</option>
                        <option value="1">⭐ (1/5)</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>Témoignage (FR)</label>
                    <textarea id="testimonialText" rows="4" placeholder="Votre témoignage..." style="width: 100%; padding: 0.75rem; border: 2px solid #e5e7eb; border-radius: 8px; font-size: 1rem; resize: vertical;"></textarea>
                </div>
                <div class="form-group">
                    <label>Durée de coaching</label>
                    <input type="text" id="coachingDuration" placeholder="6 mois" style="width: 100%; padding: 0.75rem; border: 2px solid #e5e7eb; border-radius: 8px; font-size: 1rem;">
                </div>
                <div class="form-group" style="display: flex; align-items: center; gap: 0.5rem;">
                    <input type="checkbox" id="featured" style="width: 20px; height: 20px;">
                    <label for="featured" style="margin: 0;">Mettre en avant</label>
                </div>
                <button class="btn-primary" id="saveTestimonial" style="width: 100%; padding: 1rem; background: #6366f1; color: white; border: none; border-radius: 8px; font-size: 1rem; font-weight: 600; cursor: pointer; margin-top: 1rem;">
                    Enregistrer le témoignage
                </button>
            </div>
        </div>
    `;

    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';

    const closeBtn = modal.querySelector('.modal-close');
    const overlay = modal.querySelector('.modal-overlay');

    const closeModalLocal = () => {
        document.body.removeChild(modal);
        document.body.style.overflow = 'auto';
    };

    closeBtn.addEventListener('click', closeModalLocal);
    overlay.addEventListener('click', closeModalLocal);

    document.getElementById('saveTestimonial').addEventListener('click', () => {
        const testimonialData = {
            name: document.getElementById('clientName').value,
            rating: document.getElementById('rating').value,
            text: document.getElementById('testimonialText').value,
            duration: document.getElementById('coachingDuration').value,
            featured: document.getElementById('featured').checked
        };

        console.log('Témoignage ajouté:', testimonialData);
        showNotification('success', `Témoignage de ${testimonialData.name} ajouté avec succès !`);
        closeModalLocal();
    });
}

function openContentEditor() {
    const modal = document.createElement('div');
    modal.className = 'modal active';
    modal.id = 'contentModal';
    modal.innerHTML = `
        <div class="modal-overlay"></div>
        <div class="modal-content" style="max-width: 900px;">
            <div class="modal-header">
                <h3>Modifier le Contenu</h3>
                <button class="modal-close">✕</button>
            </div>
            <div class="modal-body">
                <div class="form-group">
                    <label>Section</label>
                    <select id="contentSection" style="width: 100%; padding: 0.75rem; border: 2px solid #e5e7eb; border-radius: 8px; font-size: 1rem;">
                        <option value="hero">Hero (Page d'accueil)</option>
                        <option value="about">À propos</option>
                        <option value="services">Services</option>
                        <option value="events">Événements</option>
                        <option value="gallery">Galerie</option>
                        <option value="partners">Partenaires</option>
                        <option value="testimonials">Témoignages</option>
                        <option value="pricing">Tarifs</option>
                        <option value="contact">Contact</option>
                        <option value="footer">Footer</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>Langue</label>
                    <div style="display: flex; gap: 0.5rem; margin-bottom: 1rem;">
                        <button type="button" class="lang-tab active" data-lang="fr" style="padding: 0.5rem 1rem; border: 2px solid #6366f1; background: #6366f1; color: white; border-radius: 8px; cursor: pointer;">🇫🇷 FR</button>
                        <button type="button" class="lang-tab" data-lang="en" style="padding: 0.5rem 1rem; border: 2px solid #e5e7eb; background: white; color: #6b7280; border-radius: 8px; cursor: pointer;">🇬🇧 EN</button>
                        <button type="button" class="lang-tab" data-lang="sk" style="padding: 0.5rem 1rem; border: 2px solid #e5e7eb; background: white; color: #6b7280; border-radius: 8px; cursor: pointer;">🇸🇰 SK</button>
                        <button type="button" class="lang-tab" data-lang="ua" style="padding: 0.5rem 1rem; border: 2px solid #e5e7eb; background: white; color: #6b7280; border-radius: 8px; cursor: pointer;">🇺🇦 UA</button>
                    </div>
                </div>
                <div class="form-group">
                    <label>Titre</label>
                    <input type="text" id="contentTitle" placeholder="Titre de la section" style="width: 100%; padding: 0.75rem; border: 2px solid #e5e7eb; border-radius: 8px; font-size: 1rem;">
                </div>
                <div class="form-group">
                    <label>Contenu</label>
                    <textarea id="contentText" rows="8" placeholder="Contenu de la section..." style="width: 100%; padding: 0.75rem; border: 2px solid #e5e7eb; border-radius: 8px; font-size: 1rem; resize: vertical;"></textarea>
                </div>
                <div style="display: flex; gap: 1rem;">
                    <button class="btn-primary" id="saveContent" style="flex: 1; padding: 1rem; background: #6366f1; color: white; border: none; border-radius: 8px; font-size: 1rem; font-weight: 600; cursor: pointer;">
                        Enregistrer
                    </button>
                    <button class="btn-secondary" id="previewContent" style="flex: 1; padding: 1rem; background: #e5e7eb; color: #6b7280; border: none; border-radius: 8px; font-size: 1rem; font-weight: 600; cursor: pointer;">
                        Prévisualiser
                    </button>
                </div>
            </div>
        </div>
    `;

    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';

    const sectionSelect = modal.querySelector('#contentSection');

    modal.querySelectorAll('.lang-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            modal.querySelectorAll('.lang-tab').forEach(t => {
                t.style.background = 'white';
                t.style.color = '#6b7280';
                t.style.borderColor = '#e5e7eb';
                t.classList.remove('active');
            });
            tab.style.background = '#6366f1';
            tab.style.color = 'white';
            tab.style.borderColor = '#6366f1';
            tab.classList.add('active');
            populateEditorFields(modal);
        });
    });

    sectionSelect.addEventListener('change', () => {
        populateEditorFields(modal);
    });

    const closeBtn = modal.querySelector('.modal-close');
    const overlay = modal.querySelector('.modal-overlay');

    const closeModalLocal = () => {
        document.body.removeChild(modal);
        document.body.style.overflow = 'auto';
    };

    closeBtn.addEventListener('click', closeModalLocal);
    overlay.addEventListener('click', closeModalLocal);

    populateEditorFields(modal);

    document.getElementById('saveContent').addEventListener('click', async () => {
        const section = sectionSelect.value;
        const language = modal.querySelector('.lang-tab.active').dataset.lang;
        const title = document.getElementById('contentTitle').value;
        const text = document.getElementById('contentText').value;

        updateSectionData(language, section, title, text);

        try {
            await saveAdminContent();
            showNotification('success', `Contenu de la section "${section}" mis à jour !`);
            closeModalLocal();
        } catch (error) {
            console.error(error);
            showNotification('error', 'Échec de la sauvegarde du contenu');
        }
    });

    document.getElementById('previewContent').addEventListener('click', () => {
        showNotification('info', 'Prévisualisation disponible sur le site localhost');
    });
}

window.openVideoModal = openVideoModal;
window.openTestimonialModal = openTestimonialModal;
window.openContentEditor = openContentEditor;

// Made with Bob
