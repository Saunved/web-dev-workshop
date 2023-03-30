const Follows = require("./../models/Follows");

module.exports.createFollows = async (req, res) => {
  try {
    const followingUserId = req.params.followingUserId;
    const userId = req.user.id;
    const follows = await Follows.create({ userId, followingUserId });

    return res.status(201).json({
      data: { follows: { id: follows.id } },
      message: "Follows created."
    });
  } catch (err) {
    return res.status(500).json({
      message: "Error while following."
    });
  }
};

module.exports.removeFollows = async (req, res) => {
  try {
    const followingUserId = req.params.followingUserId;
    const userId = req.user.id;
    const follows = await Follows.destroy({
      where: {
        userId: userId,
        followingUserId: followingUserId
      }
    });

    return res.status(200).json({
      message: "Ok."
    });
  } catch (err) {
    return res.status(500).json({
      message: "Error while unfollowing."
    });
  }
};
