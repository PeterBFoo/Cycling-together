const Store = require("../db/connection.js").stores;

var service = (() => {

    function create(store) {
        return Store.create(store);
    }

    function findAssociatedBikes(storeId) {
        return Store.findByPk(storeId, { include: ["bycicles"] });
    }

    function findAll() {
        return Store.findAll({ where: {} });
    }

    function findOne(id) {
        return Store.findByPk(id);
    }

    function update(id, store) {
        return Store.update(store, {
            where: { id: id }
        });
    }

    function deleteOne(id) {
        return Store.destroy({
            where: { id: id }
        });
    }

    function deleteAll() {
        return Store.destroy({
            where: {},
            truncate: false
        });
    }

    return {
        create,
        findAssociatedBikes,
        findAll,
        findOne,
        update,
        deleteOne,
        deleteAll
    };
})();

module.exports = service;