// hackathon-feb\src\lib\email\gmail.ts
import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASS
  }
})

export async function sendOTP(email: string, otp: string) {
  const mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject: 'Verify your MathGenius AI account',
    html: `
      <div style="
        font-family: 'Segoe UI', Arial, sans-serif;
        max-width: 600px;
        margin: 0 auto;
        padding: 40px;
        background: linear-gradient(to bottom right, #ffffff, #f3f4f6);
        border-radius: 16px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      ">
        <div style="text-align: center; margin-bottom: 32px;">
          <h1 style="
            color: #4F46E5;
            font-size: 28px;
            margin: 0;
            padding-bottom: 16px;
            border-bottom: 2px solid #e5e7eb;
          ">
            Welcome to MathGenius AI
          </h1>
        </div>

        <div style="text-align: center; padding: 24px 0;">
          <p style="
            font-size: 16px;
            color: #374151;
            margin-bottom: 16px;
          ">
            Your verification code is:
          </p>
          
          <div style="
            background: #4F46E5;
            color: white;
            font-size: 36px;
            font-weight: bold;
            padding: 16px 32px;
            border-radius: 8px;
            letter-spacing: 4px;
            margin: 24px 0;
            display: inline-block;
          ">
            ${otp}
          </div>

          <p style="
            font-size: 14px;
            color: #6B7280;
            margin-top: 24px;
          ">
            This code will expire in 10 minutes
          </p>
        </div>

        <div style="
          text-align: center;
          margin-top: 32px;
          padding-top: 24px;
          border-top: 2px solid #e5e7eb;
          color: #6B7280;
          font-size: 12px;
        ">
          <p>© ${new Date().getFullYear()} MathGenius AI. All rights reserved.</p>
        </div>
      </div>
    `
  }

  try {
    await transporter.sendMail(mailOptions)
    return true
  } catch (error) {
    console.error('Error sending email:', error)
    return false
  }
}
