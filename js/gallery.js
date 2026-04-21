// ===== GALLERY & LIGHTBOX =====

class Gallery {
    constructor() {
        this.currentIndex = 0;
        this.images = [];
        this.lightbox = null;
        this.init();
    }

    init() {
        this.createLightbox();
        this.attachEventListeners();
    }

    createLightbox() {
        // Créer la structure du lightbox
        this.lightbox = document.createElement('div');
        this.lightbox.className = 'gallery-lightbox';
        this.lightbox.innerHTML = `
            <div class="lightbox-overlay"></div>
            <div class="lightbox-container">
                <button class="lightbox-close" aria-label="Fermer">✕</button>
                <button class="lightbox-prev" aria-label="Précédent">‹</button>
                <button class="lightbox-next" aria-label="Suivant">›</button>
                <div class="lightbox-content">
                    <img src="" alt="" class="lightbox-image">
                    <div class="lightbox-caption"></div>
                </div>
                <div class="lightbox-counter"></div>
            </div>
        `;

        // Styles inline pour le lightbox
        const style = document.createElement('style');
        style.textContent = `
            .gallery-lightbox {
                display: none;
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                z-index: 10000;
                animation: fadeIn 0.3s ease;
            }

            .gallery-lightbox.active {
                display: block;
            }

            .lightbox-overlay {
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: rgba(0, 0, 0, 0.95);
            }

            .lightbox-container {
                position: relative;
                width: 100%;
                height: 100%;
                display: flex;
                align-items: center;
                justify-content: center;
            }

            .lightbox-content {
                max-width: 90%;
                max-height: 90%;
                display: flex;
                flex-direction: column;
                align-items: center;
            }

            .lightbox-image {
                max-width: 100%;
                max-height: 80vh;
                object-fit: contain;
                border-radius: 8px;
                box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);
                animation: zoomIn 0.3s ease;
            }

            .lightbox-caption {
                color: white;
                margin-top: 1rem;
                text-align: center;
                font-size: 1.125rem;
                max-width: 600px;
            }

            .lightbox-close,
            .lightbox-prev,
            .lightbox-next {
                position: absolute;
                background: rgba(255, 255, 255, 0.1);
                border: 2px solid rgba(255, 255, 255, 0.3);
                color: white;
                font-size: 2rem;
                width: 50px;
                height: 50px;
                border-radius: 50%;
                cursor: pointer;
                transition: all 0.3s ease;
                display: flex;
                align-items: center;
                justify-content: center;
                backdrop-filter: blur(10px);
            }

            .lightbox-close:hover,
            .lightbox-prev:hover,
            .lightbox-next:hover {
                background: rgba(255, 255, 255, 0.2);
                border-color: rgba(255, 255, 255, 0.5);
                transform: scale(1.1);
            }

            .lightbox-close {
                top: 20px;
                right: 20px;
            }

            .lightbox-prev {
                left: 20px;
                top: 50%;
                transform: translateY(-50%);
            }

            .lightbox-next {
                right: 20px;
                top: 50%;
                transform: translateY(-50%);
            }

            .lightbox-counter {
                position: absolute;
                bottom: 20px;
                left: 50%;
                transform: translateX(-50%);
                color: white;
                background: rgba(0, 0, 0, 0.5);
                padding: 0.5rem 1rem;
                border-radius: 20px;
                font-size: 0.875rem;
                backdrop-filter: blur(10px);
            }

            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }

            @keyframes zoomIn {
                from {
                    opacity: 0;
                    transform: scale(0.8);
                }
                to {
                    opacity: 1;
                    transform: scale(1);
                }
            }

            @media (max-width: 768px) {
                .lightbox-prev,
                .lightbox-next {
                    width: 40px;
                    height: 40px;
                    font-size: 1.5rem;
                }

                .lightbox-close {
                    top: 10px;
                    right: 10px;
                    width: 40px;
                    height: 40px;
                }

                .lightbox-prev {
                    left: 10px;
                }

                .lightbox-next {
                    right: 10px;
                }
            }
        `;

        document.head.appendChild(style);
        document.body.appendChild(this.lightbox);
    }

