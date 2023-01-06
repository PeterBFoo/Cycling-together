const storeController = require("../controllers/StoreController");
const router = require("express").Router();

// Create a new Store
router.post("/register", storeController.create);

// Retrieve all stores
router.get("/", storeController.findAll);

// Retrieve a single Store with id
router.get("/get/:id", storeController.findOne);

// Update a Store with id
router.put("/update/:id", storeController.update);

// Delete a Store with id
router.delete("/delete/one/:id", storeController.deleteOne);

// Delete all stores
router.delete("/delete/all", storeController.deleteAll);

// Find all the bycicles that are in a store
router.get("/:storeId/bycicles", storeController.findAssociatedBikes);

module.exports = router;