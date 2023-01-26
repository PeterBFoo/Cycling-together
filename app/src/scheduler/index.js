const cron = require("node-cron");

var scheduler = (() => {

    let dailyTime = "0 0 0 * * *";
    let minuteTime = "0 * * * * *";
    let secondTime = "* * * * * *";

    function startDailyJob(job) {
        cron.schedule(dailyTime, async () => {
            await job();
        });
    }

    function startMinuteJob(job) {
        cron.schedule(minuteTime, async () => {
            await job();
        });
    }

    function startSecondJob(job) {
        cron.schedule(secondTime, async () => {
            job();
        });
    }

    return {
        startDailyJob,
        startMinuteJob,
        startSecondJob
    };
})();

module.exports = scheduler;