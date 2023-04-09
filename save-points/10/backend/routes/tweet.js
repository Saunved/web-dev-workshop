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
  // Task 1
  // Check which controller is defined, and import it here.
  deleteTweet
} = require("./../controllers/tweet");

router.post("/tweet", auth, createTweet);

// Task 1
// Add routes for 'liking' and 'un-liking' any tweet.

// Get latest tweets:
router.get("/tweets", auth, getTweets);
// Get single tweet:
router.get("/tweet/:id", auth, getTweet);
// Get all tweets of given user:
router.get("/tweets/handle/:handle", auth, getUserTweets);
// Get liked tweets of given user:
router.get("/tweets/liked/:handle", auth, getLikedTweets);
// Get tweets from users that that the current user follows:
router.get("/tweets/following", auth, getFollowingTweets);
router.delete("/tweet/:id", auth, deleteTweet);

module.exports = router;
