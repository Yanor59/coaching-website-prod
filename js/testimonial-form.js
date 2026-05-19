// Public testimonial submission form
// Allows visitors to submit testimonials for admin moderation

(function() {
    'use strict';

    // Configuration
    const SUBMIT_URL = '/.netlify/functions/submit-testimonial';
    
    // Initialize form
    function initTestimonialForm() {
        const form = document.getElementById('testimonialForm');
        const modal = document.getElementById('testimonialModal');
        const openBtn = document.getElementById('openTestimonialForm');
        const closeBtn = document.querySelector('.close-testimonial-modal');
        
        if (!form || !modal || !openBtn) {
            console.log('ℹ️ Testimonial form elements not found (normal if not on testimonials page)');
            return;
        }

        // Open modal
        openBtn.addEventListener('click', (e) => {
            e.preventDefault();
            modal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        });

        // Close modal
        const closeModal = () => {
            modal.style.display = 'none';
            document.body.style.overflow = '';
            form.reset();
            clearMessages();
        };

        if (closeBtn) {
            closeBtn.addEventListener('click', closeModal);
        }

        // Close on outside click
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });

        // Close on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.style.display === 'flex') {
                closeModal();
            }
        });

        // Handle form submission
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            await handleSubmit(form);
        });

        // Star rating interaction
        initStarRating();

        console.log('✅ Testimonial form initialized');
    }

    // Initialize star rating
    function initStarRating() {
        const stars = document.querySelectorAll('.star-rating .star');
        const ratingInput = document.getElementById('testimonialRating');

        if (!stars.length || !ratingInput) return;

        stars.forEach((star, index) => {
            star.addEventListener('click', () => {
                const rating = index + 1;
                ratingInput.value = rating;
                updateStars(rating);
            });

            star.addEventListener('mouseenter', () => {
                updateStars(index + 1, true);
            });
        });

        const container = document.querySelector('.star-rating');
        if (container) {
            container.addEventListener('mouseleave', () => {
                updateStars(parseInt(ratingInput.value) || 0);
            });
        }
    }

    // Update star display
    function updateStars(rating, isHover = false) {
        const stars = document.querySelectorAll('.star-rating .star');
        stars.forEach((star, index) => {
            if (index < rating) {
                star.classList.add(isHover ? 'hover' : 'active');
                if (!isHover) star.classList.remove('hover');
            } else {
                star.classList.remove('active', 'hover');
            }
        });
    }

    // Handle form submission
    async function handleSubmit(form) {
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;

        try {
            // Disable submit button
            submitBtn.disabled = true;
            submitBtn.textContent = getTranslation('submitting');

            // Clear previous messages
            clearMessages();

            // Get form data
            const formData = new FormData(form);
            const data = {
                name: formData.get('name'),
                text: formData.get('text'),
                rating: parseInt(formData.get('rating')) || 5,
                duration: formData.get('duration') || '',
                language: localStorage.getItem('preferredLanguage') || 'fr'
            };

            // Validate
            if (!data.name || !data.text) {
                showError(getTranslation('fillRequired'));
                return;
            }

            if (data.text.length < 10) {
                showError(getTranslation('textTooShort'));
                return;
            }

            // Submit to API
            const response = await fetch(SUBMIT_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.error || 'Submission failed');
            }

            // Success
            showSuccess(getTranslation('thankYou'));
            
            // Reset form after delay
            setTimeout(() => {
                form.reset();
                updateStars(5); // Reset to 5 stars
                const modal = document.getElementById('testimonialModal');
                if (modal) {
                    modal.style.display = 'none';
                    document.body.style.overflow = '';
                }
            }, 3000);

        } catch (error) {
            console.error('❌ Error submitting testimonial:', error);
            showError(getTranslation('error'));
        } finally {
            // Re-enable submit button
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;
        }
    }

    // Show error message
    function showError(message) {
        const form = document.getElementById('testimonialForm');
        if (!form) return;

        const errorDiv = document.createElement('div');
        errorDiv.className = 'form-message error-message';
        errorDiv.textContent = message;
        form.insertBefore(errorDiv, form.firstChild);

        setTimeout(() => errorDiv.remove(), 5000);
    }

    // Show success message
    function showSuccess(message) {
        const form = document.getElementById('testimonialForm');
        if (!form) return;

        const successDiv = document.createElement('div');
        successDiv.className = 'form-message success-message';
        successDiv.textContent = message;
        form.insertBefore(successDiv, form.firstChild);
    }

    // Clear messages
    function clearMessages() {
        document.querySelectorAll('.form-message').forEach(msg => msg.remove());
    }

    // Get translation
    function getTranslation(key) {
        const lang = localStorage.getItem('preferredLanguage') || 'fr';
        const translations = {
            fr: {
                submitting: 'Envoi en cours...',
                fillRequired: 'Veuillez remplir tous les champs requis',
                textTooShort: 'Votre témoignage doit contenir au moins 10 caractères',
                thankYou: '✅ Merci ! Votre témoignage sera publié après modération.',
                error: '❌ Une erreur est survenue. Veuillez réessayer.'
            },
            en: {
                submitting: 'Submitting...',
                fillRequired: 'Please fill in all required fields',
                textTooShort: 'Your testimonial must be at least 10 characters long',
                thankYou: '✅ Thank you! Your testimonial will be published after review.',
                error: '❌ An error occurred. Please try again.'
            },
            sk: {
                submitting: 'Odosielanie...',
                fillRequired: 'Vyplňte všetky povinné polia',
                textTooShort: 'Vaša referencia musí mať aspoň 10 znakov',
                thankYou: '✅ Ďakujeme! Vaša referencia bude zverejnená po kontrole.',
                error: '❌ Vyskytla sa chyba. Skúste to znova.'
            },
            ua: {
                submitting: 'Надсилання...',
                fillRequired: 'Будь ласка, заповніть всі обов\'язкові поля',
                textTooShort: 'Ваш відгук повинен містити принаймні 10 символів',
                thankYou: '✅ Дякуємо! Ваш відгук буде опубліковано після перевірки.',
                error: '❌ Сталася помилка. Будь ласка, спробуйте ще раз.'
            }
        };

        return translations[lang]?.[key] || translations.fr[key];
    }

    // Initialize on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initTestimonialForm);
    } else {
        initTestimonialForm();
    }

    console.log('✅ Testimonial form module loaded');
})();

// Made with Bob