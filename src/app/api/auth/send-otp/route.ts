import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  try {
    const { email, otp } = await req.json();

    if (!email || !otp) {
      return NextResponse.json({ error: 'Email and OTP are required' }, { status: 400 });
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_SERVER || 'smtp.gmail.com',
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_SENDER_EMAIL,
        pass: process.env.SMTP_SENDER_PASSWORD,
      },
    });

    const mailOptions = {
      from: `"VoiceBridge" <${process.env.SMTP_SENDER_EMAIL}>`,
      to: email,
      subject: 'VoiceBridge - Verification Code',
      text: `Your verification code is: ${otp}\n\nPlease enter this code in the app to continue.`,
      html: `
    <html>
      <body style="font-family: Arial, sans-serif; background-color: #080b14; color: #f0f4ff; padding: 20px; margin: 0;">
        <div style="max-width: 400px; margin: 40px auto; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-radius: 24px; padding: 40px; text-align: center; box-shadow: 0 20px 40px rgba(0,0,0,0.4);">
          <div style="width: 64px; height: 64px; background: linear-gradient(135deg, #7c3aed, #6366f1); border-radius: 18px; margin: 0 auto 24px; display: flex; align-items: center; justify-content: center; box-shadow: 0 0 30px rgba(124,58,237,0.4);">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" x2="12" y1="19" y2="22"/></svg>
          </div>
          <h1 style="color: #ffffff; margin-bottom: 8px; font-size: 24px; font-weight: 800; letter-spacing: -0.5px;">VoiceBridge</h1>
          <p style="font-size: 14px; color: #8b9cc8; margin-bottom: 32px;">Secure Email Verification</p>
          
          <p style="font-size: 15px; color: #a0aec0; margin-bottom: 24px;">Your verification code is:</p>
          
          <div style="font-size: 38px; font-weight: 800; letter-spacing: 12px; color: #ffffff; padding: 24px; background: rgba(124,58,237,0.08); border: 1px solid rgba(124,58,237,0.2); border-radius: 16px; margin-bottom: 24px; font-family: monospace;">
            ${otp}
          </div>
          
          <p style="font-size: 13px; color: #4a5580; margin-bottom: 32px;">This code will expire in 10 minutes. If you didn't request this, please ignore this email.</p>
          
          <div style="border-top: 1px solid rgba(255,255,255,0.05); pt: 24px; font-size: 12px; color: #4a5568;">
            © 2025 VoiceBridge AI. All rights reserved.
          </div>
        </div>
      </body>
    </html>
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    console.error('Error sending email:', error);
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Unknown error' }, { status: 500 });
  }
}
