const { Resend } = require('resend');

function json(statusCode, body) {
  return {
    statusCode,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Methods': 'POST, OPTIONS'
    },
    body: JSON.stringify(body)
  };
}

function escapeHtml(value) {
  return String(value || '')
    .replace(/&/g, '&')
    .replace(/</g, '<')
    .replace(/>/g, '>')
    .replace(/"/g, '"')
    .replace(/'/g, '&#039;');
}

exports.handler = async (event) => {
  console.log('📨 contact function invoked', {
    method: event.httpMethod,
    hasBody: !!event.body
  });

  if (event.httpMethod === 'OPTIONS') {
    return json(200, {});
  }

  if (event.httpMethod !== 'POST') {
    console.log('❌ Invalid method for contact function:', event.httpMethod);
    return json(405, { error: 'Method not allowed' });
  }

  try {
    const resendApiKey = process.env.RESEND_API_KEY;
    const toEmail = process.env.CONTACT_TO_EMAIL;
    const fromEmail = process.env.CONTACT_FROM_EMAIL;

    console.log('🔧 contact env check', {
      hasResendApiKey: !!resendApiKey,
      hasToEmail: !!toEmail,
      hasFromEmail: !!fromEmail,
      fromEmailPreview: fromEmail || null,
      toEmailPreview: toEmail || null
    });

    if (!resendApiKey || !toEmail || !fromEmail) {
      console.error('❌ Missing contact env vars');
      return json(500, {
        error: 'Email service not configured. Missing RESEND_API_KEY, CONTACT_TO_EMAIL or CONTACT_FROM_EMAIL.'
      });
    }

    const resend = new Resend(resendApiKey);
    const payload = JSON.parse(event.body || '{}');

    const name = String(payload.name || '').trim();
    const email = String(payload.email || '').trim();
    const phone = String(payload.phone || '').trim();
    const service = String(payload.service || '').trim();
    const message = String(payload.message || '').trim();
    const language = String(payload.language || 'fr').trim();

    console.log('📝 contact payload parsed', {
      name,
      email,
      hasPhone: !!phone,
      service,
      language,
      messageLength: message.length
    });

    if (!name || !email || !message) {
      console.error('❌ Missing required contact fields');
      return json(400, { error: 'Missing required fields.' });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      console.error('❌ Invalid sender email:', email);
      return json(400, { error: 'Invalid email address.' });
    }

    const serviceLabels = {
      individual: 'Coaching individuel',
      group: 'Séances en groupe',
      online: 'Programme en ligne'
    };

    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safePhone = escapeHtml(phone || 'Non renseigné');
    const safeService = escapeHtml(serviceLabels[service] || service || 'Non renseigné');
    const safeLanguage = escapeHtml(language);
    const safeMessage = escapeHtml(message).replace(/\n/g, '<br>');

    const subject = `Nouveau message site web - ${name}`;

    console.log('🚀 Sending email with Resend...');
    const { data, error } = await resend.emails.send({
      from: fromEmail,
      to: [toEmail],
      reply_to: email,
      subject,
      html: `
        <h2>Nouveau message depuis le site Alina Coaching</h2>
        <p><strong>Nom :</strong> ${safeName}</p>
        <p><strong>Email :</strong> ${safeEmail}</p>
        <p><strong>Téléphone :</strong> ${safePhone}</p>
        <p><strong>Service :</strong> ${safeService}</p>
        <p><strong>Langue :</strong> ${safeLanguage}</p>
        <hr>
        <p><strong>Message :</strong></p>
        <p>${safeMessage}</p>
      `,
      text: [
        'Nouveau message depuis le site Alina Coaching',
        `Nom: ${name}`,
        `Email: ${email}`,
        `Téléphone: ${phone || 'Non renseigné'}`,
        `Service: ${serviceLabels[service] || service || 'Non renseigné'}`,
        `Langue: ${language}`,
        '',
        'Message:',
        message
      ].join('\n')
    });

    if (error) {
      console.error('❌ Resend API error:', JSON.stringify(error, null, 2));
      return json(502, { error: 'Email provider error.' });
    }

    console.log('✅ Email sent successfully via Resend', {
      id: data ? data.id : null
    });

    return json(200, {
      success: true,
      message: 'Email sent successfully.',
      id: data ? data.id : null
    });
  } catch (error) {
    console.error('❌ Contact function error:', error);
    return json(500, {
      error: 'Failed to send email.',
      details: error.message
    });
  }
};

// Made with Bob