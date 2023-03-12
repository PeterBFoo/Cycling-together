const Booking = require("../db/connection.js").bookings;
const availabilityService = require("./AvailabilityService");
const storeService = require("./StoreService");
const bycicleService = require("./BycicleService");
const bookingModel = require("../models/booking/BookingModel.js").get();
const utils = require("../utils").get();

var service = (() => {

    /**
     * @param {Boolean} includeCanceled Include canceled bookings
     * @public This method is public
     * @returns Array[Booking]
     * @description Get all the bookings with a public format
     */
    async function getAll(includeCanceled = false) {
        let stores = await storeService.findAll();
        let bycicles = await bycicleService.findAll();
        let booking = await _getAll(includeCanceled);

        return booking ? prepareBookingsData(booking, stores, bycicles) : null;
    }

    /**
     * 
     * @param {Boolean} includeCanceled Include canceled bookings
     * @private This method is private to use in the BookingService
     * @returns Array[Booking]
     * @description Get all the bookings without a public format, with all the fields of the booking
     */
    function _getAll(includeCanceled = false) {
        if (includeCanceled) {
            return Booking.findAll();
        }
        return Booking.findAll({ where: { "canceled": false } });
    }

    /**
     * 
     * @param {String} publicId ID that identifies the booking
     * @public This method is public
     * @returns Booking
     * @description Get a booking by his public ID with a public format
     */
    async function getBooking(publicId) {
        let booking = await _getBooking(publicId);

        return booking ? prepareSingleBookingData(booking, await storeService.findOne(booking.storeId), await bycicleService.findOne(booking.bycicleId)) : null;
    }

    /**
     * 
     * @param {String} publicId 
     * @private This method is private to use in the BookingService
     * @returns Booking
     * @description Get a booking by his public ID without a public format, with all the fields of the booking
     */
    async function _getBooking(publicId) {
        let booking = await Booking.findOne({ where: { "publicId": publicId } });
        return booking ? booking : null;
    }

    /**
     * 
     * @param {Array[Booking]} bookings Array of bookings
     * @param {Array[Store]} stores Array of stores
     * @param {Array[Bycicle]} bycicles Array of bycicles
     * @private This method is private to use in the BookingService
     * @returns {Array[Booking]} Array of bookings prepared for public showing
     * @description Prepare bookings to return public data for the client
     */
    function prepareBookingsData(bookings, stores, bycicles) {
        bookings.map(booking => {
            let store = stores.find(store => store.id === booking.storeId);
            let bycicle = bycicles.find(bycicle => bycicle.id === booking.bycicleId);

            booking.dataValues.store = storeService.preparePublicStoreData(store);
            booking.dataValues.bycicle = bycicleService.preparePublicBycicleData(bycicle);

            booking.dataValues.bycicleId = undefined;
            booking.dataValues.storeId = undefined;
            booking.dataValues.createdAt = undefined;
            booking.dataValues.updatedAt = undefined;
        });

        return bookings;
    }

    /**
     * 
     * @param {Booking} booking One booking
     * @param {Store} store One store
     * @param {Bycicle} bycicle One bycicle
     * @private This method is private to use in the BookingService
     * @returns {Booking} Booking prepared for public showing
     * @description Prepare a booking to return public data for the client
     */
    function prepareSingleBookingData(booking, store, bycicle) {
        booking.dataValues.store = storeService.preparePublicStoreData(store);
        booking.dataValues.bycicle = bycicleService.preparePublicBycicleData(bycicle);

        booking.dataValues.bycicleId = undefined;
        booking.dataValues.storeId = undefined;
        booking.dataValues.createdAt = undefined;
        booking.dataValues.updatedAt = undefined;

        return booking;
    }

    /**
     * 
     * @param {Booking} booking New booking
     * @public This method is public
     * @returns The newly created booking
     * @description Create a new booking
     */
    async function registerBooking(booking) {
        const isValidDate = utils.isValidDate(booking.startDate, booking.endDate);

        if (isValidDate) {
            let availability = await availabilityService.getDesiredAvailability(booking.bycicleId, booking.storeId);

            if (availability) {
                try {
                    let validBooking = bookingModel.setup(booking);
                    validBooking.total = utils.calculateTotal(booking.startDate, booking.endDate, availability.bycicle.price);
                    await updateStockIfActive(validBooking, false);
                    return prepareSingleBookingData(
                        await Booking.create(validBooking),
                        await storeService.findOne(validBooking.storeId),
                        await bycicleService.findOne(validBooking.bycicleId));
                } catch (error) {
                    return {
                        errorMessage: error
                    };
                }
            } else {
                return null;
            }
        } else {
            return false;
        }
    }

    /**
     * 
     * @param {Booking} booking Booking
     * @param {Boolean} incrementStock True if has to be incremented and false if it has to be decremented
     * @private This method is private to use in the BookingService
     * @description If a booking is active, it will change the stock based on incrementStock
     */
    async function updateStockIfActive(booking, incrementStock) {
        if (booking.isActive) {
            let availability = (await availabilityService.getAvailability(booking.bycicleId, booking.storeId)).dataValues;

            if (incrementStock) {
                await availabilityService.incrementStock(availability);
            } else {
                await availabilityService.decrementStock(availability);
            }
        }
    }

    /**
     * 
     * @param {String} publicId 
     * @public This method is public
     * @returns A canceled booking
     * @description Cancel a booking and if the booking is active update the stock related to the availability of the bike
     */
    async function cancelBooking(publicId) {
        let booking = await _getBooking(publicId);

        if (booking && !booking.canceled) {
            booking.canceled = true;

            try {
                await updateStockIfActive(booking, true);
                booking.isActive = false;
                await booking.save();
            } catch (error) {
                return {
                    status: 500,
                    errorMessage: error
                };
            }

            return booking;
        }

        return booking == null ? booking : false;
    }

    /**
     * 
     * @param {String} startDate (yyyy-mm-dd)
     * @param {String} endDate (yyyy-mm-dd)
     * @param {String} publicId 
     * @returns 
     */
    async function updateDatesOfBooking(startDate, endDate, publicId) {
        let actualBooking = await _getBooking(publicId);

        let isValidDate = utils.isValidDate(startDate, endDate);

        if (actualBooking && isValidDate) {
            let actualBookingValues = actualBooking.dataValues;
            try {
                actualBookingValues.startDate = startDate;
                actualBookingValues.endDate = endDate;

                let updatedBooking = bookingModel.setup(actualBookingValues);
                await Booking.update({ startDate: startDate, endDate: endDate }, { where: { publicId: publicId } });

                if (updatedBooking.isActive && !actualBooking.isActive) {
                    await updateStockIfActive(updatedBooking, false);
                }

                return updatedBooking;
            } catch (error) {
                return {
                    errorMessage: error
                };
            }
        }

        return actualBooking == null ? null : false;


    }

    /**
     * 
     * @param {Integer} bookingId  Id of the booking
     * @param {Boolean} isActive  True if the booking is active and false if it's not
     * @private This method is private to use in the BookingService
     * @returns 
     * @description Update the isActive value of a booking
     */
    function updateBookingActive(bookingId, isActive) {
        return Booking.update({ isActive: isActive }, { where: { publicId: bookingId } });
    }

    /**
     * 
     * @description Get all the bookings and then check if the startDate matches with today, if that's the case then update the booking and change the value of isActive to true and then modifies the stock of the availability.
     */
    async function refresh() {
        let bookings = await _getAll();
        let bookingsDataValues = [];

        bookings.forEach((booking) => {
            bookingsDataValues.push(booking.dataValues);
        });

        let bookingsToActivate = bookingModel.activateBookings(bookingsDataValues);
        let bookingsToDeactivate = bookingModel.deactivateBookings(bookingsDataValues);

        let bookingsToChange = [...bookingsToActivate, ...bookingsToDeactivate];

        if (bookingsToChange.length > 0) {
            console.log("\x1b[36m%s\x1b[0m", "REFRESHING BOOKINGS");
            let availabilities = await availabilityService.getAll();

            bookingsToActivate.forEach(async activeBooking => {
                let availability = availabilities.find(availability => availability.bycicleId === activeBooking.bycicleId && availability.storeId === activeBooking.storeId);
                await availabilityService.decrementStock(availability);
                await updateBookingActive(activeBooking.publicId, true);
            });

            bookingsToDeactivate.forEach(async deactiveBooking => {
                let availability = availabilities.find(availability => availability.bycicleId === deactiveBooking.bycicleId && availability.storeId === deactiveBooking.storeId);
                await availabilityService.incrementStock(availability);
                await updateBookingActive(deactiveBooking.publicId, false);
            });
        }
    }

    return {
        getAll,
        getBooking,
        updateDatesOfBooking,
        registerBooking,
        cancelBooking,
        refresh
    };
})();

module.exports = service;