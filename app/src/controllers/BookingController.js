const bookingService = require("../services/BookingService");
const responseErrors = require("../errors/ResponseError");

var controller = (function () {
    async function getAllBookings(req, res) {
        let data = await bookingService.getAll();
        data ? res.status(200).send(data) : res.status(404).send(data);
    }

    async function getBooking(req, res) {
        let data = await bookingService.getBooking(req.params.publicId);
        data ? res.status(200).send(data) : res.status(404).send(data);
    }

    async function registerBooking(req, res) {
        let booking = await bookingService.registerBooking(req.body);

        if (booking) {
            !booking.errorMessage ? res.status(201).send(booking)
                : res.status(500).send(responseErrors.unknownError(booking.errorMessage));
        } else if (booking == null) {
            res.status(400).send(responseErrors.noAvailabilityForBycicle());
        } else {
            res.status(400).send(responseErrors.dateError());
        }

    }

    async function cancelBooking(req, res) {
        let publicId = req.params.publicId;
        let canceledBooking = await bookingService.cancelBooking(publicId);

        if (canceledBooking) {
            !canceledBooking.errorMessage ? res.status(200).send(canceledBooking)
                : res.status(500).send(responseErrors.unknownError(canceledBooking.errorMessage));
        } else if (canceledBooking == null) {
            res.status(404).send(responseErrors.notFound("Booking with publicId " + publicId));
        } else {
            res.status(400).send(responseErrors.alreadyCanceled());
        }
    }

    async function updateBooking(req, res) {
        let updatedBooking = await bookingService.updateDatesOfBooking(req.body.startDate, req.body.endDate, req.params.publicId);

        if (updatedBooking) {
            !updatedBooking.errorMessage ? res.status(200).send(updatedBooking)
                : res.status(500).send(responseErrors.unknownError(updatedBooking.errorMessage));
        } else if (updatedBooking == null) {
            res.status(404).send(responseErrors.notFound("Booking with publicId " + req.params.publicId));
        } else {
            res.status(400).send(responseErrors.dateError());
        }
    }

    return {
        getBooking,
        getAllBookings,
        registerBooking,
        cancelBooking,
        updateBooking
    };
})();

module.exports = controller;