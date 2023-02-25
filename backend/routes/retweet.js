const express = require("express");
const router = express.Router();
const { createRetweet } = require("./../controllers/retweet");
const { auth } = require("./../middlewares/auth");

router.post("/retweet/:tweetId", auth, createRetweet);

module.exports = router;
