# Scaler-Assignments
You are developing a web application using Express in Node.js. Create an Express route that handles DELETE requests to the endpoint "/movies/". This route should delete a movie by its ID from the MongoDB database and respond with a success message("successful element deleted").

Define a DELETE route at the path "/movies/:id".
The DELETE route should delete a movie by ID from the MongoDB database and respond with a success message.

Set up dependencies and middleware by using express for server setup and mongoose for database interactions, and initialize middleware to parse JSON bodies. Establish a connection to MongoDB using Mongoose with appropriate connection options. Define the Mongoose model by creating a Movie model according to the schema provided in the stub code. Implement a DELETE route at "/movies/:id" to handle the deletion of a movie by ID using Movie.findByIdAndDelete. Check if the movie exists before deletion; respond with a 404 error("Movie not found") if not found. On successful deletion, return a success message("successful element deleted"). Handle potential errors with appropriate status codes and messages, implementing robust error handling to catch and respond to errors effectively, including database errors and not found errors.
Write your code in src/api.js