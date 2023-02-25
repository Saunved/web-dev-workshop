const express = require("express");
const router = express.Router();
const {
  createUser,
  updateUser,
  loginUser,
  logoutUser,
  getUser,
  getAllUsers,
  changePassword,
} = require("./../controllers/user");
const { auth } = require("./../middlewares/auth");

router.post("/login", loginUser);
router.get("/user/:id", getUser);
router.get("/users", getAllUsers);
router.post("/user", createUser);
router.post("/user", auth, updateUser);
router.put("/user/change-password", auth, changePassword);
router.post("/logout", auth, logoutUser);

module.exports = router;
