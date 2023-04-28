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

router.get("/top10", (req, res) => {
  const promise = Movie.MovieSchema.find({}).limit(10).sort({ imdb_score: -1 });
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

router.get("/:movie_id", (req, res, next) => {
  //   res.send(req.params); urlden parametle almak
  const promise = Movie.MovieSchema.findById(req.params.movie_id);

  promise
    .then(data => {
      if (!data) next(res.json("The movie was not found."));
      res.json(data);
    })
    .catch(err => {
      res.json(err);
    });
});

router.put("/:movie_id", (req, res, next) => {
  //   res.send(req.params); urlden parametle almak
  const promise = Movie.MovieSchema.findByIdAndUpdate(
    req.params.movie_id,
    req.body,
    {
      new: true,
    }
  );

  promise
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      res.json(err);
    });
});

router.delete("/:movie_id", (req, res, next) => {
  //   res.send(req.params); urlden parametle almak
  const promise = Movie.MovieSchema.findByIdAndRemove(req.params.movie_id);

  promise
    .then(data => {
      res.json({
        status: 1,
        message: `${data.title} başlıklı film silindi`,
      });
    })
    .catch(err => {
      res.json(err);
    });
});

router.get("/between/:start_year/:end_year", (req, res) => {
  const { start_year, end_year } = req.params;
  const promise = Movie.MovieSchema.find({
    year: { $gte: parseInt(start_year), $lte: parseInt(end_year) },
    // gte ve lte yapınca yazılı olan tarihleri de veriyor ancak gt ve lt yapılırsa kendileri hariç olanları getiricektir.
  });

  promise
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      req.json(err);
    });
});
export default router;
