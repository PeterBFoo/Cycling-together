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
    expect(util.createDate(date)).toBeInstanceOf(Date);
})

test("Check that createDate works as expected and returns a Date and with added hours", function () {
    let newDate = util.createDate(date, "14:00");
    expect(newDate).toBeInstanceOf(Date);
    expect(newDate.getHours()).toBe(14);
})