const Tweet = require("./../models/Tweet");
const User = require("./../models/User");
const Sequelize = require("sequelize");

const formatTweet = (tweetObj) => {
  const { User: user, LikedBy, retweets, ...tweet } = tweetObj.dataValues; // eslint-disable-line no-unused-vars
  const retweeter = tweetObj.retweeter;

  const formattedTweet = {
    ...tweet,
    name: user.name,
    handle: user.handle
  };

  if ("isLikedByUser" in formattedTweet) {
    formattedTweet.isLikedByUser = formattedTweet.isLikedByUser === 0 ? false : true;
  }

  if ("isRetweetedByUser" in formattedTweet) {
    formattedTweet.isRetweetedByUser = formattedTweet.isRetweetedByUser === 0 ? false : true;
  }

  if (retweeter) {
    formattedTweet.retweeter = retweeter;
  }
  return formattedTweet;
};

const getFormattedTweets = (tweetObjs) => {
  return tweetObjs.map((tweetObj) => {
    return formatTweet(tweetObj);
  });
};

const getUserRetweets = async (userIds, currentUserId) => {
  const retweetObjs = await User.findAll({
    where: { id: userIds },
    attributes: ["handle"],
    include: [
      {
        model: Tweet,
        as: "Retweets",
        attributes: {
          include: [
            [
              Sequelize.literal("(SELECT COUNT(*) FROM likes WHERE TweetId = Retweets.id)"),
              "likeCount"
            ],
            [
              Sequelize.literal("(SELECT COUNT(*) FROM retweets WHERE TweetId = Retweets.id)"),
              "retweetCount"
            ],
            [
              Sequelize.literal(
                `EXISTS(SELECT * FROM likes WHERE TweetId = Retweets.id AND UserId = ${currentUserId})`
              ),
              "isLikedByUser"
            ],
            [
              Sequelize.literal(
                `EXISTS(SELECT * FROM retweets WHERE TweetId = Retweets.id AND UserId = ${currentUserId})`
              ),
              "isRetweetedByUser"
            ]
          ]
        },
        include: [
          {
            model: User,
            attributes: ["id", "name", "handle"]
          }
        ]
      }
    ]
  });

  const collatedRetweets = [];
  for (let i = 0; i < retweetObjs.length; i++) {
    const { handle, Retweets } = retweetObjs[i];

    for (let j = 0; j < Retweets.length; j++) {
      Retweets[j].retweeter = handle;
      collatedRetweets.push(Retweets[j]);
    }
  }

  return collatedRetweets;
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
    const userId = req.user.id;
    const tweets = await Tweet.findAll({
      attributes: {
        include: [
          [Sequelize.literal("(SELECT COUNT(*) FROM likes WHERE TweetId = Tweet.id)"), "likeCount"],
          [
            Sequelize.literal("(SELECT COUNT(*) FROM retweets WHERE TweetId = Tweet.id)"),
            "retweetCount"
          ],
          [
            Sequelize.literal(
              `EXISTS(SELECT * FROM likes WHERE TweetId = Tweet.id AND UserId = ${userId})`
            ),
            "isLikedByUser"
          ],
          [
            Sequelize.literal(
              `EXISTS(SELECT * FROM retweets WHERE TweetId = Tweet.id AND UserId = ${userId})`
            ),
            "isRetweetedByUser"
          ]
        ]
      },
      include: [
        {
          model: User,
          attributes: ["id", "name", "handle"]
        }
      ],
      group: ["Tweet.id"],
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
      attributes: {
        include: [
          [Sequelize.literal("(SELECT COUNT(*) FROM likes WHERE TweetId = Tweet.id)"), "likeCount"],
          [
            Sequelize.literal("(SELECT COUNT(*) FROM retweets WHERE TweetId = Tweet.id)"),
            "retweetCount"
          ],
          [
            Sequelize.literal(
              `EXISTS(SELECT * FROM likes WHERE TweetId = ${tweetId} AND UserId = ${userId})`
            ),
            "isLikedByUser"
          ],
          [
            Sequelize.literal(
              `EXISTS(SELECT * FROM retweets WHERE TweetId = ${tweetId} AND UserId = ${userId})`
            ),
            "isRetweetedByUser"
          ]
        ]
      },
      include: [
        {
          model: User,
          attributes: ["id", "name", "handle"]
        }
      ],
      group: ["Tweet.id"]
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
    const requestedUser = await User.findOne({
      where: { handle: req.params.handle },
      attributes: ["id", "handle"]
    });
    const currentUserId = req.user.id;

    const tweets = await Tweet.findAll({
      where: { userId: requestedUser.id },
      attributes: {
        include: [
          [Sequelize.literal("(SELECT COUNT(*) FROM likes WHERE TweetId = Tweet.id)"), "likeCount"],
          [
            Sequelize.literal("(SELECT COUNT(*) FROM retweets WHERE TweetId = Tweet.id)"),
            "retweetCount"
          ],
          [
            Sequelize.literal(
              `EXISTS(SELECT * FROM likes WHERE TweetId = Tweet.id AND UserId = ${currentUserId})`
            ),
            "isLikedByUser"
          ],
          [
            Sequelize.literal(
              `EXISTS(SELECT * FROM retweets WHERE TweetId = Tweet.id AND UserId = ${currentUserId})`
            ),
            "isRetweetedByUser"
          ]
        ]
      },
      include: [
        {
          model: User,
          attributes: ["id", "name", "handle"]
        }
      ],
      group: ["Tweet.id", "User.id"],
      order: [["createdAt", "DESC"]]
    });

    const retweets = await getUserRetweets([requestedUser.id], currentUserId);
    const allTweets = tweets.concat(retweets).sort((tweet) => tweet.createdAt);
    return res.status(200).json({
      data: { tweets: getFormattedTweets(allTweets) }
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "Error while fetching user tweets."
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
      attributes: {
        include: [
          [Sequelize.literal("(SELECT COUNT(*) FROM likes WHERE TweetId = Tweet.id)"), "likeCount"],
          [
            Sequelize.literal("(SELECT COUNT(*) FROM retweets WHERE TweetId = Tweet.id)"),
            "retweetCount"
          ],
          [
            Sequelize.literal(
              `EXISTS(SELECT * FROM likes WHERE TweetId = Tweet.id AND UserId = ${user.id})`
            ),
            "isLikedByUser"
          ],
          [
            Sequelize.literal(
              `EXISTS(SELECT * FROM retweets WHERE TweetId = Tweet.id AND UserId = ${user.id})`
            ),
            "isRetweetedByUser"
          ]
        ]
      },
      include: [
        {
          model: User,
          attributes: ["id", "name", "handle"]
        }
      ],
      group: ["Tweet.id", "User.id"],
      order: [["createdAt", "DESC"]]
    });

    return res.status(200).json({
      data: { tweets: getFormattedTweets(tweets) }
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "Error while liking tweet"
    });
  }
};

module.exports.likeTweet = async (req, res) => {
  try {
    const user = req.user;
    await user.addLikes(req.params.id);

    return res.status(200).json({
      data: { message: "Liked tweet" }
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "Error while liking tweet"
    });
  }
};

module.exports.unlikeTweet = async (req, res) => {
  try {
    const user = req.user;
    await user.removeLikes(req.params.id);

    return res.status(200).json({
      data: { message: "Unliked tweet" }
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "Error while unliking tweet"
    });
  }
};

module.exports.getLikedTweets = async (req, res) => {
  try {
    const userId = req.params.userId;
    const currentUserId = req.user.id;
    const tweets = await Tweet.findAll({
      attributes: {
        include: [
          [Sequelize.literal("(SELECT COUNT(*) FROM likes WHERE TweetId = Tweet.id)"), "likeCount"],
          [
            Sequelize.literal("(SELECT COUNT(*) FROM retweets WHERE TweetId = Tweet.id)"),
            "retweetCount"
          ],
          [
            Sequelize.literal(
              `EXISTS(SELECT * FROM likes WHERE TweetId = Tweet.id AND UserId = ${currentUserId})`
            ),
            "isLikedByUser"
          ],
          [
            Sequelize.literal(
              `EXISTS(SELECT * FROM retweets WHERE TweetId = Tweet.id AND UserId = ${currentUserId})`
            ),
            "isRetweetedByUser"
          ]
        ]
      },
      include: [
        {
          model: User,
          attributes: ["id", "name", "handle"]
        },
        {
          model: User,
          as: "LikedBy",
          attributes: [],
          where: { id: userId }
        }
      ],
      group: ["Tweet.id", "User.id"],
      order: [["createdAt", "DESC"]]
    });

    return res.status(200).json({
      data: { tweets: getFormattedTweets(tweets) }
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "Error while fetching liked tweets"
    });
  }
};

module.exports.deleteTweet = async (req, res) => {
  try {
    await Tweet.destroy({
      where: {
        id: req.params.id,
        userId: req.user.id
      }
    });

    return res.status(200).json({
      data: { message: "Deleted tweet" }
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "Error while deleting tweet"
    });
  }
};
