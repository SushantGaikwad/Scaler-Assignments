Problem Statement 

You are tasked with creating a basic Express.js application. The application should perform the following operations:

Connect to a MongoDB database using the Mongoose ORM.
Define a Mongoose model for a User with fields for name and email.
Define a GET route at the path "/users/:id".
The GET route should retrieve a user by ID from the MongoDB database and respond with the result. The ID should be provided as a parameter in the URL.
Use async/await syntax for handling asynchronous operations.
Setup dependencies by importing necessary libraries (express, mongoose). Connect to MongoDB using Mongoose. Define the Mongoose model by creating a User model using mongoose.Schema to structure the user data (name, email). Implement the GET route at "/users/:id" to retrieve a user by their ID using User.findById() from Mongoose, passing the id parameter from the URL. Add error handling by checking if no user is found and responding with a 404 Not Found status. Use a try-catch block to handle and respond to any errors during database operations with a 500 Internal server error.
Write your code in src/api.js
