const User = require("./../models/User");
const Sequelize = require("sequelize");

module.exports.addFollows = async (req, res) => {
  try {
    const followingUser = await User.findOne({
      where: { handle: req.params.handle },
      attributes: ["id"]
    });
    const user = req.user;
    await user.addFollowing(followingUser.id);

    return res.status(201).json({
      message: "Followed user."
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Error while following."
    });
  }
};

module.exports.removeFollows = async (req, res) => {
  try {
    const followingUser = await User.findOne({
      where: { handle: req.params.handle },
      attributes: ["id"]
    });
    const user = req.user;
    await user.removeFollowing(followingUser.id);

    return res.status(200).json({
      message: "Unfollowed user"
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "Error while unfollowing."
    });
  }
};

module.exports.getFollowers = async (req, res) => {
  try {
    const user = await User.findOne({
      where: { handle: req.params.handle }
    });
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
          "isFollowing"
        ]
      ],
      order: [["handle", "ASC"]]
    });

    return res.status(200).json({
      data: {
        followers
      }
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Error while getting followers"
    });
  }
};

module.exports.getFollowing = async (req, res) => {
  try {
    const user = await User.findOne({
      where: { handle: req.params.handle }
    });

    let following = await user.getFollowing({
      attributes: ["id", "name", "handle", "bio"],
      order: [["handle", "ASC"]]
    });

    // Set isFollowing true for all users:
    following = following.map((obj) => ({ ...obj, isFollowing: true }));

    return res.status(200).json({
      data: {
        following: following
      }
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Error while getting following users"
    });
  }
};
