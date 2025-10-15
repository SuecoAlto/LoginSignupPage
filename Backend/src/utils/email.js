// Backend/src/utils/email.js
import nodemailer from 'nodemailer';

const sendEmail = async (options) => {
  // 1. Create a "transporter" (the service that sends the email)
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  // 2. Define the email options
  const mailOptions = {
    from: `Your App Name <${process.env.EMAIL_FROM}>`,
    to: options.email,
    subject: options.subject,
    text: options.message,
    // html: (you can also send HTML here)
  };

  // 3. Send the email
  await transporter.sendMail(mailOptions);
};

export default sendEmail;