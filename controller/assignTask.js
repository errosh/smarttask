const tasks = require("../model/taskModel");
const members = require("../model/memberModel");
const OneSignal = require("onesignal-node");
require("dotenv").config();
const client = new OneSignal.Client(
  process.env.ONESIGNAL_APPID,
  process.env.ONESIGNAL_API_KEY
);

async function assignTask(req, res) {
  const { id } = req.params;
  const { assignto, status, tasktitle } = req.body;
  try {
    if (id !== "") {
      const assignUser = await members.findOne(
        { _id: assignto },
        { _id: 0, membername: 1, active: 1 }
      );
      if (req.body.loginusername !== "") {
        if (!assignUser.active) {
          res.status(422).json({
            success: false,
            message: `User login is not active kindaly tell to user for login ones then you will assign task to ${assignUser.membername} `,
          });
          return;
        }

        const updateTask = {
          assignto,
          $push: {
            comments: {
              comment: `Assign Task to ${assignUser.membername}.`,
              status: status,
              updatedby: req.body.loginusername,
              timestamp: Date.now(),
            },
          },
        };
        tasks
          .findByIdAndUpdate({ _id: id }, updateTask, {
            useFindAndModify: false,
          })
          .then()
          .catch((err) => {
            if (err) {
              res.status(422).json({ success: false, message: err.message });
            }
          });

        const member = await members.findOne(
          { _id: assignto },
          { deviceid: 1 }
        );

        const notification = {
          contents: {
            en: `Task [${tasktitle}] Assigned to you by [${req.body.loginusername}],please check your dashboard for more detail.`,
          },
          include_player_ids: member.deviceid,
        };

        const response = await client.createNotification(notification);
      }

      res
        .status(200)
        .json({ success: true, message: "Task Assigned successfully." });
    }
  } catch (err) {
    res.status(422).json({ success: false, message: err.message });
  }
}

module.exports = assignTask;
