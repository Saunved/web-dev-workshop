const Follows = require("./../models/Follows");

module.exports.createFollows = async (req, res) => {
  try {
    const follows = await Follows.create(req.body);

    return res.status(201).json({
      data: { follows: { id: follows.id } },
      message: "Follows created.",
    });
  } catch (err) {
    return res.status(500).json({
      message: "Error while following.",
    });
  }
};
