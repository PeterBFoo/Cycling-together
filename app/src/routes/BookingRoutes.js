const router = require("express").Router();
const bookingController = require("../controllers/BookingController");
const bookingMiddleware = require("../middleware/BookingMiddleware");
const responseErrors = require("../errors/ResponseError");

router.get("/", bookingController.getAllBookings);

router.get("/:publicId", function (req, res, next) {
    if (bookingMiddleware.validateId(req.params.publicId)) next();
    else res.status(400).send(responseErrors.invalidIdLength(8));
}, bookingController.getBooking);

router.post("/register", function (req, res, next) {
    if (bookingMiddleware.validateRequest(req)) next();
    else res.status(400).send(responseErrors.emptyBody());

}, bookingController.registerBooking);

router.post("/cancel/:publicId", function (req, res, next) {
    if (bookingMiddleware.validateId(req.params.publicId)) next();
    else res.status(400).send(responseErrors.invalidIdLength(8));
}, bookingController.cancelBooking);

router.put("/update/:publicId", function (req, res, next) {
    if (bookingMiddleware.validateId(req.params.publicId)) next();
    else res.status(400).send(responseErrors.invalidIdLength(8));
}, function (req, res, next) {
    if (bookingMiddleware.validateRequest(req)) next();
    else res.status(400).send(responseErrors.emptyBody());
}, bookingController.updateBooking);

module.exports = router;
