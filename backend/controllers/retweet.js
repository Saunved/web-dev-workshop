const Tweet = require("./../models/Tweet");
const throwException = require("./../utils/error");

module.exports.createRetweet = async (req, res, next) => {
  try {
    const tweetId = req.params.tweetId;
    const tweet = await Tweet.findByPk(tweetId);
    if (!tweet) {
      throwException(`Tweet with id ${tweetId} does not exist!`, 404);
    }

    const user = req.user;
    await user.addRetweets(tweetId);

    return res.status(201).json({
      message: "Retweet published."
    });
  } catch (err) {
    next(err);
  }
};

module.exports.removeRetweet = async (req, res, next) => {
  try {
    const tweetId = req.params.tweetId;
    const tweet = await Tweet.findByPk(tweetId);
    if (!tweet) {
      throwException(`Tweet with id ${tweetId} does not exist!`, 404);
    }

    const user = req.user;
    await user.removeRetweets(tweetId);

    return res.status(200).json({
      message: "Retweet removed."
    });
  } catch (err) {
    next(err);
  }
};
