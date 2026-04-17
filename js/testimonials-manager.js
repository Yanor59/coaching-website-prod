// ===== TESTIMONIALS MANAGER =====
// Gestion des témoignages avec système de modération

let testimonialsData = null;
let currentFilter = 'all'; // all, pending, approved, rejected

// ===== RENDER TESTIMONIALS MANAGER =====
function renderTestimonialsManager() {
    const mainContent = document.querySelector('.admin-content');
    if (!mainContent || !siteContent) {
        console.error('Cannot render testimonials manager');
        return;
    }
    
    const t = (key) => typeof adminI18n !== 'undefined' ? adminI18n.t(key) : key;
    
    // Get testimonials data for all languages
    testimonialsData = {
        fr: (siteContent.content && siteContent.content.fr && siteContent.content.fr.testimonials) || { items: [] },
        en: (siteContent.content && siteContent.content.en && siteContent.content.en.testimonials) || { items: [] },
        sk: (siteContent.content && siteContent.content.sk && siteContent.content.sk.testimonials) || { items: [] },
        ua: (siteContent.content && siteContent.content.ua && siteContent.content.ua.testimonials) || { items: [] }
    };
    
    const testimonials = testimonialsData.fr.items || [];
    const stats = getTestimonialsStats(testimonials);
    
    mainContent.innerHTML = `
        <div class="testimonials-manager-container">
            <div class="manager-header">
                <h2>💬 ${t('testimonialsManager.title')}</h2>
                <p>${t('testimonialsManager.subtitle')}</p>
            </div>
            
            <div class="testimonials-stats">
                <div class="stat-card">
                    <span class="stat-number">${stats.total}</span>
                    <span class="stat-label">${t('testimonialsManager.stats.total')}</span>
                </div>
                <div class="stat-card stat-pending">
                    <span class="stat-number">${stats.pending}</span>
                    <span class="stat-label">${t('testimonialsManager.stats.pending')}</span>
                </div>
                <div class="stat-card stat-approved">
                    <span class="stat-number">${stats.approved}</span>
                    <span class="stat-label">${t('testimonialsManager.stats.approved')}</span>
                </div>
                <div class="stat-card stat-rejected">
                    <span class="stat-number">${stats.rejected}</span>
                    <span class="stat-label">${t('testimonialsManager.stats.rejected')}</span>
                </div>
            </div>
            
            <div class="testimonials-actions">
                <button id="add-testimonial-btn" class="btn-primary">
                    ➕ ${t('testimonialsManager.addTestimonial')}
                </button>
                
                <div class="filter-buttons">
                    <button class="filter-btn ${currentFilter === 'all' ? 'active' : ''}" data-filter="all">
                        📋 ${t('testimonialsManager.filters.all')} (${stats.total})
                    </button>
                    <button class="filter-btn ${currentFilter === 'pending' ? 'active' : ''}" data-filter="pending">
                        ⏳ ${t('testimonialsManager.filters.pending')} (${stats.pending})
                    </button>
                    <button class="filter-btn ${currentFilter === 'approved' ? 'active' : ''}" data-filter="approved">
                        ✅ ${t('testimonialsManager.filters.approved')} (${stats.approved})
                    </button>
                    <button class="filter-btn ${currentFilter === 'rejected' ? 'active' : ''}" data-filter="rejected">
                        ❌ ${t('testimonialsManager.filters.rejected')} (${stats.rejected})
                    </button>
                </div>
            </div>
            
            <div id="testimonials-list" class="testimonials-list">
                ${renderTestimonialsList(testimonials)}
            </div>
        </div>
        
        <!-- Modal for add/edit testimonial -->
        <div id="testimonial-modal" class="modal">
            <div class="modal-content">
                <span class="modal-close">&times;</span>
                <h3 id="modal-title" data-i18n="testimonialsManager.addTestimonial">${t('testimonialsManager.addTestimonial')}</h3>
                <form id="testimonial-form">
                    <input type="hidden" id="testimonial-index" value="-1">
                    
                    <div class="form-group">
                        <label data-i18n="testimonialsManager.form.author">${t('testimonialsManager.form.author')} *</label>
                        <input type="text" id="testimonial-author" class="form-control" required>
                    </div>
                    
                    <div class="form-group">
                        <label data-i18n="testimonialsManager.form.role">${t('testimonialsManager.form.role')}</label>
                        <input type="text" id="testimonial-role" class="form-control" data-i18n-placeholder="testimonialsManager.form.rolePlaceholder" placeholder="${t('testimonialsManager.form.rolePlaceholder')}">
                    </div>
                    
                    <div class="form-row">
                        <div class="form-group">
                            <label data-i18n="testimonialsManager.form.rating">${t('testimonialsManager.form.rating')}</label>
                            <select id="testimonial-rating" class="form-control">
                                <option value="5">⭐⭐⭐⭐⭐ (5/5)</option>
                                <option value="4">⭐⭐⭐⭐ (4/5)</option>
                                <option value="3">⭐⭐⭐ (3/5)</option>
                                <option value="2">⭐⭐ (2/5)</option>
                                <option value="1">⭐ (1/5)</option>
                            </select>
                        </div>
                        
                        <div class="form-group">
                            <label data-i18n="testimonialsManager.form.status">${t('testimonialsManager.form.status')} *</label>
                            <select id="testimonial-status" class="form-control" required>
                                <option value="pending" data-i18n="testimonialsManager.status.pending">⏳ ${t('testimonialsManager.status.pending')}</option>
                                <option value="approved" data-i18n="testimonialsManager.status.approved">✅ ${t('testimonialsManager.status.approved')}</option>
                                <option value="rejected" data-i18n="testimonialsManager.status.rejected">❌ ${t('testimonialsManager.status.rejected')}</option>
                            </select>
                        </div>
                    </div>
                    
                    <div class="form-group">
                        <label data-i18n="testimonialsManager.form.date">${t('testimonialsManager.form.date')}</label>
                        <input type="date" id="testimonial-date" class="form-control">
                    </div>
                    
                    <div class="language-tabs">
                        <button type="button" class="lang-tab active" data-lang="fr">🇫🇷 FR</button>
                        <button type="button" class="lang-tab" data-lang="en">🇬🇧 EN</button>
                        <button type="button" class="lang-tab" data-lang="sk">🇸🇰 SK</button>
                        <button type="button" class="lang-tab" data-lang="ua">🇺🇦 UA</button>
                    </div>
                    
                    <div class="form-group">
                        <label id="text-label-fr" data-i18n="testimonialsManager.form.text">${t('testimonialsManager.form.text')} (FR) *</label>
                        <textarea id="testimonial-text-fr" class="form-control" rows="5" required></textarea>
                        
                        <label id="text-label-en" data-i18n="testimonialsManager.form.text" style="display:none">${t('testimonialsManager.form.text')} (EN) *</label>
                        <textarea id="testimonial-text-en" class="form-control" rows="5" style="display:none"></textarea>
                        
                        <label id="text-label-sk" data-i18n="testimonialsManager.form.text" style="display:none">${t('testimonialsManager.form.text')} (SK) *</label>
                        <textarea id="testimonial-text-sk" class="form-control" rows="5" style="display:none"></textarea>
                        
                        <label id="text-label-ua" data-i18n="testimonialsManager.form.text" style="display:none">${t('testimonialsManager.form.text')} (UA) *</label>
                        <textarea id="testimonial-text-ua" class="form-control" rows="5" style="display:none"></textarea>
                    </div>
                    
                    <div class="modal-actions">
                        <button type="button" class="btn-secondary" id="cancel-testimonial-btn" data-i18n="common.cancel">
                            ${t('common.cancel')}
                        </button>
                        <button type="submit" class="btn-primary" data-i18n="common.save">
                            💾 ${t('common.save')}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    `;
    
    bindTestimonialsEvents();
    
    // Refresh translations after rendering with a longer delay
    setTimeout(() => {
        if (typeof window.refreshAdminTranslations === 'function') {
            console.log('🔄 Refreshing translations for Testimonials section...');
            window.refreshAdminTranslations();
        } else {
            console.warn('⚠️ refreshAdminTranslations not available');
        }
    }, 500);
}

