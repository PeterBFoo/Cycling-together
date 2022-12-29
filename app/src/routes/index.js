var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res) {
	return res.send("Welcome").status(200);
});

module.exports = router;
