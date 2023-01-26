const { test, expect } = require("@jest/globals");
const scheduler = require("../index");

test("Expect to run a job a few times", async () => {
    let t = 1;
    let job = () => {
        t++;
    }
    scheduler.startSecondJob(job);
    await new Promise(resolve => setTimeout(resolve, 1001));
    expect(t).toEqual(2);
})