var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  console.log("request data", req);
  res.send({
    success: true,
    message: "Welcome Anne, go ahead",
  });
});

module.exports = router;