    attachEventListeners() {
        // Événements sur les photos
        document.querySelectorAll('.photo-card').forEach((card, index) => {
            card.addEventListener('click', () => {
                this.openLightbox(index);
            });
        });

        // Événements du lightbox
        const closeBtn = this.lightbox.querySelector('.lightbox-close');
        const prevBtn = this.lightbox.querySelector('.lightbox-prev');
        const nextBtn = this.lightbox.querySelector('.lightbox-next');
        const overlay = this.lightbox.querySelector('.lightbox-overlay');

        closeBtn.addEventListener('click', () => this.closeLightbox());
        prevBtn.addEventListener('click', () => this.showPrevious());
        nextBtn.addEventListener('click', () => this.showNext());
        overlay.addEventListener('click', () => this.closeLightbox());

        // Clavier
        document.addEventListener('keydown', (e) => {
            if (!this.lightbox.classList.contains('active')) return;

            switch(e.key) {
                case 'Escape':
                    this.closeLightbox();
                    break;
                case 'ArrowLeft':
                    this.showPrevious();
                    break;
                case 'ArrowRight':
                    this.showNext();
                    break;
            }
        });

        // Swipe sur mobile
        let touchStartX = 0;
        let touchEndX = 0;

        this.lightbox.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        });

        this.lightbox.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            this.handleSwipe();
        });

        this.handleSwipe = () => {
            if (touchEndX < touchStartX - 50) {
                this.showNext();
            }
            if (touchEndX > touchStartX + 50) {
                this.showPrevious();
            }
        };
    }

    openLightbox(index) {
        // Collecter toutes les images
        this.images = Array.from(document.querySelectorAll('.photo-card')).map(card => ({
            src: card.dataset.src || 'https://via.placeholder.com/800x600?text=Photo',
            caption: card.dataset.caption || 'Photo de coaching'
        }));

        this.currentIndex = index;
        this.showImage();
        this.lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    closeLightbox() {
        this.lightbox.classList.remove('active');
        document.body.style.overflow = 'auto';
    }

    showImage() {
        const image = this.lightbox.querySelector('.lightbox-image');
        const caption = this.lightbox.querySelector('.lightbox-caption');
        const counter = this.lightbox.querySelector('.lightbox-counter');

        const currentImage = this.images[this.currentIndex];

        // Animation de transition
        image.style.opacity = '0';
        setTimeout(() => {
            image.src = currentImage.src;
            image.alt = currentImage.caption;
            caption.textContent = currentImage.caption;
            counter.textContent = `${this.currentIndex + 1} / ${this.images.length}`;
            image.style.opacity = '1';
        }, 150);
    }

    showPrevious() {
        this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
        this.showImage();
    }

    showNext() {
        this.currentIndex = (this.currentIndex + 1) % this.images.length;
        this.showImage();
    }
}

// ===== VIDEO PLAYER =====

class VideoPlayer {
    constructor() {
        this.init();
    }

    init() {
        this.attachEventListeners();
    }

    attachEventListeners() {
        document.querySelectorAll('.video-card').forEach(card => {
            card.addEventListener('click', () => {
                const videoUrl = card.dataset.videoUrl;
                const videoType = card.dataset.videoType; // 'youtube' or 'instagram'

                if (videoUrl) {
                    this.openVideo(videoUrl, videoType);
                } else {
                    this.showPlaceholder();
                }
            });
        });
    }

