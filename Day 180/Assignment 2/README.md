# Scaler-Assignments
Problem Statement:
You need to develop a middleware for an Express.js application that validates the query parameter age for a specific route. The route /check-age should only process requests where the age parameter is a number between 18 and 65. If the age is not within this range, or if it's not provided, the middleware should respond with an appropriate error message.

Create the basic Express server setup and install Express if not already installed. Write the validateAge middleware:

Extract the age from req.query.
Convert age to a number and check if it's within the specified range.
Respond with an error message if the validation fails.
Use next() to continue to the route handler if the validation succeeds. Define the /check-age route to use the middleware and return a success message.
Write your code in src/api.js