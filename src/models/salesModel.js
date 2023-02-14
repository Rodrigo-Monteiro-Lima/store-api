const camelize = require('camelize');
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

const findAll = async () => {
  const [result] = await connection.execute(
    `SELECT sp.sale_id, s.date, sp.product_id, sp.quantity
      FROM StoreManager.sales AS s
      INNER JOIN StoreManager.sales_products AS sp ON s.id = sp.sale_id
      ORDER BY sp.sale_id, sp.product_id;`,
  );
  return camelize(result);
};

const findById = async (id) => {
  const [result] = await connection.execute(
    `SELECT s.date, sp.product_id, sp.quantity
      FROM StoreManager.sales AS s
      INNER JOIN StoreManager.sales_products AS sp ON s.id = sp.sale_id
      WHERE sp.sale_id = ? ORDER BY sp.sale_id, sp.product_id;`,
    [id],
  );
  return camelize(result);
};

const deleteSale = async (id) => {
  const [{ affectedRows }] = await connection.execute(
    'DELETE FROM StoreManager.sales WHERE id = ?',
    [id],
  );
  return affectedRows;
};

const deleteSaleProducts = async (id) => {
  const [{ affectedRows }] = await connection.execute(
    'DELETE FROM StoreManager.sales_products WHERE sale_id = ?',
    [id],
  );
  return affectedRows;
};

module.exports = {
  insertSalesProducts,
  insertSale,
  findAll,
  findById,
  deleteSale,
  deleteSaleProducts,
  // updateSalesProducts,
};
