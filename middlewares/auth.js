const jwt = require("jsonwebtoken");
require("dotenv").config();

// middleware for authentication
exports.verifyToken = (req, res, next) => {
  const token =
    req.body.token || req.query.token || req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }
  try {
    const decoded = jwt.verify(token, process.env.TOKEN_KEY);
    req.user = decoded;
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
  return next();
};

// middleware for authorisation
exports.checkAuthorisation = (req, res, next) => {
  const baseUrl = req.baseUrl;
  const userRole = req.user.role;

  baseUrl == "/admin" && userRole == "1"
    ? next()
    : baseUrl == "/trt" && userRole == "2"
    ? next()
    : baseUrl == "/gerant" && userRole == "3"
    ? next()
    : res.status(403).json({
        success: false,
        message: "You're not allowed to access this ressource",
      });
};
