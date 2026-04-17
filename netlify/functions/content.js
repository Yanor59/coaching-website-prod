// Content management with GitHub API integration
// Reads content from deployed site, writes via GitHub API

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
    // Get the site URL from Netlify environment
    const siteUrl = process.env.URL || `https://${event.headers.host}`;
    const contentUrl = `${siteUrl}/data/site-content.json`;
    
    console.log('📖 Fetching content from:', contentUrl);
    
    // Fetch the content file from the deployed site
    const response = await fetch(contentUrl);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch content: ${response.status}`);
    }
    
    const data = await response.text();
    console.log('✅ Content loaded successfully');
    
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: data
    };
  } catch (error) {
    console.error('❌ Error reading content:', error);
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

// PUT - Update content via GitHub API
async function updateContent(body, headers) {
  // Verify authentication
  if (!verifyAuth(headers)) {
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
    // Parse and validate content
    const content = JSON.parse(body);
    
    // Basic validation
    if (!content.site || !content.languages || !content.content) {
      return {
        statusCode: 400,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify({ error: 'Invalid content structure' })
      };
    }

    // Get GitHub credentials from environment
    const githubToken = process.env.GITHUB_TOKEN;
    const githubOwner = process.env.GITHUB_OWNER;
    const githubRepo = process.env.GITHUB_REPO;

    if (!githubToken || !githubOwner || !githubRepo) {
      console.error('❌ Missing GitHub configuration');
      return {
        statusCode: 500,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify({ 
          error: 'GitHub integration not configured',
          message: 'Please add GITHUB_TOKEN, GITHUB_OWNER, and GITHUB_REPO to Netlify environment variables'
        })
      };
    }

    const filePath = 'data/site-content.json';
    const apiUrl = `https://api.github.com/repos/${githubOwner}/${githubRepo}/contents/${filePath}`;

    console.log('📝 Updating content via GitHub API:', apiUrl);

    // Step 1: Get current file SHA (required for update)
    const getResponse = await fetch(apiUrl, {
      headers: {
        'Authorization': `token ${githubToken}`,
        'Accept': 'application/vnd.github.v3+json',
        'User-Agent': 'Netlify-Function'
      }
    });

    if (!getResponse.ok) {
      throw new Error(`Failed to get file SHA: ${getResponse.status} ${getResponse.statusText}`);
    }

    const fileData = await getResponse.json();
    const currentSha = fileData.sha;

    // Step 2: Update file with new content
    const contentBase64 = Buffer.from(JSON.stringify(content, null, 2)).toString('base64');
    
    const updateResponse = await fetch(apiUrl, {
      method: 'PUT',
      headers: {
        'Authorization': `token ${githubToken}`,
        'Accept': 'application/vnd.github.v3+json',
        'Content-Type': 'application/json',
        'User-Agent': 'Netlify-Function'
      },
      body: JSON.stringify({
        message: 'Update content via admin interface',
        content: contentBase64,
        sha: currentSha,
        branch: 'main'
      })
    });

    if (!updateResponse.ok) {
      const errorData = await updateResponse.json();
      throw new Error(`GitHub API error: ${updateResponse.status} - ${errorData.message}`);
    }

    const updateData = await updateResponse.json();
    console.log('✅ Content updated successfully:', updateData.commit.sha);

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({ 
        success: true,
        message: 'Content updated successfully. Site will redeploy in 1-2 minutes.',
        commit: updateData.commit.sha
      })
    };
  } catch (error) {
    console.error('❌ Error updating content:', error);
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({ 
        error: 'Failed to update content',
        message: error.message 
      })
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
      return getContent(event);
    
    case 'PUT':
      return updateContent(event.body, event.headers);
    
    default:
      return {
        statusCode: 405,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify({ error: 'Method not allowed' })
      };
  }
};

// Made with Bob - GitHub API Integration
