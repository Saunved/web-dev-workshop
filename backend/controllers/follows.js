const Follows = require("./../models/Follows");
const User = require("./../models/User");

module.exports.createFollows = async (req, res) => {
  try {

    const followingUserId = req.params.followingUserId;
    const userId = req.user.id;

    if (userId == followingUserId) {
      return res.status(400).json({
        message: "Users cannot folow themselves",
      });
    }

    const [follows, created] = await Follows.findOrCreate({
      where: { userId, followingUserId },
      defaults: { userId, followingUserId }
    });

    if (!created) {
      return res.status(200).json({
        message: "The users are already following each other"
      });
    }

    //increment following count for user
    const user = await User.findByPk(userId);

    //increment follower count for user
    const followedUser = await User.findByPk(followingUserId);

    if (!user || !followedUser) {
      return res.status(400).json({
        message: "Incorrect user ids",
      });
    }

    await user.increment('followingCount');
    await followedUser.increment('followerCount');

    return res.status(201).json({
      message: "Follows created."
    });
  } catch (err) {
    return res.status(500).json({
      message: "Error while following."
    });
  }
};


module.exports.unfollowUser = async (req, res) => {
  try {
    const userId = req.user.id;
    const unfollowedUserId = req.params.unfollowedUserId;

    if (userId == unfollowedUserId) {
      return res.status(400).json({
        message: "Users cannot unfollow themselves",
      });
    }

    const count = await Follows.destroy({
      where: {
        userId: userId,
        followingUserId: unfollowedUserId
      }
    });

    if (count == 0) {
      return res.status(400).json({
        message: "The users do not follow each other",
      });
    }

    //decrement following count for user
    const user = await User.findByPk(userId);
    //decrement follower count for user
    const unfollowedUser = await User.findByPk(unfollowedUserId);

    await user.decrement('followingCount');
    await unfollowedUser.decrement('followerCount');

    return res.status(200).json({
      message: "Unfollowed succesfully",
    });

  } catch (error) {
    return res.status(500).json({
      message: "Error while unfollowing",
    });
  }
};