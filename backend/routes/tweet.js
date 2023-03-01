const express = require("express");
const router = express.Router();
const { auth } = require("./../middlewares/auth");
const {
  createTweet,
  getTweets,
  getTweet,
  getUserTweets,
  getTweetsByHashtag,
  getTweetsByHandle
} = require("./../controllers/tweet");

router.get("/tweet", getTweet);
router.post("/tweet", auth, createTweet);
router.get("/tweet/:id", getTweet);
router.get("/tweets", getTweets);
router.get("/tweets/user/:userId", getUserTweets);
router.get("/tweets/hashtag/:hashtag", getTweetsByHashtag);
router.get("/tweets/handle/:handle", getTweetsByHandle);

module.exports = router;
