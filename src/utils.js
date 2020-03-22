const WEEKDAYS = [
  "Zondag",
  "Maandag",
  "Dinsdag",
  "Woensdag",
  "Donderdag",
  "Vrijdag",
  "Zaterdag"
];

const MONTHS = [
  "Januari",
  "Februari",
  "Maart",
  "April",
  "Mei",
  "Juni",
  "Juli",
  "Augustus",
  "September",
  "Oktober",
  "November",
  "December"
];

const utils = {
  renderPrice(price) {
    const rendered = price.toFixed().toString();
    return `${rendered.slice(0, -2)}.${rendered.slice(-2)}`;
  },

  /**
   * @param {Date instance} date
   * @returns {string}
   */
  getToday(date) {
    return `${WEEKDAYS[date.getDay()]} - ${date.getDate()} ${
      MONTHS[date.getMonth()]
    }`;
  }
};

module.exports = utils;
