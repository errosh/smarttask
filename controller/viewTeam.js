const teams = require("../model/team");

async function viewTeam(req, res) {
  let filter = {};
  if (req.body.loginrole !== "superadmin") {
    filter = {
      $and: [{ createdby: req.body.loginuser }, { teamname: { $ne: "N/A" } }],
    };
  }
  try {
    if (req.body.loginrole !== "superadmin") {
      const result = await teams.find(filter);
      res.status(200).json(result);
    } else {
      const result = await teams
        .find(filter)
        .populate("createdby", { _id: 0, membername: 1 });
      res.status(200).json(result);
    }
  } catch (err) {
    res.json({ error: err });
  }
}

module.exports = viewTeam;
