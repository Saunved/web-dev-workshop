const express = require("express");
const router = express.Router();
const { auth } = require("./../middlewares/auth");
const {
  createTweet,
  getTweets,
  getTweet,
  getUserTweets,
  getLikedTweets,
  getFollowingTweets,
  likeTweet,
  unlikeTweet
} = require("./../controllers/tweet");

router.post("/tweet", auth, createTweet);
router.post("/tweet/like/:id", auth, likeTweet);
router.post("/tweet/unlike/:id", auth, unlikeTweet);
// Get latest tweets:
router.get("/tweets", getTweets);
// Get single tweet:
router.get("/tweet/:id", auth, getTweet);
// Get all tweets of given user:
router.get("/tweets/user/:userId", auth, getUserTweets);
// Get liked tweets of given user:
router.get("/tweets/liked/:userId", auth, getLikedTweets);
// Get tweets from users that that the current user follows:
router.get("/tweets/following", auth, getFollowingTweets);

module.exports = router;
