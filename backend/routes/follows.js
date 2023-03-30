const express = require("express");
const router = express.Router();
const { createFollows ,
        removeFollows} = require("./../controllers/follows");
const { auth } = require("./../middlewares/auth");

router.post("/follows/:followingUserId", auth, createFollows);
router.delete("/unfollows/:followingUserId", auth, removeFollows);

module.exports = router;
