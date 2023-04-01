const express = require("express");
const router = express.Router();

const {
  addFollows,
  removeFollows,
  countFollows,
  getFollowers,
  getFollowing
} = require("./../controllers/follows");

const { auth } = require("./../middlewares/auth");

// @TODO: Check how likes are implemented and consider doing the same
// for followers. Ref: The self-association section of this answer:
// https://stackoverflow.com/a/67973948
router.post("/followers/:followingUserId", auth, addFollows);
router.delete("/followers/:followingUserId", auth, removeFollows);
router.get("/followers/count/:handle", countFollows);
router.get("/followers/:handle", getFollowers);
router.get("/following/:handle", getFollowing);

module.exports = router;
