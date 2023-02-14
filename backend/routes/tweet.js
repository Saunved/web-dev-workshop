const express = require("express");
const router = express.Router();
const {
  getUserTweets,
  getAllTweets,
  createTweet,
} = require("./../controllers/tweet");

// router.get("/tweet", getUserTweets);
// router.get("/tweets", getAllTweets);
router.post("/create/tweet", createTweet);

module.exports = router;
