import express from "express";
import User from "../Models/User.js";

const router = express.Router();

router.post("/register", (req, res, next) => {
  const { username, password } = req.body;
  const user = new User.UserSchema({
    username,
    password,
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

export default router;
