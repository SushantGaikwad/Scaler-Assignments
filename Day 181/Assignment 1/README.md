# Scaler-Assignments
You are tasked with creating a RESTful API for a simple book management system using the Express framework, middleware for authentication, and MongoDB Atlas as the database backend. Your solution should cover the following requirements:

Routes and Endpoints:

GET /books: Fetch a list of all books in the database.
POST /books: Add a new book to the database. The request body should contain a JSON object with fields title, author, and year.
GET /books/:id: Fetch a single book by its ID.
PUT /books/:id: Update a book by its ID. The request body can contain any combination of title, author, and year fields.
DELETE /books/:id: Delete a book by its ID.
Middleware:

Authentication: Implement an authentication middleware that verifies an API key passed in the Authorization header. If the key is invalid or missing, respond with a 401 Unauthorized status. The key can be hardcoded for simplicity (e.g., "mysecretkey").
Error Handling: Implement a global error handler to catch any errors and respond with a 500 Internal Server Error status, along with a descriptive message.
Database:

MongoDB Atlas: Use MongoDB Atlas for storing the books. Define a Mongoose schema for a Book with fields title (String), author (String), and year (Number).

Database Connection: Connect to MongoDB Atlas using Mongoose. Mongoose Schema: Define a Book schema with title, author, and year fields. Authentication Middleware: Implement middleware to check the API key in the request headers. If valid, allow the request to proceed; otherwise, respond with a 401 Unauthorized. CRUD Routes: Define CRUD routes:

GET /books: Fetches all books from the database.
POST /books: Adds a new book to the database.
GET /books/:id: Fetches a specific book by its ID.
PUT /books/:id: Updates a book by its ID.
DELETE /books/:id: Deletes a book by its ID.

Write your code in src/api.js