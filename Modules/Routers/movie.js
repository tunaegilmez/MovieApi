import express from "express";
import Movie from "../Models/Movie.js";

const router = express.Router();

router.get("/", (req, res) => {
  const promise = Movie.MovieSchema.find({});
  promise
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      req.json(err);
    });
});

router.post("/", (req, res, next) => {
  //   const { title, imdb_score, category, country, year } = req.body;
  const movie = new Movie.MovieSchema(req.body);

  const promise = movie.save();
  promise
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      res.json(err);
    });
});

router.get("/:movie_id", (req, res) => {
  //   res.send(req.params); urlden parametle almak
  const promise = Movie.MovieSchema.findById(req.params.movie_id);

  promise
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      res.json(err);
    });
});

export default router;
