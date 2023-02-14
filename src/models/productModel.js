const camelize = require('camelize');
const connection = require('../database/connection');

const findAll = async () => {
  const [result] = await connection.execute(
    'SELECT * FROM StoreManager.products ORDER BY id ASC;',
  );
  return camelize(result);
};

const findById = async (id) => {
  const [[product]] = await connection.execute(
    'SELECT * FROM StoreManager.products WHERE id = ?',
    [id],
  );
  return camelize(product);
};

const insert = async (name) => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO StoreManager.products (name) VALUE (?)',
    [name],
  );
  return insertId;
};

const update = async (name, id) => {
  const [{ affectedRows }] = await connection.execute(
    'UPDATE StoreManager.products SET name = ? WHERE id = ?',
    [name, id],
  );
  return affectedRows;
};

const deleteProduct = async (id) => {
  const [{ affectedRows }] = await connection.execute(
    'DELETE FROM StoreManager.products WHERE id = ?',
    [id],
  );
  return affectedRows;
};

const searchingProduct = async (name) => {
  const [result] = await connection.execute(
    'SELECT * FROM StoreManager.products WHERE name LIKE ?;',
    [name],
  );
  return result;
};

module.exports = {
  findAll,
  findById,
  insert,
  update,
  deleteProduct,
  searchingProduct,
};
