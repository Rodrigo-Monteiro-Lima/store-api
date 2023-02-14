const express = require('express');
const { productController } = require('../controllers');
const validateName = require('../middlewares/validateProductName');
const { searchingProduct } = require('../models/productModel');

const route = express.Router();

route.get('/', productController.getAllProducts);

route.get('/search', productController.searchingProduct);

// route.get('/search', async (req, res) => {
//   const { q } = req.query;
//   const name = `%${q}%`;
//   const result = await searchingProduct(name);
//   return res.status(200).json(result);
// });

// route.get('/search', async (req, res) => {
//   const { q } = req.query;
//   const name = `%${q}%`;
//   console.log(q);
//   const result = await searchingProduct(name);
//   return res.status(200).json(result);
// });

route.get('/:id', productController.getProductById);

route.post('/', validateName, productController.createProduct);

route.put('/:id', validateName, productController.updateProduct);

route.delete('/:id', productController.deleteProduct);

module.exports = route;
