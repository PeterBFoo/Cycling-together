const Bycicle = require("../db/connection.js").bycicles;

var service = (() => {

    function create(bycicle) {
        return Bycicle.create(bycicle);
    }

    function filterBy(property, value) {
        return Bycicle.findAll({ where: { [property]: value } });
    }

    function findAll() {
        return Bycicle.findAll();
    }

    function findOne(id) {
        return Bycicle.findByPk(id);
    }

    function update(id, bycicle) {
        return Bycicle.update(bycicle, {
            where: { id: id }
        });
    }

    function deleteOne(id) {
        return Bycicle.destroy({
            where: { id: id }
        });
    }

    function deleteAll() {
        return Bycicle.destroy({
            where: {},
            truncate: false
        });
    }

    function preparePublicBycicleData(bycicle) {
        return {
            category: bycicle.category,
            brand: bycicle.brand,
            weight: bycicle.weight,
            frame: bycicle.frame,
            suspension: bycicle.suspension,
            fork: bycicle.fork,
            wheels: bycicle.wheels,
            wheelSize: bycicle.wheelSize,
            brakes: bycicle.brakes,
            groupSet: bycicle.groupSet,
            driveTrain: bycicle.driveTrain,
            frontTravel: bycicle.frontTravel,
            seatpost: bycicle.seatpost,
        };
    }

    return {
        create,
        filterBy,
        findAll,
        findOne,
        update,
        deleteOne,
        deleteAll,
        preparePublicBycicleData
    };
})();

module.exports = service;