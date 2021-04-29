const tasks = require("../model/taskModel");
async function editTask(req, res) {
  const { id } = req.params;
  const {
    tasktitle,
    taskdesc,
    priority,
    startdate,
    targetdate,
    assignto,
    completiondate,
    status,
  } = req.body;
  try {
    if (id !== "") {
      const updateTask = {
        tasktitle,
        taskdesc,
        priority,
        startdate,
        targetdate,
        assignto,
        completiondate,
        status,
      };

      await tasks
        .findByIdAndUpdate({ _id: id }, updateTask, { useFindAndModify: false })
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

module.exports = editTask;
