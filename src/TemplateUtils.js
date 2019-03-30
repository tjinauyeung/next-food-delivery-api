const _ = require("lodash");
const { renderPrice, getToday } = require("./utils");

const MINIMUM_PRICE_FREE_DELIVERY = 5000;
const DELIVERY_COSTS = 200;

function sortOrderOnType(order) {
  return _.sortBy(order, ["type", "label"]);
}

function renderPriceForOrder(order) {
  return _.map(order, item => ({
    ...item,
    price: renderPrice(item.price),
    total: renderPrice(item.total)
  }));
}

function includeDeliveryCost(isForPickup, totalPrice) {
  return (
    !isForPickup &&
    totalPrice < MINIMUM_PRICE_FREE_DELIVERY &&
    renderPrice(DELIVERY_COSTS)
  );
}

function getTemplateVars({ user, order, totalPrice }) {
  const isForPickup = user.orderMethod === "pickup"; // TODO refactor this;

  return {
    user,
    id: _.uniqueId(),
    order: sortOrderOnType(renderPriceForOrder(order)),
    price: renderPrice(totalPrice),
    deliveryCost: includeDeliveryCost(isForPickup, totalPrice),
    date: getToday(new Date())
  };
}

module.exports = { getTemplateVars };
