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
      <div style="font-family: Arial, sans-serif; padding: 20px;">
        <h2>Welcome to MathGenius AI!</h2>
        <p>Your verification code is:</p>
        <h1 style="color: #4F46E5; font-size: 32px;">${otp}</h1>
        <p>This code will expire in 10 minutes.</p>
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
