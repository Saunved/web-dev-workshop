const User = require("./../models/User");
const Sequelize = require("sequelize");
const throwException = require("./../utils/error");
const { getFormattedMutuals } = require("./../utils/format");

module.exports.addFollows = async (req, res, next) => {
  try {
    const followingUser = await User.findOne({
      where: { handle: req.params.handle },
      attributes: ["id"]
    });

    if (!followingUser) {
      throwException(`User ${req.params.handle} does not exist!`, 404);
    }

    const user = req.user;
    await user.addFollowing(followingUser.id);

    return res.status(201).json({
      message: "Followed user."
    });
  } catch (err) {
    next(err);
  }
};

module.exports.removeFollows = async (req, res, next) => {
  try {
    const followingUser = await User.findOne({
      where: { handle: req.params.handle },
      attributes: ["id"]
    });

    if (!followingUser) {
      throwException(`User ${req.params.handle} does not exist!`, 404);
    }

    const user = req.user;
    await user.removeFollowing(followingUser.id);

    return res.status(200).json({
      message: "Unfollowed user"
    });
  } catch (err) {
    next(err);
  }
};

module.exports.getFollowers = async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: { handle: req.params.handle }
    });

    if (!user) {
      throwException(`User ${req.params.handle} does not exist!`, 404);
    }

    const followers = await user.getFollower({
      attributes: [
        "id",
        "name",
        "handle",
        "bio",
        [
          Sequelize.literal(
            `EXISTS(SELECT * FROM follows WHERE followerId = ${user.id} AND followingId = User.id)`
          ),
          "isFollowedByUser"
        ]
      ],
      order: [["handle", "ASC"]]
    });

    return res.status(200).json({
      data: {
        followers: getFormattedMutuals(followers)
      }
    });
  } catch (err) {
    next(err);
  }
};

module.exports.getFollowing = async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: { handle: req.params.handle }
    });

    if (!user) {
      throwException(`User ${req.params.handle} does not exist!`, 404);
    }

    let following = await user.getFollowing({
      attributes: [
        "id",
        "name",
        "handle",
        "bio",
        [
          Sequelize.literal(
            `EXISTS(SELECT * FROM follows WHERE followerId = ${user.id} AND followingId = User.id)`
          ),
          "isFollowedByUser"
        ]
      ],
      order: [["handle", "ASC"]]
    });

    return res.status(200).json({
      data: {
        following: getFormattedMutuals(following)
      }
    });
  } catch (err) {
    next(err);
  }
};
