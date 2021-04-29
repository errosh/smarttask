const teams = require("../model/team");

async function editTeam(req, res) {
  const { id } = req.params;
  const { teamname } = req.body;
  try {
    if (id !== "") {
      const updateTeam = { teamname };
      teams
        .findByIdAndUpdate({ _id: id }, updateTeam)
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

module.exports = editTeam;
