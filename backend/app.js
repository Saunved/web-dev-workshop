// Dependencies
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const session = require("express-session");
const passport = require("passport");
require("./strategies/localStrategy")

const app = express();
const { config } = require("./configs/config");
const { sessionStore } = require("./sequelize");

// Body parser
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

// CORS
const whitelist = ["http://localhost:5000", "http://localhost:3000"];

const corsOptionsDelegate = function (req, callback) {
  let corsOptions;
  if (whitelist.indexOf(req.header("Origin")) !== -1) {
    corsOptions = { origin: true }; // reflect (enable) the requested origin in the CORS response
  } else {
    corsOptions = { origin: false }; // disable CORS for this request
  }
  callback(null, corsOptions); // callback expects two parameters: error and options
};

app.use(cors(corsOptionsDelegate));

// Session
const { secret, timeout } = config.session;

app.use(
  session({
    secret: secret,
    store: sessionStore,
    cookie: { maxAge: timeout },
    saveUninitialized: false,
    resave: false,
  })
);

// Passport
app.use(passport.initialize());
app.use(passport.session());

// Importing routes
const userRouter = require("./routes/user");
const tweetRouter = require("./routes/tweet");
const retweetRouter = require("./routes/retweet");
const hashtagRouter = require("./routes/hashtag");
const followsRouter = require("./routes/follows");
app.use("/", [userRouter, tweetRouter, hashtagRouter, followsRouter]);
module.exports = app;
