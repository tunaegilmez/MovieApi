import express from "express";
import mongoose from "mongoose";
const router = express.Router();

import Director from "../Models/Director.js";

router.get("/", (req, res) => {
  const promise = Director.DirectorSchema.aggregate([
    {
      $lookup: {
        from: "movies",
        localField: "_id",
        foreignField: "director_id",
        as: "movies",
      },
    },
    {
      $unwind: {
        path: "$movies",
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $group: {
        _id: {
          _id: "$_id",
          name: "$name",
          surname: "$surname",
          bio: "$bio",
        },
        movies: {
          $push: "$movies",
        },
      },
    },
    {
      $project: {
        _id: "$_id._id",
        name: "$_id.name",
        surname: "$_id.surname",
        movies: "$movies",
      },
    },
  ]);
  promise
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      req.json(err);
    });
});

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

router.get("/:director_id", (req, res) => {
  const promise = Director.DirectorSchema.aggregate([
    {
      $match: {
        _id: new mongoose.Types.ObjectId(req.params.director_id),
      },
    },
    {
      $lookup: {
        from: "movies",
        localField: "_id",
        foreignField: "director_id",
        as: "movies",
      },
    },
    {
      $unwind: {
        path: "$movies",
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $group: {
        _id: {
          _id: "$_id",
          name: "$name",
          surname: "$surname",
          bio: "$bio",
        },
        movies: {
          $push: "$movies",
        },
      },
    },
    {
      $project: {
        _id: "$_id._id",
        name: "$_id.name",
        surname: "$_id.surname",
        movies: "$movies",
      },
    },
  ]);
  promise
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      req.json(err);
    });
});
export default router;
