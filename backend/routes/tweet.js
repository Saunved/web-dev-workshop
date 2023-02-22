const express = require("express");
const router = express.Router();
const { getTweet, getUserTweets, createTweet } = require("./../controllers/tweet");
const { auth } = require("./../middlewares/auth");

router.get("/tweets/user/:userId", getUserTweets);
router.get("/tweet/:id", getTweet);
router.post("/tweet", auth, createTweet);

module.exports = router;
