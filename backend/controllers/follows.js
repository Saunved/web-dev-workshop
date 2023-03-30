const Follows = require("./../models/Follows");
const User = require("./../models/User");

module.exports.addFollower = async (req, res) => {
  try {
    const followingUserId = req.params.followingUserId;
    const userId = req.user.id;
    // @TODO: Check how likes are implemented to avoid this extra db call
    const existingFollow = await Follows.findOne({ where: { userId, followingUserId } });

    if (!existingFollow) {
      const follows = await Follows.create({ userId, followingUserId });
      return res.status(201).json({
        data: { follows: { id: follows.id } },
        message: "Follower created."
      });
    } else {
      return res.status(200).json({
        message: "Follower already exists"
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Error while following."
    });
  }
};

module.exports.countFollows = async (req, res) => {
  try {
    const user = await User.findOne({ where: { handle: req.params.handle } });
    const followingCount = await Follows.count({ where: { userId: user.id } });
    const followersCount = await Follows.count({ where: { followingUserId: user.id } });

    return res.status(200).json({
      data: {
        following: followingCount,
        followers: followersCount
      }
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error while getting follow counts"
    });
  }
};

module.exports.getFollowers = async (req, res) => {
  try {
    const user = await User.findOne({ where: { handle: req.params.handle } });
    const followersById = await Follows.findAll({
      where: { followingUserId: user.id },
      attributes: ["userId"]
    });

    const followerIds = followersById.map((follower) => follower.dataValues.userId);

    const users = await User.findAll({ where: { id: followerIds } });
    return res.status(200).json({
      data: {
        users
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
    const user = await User.findOne({ where: { handle: req.params.handle } });
    const followingById = await Follows.findAll({
      where: { userId: user.id },
      attributes: ["followingUserId"]
    });

    const followerIds = followingById.map((follower) => follower.dataValues.followingUserId);
    console.log(followerIds);

    const users = await User.findAll({ where: { id: followerIds } });

    return res.status(200).json({
      data: {
        users
      }
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Error while getting followers"
    });
  }
};
