# Scaler-Assignments
You need to create a GET route at the path "/movies" using Express.js. This route will be responsible for retrieving all movie records from a MongoDB database and responding with the result in JSON format. The database contains a collection of movies, each adhering to a specific schema (which is provided in the code stub). Your task is to implement the GET route so that it connects to the MongoDB database, retrieves all movie.

Define a GET route at the path "/movies".
The GET route should retrieve all movies from the MongoDB database and respond with the result.

Initialize dependencies by importing and configuring necessary libraries (express, mongoose). Connect to MongoDB using Mongoose with a specified connection string. Define the Mongoose model by creating a Movie model with a schema that includes fields for title, description, duration, genre, language, release date, and poster. Implement a GET route at "/movies" that queries all movies from the database using Movie.find(). Use try-catch blocks within your route handling to catch and respond to errors.
Write your code in src/api.js