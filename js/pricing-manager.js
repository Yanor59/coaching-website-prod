// ===== PRICING MANAGER =====
// Gestion des tarifs avec CRUD complet et promotions

let pricingData = null;

// ===== RENDER PRICING MANAGER =====
function renderPricingManager() {
    const mainContent = document.querySelector('.admin-content');
    if (!mainContent || !siteContent) {
        console.error('Cannot render pricing manager');
        return;
    }
    
    const t = (key) => typeof adminI18n !== 'undefined' ? adminI18n.t(key) : key;
    
    // Get pricing data for all languages
    pricingData = {
        fr: siteContent.content.fr.pricing || { items: [] },
        en: siteContent.content.en.pricing || { items: [] },
        sk: siteContent.content.sk.pricing || { items: [] },
        ua: siteContent.content.ua.pricing || { items: [] }
    };
    
    const plans = pricingData.fr.items || [];
    
    mainContent.innerHTML = `
        <div class="pricing-manager-container">
            <div class="manager-header">
                <h2>💰 ${t('pricingManager.title')}</h2>
                <p>${t('pricingManager.subtitle')}</p>
                <p class="plan-count">${plans.length} ${t('pricingManager.plans')}</p>
            </div>
            
            <button id="add-plan-btn" class="btn-primary">
                ➕ ${t('pricingManager.addPlan')}
            </button>
            
            <div id="plans-list" class="plans-list">
                ${plans.length === 0 ? `
                    <div class="empty-state">
                        <p>💰 ${t('pricingManager.noPlans')}</p>
                        <p>${t('pricingManager.noPlansDesc')}</p>
                    </div>
                ` : renderPlansList(plans)}
            </div>
        </div>
        
        <!-- Modal for add/edit plan -->
        <div id="plan-modal" class="modal">
            <div class="modal-content modal-large">
                <span class="modal-close">&times;</span>
                <h3 id="modal-title" data-i18n="pricingManager.addPlan">${t('pricingManager.addPlan')}</h3>
                <form id="plan-form">
                    <input type="hidden" id="plan-index" value="-1">
                    
                    <div class="form-row">
                        <div class="form-group">
                            <label data-i18n="pricingManager.form.price">${t('pricingManager.form.price')} * (€)</label>
                            <input type="number" id="plan-price" class="form-control" step="0.01" min="0" required>
                        </div>
                        
                        <div class="form-group">
                            <label data-i18n="pricingManager.form.originalPrice">${t('pricingManager.form.originalPrice')} (€)</label>
                            <input type="number" id="plan-original-price" class="form-control" step="0.01" min="0" data-i18n-placeholder="pricingManager.form.originalPriceDesc" placeholder="${t('pricingManager.form.originalPriceDesc')}">
                        </div>
                    </div>
                    
                    <div class="form-row">
                        <div class="form-group">
                            <label data-i18n="pricingManager.form.duration">${t('pricingManager.form.duration')}</label>
                            <input type="text" id="plan-duration" class="form-control" data-i18n-placeholder="pricingManager.form.durationPlaceholder" placeholder="${t('pricingManager.form.durationPlaceholder')}">
                        </div>
                        
                        <div class="form-group">
                            <label data-i18n="pricingManager.form.markPopular">
                                <input type="checkbox" id="plan-popular">
                                ${t('pricingManager.form.markPopular')}
                            </label>
                        </div>
                    </div>
                    
                    <div class="language-tabs">
                        <button type="button" class="lang-tab active" data-lang="fr">🇫🇷 FR</button>
                        <button type="button" class="lang-tab" data-lang="en">🇬🇧 EN</button>
                        <button type="button" class="lang-tab" data-lang="sk">🇸🇰 SK</button>
                        <button type="button" class="lang-tab" data-lang="ua">🇺🇦 UA</button>
                    </div>
                    
                    <!-- French -->
                    <div class="lang-content" data-lang="fr">
                        <div class="form-group">
                            <label data-i18n="pricingManager.form.name">${t('pricingManager.form.name')} (FR) *</label>
                            <input type="text" id="plan-name-fr" class="form-control" required>
                        </div>
                        
                        <div class="form-group">
                            <label data-i18n="pricingManager.form.description">${t('pricingManager.form.description')} (FR) *</label>
                            <textarea id="plan-desc-fr" class="form-control" rows="3" required></textarea>
                        </div>
                        
                        <div class="form-group">
                            <label data-i18n="pricingManager.form.features">${t('pricingManager.form.features')} (FR)</label>
                            <textarea id="plan-features-fr" class="form-control" rows="4" data-i18n-placeholder="pricingManager.form.featuresPlaceholder" placeholder="${t('pricingManager.form.featuresPlaceholder')}"></textarea>
                            <small data-i18n="pricingManager.form.featuresHelp">${t('pricingManager.form.featuresHelp')}</small>
                        </div>
                    </div>
                    
                    <!-- English -->
                    <div class="lang-content" data-lang="en" style="display:none">
                        <div class="form-group">
                            <label data-i18n="pricingManager.form.name">${t('pricingManager.form.name')} (EN) *</label>
                            <input type="text" id="plan-name-en" class="form-control" required>
                        </div>
                        
                        <div class="form-group">
                            <label data-i18n="pricingManager.form.description">${t('pricingManager.form.description')} (EN) *</label>
                            <textarea id="plan-desc-en" class="form-control" rows="3" required></textarea>
                        </div>
                        
                        <div class="form-group">
                            <label data-i18n="pricingManager.form.features">${t('pricingManager.form.features')} (EN)</label>
                            <textarea id="plan-features-en" class="form-control" rows="4" placeholder="${t('pricingManager.form.featuresPlaceholder')}"></textarea>
                        </div>
                    </div>
                    
                    <!-- Slovak -->
                    <div class="lang-content" data-lang="sk" style="display:none">
                        <div class="form-group">
                            <label>${t('pricingManager.form.name')} (SK) *</label>
                            <input type="text" id="plan-name-sk" class="form-control" required>
                        </div>
                        
                        <div class="form-group">
                            <label>${t('pricingManager.form.description')} (SK) *</label>
                            <textarea id="plan-desc-sk" class="form-control" rows="3" required></textarea>
                        </div>
                        
                        <div class="form-group">
                            <label>${t('pricingManager.form.features')} (SK)</label>
                            <textarea id="plan-features-sk" class="form-control" rows="4" placeholder="${t('pricingManager.form.featuresPlaceholder')}"></textarea>
                        </div>
                    </div>
                    
                    <!-- Ukrainian -->
                    <div class="lang-content" data-lang="ua" style="display:none">
                        <div class="form-group">
                            <label>${t('pricingManager.form.name')} (UA) *</label>
                            <input type="text" id="plan-name-ua" class="form-control" required>
                        </div>
                        
                        <div class="form-group">
                            <label>${t('pricingManager.form.description')} (UA) *</label>
                            <textarea id="plan-desc-ua" class="form-control" rows="3" required></textarea>
                        </div>
                        
                        <div class="form-group">
                            <label>${t('pricingManager.form.features')} (UA)</label>
                            <textarea id="plan-features-ua" class="form-control" rows="4" placeholder="${t('pricingManager.form.featuresPlaceholder')}"></textarea>
                        </div>
                    </div>
                    
                    <div class="modal-actions">
                        <button type="button" class="btn-secondary" id="cancel-plan-btn" data-i18n="common.cancel">
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
    
    bindPricingEvents();
    
    // Refresh translations after rendering with a longer delay
    setTimeout(() => {
        if (typeof window.refreshAdminTranslations === 'function') {
            console.log('🔄 Refreshing translations for Pricing section...');
            window.refreshAdminTranslations();
        } else {
            console.warn('⚠️ refreshAdminTranslations not available');
        }
    }, 500);
}

// ===== RENDER PLANS LIST =====
function renderPlansList(plans) {
    const t = (key) => typeof adminI18n !== 'undefined' ? adminI18n.t(key) : key;
    
    return plans.map((plan, index) => {
        const hasPromo = plan.originalPrice && plan.originalPrice > plan.price;
        const discount = hasPromo ? Math.round((1 - plan.price / plan.originalPrice) * 100) : 0;
        
        return `
            <div class="plan-card ${plan.popular ? 'plan-popular' : ''}" data-index="${index}">
                ${plan.popular ? `<div class="popular-badge">⭐ ${t('pricingManager.popular')}</div>` : ''}
                
                <div class="plan-header">
                    <h4>${plan.name}</h4>
                    <div class="plan-price">
                        ${hasPromo ? `
                            <span class="original-price">€${plan.originalPrice}</span>
                            <span class="promo-badge">-${discount}%</span>
                        ` : ''}
                        <span class="current-price">€${plan.price}</span>
                        ${plan.duration ? `<span class="price-duration">/ ${plan.duration}</span>` : ''}
                    </div>
                </div>
                
                <div class="plan-info">
                    <p class="plan-description">${plan.description}</p>
                    ${plan.features && plan.features.length > 0 ? `
                        <ul class="plan-features">
                            ${plan.features.slice(0, 3).map(f => `<li>✓ ${f}</li>`).join('')}
                            ${plan.features.length > 3 ? `<li>... +${plan.features.length - 3} ${t('pricingManager.moreFeatures')}</li>` : ''}
                        </ul>
                    ` : ''}
                </div>
                
                <div class="plan-actions">
                    <button class="btn-icon btn-move-up" data-index="${index}" ${index === 0 ? 'disabled' : ''} title="${t('common.moveUp')}">
                        ↑
                    </button>
                    <button class="btn-icon btn-move-down" data-index="${index}" ${index === plans.length - 1 ? 'disabled' : ''} title="${t('common.moveDown')}">
                        ↓
                    </button>
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
function bindPricingEvents() {
    const addBtn = document.getElementById('add-plan-btn');
    const modal = document.getElementById('plan-modal');
    const closeBtn = modal?.querySelector('.modal-close');
    const cancelBtn = document.getElementById('cancel-plan-btn');
    const form = document.getElementById('plan-form');
    const langTabs = document.querySelectorAll('.lang-tab');
    
    // Add plan
    if (addBtn) {
        addBtn.addEventListener('click', () => openPlanModal());
    }
    
    // Close modal
    if (closeBtn) {
        closeBtn.addEventListener('click', () => closePlanModal());
    }
    if (cancelBtn) {
        cancelBtn.addEventListener('click', () => closePlanModal());
    }
    
    // Language tabs
    langTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const lang = tab.dataset.lang;
            switchPlanLanguage(lang);
            langTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
        });
    });
    
    // Form submit
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            savePlan();
        });
    }
    
    // Edit, Delete, Move buttons
    document.querySelectorAll('.btn-edit').forEach(btn => {
        btn.addEventListener('click', () => {
            const index = parseInt(btn.dataset.index);
            openPlanModal(index);
        });
    });
    
    document.querySelectorAll('.btn-delete').forEach(btn => {
        btn.addEventListener('click', () => {
            const index = parseInt(btn.dataset.index);
            deletePlan(index);
        });
    });
    
    document.querySelectorAll('.btn-move-up').forEach(btn => {
        btn.addEventListener('click', () => {
            const index = parseInt(btn.dataset.index);
            movePlan(index, -1);
        });
    });
    
    document.querySelectorAll('.btn-move-down').forEach(btn => {
        btn.addEventListener('click', () => {
            const index = parseInt(btn.dataset.index);
            movePlan(index, 1);
        });
    });
}

