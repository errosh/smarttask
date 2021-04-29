const teams = require("../model/team");

async function editOneTeam(req, res) {
  try {
    const { id } = req.params;
    const team = await teams
      .findById({ _id: id })
      .select({ teamname: 1, _id: 0 });
    res.status(200).json(team);
  } catch (err) {
    res.status(422).json({
      success: false,
      message: err,
    });
  }
}

module.exports = editOneTeam;
