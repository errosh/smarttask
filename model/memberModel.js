const mongoose = require("mongoose");
const memberSchema = mongoose.Schema({
  membername: { type: String, required: true, unique: true },
  team: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "team" },
  email: { type: String, required: true, unique: true },
  mobile: { type: String },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  date: { type: Date, default: Date.now },
  role: { type: String, required: true },
  createdby: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "member",
  },
  deviceid: { type: Array },
  smtpemail: { type: String },
  smtppass: { type: String },
  active: { type: Boolean },
});
module.exports = mongoose.model("member", memberSchema);