// ===== OPEN MODAL =====
function openPlanModal(index = -1) {
    const modal = document.getElementById('plan-modal');
    const form = document.getElementById('plan-form');
    const t = (key) => typeof adminI18n !== 'undefined' ? adminI18n.t(key) : key;
    
    // Reset form
    form.reset();
    document.getElementById('plan-index').value = index;
    
    if (index >= 0) {
        // Edit mode
        const plan = pricingData.fr.items[index];
        document.getElementById('modal-title').textContent = t('pricingManager.editPlan');
        document.getElementById('plan-price').value = plan.price;
        document.getElementById('plan-original-price').value = plan.originalPrice || '';
        document.getElementById('plan-duration').value = plan.duration || '';
        document.getElementById('plan-popular').checked = plan.popular || false;
        
        // Load content for all languages
        ['fr', 'en', 'sk', 'ua'].forEach(lang => {
            const planLang = pricingData[lang].items[index];
            document.getElementById(`plan-name-${lang}`).value = planLang.name;
            document.getElementById(`plan-desc-${lang}`).value = planLang.description;
            document.getElementById(`plan-features-${lang}`).value = planLang.features ? planLang.features.join('\n') : '';
        });
    } else {
        // Add mode
        document.getElementById('modal-title').textContent = t('pricingManager.addPlan');
    }
    
    modal.classList.add('active');
}

