// ===== CONTENT EDITOR FOR ADMIN =====
// Handles loading, editing, and saving site content

// ===== GLOBAL STATE =====
let siteContent = null;
let currentSection = 'hero';
let currentLang = 'fr';

// ===== LOAD CONTENT FROM API =====
async function loadSiteContent() {
    try {
        const response = await fetch('/api/content');
        if (!response.ok) throw new Error('Failed to load content');
        siteContent = await response.json();
        console.log('✅ Content loaded:', siteContent);
        return siteContent;
    } catch (error) {
        console.error('❌ Error loading content:', error);
        const t = (key) => typeof adminI18n !== 'undefined' ? adminI18n.t(key) : key;
        if (typeof showNotification === 'function') {
            showNotification(t('notifications.errorLoading'), 'error');
        }
        return null;
    }
}

// ===== SAVE CONTENT TO API =====
async function saveSiteContent(content) {
    try {
        const response = await fetch('/api/content', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(content)
        });
        
        if (!response.ok) throw new Error('Failed to save content');
        
        const result = await response.json();
        console.log('✅ Content saved:', result);
        const t = (key) => typeof adminI18n !== 'undefined' ? adminI18n.t(key) : key;
        if (typeof showNotification === 'function') {
            showNotification(t('notifications.contentSaved'), 'success');
        }
        return result;
    } catch (error) {
        console.error('❌ Error saving content:', error);
        const t = (key) => typeof adminI18n !== 'undefined' ? adminI18n.t(key) : key;
        if (typeof showNotification === 'function') {
            showNotification(t('notifications.errorSaving'), 'error');
        }
        return null;
    }
}

// ===== RENDER CONTENT EDITOR =====
function renderContentEditor() {
    const mainContent = document.querySelector('.admin-content');
    if (!mainContent || !siteContent) {
        console.error('Cannot render editor: missing container or content');
        return;
    }
    
    const t = (key) => typeof adminI18n !== 'undefined' ? adminI18n.t(key) : key;
    
    mainContent.innerHTML = `
        <div class="content-editor-container">
            <div class="editor-header">
                <h2 data-i18n="contentEditor.title">📝 ${t('contentEditor.title')}</h2>
                <p data-i18n="contentEditor.subtitle">${t('contentEditor.subtitle')}</p>
            </div>
            
            <div class="editor-controls">
                <label for="section-select" data-i18n="contentEditor.sectionLabel">${t('contentEditor.sectionLabel')}</label>
                <select id="section-select" class="form-select">
                    <option value="hero" data-i18n="contentEditor.sections.hero">${t('contentEditor.sections.hero')}</option>
                    <option value="about" data-i18n="contentEditor.sections.about">${t('contentEditor.sections.about')}</option>
                    <option value="services" data-i18n="contentEditor.sections.services">${t('contentEditor.sections.services')}</option>
                    <option value="events" data-i18n="contentEditor.sections.events">${t('contentEditor.sections.events')}</option>
                    <option value="gallery" data-i18n="contentEditor.sections.gallery">${t('contentEditor.sections.gallery')}</option>
                    <option value="partners" data-i18n="contentEditor.sections.partners">${t('contentEditor.sections.partners')}</option>
                    <option value="testimonials" data-i18n="contentEditor.sections.testimonials">${t('contentEditor.sections.testimonials')}</option>
                    <!-- Pricing section removed - prices now managed in Services section -->
                    <option value="contact" data-i18n="contentEditor.sections.contact">${t('contentEditor.sections.contact')}</option>
                    <option value="footer" data-i18n="contentEditor.sections.footer">${t('contentEditor.sections.footer')}</option>
                </select>
            </div>
            
            <div class="language-tabs">
                <button class="lang-tab active" data-lang="fr" data-i18n="contentEditor.languages.fr">${t('contentEditor.languages.fr')}</button>
                <button class="lang-tab" data-lang="en" data-i18n="contentEditor.languages.en">${t('contentEditor.languages.en')}</button>
                <button class="lang-tab" data-lang="sk" data-i18n="contentEditor.languages.sk">${t('contentEditor.languages.sk')}</button>
                <button class="lang-tab" data-lang="ua" data-i18n="contentEditor.languages.ua">${t('contentEditor.languages.ua')}</button>
            </div>
            
            <div id="editor-fields" class="editor-fields">
                <!-- Fields will be populated here -->
            </div>
            
            <div class="editor-actions">
                <button id="auto-translate-btn" class="btn-translate" data-i18n="contentEditor.autoTranslateButton">🌍 ${t('contentEditor.autoTranslateButton')}</button>
                <button id="save-content-btn" class="btn-primary" data-i18n="contentEditor.saveButton">💾 ${t('contentEditor.saveButton')}</button>
                <button id="preview-btn" class="btn-secondary" data-i18n="contentEditor.previewButton">👁️ ${t('contentEditor.previewButton')}</button>
            </div>
        </div>
    `;
    
    // Add styles
    addEditorStyles();
    
    // Bind events
    bindEditorEvents();
    
    // Initial render
    renderEditorFields(currentSection, currentLang);
    
    // Refresh translations after rendering with a delay to ensure DOM is updated
    setTimeout(() => {
        if (typeof window.refreshAdminTranslations === 'function') {
            window.refreshAdminTranslations();
        }
    }, 200);
}

