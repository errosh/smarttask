const nodemailer = require("nodemailer");
const members = require("../model/memberModel");
const { DecryptStr } = require("./encryption");

// async..await is not allowed in global scope, must use a wrapper
async function sendEmail(email, subject, body) {
  try {
    const User = await members.findOne({ role: "superadmin" });

    // create reusable transporter object using the default SMTP transport

    const decpass = DecryptStr(User.smtppass);

    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: User.smtpemail,
        pass: decpass,
      },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: User.smtpemail, // sender address
      to: email, // list of receivers
      subject: subject, // Subject line
      html: body,
    });
  } catch (err) {
    console.error(err);
  }
}

module.exports = sendEmail;
