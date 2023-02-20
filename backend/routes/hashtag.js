const express = require("express");
const router = express.Router();
const { createHashtag, getHashtag, getAllHashtags } = require("./../controllers/hashtag");
const { auth } = require("./../middlewares/auth");

router.get("/hashtag", getHashtag);
router.get("/hashtags", getAllHashtags);
router.post("/hashtag", auth, createHashtag);

module.exports = router;
