const express = require('express');
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res) {
  res.send({ message: "Welcome Home ..." });
});

module.exports = router
