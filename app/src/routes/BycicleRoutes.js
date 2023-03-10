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
router.get("/get/:id", function (req, res, next) {
	if (bycicleMiddleware.validateId(req.params.id)) next();
	else {
		res.status(400).send({
			message: "Invalid id!"
		});
	}
}, bycicleController.findOneBycicle);

// Retrieve all bycicles by a property
router.get("/get/:property/:value", function (req, res, next) {
	if (bycicleMiddleware.propertyExists(req.params.property)) next();
	else {
		res.status(400).send({
			message: "Invalid property!"
		});
	}
}, bycicleController.filterBy);

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
