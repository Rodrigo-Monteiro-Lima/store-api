const express = require('express');
const { productController } = require('../controllers');
const validateName = require('../middlewares/validateProductName');

const route = express.Router();

route.get('/', productController.getAllProducts);

route.get('/:id', productController.getProductById);

route.post('/', validateName, productController.createProduct);

route.put('/:id', validateName, productController.updateProduct);

module.exports = route;
