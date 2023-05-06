// "use strict";
import nodemailer from 'nodemailer'
import Env from '@ioc:Adonis/Core/Env'

// async..await is not allowed in global scope, must use a wrapper
async function mail(to:String, quote:Number, description:String) {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    service:'gmail',
    auth: {
      user: Env.get('EMAIL_USER'), // generated ethereal user
      pass: Env.get('EMAIL_PASSWORD'), // generated ethereal password
    },
  });
  transporter.verify(function (error:any) {
    if (error) {
      console.log(error);
    } else {
      console.log("Server is ready to take our messages");
    }
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: `"Meydit" <${Env.get('EMAIL_USER')}>`, // sender address
    // from: Env.get('EMAIL_USER'), // sender address
    to: to, // list of receivers
    subject: "New Quotation", // Subject line
    text: `You have received a new quotaion of ${quote}.`, // plain text body
    html: `<h3>${description}</h3>`, // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

}

// main().catch(console.error);
export default mail;