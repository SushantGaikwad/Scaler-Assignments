/*********************code to be  written in the stub*************************/
const express = require("express");
const bcrypt = require("bcrypt");
const app = express();
app.use(express.json());

const users = []; // In-memory storage for users
app.listen(3000, () => {
    console.log('>>> Server is running on PORT 3000');
})

app.post("/register", async (req, res) => {
  /************************learner code ************************/
  // Here goes the learner's code
  try {
    console.log('>>> Register Handler Started');
    const {username, password} = req.body;
    if(!username || !password){
        res.status(400).json({message: 'Username and password are required'});
        return;
    }
    const saltRound = 5;
    const hashedPassword = await bcrypt.hash(password, saltRound);
    console.log(">>>   hashedPassword:", hashedPassword);
    users.push(hashedPassword);
    console.log(">>>   users:", users);
    
    res.status(201).json({message: 'User registered successfully'});
  } catch (error) {
    res.status(500).json(error.message)
  }
});

module.exports = app;
/***********************code will be provided in stub*******************************/
