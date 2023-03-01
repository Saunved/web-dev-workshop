const Retweet = require("./../models/Retweet");

module.exports.createRetweet = async (req, res) => {
  try {
    const tweetId = req.params.tweetId;
    const userId = req.user.id;
    const retweet = await Retweet.create({ tweetId, userId });

    return res.status(201).json({
      data: {
        retweet: { id: retweet.id }
      },
      message: "Retweet published."
    });
  } catch (err) {
    return res.status(500).json({
      message: "Error while creating retweet."
    });
  }
};
