const express = require("express");
const router = express.Router();
const { addFollower, countFollows } = require("./../controllers/follows");
const { auth } = require("./../middlewares/auth");

// @TODO: Check how likes are implemented and consider doing the same
// for followers. Ref: The self-association section of this answer:
// https://stackoverflow.com/a/67973948
router.post("/followers/:followingUserId", auth, addFollower);
// @TODO: router.delete("/followers/:followingUserId", auth, removeFollower);
router.get("/followers/count/:handle", countFollows);

module.exports = router;
