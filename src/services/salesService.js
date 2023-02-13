const { findById } = require('./productService');
const { salesModel } = require('../models');
const schema = require('./validations/validationsInputValues');

const createSales = async (sales) => {
  let errors = await Promise.all(sales
    .map(async (sale) => schema.validateNewSale(sale)));
  let error = errors.find(({ type }) => type !== null);
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

module.exports = {
  createSales,
};
