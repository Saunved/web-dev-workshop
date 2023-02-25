const express = require("express");
const router = express.Router();
const { createFollows } = require("./../controllers/follows");
const { auth } = require("./../middlewares/auth");

router.post("/follows/:followingUserId", auth, createFollows);

module.exports = router;
