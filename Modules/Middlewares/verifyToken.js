import jwt from "jsonwebtoken";

export default (req, res, next) => {
  //   const token =
  //     req.headers["x-access-token"] || req.body.token || req.query.token;

  const token = req.headers.authorization.split(" ")[1];

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

// export default (req, res, next) => {
//   try {
//     const token = req.headers.authorization.split(" ")[1];
//     const decoded = jwt.verify(token, CONFIG.JWT.secret);
//     if (decoded) req[decoded.type] = decoded;
//     console.log(token);
//     return next();
//   } catch (err) {
//     return next();
//   }
// };
