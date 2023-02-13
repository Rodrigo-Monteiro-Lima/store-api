const express = require('express');
const { saleController } = require('../controllers');
const validateNewSale = require('../middlewares/validateNewSale');

const route = express.Router();

route.post('/', validateNewSale, saleController.createSales);

module.exports = route;
