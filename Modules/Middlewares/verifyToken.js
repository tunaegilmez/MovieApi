import jwt from "jsonwebtoken";

export default (req, res, next) => {
  const token =
    req.headers.authorization.split(" ")[1] || req.headers["x-access-token"];

  if (token) {
    jwt.verify(token, req.app.get("api_secret_key"), (err, decoded) => {
      if (err) {
        res.json({
          status: false,
          message: "Failed to authenticate token.",
        });
      } else {
        req.decode = decoded;
        next();
      }
    });
  } else {
    res.json({
      status: false,
      message: "No token provided.",
    });
  }
};
