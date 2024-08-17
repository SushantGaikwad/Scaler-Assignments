const express = require("express");
const mongoose = require("mongoose");
const app = express();
// Your code goes here.
app.use(express.json());

const dbUrl =
  "mongodb+srv://SushantGaikwad1996:mXImgjmWB5EdAefK@cluster0.vj2o3.mongodb.net/";

// Mongoose Schema for Products
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  brand: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  specs: {
    display: {
      type: String,
    required: true
    },
    storage: {
      type: String,
      required: true
    },
    camera: {
      type: String,
    required: true
    },
  },
});

const ProductModel = mongoose.model("products", productSchema);

// Connecting to the Mongoose DB
mongoose
  .connect(dbUrl)
  .then((connection) => {
    console.log(">>>DB Connected");
  })
  .catch((err) => {
    console.log(">>> Error :", err);
  });

app.listen(3000, () => {
  console.log("Server is running at http://localhost:3000");
});

// Post Route for Storing Products data to the DB
app.post("/products", async (req, res) => {
  try {
    const body = req.body;

    const product = new ProductModel();
    product.name = body.name;
    product.brand = body.brand;
    product.price = body.price;
    product.specs.display = body.specs.display;
    product.specs.storage = body.specs.storage;
    product.specs.camera = body.specs.camera;
    const response = await ProductModel.create(product);
    res.status(201).json(response);
  } catch (error) {
    res.status(400).json({ message: error });
  }
});

app.get("/products", async (req, res) => {
  try {
    const data = await ProductModel.find();
    const response = JSON.stringify(data);

    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({ message: error });
  }
});

module.exports = { app, Product: ProductModel};
