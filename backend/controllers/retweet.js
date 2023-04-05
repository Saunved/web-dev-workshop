module.exports.createRetweet = async (req, res) => {
  try {
    const tweetId = req.params.tweetId;
    const user = req.user;
    const retweet = await user.addRetweets(tweetId);

    return res.status(201).json({
      data: {
        retweet
      },
      message: "Retweet published."
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Error while creating retweet."
    });
  }
};

module.exports.removeRetweet = async (req, res) => {
  try {
    const tweetId = req.params.tweetId;
    const user = req.user;
    const retweet = await user.removeRetweets(tweetId);

    return res.status(201).json({
      data: {
        retweet
      },
      message: "Retweet removed."
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Error while removing retweet."
    });
  }
};
