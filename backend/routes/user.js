const express = require("express");
const router = express.Router();
const { createUser, getUser, getAllUsers, updatePassword } = require("./../controllers/user");

router.get("/user", getUser);
router.get("/users", getAllUsers);
router.post("/user", createUser);
router.post("user/change-password", updatePassword);

module.exports = router;
