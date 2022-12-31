const storeModel = require("../../src/models/store/Store.js");

test("Create a new store with empty properties", () => {
    let store = storeModel.get();
    expect(store);
});

test("Create a new store with properties", () => {
    let store = storeModel.get().setup({
        storeName: "Test Store",
        address: "123 Test Street",
        city: "Test City",
        country: "Test Country",
        phoneNumber: "123-456-7890",
        email: "test@test.com",
        website: null
    });

    let properties = Object.getOwnPropertyNames(store.properties());
    let propertiesDescription = store.properties();
    for (let i = 0; i < properties.length; i++) {
        let property = properties[i];
        if (propertiesDescription[property].allowNull && store[property] == null) {
            expect(store[property]).toBeFalsy();
        } else {
            expect(store[property]).toBeTruthy();
        }
    }
});

test("Create a new store with wrong property types", () => {
    let store = storeModel.get();
    let setup = () => {
        store.setup(
            {
                storeName: "Test Store",
                address: "123 Test Street",
                city: null,
                country: "Test Country",
                phoneNumber: 971546637,
                email: "test@test.com",
                website: null
            }
        );
    };
    expect(setup).toThrow();
});