// ===== GET STATS =====
function getTestimonialsStats(testimonials) {
    return {
        total: testimonials.length,
        pending: testimonials.filter(t => t.status === 'pending').length,
        approved: testimonials.filter(t => (t.status === 'approved' || !t.status)).length,
        rejected: testimonials.filter(t => t.status === 'rejected').length
    };
}

// ===== RENDER TESTIMONIALS LIST =====
function renderTestimonialsList(testimonials) {
    const t = (key) => typeof adminI18n !== 'undefined' ? adminI18n.t(key) : key;
    
    // Filter testimonials
    const filtered = currentFilter === 'all' 
        ? testimonials 
        : testimonials.filter(t => t.status === currentFilter);
    
    if (filtered.length === 0) {
        return `
            <div class="empty-state">
                <p>💬 ${t('testimonialsManager.noTestimonials')}</p>
                <p>${t('testimonialsManager.noTestimonialsDesc')}</p>
            </div>
        `;
    }
    
    return filtered.map((testimonial, originalIndex) => {
        const index = testimonials.indexOf(testimonial);
        // Default status to 'approved' if not set
        const status = testimonial.status || 'approved';
        const statusClass = `status-${status}`;
        const statusIcon = {
            pending: '⏳',
            approved: '✅',
            rejected: '❌'
        }[status];
        
        return `
            <div class="testimonial-card ${statusClass}" data-index="${index}">
                <div class="testimonial-header">
                    <div class="testimonial-author-info">
                        <h4>${testimonial.author || testimonial.name || 'Anonyme'}</h4>
                        ${testimonial.role || testimonial.duration ? `<p class="testimonial-role">${testimonial.role || testimonial.duration}</p>` : ''}
                        ${testimonial.date ? `<p class="testimonial-date">📅 ${testimonial.date}</p>` : ''}
                    </div>
                    <div class="testimonial-status-badge ${statusClass}">
                        ${statusIcon} ${t(`testimonialsManager.status.${status}`)}
                    </div>
                </div>
                
                <div class="testimonial-rating">
                    ${'⭐'.repeat(testimonial.rating || 5)}
                </div>
                
                <div class="testimonial-text">
                    "${testimonial.text.substring(0, 150)}${testimonial.text.length > 150 ? '...' : ''}"
                </div>
                
                <div class="testimonial-actions">
                    ${testimonial.status !== 'approved' ? `
                        <button class="btn-icon btn-approve" data-index="${index}" title="${t('testimonialsManager.actions.approve')}">
                            ✅
                        </button>
                    ` : ''}
                    ${testimonial.status !== 'rejected' ? `
                        <button class="btn-icon btn-reject" data-index="${index}" title="${t('testimonialsManager.actions.reject')}">
                            ❌
                        </button>
                    ` : ''}
                    ${testimonial.status !== 'pending' ? `
                        <button class="btn-icon btn-pending" data-index="${index}" title="${t('testimonialsManager.actions.pending')}">
                            ⏳
                        </button>
                    ` : ''}
                    <button class="btn-icon btn-edit" data-index="${index}" title="${t('common.edit')}">
                        ✏️
                    </button>
                    <button class="btn-icon btn-delete" data-index="${index}" title="${t('common.delete')}">
                        🗑️
                    </button>
                </div>
            </div>
        `;
    }).join('');
}

