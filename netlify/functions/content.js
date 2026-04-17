const fs = require('fs').promises;
const path = require('path');
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

// GET - Read content from deployed site
async function getContent(event) {
  try {
    // Get the site URL from Netlify environment or construct it
    const siteUrl = process.env.URL || `https://${event.headers.host}`;
    const contentUrl = `${siteUrl}/data/site-content.json`;
    
    console.log('Fetching content from:', contentUrl);
    
    // Fetch the content file from the deployed site
    const response = await fetch(contentUrl);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch content: ${response.status}`);
    }
    
    const data = await response.text();
    
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
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({
        error: 'Failed to read content',
        message: error.message
      })
    };
  }
}

// PUT - Update content (Note: This won't work on Netlify without Git integration)
async function updateContent(body, headers) {
  // Verify authentication
  if (!verifyAuth(headers)) {
    return {
      statusCode: 401,
      body: JSON.stringify({ error: 'Unauthorized' })
    };
  }

  // On Netlify, we can't write to the filesystem
  // This would require GitHub API integration or a database
  return {
    statusCode: 501,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify({
      error: 'Content updates require GitHub integration',
      message: 'Please use localStorage for now or implement GitHub API'
    })
  };
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
      return getContent(event);
    
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
