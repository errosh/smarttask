const members = require("../model/memberModel");
async function viewMember(req, res) {
  let filter = {};
  if (req.body.loginrole !== "superadmin") {
    filter = {
      $and: [
        { role: { $ne: "superadmin" } },
        { createdby: req.body.loginuser },
      ],
    };
  }
  try {
    if (req.body.loginrole !== "superadmin") {
      const result = await members
        .find(filter, { password: 0 })
        .populate("team")
        .exec();
      res.status(200).json(result);
    } else {
      const result = await members
        .find(filter, { password: 0 })
        .populate("team createdby", { membername: 1, teamname: 1, _id: 0 })
        .exec();
      res.status(200).json(result);
    }
  } catch (err) {
    res.json({ error: err });
  }
}

module.exports = viewMember;
