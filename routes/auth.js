const jwt = require("jsonwebtoken");
const members = require("../model/memberModel");

async function Authentication(req, res, next) {
  try {
    let { token } = req.cookies;

    const UserAuthentication = await jwt.verify(token, process.env.JWT_SECRET);
    const User = await members.findOne({ _id: UserAuthentication.user });
    req.body.loginuser = User._id;
    req.body.loginusername = User.username.toUpperCase();
    req.body.loginrole = User.role;
    next();
  } catch (error) {
    res.status(401).json({ error: "Unauthorized" });
  }
}

module.exports = Authentication;
