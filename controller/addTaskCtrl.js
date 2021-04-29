const tasks = require("../model/taskModel");
const members = require("../model/memberModel");
const OneSignal = require("onesignal-node");
require("dotenv").config();
const client = new OneSignal.Client(
  process.env.ONESIGNAL_APPID,
  process.env.ONESIGNAL_API_KEY
);

async function addTask(req, res) {
  const {
    tasktitle,
    taskdesc,
    priority,
    startdate,
    targetdate,
    assignto,
    completiondate,
    status,
    loginuser,
  } = req.body;

  try {
    let filter = { _id: assignto };
    let newassignto = assignto;
    if (assignto === "") {
      filter = { membername: "N/A" };
    }
    const assignUser = await members.findOne(filter, { membername: 1 });
    let comment = [
      {
        comment: `Assign Task to ${assignUser.membername}.`,
        status: "Assigned",
        updatedby: req.body.loginusername,
        timestamp: Date.now(),
      },
    ];
    if (assignto === "") {
      comment = [];
      newassignto = assignUser._id;
    }

    const addTask = new tasks({
      tasktitle,
      taskdesc,
      priority,
      startdate,
      targetdate,
      assignto: newassignto,
      completiondate,
      status,
      createdby: loginuser,
      comments: comment,
    });

    const addedTask = await addTask
      .save()
      .then((err) => {
        if (assignto !== "") {
          const member = members.findOne({ _id: assignto }, { deviceid: 1 });
          if (member.deviceid !== null) {
            const notification = {
              contents: {
                en: `Task [${tasktitle}] Assigned to you by [${req.body.loginusername}],please check your dashboard for more detail.`,
              },
              include_player_ids: member.deviceid,
            };

            client.createNotification(notification);
          }
        }

        res.json({ success: true, message: "Data added successfully!" });
      })
      .catch((err) => {
        if (err) {
          if (err.name === "MongoError" && err.code === 11000) {
            // Duplicate Task Title
            return res
              .status(422)
              .send({ success: false, message: "Task Title already exist!" });
          }
          // Some other error
          return res.status(422).json(err);
        }
      });
  } catch (err) {
    res.status(422).json({ success: false, message: err });
  }
}
module.exports = addTask;
