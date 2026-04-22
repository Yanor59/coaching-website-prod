// ===== SITE CONTENT LOADER =====

(function () {
    // Load from API (Netlify Blobs) for instant updates
    const CONTENT_URL = '/.netlify/functions/content';
    const FALLBACK_URL = 'data/site-content.json';

    async function loadSiteContent() {
        try {
            // Try to load from API first (Netlify Blobs - instant updates)
            console.log('📖 Loading content from API (Netlify Blobs)...');
            const response = await fetch(CONTENT_URL, {
                cache: 'no-store',
                headers: {
                    'Cache-Control': 'no-cache'
                }
            });

            if (!response.ok) {
                console.warn('⚠️ API not available, falling back to static file');
                // Fallback to static file if API fails
                const fallbackResponse = await fetch(FALLBACK_URL, { cache: 'no-store' });
                if (!fallbackResponse.ok) {
                    throw new Error(`Failed to load content (${fallbackResponse.status})`);
                }
                const payload = await fallbackResponse.json();
                window.siteContent = payload;
                applySiteContent(localStorage.getItem('preferredLanguage') || 'fr');
                console.log('✅ Site content loaded from static file (fallback)');
                return;
            }

            const payload = await response.json();
            window.siteContent = payload;

            // Don't overwrite window.translations - it's managed by translations.js
            // Just store the content separately
            
            const preferredLanguage = localStorage.getItem('preferredLanguage') || 'fr';
            applySiteContent(preferredLanguage);

            document.dispatchEvent(new CustomEvent('siteContentLoaded', {
                detail: {
                    language: preferredLanguage,
                    content: payload
                }
            }));

            console.log('✅ Site content loaded from API (Netlify Blobs - instant updates enabled)');
        } catch (error) {
            console.error('❌ Error loading content:', error);
            // Try fallback one more time
            try {
                const fallbackResponse = await fetch(FALLBACK_URL, { cache: 'no-store' });
                const payload = await fallbackResponse.json();
                window.siteContent = payload;
                applySiteContent(localStorage.getItem('preferredLanguage') || 'fr');
                console.log('✅ Site content loaded from static file (fallback after error)');
            } catch (fallbackError) {
                console.error('❌ Fallback also failed:', fallbackError);
            }
        }
    }

    function applyText(selector, value) {
        const element = document.querySelector(selector);
        if (element && typeof value === 'string') {
            element.textContent = value;
        }
    }

    function applyHTML(selector, value) {
        const element = document.querySelector(selector);
        if (element && typeof value === 'string') {
            element.innerHTML = value;
        }
    }

    function renderAboutImage(section) {
        const aboutImage = document.querySelector('.about-image');
        if (!aboutImage || !section || !section.image) return;

        const existingImage = aboutImage.querySelector('.about-real-image');
        if (existingImage) {
            existingImage.remove();
        }

        const placeholder = aboutImage.querySelector('.image-placeholder');

        if (section.image.src) {
            if (placeholder) {
                placeholder.style.display = 'none';
            }

            const img = document.createElement('img');
            img.className = 'about-real-image';
            img.src = section.image.src;
            img.alt = section.image.alt || 'About image';

            Object.assign(img.style, {
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                borderRadius: '24px',
                display: 'block'
            });

            aboutImage.insertBefore(img, aboutImage.firstChild);
        } else if (placeholder) {
            placeholder.style.display = '';
            const placeholderText = placeholder.querySelector('span');
            if (placeholderText && section.image.placeholder) {
                placeholderText.textContent = section.image.placeholder;
            }
        }
    }

    function renderPartners(section) {
        const partnersSection = document.querySelector('.partners');
        const grid = document.querySelector('.partners-grid');
        
        // Hide section and menu links if no partners
        if (!section || !Array.isArray(section.items) || section.items.length === 0) {
            if (partnersSection) {
                partnersSection.style.display = 'none';
            }
            // Hide menu links
            document.querySelectorAll('a[href="#partners"]').forEach(link => {
                link.parentElement.style.display = 'none';
            });
            return;
        }
        
        // Show section and menu links if partners exist
        if (partnersSection) {
            partnersSection.style.display = '';
        }
        // Show menu links
        document.querySelectorAll('a[href="#partners"]').forEach(link => {
            link.parentElement.style.display = '';
        });
        
        if (!grid) return;

        grid.innerHTML = section.items.map(item => `
            <div class="partner-card">
                <div class="partner-image">
                    ${item.image
                        ? `<img src="${item.image}" alt="${escapeHtml(item.name || 'Partner')}" style="width: 100%; height: 100%; object-fit: cover; border-radius: 20px;">`
                        : `<div class="image-placeholder">👤</div>`}
                </div>
                <h4>${escapeHtml(item.name || '')}</h4>
                <p class="partner-specialty">${escapeHtml(item.specialty || '')}</p>
                <p>${escapeHtml(item.description || '')}</p>
            </div>
        `).join('');
    }

    function renderTestimonials(section) {
        const testimonialsSection = document.querySelector('.testimonials');
        const grid = document.querySelector('.testimonials-grid');
        
        // Filter only approved testimonials
        const approvedItems = section && Array.isArray(section.items)
            ? section.items.filter(item => item.status === 'approved')
            : [];
        
        // Hide section and menu links if no approved testimonials
        if (approvedItems.length === 0) {
            if (testimonialsSection) {
                testimonialsSection.style.display = 'none';
            }
            // Hide menu links
            document.querySelectorAll('a[href="#testimonials"]').forEach(link => {
                link.parentElement.style.display = 'none';
            });
            return;
        }
        
        // Show section and menu links if approved testimonials exist
        if (testimonialsSection) {
            testimonialsSection.style.display = '';
        }
        // Show menu links
        document.querySelectorAll('a[href="#testimonials"]').forEach(link => {
            link.parentElement.style.display = '';
        });
        
        if (!grid) return;

        grid.innerHTML = approvedItems.map(item => `
            <div class="testimonial-card">
                <div class="testimonial-rating">${'⭐'.repeat(Number(item.rating || 5))}</div>
                <p class="testimonial-text">"${escapeHtml(item.text || '')}"</p>
                <div class="testimonial-author">
                    <div class="author-image">
                        ${item.image
                            ? `<img src="${item.image}" alt="${escapeHtml(item.name || 'Client')}" style="width: 100%; height: 100%; object-fit: cover; border-radius: 50%;">`
                            : `<div class="image-placeholder">👤</div>`}
                    </div>
                    <div class="author-info">
                        <h4>${escapeHtml(item.name || '')}</h4>
                        <span>${escapeHtml(item.role || '')}</span>
                    </div>
                </div>
            </div>
        `).join('');
    }

    function renderPricing(section) {
        const pricingSection = document.querySelector('.pricing');
        const grid = document.querySelector('.pricing-grid');
        
        // Hide section and menu links if no pricing plans
        if (!section || !Array.isArray(section.items) || section.items.length === 0) {
            if (pricingSection) {
                pricingSection.style.display = 'none';
            }
            // Hide menu links
            document.querySelectorAll('a[href="#pricing"]').forEach(link => {
                link.parentElement.style.display = 'none';
            });
            return;
        }
        
        // Show section and menu links if pricing plans exist
        if (pricingSection) {
            pricingSection.style.display = '';
        }
        // Show menu links
        document.querySelectorAll('a[href="#pricing"]').forEach(link => {
            link.parentElement.style.display = '';
        });
        
        if (!grid) return;

        grid.innerHTML = section.items.map(plan => `
            <div class="pricing-card${plan.popular ? ' featured' : ''}">
                ${plan.popular ? `<div class="featured-badge">${escapeHtml(section.popular || 'Populaire')}</div>` : ''}
                <h3>${escapeHtml(plan.name || '')}</h3>
                <div class="price">
                    ${plan.originalPrice ? `<span class="original-price">€${plan.originalPrice}</span>` : ''}
                    <span class="price-amount">€${escapeHtml(plan.price || '')}</span>
                    ${plan.duration ? `<span class="price-period">/ ${escapeHtml(plan.duration)}</span>` : ''}
                </div>
                <p class="pricing-description">${escapeHtml(plan.description || '')}</p>
                <ul class="pricing-features">
                    ${(plan.features || []).map(feature => `<li>✓ ${escapeHtml(feature)}</li>`).join('')}
                </ul>
                <a href="#contact" class="btn ${plan.popular ? 'btn-primary' : 'btn-outline'}">${escapeHtml(section.book || 'Réserver')}</a>
            </div>
        `).join('');
    }

    function renderEvents(section, currentLang) {
        const grid = document.querySelector('.events-grid');
        const eventsSection = document.querySelector('.events');
        if (!grid || !eventsSection) return;

        // Get events from current language
        let visibleItems = [];
        const currentLangEventIds = new Set();
        
        if (section && Array.isArray(section.items)) {
            visibleItems = section.items.filter(item => item && item.enabled !== false);
            // Track IDs of events in current language
            visibleItems.forEach(item => {
                if (item.id) currentLangEventIds.add(item.id);
            });
        }

        // SMART FALLBACK WITH ID MATCHING: Show only untranslated events from other languages
        const payload = window.siteContent;
        const fallbackOrder = ['fr', 'en', 'sk', 'ua'].filter(lang => lang !== currentLang);
        const fallbackEvents = [];
        
        for (const lang of fallbackOrder) {
            const langEvents = payload?.content?.[lang]?.events;
            if (langEvents && Array.isArray(langEvents.items)) {
                const items = langEvents.items.filter(item => {
                    // Include only if: enabled AND (no ID OR ID not in current language)
                    return item &&
                           item.enabled !== false &&
                           (!item.id || !currentLangEventIds.has(item.id));
                });
                
                items.forEach(item => {
                    // Add to fallback if we don't already have this ID
                    if (!item.id || !fallbackEvents.some(e => e.id === item.id)) {
                        fallbackEvents.push({ ...item, _fallbackLang: lang });
                    }
                });
            }
        }
        
        // Combine current language events with fallback events
        visibleItems = [...visibleItems, ...fallbackEvents];
        
        if (fallbackEvents.length > 0) {
            console.log(`ℹ️ Showing ${visibleItems.length} event(s): ${visibleItems.length - fallbackEvents.length} in ${currentLang.toUpperCase()}, ${fallbackEvents.length} from fallback`);
        }

        // Hide/show section and menu links based on visible items
        if (visibleItems.length === 0) {
            eventsSection.style.display = 'none';
            // Hide menu links
            document.querySelectorAll('a[href="#events"]').forEach(link => {
                link.parentElement.style.display = 'none';
            });
        } else {
            eventsSection.style.display = '';
            // Show menu links
            document.querySelectorAll('a[href="#events"]').forEach(link => {
                link.parentElement.style.display = '';
            });
        }

        grid.innerHTML = visibleItems.map(item => `
            <div class="event-card">
                <div class="event-date">
                    <span class="event-day">${escapeHtml(item.day || '')}</span>
                    <span class="event-month">${escapeHtml(item.month || '')}</span>
                </div>
                <div class="event-content">
                    <span class="event-category">${escapeHtml(item.category || '')}</span>
                    <h3>${escapeHtml(item.title || '')}</h3>
                    <p class="event-meta">🕐 ${escapeHtml(item.time || '')} · 📍 ${escapeHtml(item.location || '')}</p>
                    <p>${escapeHtml(item.description || '')}</p>
                    <a href="${escapeHtml(item.ctaLink || '#contact')}" class="btn btn-outline">${escapeHtml(item.ctaLabel || section?.cta || 'Réserver')}</a>
                </div>
            </div>
        `).join('');
    }
    
    function renderGallery(section) {
        if (!section) return;
        
        // Render videos
        const videoGrid = document.querySelector('.video-grid');
        if (videoGrid && section.videos && Array.isArray(section.videos)) {
            if (section.videos.length === 0) {
                videoGrid.innerHTML = `
                    <div class="empty-state">
                        <p>🎥 Aucune vidéo pour le moment</p>
                    </div>
                `;
            } else {
                videoGrid.innerHTML = section.videos.map(video => {
                    const videoId = extractYouTubeId(video.url);
                    return `
                        <div class="video-card">
                            ${videoId ? `
                                <iframe 
                                    src="https://www.youtube.com/embed/${videoId}" 
                                    frameborder="0" 
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                                    allowfullscreen
                                    style="width: 100%; height: 100%; border-radius: 12px;">
                                </iframe>
                            ` : `
                                <div class="video-placeholder">
                                    <span>📹 YouTube</span>
                                    <p>${escapeHtml(video.title || 'Vidéo')}</p>
                                </div>
                            `}
                        </div>
                    `;
                }).join('');
            }
        }
        
        // Render photos
        const photoGrid = document.querySelector('.photo-grid');
        if (photoGrid && section.photos && Array.isArray(section.photos)) {
            if (section.photos.length === 0) {
                photoGrid.innerHTML = `
                    <div class="empty-state">
                        <p>📷 Aucune photo pour le moment</p>
                    </div>
                `;
            } else {
                photoGrid.innerHTML = section.photos.map(photo => `
                    <div class="photo-card">
                        <img src="${escapeHtml(photo.url)}" alt="${escapeHtml(photo.caption || 'Photo')}" class="gallery-photo">
                        ${photo.caption ? `<p class="photo-caption">${escapeHtml(photo.caption)}</p>` : ''}
                    </div>
                `).join('');
                
                // Add click event for lightbox (if gallery.js is loaded)
                if (typeof Gallery !== 'undefined') {
                    document.querySelectorAll('.gallery-photo').forEach((img, index) => {
                        img.addEventListener('click', () => {
                            if (window.galleryInstance) {
                                window.galleryInstance.open(index);
                            }
                        });
                    });
                }
            }
        }
    }
    
    function extractYouTubeId(url) {
        if (!url) return null;
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
        const match = url.match(regExp);
        return (match && match[2].length === 11) ? match[2] : null;
    }

    function applySiteContent(lang) {
        const currentLang = lang || 'fr';
        const payload = window.siteContent;
        const content = payload && payload.content ? payload.content[currentLang] : null;

        if (!content) return;

        applyText('.logo h1', (payload.site && payload.site.name) || 'Alina Coaching');
        applyText('.logo .location', (payload.site && payload.site.location) || 'Bratislava');

        // Apply Hero section content
        if (content.hero) {
            applyText('.hero-title', content.hero.title || '');
            applyText('.hero-subtitle', content.hero.subtitle || '');
            applyText('.hero-description', content.hero.description || '');
            applyText('.hero .btn-primary', content.hero.cta || '');
            applyText('.hero .btn-secondary', content.hero.discover || '');
        }

        // Apply About section content
        if (content.about) {
            applyText('.about .section-tag', content.about.tag || '');
            applyText('.about .section-title', content.about.title || '');
            applyText('.about .section-subtitle', content.about.subtitle || '');
            applyText('.badge-number', content.about.experienceValue || '5+');
            applyText('.badge-label', content.about.experience || '');
            applyText('.about-text p:nth-of-type(1)', content.about.bio1 || '');
            applyText('.about-text p:nth-of-type(2)', content.about.bio2 || '');
            applyText('.cert-item:nth-of-type(1)', content.about.cert1 || '');
            applyText('.cert-item:nth-of-type(2)', content.about.cert2 || '');
            applyText('.cert-item:nth-of-type(3)', content.about.cert3 || '');
        }

        renderAboutImage(content.about);
        
        // Apply Services section content
        if (content.services) {
            applyText('.services .section-tag', content.services.tag || '');
            applyText('.services .section-title', content.services.title || '');
            applyText('.services .section-description', content.services.description || '');
            
            // Individual service
            if (content.services.individual) {
                applyText('.service-card:nth-of-type(1) h3', content.services.individual.title || '');
                applyText('.service-card:nth-of-type(1) p', content.services.individual.desc || '');
                applyText('.service-card:nth-of-type(1) .service-price', content.services.individual.price || '');
            }
            
            // Group service
            if (content.services.group) {
                applyText('.service-card:nth-of-type(2) h3', content.services.group.title || '');
                applyText('.service-card:nth-of-type(2) p', content.services.group.desc || '');
                applyText('.service-card:nth-of-type(2) .service-price', content.services.group.price || '');
            }
            
            // Online service
            if (content.services.online) {
                applyText('.service-card:nth-of-type(3) h3', content.services.online.title || '');
                applyText('.service-card:nth-of-type(3) p', content.services.online.desc || '');
                applyText('.service-card:nth-of-type(3) .service-price', content.services.online.price || '');
            }
        }
        
        // Apply Partners section headers
        if (content.partners) {
            applyText('.partners .section-tag', content.partners.tag || '');
            applyText('.partners .section-title', content.partners.title || '');
            applyText('.partners .section-description', content.partners.description || '');
        }
        
        // Apply Testimonials section headers
        if (content.testimonials) {
            applyText('.testimonials .section-tag', content.testimonials.tag || '');
            applyText('.testimonials .section-title', content.testimonials.title || '');
        }
        
        // Apply Pricing section headers
        if (content.pricing) {
            applyText('.pricing .section-tag', content.pricing.tag || '');
            applyText('.pricing .section-title', content.pricing.title || '');
            applyText('.pricing .section-description', content.pricing.description || '');
        }
        
        // Apply Contact section
        if (content.contact) {
            applyText('.contact .section-tag', content.contact.tag || '');
            applyText('.contact .section-title', content.contact.title || '');
            applyText('.contact .section-description', content.contact.description || '');
            applyText('.contact-info .info-card:nth-child(1) h3', content.contact.locationLabel || '');
            applyText('.contact-info .info-card:nth-child(1) p', content.contact.locationValue || '');
            applyText('.contact-info .info-card:nth-child(2) h3', content.contact.emailLabel || '');
            applyText('.contact-info .info-card:nth-child(2) p', content.contact.emailValue || '');
            applyText('.contact-info .info-card:nth-child(3) h3', content.contact.phoneLabel || '');
            applyText('.contact-info .info-card:nth-child(3) p', content.contact.phoneValue || '');
            applyText('.contact-info .info-card:nth-child(4) h3', content.contact.scheduleLabel || '');
            applyHTML('.contact-info .info-card:nth-child(4) p', content.contact.schedule || '');
        }
        
        // Apply Footer section
        if (content.footer) {
            applyText('.footer .footer-about h3', content.footer.aboutTitle || '');
            applyText('.footer .footer-about p', content.footer.aboutText || '');
            applyText('.footer .footer-links h4', content.footer.linksTitle || '');
            applyText('.footer .footer-contact h4', content.footer.contactTitle || '');
            applyText('.footer .footer-bottom p', content.footer.copyright || '');
        }
        
        // Render dynamic content (items that can be added/removed)
        renderPartners(content.partners);
        renderTestimonials(content.testimonials);
        renderPricing(content.pricing);
        renderEvents(content.events, currentLang);
        renderGallery(content.gallery);

        // Call changeLanguage to update data-i18n elements (nav, form labels, etc.)
        // but only for static UI elements that are not managed by Netlify Blobs
        if (typeof window.changeLanguage === 'function') {
            window.changeLanguage(currentLang);
        }
    }

    function escapeHtml(value) {
        return String(value == null ? '' : value);
    }

    window.applySiteContent = applySiteContent;
    window.loadSiteContent = loadSiteContent;
    window.renderEventsForLanguage = function (lang) {
        const payload = window.siteContent;
        const currentLang = lang || localStorage.getItem('preferredLanguage') || 'fr';
        const content = payload && payload.content ? payload.content[currentLang] : null;

        if (!content) return;

        renderEvents(content.events, currentLang);
    };

    document.addEventListener('DOMContentLoaded', loadSiteContent);
})();

// Made with Bob
