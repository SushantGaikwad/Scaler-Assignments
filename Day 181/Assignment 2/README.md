You are tasked with creating a RESTful API for managing user accounts in a web application. The solution will use the Express framework, middleware for input validation, and MongoDB Atlas as the database backend. The API should cover the following requirements:

Routes and Endpoints:

POST /users: Create a new user account. The request body should contain a JSON object with fields username, password, and email.
GET /users: Fetch a list of all user accounts.
GET /users/:id: Fetch a single user account by its ID.
PUT /users/:id: Update a user's account information. The request body can contain any combination of username, password, or email.
DELETE /users/:id: Delete a user's account by its ID.


Database Connection: Connect to MongoDB Atlas using Mongoose.

Mongoose Schema: Define a User schema with username, password, and email.

Middleware for Input Validation: Check that the username, password, and email fields are valid in the POST and PUT requests:

username: should be a non-empty string.
password: should be a string with at least 6 characters.
email: should be in a valid email format (can use the validator library for this).
CRUD Routes: Define CRUD routes:

POST /users: Creates a new user account.
GET /users: Fetches all user accounts.
GET /users/:id: Fetches a specific user account by its ID.
PUT /users/:id: Updates a user's account information.
DELETE /users/:id: Deletes a user's account by its ID.

Write your code in src/api.js