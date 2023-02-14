const express = require("express");
const router = express.Router();
const { createHashtag, getHashtag, getAllHashtags } = require("./../controllers/hashtag");

router.get("/hashtag", getHashtag);
router.get("/hashtags", getAllHashtags);
router.post("/hashtag", createHashtag);

module.exports = router;
