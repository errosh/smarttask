const tasks = require("../model/taskModel");
async function viewTask(req, res) {
  try {
    const result = await tasks
      .find({ createdby: req.body.loginuser })
      .populate("assignto", { membername: 1 })
      .exec();
    res.status(200).json(result);
  } catch (err) {
    res.json({ error: err });
  }
}

module.exports = viewTask;
