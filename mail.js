import 'dotenv/config';
import NodeMailer from 'nodemailer'

const transporter = NodeMailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: process.env.SMTP_SSL,
    auth: {
      // TODO: replace `user` and `pass` values from <https://forwardemail.net>
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });


export const sendMail = async (reciever, htmlStringData = "<p>Nothing Here</p>") => {
    // send mail with defined transport object
    const info = await transporter.sendMail({
      from: '"Auction AI 👻" <domain-auction@valle.us>', // sender address
      to: `${reciever}, ${reciever}`, // list of receivers
      subject: "Hello ✔ Here's your Domain List", // Subject line
      text: "Hello world?", // plain text body
      html: "<b>Here is your daily auction list</b>"
      + "</br>"
      + htmlStringData,
    });
  
    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
  
    //
    // NOTE: You can go to https://forwardemail.net/my-account/emails to see your email delivery status and preview
    //       Or you can use the "preview-email" npm package to preview emails locally in browsers and iOS Simulator
    //       <https://github.com/forwardemail/preview-email>
    //
  }