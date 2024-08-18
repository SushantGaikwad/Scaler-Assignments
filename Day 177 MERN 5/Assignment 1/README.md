# Scaler-Assignments
In a Node.js application using Mongoose as an ODM for MongoDB, you are required to ensure data integrity for a "Movie" model. This model includes several fields: title, description, duration, genre, language, releaseDate, and poster. To maintain the integrity of the "duration" field, you need to implement a pre-save hook in the Mongoose schema. This hook should validate that the movie's duration is neither negative nor zero, as such values are not logically valid for a movie's runtime.

Implement a pre-save hook on the "Movie" model.
Check if the "duration" field is less than or equal to zero.
If the duration is invalid, throw an error with the message: "Duration can't be negative or zero".
Allow the save operation to proceed if the duration is valid.

Involves adding a pre-save middleware to the Mongoose schema for the Movie model, which will intercept the save operation and check the value of the "duration" field. If the duration is less than or equal to zero, the middleware will halt the save operation by passing an error to the next callback function. If the duration is greater than zero, it will allow the save operation to continue by calling the next function without arguments.
Write your code in src/api.js

