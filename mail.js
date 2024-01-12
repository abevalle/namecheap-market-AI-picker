import 'dotenv/config';
import NodeMailer from 'nodemailer'
import { toFile } from 'openai';

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


export const sendMail = async (reciever, dataUrl = "<p>Nothing Here</p>") => {
    // send mail with defined transport object
    const info = await transporter.sendMail({
      from: '"Auction AI 👻" <domain-auction@valle.us>', // sender address
      to: `${reciever}, ${reciever}`, // list of receivers
      subject: "Hello ✔ Here's your Domain List", // Subject line
      text: "Hello world?", // plain text body
      html: "<b>Here is your daily auction list</b>"
      + "<br></br>"
      + `<p><a href=\"${dataUrl}\">Domain List Download</a></p>`
      + `<p>${dataUrl}</p>`
    });
  
    console.log("Message sent: %s", info.messageId);
  }

  export const sendAttachedMail = async (reciever, dataUrl) => {
    // send mail with defined transport object
    const today = new Date().toISOString()
    const regexp = /^\d\d\d\d-\d\d-\d\d/
    const fileName = "domain_auction_list" + today.search(regexp)
    const info = await transporter.sendMail({
      from: '"Auction AI 👻" <domain-auction@valle.us>', // sender address
      to: `${reciever}, ${reciever}`, // list of receivers
      subject: "Hello ✔ Here's your Domain List", // Subject line
      text: "Hello world?", // plain text body
      html: "<b>Here is your daily auction list</b>",
      attachments: [
        {
          filename: fileName,
          content: toFile(dataUrl, fileName)
        }
      ]
    });
  
    console.log("Message sent: %s", info.messageId);
  }