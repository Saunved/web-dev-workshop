const Tweet = require("./../models/Tweet");
const User = require("./../models/User");

module.exports.createTweet = async (req, res) => {
  try {
    const { body, hashtag } = req.body;
    const userId = req.user.id;
    const tweet = await Tweet.create({ userId, body, hashtag });
    return res.status(201).json({
      data: {
        tweet: { id: tweet.id, body: tweet.body }
      },
      message: "Tweet published."
    });
  } catch (err) {
    return res.status(500).json({
      message: "Error while creating tweet."
    });
  }
};

module.exports.getTweet = async (req, res) => {
  try {
    const tweet = await Tweet.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ["name", "handle"]
        }
      ]
    });
    return res.status(200).json({
      data: { tweet: tweet }
    });
  } catch (err) {
    return res.status(500).json({
      message: "Error while fetching tweet."
    });
  }
};

module.exports.getUserTweets = async (req, res) => {
  try {
    const tweets = await Tweet.findAll({
      include: [
        {
          model: User,
          attributes: ["name", "handle"]
        }
      ],
      where: { userId: req.params.userId }
    });

    return res.status(200).json({
      data: { tweets: tweets }
    });
  } catch (err) {
    return res.status(500).json({
      message: "Error while fetching user tweets."
    });
  }
};

module.exports.getTweets = async (req, res) => {
  try {
    // Fetch tweets sorted by createdAt in desc order
    const tweets = await Tweet.findAll({
      include: [
        {
          model: User,
          attributes: ["name", "handle"]
        }
      ],
      order: [["createdAt", "DESC"]]
    });

    return res.status(200).json({
      data: { tweets: tweets }
    });
  } catch (err) {
    return res.status(500).json({
      message: "Error while fetching tweets."
    });
  }
};

module.exports.getTweetsByHashtag = async (req, res) => {
  try {
    // Fetch tweets by hashtag sorted in desc order of createdAt
    const hashtag = req.params.hashtag;
    const tweets = await Tweet.findAll({
      include: [
        {
          model: User,
          attributes: ["name", "handle"]
        }
      ],
      where: {
        hashtag: hashtag
      },
      order: [["createdAt", "DESC"]]
    });

    return res.status(200).json({
      data: { tweets: tweets }
    });
  } catch (err) {
    return res.status(500).json({
      message: "Error while fetching tweets by hashtag."
    });
  }
};

module.exports.getTweetsByHandle = async (req, res) => {
  try {
    // Fetch tweets by handle, sorted in desc order of createdAt
    const handle = req.params.handle;
    const tweets = await Tweet.findAll({
      include: [
        {
          model: User,
          attributes: ["name", "handle"],
          where: { handle: handle },
          required: true
        }
      ],
      order: [["createdAt", "DESC"]]
    });

    const tweetsWithUser = tweets.map((tweet) => {
      const { name, handle } = tweet.User;
      return {
        ...tweet.dataValues,
        name,
        handle
      };
    });

    return res.status(200).json({
      data: { tweets: tweetsWithUser }
    });
  } catch (err) {
    return res.status(500).json({
      message: "Error while fetching tweets by handle."
    });
  }
};
