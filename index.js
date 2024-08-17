const express = require("express");
const app = express();
require("dotenv").config();
const cookieParser = require("cookie-parser")

const PORT = process.env.PORT || 4000;
app.use(express.json());
app.use(cookieParser())

// Route to get all users

// Mount Routes
const Routes = require("./Routes/authRoutes");
app.use("/auth", Routes);

// Database connection
const dbConnect = require("./config/database");

dbConnect()
  .then(() => {
    console.log("Database connected successfully");

    // Start the server
    app.listen(PORT, () => {
      console.log(`Server started successfully on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Database connection failed:", error);
    process.exit(1); // Exit the process with failure
  });

// Default Route
app.get("/", (req, res) => {
  res.send("<h1>Hello World</h1>");
});
