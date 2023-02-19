const express = require("express");
const router = express.Router();
const { getFollows, createFollows } = require("./../controllers/follows");

router.post("/follows", createFollows);

module.exports = router;
