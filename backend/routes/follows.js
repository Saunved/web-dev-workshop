const express = require("express");
const router = express.Router();
const { createFollows } = require("./../controllers/follows");
const { auth } = require("./../middlewares/auth");

router.post("/follows", auth, createFollows);

module.exports = router;
