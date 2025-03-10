'use server';

import nodemailer from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';

export async function sendEmail(formData: FormData) {
  const rawFormData = {
    honeypot: formData.get('honeypot'),
    email: formData.get('email'),
    message: formData.get('message'),
  };

  if (rawFormData.honeypot) {
    return;
  }

  const transport = nodemailer.createTransport({
    service: 'gmail',
    /* 
      setting service as 'gmail' is same as providing these settings:
      host: "smtp.gmail.com",
      port: 465,
      secure: true
      If you want to use a different email provider other than gmail, you need to provide these manually.
      Or you can go use these well known services and their settings at
      https://github.com/nodemailer/nodemailer/blob/master/lib/well-known/services.json
  */
    auth: {
      user: process.env.MY_EMAIL,
      pass: process.env.MY_PASSWORD,
    },
  });

  const mailOptions: Mail.Options = {
    from: process.env.MY_EMAIL,
    to: process.env.MY_EMAIL,
    // cc: email, (uncomment this line if you want to send a copy to the sender)
    subject: `Message from ${rawFormData.email}`,
    text: rawFormData.message as string,
  };

  const sendMailPromise = () =>
    new Promise<string>((resolve, reject) => {
      transport.sendMail(mailOptions, function (err) {
        if (!err) {
          resolve('Email sent');
        } else {
          reject(err.message);
        }
      });
    });

  try {
    await sendMailPromise();
  } catch (err) {
    console.error(err);
    throw new Error('Email not sent');
  }
}
