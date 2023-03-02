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
