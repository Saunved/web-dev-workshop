const express = require("express");
const router = express.Router();
const { getFollows, createFollows } = require("./../controllers/follows");

router.get("/follows", getFollows);
router.post("/follows", createFollows);

module.exports = router;
