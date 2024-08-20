const express = require("express");
const cookieParser = require("cookie-parser");

const app = express();
app.use(cookieParser());

app.listen(3000, () => {
  console.log(">>> Server is running on PORT 3000");
});

app.get("/visit", (req, res) => {
  // Implementation for visit counting
  console.log(">>>  Visit handler started");
  try {
    const countFromCookie = req.cookies.visitCount;
    console.log(">>> countFromCookie ", countFromCookie);
    let newCount;
    if(countFromCookie === undefined){
      newCount = 1;
      res.cookie('visitCount', newCount);
    }else{
      newCount = +countFromCookie + 1;
      res.cookie('visitCount', newCount);
    }
    // res.clearCookie('count');
    res.status(200).send(`This is your visit number ${newCount}`);
  } catch (error) {
    console.log(">>> Error :", error);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
});

module.exports = app;
