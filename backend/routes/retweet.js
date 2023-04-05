const express = require("express");
const router = express.Router();
const { createRetweet, removeRetweet } = require("./../controllers/retweet");
const { auth } = require("./../middlewares/auth");

router.post("/retweet/:tweetId", auth, createRetweet);
router.delete("/retweet/:tweetId", auth, removeRetweet);

module.exports = router;
