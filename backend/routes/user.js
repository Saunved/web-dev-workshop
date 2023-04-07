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
  getUserByHandle,
  deleteUser
} = require("./../controllers/user");
const { auth } = require("./../middlewares/auth");

router.post("/login", loginUser);
router.post("/user", createUser);
router.get("/users", auth, getAllUsers);
router.get("/user", auth, getUser);
router.get("/user/:id", auth, getUser);
router.get("/user/handle/:handle", getUserByHandle);
router.put("/user", auth, updateUser);
router.put("/user/change-password", auth, changePassword);
router.post("/logout", auth, logoutUser);
router.delete("/user", auth, deleteUser);

module.exports = router;