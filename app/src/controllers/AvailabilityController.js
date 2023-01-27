const availabilityService = require("../services/AvailabilityService");
const responseError = require("../errors/ResponseError");

var controller = (function () {
    async function getAll(req, res) {
        try {
            const availabilities = await availabilityService.getAllAvailabilities();
            availabilities.length > 0 ? res.status(200).send(availabilities) : res.status(404).send(responseError.notFound("availability"));

        } catch (error) {
            res.status(500).send(error);
        }
    }

    async function getAvailability(req, res) {
        try {
            const availability = await availabilityService.getDesiredAvailability(req.params.bycicleId, req.params.storeId);

            availability ? res.status(200).send(availability) : res.status(404).send(responseError.notFound("availability"));
        } catch (error) {
            res.status(500).send(error);
        }
    }

    async function getBikeAvailabilities(req, res) {
        try {
            const availabilities = await availabilityService.getBikeAvailabilities(req.params.bycicleId);

            availabilities.length > 0 ? res.status(200).send(availabilities) : res.status(404).send(responseError.notFound("availability"));
        } catch (error) {
            res.status(500).send(error);
        }
    }

    async function registerAvailability(req, res) {
        try {
            const availability = await availabilityService.registerAvailability(req.body);
            !availability.errorMessage ? res.status(201).send(availability) : res.status(400).send(responseError.unknownError(availability.errorMessage));

        } catch (error) {
            res.status(500).send(error);
        }
    }

    async function updateStock(req, res) {
        try {
            const availability = await availabilityService.updateStock(req.params.bycicleId, req.params.storeId, req.params.stock);
            availability == 1 ?
                res.status(200).send("Stock updated successfully")
                : res.status(404).send(responseError.notFound("availability"));

        } catch (error) {
            res.status(500).send(error);
        }
    }

    async function deleteAvailability(req, res) {
        try {
            const availability = await availabilityService.deleteAvailability(req.params.bycicleId);

            availability ? res.status(200).send(availability) : res.status(404).send(responseError.notFound("availability"));
        } catch (error) {
            res.status(500).send(error);
        }
    }

    async function getAvailabilitiesOfStore(req, res) {
        try {
            const availabilitiesOfStore = await availabilityService.getAvailabilitiesOfStore(req.params.storeId);

            availabilitiesOfStore.length > 0 ?
                res.status(200).send(availabilitiesOfStore)
                : res.status(404).send(responseError.notFound("Availabilities of store"));
        }
        catch (error) {
            res.status(500).send(error);
        }
    }

    return {
        getAll,
        getAvailability,
        getBikeAvailabilities,
        registerAvailability,
        updateStock,
        deleteAvailability,
        getAvailabilitiesOfStore
    };
})();

module.exports = controller;