// ===== CLOSE MODAL =====
function closePlanModal() {
    const modal = document.getElementById('plan-modal');
    modal.classList.remove('active');
}

// ===== SWITCH LANGUAGE =====
function switchPlanLanguage(lang) {
    document.querySelectorAll('.lang-content').forEach(content => {
        content.style.display = content.dataset.lang === lang ? 'block' : 'none';
    });
}

// ===== SAVE PLAN =====
async function savePlan() {
    const index = parseInt(document.getElementById('plan-index').value);
    const t = (key) => typeof adminI18n !== 'undefined' ? adminI18n.t(key) : key;
    
    const priceInput = document.getElementById('plan-price');
    const originalPriceInput = document.getElementById('plan-original-price');
    const durationInput = document.getElementById('plan-duration');
    const popularInput = document.getElementById('plan-popular');
    
    if (!priceInput || !durationInput) {
        alert('Erreur: Formulaire incomplet');
        return;
    }
    
    const commonData = {
        price: parseFloat(priceInput.value),
        originalPrice: originalPriceInput && originalPriceInput.value ? parseFloat(originalPriceInput.value) : null,
        duration: durationInput.value.trim(),
        popular: popularInput ? popularInput.checked : false
    };
    
    // Save for all languages
    ['fr', 'en', 'sk', 'ua'].forEach(lang => {
        const name = document.getElementById(`plan-name-${lang}`).value.trim();
        const description = document.getElementById(`plan-desc-${lang}`).value.trim();
        const featuresText = document.getElementById(`plan-features-${lang}`).value.trim();
        const features = featuresText ? featuresText.split('\n').filter(f => f.trim()) : [];
        
        const plan = {
            ...commonData,
            name,
            description,
            features
        };
        
        // Ensure items array exists
        if (!pricingData[lang].items) {
            pricingData[lang].items = [];
        }
        
        if (index >= 0) {
            // Edit existing
            pricingData[lang].items[index] = plan;
        } else {
            // Add new
            pricingData[lang].items.push(plan);
        }
        
        // Update site content
        siteContent.content[lang].pricing = pricingData[lang];
    });
    
    // Save to server
    await saveSiteContent(siteContent);
    
    // Close modal and refresh
    closePlanModal();
    renderPricingManager();
    
    if (typeof showNotification === 'function') {
        showNotification(t('notifications.contentSaved'), 'success');
    }
}