// ===== ADD EDITOR STYLES =====
function addEditorStyles() {
    if (document.getElementById('editor-styles')) return;
    
    const style = document.createElement('style');
    style.id = 'editor-styles';
    style.textContent = `
        .content-editor-container {
            max-width: 1200px;
            margin: 0 auto;
        }
        
        .editor-header {
            margin-bottom: 2rem;
        }
        
        .editor-header h2 {
            font-size: 1.8rem;
            margin-bottom: 0.5rem;
        }
        
        .editor-controls {
            margin-bottom: 2rem;
        }
        
        .editor-controls label {
            display: block;
            margin-bottom: 0.5rem;
            font-weight: 600;
        }
        
        .form-select {
            width: 100%;
            max-width: 400px;
            padding: 0.75rem;
            border: 1px solid #ddd;
            border-radius: 8px;
            font-size: 1rem;
        }
        
        .language-tabs {
            display: flex;
            gap: 0.5rem;
            margin-bottom: 2rem;
            border-bottom: 2px solid #eee;
        }
        
        .lang-tab {
            padding: 0.75rem 1.5rem;
            border: none;
            background: transparent;
            cursor: pointer;
            font-size: 1rem;
            border-bottom: 3px solid transparent;
            transition: all 0.3s;
        }
        
        .lang-tab:hover {
            background: #f5f5f5;
        }
        
        .lang-tab.active {
            border-bottom-color: #4CAF50;
            font-weight: 600;
        }
        
        .editor-fields {
            background: white;
            padding: 2rem;
            border-radius: 12px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
            margin-bottom: 2rem;
        }
        
        .fields-grid {
            display: grid;
            gap: 1.5rem;
        }
        
        .form-group {
            display: flex;
            flex-direction: column;
        }
        
        .form-group label {
            font-weight: 600;
            margin-bottom: 0.5rem;
            color: #333;
        }
        
        .form-control {
            padding: 0.75rem;
            border: 1px solid #ddd;
            border-radius: 8px;
            font-size: 1rem;
            font-family: inherit;
            transition: border-color 0.3s;
        }
        
        .form-control:focus {
            outline: none;
            border-color: #4CAF50;
        }
        
        textarea.form-control {
            resize: vertical;
            min-height: 100px;
        }
        
        .editor-actions {
            display: flex;
        
        .image-field {
            border: 2px dashed #e0e0e0;
            padding: 1.5rem;
            border-radius: 8px;
            background: #fafafa;
        }
        
        .image-input-group {
            display: flex;
            gap: 0.5rem;
            margin-bottom: 1rem;
        }
        
        .image-input-group .form-control {
            flex: 1;
        }
        
        .btn-upload-image {
            padding: 0.75rem 1.5rem;
            background: #2196F3;
            color: white;
            border: none;
            border-radius: 8px;
            cursor: pointer;
            font-weight: 600;
            white-space: nowrap;
            transition: background 0.3s;
        }
        
        .btn-upload-image:hover {
            background: #0b7dda;
        }
        
        .image-preview {
            margin-top: 1rem;
            text-align: center;
        }
        
        .image-preview img {
            max-width: 300px;
            max-height: 200px;
            border-radius: 8px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }
            gap: 1rem;
            justify-content: flex-start;
        }
        
        .btn-primary, .btn-secondary {
            padding: 0.75rem 2rem;
            border: none;
            border-radius: 8px;
            font-size: 1rem;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s;
        }
        
        .btn-primary {
            background: #4CAF50;
            color: white;
        }
        
        .btn-primary:hover {
            background: #45a049;
        }
        
        .btn-primary:disabled {
            background: #ccc;
            cursor: not-allowed;
        }
        
        .btn-secondary {
            background: #2196F3;
            color: white;
        }
        
        .btn-secondary:hover {
            background: #0b7dda;
        }
        
        .btn-translate {
            padding: 0.75rem 2rem;
            border: none;
            border-radius: 8px;
            font-size: 1rem;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            position: relative;
            overflow: hidden;
        }
        
        .btn-translate:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
        }
        
        .btn-translate:disabled {
            background: #ccc;
            cursor: not-allowed;
            transform: none;
        }
        
        .btn-translate.translating {
            background: #999;
            cursor: wait;
        }
        
        .btn-translate.translating::after {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
            animation: shimmer 1.5s infinite;
        }
        
        @keyframes shimmer {
            100% { left: 100%; }
        }
        
        .array-field {
            border: 1px solid #eee;
            padding: 1rem;
            border-radius: 8px;
            background: #f9f9f9;
        }
        
        .array-items {
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
            margin-top: 0.5rem;
        }
        
        .array-item {
            display: flex;
            gap: 0.5rem;
            align-items: center;
        }
        
        .array-item .form-control {
            flex: 1;
        }
        
        .btn-remove {
            padding: 0.5rem;
            background: #f44336;
            color: white;
            border: none;
            border-radius: 4px;
            cursor: pointer;
        }
        
        .section-placeholder {
            text-align: center;
            padding: 4rem 2rem;
        }
        
        .section-placeholder h2 {
            font-size: 2rem;
            margin-bottom: 1rem;
        }
    `;
    
    document.head.appendChild(style);
}

