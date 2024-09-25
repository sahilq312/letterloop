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
 
