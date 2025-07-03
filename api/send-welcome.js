import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Only POST allowed' });
  }

  const { email, name } = req.body;

  try {
    const data = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: email,
      subject: '🎉 Welcome to the Pack!',
      html: `
        <div style="font-family: sans-serif;">
          <h1>Welcome ${name || 'friend'}! 🐶</h1>
          <p>We’re so excited to have you join our pack!</p>
        </div>
      `
    });

    return res.status(200).json({ message: 'Email sent', data });
  } catch (error) {
    return res.status(500).json({ message: 'Email failed', error });
  }
}
