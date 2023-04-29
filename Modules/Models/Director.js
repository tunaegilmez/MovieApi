import mongoose from "mongoose";

// const Schema = mongoose.Schema;

const DirectorSchema = mongoose.model(
  "Director",
  new mongoose.Schema({
    name: String,
    surname: String,
    bio: String,
    createdAt: {
      type: Date,
      default: Date.now,
    },
  })
);

export default {
  DirectorSchema,
};
// module.exports = mongoose.model("movie", MovieSchema);