// ===== BIND EDITOR EVENTS =====
function bindEditorEvents() {
    const sectionSelect = document.getElementById('section-select');
    const langTabs = document.querySelectorAll('.lang-tab');
    const saveBtn = document.getElementById('save-content-btn');
    const previewBtn = document.getElementById('preview-btn');
    const translateBtn = document.getElementById('auto-translate-btn');
    
    if (sectionSelect) {
        sectionSelect.addEventListener('change', () => {
            currentSection = sectionSelect.value;
            renderEditorFields(currentSection, currentLang);
        });
    }
    
    langTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            langTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            currentLang = tab.dataset.lang;
            renderEditorFields(currentSection, currentLang);
        });
    });
    
    if (saveBtn) {
        saveBtn.addEventListener('click', async () => {
            const t = (key) => typeof adminI18n !== 'undefined' ? adminI18n.t(key) : key;
            saveBtn.disabled = true;
            saveBtn.textContent = `⏳ ${t('contentEditor.saving')}`;
            await saveSiteContent(siteContent);
            saveBtn.disabled = false;
            saveBtn.textContent = `💾 ${t('contentEditor.saveButton')}`;
        });
    }
    
    if (previewBtn) {
        previewBtn.addEventListener('click', () => {
            window.open('/index.html', '_blank');
        });
    }
    
    if (translateBtn) {
        translateBtn.addEventListener('click', async () => {
            await handleAutoTranslate();
        });
    }
}

