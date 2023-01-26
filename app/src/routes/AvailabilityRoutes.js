const router = require("express").Router();
const availabilityController = require("../controllers/AvailabilityController");
const availabilityMiddleware = require("../middleware/AvailabilityMiddleware");
const responseError = require("../errors/ResponseError");


router.get("/", availabilityController.getAll);

router.get("/bycicle/:bycicleId", function (req, res, next) {
    if (availabilityMiddleware.isValidId(req.params.bycicleId)) next();
    else {
        res.status(400).send(responseError.invalidId());
    }
}, availabilityController.getBikeAvailabilities);

router.get("/store/:storeId", function (req, res, next) {
    if (availabilityMiddleware.isValidId(req.params.storeId)) next();
    else {
        res.status(400).send(responseError.invalidId());
    }
}, availabilityController.getAvailabilitiesOfStore);

router.get("/:bycicleId/:storeId", function (req, res, next) {
    if (availabilityMiddleware.isValidId(req.params.bycicleId) && availabilityMiddleware.isValidId(req.params.storeId)) next();
    else {
        res.status(400).send(responseError.invalidId());
    }
}, availabilityController.getAvailability);


router.post("/register", function (req, res, next) {
    if (availabilityMiddleware.isValidRequest(req)) next();
    else {
        res.status(400).send(responseError.emptyBody());
    }
}, availabilityController.registerAvailability);

router.put("/:bycicleId/:storeId/:stock", function (req, res, next) {
    if (availabilityMiddleware.isValidId(req.params.bycicleId) && availabilityMiddleware.isValidId(req.params.storeId)) next();
    else {
        res.status(400).send(responseError.invalidId());
    }
}, function (req, res, next) {
    if (availabilityMiddleware.isValidStock(req.params.stock)) next();
    else {
        res.status(400).send(responseError.invalidType("stock", "number"));
    }
}, availabilityController.updateStock);

router.delete("/:bycicleId/:storeId", function (req, res, next) {
    if (availabilityMiddleware.isValidId(req.params.bycicleId)) next();
    else {
        res.status(400).send(responseError.invalidId());
    }
}, function (req, res, next) {
    if (availabilityMiddleware.isValidId(req.params.storeId)) next();
    else {
        res.status(400).send(responseError.invalidId());
    }
}, availabilityController.deleteAvailability);


module.exports = router;
