const User = require("../models/Users");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const exportUserstoExcel = require("../Export_Services/user_export_service");

// Register
const registerhandler = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res
      .status(400)
      .json({ message: "Name, email and password are required" });
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ message: "User already exists" });
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = new User({ name, email, password: hashedPassword });
  const savedUser = await user.save();

  const token = jwt.sign({ userId: savedUser._id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
  savedUser.token = token;

  res.status(201).json({
    message: "User created successfully",
    id: savedUser._id,
    name: savedUser.name,
    email: savedUser.email,
    token: savedUser.token,
    isAdmin: savedUser.isAdmin,
    isEmployee: savedUser.isEmployee,
  });
});

// Login
const loginhandler = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  const existingUser = await User.findOne({ email });
  if (!existingUser) {
    return res.status(401).json({ message: "User not found" });
  }

  const isPasswordMatch = await bcrypt.compare(password, existingUser.password);
  if (!isPasswordMatch) {
    return res.status(401).json({ message: "Invalid password" });
  }

  const token = jwt.sign({ userId: existingUser._id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
  existingUser.token = token;

  res.status(200).json({
    message: "Login successful",
    id: existingUser._id,
    name: existingUser.name,
    email: existingUser.email,
    token: existingUser.token,
    isAdmin: existingUser.isAdmin,
    isEmployee: existingUser.isEmployee,
  });
});

// Get Current User Profile
const profilehandler = asyncHandler(async (req, res) => {
  const userId = req.params.id;
  const user = await User.findById(userId);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.status(200).json({
    id: user._id,
    name: user.name,
    email: user.email,
    token: user.token,
    isAdmin: user.isAdmin,
    isEmployee: user.isEmployee,
  });
});

// Get All Users
const getallUsers = asyncHandler(async (req, res) => {
  const users = await User.find();
  await exportUserstoExcel(users);
  res.status(200).json(users);
});

// Update User Role
const roleUpdateHandler = asyncHandler(async (req, res) => {
  const { isEmployee } = req.body;
  const user = await User.findById(req.params.id);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  user.isEmployee = isEmployee;
  await user.save();

  const users = await User.find();
  await exportUserstoExcel(users);

  res.status(200).json({ message: "Role updated successfully", user });
});

// Delete User
const deleteUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  await user.remove();
  res.status(200).json({ message: "User deleted successfully", user });
});
// One-time Admin Registration (delete after use)
const adminRegisterHandler = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ message: "Admin already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const adminUser = new User({
    name,
    email,
    password: hashedPassword,
    isAdmin: true, // 👑 Set admin privilege
  });

  const savedAdmin = await adminUser.save();

  const token = jwt.sign({ userId: savedAdmin._id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  res.status(201).json({
    message: "Admin registered successfully",
    id: savedAdmin._id,
    name: savedAdmin.name,
    email: savedAdmin.email,
    isAdmin: savedAdmin.isAdmin,
    token,
  });
});

module.exports = {
  registerhandler,
  loginhandler,
  profilehandler,
  getallUsers,
  roleUpdateHandler,
  deleteUser,
  adminRegisterHandler,
};
