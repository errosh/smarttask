const mongoose = require("mongoose");
const members = require("../model/memberModel");
const taskSchema = mongoose.Schema({
  tasktitle: { type: String, required: true, unique: true },
  taskdesc: { type: String },
  priority: { type: String, required: true },
  startdate: { type: Date, required: true },
  targetdate: { type: Date, required: true },
  assignto: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "member",
  },
  completiondate: { type: Date },
  status: { type: String, required: true },
  comments: { type: Array },
  createdby: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "member",
  },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("task", taskSchema);
