// Simple auth check endpoint
// Verifies if the provided token is valid

function verifyToken(token) {
  const expectedToken = process.env.JWT_SECRET;
  return token === expectedToken;
}

exports.handler = async (event, context) => {
  // Handle CORS preflight
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        'Access-Control-Allow-Methods': 'GET, OPTIONS'
      },
      body: ''
    };
  }

  // Only allow GET
  if (event.httpMethod !== 'GET') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    // Get token from Authorization header
    const authHeader = event.headers.authorization || event.headers.Authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return {
        statusCode: 200,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify({ authenticated: false })
      };
    }

    const token = authHeader.substring(7);
    const isValid = verifyToken(token);

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({ authenticated: isValid })
    };
  } catch (error) {
    console.error('Auth check error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ 
        authenticated: false,
        error: 'Auth check failed' 
      })
    };
  }
};

// Made with Bob
