const express = require("express");
const router = express.Router();
const { createFollows, getFollowerCountUser, getFollowingCountUser } = require("./../controllers/follows");
const { auth } = require("./../middlewares/auth");

router.post("/follows/:followingUserId", auth, createFollows);
router.get("/follows/get-follower-count", auth, getFollowerCountUser);
router.get("/follows/get-following-count", auth, getFollowingCountUser);
module.exports = router;
