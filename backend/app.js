// Dependencies
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

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
app.use(express.json());

// Importing routes
const userRouter = require("./routes/user");
const tweetRouter = require("./routes/tweet");
const hashtagRouter = require("./routes/hashtag");
const followsRouter = require("./routes/follows")
app.use("/", [userRouter, tweetRouter, hashtagRouter, followsRouter]);
module.exports = app;
