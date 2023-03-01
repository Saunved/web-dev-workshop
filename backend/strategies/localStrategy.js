const LocalStrategy = require("passport-local");
const bcrypt = require("bcrypt");
const passport = require("passport");
const User = require("../models/User");

const strategy = new LocalStrategy(
  {
    usernameField: "email"
  },
  async (email, password, next) => {
    try {
      const user = await User.findOne({ where: { email: email } });

      if (user) {
        const isMatch = await bcrypt.compare(password, user.password);

        if (isMatch) {
          return next(null, user);
        }
      }

      return next(null, false);
    } catch (err) {
      return next(err);
    }
  }
);

passport.use(strategy);

passport.serializeUser((user, next) => {
  next(null, user.id);
});

passport.deserializeUser(async (userId, next) => {
  try {
    const user = await User.findOne({ where: { id: userId } });
    return next(null, user);
  } catch (err) {
    return next(err);
  }
});
