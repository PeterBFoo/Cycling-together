const { test, expect } = require("@jest/globals");
const utils = require("../utils")

const util = utils.get()
const date = "2022-01-01"
const badDate = "2023/92/40"

test("Check that utils exists", function () {
    expect(util).toBe(utils.get())
})

test("Check that validDate works as expected and returns a boolean", function () {
    expect(util.validDate(date)).toBeTruthy();
    expect(util.validDate(badDate)).toBeFalsy();
})

test("Check that createDate works as expected and returns a Date", function () {
    let date = util.createDate("2022-01-01");
    expect(date).toBeInstanceOf(Date);

    expect(date.getFullYear()).toBe(2022);
    expect(date.getMonth()).toBe(0);
    expect(date.getDate()).toBe(1);
})

test("Check that createDate works as expected and returns a Date and with added hours", function () {
    let newDate = util.createDate(date, "14:00");
    expect(newDate).toBeInstanceOf(Date);
    expect(newDate.getHours()).toBe(14);
})

test("Check that parseDateToString works as expected and returns a string", function () {
    let parsedDate = util.parseDateToString(new Date(2022, 0, 1));
    expect(parsedDate).toBe("2022-01-01");
})

test("Check that isValidDate works as expected and returns a boolean", function () {
    let startDate = "2022-01-01";
    let endDate = "2022-01-03";
    expect(util.isValidDate(startDate, endDate)).toBeFalsy();
})

test("Check that isValidDate works as expected and returns a boolean", function () {
    let startDate = "2034-01-01";
    let endDate = "2034-01-03";
    expect(util.isValidDate(startDate, endDate)).toBeTruthy();
})