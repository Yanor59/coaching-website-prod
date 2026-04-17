// ===== API SERVICE =====
// Service pour communiquer avec le backend (Strapi ou autre)

class APIService {
    constructor(baseURL = 'http://localhost:1337/api') {
        this.baseURL = baseURL;
        this.locale = localStorage.getItem('preferredLanguage') || 'fr';
    }

    // ===== HELPER METHODS =====
    
    async request(endpoint, options = {}) {
        const url = `${this.baseURL}${endpoint}`;
        const config = {
            headers: {
                'Content-Type': 'application/json',
                ...options.headers
            },
            ...options
        };

        try {
            const response = await fetch(url, config);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('API Error:', error);
            throw error;
        }
    }

    setLocale(locale) {
        this.locale = locale;
    }

    // ===== PHOTOS =====
    
    async getPhotos(filters = {}) {
        const params = new URLSearchParams({
            locale: this.locale,
            populate: '*',
            ...filters
        });
        
        return this.request(`/photos?${params}`);
    }

    async getPhotoById(id) {
        return this.request(`/photos/${id}?locale=${this.locale}&populate=*`);
    }

    async uploadPhoto(formData) {
        return this.request('/upload', {
            method: 'POST',
            body: formData,
            headers: {} // Let browser set Content-Type for FormData
        });
    }

    // ===== VIDEOS =====
    
    async getVideos(filters = {}) {
        const params = new URLSearchParams({
            locale: this.locale,
            populate: '*',
            ...filters
        });
        
        return this.request(`/videos?${params}`);
    }

    async getVideoById(id) {
        return this.request(`/videos/${id}?locale=${this.locale}&populate=*`);
    }

    // ===== SERVICES =====
    
    async getServices() {
        return this.request(`/services?locale=${this.locale}&populate=*`);
    }

    async getServiceById(id) {
        return this.request(`/services/${id}?locale=${this.locale}&populate=*`);
    }

    // ===== TESTIMONIALS =====
    
    async getTestimonials(approved = true) {
        const filters = approved ? '&filters[approved][$eq]=true' : '';
        return this.request(`/testimonials?locale=${this.locale}&populate=*${filters}`);
    }

    async getTestimonialById(id) {
        return this.request(`/testimonials/${id}?locale=${this.locale}&populate=*`);
    }

    async submitTestimonial(data) {
        return this.request('/testimonials', {
            method: 'POST',
            body: JSON.stringify({ data })
        });
    }

    // ===== PARTNERS =====
    
    async getPartners() {
        return this.request(`/partners?locale=${this.locale}&populate=*`);
    }

    async getPartnerById(id) {
        return this.request(`/partners/${id}?locale=${this.locale}&populate=*`);
    }

    // ===== PRICING =====
    
    async getPricing(active = true) {
        const filters = active ? '&filters[active][$eq]=true' : '';
        return this.request(`/pricings?locale=${this.locale}&populate=*${filters}`);
    }

    async getPricingById(id) {
        return this.request(`/pricings/${id}?locale=${this.locale}&populate=*`);
    }

    // ===== MESSAGES =====
    
    async sendMessage(data) {
        return this.request('/messages', {
            method: 'POST',
            body: JSON.stringify({ data: { ...data, locale: this.locale } })
        });
    }

    async getMessages(filters = {}) {
        const params = new URLSearchParams({
            populate: '*',
            sort: 'createdAt:desc',
            ...filters
        });
        
        return this.request(`/messages?${params}`);
    }

    async updateMessageStatus(id, status) {
        return this.request(`/messages/${id}`, {
            method: 'PUT',
            body: JSON.stringify({ data: { status } })
        });
    }

    // ===== COMMENTS =====
    
    async getComments(page = null, approved = true) {
        const filters = approved ? '&filters[approved][$eq]=true' : '';
        const pageFilter = page ? `&filters[page][$eq]=${page}` : '';
        return this.request(`/comments?locale=${this.locale}&populate=*${filters}${pageFilter}&sort=createdAt:desc`);
    }

    async submitComment(data) {
        return this.request('/comments', {
            method: 'POST',
            body: JSON.stringify({ data: { ...data, locale: this.locale } })
        });
    }

    async approveComment(id) {
        return this.request(`/comments/${id}`, {
            method: 'PUT',
            body: JSON.stringify({ data: { approved: true } })
        });
    }

    // ===== SETTINGS =====
    
    async getSettings() {
        return this.request(`/setting?locale=${this.locale}&populate=*`);
    }

    async updateSettings(data) {
        return this.request('/setting', {
            method: 'PUT',
            body: JSON.stringify({ data })
        });
    }

    // ===== NEWSLETTER =====
    
