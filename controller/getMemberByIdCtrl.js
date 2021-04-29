const members = require("../model/memberModel");async function getMemberByID(req, res) { try {
    const { id } = req.params;
    const member = await members
      .findById({ _id: id })
      .select({ _id: 0 });
    res.status(200).json(member);
  } catch (err) {
    res.status(422).json({
      success: false,
      message: err,
    });
  }
}

module.exports = getMemberByID;