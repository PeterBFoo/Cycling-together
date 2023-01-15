
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
Utils.prototype.createDate = function (date, time = "00:00") {
    let fragmentedDate = date.includes("/") ? date.split("/") : date.split("-");
    let fragmentedTime = time.includes(":") ? time.split(":") : null;

    let year = parseInt(fragmentedDate[0]);
    let month = parseInt(fragmentedDate[1]) - 1;
    let day = parseInt(fragmentedDate[2]) + 1;
    let hours = parseInt(fragmentedTime[0]);
    let minutes = parseInt(fragmentedTime[1]);

    let newDate = new Date(year, month, day);
    newDate.setHours(hours, minutes);

    return newDate;
};

var utils = (function () {
    let instance = new Utils();
    return {
        get: function () {
            return instance;
        },
        validDate: function () {
            return this.validDate;
        },
        createDate: function () {
            return this.createDate;
        }
    };
})();

module.exports = utils;


