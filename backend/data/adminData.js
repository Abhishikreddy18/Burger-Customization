// data/adminData.js
const bcrypt = require("bcryptjs");

const adminData = [
  {
    name: "Pratap",
    email: "pratapthondapu432@gmail.com",
    password: bcrypt.hashSync("Bujji@4321", 10), // pre-hashed password
    isAdmin: true,
    isEmployee: false,
  },
];

module.exports = adminData;
