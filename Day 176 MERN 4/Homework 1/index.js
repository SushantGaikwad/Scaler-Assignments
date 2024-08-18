const express = require("express");
const mongoose = require("mongoose");
const app = express();
app.use(express.json());

app.listen(3000,() =>{
    console.log('>>> Server is running on Port 3000');
})

const dbUrl =
  "mongodb+srv://SushantGaikwad1996:mXImgjmWB5EdAefK@cluster0.vj2o3.mongodb.net/";

mongoose
  .connect(dbUrl)
  .then((connection) => {
    console.log(">>>DB Connected");
  })
  .catch((error) => {
    console.log(">>>Error  :", error);
  });

const Movie = mongoose.model(
  "Movie",
  new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    duration: { type: Number, required: true },
    genre: { type: String, required: true },
    language: { type: String, required: true },
    releaseDate: { type: Date, required: true },
    poster: { type: String, required: true },
  })
);

// Your code goes here.

app.put('/movies/:id', async (req,res) =>{
    try {
        console.log('>>> Updating movie handler started :', req.body);
        const { id } = req.params;
        const body = req.body;
        const movie = await Movie.findById(id);
        if(!movie){
            res.status(404).json({message: "404 Not Found"});
            return;
        }

        const updatedData = await Movie.findByIdAndUpdate(id, body, {new: true});

        res.status(200).json(updatedData);
    } catch (error) {
        console.log('>>>Error :',error);
        res.status(500).json({message: "Internal Server Error"});
    }
})



module.exports = app;
