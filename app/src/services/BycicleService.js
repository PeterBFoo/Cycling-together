const Bycicle = require("../db/connection.js").bycicles;

var service = (() => {

    function create(bycicle) {
        return Bycicle.create(bycicle);
    }

    function filterBy(property, value) {
        return Bycicle.findAll({ where: { [property]: value } });
    }

    function findAll() {
        return Bycicle.findAll({ where: {} });
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

    return {
        create,
        filterBy,
        findAll,
        findOne,
        update,
        deleteOne,
        deleteAll
    };
})();

module.exports = service;