const tasks = require("../model/taskModel");
const members = require("../model/memberModel");
const OneSignal = require("onesignal-node");
require("dotenv").config();
const client = new OneSignal.Client(
  process.env.ONESIGNAL_APPID,
  process.env.ONESIGNAL_API_KEY
);
async function updateTaskStatus(req, res) {
  const { id } = req.params;
  const status = req.body.status;
  let comment = req.body.comment;

  let updateStatus = { status: status };
  if (status === "COMPLETED") {
    updateStatus = { status: status, completiondate: Date.now() };
  }
  try {
    if (id !== "") {
      const updateTask = {
        $set: updateStatus,
        $push: {
          comments: {
            comment: comment,
            status: status,
            updatedby: req.body.loginusername,
            timestamp: Date.now(),
          },
        },
      };
      const updatedTask = await tasks
        .findByIdAndUpdate({ _id: id }, updateTask)
        .then()
        .catch((err) => {
          if (err) {
            res.status(422).json({ success: false, message: err.message });
          }
        });

      const member = await members.findOne(
        { _id: updatedTask.createdby },
        { deviceid: 1 }
      );

      const notification = {
        contents: {
          en: `Task [${updatedTask.tasktitle}] status is updated by [${req.body.loginusername}],please check your dashboard for more detail.`,
        },
        include_player_ids: member.deviceid,
      };

      const response = await client.createNotification(notification);

      res
        .status(200)
        .json({ success: true, message: "Status Updated Successfully." });
    }
  } catch (err) {
    res.status(422).json({ success: false, message: err.message });
  }
}

module.exports = updateTaskStatus;
