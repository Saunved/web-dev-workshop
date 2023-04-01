const express = require("express");
const router = express.Router();
const { auth } = require("./../middlewares/auth");
const {
  createTweet,
  getTweets,
  getTweet,
  getUserTweets,
  getFollowingTweets,
  likeTweet,
  unlikeTweet
} = require("./../controllers/tweet");

router.post("/tweet", auth, createTweet);
router.get("/tweets", getTweets);
router.get("/tweet/:id", auth, getTweet);
router.get("/tweets/user/:userId", auth, getUserTweets);
router.get("/tweets/following", auth, getFollowingTweets);
router.post("/tweet/like/:id", auth, likeTweet);
router.post("/tweet/unlike/:id", auth, unlikeTweet);

module.exports = router;
