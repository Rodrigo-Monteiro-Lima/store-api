const connection = require('../database/connection');

const insertSale = async (date) => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO StoreManager.sales (date) VALUE (?)',
    [date],
  );
  return insertId;
};

const insertSalesProducts = async (saleId, { productId, quantity }) => {
  const [{ affectedRows }] = await connection.execute(
    'INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity) VALUE (?, ?, ?)',
    [saleId, productId, quantity],
  );
  return affectedRows;
};

module.exports = {
  insertSalesProducts,
  insertSale,
};
