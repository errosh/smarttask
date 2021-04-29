const members = require("../model/memberModel");
const bcrypt = require("bcryptjs");
const { EncryptStr } = require("../controller/encryption");

const sendEmail = require("../controller/sendEmail");
async function addMember(req, res) {
  let {
    membername,
    team,
    email,
    mobile,
    username,
    password,
    role,
    loginuser,
  } = req.body;

  try {
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);
    let fieldConfig = {
      membername,
      team,
      email,
      mobile,
      username,
      password: hashPassword,
      createdby: loginuser,
      role,
    };

    if (username === "superadmin") {
      const smtpemail = req.body.email;
      const smtppass = EncryptStr(req.body.smtppass);
      fieldConfig = {
        membername,
        team,
        email,
        mobile,
        username,
        password: hashPassword,
        createdby: loginuser,
        role,
        smtpemail,
        smtppass,
      };
    }
    const addMember = await members(fieldConfig);

    addMember
      .save()
      .then(() =>
        res.json({ success: true, message: "Data added successfully!" })
      )
      .catch((err) => {
        if (err) {
          if (err.name === "MongoError" && err.code === 11000) {
            // Duplicate Member Name
            return res.status(422).send({
              success: false,
              message: "Member Name already exist!",
              error: err,
            });
          }
          // Some other error

          return res.status(422).send(err);
        }
      });

    sendEmail(
      email,
      "Welcome to Smart Task",
      `<h2>Your credential for smart task is bellow::</h2><br/>
        <b>Username</b>:${username} <br/> <b>Password</b>:${password} `
    );
  } catch (err) {
    res.json({ success: false, message: err });
  }
}
module.exports = addMember;
