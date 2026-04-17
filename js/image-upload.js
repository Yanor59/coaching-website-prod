// ===== IMAGE UPLOAD FUNCTIONALITY =====
// Handles image upload for the content editor

// Upload image file to server
async function uploadImageFile(file, fieldPath) {
    const t = (key) => typeof adminI18n !== 'undefined' ? adminI18n.t(key) : key;
    
    try {
        // Validate file
        if (!file.type.startsWith('image/')) {
            alert(t('notifications.invalidImage'));
            return;
        }
        
        if (file.size > 5 * 1024 * 1024) {
            alert(t('notifications.imageTooLarge'));
            return;
        }
        
        // Convert file to base64
        const reader = new FileReader();
        reader.onload = async (e) => {
            const t = (key) => typeof adminI18n !== 'undefined' ? adminI18n.t(key) : key;
            
            try {
                // Show loading
                if (typeof showNotification === 'function') {
                    showNotification(t('notifications.uploadInProgress'), 'info');
                }
                
                // Upload to server
                const response = await fetch('/api/upload', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        dataUrl: e.target.result,
                        mimeType: file.type,
                        fileName: file.name
                    })
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
                    showNotification(t('notifications.uploadSuccess'), 'success');
                }
                
                // Refresh the editor to show preview
                setTimeout(() => {
                    if (typeof renderEditorFields === 'function' && typeof currentSection !== 'undefined' && typeof currentLang !== 'undefined') {
                        renderEditorFields(currentSection, currentLang);
                    }
                }, 500);
                
            } catch (error) {
                console.error('Upload error:', error);
                if (typeof showNotification === 'function') {
                    showNotification(t('notifications.uploadError'), 'error');
                } else {
                    alert(t('notifications.uploadError'));
                }
            }
        };
        
        reader.onerror = () => {
            const t = (key) => typeof adminI18n !== 'undefined' ? adminI18n.t(key) : key;
            alert(t('notifications.uploadError'));
        };
        
        reader.readAsDataURL(file);
        
    } catch (error) {
        console.error('Upload error:', error);
        const t = (key) => typeof adminI18n !== 'undefined' ? adminI18n.t(key) : key;
        if (typeof showNotification === 'function') {
            showNotification(t('notifications.uploadError'), 'error');
        } else {
            alert(t('notifications.uploadError'));
        }
    }
}

// Initialize image upload handlers
function initImageUploadHandlers() {
    // Handle image upload button clicks
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
    
    console.log('✅ Image upload handlers initialized');
}

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initImageUploadHandlers);
} else {
    initImageUploadHandlers();
}

console.log('✅ Image Upload module loaded');

// Made with Bob