// ===== HANDLE AUTO TRANSLATE =====
async function handleAutoTranslate() {
    const t = (key) => typeof adminI18n !== 'undefined' ? adminI18n.t(key) : key;
    const translateBtn = document.getElementById('auto-translate-btn');
    
    if (!siteContent || !currentSection || !currentLang) {
        if (typeof showNotification === 'function') {
            showNotification(t('contentEditor.autoTranslate.noContent'), 'error');
        }
        return;
    }
    
    // Confirm action
    const confirmMsg = t('contentEditor.autoTranslate.confirmMessage')
        .replace('{section}', currentSection)
        .replace('{lang}', currentLang.toUpperCase());
    
    if (!confirm(confirmMsg)) {
        return;
    }
    
    try {
        // Disable button and show loading state
        translateBtn.disabled = true;
        translateBtn.classList.add('translating');
        translateBtn.textContent = `⏳ ${t('contentEditor.autoTranslate.translating')}`;
        
        // Get source section data
        const sourceSectionData = siteContent.content[currentLang][currentSection];
        
        if (!sourceSectionData) {
            throw new Error('Source section data not found');
        }
        
        // Get target languages (all except current)
        const targetLangs = siteContent.languages.filter(lang => lang !== currentLang);
        
        // Translate to each target language
        for (const targetLang of targetLangs) {
            console.log(`🌍 Translating ${currentSection} from ${currentLang} to ${targetLang}...`);
            
            const translatedData = await autoTranslate.translateObject(
                sourceSectionData,
                currentLang,
                targetLang
            );
            
            // Update site content
            siteContent.content[targetLang][currentSection] = translatedData;
        }
        
        // Save the updated content
        await saveSiteContent(siteContent);
        
        if (typeof showNotification === 'function') {
            showNotification(t('contentEditor.autoTranslate.success'), 'success');
        }
        
    } catch (error) {
        console.error('Auto-translate error:', error);
        if (typeof showNotification === 'function') {
            showNotification(t('contentEditor.autoTranslate.error') + ': ' + error.message, 'error');
        }
    } finally {
        // Re-enable button
        translateBtn.disabled = false;
        translateBtn.classList.remove('translating');
        translateBtn.textContent = `🌍 ${t('contentEditor.autoTranslateButton')}`;
    }
}

// ===== RENDER EDITOR FIELDS =====
function renderEditorFields(section, lang) {
    const fieldsContainer = document.getElementById('editor-fields');
    if (!fieldsContainer || !siteContent) return;
    
    const sectionData = siteContent.content[lang][section];
    const t = (key) => typeof adminI18n !== 'undefined' ? adminI18n.t(key) : key;
    if (!sectionData) {
        fieldsContainer.innerHTML = `<p data-i18n="contentEditor.sectionNotFound">${t('contentEditor.sectionNotFound')}</p>`;
        return;
    }
    
    let html = '<div class="fields-grid">';
    
    // Render fields based on section data
    for (const [key, value] of Object.entries(sectionData)) {
        if (typeof value === 'string') {
            html += renderTextField(section, lang, key, value);
        } else if (typeof value === 'object' && !Array.isArray(value)) {
            // Nested object
            for (const [subKey, subValue] of Object.entries(value)) {
                if (typeof subValue === 'string') {
                    html += renderTextField(section, lang, `${key}.${subKey}`, subValue);
                }
            }
        } else if (Array.isArray(value)) {
            html += renderArrayField(section, lang, key, value);
        }
    }
    
    html += '</div>';
    fieldsContainer.innerHTML = html;
    
    // Bind input events
    bindFieldEvents(section, lang);
}

