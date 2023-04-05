const express = require("express");
const router = express.Router();

const {
  addFollows,
  removeFollows,
  getFollowers,
  getFollowing
} = require("./../controllers/follows");

const { auth } = require("./../middlewares/auth");

router.post("/follow/:handle", auth, addFollows);
router.delete("/unfollow/:handle", auth, removeFollows);
router.get("/followers/:handle", getFollowers);
router.get("/following/:handle", getFollowing);

module.exports = router;
