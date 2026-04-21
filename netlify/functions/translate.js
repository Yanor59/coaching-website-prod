// Translation function using Google Translate (FREE)
// No API key required, completely free

const https = require('https');

// Helper to verify JWT token
function verifyAuth(headers) {
  const authHeader = headers.authorization || headers.Authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return false;
  }
  
  const token = authHeader.substring(7);
  const expectedToken = process.env.JWT_SECRET;
  return token === expectedToken;
}

// Language code mapping for Google Translate
const langMap = {
  'French': 'fr',
  'English': 'en',
  'Slovak': 'sk',
  'Ukrainian': 'uk' // Google uses 'uk' for Ukrainian
};

// Translate text using Google Translate (FREE)
async function translateWithGoogle(text, sourceLang, targetLang) {
  // Convert language names to codes
  const sourceCode = langMap[sourceLang] || sourceLang.toLowerCase().substring(0, 2);
  const targetCode = langMap[targetLang] || targetLang.toLowerCase().substring(0, 2);

  // Encode text for URL
  const encodedText = encodeURIComponent(text);
  
  // Use Google Translate's public API endpoint
  const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${sourceCode}&tl=${targetCode}&dt=t&q=${encodedText}`;

  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        try {
          const result = JSON.parse(data);
          
          if (result && result[0]) {
            // Google Translate returns an array of translated segments
            const translatedText = result[0].map(item => item[0]).join('');
            resolve(translatedText);
          } else {
            reject(new Error('Translation failed'));
          }
        } catch (error) {
          reject(error);
        }
      });
    }).on('error', reject);
  });
}

// Main handler
exports.handler = async (event, context) => {
  // Handle CORS preflight
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        'Access-Control-Allow-Methods': 'POST, OPTIONS'
      },
      body: ''
    };
  }

  // Only allow POST
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  // Verify authentication
  if (!verifyAuth(event.headers)) {
    return {
      statusCode: 401,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({ error: 'Unauthorized' })
    };
  }

  try {
    const { text, sourceLang, targetLang } = JSON.parse(event.body);

    if (!text || !sourceLang || !targetLang) {
      return {
        statusCode: 400,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify({ error: 'Missing required parameters' })
      };
    }

    console.log(`🌍 Translating from ${sourceLang} to ${targetLang} (Google Translate - FREE)...`);

    const translatedText = await translateWithGoogle(text, sourceLang, targetLang);

    console.log(`✅ Translation completed (Google Translate)`);

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({
        translatedText,
        sourceLang,
        targetLang
      })
    };
  } catch (error) {
    console.error('❌ Translation error:', error);
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({
        error: 'Translation failed',
        message: error.message
      })
    };
  }
};

// Made with Bob - Google Translate (FREE)