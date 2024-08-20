You are tasked with enhancing the functionality of a MongoDB-based movie management system using Mongoose. Specifically, you need to implement a post-save hook for a Movie model. This hook should log a specific message to the console each time a movie document is saved to the database, providing feedback that the save operation has been successful..

Model Setup: Define a Mongoose model for a movie with the necessary attributes.
Post-save Hook: Implement a post-save middleware that triggers after a movie is saved to the database.
Logging: The middleware should log the message "Movie [movie title] has been saved" to the console.

The mongoose.Schema class provides a method called post('save') that allows you to define a function that will be executed after a document is saved to the database. To implement the post-save hook, integrate middleware by adding a post-save middleware to the Movie schema using Mongoose's schema.post() method. Use the doc parameter in the post-save hook to access the saved movie document. Within the middleware, log the movie title included in the saved document to the console.
Write your code in src/api.js