// ===== BIND EVENTS =====
function bindTestimonialsEvents() {
    const addBtn = document.getElementById('add-testimonial-btn');
    const modal = document.getElementById('testimonial-modal');
    const closeBtn = modal?.querySelector('.modal-close');
    const cancelBtn = document.getElementById('cancel-testimonial-btn');
    const form = document.getElementById('testimonial-form');
    const langTabs = document.querySelectorAll('.lang-tab');
    const filterBtns = document.querySelectorAll('.filter-btn');
    
    // Add testimonial
    if (addBtn) {
        addBtn.addEventListener('click', () => openTestimonialModal());
    }
    
    // Close modal
    if (closeBtn) {
        closeBtn.addEventListener('click', () => closeTestimonialModal());
    }
    if (cancelBtn) {
        cancelBtn.addEventListener('click', () => closeTestimonialModal());
    }
    
    // Language tabs
    langTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const lang = tab.dataset.lang;
            switchTestimonialLanguage(lang);
            langTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
        });
    });
    
    // Filter buttons
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            currentFilter = btn.dataset.filter;
            renderTestimonialsManager();
        });
    });
    
    // Form submit
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            saveTestimonial();
        });
    }
    
    // Action buttons
    document.querySelectorAll('.btn-approve').forEach(btn => {
        btn.addEventListener('click', () => {
            const index = parseInt(btn.dataset.index);
            changeTestimonialStatus(index, 'approved');
        });
    });
    
    document.querySelectorAll('.btn-reject').forEach(btn => {
        btn.addEventListener('click', () => {
            const index = parseInt(btn.dataset.index);
            changeTestimonialStatus(index, 'rejected');
        });
    });
    
    document.querySelectorAll('.btn-pending').forEach(btn => {
        btn.addEventListener('click', () => {
            const index = parseInt(btn.dataset.index);
            changeTestimonialStatus(index, 'pending');
        });
    });
    
    document.querySelectorAll('.btn-edit').forEach(btn => {
        btn.addEventListener('click', () => {
            const index = parseInt(btn.dataset.index);
            openTestimonialModal(index);
        });
    });
    
    document.querySelectorAll('.btn-delete').forEach(btn => {
        btn.addEventListener('click', () => {
            const index = parseInt(btn.dataset.index);
            deleteTestimonial(index);
        });
    });
}

