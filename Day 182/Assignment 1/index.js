const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
require('dotenv').config();
// Initialize Express app
const app = express();
app.use(bodyParser.json());

// MongoDB Atlas connection string
const mongoURI =
  process.env.NODE_ENV === "test"
    ? "mongodb+srv://SushantGaikwad1996:mXImgjmWB5EdAefK@cluster0.vj2o3.mongodb.net/"
    : "mongodb://localhost:27017/myApp";

app.listen(3000, () => {
  console.log(">>> Server is staring on port 3000");
});

// Connect to MongoDB Atlas
mongoose
  .connect(mongoURI)
  .then(() => console.log("Connected to MongoDB Atlas"))
  .catch((err) => console.log("Database connection error:", err));

// Define Note schema and model
const noteSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
});

const Note = mongoose.model("Note", noteSchema);

const noteInputValidator = (req,res,next) => {
    console.log('>>> BODY : ', req.body)
    const { title, content} = req.body;
    if(title === "" || content === "")
    {
        throw new Error ('Title/Content should be valid string')
    }
    next();
}

// Routes
// TODO: Implement CRUD routes

//Post API
app.post("/notes", noteInputValidator, async (req, res, next) => {
  try {
    console.log(">>> Save Notes Handler Started ");
    const data = await Note.create(req.body);

    res.status(201).json(data);
  } catch (error) {
    console.log(">>>   Error:", error);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
});

//Get API to fetch all Notes
app.get("/notes", async (req, res, next) => {
  try {
    console.log(">>> Get all Notes Handler Started ");
    const data = await Note.find();

    res.status(200).json(data);
  } catch (error) {
    console.log(">>>   Error:", error);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
});

app.put("/notes/:id", noteInputValidator,  async (req, res, next) => {
  try {
    console.log(">>> Update Notes Handler Started ");
    const { id } = req.params;

    const data = await Note.findByIdAndUpdate(id, req.body, { new: true });

    res.status(200).json(data);
  } catch (error) {
    console.log(">>>   Error:", error);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
});

app.delete("/notes/:id", async (req, res, next) => {
  try {
    console.log(">>> Update Notes Handler Started ");
    const { id } = req.params;

    await Note.findByIdAndDelete(id);

    res.status(200).json({ message: "Note deleted successfully" });
  } catch (error) {
    console.log(">>>   Error:", error);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
});

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ error: err.message });
});

module.exports = {app, Note};
