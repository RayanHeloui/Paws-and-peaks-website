import fs from 'fs';
import path from 'path';
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
    // Read email template
    const filePath = path.resolve('./emails/welcome.html');
    let emailHtml = fs.readFileSync(filePath, 'utf8');

    // Optional: Replace {{name}} placeholders if used in template
    emailHtml = emailHtml.replace(/{{name}}/g, name || 'friend');

    const data = await resend.emails.send({
      from: 'woof@pawsandpeaks.com.au',
      to: email,
      subject: 'Welcome to the Pack!',
      html: emailHtml,
    });

    return res.status(200).json({ message: 'Email sent successfully', data });
  } catch (error) {
    return res.status(500).json({ message: 'Email failed', error: error.message || error });
  }
}
