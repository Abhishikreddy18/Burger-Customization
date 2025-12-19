const express = require("express");
const router = express.Router();
const verifyjwt = require("../middleware/jwtverify");

const {
  loginhandler,
  profilehandler,
  registerhandler,
  getallUsers,
  roleUpdateHandler,
  deleteUser,
  adminRegisterHandler, // <-- Add this
} = require("../controllers/authController");

// Normal user registration/login
router.post("/register", registerhandler);
router.post("/login", loginhandler);

// One-time admin registration (delete this route after use)
router.post("/adminregister", adminRegisterHandler);

// Protected routes
router.get("/profile/:id", verifyjwt, profilehandler);
router.get("/allusers", verifyjwt, getallUsers);
router.put("/role/:id", verifyjwt, roleUpdateHandler);
router.delete("/delete/:id", deleteUser);

module.exports = router;
