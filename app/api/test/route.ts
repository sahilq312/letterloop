import { createTransport } from 'nodemailer';
import { NextResponse, NextRequest } from 'next/server';

const transporter = createTransport({
  port: 465,
  host: "smtp.gmail.com",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.PASSWORD_USER,
  },
  secure: true, // upgrades later with STARTTLS -- change this based on the PORT
});

export async function POST(req: NextRequest) {
  try {
    const mailOptions = {
      from: "quraishisahil04@gmail.com",
      to: "alexanderpandit6@gmail.com, quraishisahil04outlook.com",
      subject: "test",
      text: "test mail",
    };

    // Wrap sendMail in a Promise
    const sendMailPromise = () =>
      new Promise((resolve, reject) => {
        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            reject(error);
          } else {
            resolve(info);
          }
        });
      });

    // Wait for the mail to be sent
    await sendMailPromise();

    // Return a success response
    return NextResponse.json({ message: "Email sent successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error sending email:", error);
    return new Response("Failed to send email", { status: 400 });
  }
}
