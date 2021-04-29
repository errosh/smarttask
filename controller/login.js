const members = require("../model/memberModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

async function login(req, res) {
  try {
    let username = req.body.username;

    let User = await members.findOne({ username: username }, { password: 1 });

    let VerifyUser = await bcrypt.compare(req.body.password, User.password);

    if (VerifyUser) {
      let token = await jwt.sign({ user: User._id }, process.env.JWT_SECRET);

      await members.findByIdAndUpdate(
        { _id: User._id },
        { $set: { deviceid: [req.body.deviceid], active: true } }
      );

      res.cookie("token", token, {
        expires: new Date(253402300000000),
        httpOnly: true,
        credentials: true,
        secure: true,
      });

      // res.cookie("token", token, {
      //   expires: new Date(253402300000000),
      //   httpOnly: true,
      //   credentials: true,
      // });
      return res.status(200).json({
        success: true,
        message: "Authorized!",
      });
    } else {
      return res.status(401).send({
        success: false,
        message: "Unauthorized!",
      });
    }
  } catch (error) {
    return res.status(401).send({
      success: false,
      message: "Unauthorized!",
    });
  }
}

module.exports = login;
