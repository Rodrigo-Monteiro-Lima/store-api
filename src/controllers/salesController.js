const { saleService } = require('../services');
const { mapError } = require('../utils/errorMap');

const createSales = async (req, res) => {
  const { body } = req;
  const { type, message } = await saleService.createSales(body);
  if (type) return res.status(mapError(type)).json({ message });
  return res.status(201).json(message);
};

const getAllSales = async (_req, res) => {
    const { message } = await saleService.findAll();
    return res.status(200).json(message);
};

const getSaleById = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await saleService.findSaleById(id);
  if (type) return res.status(mapError(type)).json({ message });
  return res.status(200).json(message);
};

module.exports = {
  createSales,
  getAllSales,
  getSaleById,
};
