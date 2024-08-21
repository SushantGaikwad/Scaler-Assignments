/*********************code to be  written in the stub*************************/
const express = require('express');
const app = express();

// Middleware to validate age
function validateAge(req, res, next) {
  /************************learner code ************************/
  // Here goes the learner's code
  const { age } = req.query;

  if(+age >= 18 && +age <= 65){
    next();
    return;
  }
  res.status(400).json({error:'Invalid age. Age must be a number between 18 and 65.'});
}

// Route that requires age validation
app.get("/check-age", validateAge, (req, res) => {
  res.json({ message: "Age is within the required range." });
});

module.exports = app;