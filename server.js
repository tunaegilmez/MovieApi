import express from "express";
import db from "./db.js";
import cors from "cors";
import("dotenv/config");
import bodyParser from "body-parser";

import movieRouter from "./Modules/Routers/movie.js";

const app = express();
const port = process.env.port || 3000;

app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("<h1>Hello MovieAPI</h1>");
});

app.use("/api/movies", movieRouter);

db.on("connected", () => {
  console.log("mongoDB connected");
  app.listen(port, () => {
    console.log(`MovieAPI app listening on port ${port}`);
  });
});
