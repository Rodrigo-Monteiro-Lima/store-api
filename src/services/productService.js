const { productModel } = require('../models');
const schema = require('./validations/validationsInputValues');

const findAll = async () => {
  const products = await productModel.findAll();
  return { type: null, message: products };
};

const findById = async (id) => {
  const error = schema.validateId(id);
  if (error.type) return error;
  const product = await productModel.findById(id);
  if (!product) return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };
  return { type: null, message: product };
};

const createProduct = async (name) => {
  const error = schema.validateNewProduct({ name });
  if (error.type) return error;
  const productId = await productModel.insert(name);
  const newProduct = await productModel.findById(productId);
  return { type: null, message: newProduct };
};

const update = async (name, id) => {
  let error = schema.validateId(id);
  if (error.type) return error;
  error = schema.validateNewProduct({ name });
  if (error.type) return error;
  const product = await productModel.findById(id);
  if (!product) return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };
  await productModel.update(name, id);
  const updateProduct = await productModel.findById(id);
  return { type: null, message: updateProduct };
};

const deleteProduct = async (id) => {
  const error = schema.validateId(id);
  if (error.type) return error;
  const product = await productModel.deleteProduct(id);
  if (!product) return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };
  return { type: null, message: '' };
};

const searchingProduct = async (name) => {
  const product = await productModel.searchingProduct(name);
  return { type: null, message: product };
};

module.exports = {
  findAll,
  findById,
  createProduct,
  update,
  deleteProduct,
  searchingProduct,
};
