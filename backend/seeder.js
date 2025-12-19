// ✅ Load env first
const dotenv = require("dotenv");
dotenv.config();

// ✅ External modules
const mongoose = require("mongoose");

// ✅ Connect to DB
const connectDB = require("./config/db");
connectDB();

// ✅ Models
const Burger = require("./models/burgerSchema");
const User = require("./models/Users");
const Ingredient = require("./models/initialIngredients");

// ✅ Sample Data
const sampleIngredients = require("../frontend/src/logs/ingredients");
const burgerList = require("./logs/Burgers");
const adminData = require("./data/adminData");

const importData = async () => {
  try {
    // 🧹 Clear previous data
    await Burger.deleteMany();
    await User.deleteMany();
    await Ingredient.deleteMany();

    console.log("🧹 Existing data cleared...");

    // 👤 Insert admin(s)
    const createdAdmins = await User.insertMany(adminData);
    const adminUser = createdAdmins[0]; // first admin
    console.log(`✅ Admin added: ${adminUser.email}`);

    // 🍔 Insert burgers with admin as creator
    const burgersWithAdmin = burgerList.map((burger) => ({
      ...burger,
      User: adminUser._id,
    }));
    await Burger.insertMany(burgersWithAdmin);
    console.log("🍔 Burgers inserted:", burgersWithAdmin.length);

    // 🥬 Insert ingredients
    await Ingredient.insertMany(sampleIngredients);
    console.log("🥬 Ingredients inserted:", sampleIngredients.length);

    console.log("✅ All data imported successfully!");
    process.exit();
  } catch (error) {
    console.error("❌ Import Error:", error.message);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Burger.deleteMany();
    await User.deleteMany();
    await Ingredient.deleteMany();
    console.log("🗑️ Data destroyed!");
    process.exit();
  } catch (error) {
    console.error("❌ Destroy Error:", error.message);
    process.exit(1);
  }
};

// 🚀 CLI logic
if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
