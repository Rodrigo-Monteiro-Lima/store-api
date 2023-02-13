const { expect } = require('chai');
const sinon = require('sinon');
const { salesModel } = require('../../../src/models');

const connection = require('../../../src/database/connection');
const { date, newSale, sales } = require('./mocks/salesModel.mock');

describe('Testing sale model', function () {
  afterEach(function () {
    sinon.restore();
  });
  describe('Registering a sale', function () {
    it('Adding a new sale', async function () {
      sinon.stub(connection, 'execute').resolves([{ insertId: 1 }]);
      const result = await salesModel.insertSale(date);
      expect(result).to.equal(1);
    });
  });
  describe('Registering a sale product', function () {
    it('Adding a product to a new sale', async function () {
      sinon.stub(connection, 'execute').resolves([{ affectedRows: 1 }]);
      const result = await salesModel.insertSalesProducts(1, newSale);
      expect(result).to.equal(1);
    });
  });
  describe('Getting the products list', function () {
    it('Listing the products ', async function () {
      sinon.stub(connection, 'execute').resolves([sales]);
      const result = await salesModel.findAll();
      expect(result).to.be.deep.equal(sales);
    });
  });
  describe('Getting a product by id', function () {
    it('Listing the product', async function () {
      sinon.stub(connection, 'execute').resolves([sales[0]]);
      const result = await salesModel.findById(1);
      expect(result).to.be.deep.equal(sales[0]);
    });
  });
  describe('Deleting a sale', function () {
    it('Deleting a sale by id', async function () {
      sinon.stub(connection, 'execute').resolves([{ affectedRows: 1 }]);
      const result = await salesModel.deleteSale(4);
      expect(result).to.equal(1);
    });
    it('Deleting products from a sale by id', async function () {
      sinon.stub(connection, 'execute').resolves([{ affectedRows: 1 }]);
      const result = await salesModel.deleteSaleProducts(4);
      expect(result).to.equal(1);
    });
  });
});
