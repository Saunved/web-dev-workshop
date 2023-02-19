const express = require("express");
const passport = require("passport")
const router = express.Router();
const {
  createUser,
  loginUser,
  getUser,
  getAllUsers,
  changePassword,
} = require("./../controllers/user");

router.post("/login", loginUser);
router.get("/user", getUser);
router.get("/users", getAllUsers);
router.post("/user", createUser);
router.post("user/change-password", changePassword);

module.exports = router;
