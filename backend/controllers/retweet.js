const Retweet = require("./../models/Retweet");

module.exports.createRetweet = async (req, res) => {
  try {
    const retweet = await Retweet.create(req.body);

    return res.status(200).json({
      data: {
        retweet: { id: retweet.id },
      },
      message: "Retweet published.",
    });
  } catch (err) {
    return res.status(400).json({
      message: "Error while creating retweet.",
    });
  }
};

module.exports.getUserRetweet = async (req, res) => {
  try {
    const retweetInfo = await Retweet.findOne({ where: { id: req.query.id } });

    return res.status(200).json({
      date: { retweet: retweetInfo },
    });
  } catch (err) {
    return res.status(400).json({
      message: "Error while fetching tweet.",
    });
  }
};
