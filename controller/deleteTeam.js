const teams = require("../model/team");

async function deleteTeam(req, res) {
  try {
    const { id } = req.params;
    if (id !== "") {
      await teams.deleteOne({ _id: id });
      res
        .status(200)
        .json({ success: true, message: "Data successfully deleted." });
    }
  } catch (err) {
    res.status(422).json({ success: false, message: err.message });
  }
}

module.exports = deleteTeam;
