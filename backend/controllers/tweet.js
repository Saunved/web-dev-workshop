const Tweet = require("./../models/Tweet");
const User = require("./../models/User");
const Sequelize = require("sequelize");
const throwException = require("./../utils/error");
const { formatTweet, getFormattedTweets } = require("./../utils/format");

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

module.exports.createTweet = async (req, res, next) => {
  try {
    const { body } = req.body;
    const userId = req.user.id;
    const tweet = await Tweet.create({ userId, body });

    return res.status(201).json({
      data: {
        tweet: { id: tweet.id, body: tweet.body }
      },
      message: "Tweet published."
    });
  } catch (err) {
    next(err);
  }
};

module.exports.getTweets = async (req, res, next) => {
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
    next(err);
  }
};

module.exports.getTweet = async (req, res, next) => {
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

    if (!tweetObj) {
      throwException(`Tweet with id ${tweetId} does not exist!`);
    }

    return res.status(200).json({
      data: { tweet: formatTweet(tweetObj) }
    });
  } catch (err) {
    next(err);
  }
};

module.exports.getUserTweets = async (req, res, next) => {
  try {
    const handle = req.params.handle;
    const requestedUser = await User.findOne({
      where: { handle: handle },
      attributes: ["id", "handle"]
    });

    if (!requestedUser) {
      throwException(`User with handle ${handle} does not exist!`);
    }

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
    next(err);
  }
};

module.exports.getFollowingTweets = async (req, res, next) => {
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
    next(err);
  }
};

module.exports.getLikedTweets = async (req, res, next) => {
  try {
    const handle = req.params.handle;
    const currentUserId = req.user.id;
    const requestedUser = await User.findOne({
      where: { handle: handle },
      attributes: ["id", "handle"]
    });

    if (!requestedUser) {
      throwException(`User with handle ${handle} does not exist!`);
    }

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
          where: { id: requestedUser.id }
        }
      ],
      group: ["Tweet.id", "User.id"],
      order: [["createdAt", "DESC"]]
    });

    return res.status(200).json({
      data: { tweets: getFormattedTweets(tweets) }
    });
  } catch (err) {
    next(err);
  }
};

module.exports.likeTweet = async (req, res, next) => {
  try {
    const tweetId = req.params.id;
    const tweet = await Tweet.findByPk(tweetId);
    if (!tweet) {
      throwException(`Tweet with id ${tweetId} does not exist!`);
    }

    const user = req.user;
    await user.addLikes(tweetId);

    return res.status(200).json({
      data: { message: "Liked tweet" }
    });
  } catch (err) {
    next(err);
  }
};

module.exports.unlikeTweet = async (req, res, next) => {
  try {
    const tweetId = req.params.id;
    const tweet = await Tweet.findByPk(tweetId);
    if (!tweet) {
      throwException(`Tweet with id ${tweetId} does not exist!`);
    }

    const user = req.user;
    await user.removeLikes(tweetId);

    return res.status(200).json({
      data: { message: "Unliked tweet" }
    });
  } catch (err) {
    next(err);
  }
};

module.exports.deleteTweet = async (req, res, next) => {
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
    next(err);
  }
};
