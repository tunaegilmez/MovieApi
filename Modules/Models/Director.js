import mongoose from "mongoose";

// const Schema = mongoose.Schema;

const DirectorSchema = mongoose.model(
  "Director",
  new mongoose.Schema({
    name: {
      type: String,
      maxlength: 15,
      minlength: 2,
    },
    surname: {
      type: String,
      maxlength: 15,
      minlength: 2,
    },
    bio: {
      type: String,
      maxlenght: 1000,
      minlength: 60,
    },
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
