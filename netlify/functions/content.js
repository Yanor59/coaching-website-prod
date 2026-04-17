const fs = require('fs').promises;
const path = require('path');

// Path to site-content.json
const CONTENT_FILE = path.join(process.cwd(), 'data', 'site-content.json');

// Helper to verify JWT token
function verifyAuth(headers) {
  const authHeader = headers.authorization || headers.Authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return false;
  }
  
  const token = authHeader.substring(7);
  // Simple token verification - in production, use proper JWT
  const expectedToken = process.env.JWT_SECRET;
  return token === expectedToken;
}

// GET - Read content
async function getContent() {
  try {
    const data = await fs.readFile(CONTENT_FILE, 'utf8');
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: data
    };
  } catch (error) {
    console.error('Error reading content:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to read content' })
    };
  }
}

// PUT - Update content
async function updateContent(body, headers) {
  // Verify authentication
  if (!verifyAuth(headers)) {
    return {
      statusCode: 401,
      body: JSON.stringify({ error: 'Unauthorized' })
    };
  }

  try {
    // Parse and validate content
    const content = JSON.parse(body);
    
    // Basic validation
    if (!content.site || !content.languages || !content.content) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Invalid content structure' })
      };
    }

    // Write to file
    await fs.writeFile(CONTENT_FILE, JSON.stringify(content, null, 2), 'utf8');

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({ 
        success: true,
        message: 'Content updated successfully' 
      })
    };
  } catch (error) {
    console.error('Error updating content:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to update content' })
    };
  }
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
        'Access-Control-Allow-Methods': 'GET, PUT, OPTIONS'
      },
      body: ''
    };
  }

  // Route based on HTTP method
  switch (event.httpMethod) {
    case 'GET':
      return getContent();
    
    case 'PUT':
      return updateContent(event.body, event.headers);
    
    default:
      return {
        statusCode: 405,
        body: JSON.stringify({ error: 'Method not allowed' })
      };
  }
};

// Made with Bob
