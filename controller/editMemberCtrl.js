const members = require("../model/memberModel");
const bcrypt = require("bcryptjs");
const { EncryptStr } = require("../controller/encryption");
async function editMember(req, res) {
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

  const { id } = req.params;
  const salt = await bcrypt.genSalt();
  const hashPassword = await bcrypt.hash(password, salt);
  let updateMember = {
    membername,
    team,
    email,
    mobile,
    username,
    password: hashPassword,
    createdby: loginuser,
    role,
  };
  if (role == "superadmin") {
    const member = await members
      .findOne({
        $and: [
          { smtpemail: req.body.smtpemail },
          { smtppass: req.body.smtppass },
        ],
      })
      .count();
    let smtpemail = req.body.smtpemail;
    let smtppass = req.body.smtppass;
    if (member > 0) {
    } else {
      smtpemail = req.body.smtpemail;
      smtppass = EncryptStr(req.body.smtppass);
    }
    updateMember = {
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

  try {
    if (id !== "") {
      await members
        .findByIdAndUpdate({ _id: id }, updateMember)
        .then()
        .catch((err) => {
          if (err) {
            res.status(422).json({ success: false, message: err.message });
          }
        });
      res
        .status(200)
        .json({ success: true, message: "Data updated successfully" });
    }
  } catch (err) {
    res.status(422).json({ success: false, message: err.message });
  }
}

module.exports = editMember;
