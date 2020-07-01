const { Router } = require('express');
const router = Router();
const nodemailer = require("nodemailer");


router.post('/send-email', async (req, res) => {
    console.log(req.body);

    const { name, email, phone, message } = req.body;

    let testAccount = await nodemailer.createTestAccount();

  
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: testAccount.user, // generated ethereal user
        pass: testAccount.pass, // generated ethereal password
      },
      tls: {
          rejectUnauthorized: false
      }
    });
  
    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: `${name}`, // sender address
      to: email, // list of receivers
      subject: "Hola ✔", // Subject line
      text: "Hola con Nodemailer", // plain text body
      html: `<b>${message}</b>`, // html body
    });
  
    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
  
    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...

    res.redirect('../succes.html')
})

module.exports = router