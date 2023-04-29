import express from "express";
import User from "../Models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

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

router.post("/authenticate", async (req, res) => {
  const { username, password } = req.body;

  let user = await User.UserSchema.findOne({
    username,
  });

  if (!user) {
    res.json({
      status: false,
      message: "Authentication failed, user not found",
    });
  }

  bcrypt.compare(password, user.password).then(result => {
    if (!result) {
      res.json({
        status: false,
        message: "Authentication failed, wrong password",
      });
    } else {
      const payload = {
        username,
      };

      const token = jwt.sign(payload, req.app.get("api_secret_key"), {
        expiresIn: 720, // 12 saat
      });

      res.json({
        status: true,
        token,
      });
    }
  });
});

export default router;
