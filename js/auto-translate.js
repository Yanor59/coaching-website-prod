// ===== AUTO-TRANSLATE MODULE =====
// Automatic translation system for admin interface
// Uses Claude API for high-quality translations

class AutoTranslate {
    constructor() {
        this.apiEndpoint = '/.netlify/functions/translate';
        this.supportedLanguages = {
            'fr': 'French',
            'en': 'English',
            'sk': 'Slovak',
            'ua': 'Ukrainian'
        };
        this.isTranslating = false;
    }

    /**
     * Translate text from source language to target language
     * @param {string} text - Text to translate
     * @param {string} sourceLang - Source language code (fr, en, sk, ua)
     * @param {string} targetLang - Target language code
     * @returns {Promise<string>} Translated text
     */
    async translateText(text, sourceLang, targetLang) {
        if (!text || text.trim() === '') {
            return text;
        }

        if (sourceLang === targetLang) {
            return text;
        }

        try {
            // Get auth token
            const authToken = localStorage.getItem('authToken');
            if (!authToken) {
                throw new Error('Session expirée. Veuillez vous reconnecter.');
            }
            
            const response = await fetch(this.apiEndpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authToken}`
                },
                body: JSON.stringify({
                    text,
                    sourceLang: this.supportedLanguages[sourceLang],
                    targetLang: this.supportedLanguages[targetLang]
                })
            });

            if (!response.ok) {
                throw new Error(`Translation failed: ${response.status}`);
            }

            const result = await response.json();
            return result.translatedText;
        } catch (error) {
            console.error('Translation error:', error);
            throw error;
        }
    }

    /**
     * Translate an entire object recursively
     * @param {Object} obj - Object to translate
     * @param {string} sourceLang - Source language
     * @param {string} targetLang - Target language
     * @returns {Promise<Object>} Translated object
     */
    async translateObject(obj, sourceLang, targetLang) {
        if (typeof obj === 'string') {
            return await this.translateText(obj, sourceLang, targetLang);
        }

        if (Array.isArray(obj)) {
            const translated = [];
            for (const item of obj) {
                translated.push(await this.translateObject(item, sourceLang, targetLang));
            }
            return translated;
        }

        if (typeof obj === 'object' && obj !== null) {
            const translated = {};
            for (const [key, value] of Object.entries(obj)) {
                // Skip certain keys that shouldn't be translated
                if (this.shouldSkipKey(key)) {
                    translated[key] = value;
                } else {
                    translated[key] = await this.translateObject(value, sourceLang, targetLang);
                }
            }
            return translated;
        }

        return obj;
    }

    /**
     * Check if a key should be skipped during translation
     * @param {string} key - Object key
     * @returns {boolean}
     */
    shouldSkipKey(key) {
        const skipKeys = [
            'src', 'image', 'path', 'url', 'link',
            'price', 'rating', 'featured', 'experienceValue'
        ];
        return skipKeys.includes(key);
    }

    /**
     * Translate a section from source language to all other languages
     * @param {Object} sectionData - Section data in source language
     * @param {string} sourceLang - Source language code
     * @returns {Promise<Object>} Object with translations for all languages
     */
    async translateSection(sectionData, sourceLang = 'fr') {
        this.isTranslating = true;
        const translations = {};
        const targetLanguages = Object.keys(this.supportedLanguages).filter(
            lang => lang !== sourceLang
        );

        try {
            for (const targetLang of targetLanguages) {
                console.log(`🌍 Translating to ${this.supportedLanguages[targetLang]}...`);
                translations[targetLang] = await this.translateObject(
                    sectionData,
                    sourceLang,
                    targetLang
                );
            }

            this.isTranslating = false;
            return translations;
        } catch (error) {
            this.isTranslating = false;
            throw error;
        }
    }

    /**
     * Translate specific fields from a section
     * @param {Object} fields - Fields to translate {key: value}
     * @param {string} sourceLang - Source language
     * @param {Array<string>} targetLangs - Target languages
     * @returns {Promise<Object>} Translations by language
     */
    async translateFields(fields, sourceLang, targetLangs) {
        this.isTranslating = true;
        const translations = {};

        try {
            for (const targetLang of targetLangs) {
                translations[targetLang] = {};
                
                for (const [key, value] of Object.entries(fields)) {
                    if (typeof value === 'string' && value.trim() !== '') {
                        translations[targetLang][key] = await this.translateText(
                            value,
                            sourceLang,
                            targetLang
                        );
                    } else {
                        translations[targetLang][key] = value;
                    }
                }
            }

            this.isTranslating = false;
            return translations;
        } catch (error) {
            this.isTranslating = false;
            throw error;
        }
    }

    /**
     * Get translation status
     * @returns {boolean}
     */
    getStatus() {
        return this.isTranslating;
    }
}

// Create global instance
const autoTranslate = new AutoTranslate();

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AutoTranslate;
}

// Made with Bob
