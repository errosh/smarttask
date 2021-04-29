const tasks = require("../model/taskModel");async function getTaskByID(req, res) { try {
    const { id } = req.params;
    const task = await tasks
      .findById({ _id: id })
      .select({ _id: 0 });
    res.status(200).json(task);
  } catch (err) {
    res.status(422).json({
      success: false,
      message: err,
    });
  }
}

module.exports = getTaskByID;