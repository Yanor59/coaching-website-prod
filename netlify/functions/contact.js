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
  if (event.httpMethod === 'OPTIONS') {
    return json(200, {});
  }

  if (event.httpMethod !== 'POST') {
    return json(405, { error: 'Method not allowed' });
  }

  try {
    const resendApiKey = process.env.RESEND_API_KEY;
    const toEmail = process.env.CONTACT_TO_EMAIL;
    const fromEmail = process.env.CONTACT_FROM_EMAIL;

    if (!resendApiKey || !toEmail || !fromEmail) {
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

    if (!name || !email || !message) {
      return json(400, { error: 'Missing required fields.' });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
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
      console.error('Resend API error:', error);
      return json(502, { error: 'Email provider error.' });
    }

    return json(200, {
      success: true,
      message: 'Email sent successfully.',
      id: data ? data.id : null
    });
  } catch (error) {
    console.error('Contact function error:', error);
    return json(500, {
      error: 'Failed to send email.',
      details: error.message
    });
  }
};

// Made with Bob