// ===== RENDER TEXT FIELD =====
function renderTextField(section, lang, key, value) {
    const label = key
        .replace(/([A-Z])/g, ' $1')
        .replace(/^./, str => str.toUpperCase())
        .replace(/\./g, ' - ');
    
    const isLong = value.length > 100;
    const escapedValue = value.replace(/"/g, '"').replace(/</g, '<').replace(/>/g, '>');
    
    // Check if this is an image field
    const isImageField = key.toLowerCase().includes('image') ||
                         key.toLowerCase().includes('src') ||
                         key.toLowerCase().includes('photo') ||
                         (key.toLowerCase().includes('url') && value.includes('images/'));
    
    if (isImageField) {
        const t = (key) => typeof adminI18n !== 'undefined' ? adminI18n.t(key) : key;
        return `
            <div class="form-group image-field">
                <label for="${key}">${label}</label>
                <div class="image-input-group">
                    <input type="text" id="${key}" class="form-control" value="${escapedValue}" data-path="${key}" placeholder="images/votre-photo.jpg">
                    <button type="button" class="btn-upload-image" data-target="${key}" title="${t('contentEditor.browseImage')}" data-i18n="contentEditor.browseImage">
                        ${t('contentEditor.browseImage')}
                    </button>
                </div>
                ${value && value.startsWith('images/') ? `
                    <div class="image-preview">
                        <img src="${value}" alt="Aperçu" onerror="this.style.display='none'">
                    </div>
                ` : ''}
                <input type="file" id="file-${key}" accept="image/*" style="display: none;" data-path="${key}">
            </div>
        `;
    }
    
    return `
        <div class="form-group">
            <label for="${key}">${label}</label>
            ${isLong ?
                `<textarea id="${key}" class="form-control" rows="4" data-path="${key}">${escapedValue}</textarea>` :
                `<input type="text" id="${key}" class="form-control" value="${escapedValue}" data-path="${key}">`
            }
        </div>
    `;
}

// ===== RENDER ARRAY FIELD =====
function renderArrayField(section, lang, key, array) {
    if (array.length === 0) return '';
    
    const label = key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
    
    let html = `<div class="form-group array-field">
        <label>${label}</label>
        <div class="array-items">`;
    
    array.forEach((item, index) => {
        if (typeof item === 'string') {
            const escapedItem = item.replace(/"/g, '"').replace(/</g, '<').replace(/>/g, '>');
            html += `
                <div class="array-item">
                    <input type="text" class="form-control" value="${escapedItem}" data-path="${key}.${index}">
                </div>
            `;
        } else if (typeof item === 'object') {
            html += `<div class="array-item-object" style="border: 1px solid #ddd; padding: 1rem; margin-bottom: 1rem; border-radius: 8px;">
                <h4 style="margin-bottom: 1rem;">Item ${index + 1}</h4>`;
            for (const [subKey, subValue] of Object.entries(item)) {
                if (typeof subValue === 'string') {
                    const escapedValue = subValue.replace(/"/g, '"').replace(/</g, '<').replace(/>/g, '>');
                    html += `
                        <div class="form-group" style="margin-bottom: 1rem;">
                            <label>${subKey}</label>
                            <input type="text" class="form-control" value="${escapedValue}" data-path="${key}.${index}.${subKey}">
                        </div>
                    `;
                } else if (Array.isArray(subValue)) {
                    html += `
                        <div class="form-group" style="margin-bottom: 1rem;">
                            <label>${subKey}</label>
                            <div class="array-items">`;
                    subValue.forEach((arrItem, arrIndex) => {
                        const escapedArrItem = String(arrItem).replace(/"/g, '"').replace(/</g, '<').replace(/>/g, '>');
                        html += `
                            <div class="array-item">
                                <input type="text" class="form-control" value="${escapedArrItem}" data-path="${key}.${index}.${subKey}.${arrIndex}">
                            </div>
                        `;
                    });
                    html += `</div></div>`;
                }
            }
            html += `</div>`;
        }
    });
    
    html += `</div></div>`;
    return html;
}

// ===== BIND FIELD EVENTS =====
function bindFieldEvents(section, lang) {
    const inputs = document.querySelectorAll('.form-control[data-path]');
    
    inputs.forEach(input => {
        input.addEventListener('input', (e) => {
            const path = e.target.dataset.path;
            const value = e.target.value;
            updateContentValue(section, lang, path, value);
        });
    });
}

// ===== UPDATE CONTENT VALUE =====
function updateContentValue(section, lang, path, value) {
    if (!siteContent) return;
    
    const keys = path.split('.');
    let target = siteContent.content[lang][section];
    
    // Navigate to the target
    for (let i = 0; i < keys.length - 1; i++) {
        const key = keys[i];
        if (!isNaN(key)) {
            // Array index
            target = target[parseInt(key)];
        } else {
            if (!target[key]) target[key] = {};
            target = target[key];
        }
    }
    
    // Set the value
    const lastKey = keys[keys.length - 1];
    if (!isNaN(lastKey)) {
        target[parseInt(lastKey)] = value;
    } else {
        target[lastKey] = value;
    }
    
    console.log(`✏️ Updated: ${section}.${lang}.${path} = ${value.substring(0, 50)}...`);
}

// ===== INITIALIZE CONTENT EDITOR =====
async function initContentEditor() {
    console.log('🚀 Initializing content editor...');
    await loadSiteContent();
    
    // Listen for content navigation clicks
    const contentNavItem = document.querySelector('.nav-item[href="#content"]');
    if (contentNavItem) {
        contentNavItem.addEventListener('click', async (e) => {
            e.preventDefault();
            if (!siteContent) {
                await loadSiteContent();
            }
            renderContentEditor();
        });
    }
}

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initContentEditor);
} else {
    initContentEditor();
}

console.log('✅ Content Editor module loaded');

// Made with Bob

// ===== IMAGE UPLOAD FUNCTIONALITY =====

// Handle image upload button clicks
function handleImageUploadButtons() {
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('btn-upload-image')) {
            const targetField = e.target.dataset.target;
            const fileInput = document.getElementById(`file-${targetField}`);
            if (fileInput) {
                fileInput.click();
            }
        }
    });
    
    // Handle file selection
    document.addEventListener('change', async (e) => {
        if (e.target.type === 'file' && e.target.dataset.path) {
            const file = e.target.files[0];
            if (file) {
                await uploadImageFile(file, e.target.dataset.path);
            }
        }
    });
}