    openVideo(url, type) {
        const modal = document.createElement('div');
        modal.className = 'video-modal';
        
        let embedCode = '';
        
        if (type === 'youtube') {
            // Extraire l'ID YouTube
            const videoId = this.extractYouTubeId(url);
            embedCode = `
                <iframe 
                    width="100%" 
                    height="100%" 
                    src="https://www.youtube.com/embed/${videoId}?autoplay=1" 
                    frameborder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowfullscreen>
                </iframe>
            `;
        } else if (type === 'instagram') {
            embedCode = `
                <iframe 
                    src="${url}/embed" 
                    width="100%" 
                    height="100%" 
                    frameborder="0" 
                    scrolling="no" 
                    allowtransparency="true">
                </iframe>
            `;
        }

        modal.innerHTML = `
            <div class="video-modal-overlay"></div>
            <div class="video-modal-container">
                <button class="video-modal-close">✕</button>
                <div class="video-modal-content">
                    ${embedCode}
                </div>
            </div>
        `;

        // Styles
        const style = document.createElement('style');
        style.textContent = `
            .video-modal {
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                z-index: 10000;
                display: flex;
                align-items: center;
                justify-content: center;
            }

            .video-modal-overlay {
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: rgba(0, 0, 0, 0.95);
            }

            .video-modal-container {
                position: relative;
                width: 90%;
                max-width: 1200px;
                aspect-ratio: 16/9;
            }

            .video-modal-content {
                width: 100%;
                height: 100%;
                border-radius: 8px;
                overflow: hidden;
            }

            .video-modal-close {
                position: absolute;
                top: -50px;
                right: 0;
                background: rgba(255, 255, 255, 0.1);
                border: 2px solid rgba(255, 255, 255, 0.3);
                color: white;
                font-size: 2rem;
                width: 50px;
                height: 50px;
                border-radius: 50%;
                cursor: pointer;
                transition: all 0.3s ease;
            }

            .video-modal-close:hover {
                background: rgba(255, 255, 255, 0.2);
                transform: scale(1.1);
            }

            @media (max-width: 768px) {
                .video-modal-container {
                    width: 95%;
                }

                .video-modal-close {
                    top: -40px;
                    width: 40px;
                    height: 40px;
                    font-size: 1.5rem;
                }
            }
        `;

        document.head.appendChild(style);
        document.body.appendChild(modal);
        document.body.style.overflow = 'hidden';

        // Fermer le modal
        const closeBtn = modal.querySelector('.video-modal-close');
        const overlay = modal.querySelector('.video-modal-overlay');

        const closeModal = () => {
            document.body.removeChild(modal);
            document.body.style.overflow = 'auto';
        };

        closeBtn.addEventListener('click', closeModal);
        overlay.addEventListener('click', closeModal);

        document.addEventListener('keydown', function escHandler(e) {
            if (e.key === 'Escape') {
                closeModal();
                document.removeEventListener('keydown', escHandler);
            }
        });
    }

    extractYouTubeId(url) {
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
        const match = url.match(regExp);
        return (match && match[2].length === 11) ? match[2] : null;
    }

    showPlaceholder() {
        alert('Vidéo de démonstration. Ajoutez l\'URL réelle dans data-video-url');
    }
}

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', () => {
    // Initialiser la galerie et la stocker globalement
    window.galleryInstance = new Gallery();
    console.log('✅ Gallery initialized');

    // Initialiser le lecteur vidéo
    const videoPlayer = new VideoPlayer();
    console.log('✅ Video player initialized');

    // Ajouter des données de test aux cartes
    document.querySelectorAll('.photo-card').forEach((card, index) => {
        card.dataset.src = `https://via.placeholder.com/800x600?text=Photo+${index + 1}`;
        card.dataset.caption = `Photo d'entraînement ${index + 1}`;
        card.style.cursor = 'pointer';
    });

    document.querySelectorAll('.video-card').forEach((card, index) => {
        // Exemples d'URLs (à remplacer par les vraies)
        if (index % 2 === 0) {
            card.dataset.videoUrl = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';
            card.dataset.videoType = 'youtube';
        } else {
            card.dataset.videoUrl = 'https://www.instagram.com/p/EXAMPLE';
            card.dataset.videoType = 'instagram';
        }
        card.style.cursor = 'pointer';
    });
});

// Export pour utilisation externe
window.Gallery = Gallery;
window.VideoPlayer = VideoPlayer;

// Made with Bob
