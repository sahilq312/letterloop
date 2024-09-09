import nodemailer, { createTransport } from 'nodemailer';

export const transporter = createTransport({
  port: 465,
  host: "smtp.gmail.com",
  auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.PASSWORD_USER,
  },
  secure: true, // upgrades later with STARTTLS -- change this based on the PORT
});
 

/*
export async function sendOTPEmail(to: string, otp: number) {
    const mailOptions = {
      from: 'verify.letterloop@gmail.com',
      to,
      subject: 'Your OTP Code',
      text: `Your OTP code is ${otp}. It will expire in 10 minutes.`,
    };
  
    await transporter.sendMail(mailOptions);
  } */