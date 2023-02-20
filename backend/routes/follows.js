const express = require("express");
const router = express.Router();
const { createFollows } = require("./../controllers/follows");

router.post("/follows", createFollows);

module.exports = router;
