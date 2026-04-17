const http = require('http');
const fs = require('fs');
const path = require('path');
const { translateWithClaude } = require('./translate-with-claude');
const auth = require('./auth');

const PORT = 3000;
const ROOT_DIR = __dirname;
const DATA_FILE = path.join(ROOT_DIR, 'data', 'site-content.json');
const UPLOAD_DIR = path.join(ROOT_DIR, 'uploads');
const IMAGES_DIR = path.join(ROOT_DIR, 'images');

const MIME_TYPES = {
    '.html': 'text/html; charset=utf-8',
    '.css': 'text/css; charset=utf-8',
    '.js': 'application/javascript; charset=utf-8',
    '.json': 'application/json; charset=utf-8',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.webp': 'image/webp',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon'
};

function ensureDirectoryExists(dirPath) {
    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
    }
}

function sendJson(res, statusCode, data) {
    res.writeHead(statusCode, {
        'Content-Type': 'application/json; charset=utf-8',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, PUT, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type'
    });
    res.end(JSON.stringify(data, null, 2));
}

function sendFile(res, filePath) {
    fs.readFile(filePath, (error, content) => {
        if (error) {
            sendJson(res, 404, { error: 'File not found' });
            return;
        }

        const ext = path.extname(filePath).toLowerCase();
        const contentType = MIME_TYPES[ext] || 'application/octet-stream';

        res.writeHead(200, { 'Content-Type': contentType });
        res.end(content);
    });
}

function getRequestBody(req) {
    return new Promise((resolve, reject) => {
        let body = '';

        req.on('data', chunk => {
            body += chunk.toString();
        });

        req.on('end', () => {
            if (!body) {
                resolve({});
                return;
            }

            try {
                resolve(JSON.parse(body));
            } catch (error) {
                reject(error);
            }
        });

        req.on('error', reject);
    });
}

function isSafePath(targetPath) {
    const resolved = path.resolve(targetPath);
    return resolved.startsWith(path.resolve(ROOT_DIR));
}

function getExtensionFromMime(mimeType) {
    const mapping = {
        'image/jpeg': '.jpg',
        'image/png': '.png',
        'image/webp': '.webp',
        'image/svg+xml': '.svg'
    };

    return mapping[mimeType] || '';
}

function sanitizeFileName(fileName) {
    return String(fileName || 'upload')
        .toLowerCase()
        .replace(/[^a-z0-9._-]/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '');
}

/**
 * Translate text using Claude API
 * @param {string} text - Text to translate
 * @param {string} sourceLang - Source language
 * @param {string} targetLang - Target language
 * @returns {Promise<string>} Translated text
 */
async function translateWithPrompt(text, sourceLang, targetLang) {
    try {
        // Use Claude for real translation
        const translation = await translateWithClaude(text, sourceLang, targetLang);
        return translation;
    } catch (error) {
        console.error('Translation error:', error);
        // Fallback: return original text with language marker
        return `[${targetLang}] ${text}`;
    }
}

ensureDirectoryExists(UPLOAD_DIR);
ensureDirectoryExists(IMAGES_DIR);

