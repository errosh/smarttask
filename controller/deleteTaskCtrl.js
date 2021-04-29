const tasks = require("../model/taskModel");async function deleteTask(req, res) {
     const { id } = req.params;  
    
  try {
    const { id } = req.params;
    if (id !== "") {
      await tasks.deleteOne({ _id: id });
      res
        .status(200)
        .json({ success: true, message: "Data successfully deleted." });
    }
  } catch (err) {
    res.status(422).json({ success: false, message: err.message });
  }
}
module.exports = deleteTask;