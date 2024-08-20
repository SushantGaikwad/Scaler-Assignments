const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
require('dotenv').config();
app.use(express.json());

app.listen(3000, () => {
  console.log(">>> Server is running on PORT 3000");
});


app.post("/login", (req, res) => {
  // Implementation for login
  try {
    console.log(">>> Login Handler Started");
    const body = req.body;
    console.log(">>> body :", body);
    const { username, password } = body;
    console.log(">>>   username:", username);
    console.log(">>>   password:", password);
    if (username != "admin" || password != "password") {
      throw new Error("Invalid credentials");
    }
    const token = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: "1d" });
    console.log(">>>   token:", token);
    // const verify = jwt.verify(token, JWT_SECRET);
    // console.log(">>>   verify:", verify);

    res
      .status(200)
      .send({ success: true, message: "User Logged In", token: token });
  } catch (error) {
    console.log(">>> Error :", error);
    res.status(401).send(error.message);
  }
});

app.get("/secret", (req, res) => {
  // Implementation for token validation and response
  try {
    console.log(">>> Secret Handler Started", req.headers.authorization);
    if(!req.headers.authorization){
      res.status(401).send('No JWT');
      return;
    }
    const token = req.headers.authorization.split(' ')[1];
    const verifiedToken = jwt.verify(token, process.env.JWT_SECRET);
    console.log(">>>   verifiedToken:", verifiedToken);
    if (verifiedToken.username != "admin") {
      throw new Error("invalid token");
    }
    res.status(200).send("Welcome to the secret area");
  } catch (error) {
    res.status(403).json({ message: error.message });
  }
});

module.exports = app;
