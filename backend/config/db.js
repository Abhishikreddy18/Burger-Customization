const mongoose = require("mongoose");
const colors = require("colors");

const connectDB = async () => {
  try {
    const mongoURI = "mongodb://127.0.0.1:27017/Burger";
    console.log("✅ Connecting to MongoDB URL:", mongoURI);

    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 30000, // 30s timeout
      socketTimeoutMS: 45000,
    });

    console.log(
      `Connected To MongoDB Database ${mongoose.connection.host}`.bgMagenta
        .white
    );
  } catch (error) {
    console.log(`❌ MongoDB Connection Error: ${error}`.bgRed.white);
  }
};

module.exports = connectDB;
