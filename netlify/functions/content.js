// Content management with Netlify Blobs
// Instant updates without GitHub commits or redeployment

const { getStore } = require('@netlify/blobs');

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

// Helper to create backup
async function createBackup(store, content) {
  try {
    const now = new Date();
    const timestamp = now.toISOString();
    const dateKey = now.toISOString().split('T')[0]; // YYYY-MM-DD
    
    // Create daily backup
    const dailyBackupKey = `backup-daily-${dateKey}`;
    await store.set(dailyBackupKey, JSON.stringify({
      content: content,
      timestamp: timestamp,
      type: 'daily'
    }));
    
    // Keep last 30 daily backups
    const backupsList = await store.list({ prefix: 'backup-daily-' });
    if (backupsList.blobs.length > 30) {
      // Sort by key (date) and delete oldest
      const sortedBackups = backupsList.blobs.sort((a, b) => a.key.localeCompare(b.key));
      const toDelete = sortedBackups.slice(0, sortedBackups.length - 30);
      for (const backup of toDelete) {
        await store.delete(backup.key);
      }
    }
    
    // Create hourly backup (keep last 24 hours)
    const hourKey = now.toISOString().substring(0, 13); // YYYY-MM-DDTHH
    const hourlyBackupKey = `backup-hourly-${hourKey}`;
    await store.set(hourlyBackupKey, JSON.stringify({
      content: content,
      timestamp: timestamp,
      type: 'hourly'
    }));
    
    // Keep last 24 hourly backups
    const hourlyBackupsList = await store.list({ prefix: 'backup-hourly-' });
    if (hourlyBackupsList.blobs.length > 24) {
      const sortedHourly = hourlyBackupsList.blobs.sort((a, b) => a.key.localeCompare(b.key));
      const toDeleteHourly = sortedHourly.slice(0, sortedHourly.length - 24);
      for (const backup of toDeleteHourly) {
        await store.delete(backup.key);
      }
    }
    
    console.log(`✅ Backups created: ${dailyBackupKey}, ${hourlyBackupKey}`);
  } catch (error) {
    console.error('⚠️ Backup creation failed (non-critical):', error);
    // Don't fail the main operation if backup fails
  }
}

// GET - Read content from Netlify Blobs
async function getContent(event) {
  try {
    // Get store with manual configuration for Netlify environment
    const store = getStore({
      name: 'site-data',
      siteID: process.env.NETLIFY_SITE_ID || event.headers['x-nf-site-id'],
      token: process.env.NETLIFY_TOKEN || process.env.NETLIFY_AUTH_TOKEN
    });
    
    console.log('📖 Fetching content from Netlify Blobs...');
    
    // Try to get content from Blobs
    const contentStr = await store.get('site-content');
    
    if (contentStr) {
      console.log('✅ Content loaded from Blobs');
      return {
        statusCode: 200,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Cache-Control': 'no-cache, no-store, must-revalidate'
        },
        body: contentStr
      };
    }
    
    // If no content in Blobs, try to load from deployed file (first time migration)
    console.log('📖 No content in Blobs, loading from deployed file...');
    const https = require('https');
    const siteUrl = process.env.URL || `https://${event.headers.host}`;
    const contentUrl = `${siteUrl}/data/site-content.json`;
    
    const response = await new Promise((resolve, reject) => {
      https.get(contentUrl, (res) => {
        let data = '';
        res.on('data', (chunk) => data += chunk);
        res.on('end', () => resolve(data));
      }).on('error', reject);
    });
    
    // Save to Blobs for next time
    await store.set('site-content', response);
    await createBackup(store, JSON.parse(response));
    
    console.log('✅ Content migrated to Blobs');
    
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: response
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

// PUT - Update content in Netlify Blobs
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

    // Get store with manual configuration for Netlify environment
    const store = getStore({
      name: 'site-data',
      siteID: process.env.NETLIFY_SITE_ID || headers['x-nf-site-id'],
      token: process.env.NETLIFY_TOKEN || process.env.NETLIFY_AUTH_TOKEN
    });
    
    console.log('💾 Saving content to Netlify Blobs...');
    
    // Save content
    await store.set('site-content', JSON.stringify(content, null, 2));
    
    // Create backups
    await createBackup(store, content);
    
    console.log('✅ Content saved successfully to Blobs');

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({
        success: true,
        message: 'Content updated successfully (instant update, no redeployment needed)',
        timestamp: new Date().toISOString()
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
