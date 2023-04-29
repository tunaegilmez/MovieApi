import express from "express";
const router = express.Router();

import Director from "../Models/Director.js";

router.post("/", (req, res) => {
  const director = new Director.DirectorSchema(req.body);
  const promise = director.save();

  promise
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      res.json(err);
    });
});
export default router;
