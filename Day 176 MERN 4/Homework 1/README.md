# Scaler-Assignments
You are developing a web application using Express in Node.js. Create an Express route that handles PUT requests to the endpoint "/movies/". This route should update a movie by its ID in the MongoDB database and respond with the updated movie's data.

Define a PUT route at the path "/movies/:id".
The PUT route should update a movie by ID from the MongoDB database and respond with the updated movie's data.

Set up dependencies by importing necessary libraries (express, mongoose) and ensuring Express is set up to parse JSON requests. Connect to MongoDB using Mongoose with a specified connection string. Define the Mongoose model by creating a Movie model with a schema that specifies fields such as title, description, duration, genre, language, release date, and poster. Implement a PUT route at "/movies/:id" that uses Movie.findByIdAndUpdate to update the movie based on the provided ID and request body. Use the option { new: true } to return the updated document. Use a try-catch block to handle any exceptions, and check if the movie is found; if not, respond with a 404 error("Movie not found").
Write your code in src/api.js