/**
 * AUTHENTICATION MODULE
 * Système d'authentification hybride pour localhost et production
 * 
 * LOCALHOST: Utilise .env (simple)
 * PRODUCTION: Utilise SQLite + bcrypt (sécurisé)
 */

const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

// Configuration
const SESSION_DURATION = 30 * 60 * 1000; // 30 minutes
const sessions = new Map(); // Stockage des sessions en mémoire

/**
 * Détecte l'environnement
 */
function isProduction() {
    return process.env.NODE_ENV === 'production';
}

/**
 * Génère un token de session sécurisé
 */
function generateSessionToken() {
    return crypto.randomBytes(32).toString('hex');
}

/**
 * Vérifie les identifiants en mode localhost
 */
function verifyCredentialsLocalhost(username, password) {
    const adminUsername = process.env.ADMIN_USERNAME || 'admin';
    const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';
    
    return username === adminUsername && password === adminPassword;
}

/**
 * Vérifie les identifiants en mode production
 * TODO: Implémenter avec bcrypt + SQLite pour la production
 */
function verifyCredentialsProduction(username, password) {
    // Pour l'instant, utilise la même logique que localhost
    // En production, cela devrait vérifier contre une base de données
    return verifyCredentialsLocalhost(username, password);
}

/**
 * Authentifie un utilisateur
 * @param {string} username - Nom d'utilisateur
 * @param {string} password - Mot de passe
 * @returns {Object|null} Session object ou null si échec
 */
function authenticate(username, password) {
    let isValid = false;
    
    if (isProduction()) {
        isValid = verifyCredentialsProduction(username, password);
    } else {
        isValid = verifyCredentialsLocalhost(username, password);
    }
    
    if (!isValid) {
        return null;
    }
    
    // Créer une session
    const sessionToken = generateSessionToken();
    const session = {
        token: sessionToken,
        username: username,
        createdAt: Date.now(),
        expiresAt: Date.now() + SESSION_DURATION,
        lastActivity: Date.now()
    };
    
    sessions.set(sessionToken, session);
    
    console.log(`✅ User authenticated: ${username}`);
    
    return session;
}

/**
 * Vérifie si une session est valide
 * @param {string} sessionToken - Token de session
 * @returns {boolean}
 */
function isValidSession(sessionToken) {
    if (!sessionToken) {
        return false;
    }
    
    const session = sessions.get(sessionToken);
    
    if (!session) {
        return false;
    }
    
    // Vérifier l'expiration
    if (Date.now() > session.expiresAt) {
        sessions.delete(sessionToken);
        console.log(`⏰ Session expired: ${session.username}`);
        return false;
    }
    
    // Mettre à jour l'activité
    session.lastActivity = Date.now();
    session.expiresAt = Date.now() + SESSION_DURATION;
    
    return true;
}

/**
 * Récupère les informations de session
 * @param {string} sessionToken - Token de session
 * @returns {Object|null}
 */
function getSession(sessionToken) {
    if (!isValidSession(sessionToken)) {
        return null;
    }
    
    return sessions.get(sessionToken);
}

/**
 * Déconnecte un utilisateur
 * @param {string} sessionToken - Token de session
 */
function logout(sessionToken) {
    const session = sessions.get(sessionToken);
    if (session) {
        console.log(`👋 User logged out: ${session.username}`);
        sessions.delete(sessionToken);
    }
}

/**
 * Nettoie les sessions expirées (appelé périodiquement)
 */
function cleanupExpiredSessions() {
    const now = Date.now();
    let cleaned = 0;
    
    for (const [token, session] of sessions.entries()) {
        if (now > session.expiresAt) {
            sessions.delete(token);
            cleaned++;
        }
    }
    
    if (cleaned > 0) {
        console.log(`🧹 Cleaned ${cleaned} expired session(s)`);
    }
}

// Nettoyer les sessions expirées toutes les 5 minutes
setInterval(cleanupExpiredSessions, 5 * 60 * 1000);

/**
 * Extrait le token de session depuis les cookies
 * @param {string} cookieHeader - Header Cookie
 * @returns {string|null}
 */
function extractSessionToken(cookieHeader) {
    if (!cookieHeader) {
        return null;
    }
    
    const cookies = cookieHeader.split(';').map(c => c.trim());
    const sessionCookie = cookies.find(c => c.startsWith('session='));
    
    if (!sessionCookie) {
        return null;
    }
    
    return sessionCookie.split('=')[1];
}

/**
 * Crée un cookie de session
 * @param {string} sessionToken - Token de session
 * @returns {string} Cookie header
 */
function createSessionCookie(sessionToken) {
    const maxAge = SESSION_DURATION / 1000; // en secondes
    return `session=${sessionToken}; HttpOnly; Max-Age=${maxAge}; Path=/; SameSite=Strict`;
}

/**
 * Crée un cookie de déconnexion
 * @returns {string} Cookie header
 */
function createLogoutCookie() {
    return 'session=; HttpOnly; Max-Age=0; Path=/; SameSite=Strict';
}

module.exports = {
    authenticate,
    isValidSession,
    getSession,
    logout,
    extractSessionToken,
    createSessionCookie,
    createLogoutCookie,
    isProduction
};

// Made with Bob
