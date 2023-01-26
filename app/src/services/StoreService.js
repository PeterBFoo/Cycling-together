const Store = require("../db/connection.js").stores;

var service = (() => {

    function create(store) {
        return Store.create(store);
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

    function preparePublicStoreData(store) {
        return {
            storeName: store.storeName,
            address: store.address,
            city: store.city,
            country: store.country,
            phoneNumber: store.phoneNumber,
            email: store.email,
            website: store.website
        };
    }

    return {
        create,
        findAll,
        findOne,
        update,
        deleteOne,
        deleteAll,
        preparePublicStoreData
    };
})();

module.exports = service;