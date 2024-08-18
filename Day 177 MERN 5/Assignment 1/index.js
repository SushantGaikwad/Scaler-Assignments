const express = require("express");
const mongoose = require("mongoose");
const app = express();
app.use(express.json());

app.listen(3000, () => {
  console.log(">>> Server is running on Port 3000");
});

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

const movieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  duration: { type: Number, required: true },
  genre: { type: String, required: true },
  language: { type: String, required: true },
  releaseDate: { type: Date, required: true },
  poster: { type: String, required: true },
});



// Your code to implement the pre-save hook goes here
movieSchema.pre("save", function (next) {
  console.log(">>> Pre Save hook");
  console.log(">>> Record :", this);
  if(this.duration <= 0){
    throw new Error(`Duration can't be negative or zero`);
  }
  next();
});

const Movie = mongoose.model("Movie", movieSchema);


app.post('/movies', async (req,res) => {
    try {
        console.log('>>> Saving Movies Handler Started :', req.body);
          const body = req.body;
  
        //   const movie = new Movie (body)
        //   console.log('>>> movie :',movie);
        //   const data = await movie.save()
        const data = await Movie.create(body);
          res.status(201).json(data);
      } catch (error) {
        console.log('>>>ERROR :' ,error);
          res.status(500).json({message: 'Internal server error', error: error.message});
      }
  })

module.exports = Movie;
