import express from "express";
import db from "./db.js";
import cors from "cors";
import("dotenv/config");
import bodyParser from "body-parser";

import movieRouter from "./Modules/Routers/movie.js";
import directorRouter from "./Modules/Routers/director.js";

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
app.use("/api/directors", directorRouter);

// // error handler
// app.use((err, req, res, next) => {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get("env") === "development" ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.json({ error: { message: err.message, code: err.code } });
// });

db.on("connected", () => {
  console.log("mongoDB connected");
  app.listen(port, () => {
    console.log(`MovieAPI app listening on port ${port}`);
  });
});