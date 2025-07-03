import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Only POST requests allowed' });
  }

  const { email, name } = req.body;

  if (!email) {
    return res.status(400).json({ message: 'Email is required' });
  }

  try {
    const data = await resend.emails.send({ // THIS must exist
      from: 'woof@pawsandpeaks.com.au',
      to: email,
      subject: '🎉 Welcome to the Pack!',
      html: `
        <div style="font-family: sans-serif;">
          <h1>Welcome ${name || 'friend'}! 🐶</h1>
          <p>We're excited to have you join the adventure!</p>
        </div>
      `,
    });

    return res.status(200).json({ message: 'Email sent successfully', data });
  } catch (error) {
    console.error("🔥 Resend API Error:", error);
    return res.status(500).json({ message: 'Email failed', error: error.message || error });
  }
}
