const User = require("../models/User");

module.exports.auth = async (req, res, next) => {
  // DO NOT do this in production. This is for educational purposes, to make workshop setup easier for us
  // Having such backdoors is a terrible idea. You would ideally write a proper authentication system around this
  if (process.env.SEED === "allow" && req.body?.user?.id) {
    console.warn("Bypassing auth...");
    req.user = await User.findOne({ where: { id: req.body.user.id } });
    return next();
  }

  if (req.isAuthenticated()) return next();
  return res.status(401).json({
    message: "Unauthorized user!"
  });
};
