import express from "express";
import User from "../Models/User.js";
import bcrypt from "bcryptjs";

const router = express.Router();

router.post("/register", (req, res, next) => {
  const { username, password } = req.body;

  bcrypt.hash(password, 10).then(hash => {
    const user = new User.UserSchema({
      username,
      password: hash,
    });

    const promise = user.save();

    promise
      .then(data => {
        res.json(data);
      })
      .catch(err => {
        res.json(err);
      });
  });
});

export default router;
