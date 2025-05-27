import nodemailer from "nodemailer"
export const nodemailerHelper = async (customEmail, subject, html) => {
  // Create a transporter object
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // use false for STARTTLS; true for SSL on port 465
    auth: {
      user: process.env.YOUR_GMAIL_ADDRESS,
      pass: process.env.YOUR_APP_PASSWORD,
    }
  });

  // Configure the mailoptions object
  const mailOptions = {
    from: process.env.YOUR_GMAIL_ADDRESS,
    to: customEmail,
    subject: subject,
    html: html
  };

  // Send the email
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log('Error:', error);
    } else {
      console.log('Email sent: ', info.response);
    }
  });
}