// Upload image file to server
async function uploadImageFile(file, fieldPath) {
    try {
        // Validate file
        if (!file.type.startsWith('image/')) {
            alert('❌ Veuillez sélectionner une image (JPG, PNG, WebP)');
            return;
        }
        
        if (file.size > 5 * 1024 * 1024) {
            alert('❌ L\'image est trop grande (max 5 MB)');
            return;
        }
        
        // Create FormData
        const formData = new FormData();
        formData.append('image', file);
        
        // Show loading
        if (typeof showNotification === 'function') {
            showNotification('⏳ Upload en cours...', 'info');
        }
        
        // Upload to server
        const response = await fetch('/api/upload', {
            method: 'POST',
            body: formData
        });
        
        if (!response.ok) throw new Error('Upload failed');
        
        const result = await response.json();
        const imagePath = result.path || `images/${file.name}`;
        
        // Update the field
        const textInput = document.getElementById(fieldPath);
        if (textInput) {
            textInput.value = imagePath;
            // Trigger input event to update content
            textInput.dispatchEvent(new Event('input', { bubbles: true }));
        }
        
        // Show success and refresh to show preview
        if (typeof showNotification === 'function') {
            showNotification('✅ Image uploadée avec succès!', 'success');
        }
        
        // Refresh the editor to show preview
        setTimeout(() => {
            renderEditorFields(currentSection, currentLang);
        }, 500);
        
    } catch (error) {
        console.error('Upload error:', error);
        if (typeof showNotification === 'function') {
            showNotification('❌ Erreur lors de l\'upload', 'error');
        }
    }
}