// ===== DELETE PLAN =====
async function deletePlan(index) {
    const t = (key) => typeof adminI18n !== 'undefined' ? adminI18n.t(key) : key;
    const plan = pricingData.fr.items[index];
    
    if (!confirm(`${t('pricingManager.confirmDelete')} "${plan.name}" ?`)) {
        return;
    }
    
    // Delete from all languages
    ['fr', 'en', 'sk', 'ua'].forEach(lang => {
        pricingData[lang].items.splice(index, 1);
        siteContent.content[lang].pricing = pricingData[lang];
    });
    
    // Save to server
    await saveSiteContent(siteContent);
    
    // Refresh
    renderPricingManager();
    
    if (typeof showNotification === 'function') {
        showNotification(t('notifications.planDeleted'), 'success');
    }
}

// ===== MOVE PLAN =====
async function movePlan(index, direction) {
    const newIndex = index + direction;
    const t = (key) => typeof adminI18n !== 'undefined' ? adminI18n.t(key) : key;
    
    if (newIndex < 0 || newIndex >= pricingData.fr.items.length) {
        return;
    }
    
    // Move in all languages
    ['fr', 'en', 'sk', 'ua'].forEach(lang => {
        const items = pricingData[lang].items;
        [items[index], items[newIndex]] = [items[newIndex], items[index]];
        siteContent.content[lang].pricing = pricingData[lang];
    });
    
    // Save to server
    await saveSiteContent(siteContent);
    
    // Refresh
    renderPricingManager();
    
    if (typeof showNotification === 'function') {
        showNotification(t('notifications.orderUpdated'), 'success');
    }
}

// Made with Bob
