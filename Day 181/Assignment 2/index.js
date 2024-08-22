const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const validator = require("validator");
require("dotenv").config();
const app = express();
app.use(bodyParser.json());

// Replace with your MongoDB Atlas connection string
console.log(">>> env : ", process.env.NODE_ENV);

const MONGO_URI =
  process.env.NODE_ENV === "local"
    ? "mongodb+srv://SushantGaikwad1996:mXImgjmWB5EdAefK@cluster0.vj2o3.mongodb.net/"
    : "mongodb://localhost:27017/myApp";

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log(">>> DB Connected");
  })
  .catch((error) => {
    console.log(">>> Error in Connecting to DB :", error);
  });

app.listen(3000, () => {
  console.log(">>> Server is Running On Port 3000");
});

// Define the User schema and model
const userSchema = new mongoose.Schema({
  username: { type: String, unique: true },
  password: String,
  email: { type: String, unique: true },
});

const User = mongoose.model("User", userSchema);

// Middleware for input validation
function validateInput(req, res, next) {
  // Implement validation logic
  const { username, password, email } = req.body;
  console.log(">>>   email:", email);
  console.log(">>>   password:", password);
  console.log(">>>   username:", username);

  if (validator.isEmpty(username) || username == "") {
    throw new Error("User Name should valid string");
  }
  if (password.length < 6) {
    throw new Error("Password length should be more that 6 Characters");
  }
  if (!validator.isEmail(email)) {
    throw new Error("Please enter valid email");
  }
  next();
}

// Routes for CRUD operations

// POST /users
app.post("/users", validateInput, async (req, res, next) => {
  // Implement logic to create a new user account
  try {
    console.log(">>> Post Users Handler Started", req.body);
    const user = await User.create(req.body);
    console.log(">>>   user:", user);

    res.status(200).json(user);
  } catch (error) {
    console.log(">>>   Error:", error);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
});

// GET /users
app.get("/users", async (req, res, next) => {
  // Implement logic to fetch all users
  try {
    console.log(">>> Get All Users Handler Started");
    const users = await User.find();
    res.status(200).send(users);
  } catch (error) {
    console.log(">>>   Error:", error);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
});

// GET /users/:id
app.get("/users/:id", async (req, res, next) => {
  // Implement logic to fetch a single user account by ID
  try {
    console.log(">>> Get user by id handler Started");
    const { id } = req.params;
    const user = await User.findById(id);

    res.status(200).json({username: user.username, email: user.email});
  } catch (error) {
    console.log(">>>   Error:", error);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
});

// PUT /users/:id
app.put("/users/:id", validateInput, async (req, res, next) => {
  // Implement logic to update a user account by ID
  try {
    console.log(">>> Update User By Id Handler Started");
    const { id } = req.params;
    const updatedUser = await User.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).send(updatedUser);
  } catch (error) {
    console.log(">>>   Error:", error);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
});

// DELETE /users/:id
app.delete("/users/:id", async (req, res, next) => {
  // Implement logic to delete a user account by ID
  try {
    console.log(">>> Delete User By Id Handler Started");
    const { id } = req.params;
    await User.findByIdAndDelete(id);

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.log(">>>   Error:", error);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
});

// Global error handler
app.use((err, req, res, next) => {
  console.log(">>>   err:", err);
  // Implement global error handling logic
  res.status(500).send("Internal Server Error");
});

module.exports = { app, User };
