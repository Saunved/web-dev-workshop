const Tweet = require("./../models/Tweet");

module.exports.createTweet = async (req, res) => {
  try {
    const { body, hashtag } = req.body;
    const userId = req.user.id;
    const tweet = await Tweet.create({ userId, body, hashtag });

    return res.status(201).json({
      data: {
        tweet: { id: tweet.id, body: tweet.body, createdAt: tweet.createdAt },
      },
      message: "Tweet published.",
    });
  } catch (err) {
    return res.status(500).json({
      message: "Error while creating tweet.",
    });
  }
};

module.exports.getTweet = async (req, res) => {
  try {
    const tweet = await Tweet.findByPk(req.params.id);

    return res.status(200).json({
      data: { tweet: tweet },
    });
  } catch (err) {
    return res.status(500).json({
      message: "Error while fetching tweet.",
    });
  }
};

module.exports.getUserTweets = async (req, res) => {
  try {
    const tweets = await Tweet.findAll({ where: { userId: req.params.userId } });

    return res.status(200).json({
      data: { tweets: tweets },
    });
  } catch (err) {
    return res.status(500).json({
      message: "Error while fetching tweets.",
    });
  }
};
