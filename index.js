const express = require("express");
const mongoose = require("mongoose");
const studentRoutes = require("./routes/studentsRoute");
require("dotenv").config();

const app = express();
app.use(express.json());
const port = process.env.PORT || 8000;
const DATABASE = process.env.DATABASE || "mongodb://127.0.0.1:27017/users";

mongoose
  .connect(DATABASE)
  .then(() => {
    console.log("Database Connected Successfully");
  })
  .catch((err) => {
    console.error("Database Connection Error:", err);
  });

app.use("/students", studentRoutes);

app.get("/", (req, res) => {
  res.json("Welcome to the Student API");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
