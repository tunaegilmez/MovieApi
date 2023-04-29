import mongoose from "mongoose";

const UserSchema = mongoose.model(
  "User",
  new mongoose.Schema({
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      minlength: [6, "Şifre 6 karakterden uzun olmalı"],
    },
  })
);

export default {
  UserSchema,
};
