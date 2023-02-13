const newProduct = {
  name: "Martelo de Thor"
}

const products = [
  {
    id: 1,
    ...newProduct
  },
  {
    id: 2,
    name: "Traje de encolhimento"
  },
  {
    id: 3,
    name: "Escudo do Capitão América"
  }
];

const invalidValue = { type: 'INVALID_VALUE', message: '"id" must be a number' };

const productNotFound = { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };

const updateProduct = {
  id: 1,
  name: "Batarangue"
}

module.exports = {
  products,
  newProduct,
  invalidValue,
  productNotFound,
  updateProduct
}
