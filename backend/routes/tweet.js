const express = require("express");
const router = express.Router();
const { auth } = require("./../middlewares/auth");
const {
  createTweet,
  getTweets,
  getTweet,
  getUserTweets,
  getTweetsByHashtag,
  getTweetsByHandle,
  getFollowingTweets,
  likeTweet,
  unlikeTweet
} = require("./../controllers/tweet");

router.post("/tweet", auth, createTweet);
router.get("/tweet/:id", getTweet);
router.get("/tweets", getTweets);
router.get("/tweets/user/:userId", getUserTweets);
router.get("/tweets/hashtag/:hashtag", getTweetsByHashtag);
router.get("/tweets/handle/:handle", getTweetsByHandle);
router.get("/tweets/following", getFollowingTweets);
router.post("/tweet/like/:id", auth, likeTweet);
router.post("/tweet/unlike/:id", auth, unlikeTweet);

module.exports = router;
