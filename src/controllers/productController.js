const { productService } = require('../services');
const { mapError } = require('../utils/errorMap');

const getAllProducts = async (_req, res) => {
  const { message } = await productService.findAll();
  return res.status(200).json(message);
};

const getProductById = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await productService.findById(id);
  if (type) return res.status(mapError(type)).json({ message });
  return res.status(200).json(message);
};

const createProduct = async (req, res) => {
  const { name } = req.body;
  const { type, message } = await productService.createProduct(name);
  if (type) return res.status(mapError(type)).json({ message });
  return res.status(201).json(message);
};

const updateProduct = async (req, res) => {
  const { body: { name }, params: { id } } = req;
  const { type, message } = await productService.update(name, id);
  if (type) return res.status(mapError(type)).json({ message });
  return res.status(200).json(message);
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await productService.deleteProduct(id);
  if (type) return res.status(mapError(type)).json({ message });
  return res.sendStatus(204);
};

const searchingProduct = async (req, res) => {
  const { q } = req.query;
  let name = `%${q}%`;
  if (q === undefined) name = '%%';
  const { message } = await productService.searchingProduct(name);
  return res.status(200).json(message);
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  searchingProduct,
};
