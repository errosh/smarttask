const teams = require("../model/team");

async function addTeam(req, res) {
  const { teamname, loginuser } = req.body;
  try {
    const addTeam = await teams({
      teamname: teamname,
      createdby: loginuser,
    });

    addTeam
      .save()
      .then(() =>
        res.json({ success: true, message: "Data added successfully!" })
      )
      .catch((err) => {
        if (err) {
          if (err.name === "MongoError" && err.code === 11000) {
            // Duplicate Team
            return res
              .status(422)
              .send({ success: false, message: "Team Name already exist!" });
          }
          // Some other error
          return res.status(422).send(err);
        }
      });
  } catch (err) {
    res.json({ success: false, message: err });
  }
}

module.exports = addTeam;
