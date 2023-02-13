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

module.exports = {
  getAllProducts,
  getProductById,
};
