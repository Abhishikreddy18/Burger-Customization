const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const path = require("path");
//dot config
dotenv.config();

//mongodb connection
connectDB();
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
app.use("/burgers", require("./routes/burgerroute"));
app.use("/api/users", require("./routes/userRoute"));
app.use("/api/order", require("./routes/orderRoute"));
app.use("/api/admin", require("./routes/adminroutes"));
app.use("/api/ingredients", require("./routes/ingredientsroute"));

app.use(require("./middleware/Errorhandler"));
app.use("*", function (req, res) {
  res.sendFile(path.join(__dirname, "../frontend/build/index.html"));
});
app.listen(8800, () => {
  console.log("server is running on port 8800");
});
