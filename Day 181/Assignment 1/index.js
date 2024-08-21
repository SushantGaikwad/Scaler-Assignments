const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
require('dotenv').config();
const app = express();
app.use(bodyParser.json());

// Replace with your MongoDB Atlas connection string
console.log(">>> env : ", process.env.NODE_ENV);

const MONGO_URI = process.env.NODE_ENV === "local" 
? "mongodb+srv://SushantGaikwad1996:mXImgjmWB5EdAefK@cluster0.vj2o3.mongodb.net/"
: "mongodb://localhost:27017/myApp";

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
    console.log('>>> DB Connected');
}).catch((error) => {
    console.log('>>> Error in Connecting to DB :', error);
})

// Define the Book schema and model
const bookSchema = new mongoose.Schema({
  title: String,
  author: String,
  year: Number,
});

const Book = mongoose.model("Book", bookSchema);

app.listen(3000, () => {
    console.log('>>> Server is Running on PORT 3000');
})

// Middleware for authentication
function authenticate(req, res, next) {
  // Implement authentication logic
  if(!req.headers.authorization){
    res.status(401).send('No Secret Key');
    return;
  }
  if(req.headers.authorization !== 'mysecretkey' ){
    res.status(401).send('401 Unauthorized');
    return;
  }
  next();
}

// Routes for the CRUD operations

// GET /books
app.get("/books", authenticate, async (req, res, next) => {
  // Implement logic to fetch all books
  try {
    console.log('>>> Getting Books Handler Started ');
    const books = await Book.find();
    res.status(200).send(books);
  } catch (error) {
    console.log(">>>   Error:", error);
    res.status(500).json({message: 'Internal Server Error', error: error.message});
  }
});

// POST /books
app.post("/books", authenticate, async (req, res, next) => {
  // Implement logic to add a new book
  try {
    console.log('>>> Save Books Handler Started ');
    const data = await Book.create(req.body);

    res.status(200).json(data);    
  } catch (error) {
    console.log(">>>   Error:", error);
    res.status(500).json({message: 'Internal Server Error', error: error.message});
  }
});

// GET /books/:id
app.get("/books/:id", authenticate, async (req, res, next) => {
  // Implement logic to fetch a single book by ID
  try {
    console.log('>>> Get Book by Id Handler Started ');
    const { id } = req.params;
    const book = await Book.findById(id);
    res.status(200).json(book);
  } catch (error) {
    console.log(">>>   Error:", error);
    res.status(500).json({message: 'Internal Server Error', error: error.message});
  }
});

// PUT /books/:id
app.put("/books/:id", authenticate, async (req, res, next) => {
  // Implement logic to update a book by ID
  try {
    console.log('>>> Update Book by Id Handler Started ');
    const { id } = req.params;
    const book = await Book.findByIdAndUpdate(id, req.body,{new: true});
    res.status(200).json(book);
  } catch (error) {
    console.log(">>>   Error:", error);
    res.status(500).json({message: 'Internal Server Error', error: error.message});
  }
});

// DELETE /books/:id
app.delete("/books/:id", authenticate, async (req, res, next) => {
  // Implement logic to delete a book by ID
  try {
    console.log('>>> Delete Book by Id Handler Started ');
    const { id } = req.params;
    await Book.findByIdAndDelete(id);
    res.status(200).json({message: 'Book deleted successfully'});
  } catch (error) {
    console.log(">>>   Error:", error);
    res.status(500).json({message: 'Internal Server Error', error: error.message});
  }
});

// Global error handler
app.use((err, req, res, next) => {
  console.log(">>>   err:", err);
  // Implement global error handling logic
  res.status(500).send('Internal Server Error');  
});

module.exports = { app, Book };
