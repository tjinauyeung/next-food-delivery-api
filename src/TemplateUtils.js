const _ = require("lodash");
const { renderPrice, getToday } = require("./utils");

const MINIMUM_PRICE_FREE_DELIVERY = 5000;
const DELIVERY_FEE = 200;

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

function includeDeliveryCost(isForPickup, totals) {
  const totalPrice = totals.price;
  const minimumPriceFreeDelivery = totals.minimumPriceFreeDelivery || MINIMUM_PRICE_FREE_DELIVERY;
  const deliveryFee = totals.deliveryFee || DELIVERY_FEE;

  return (
    !isForPickup &&
    totalPrice < minimumPriceFreeDelivery &&
    renderPrice(deliveryFee)
  );
}

function getTemplateVars({ user, order, totals }) {
  const isForPickup = user.orderMethod === "pickup"; // TODO refactor this;

  return {
    user,
    id: _.uniqueId(),
    order: sortOrderOnType(renderPriceForOrder(order)),
    price: renderPrice(totals.price),
    deliveryCost: includeDeliveryCost(isForPickup, totals),
    date: getToday(new Date())
  };
}

module.exports = { getTemplateVars };
