const { findById } = require('./productService');
const { salesModel } = require('../models');
const schema = require('./validations/validationsInputValues');

const createSales = async (sales) => {
  let errors = await Promise.all(sales
    .map(async (sale) => schema.validateNewSale(sale)));
  let error = errors.find(({ type }) => type !== null);
  console.log(errors, error);
  if (error) return error;
  errors = await Promise.all(sales
    .map(async ({ productId }) => findById(productId)));
    error = errors.find(({ type }) => type !== null);
    if (error) return error;
  const date = new Date();
  const formattedDate = date.toISOString().replace('T', ' ').substring(0, 19);
  const saleId = await salesModel.insertSale(formattedDate);
  await Promise.all(sales.map(
    async (sale) => salesModel.insertSalesProducts(saleId, sale),
  ));
  const newSale = { id: saleId, itemsSold: sales };
  return { type: null, message: newSale };
};

const findAll = async () => {
  const sales = await salesModel.findAll();
  return { type: null, message: sales };
};

const findSaleById = async (id) => {
  const error = schema.validateId(id);
  if (error.type) return error;
  const sale = await salesModel.findById(id);
  if (!sale.length) return { type: 'SALE_NOT_FOUND', message: 'Sale not found' };
  return { type: null, message: sale };
};

const deleteSale = async (id) => {
  const error = schema.validateId(id);
  if (error.type) return error;
  let sale = await salesModel.deleteSaleProducts(id);
  if (!sale) return { type: 'SALE_NOT_FOUND', message: 'Sale not found' };
  sale = await salesModel.deleteSale(id);
  if (!sale) return { type: 'SALE_NOT_FOUND', message: 'Sale not found' };
  return { type: null, message: '' };
};

module.exports = {
  createSales,
  findAll,
  findSaleById,
  deleteSale,
};
