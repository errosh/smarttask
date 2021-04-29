const mongoose = require("mongoose");

const teamSchema = mongoose.Schema({
  teamname: {
    type: "string",
    required: true,
    unique: true,
  },
  createdby: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "member",
  },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("team", teamSchema);
