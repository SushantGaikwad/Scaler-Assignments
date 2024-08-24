Problem Statement:
You're tasked with developing a backend service for a simple note-taking application. The service should allow users to perform CRUD (Create, Read, Update, Delete) operations on notes. Notes should be stored in a MongoDB Atlas database, and the backend should be built using Express and middleware for handling request and response data. Below are the requirements:

Create a Note: Users should be able to create a new note by sending a POST request to /notes. The request body should contain a JSON object with title and content fields. You need to validate that both fields are present and not empty.

Read Notes: Users should be able to get a list of all notes by sending a GET request to /notes. Each note should include its id, title, and content.

Update a Note: Users should be able to update an existing note by sending a PUT request to /notes/:id. The request should include a JSON object with the fields that need to be updated (title and/or content).

Delete a Note: Users should be able to delete a note by sending a DELETE request to /notes/:id.

Error Handling: You must implement error handling middleware to manage cases where the request contains invalid data or references a non-existent note. Return appropriate HTTP response codes (400 for bad requests, 404 for not found, etc.).

Possible Approach
Defining Routes: Implement routes for each CRUD operation. Ensure proper validation for request bodies and parameters.

Middleware for Error Handling: Create middleware to handle and log errors, and send appropriate HTTP response codes to the client.

MongoDB Integration: Use Mongoose's methods to perform CRUD operations on the database.

Write your code in src/api.js