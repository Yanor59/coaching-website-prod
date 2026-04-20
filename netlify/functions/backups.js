// Backup management for Netlify Blobs
// List and restore backups

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

// GET - List all backups
async function listBackups(event) {
  try {
    // Get store with manual configuration for Netlify environment
    const store = getStore({
      name: 'site-data',
      siteID: process.env.SITE_ID || event.headers['x-nf-site-id'],
      token: process.env.NETLIFY_TOKEN || process.env.NETLIFY_AUTH_TOKEN
    });
    
    console.log('📋 Listing backups...');
    
    // Get all backups
    const dailyBackups = await store.list({ prefix: 'backup-daily-' });
    const hourlyBackups = await store.list({ prefix: 'backup-hourly-' });
    
    // Format backup list
    const backups = {
      daily: [],
      hourly: []
    };
    
    // Process daily backups
    for (const blob of dailyBackups.blobs) {
      const data = await store.get(blob.key);
      const parsed = JSON.parse(data);
      backups.daily.push({
        key: blob.key,
        date: blob.key.replace('backup-daily-', ''),
        timestamp: parsed.timestamp,
        size: data.length
      });
    }
    
    // Process hourly backups
    for (const blob of hourlyBackups.blobs) {
      const data = await store.get(blob.key);
      const parsed = JSON.parse(data);
      backups.hourly.push({
        key: blob.key,
        datetime: blob.key.replace('backup-hourly-', ''),
        timestamp: parsed.timestamp,
        size: data.length
      });
    }
    
    // Sort by timestamp (newest first)
    backups.daily.sort((a, b) => b.timestamp.localeCompare(a.timestamp));
    backups.hourly.sort((a, b) => b.timestamp.localeCompare(a.timestamp));
    
    console.log(`✅ Found ${backups.daily.length} daily and ${backups.hourly.length} hourly backups`);
    
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify(backups)
    };
  } catch (error) {
    console.error('❌ Error listing backups:', error);
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({
        error: 'Failed to list backups',
        message: error.message
      })
    };
  }
}

// POST - Restore a backup
async function restoreBackup(body, event) {
  try {
    const { backupKey } = JSON.parse(body);
    
    if (!backupKey) {
      return {
        statusCode: 400,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify({ error: 'Backup key required' })
      };
    }
    
    // Get store with manual configuration for Netlify environment
    const store = getStore({
      name: 'site-data',
      siteID: process.env.SITE_ID || event.headers['x-nf-site-id'],
      token: process.env.NETLIFY_TOKEN || process.env.NETLIFY_AUTH_TOKEN
    });
    
    console.log(`🔄 Restoring backup: ${backupKey}`);
    
    // Get backup data
    const backupData = await store.get(backupKey);
    
    if (!backupData) {
      return {
        statusCode: 404,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify({ error: 'Backup not found' })
      };
    }
    
    const backup = JSON.parse(backupData);
    
    // Create a backup of current content before restoring
    const currentContent = await store.get('site-content');
    if (currentContent) {
      const restoreTimestamp = new Date().toISOString().replace(/[:.]/g, '-');
      await store.set(`backup-before-restore-${restoreTimestamp}`, JSON.stringify({
        content: JSON.parse(currentContent),
        timestamp: new Date().toISOString(),
        type: 'pre-restore'
      }));
    }
    
    // Restore the backup
    await store.set('site-content', JSON.stringify(backup.content, null, 2));
    
    console.log(`✅ Backup restored: ${backupKey}`);
    
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({
        success: true,
        message: 'Backup restored successfully',
        restoredFrom: backupKey,
        timestamp: new Date().toISOString()
      })
    };
  } catch (error) {
    console.error('❌ Error restoring backup:', error);
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({
        error: 'Failed to restore backup',
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
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS'
      },
      body: ''
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

  // Route based on HTTP method
  switch (event.httpMethod) {
    case 'GET':
      return listBackups(event);
    
    case 'POST':
      return restoreBackup(event.body, event);
    
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

// Made with Bob - Netlify Blobs Backup Management