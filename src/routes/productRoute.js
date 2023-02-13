const express = require('express');
const { productController } = require('../controllers');

const route = express.Router();

route.get('/', productController.getAllProducts);

route.get('/:id', productController.getProductById);

module.exports = route;
