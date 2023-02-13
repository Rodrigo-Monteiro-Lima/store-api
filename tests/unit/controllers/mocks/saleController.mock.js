const newSale = [
  {
    productId: 1,
    quantity: 2
  }
];

const sale = {
  id: 1,
  itemsSold: newSale
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
  sale,
  sales
}
