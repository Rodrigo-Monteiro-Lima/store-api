const { saleService } = require('../services');
const { mapError } = require('../utils/errorMap');

const createSales = async (req, res) => {
  const { body } = req;
  const { type, message } = await saleService.createSales(body);
  if (type) return res.status(mapError(type)).json({ message });
  return res.status(201).json(message);
};

module.exports = {
  createSales,
};
