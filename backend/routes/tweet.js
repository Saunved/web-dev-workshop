const express = require("express");
const router = express.Router();
const { getUserTweets, createTweet } = require("./../controllers/tweet");

router.get("/tweet", getUserTweets);
router.post("/create/tweet", createTweet);

module.exports = router;
