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
