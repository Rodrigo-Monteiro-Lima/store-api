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

const updateSale = {
  saleId: 1,
  itemsUpdated: newSale
};

const sales = [
  {
    saleId: 1,
    date: "2022-05-07 01:59:51",
    productId: 1,
    quantity: 2
  },
  {
    saleId: 2,
    date: "2022-05-07 01:59:51",
    productId: 2,
    quantity: 2
  }
]

module.exports = {
  newSale,
  invalidId,
  invalidQuantity,
  product,
  sale,
  sales,
  updateSale
}
