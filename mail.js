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

  const emailTemplate = (clientName, currentDate, auctionSiteLink, yourName, companyName, contactInformation) => `
  <!DOCTYPE html>
  <html>
  <head>
      <title>Daily Domain List</title>
      <style>
          body {
              font-family: Arial, sans-serif;
              background-color: #f4f4f4;
              color: #333;
              line-height: 1.6;
          }
          .container {
              width: 80%;
              margin: 0 auto;
              background: #fff;
              padding: 20px;
              box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          }
          .footer {
              font-size: 0.8em;
              text-align: center;
          }
          a {
              color: #007bff;
          }
      </style>
  </head>
  <body>
      <div class="container">
          <h2>Daily Domain List - ${currentDate}</h2>
          <p>Hello ${clientName},</p>
          <p>Attached is your daily domain auction list for ${currentDate}. Please review at your earliest convenience.</p>
          <p>For assistance or bidding, visit <a href="${auctionSiteLink}">our auction site</a> or contact us directly.</p>
          <p>For the best viewing expierence please convert this file to a Google Sheet.</p>
          <p>Best regards,</p>
          <p>${yourName}<br>
          Customer Support Team<br>
          ${companyName}</p>
          <p class="footer">Contact Information: ${contactInformation}</p>
      </div>
  </body>
  </html>
  `;

  export const sendAttachedMail = async (reciever, dataUrl) => {
    // send mail with defined transport object
    const today = new Date().toDateString()
    const regexp = /^\d\d\d\d-\d\d-\d\d/
    const fileName = "domain_auction_list" + today.search(regexp)
    const info = await transporter.sendMail({
      from: '"Auction AI 👻" <domain-auction@valle.us>', // sender address
      to: `${reciever}, ${reciever}`, // list of receivers
      subject: "Hello ✔ Here's your Domain List", // Subject line
      // text: "Hello world?", // plain text body
      html: emailTemplate(reciever,today,'https://www.namecheap.com/market','Abe Valle', 'ValleUS','support@valle.us'),
      attachments: [
        {
          filename: fileName,
          href: dataUrl
        }
      ]
    });
  
    console.log("Message sent: %s", info.messageId);
  }