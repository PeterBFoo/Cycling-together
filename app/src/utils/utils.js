
function Utils() {
    this._dateRegex = new RegExp("(((19|20)([2468][048]|[13579][26]|0[48])|2000)[/-]02[/-]29|((19|20)[0-9]{2}[/-](0[4678]|1[02])[/-](0[1-9]|[12][0-9]|30)|(19|20)[0-9]{2}[/-](0[1359]|11)[/-](0[1-9]|[12][0-9]|3[01])|(19|20)[0-9]{2}[/-]02[/-](0[1-9]|1[0-9]|2[0-8])))");
}

/**
 * 
 * @param {String} date 
 * @returns {Boolean}
 */
Utils.prototype.validDate = function (date) {
    return this._dateRegex.test(date);
};

/**
 * 
 * @param {String} date 
 * @returns {Date, Boolean}
 */
Utils.prototype.createDate = function (date, time = "12:00") {
    let fragmentedDate = date.includes("/") ? date.split("/") : date.split("-");
    let fragmentedTime = time.includes(":") ? time.split(":") : null;

    let year = parseInt(fragmentedDate[0]);
    let month = parseInt(fragmentedDate[1]) - 1;
    let day = parseInt(fragmentedDate[2]);
    let hours = parseInt(fragmentedTime[0]);
    let minutes = parseInt(fragmentedTime[1]);

    let newDate = new Date(year, month, day);
    newDate.setHours(hours, minutes);

    return newDate;
};

Utils.prototype.parseDateToString = function (date) {
    var d = new Date(date),
        month = "" + (d.getMonth() + 1),
        day = "" + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2)
        month = "0" + month;
    if (day.length < 2)
        day = "0" + day;

    return [year, month, day].join("-");
};

Utils.prototype.isValidDate = function (startDate, endDate) {
    let nowInSeconds = this.createDate(this.parseDateToString(new Date())) / 1000 - 300;
    let sDate = (this.createDate(startDate)).getTime() / 1000;
    let eDate = (this.createDate(endDate)).getTime() / 1000;
    return sDate > nowInSeconds && eDate > nowInSeconds && sDate <= eDate;
};


var utils = (function () {
    let instance = new Utils();
    return {
        get: function () {
            return instance;
        },
        validDate: function () {
            return instance.validDate;
        },
        createDate: function () {
            return instance.createDate;
        },
        parseDateToString: function (date) {
            return instance.parseDateToString(date);
        },
        isValidDate: function (startDate, endDate) {
            return instance.isValidDate(startDate, endDate);
        }
    };
})();

module.exports = utils;


