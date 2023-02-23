const express = require("express");
const router = express.Router();
const { getUserRetweet, createRetweet } = require("./../controllers/retweet");

router.get("/retweet", getUserRetweet);
router.post("/retweet", createRetweet);

module.exports = router;