    async subscribeNewsletter(email) {
        return this.request('/newsletter-subscriptions', {
            method: 'POST',
            body: JSON.stringify({ data: { email } })
        });
    }

    // ===== ANALYTICS =====
    
    async trackPageView(page) {
        return this.request('/analytics/pageview', {
            method: 'POST',
            body: JSON.stringify({ page, timestamp: new Date().toISOString() })
        });
    }

    async trackEvent(category, action, label) {
        return this.request('/analytics/event', {
            method: 'POST',
            body: JSON.stringify({ category, action, label, timestamp: new Date().toISOString() })
        });
    }

    // ===== AUTHENTICATION (Admin) =====
    
    async login(identifier, password) {
        const response = await this.request('/auth/local', {
            method: 'POST',
            body: JSON.stringify({ identifier, password })
        });
        
        if (response.jwt) {
            localStorage.setItem('jwt', response.jwt);
            localStorage.setItem('user', JSON.stringify(response.user));
        }
        
        return response;
    }

    async logout() {
        localStorage.removeItem('jwt');
        localStorage.removeItem('user');
    }

    getToken() {
        return localStorage.getItem('jwt');
    }

    isAuthenticated() {
        return !!this.getToken();
    }

    getCurrentUser() {
        const user = localStorage.getItem('user');
        return user ? JSON.parse(user) : null;
    }

    // ===== AUTHENTICATED REQUESTS =====
    
    async authenticatedRequest(endpoint, options = {}) {
        const token = this.getToken();
        
        if (!token) {
            throw new Error('Not authenticated');
        }

        return this.request(endpoint, {
            ...options,
            headers: {
                ...options.headers,
                'Authorization': `Bearer ${token}`
            }
        });
    }
}

// ===== MOCK DATA SERVICE =====
// Service pour simuler les données en attendant le backend

class MockDataService {
    constructor() {
        this.locale = localStorage.getItem('preferredLanguage') || 'fr';
    }

    setLocale(locale) {
        this.locale = locale;
    }

    // Simuler un délai réseau
    async delay(ms = 500) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async getPhotos() {
        await this.delay();
        return {
            data: [
                {
                    id: 1,
                    attributes: {
                        title: 'Séance d\'entraînement',
                        description: 'Photo d\'une séance de coaching',
                        url: 'https://via.placeholder.com/800x600?text=Photo+1',
                        category: 'training'
                    }
                },
                {
                    id: 2,
                    attributes: {
                        title: 'Transformation cliente',
                        description: 'Résultats après 3 mois',
                        url: 'https://via.placeholder.com/800x600?text=Photo+2',
                        category: 'results'
                    }
                }
            ]
        };
    }

    async getVideos() {
        await this.delay();
        return {
            data: [
                {
                    id: 1,
                    attributes: {
                        title: 'Exercice du jour',
                        url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
                        type: 'youtube'
                    }
                },
                {
                    id: 2,
                    attributes: {
                        title: 'Instagram Reel',
                        url: 'https://www.instagram.com/p/EXAMPLE',
                        type: 'instagram'
                    }
                }
            ]
        };
    }

    async getServices() {
        await this.delay();
        const services = {
            fr: [
                {
                    id: 1,
                    attributes: {
                        name: 'Coaching Individuel',
                        description: 'Accompagnement personnalisé',
                        price: 45,
                        features: ['Programme sur mesure', 'Suivi personnalisé']
                    }
                }
            ],
            en: [
                {
                    id: 1,
                    attributes: {
                        name: 'Individual Coaching',
                        description: 'Personalized support',
                        price: 45,
                        features: ['Custom program', 'Personal follow-up']
                    }
                }
            ]
        };
        
        return { data: services[this.locale] || services.fr };
    }

    async sendMessage(data) {
        await this.delay();
        console.log('Message envoyé (mock):', data);
        return { data: { id: Date.now(), ...data } };
    }

    async subscribeNewsletter(email) {
        await this.delay();
        console.log('Newsletter subscription (mock):', email);
        return { data: { email, subscribed: true } };
    }
}

// ===== INITIALIZATION =====

// Créer une instance globale
const apiService = new APIService();
const mockDataService = new MockDataService();

// Utiliser le mock par défaut (changer en production)
const USE_MOCK = true;
const dataService = USE_MOCK ? mockDataService : apiService;

// Export pour utilisation dans d'autres fichiers
window.APIService = APIService;
window.MockDataService = MockDataService;
window.apiService = apiService;
window.mockDataService = mockDataService;
window.dataService = dataService;

console.log('✅ API Service initialized');
console.log(`📡 Mode: ${USE_MOCK ? 'MOCK' : 'LIVE'}`);

// Made with Bob
