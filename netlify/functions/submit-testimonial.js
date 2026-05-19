// Submit testimonial from public site
// Stores testimonials with "pending" status for admin moderation

const { getStore } = require('@netlify/blobs');

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
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    // Parse request body
    const data = JSON.parse(event.body);
    
    // Validate required fields
    if (!data.name || !data.text) {
      return {
        statusCode: 400,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify({ 
          error: 'Missing required fields',
          required: ['name', 'text']
        })
      };
    }

    // Sanitize and validate data
    const testimonial = {
      name: data.name.trim().substring(0, 100),
      text: data.text.trim().substring(0, 1000),
      rating: Math.min(Math.max(parseInt(data.rating) || 5, 1), 5),
      duration: data.duration ? data.duration.trim().substring(0, 50) : '',
      image: data.image || '',
      status: 'pending', // Always pending for public submissions
      submittedAt: new Date().toISOString(),
      language: data.language || 'fr'
    };

    // Get store
    const store = getStore({
      name: 'site-data',
      siteID: process.env.NETLIFY_SITE_ID || event.headers['x-nf-site-id'],
      token: process.env.NETLIFY_TOKEN || process.env.NETLIFY_AUTH_TOKEN
    });

    // Load current content
    const contentStr = await store.get('site-content');
    if (!contentStr) {
      throw new Error('Site content not found');
    }

    const content = JSON.parse(contentStr);

    // Initialize testimonials array if needed
    if (!content.content[testimonial.language]) {
      content.content[testimonial.language] = {};
    }
    if (!content.content[testimonial.language].testimonials) {
      content.content[testimonial.language].testimonials = { items: [] };
    }
    if (!Array.isArray(content.content[testimonial.language].testimonials.items)) {
      content.content[testimonial.language].testimonials.items = [];
    }

    // Add testimonial to the beginning of the array
    content.content[testimonial.language].testimonials.items.unshift(testimonial);

    // Save updated content
    await store.set('site-content', JSON.stringify(content, null, 2));

    console.log(`✅ Testimonial submitted: ${testimonial.name} (${testimonial.language})`);

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({
        success: true,
        message: 'Testimonial submitted successfully. It will be reviewed before publication.',
        testimonial: {
          name: testimonial.name,
          submittedAt: testimonial.submittedAt
        }
      })
    };

  } catch (error) {
    console.error('❌ Error submitting testimonial:', error);
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({
        error: 'Failed to submit testimonial',
        message: error.message
      })
    };
  }
};

// Made with Bob