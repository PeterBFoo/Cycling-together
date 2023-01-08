const storeController = require("../controllers/StoreController");
const storeMiddleware = require("../middleware/StoreMiddleware");
const router = require("express").Router();

// Retrieve all stores
router.get("/", storeController.findAllStores);

// Retrieve a single Store with id
router.get("/get/:id", storeController.findOneStore);

// Create a new Store
router.post("/register", function (req, res, next) {
	if (storeMiddleware.validateRequest(req)) next();
	else {
		res.status(400).send({
			message: "Content can not be empty!"
		});
	}
}, function (req, res, next) {
	if (storeMiddleware.isValidStore(req.body)) next();
	else {
		res.status(400).send({
			message: "Invalid store data!"
		});
	}
}, storeController.registerStore);

// Update a Store with id
router.put("/update/:id", function (req, res, next) {
	if (storeMiddleware.validateRequest(req)) next();
	else {
		res.status(400).send({
			message: "Content can not be empty!"
		});
	}
}, function (req, res, next) {
	if (storeMiddleware.isValidStore(req.body)) next();
	else {
		res.status(400).send({
			message: "Invalid store data!"
		});
	}
}, storeController.updateStore);

// Delete a Store with id
router.delete("/delete/one/:id", storeController.deleteOne);

// Delete all stores
router.delete("/delete/all", storeController.deleteAll);

// Find all the bycicles that are in a store
router.get("/:id/bycicles", storeController.findAssociatedBikes);

module.exports = router;