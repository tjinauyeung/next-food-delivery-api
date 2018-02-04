const { renderPrice, getToday } = require('./utils');
const _ = require('lodash');

const MINIMUM_PRICE_FREE_DELIVERY = 5000;
const DELIVERY_COSTS = 200;

function sortOrderOnType (order) {
  return _.sortBy(order, ['type', 'label']);
}

function renderPriceForOrder (order) {
  return order.map(item => ({
    ...item,
    type: _.upperCase(item.type),
    price: renderPrice(item.price)
  }));
}

function includeDeliveryCost (totalPrice) {
  return totalPrice < MINIMUM_PRICE_FREE_DELIVERY && renderPrice(DELIVERY_COSTS);
}

function getLocals({ user, order, totalPrice }) {
  return {
    user,
    order: sortOrderOnType(renderPriceForOrder(order)),
    price: renderPrice(totalPrice),
    deliveryCost: includeDeliveryCost(totalPrice),
    date: getToday(new Date()),
  };
}

module.exports = { getLocals };
