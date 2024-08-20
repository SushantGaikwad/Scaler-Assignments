The goal is to implement JWT-based authentication within an Express.js application. The application should manage two routes: /login for user authentication and /secret for protected content access. Users log in by providing credentials, and on successful authentication, they receive a JWT. This token is then used to access the protected route.

Express.js Setup: The application should use the Express.js framework.
JWT Implementation: Use the jsonwebtoken library for generating and verifying tokens.
Routes:
/login (POST): Accepts credentials (username and password) and returns a JWT on successful authentication.
/secret (GET): Requires a valid JWT in the Authorization header to access.

For the /login route, check if the provided username and password match preset credentials (e.g., "admin" and "password"). If they match, generate a JWT with the username as the payload, signed with a secret key, and respond with this token. If the credentials do not match, respond with an error("Invalid credentials").
For the /secret route, retrieve the JWT from the Authorization header and verify it using the same secret key used for signing. If the token is valid, respond with a welcome message("Welcome to the secret area"). If invalid, respond with an error.
Write your code in src/api.js