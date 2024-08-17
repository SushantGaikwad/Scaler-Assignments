const express = require("express");
const mongoose = require("mongoose");
require('dotenv').config();
const app = express();
app.use(express.json());

// scaler dbUrl = "mongodb://localhost:27017/myApp"
console.log(">>> env : ", process.env.NODE_ENV);
const dbUrl =
  process.env.NODE_ENV === "local"
    ? "mongodb+srv://SushantGaikwad1996:mXImgjmWB5EdAefK@cluster0.vj2o3.mongodb.net/"
    : "mongodb://localhost:27017/myApp";

mongoose
  .connect(dbUrl)
  .then((connection) => {
    console.log(">>>DB Connected");
  })
  .catch((error) => {
    console.log(">>>Error  :", error);
  });

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    name: { type: String },
    email: { type: String },
  })
);

// Your code goes here

app.listen(3000, () => {
  console.log(">>> Server is Running on Port 3000");
});

app.get("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    console.log(">>> user :", user);
    if (!user) {
      res.status(404).send({ status: 404, message: "User Not Found" });
      return;
    }

    res.status(200).json(user);
  } catch (e) {
    console.log(">>>Error :", e);
    res.status(500).send({ message: "Internal server error" });
  }
});

module.exports = { app, User };
