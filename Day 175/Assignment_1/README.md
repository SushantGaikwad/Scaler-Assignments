You are tasked with creating a basic Express.js application. The application should perform the following operations:

Connect to a MongoDB database using the Mongoose ORM.
Define a Mongoose model for a Product with fields for name, brand, price, and specs.
Define two routes: a GET route at the path "/products" and a POST route at the path "/products".
The GET route should retrieve all products from the MongoDB database and respond with the result.
The POST route should accept JSON data in the format { "name": "Smartphone", "brand": "XYZ", "price": 699, "specs": { "display": "6.5 inches", "storage": "128GB", "camera": "Quad-camera setup" } }, create a new product in the MongoDB database, and respond with the created product.
Use async/await syntax for handling asynchronous operations.
Setup dependencies and middleware by importing necessary libraries (express, mongoose) and configuring Express to use middleware for JSON parsing. Connect to MongoDB using Mongoose with a connection string, ensuring your MongoDB service is up and running. Define the Mongoose model by creating a Product model using mongoose.Schema to outline the structure (name, brand, price, specs). Implement routes by creating a GET route at "/products" to fetch all products from the database using Product.find() and return them in JSON format, and a POST route at "/products" to accept data in JSON format, create a new Product instance, save it to the database, and return the created product. Add error handling by including try-catch blocks in your async functions to handle and respond to errors appropriately.
Write your code in src/api.js