const server = http.createServer(async (req, res) => {
    if (req.method === 'OPTIONS') {
        res.writeHead(204, {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, PUT, POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type'
        });
        res.end();
        return;
    }

    // ===== AUTHENTICATION ROUTES =====
    
    // Login endpoint
    if (req.url === '/api/login' && req.method === 'POST') {
        try {
            const payload = await getRequestBody(req);
            const { username, password } = payload;

            if (!username || !password) {
                sendJson(res, 400, { error: 'Username and password required' });
                return;
            }

            const session = auth.authenticate(username, password);

            if (!session) {
                sendJson(res, 401, { error: 'Invalid credentials' });
                return;
            }

            // Set session cookie
            res.writeHead(200, {
                'Content-Type': 'application/json',
                'Set-Cookie': auth.createSessionCookie(session.token)
            });
            res.end(JSON.stringify({
                success: true,
                message: 'Login successful'
            }));
        } catch (error) {
            sendJson(res, 500, { error: 'Login failed' });
        }
        return;
    }

    // Logout endpoint
    if (req.url === '/api/logout' && req.method === 'POST') {
        const sessionToken = auth.extractSessionToken(req.headers.cookie);
        
        if (sessionToken) {
            auth.logout(sessionToken);
        }

        res.writeHead(200, {
            'Content-Type': 'application/json',
            'Set-Cookie': auth.createLogoutCookie()
        });
        res.end(JSON.stringify({
            success: true,
            message: 'Logged out'
        }));
        return;
    }

    // Check authentication status
    if (req.url === '/api/check-auth' && req.method === 'GET') {
        const sessionToken = auth.extractSessionToken(req.headers.cookie);
        const isAuthenticated = auth.isValidSession(sessionToken);

        sendJson(res, 200, {
            authenticated: isAuthenticated,
            session: isAuthenticated ? auth.getSession(sessionToken) : null
        });
        return;
    }

    // ===== PROTECTED ROUTES (require authentication) =====
    
    // Check authentication for admin routes
    const isAdminRoute = req.url.startsWith('/api/') &&
                        req.url !== '/api/login' &&
                        req.url !== '/api/check-auth';
    
    if (isAdminRoute) {
        const sessionToken = auth.extractSessionToken(req.headers.cookie);
        
        if (!auth.isValidSession(sessionToken)) {
            sendJson(res, 401, { error: 'Unauthorized - Please login' });
            return;
        }
    }

    if (req.url === '/api/content' && req.method === 'GET') {
        fs.readFile(DATA_FILE, 'utf8', (error, data) => {
            if (error) {
                sendJson(res, 500, { error: 'Unable to read content file' });
                return;
            }

            try {
                const parsed = JSON.parse(data);
                sendJson(res, 200, parsed);
            } catch (parseError) {
                sendJson(res, 500, { error: 'Invalid JSON content file' });
            }
        });
        return;
    }

    if (req.url === '/api/content' && req.method === 'PUT') {
        try {
            const payload = await getRequestBody(req);

            fs.writeFile(DATA_FILE, JSON.stringify(payload, null, 2), 'utf8', error => {
                if (error) {
                    sendJson(res, 500, { error: 'Unable to save content file' });
                    return;
                }

                sendJson(res, 200, {
                    success: true,
                    message: 'Content saved successfully'
                });
            });
        } catch (error) {
            sendJson(res, 400, { error: 'Invalid JSON payload' });
        }
        return;
    }

    if (req.url === '/api/upload' && req.method === 'POST') {
        try {
            const payload = await getRequestBody(req);
            const mimeType = payload && payload.mimeType;
            const dataUrl = payload && payload.dataUrl;
            const originalName = payload && payload.fileName;

            if (!mimeType || !dataUrl) {
                sendJson(res, 400, { error: 'Missing upload payload' });
                return;
            }

            if (!['image/jpeg', 'image/png', 'image/webp', 'image/svg+xml'].includes(mimeType)) {
                sendJson(res, 400, { error: 'Unsupported image type' });
                return;
            }

            const extension = getExtensionFromMime(mimeType);
            const baseName = sanitizeFileName(path.parse(originalName || 'upload').name || 'upload');
            const finalName = `${Date.now()}-${baseName || 'image'}${extension}`;
            const targetPath = path.join(IMAGES_DIR, finalName);
            const base64Data = String(dataUrl).split(',').pop();

            fs.writeFile(targetPath, Buffer.from(base64Data, 'base64'), error => {
                if (error) {
                    sendJson(res, 500, { error: 'Unable to save uploaded file' });
                    return;
                }

                sendJson(res, 200, {
                    success: true,
                    path: `images/${finalName}`,
                    fileName: finalName
                });
            });
        } catch (error) {
            sendJson(res, 400, { error: 'Invalid upload payload' });
        }
        return;
    }

    if (req.url === '/api/translate' && req.method === 'POST') {
        try {
            const payload = await getRequestBody(req);
            const { text, sourceLang, targetLang } = payload;

            if (!text || !sourceLang || !targetLang) {
                sendJson(res, 400, { error: 'Missing required fields: text, sourceLang, targetLang' });
                return;
            }

            // Simulate translation using a simple prompt
            // In production, this would call Claude API or another translation service
            const translatedText = await translateWithPrompt(text, sourceLang, targetLang);

            sendJson(res, 200, {
                success: true,
                translatedText,
                sourceLang,
                targetLang
            });
        } catch (error) {
            console.error('Translation error:', error);
            sendJson(res, 500, { error: 'Translation failed: ' + error.message });
        }
        return;
    }

    let requestPath = req.url === '/' ? '/index.html' : req.url.split('?')[0];
    const safePath = path.join(ROOT_DIR, requestPath);

    if (!isSafePath(safePath)) {
        sendJson(res, 403, { error: 'Forbidden' });
        return;
    }

    fs.stat(safePath, (error, stats) => {
        if (!error && stats.isDirectory()) {
            sendFile(res, path.join(safePath, 'index.html'));
            return;
        }

        sendFile(res, safePath);
    });
});

server.listen(PORT, () => {
    console.log(`✅ Local server running on http://localhost:${PORT}`);
    console.log(`📄 Admin: http://localhost:${PORT}/admin.html`);
    console.log(`🌐 Site: http://localhost:${PORT}/index.html`);
});

// Made with Bob
