const test = require('ava');
const Chance = new require('chance')();
const { renderPrice } = require('../lib/utils');

test('converts the price by into a string', t => {
  const price = Chance.integer();
  t.deepEqual(typeof renderPrice(price), 'string');
});
