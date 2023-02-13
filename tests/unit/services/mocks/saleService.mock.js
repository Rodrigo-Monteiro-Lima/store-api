const newSale = [
  {
    productId: 1,
    quantity: 2
  }
];

const invalidId = [
  {
    productId: 9999,
    quantity: 2
  }
];

const invalidQuantity = [
  {
    productId: 2,
    quantity: 0
  }
];

const product = { type: null, message:  {
  id: 1,
  name: "Martelo de Thor"
} };

const sale = {
  id: 1,
  itemsSold: newSale
};

module.exports = {
  newSale,
  invalidId,
  invalidQuantity,
  product,
  sale,
}
