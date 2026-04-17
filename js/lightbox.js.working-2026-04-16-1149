// ===== LIGHTBOX FOR GALLERY =====
// Simple lightbox to view photos in fullscreen

let currentPhotoIndex = 0;
let galleryPhotos = [];

// Initialize lightbox
function initLightbox() {
    // Create lightbox HTML
    const lightboxHTML = `
        <div id="lightbox" class="lightbox">
            <button class="lightbox-close" onclick="closeLightbox()">&times;</button>
            <button class="lightbox-nav lightbox-prev" onclick="navigateLightbox(-1)">‹</button>
            <button class="lightbox-nav lightbox-next" onclick="navigateLightbox(1)">›</button>
            <div class="lightbox-content">
                <img id="lightbox-image" class="lightbox-image" src="" alt="">
                <div id="lightbox-caption" class="lightbox-caption"></div>
            </div>
        </div>
    `;
    
    // Add to body if not exists
    if (!document.getElementById('lightbox')) {
        document.body.insertAdjacentHTML('beforeend', lightboxHTML);
    }
    
    // Get all gallery photos
    const photoCards = document.querySelectorAll('.photo-card');
    galleryPhotos = Array.from(photoCards).map(card => {
        const img = card.querySelector('.gallery-photo');
        const caption = card.querySelector('.photo-caption');
        return {
            src: img ? img.src : '',
            alt: img ? img.alt : '',
            caption: caption ? caption.textContent : ''
        };
    });
    
    // Add click handlers to photos
    photoCards.forEach((card, index) => {
        card.addEventListener('click', () => openLightbox(index));
    });
    
    // Close on background click
    const lightbox = document.getElementById('lightbox');
    if (lightbox) {
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });
    }
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        const lightbox = document.getElementById('lightbox');
        if (lightbox && lightbox.classList.contains('active')) {
            if (e.key === 'Escape') closeLightbox();
            if (e.key === 'ArrowLeft') navigateLightbox(-1);
            if (e.key === 'ArrowRight') navigateLightbox(1);
        }
    });
}

// Open lightbox with specific photo
function openLightbox(index) {
    currentPhotoIndex = index;
    const lightbox = document.getElementById('lightbox');
    const image = document.getElementById('lightbox-image');
    const caption = document.getElementById('lightbox-caption');
    
    if (lightbox && image && galleryPhotos[index]) {
        const photo = galleryPhotos[index];
        image.src = photo.src;
        image.alt = photo.alt;
        caption.textContent = photo.caption;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent scrolling
    }
}

// Close lightbox
function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    if (lightbox) {
        lightbox.classList.remove('active');
        document.body.style.overflow = ''; // Restore scrolling
    }
}

// Navigate between photos
function navigateLightbox(direction) {
    currentPhotoIndex += direction;
    
    // Loop around
    if (currentPhotoIndex < 0) {
        currentPhotoIndex = galleryPhotos.length - 1;
    } else if (currentPhotoIndex >= galleryPhotos.length) {
        currentPhotoIndex = 0;
    }
    
    openLightbox(currentPhotoIndex);
}

// Initialize after content is loaded
function setupLightbox() {
    // Wait a bit for content-loader to finish
    setTimeout(() => {
        const photoCards = document.querySelectorAll('.photo-card');
        if (photoCards.length > 0) {
            initLightbox();
            console.log('✅ Lightbox initialized with', photoCards.length, 'photos');
        } else {
            console.log('⏳ No photos found, lightbox not initialized');
        }
    }, 500);
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupLightbox);
} else {
    setupLightbox();
}

// Also listen for custom event from content-loader
document.addEventListener('contentLoaded', () => {
    console.log('🔄 Content loaded, reinitializing lightbox');
    setupLightbox();
});

console.log('✅ Lightbox module loaded');

// Made with Bob
