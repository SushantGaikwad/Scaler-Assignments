# Scaler-Assignments
Problem Statement:
Create an Express middleware function that logs the date and time (timestamp) along with the HTTP method of every incoming request to the server. This middleware will help in monitoring the activity and troubleshooting by providing a simple but informative log of all requests handled by the server.

Import the express module and create an Express application instance. Create the requestLoggerMiddleware function that logs the timestamp and HTTP method of each request. Apply the middleware globally so that it affects all incoming requests. Define a route to test the middleware functionality. Configure the server to listen on a designated port. Export the application for testing purposes.

Write your code in src/api.js