const express = require("express");
const mongoose = require("mongoose");
const app = express();
app.use(express.json());

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

  app.listen(3000, () => {
    console.log('>>> Server connected to port 3000');
  })

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

app.post('/movies', async (req,res) => {
  try {
      console.log('>>> Saving Movies Handler Started :', req.body);
        const body = req.body;

        const movie = new Movie (body)
        console.log('>>> movie :',movie);
        const data = await movie.save()
        res.status(200).json(data);
    } catch (error) {
      console.log('>>>ERROR :' ,error);
        res.status(500).json({message: 'Internal server error'});
    }
})

module.exports = { app, Movie };
