const Availability = require("../db/connection").availabilities;
const bycicleService = require("../services/BycicleService");
const storeService = require("../services/StoreService");
const availabilityModel = require("../models/availability/AvailabilityModel").get();
const Op = require("sequelize").Op;

var service = (() => {
    function getAll() {
        return Availability.findAll({ where: { "stock": { [Op.gt]: 0 } } });
    }

    function getAvailability(bycicleId, storeId) {
        return Availability.findOne({
            where: {
                bycicleId: bycicleId,
                storeId: storeId,
                stock: { [Op.gt]: 0 }
            }
        });
    }

    function getBikeAvailabilities(bycicleId) {
        return Availability.findAll({
            where: {
                "bycicleId": bycicleId
            }
        });
    }

    async function registerAvailability(availability) {
        try {
            // Validate availability
            var validAvailability = availabilityModel.setup(availability);

            // Check if availability already exists and if bycicle and store exist
            let doesExistAvailability = await getAvailability(validAvailability.bycicleId, validAvailability.storeId);
            let doesExistBycicle = await bycicleService.findOne(validAvailability.bycicleId);
            let doesExistStore = await storeService.findOne(validAvailability.storeId);

            if (!doesExistAvailability && doesExistBycicle && doesExistStore) {
                return Availability.create(validAvailability);
            } else {

                let errors = [];

                !doesExistBycicle ? errors.push("Bycicle not found") : null;
                !doesExistStore ? errors.push("Store not found") : null;
                doesExistAvailability ? errors.push("Availability already exists") : null;

                return {
                    errorMessage: errors
                };
            }
        } catch (error) {
            return {
                errorMessage: error
            };
        }
    }

    function updateStock(bycicleId, storeId, stock) {
        return Availability.update({ stock: stock }, { where: { "bycicleId": bycicleId, "storeId": storeId } });
    }

    function incrementStock(availability) {
        return Availability.update({ stock: availability.stock + 1 }, { where: { "bycicleId": availability.bycicleId, "storeId": availability.storeId } });
    }

    function decrementStock(availability) {
        return Availability.update({ stock: availability.stock - 1 }, {
            where: { "bycicleId": availability.bycicleId, "storeId": availability.storeId }
        });
    }

    function deleteAvailability(bycicleId, storeId) {
        return Availability.destroy({ where: { "bycicleId": bycicleId, "storeId": storeId } });
    }

    function getAvailabilitiesOfStore(storeId) {
        return Availability.findAll({
            where: { "storeId": storeId }
        });
    }

    return {
        getAll,
        getAvailability,
        getBikeAvailabilities,
        registerAvailability,
        updateStock,
        incrementStock,
        decrementStock,
        deleteAvailability,
        getAvailabilitiesOfStore
    };
})();

module.exports = service;