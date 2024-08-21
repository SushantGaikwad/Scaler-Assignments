/*********************code to be  written in the stub*************************/
const express = require('express');
const app = express();
/*********************code to be  written in the stub*************************/
/**
 * Express middleware to log incoming requests
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function
 */
function requestLoggerMiddleware(req, res, next) {
  /************************learner code ************************/
  // Here goes the learner's code
  console.log(`${req.method} request received`);
  console.log('Timestamp :', new Date());
  next();
}
app.use(requestLoggerMiddleware); // For using Middleware globally
module.exports = app;
/***********************code will be provided in stub*******************************/
