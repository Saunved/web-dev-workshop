const express = require("express");
const router = express.Router();
const { auth } = require("./../middlewares/auth");
const {
  getTweet,
  createTweet,
  getTweets,
  getTweet,
  getUserTweets
} = require("./../controllers/tweet");

router.get("/tweet", getTweet);
router.post("/tweet", auth, createTweet);
router.get("/tweet/:id", getTweet);
router.get("/tweets", getTweets);
router.get("/tweets/user/:userId", getUserTweets);

module.exports = router;