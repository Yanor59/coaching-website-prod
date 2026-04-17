/**
 * CLAUDE TRANSLATION SERVICE
 * 
 * Ce module permet d'utiliser Claude pour faire de vraies traductions
 * de haute qualité directement depuis votre localhost.
 * 
 * IMPORTANT: Vous devez avoir une clé API Claude (Anthropic)
 * 
 * Installation:
 * 1. npm install @anthropic-ai/sdk
 * 2. Créez un fichier .env avec: ANTHROPIC_API_KEY=votre_clé
 * 3. Obtenez votre clé sur: https://console.anthropic.com/
 */

const Anthropic = require('@anthropic-ai/sdk');
require('dotenv').config();

// Initialiser le client Anthropic
const anthropic = new Anthropic({
    apiKey: process.env.ANTHROPIC_API_KEY || '',
});

/**
 * Traduire un texte avec Claude
 * @param {string} text - Texte à traduire
 * @param {string} sourceLang - Langue source (French, English, Slovak, Ukrainian)
 * @param {string} targetLang - Langue cible
 * @returns {Promise<string>} Texte traduit
 */
async function translateWithClaude(text, sourceLang, targetLang) {
    if (!text || text.trim() === '') {
        return text;
    }

    if (!process.env.ANTHROPIC_API_KEY) {
        console.warn('⚠️ ANTHROPIC_API_KEY non configurée. Utilisation du mode mock.');
        return `[${targetLang}] ${text}`;
    }

    try {
        const prompt = `You are a professional translator specializing in fitness and wellness content.

Translate the following text from ${sourceLang} to ${targetLang}.

IMPORTANT RULES:
- Provide ONLY the translation, nothing else
- Maintain the same tone and style
- Keep HTML tags if present (like <br>)
- Preserve formatting and line breaks
- Use natural, fluent language
- Adapt cultural references appropriately
- Keep brand names unchanged

Text to translate:
${text}

Translation:`;

        const message = await anthropic.messages.create({
            model: 'claude-3-5-sonnet-20241022',
            max_tokens: 1024,
            messages: [{
                role: 'user',
                content: prompt
            }]
        });

        const translation = message.content[0].text.trim();
        
        console.log(`✅ Translated: "${text.substring(0, 50)}..." → "${translation.substring(0, 50)}..."`);
        
        return translation;

    } catch (error) {
        console.error('❌ Claude translation error:', error.message);
        throw new Error(`Translation failed: ${error.message}`);
    }
}

/**
 * Traduire plusieurs textes en batch (plus efficace)
 * @param {Array<string>} texts - Textes à traduire
 * @param {string} sourceLang - Langue source
 * @param {string} targetLang - Langue cible
 * @returns {Promise<Array<string>>} Textes traduits
 */
async function translateBatch(texts, sourceLang, targetLang) {
    if (!texts || texts.length === 0) {
        return [];
    }

    if (!process.env.ANTHROPIC_API_KEY) {
        console.warn('⚠️ ANTHROPIC_API_KEY non configurée. Utilisation du mode mock.');
        return texts.map(text => `[${targetLang}] ${text}`);
    }

    try {
        // Créer un texte numéroté pour traduire en batch
        const numberedTexts = texts.map((text, i) => `${i + 1}. ${text}`).join('\n\n');

        const prompt = `You are a professional translator specializing in fitness and wellness content.

Translate the following numbered texts from ${sourceLang} to ${targetLang}.

IMPORTANT RULES:
- Provide ONLY the translations, keeping the same numbering
- Maintain the same tone and style for each text
- Keep HTML tags if present (like <br>)
- Preserve formatting and line breaks
- Use natural, fluent language
- Adapt cultural references appropriately
- Keep brand names unchanged

Texts to translate:
${numberedTexts}

Translations (keep the numbering):`;

        const message = await anthropic.messages.create({
            model: 'claude-3-5-sonnet-20241022',
            max_tokens: 4096,
            messages: [{
                role: 'user',
                content: prompt
            }]
        });

        const response = message.content[0].text.trim();
        
        // Parser les traductions numérotées
        const translations = [];
        const lines = response.split('\n');
        let currentTranslation = '';
        
        for (const line of lines) {
            const match = line.match(/^(\d+)\.\s*(.+)$/);
            if (match) {
                if (currentTranslation) {
                    translations.push(currentTranslation.trim());
                }
                currentTranslation = match[2];
            } else if (line.trim()) {
                currentTranslation += ' ' + line.trim();
            }
        }
        
        if (currentTranslation) {
            translations.push(currentTranslation.trim());
        }

        console.log(`✅ Batch translated ${translations.length} texts`);
        
        return translations;

    } catch (error) {
        console.error('❌ Claude batch translation error:', error.message);
        throw new Error(`Batch translation failed: ${error.message}`);
    }
}

module.exports = {
    translateWithClaude,
    translateBatch
};

// Made with Bob
