const https = require('https');
const { URLSearchParams } = require('url');

// Cloudinary configuration from environment variables
const CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME;
const API_KEY = process.env.CLOUDINARY_API_KEY;
const API_SECRET = process.env.CLOUDINARY_API_SECRET;

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

// Upload to Cloudinary
function uploadToCloudinary(imageData, filename) {
  return new Promise((resolve, reject) => {
    const timestamp = Math.round(Date.now() / 1000);
    const folder = 'alina-coaching';
    
    // Generate signature
    const crypto = require('crypto');
    const stringToSign = `folder=${folder}&timestamp=${timestamp}${API_SECRET}`;
    const signature = crypto.createHash('sha1').update(stringToSign).digest('hex');
    
    // Prepare form data
    const boundary = '----WebKitFormBoundary' + Math.random().toString(36).substring(2);
    const formData = [];
    
    // Add form fields
    formData.push(`--${boundary}\r\n`);
    formData.push(`Content-Disposition: form-data; name="file"\r\n\r\n`);
    formData.push(`${imageData}\r\n`);
    
    formData.push(`--${boundary}\r\n`);
    formData.push(`Content-Disposition: form-data; name="api_key"\r\n\r\n`);
    formData.push(`${API_KEY}\r\n`);
    
    formData.push(`--${boundary}\r\n`);
    formData.push(`Content-Disposition: form-data; name="timestamp"\r\n\r\n`);
    formData.push(`${timestamp}\r\n`);
    
    formData.push(`--${boundary}\r\n`);
    formData.push(`Content-Disposition: form-data; name="signature"\r\n\r\n`);
    formData.push(`${signature}\r\n`);
    
    formData.push(`--${boundary}\r\n`);
    formData.push(`Content-Disposition: form-data; name="folder"\r\n\r\n`);
    formData.push(`${folder}\r\n`);
    
    formData.push(`--${boundary}--\r\n`);
    
    const body = formData.join('');
    
    const options = {
      hostname: 'api.cloudinary.com',
      path: `/v1_1/${CLOUD_NAME}/image/upload`,
      method: 'POST',
      headers: {
        'Content-Type': `multipart/form-data; boundary=${boundary}`,
        'Content-Length': Buffer.byteLength(body)
      }
    };
    
    const req = https.request(options, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        try {
          const result = JSON.parse(data);
          if (res.statusCode === 200) {
            resolve(result);
          } else {
            reject(new Error(result.error?.message || 'Upload failed'));
          }
        } catch (error) {
          reject(error);
        }
      });
    });
    
    req.on('error', reject);
    req.write(body);
    req.end();
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
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  // Verify authentication
  if (!verifyAuth(event.headers)) {
    return {
      statusCode: 401,
      body: JSON.stringify({ error: 'Unauthorized' })
    };
  }

  // Check Cloudinary configuration
  if (!CLOUD_NAME || !API_KEY || !API_SECRET) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Cloudinary not configured' })
    };
  }

  try {
    // Parse request body
    const { image, filename } = JSON.parse(event.body);
    
    if (!image) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'No image data provided' })
      };
    }

    // Upload to Cloudinary
    const result = await uploadToCloudinary(image, filename);

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({
        success: true,
        url: result.secure_url,
        public_id: result.public_id
      })
    };
  } catch (error) {
    console.error('Upload error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ 
        error: 'Upload failed',
        message: error.message 
      })
    };
  }
};

// Made with Bob
