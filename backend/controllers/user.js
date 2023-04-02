const User = require("./../models/User");
const bcrypt = require("bcrypt");
const passport = require("passport");
const Sequelize = require("sequelize");

const formatUser = (userObj) => {
  const { ...user } = userObj.dataValues;

  const formattedUser = {
    ...user
  };

  if ("isFollowing" in formattedUser) {
    formattedUser.isFollowing = formattedUser.isFollowing === 0 ? false : true;
  }

  return formattedUser;
};

const getFormattedUsers = (userObjs) => {
  return userObjs.map((userObj) => {
    return formatUser(userObj);
  });
};

module.exports.loginUser = async (req, res, next) => {
  passport.authenticate("local", (err, user) => {
    if (err) {
      return res.status(500).json({
        message: "Error while authenticating user."
      });
    } else if (!user) {
      return res.status(401).json({
        message: "Invalid Credentials"
      });
    } else {
      req.login(user, (err) => {
        if (err) {
          return res.status(500).json({
            message: "Error while authenticating user."
          });
        }
        return res.status(200).json({
          message: "Logged in.",
          data: { handle: user.handle, id: user.id }
        });
      });
    }
  })(req, res, next);
};

module.exports.logoutUser = async (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).json({
        message: "Error while logging out."
      });
    }
    res.status(200).json({ message: "Logged out." });
  });
};

module.exports.createUser = async (req, res) => {
  try {
    // Create password hash
    const hash = await bcrypt.hash(req.body.password, 10);

    req.body.password = hash;
    // Add user to User model
    const user = await User.create(req.body);

    return res.status(201).json({
      data: { user: { id: user.id } },
      message: "User created."
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "Error while creating user."
    });
  }
};

module.exports.updateUser = async (req, res) => {
  try {
    await User.update(req.body, {
      where: {
        id: req.user.id
      }
    });

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
    console.error(err);
    return res.status(500).json({
      message: "Error while updating user."
    });
  }
};

module.exports.getUser = async (req, res) => {
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
            "isFollowing"
          ]
        ],
        exclude: ["password"]
      }
    });

    return res.status(200).json({
      data: { user: formatUser(user) }
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "Error while fetching user."
    });
  }
};

module.exports.getUserByHandle = async (req, res) => {
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
            "isFollowing"
          ]
        ],
        exclude: ["password"]
      }
    });

    return res.status(200).json({
      data: { user: formatUser(user) }
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "Error while fetching user by handle."
    });
  }
};

module.exports.getAllUsers = async (req, res) => {
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
            "isFollowing"
          ]
        ],
        exclude: ["password"]
      }
    });

    return res.status(200).json({
      data: { users: getFormattedUsers(users) }
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "Error while fetching all users."
    });
  }
};

module.exports.changePassword = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id);

    if (!user) {
      return res.status(400).json({
        message: "Invalid user id sent!"
      });
    }

    // Create password hash
    const oldPassword = req.body.oldPassword;
    const newPassword = req.body.newPassword;
    const confirmPassword = req.body.confirmPassword;

    if (newPassword !== confirmPassword) {
      throw "New password and confirm password do not match!";
    }
    if (!bcrypt.compareSync(oldPassword, user.password)) {
      throw "Old password is invalid!";
    }
    if (bcrypt.compareSync(newPassword, user.password)) {
      throw "New password is the same as old password!";
    }

    const newPassowordHash = await bcrypt.hash(newPassword, 10);
    user.update({ password: newPassowordHash });

    return res.status(200).json({
      message: "Password successfully updated for the user."
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "Error while changing password."
    });
  }
};
