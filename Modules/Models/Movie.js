import mongoose from "mongoose";

const Schema = mongoose.Schema;

const MovieSchema = mongoose.model(
  "Movie",
  new mongoose.Schema({
    director_id: Schema.Types.ObjectId,
    title: {
      type: String,
      required: true,
    },
    category: String,
    country: String,
    year: Number,
    imdb_score: Number,
    date: {
      type: Date,
      default: Date.now,
    },
  })
);

export default {
  MovieSchema,
};
// module.exports = mongoose.model("movie", MovieSchema);
