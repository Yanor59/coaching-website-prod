const crypto = require('crypto');

// Simple authentication for demo
// In production, use Netlify Identity or a proper auth service

function generateToken() {
  return crypto.randomBytes(32).toString('hex');
}

function hashPassword(password) {
  return crypto.createHash('sha256').update(password).digest('hex');
}

// Main handler
exports.handler = async (event, context) => {
  // Handle CORS preflight
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS'
      },
      body: ''
    };
  }

  // Only allow POST
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    const { password } = JSON.parse(event.body);
    
    if (!password) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Password required' })
      };
    }

    // Get admin password from environment
    const adminPassword = process.env.ADMIN_PASSWORD;
    
    if (!adminPassword) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Admin password not configured' })
      };
    }

    // Verify password
    const hashedInput = hashPassword(password);
    const hashedAdmin = hashPassword(adminPassword);
    
    if (hashedInput !== hashedAdmin) {
      return {
        statusCode: 401,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify({ 
          authenticated: false,
          error: 'Invalid password' 
        })
      };
    }

    // Generate token (use JWT_SECRET as token for simplicity)
    const token = process.env.JWT_SECRET || generateToken();

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({
        authenticated: true,
        token: token
      })
    };
  } catch (error) {
    console.error('Auth error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ 
        error: 'Authentication failed',
        message: error.message 
      })
    };
  }
};

// Made with Bob
