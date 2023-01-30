const Availability = require("../db/connection").availabilities;
const bycicleService = require("../services/BycicleService");
const storeService = require("../services/StoreService");
const availabilityModel = require("../models/availability/AvailabilityModel").get();
const Op = require("sequelize").Op;

var service = (() => {
    function getAll() {
        return Availability.findAll({ where: { "stock": { [Op.gt]: 0 } } });
    }

    async function getAllAvailabilities() {
        let availabilities = await getAll();

        if (availabilities) {
            let stores = await storeService.findAll();
            let bycicles = await bycicleService.findAll();

            return preparePublicAvailabilitiesData(availabilities, stores, bycicles);
        }
    }

    function preparePublicAvailabilitiesData(availabilities, stores, bycicles) {
        availabilities.forEach(availability => {
            let store = stores.find(store => store.id == availability.storeId);
            let bycicle = bycicles.find(bycicle => bycicle.id == availability.bycicleId);

            availability = availability.dataValues;
            availability.store = store;
            availability.bycicle = bycicle;

            delete availability.id;
            delete availability.storeId;
            delete availability.bycicleId;
        });

        return availabilities;
    }

    function preparePublicAvailabilityData(availability, store, bycicle) {
        availability = availability.dataValues;
        availability.store = store;
        availability.bycicle = bycicle;

        delete availability.storeId;
        delete availability.bycicleId;

        return availability;
    }

    async function getDesiredAvailability(bycicleId, storeId) {
        let availability = await getAvailability(bycicleId, storeId);

        if (availability) {
            let store = await storeService.findOne(storeId);
            let bycicle = await bycicleService.findOne(bycicleId);

            return preparePublicAvailabilityData(availability, store, bycicle);
        }

        return null;
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

    async function getBikeAvailabilities(bycicleId) {
        let availabilities = await Availability.findAll({
            where: {
                "bycicleId": bycicleId
            }
        });

        if (availabilities) {
            try {
                let stores = await storeService.findAll();
                let bycicle = await bycicleService.findOne(bycicleId);

                return await preparePublicAvailabilitiesData(availabilities, stores, [bycicle]);
            } catch (err) {
                return err;
            }
        }

        return null;

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

    async function getAvailabilitiesOfStore(storeId) {
        let availabilities = await Availability.findAll({
            where: { "storeId": storeId }
        });

        if (availabilities) {
            try {
                let store = await storeService.findOne(storeId);
                let bycicles = await bycicleService.findAll();
                return await preparePublicAvailabilitiesData(availabilities, [store], bycicles);
            } catch (err) {
                return err;
            }
        }

        return null;
    }

    return {
        getAll,
        getAllAvailabilities,
        getAvailability,
        getDesiredAvailability,
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