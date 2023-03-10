const User = require("./../models/User");
const bcrypt = require("bcrypt");
const passport = require("passport");

const isEmailUnique = async (emailId) => {
  //returns true if email does not exist in our database
  const emailCount = await User.count({ where: { email: emailId } });
  return emailCount == 0;
};

const isHandleUnique = async (handle) => {
  //returns true if handle does not exist in our database
  const handleCount = await User.count({ where: { handle: handle } });
  return handleCount == 0;
};

module.exports.loginUser = async (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
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
        return res.status(200).json({ message: "Logged in." });
      });
    }
  })(req, res, next);
};

module.exports.logoutUser = async (req, res, next) => {
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
    return res.status(500).json({
      message: "Error while creating user."
    });
  }
};

module.exports.updateUser = async (req, res) => {
  try {
    const user = await User.update(req.body, {
      where: {
        id: req.user.id
      }
    });

    return res.status(200).json({
      data: { user: { id: user.id } },
      message: "User UPDATED."
    });
  } catch (err) {
    return res.status(500).json({
      message: "Error while updating user."
    });
  }
};

module.exports.getUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);

    return res.status(200).json({
      data: { user: user }
    });
  } catch (err) {
    return res.status(500).json({
      message: "Error while fetching user."
    });
  }
};

module.exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({});

    return res.status(200).json({
      data: { users: users }
    });
  } catch (err) {
    return res.status(500).json({
      message: "Error while fetching all users."
    });
  }
};

module.exports.changePassword = async (req, res) => {
  try {
    const user = await User.findByPk(req.body.id);

    if (!user) {
      return res.status(400).json({
        message: "Invalid user id sent!"
      });
    }

    // Create password hash
    const oldPassword = req.body.oldPassword;
    const newPassword = req.body.newPassword;
    if (!bcrypt.compareSync(oldPassword, user.password)) {
      throw "Old passwords are not the same!";
    }
    if (bcrypt.compareSync(newPassword, user.password)) {
      throw "New password is the same as old password!";
    }

    const newPassowordHash = await bcrypt.hash(newPassword, 10);
    user.update({ password: newPassowordHash });

    return res.status(200).json({
      message: "Password updated for the user successfully"
    });
  } catch (err) {
    return res.status(500).json({
      message: err
    });
  }
};
