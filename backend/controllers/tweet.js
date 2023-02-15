const Tweet = require("./../models/Tweet");

module.exports.createTweet = async (req, res) => {
  try {
    // Create password hash
    console.log("Logged the request");
    console.log(req.body);
    const tweet = await Tweet.create(req.body);
    return res.status(200).json({
      data: {
        tweet: { id: tweet.id, body: tweet.body, createdAt: tweet.createdAt },
      },
      message: "Tweet published.",
    });
  } catch (err) {
    return res.status(400).json({
      message: "Error while creating tweet.",
    });
  }
};

module.exports.getUserTweets = async (req, res) => {
  try {
    console.log("Logged request.");
    const tweetInfo = await Tweet.find({ where: { userId: req.query.userId } });
    return res.status(200).json({
      date: { tweet: tweetInfo },
    });
  } catch (err) {
    return res.status(400).json({
      message: "Error while fetching tweet.",
    });
  }
};
