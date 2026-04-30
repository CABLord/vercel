
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request) {
  try {
    const body = await request.json();
    const {
      locale,
      name,
      email,
      phone,
      service,
      pickup,
      dropoff,
      date,
      message,
      consent,
      website
    } = body || {};

    if (website) {
      return Response.json({ ok: true, message: 'OK' }, { status: 200 });
    }

    if (!name || !email || !message || !consent) {
      return Response.json(
        { ok: false, error: 'Missing required fields.' },
        { status: 400 }
      );
    }

    if (!emailRegex.test(email)) {
      return Response.json(
        { ok: false, error: 'Invalid email address.' },
        { status: 400 }
      );
    }

    const to = process.env.CONTACT_TO_EMAIL;
    const apiKey = process.env.RESEND_API_KEY;

    if (!to || !apiKey) {
      return Response.json(
        {
          ok: false,
          error:
            'Email service not configured. Add RESEND_API_KEY and CONTACT_TO_EMAIL to enable submissions.'
        },
        { status: 500 }
      );
    }

    const details = [
      `Locale: ${locale || 'n/a'}`,
      `Name: ${name}`,
      `Email: ${email}`,
      `Phone: ${phone || 'n/a'}`,
      `Service: ${service || 'n/a'}`,
      `Pickup: ${pickup || 'n/a'}`,
      `Dropoff: ${dropoff || 'n/a'}`,
      `Date: ${date || 'n/a'}`,
      '',
      message
    ].join('\n');

    const resendResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: 'Taxi James Website <onboarding@resend.dev>',
        to: [to],
        subject: `New Taxi James request from ${name}`,
        text: details,
        reply_to: email
      })
    });

    if (!resendResponse.ok) {
      const error = await resendResponse.text();
      return Response.json(
        { ok: false, error: `Unable to send email. ${error}` },
        { status: 502 }
      );
    }

    return Response.json({ ok: true, message: 'Message sent successfully.' }, { status: 200 });
  } catch (error) {
    return Response.json(
      { ok: false, error: error?.message || 'Unexpected error.' },
      { status: 500 }
    );
  }
}
