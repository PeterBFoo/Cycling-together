const bycicleController = require("../controllers/BycicleController.js");
const bycicleMiddleware = require("../middleware/BycicleMiddleware.js");
const router = require("express").Router();


// Create a new Bycicle
router.post("/register", function (req, res, next) {
	if (bycicleMiddleware.validateRequest(req)) next();
	else {
		res.status(400).send({
			message: "Content can not be empty!"
		});
	}
}, function (req, res, next) {
	if (bycicleMiddleware.isValidBike(req.body)) next();
	else {
		res.status(400).send({
			message: "Invalid bike data!"
		});
	}
}, bycicleController.registerBycicle);

// Retrieve all bycicles
router.get("/", bycicleController.findAllBycicles);

// Retrieve a single Bycicle with id
router.get("/get/:id", bycicleController.findOneBycicle);

// Retrieve all bycicles by category
router.get("/get/category/:category", bycicleController.filterByCategory);

// Retrieve all bycicles by brand
router.get("/get/brand/:brand", bycicleController.filterByBrand);

// Update a Bycicle with id
router.put("/update/:id", function (req, res, next) {
	if (bycicleMiddleware.validateRequest(req)) next();
	else {
		res.status(400).send({
			message: "Content can not be empty!"
		});
	}
}, function (req, res, next) {
	if (bycicleMiddleware.isValidBike(req.body)) next();
	else {
		res.status(400).send({
			message: "Invalid bike data!"
		});
	}
}, bycicleController.updateBycicle);

// Delete a Bycicle with id
router.delete("/delete/one/:id", bycicleController.deleteBycicle);

// Delete all bycicles
router.delete("/delete/all", bycicleController.deleteAllBycicles);

module.exports = router;
