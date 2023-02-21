const express = require("express");
const router = express.Router();
const { getUserTweets, createTweet } = require("./../controllers/tweet");
const { auth } = require("./../middlewares/auth");

router.get("/tweet", getUserTweets);
router.post("/create/tweet", auth, createTweet);

module.exports = router;
