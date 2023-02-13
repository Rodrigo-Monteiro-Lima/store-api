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

module.exports = {
  findAll,
  findById,
};
