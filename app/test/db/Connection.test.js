const sequelize = require("../../src/db/connection.js").connection;

test("Test the db connection", async () => {
    sequelize
        .authenticate()
        .then(() => {
            expect(true);
        })
        .catch(err => {
            expect(false);
        });
})