const WEEKDAYS = [
  'Maandag',
  'Dinsdag',
  'Woensdag',
  'Donderdag',
  'Vrijdag',
  'Zaterdag',
  'Zondag'
];

const utils = {
  renderPrice(price) {
    const rendered = price.toString();
    return `${rendered.slice(0, -2)}.${rendered.slice(-2)}`;
  },

  // TODO: refactor
  getToday() {
    let date = new Date();
    let days = date.getDate();
    let months = date.getMonth() + 1; // January is 0
    let weekday = WEEKDAYS[date.getDay()];

    if (days < 10) {
      days = '0' + days;
    }

    if (months < 10) {
      months = '0' + months;
    }

    return `${weekday} ${days}-${months}`;
  }
};

module.exports = utils;
