const express = require("express");
const router = express.Router();
const { createUser, getUser, getAllUsers, test1 } = require("./../controllers/user");

router.get("/user", getUser);
router.get("/users", getAllUsers);
router.post("/user", createUser);

module.exports = router;
