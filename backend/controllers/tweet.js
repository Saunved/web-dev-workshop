const Tweet = require("./../models/Tweet");
const User = require("./../models/User");
const Sequelize = require("sequelize");

const formatTweet = (tweetObj) => {
  const { User: user, LikedBy, ...tweet } = tweetObj.dataValues;

  const formattedTweet = {
    ...tweet,
    name: user.name,
    handle: user.handle
  };

  if ("isLikedByUser" in formattedTweet) {
    formattedTweet.isLikedByUser = formattedTweet.isLikedByUser === 0 ? false : true;
  }

  return formattedTweet;
};

const getFormattedTweets = (tweetObjs) => {
  return tweetObjs.map((tweetObj) => {
    return formatTweet(tweetObj);
  });
};

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
    console.error(err);
    return res.status(500).json({
      message: "Error while creating tweet."
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
          attributes: ["id", "name", "handle"]
        }
      ],
      order: [["createdAt", "DESC"]]
    });

    return res.status(200).json({
      data: { tweets: getFormattedTweets(tweets) }
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "Error while fetching tweets."
    });
  }
};

module.exports.getTweet = async (req, res) => {
  try {
    const tweetId = req.params.id;
    const userId = req.user.id;
    const tweetObj = await Tweet.findByPk(tweetId, {
      attributes: [
        "id",
        "body",
        [Sequelize.fn("COUNT", Sequelize.col("LikedBy.id")), "likeCount"],
        [
          Sequelize.literal(
            `EXISTS(SELECT * FROM user_tweets_likes WHERE TweetId = ${tweetId} AND UserId = ${userId})`
          ),
          "isLikedByUser"
        ]
      ],
      include: [
        {
          model: User,
          attributes: ["id", "name", "handle"]
        },
        {
          model: User,
          as: "LikedBy",
          where: { id: userId },
          attributes: ["id"],
          through: { attributes: ["userId"] }
        }
      ]
    });

    return res.status(200).json({
      data: { tweet: formatTweet(tweetObj) }
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "Error while fetching tweet."
    });
  }
};

module.exports.getUserTweets = async (req, res) => {
  try {
    const userId = req.user.id;
    const tweets = await Tweet.findAll({
      where: { userId: userId },
      attributes: [
        "id",
        "body",
        [Sequelize.fn("COUNT", Sequelize.col("LikedBy.id")), "likeCount"],
        [
          Sequelize.literal(
            `EXISTS(SELECT * FROM user_tweets_likes WHERE TweetId = Tweet.id AND UserId = ${userId})`
          ),
          "isLikedByUser"
        ]
      ],
      include: [
        {
          model: User,
          attributes: ["id", "name", "handle"]
        },
        {
          model: User,
          as: "LikedBy",
          attributes: ["id"]
        }
      ],
      group: ["Tweet.id", "User.id"]
    });

    return res.status(200).json({
      data: { tweets: getFormattedTweets(tweets) }
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "Error while fetching user tweets."
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
          attributes: ["id", "name", "handle"]
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
    console.error(err);
    return res.status(500).json({
      message: "Error while fetching tweets by hashtag."
    });
  }
};

module.exports.getFollowingTweets = async (req, res) => {
  try {
    const user = req.user;
    const followingUsers = await user.getFollowing({ attributes: ["id"] });
    const followingUserIds = followingUsers.map((user) => user.id);

    const tweets = await Tweet.findAll({
      where: {
        userId: {
          [Sequelize.Op.in]: followingUserIds
        }
      },
      attributes: [
        "id",
        "body",
        [Sequelize.fn("COUNT", Sequelize.col("LikedBy.id")), "likeCount"],
        [
          Sequelize.literal(
            `EXISTS(SELECT * FROM user_tweets_likes WHERE TweetId = Tweet.id AND UserId = ${user.id})`
          ),
          "isLikedByUser"
        ]
      ],
      include: [
        {
          model: User,
          attributes: ["id", "name", "handle"]
        },
        {
          model: User,
          as: "LikedBy",
          attributes: ["id"]
        }
      ],
      order: [["createdAt", "ASC"]],
      group: ["Tweet.id", "User.id"]
    });

    return res.status(200).json({
      data: { tweets: getFormattedTweets(tweets) }
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Error while liking tweet"
    });
  }
};

module.exports.likeTweet = async (req, res) => {
  try {
    const tweet = await Tweet.findOne({ where: { id: req.params.id } });
    await tweet.addLikedBy(req.user.id);

    return res.status(200).json({
      data: { message: "Liked tweet" }
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Error while liking tweet"
    });
  }
};

module.exports.unlikeTweet = async (req, res) => {
  try {
    const tweet = await Tweet.findOne({ where: { id: req.params.id } });
    await tweet.removeLikedBy(req.user.id);

    return res.status(200).json({
      data: { message: "Unliked tweet" }
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Error while unliking tweet"
    });
  }
};
