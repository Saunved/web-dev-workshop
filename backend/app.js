// Dependencies
const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const passport = require("passport");
require("./strategies/localStrategy");

const app = express();
const { config } = require("./configs/config");
const { sessionStore } = require("./sequelize");

// Body parser
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

// CORS
const whitelist = [
  "http://localhost:5000",
  "http://localhost:3000",
  "http://localhost:6000",
  "http://localhost:4400",
  `https://${process.env.CODESPACE_NAME}-4400.preview.app.github.dev`,
  `https://${process.env.CODESPACE_NAME}-5000.preview.app.github.dev`
];

app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (whitelist.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  next();
});

// Session
const { secret, timeout } = config.session;
const cookie = { maxAge: timeout, httpOnly: false };
if (config.server.isCodeSpaceEnv) {
  cookie.httpOnly = true;
  cookie.domain = ".preview.app.github.dev";
}

app.use(
  session({
    secret: secret,
    store: sessionStore,
    cookie: cookie,
    saveUninitialized: false,
    resave: false
  })
);

// Passport
app.use(passport.initialize());
app.use(passport.session());

// Importing routes
const userRouter = require("./routes/user");
const tweetRouter = require("./routes/tweet");
const retweetRouter = require("./routes/retweet");
const followsRouter = require("./routes/follows");
const errorHandler = require("./middlewares/errorHandler");

app.use("/", [userRouter, tweetRouter, retweetRouter, followsRouter]);
app.use(errorHandler);

module.exports = app;
