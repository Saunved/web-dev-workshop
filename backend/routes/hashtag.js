const express = require("express");
const router = express.Router();
const { createHashtag, getAllHashtags } = require("./../controllers/hashtag");
const { auth } = require("./../middlewares/auth");

router.get("/hashtags", getAllHashtags);
router.post("/hashtag", auth, createHashtag);

module.exports = router;