// ===== OPEN MODAL =====
function openTestimonialModal(index = -1) {
    const modal = document.getElementById('testimonial-modal');
    const form = document.getElementById('testimonial-form');
    const t = (key) => typeof adminI18n !== 'undefined' ? adminI18n.t(key) : key;
    
    // Reset form
    form.reset();
    document.getElementById('testimonial-index').value = index;
    
    if (index >= 0) {
        // Edit mode
        const testimonial = testimonialsData.fr.items[index];
        document.getElementById('modal-title').textContent = t('testimonialsManager.editTestimonial');
        document.getElementById('testimonial-author').value = testimonial.author;
        document.getElementById('testimonial-role').value = testimonial.role || '';
        document.getElementById('testimonial-rating').value = testimonial.rating || 5;
        document.getElementById('testimonial-status').value = testimonial.status;
        document.getElementById('testimonial-date').value = testimonial.date || '';
        
        // Load text for all languages
        ['fr', 'en', 'sk', 'ua'].forEach(lang => {
            const testimonialLang = testimonialsData[lang].items[index];
            document.getElementById(`testimonial-text-${lang}`).value = testimonialLang.text;
        });
    } else {
        // Add mode
        document.getElementById('modal-title').textContent = t('testimonialsManager.addTestimonial');
        document.getElementById('testimonial-status').value = 'pending';
        document.getElementById('testimonial-date').value = new Date().toISOString().split('T')[0];
    }
    
    modal.classList.add('active');
}

// ===== CLOSE MODAL =====
function closeTestimonialModal() {
    const modal = document.getElementById('testimonial-modal');
    modal.classList.remove('active');
}

// ===== SWITCH LANGUAGE =====
function switchTestimonialLanguage(lang) {
    ['fr', 'en', 'sk', 'ua'].forEach(l => {
        const label = document.getElementById(`text-label-${l}`);
        const textarea = document.getElementById(`testimonial-text-${l}`);
        if (l === lang) {
            label.style.display = 'block';
            textarea.style.display = 'block';
        } else {
            label.style.display = 'none';
            textarea.style.display = 'none';
        }
    });
}

// ===== SAVE TESTIMONIAL =====
async function saveTestimonial() {
    const index = parseInt(document.getElementById('testimonial-index').value);
    const t = (key) => typeof adminI18n !== 'undefined' ? adminI18n.t(key) : key;
    
    const commonData = {
        author: document.getElementById('testimonial-author').value.trim(),
        role: document.getElementById('testimonial-role').value.trim(),
        rating: parseInt(document.getElementById('testimonial-rating').value),
        status: document.getElementById('testimonial-status').value,
        date: document.getElementById('testimonial-date').value
    };
    
    // Save for all languages
    ['fr', 'en', 'sk', 'ua'].forEach(lang => {
        const text = document.getElementById(`testimonial-text-${lang}`).value.trim();
        
        const testimonial = {
            ...commonData,
            text
        };
        
        if (index >= 0) {
            // Edit existing
            testimonialsData[lang].items[index] = testimonial;
        } else {
            // Add new
            testimonialsData[lang].items.push(testimonial);
        }
        
        // Update site content
        siteContent.content[lang].testimonials = testimonialsData[lang];
    });
    
    // Save to server
    await saveSiteContent(siteContent);
    
    // Close modal and refresh
    closeTestimonialModal();
    renderTestimonialsManager();
    
    if (typeof showNotification === 'function') {
        showNotification(t('notifications.contentSaved'), 'success');
    }
}

// ===== CHANGE STATUS =====
async function changeTestimonialStatus(index, newStatus) {
    const t = (key) => typeof adminI18n !== 'undefined' ? adminI18n.t(key) : key;
    
    // Update status in all languages
    ['fr', 'en', 'sk', 'ua'].forEach(lang => {
        testimonialsData[lang].items[index].status = newStatus;
        siteContent.content[lang].testimonials = testimonialsData[lang];
    });
    
    // Save to server
    await saveSiteContent(siteContent);
    
    // Refresh
    renderTestimonialsManager();
    
    if (typeof showNotification === 'function') {
        showNotification(t(`notifications.testimonial${newStatus.charAt(0).toUpperCase() + newStatus.slice(1)}`), 'success');
    }
}

// ===== DELETE TESTIMONIAL =====
async function deleteTestimonial(index) {
    const t = (key) => typeof adminI18n !== 'undefined' ? adminI18n.t(key) : key;
    const testimonial = testimonialsData.fr.items[index];
    
    if (!confirm(`${t('testimonialsManager.confirmDelete')} "${testimonial.author}" ?`)) {
        return;
    }
    
    // Delete from all languages
    ['fr', 'en', 'sk', 'ua'].forEach(lang => {
        testimonialsData[lang].items.splice(index, 1);
        siteContent.content[lang].testimonials = testimonialsData[lang];
    });
    
    // Save to server
    await saveSiteContent(siteContent);
    
    // Refresh
    renderTestimonialsManager();
    
    if (typeof showNotification === 'function') {
        showNotification(t('notifications.testimonialDeleted'), 'success');
    }
}

// Made with Bob
