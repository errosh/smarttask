const tasks = require("../model/taskModel");
async function viewAssignedTask(req, res) {
  try {
    let filter = {};
    if (req.body.loginrole === "ADMIN") {
      filter = {
        $or: [
          { createdby: req.body.loginuser },
          { assignto: req.body.loginuser },
        ],
      };
    } else if (req.body.loginrole === "USER") {
      filter = {
        $or: [
          { createdby: req.body.loginuser },
          { assignto: req.body.loginuser },
        ],
        $and: [{ status: { $ne: "COMPLETED" } }],
      };
    }

    const result = await tasks
      .find(filter)
      .populate("assignto createdby", { membername: 1, _id: 0 })
      .exec();
    res.status(200).json(result);
  } catch (err) {
    res.json({ error: err });
  }
}

module.exports = viewAssignedTask;
