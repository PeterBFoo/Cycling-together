const bycicleController = require("../controllers/BycicleController.js");
const router = require("express").Router();

// Create a new Bycicle
router.post("/register", bycicleController.registerBycicle);

// Retrieve all bycicles
router.get("/", bycicleController.findAllBycicles);

// Retrieve a single Bycicle with id
router.get("/get/:id", bycicleController.findOneBycicle);

// Update a Bycicle with id
router.put("/update/:id", bycicleController.updateBycicle);

// Delete a Bycicle with id
router.delete("/delete/one/:id", bycicleController.deleteBycicle);

// Delete all bycicles
router.delete("/delete/all", bycicleController.deleteAllBycicles);

module.exports = router;
