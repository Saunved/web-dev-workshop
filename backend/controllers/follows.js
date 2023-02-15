const Follows = require("./../models/Follows");

module.exports.createFollows = async (req, res) => {
  try {
    // Add tag to Follows model
    console.log("creating follows")
    const follows = await Follows.create(req.body);

    return res.status(200).json({
      data: { follows: { id: follows.id } },
      message: "Follows created.",
    });
  } catch (err) {
    console.log("#####" + err);
    return res.status(400).json({
      message: "Error while creating Follows.",
    });
  }
};

module.exports.getFollows = async (req, res) => {
  try {
    const follows = await Follows.findOne({ where: { id: req.query.id } });

    return res.status(200).json({
      data: { follows: follows },
    });
  } catch (err) {
    return res.status(400).json({
      message: "Error while fetching follows.",
    });
  }
};
