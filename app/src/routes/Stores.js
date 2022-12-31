const storeController = require("../controllers/StoreController");
const router = require("express").Router();

// Create a new Store
router.post("/register", storeController.create);

// Retrieve all stores
router.get("/", storeController.findAll);

// Retrieve a single Store with id
router.get("/:id", storeController.findOne);

// Update a Store with id
router.put("/:id", storeController.update);

// Delete a Store with id
router.delete("/:id", storeController.deleteOne);

// Delete all stores
router.delete("/", storeController.deleteAll);

// Find all the bycicles that are in a store
router.get("/:id/bycicles", storeController.findAssociatedBikes);

module.exports = router;