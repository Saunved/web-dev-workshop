const express = require("express");
const router = express.Router();
const { createFollows,unfollowUser } = require("./../controllers/follows");
const { auth } = require("./../middlewares/auth");

router.post("/follows/:followingUserId", auth, createFollows);
router.post("/follows/unfollow/:unfollowedUserId", auth, unfollowUser);

module.exports = router;
