const jwt = require("jsonwebtoken");
const members = require("../model/memberModel");

async function isLoggedin(req, res) {
  try {
    let { token } = req.cookies;

    const UserAuthentication = await jwt.verify(token, process.env.JWT_SECRET);

    let User = await members
      .findOne({ _id: UserAuthentication.user })
      .select({ _id: 0, membername: 1, role: 1 });
    res.json({
      islogin: true,
      userinfo: { user: User.membername, role: User.role },
    });
  } catch (error) {
    res.json({ islogin: false, error: error });
  }
}

module.exports = isLoggedin;
