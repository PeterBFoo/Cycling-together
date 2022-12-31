const bycicleController = require("../controllers/BycicleController.js");
const router = require("express").Router();

// Create a new Bycicle
router.post("/register", bycicleController.create);

// Retrieve all bycicles
router.get("/", bycicleController.findAll);

// Retrieve a single Bycicle with id
router.get("/:id", bycicleController.findOne);

// Update a Bycicle with id
router.put("/:id", bycicleController.update);

// Delete a Bycicle with id
router.delete("/:id", bycicleController.delete);

// Delete all bycicles
router.delete("/", bycicleController.deleteAll);

module.exports = router;
