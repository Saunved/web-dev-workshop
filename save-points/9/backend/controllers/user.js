const User = require("./../models/User");
const bcrypt = require("bcrypt");
const passport = require("passport");
const Sequelize = require("sequelize");
const throwException = require("./../utils/error");
const { formatUser, getFormattedUsers } = require("./../utils/format");

module.exports.loginUser = async (req, res, next) => {
  passport.authenticate("local", (err, user) => {
    if (err) {
      next(err);
    } else if (!user) {
      throwException("Invalid Credentials", 401);
    } else {
      req.login(user, (err) => {
        if (err) {
          next(err);
        }
        return res.status(200).json({
          message: "Logged in.",
          data: { handle: user.handle, id: user.id }
        });
      });
    }
  })(req, res, next);
};

module.exports.logoutUser = async (req, res, next) => {
  req.logout((err) => {
    if (err) {
      next(err);
    }
    res.status(200).json({ message: "Logged out." });
  });
};

module.exports.createUser = async (req, res, next) => {
  try {
    const { name, handle, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    if (!name || !handle || !email || !password) {
      throwException("Invalid user params", 400);
    }

    // Add user to User model
    const user = await User.create({ name, handle, email, password: hashedPassword });

    return res.status(201).json({
      data: { user: { id: user.id } },
      message: "User created."
    });
  } catch (err) {
    next(err);
  }
};

module.exports.updateUser = async (req, res, next) => {
  try {
    const { bio, website } = req.body;
    if (!bio && !website) {
      throwException("Invalid user params", 400);
    }

    await User.update(
      { bio, website },
      {
        where: {
          id: req.user.id
        }
      }
    );

    const user = await User.findByPk(req.user.id, {
      attributes: {
        exclude: ["password"]
      }
    });

    return res.status(200).json({
      message: "User Updated.",
      data: { user: formatUser(user) }
    });
  } catch (err) {
    next(err);
  }
};

module.exports.getUser = async (req, res, next) => {
  try {
    const userId = req.params.id || req.user.id;
    const user = await User.findByPk(userId, {
      attributes: {
        include: [
          [
            Sequelize.literal("(SELECT COUNT(*) FROM follows WHERE follows.followerId = User.id)"),
            "followingCount"
          ],
          [
            Sequelize.literal("(SELECT COUNT(*) FROM follows WHERE follows.followingId = User.id)"),
            "followersCount"
          ],
          [
            Sequelize.literal(
              `EXISTS(SELECT * FROM follows WHERE follows.followerId = ${req.user.id} AND follows.followingId = ${userId})`
            ),
            "isFollowedByUser"
          ]
        ],
        exclude: ["password"]
      }
    });

    if (!user) {
      throwException(`User ${userId} does not exist!`, 404);
    }

    return res.status(200).json({
      data: { user: formatUser(user) }
    });
  } catch (err) {
    next(err);
  }
};

module.exports.getUserByHandle = async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: { handle: req.params.handle },
      attributes: {
        include: [
          [
            Sequelize.literal("(SELECT COUNT(*) FROM follows WHERE follows.followerId = User.id)"),
            "followingCount"
          ],
          [
            Sequelize.literal("(SELECT COUNT(*) FROM follows WHERE follows.followingId = User.id)"),
            "followersCount"
          ],
          [
            Sequelize.literal(
              `EXISTS(SELECT * FROM follows WHERE follows.followerId = ${req.user.id} AND follows.followingId = User.id)`
            ),
            "isFollowedByUser"
          ]
        ],
        exclude: ["password"]
      }
    });

    if (!user) {
      throwException(`User ${req.params.handle} does not exist!`, 404);
    }

    return res.status(200).json({
      data: { user: formatUser(user) }
    });
  } catch (err) {
    next(err);
  }
};

module.exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.findAll({
      attributes: {
        include: [
          [
            Sequelize.literal("(SELECT COUNT(*) FROM follows WHERE follows.followerId = User.id)"),
            "followingCount"
          ],
          [
            Sequelize.literal("(SELECT COUNT(*) FROM follows WHERE follows.followingId = User.id)"),
            "followersCount"
          ],
          [
            Sequelize.literal(
              `EXISTS(SELECT * FROM follows WHERE follows.followerId = ${req.user.id} AND follows.followingId = User.id)`
            ),
            "isFollowedByUser"
          ]
        ],
        exclude: ["password"]
      }
    });

    return res.status(200).json({
      data: { users: getFormattedUsers(users) }
    });
  } catch (err) {
    next(err);
  }
};

module.exports.changePassword = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.user.id);

    // Create password hash
    const oldPassword = req.body.oldPassword;
    const newPassword = req.body.newPassword;
    const confirmPassword = req.body.confirmPassword;

    if (newPassword !== confirmPassword) {
      throwException("New password and confirm password do not match!", 400);
    }
    if (!bcrypt.compareSync(oldPassword, user.password)) {
      throwException("Old password is invalid!", 400);
    }
    if (bcrypt.compareSync(newPassword, user.password)) {
      throwException("New password is the same as old password!", 409);
    }

    const newPassowordHash = await bcrypt.hash(newPassword, 10);
    user.update({ password: newPassowordHash });

    return res.status(200).json({
      message: "Password successfully updated for the user."
    });
  } catch (err) {
    next(err);
  }
};

module.exports.deleteUser = async (req, res, next) => {
  try {
    await User.destroy({
      where: {
        id: req.user.id
      }
    });

    return res.status(200).json({
      data: { message: "Deleted user" }
    });
  } catch (err) {
    next(err);
  }
};
