const { expect } = require('chai');
const sinon = require('sinon');
const { saleService, productService } = require('../../../src/services');
const { salesModel } = require('../../../src/models');
const {
  newSale,
  invalidId,
  invalidQuantity,
  product,
  sale,
 } = require('./mocks/saleService.mock');

describe('Testing sale service', function () {
  afterEach(function () {
    sinon.restore();
  });
  describe('Registration of a sale with invalid value', function () {
    it('Returns an error when passing an invalid quantity', async function () {
      const result = await saleService.createSales(invalidQuantity);
      expect(result.type).to.equal('INVALID_VALUE');
      expect(result.message).to.equal('"quantity" must be greater than or equal to 1');
    });
    it('Returns an error when passing an invalid productId', async function () {
      sinon.stub(productService, 'findById').resolves(undefined);
      const result = await saleService.createSales(invalidId);
      expect(result.type).to.equal('PRODUCT_NOT_FOUND');
      expect(result.message).to.equal('Product not found');
    });
  });
  describe('Registration of a sale with valid value', function () {
    it('Returns the registered sale', async function () {
      sinon.stub(productService, 'findById').resolves(product);
      sinon.stub(salesModel, 'insertSale').resolves(1);
      sinon.stub(salesModel, 'insertSalesProducts').resolves(1);
      const result = await saleService.createSales(newSale);
      expect(result.type).to.equal(null);
      expect(result.message).to.be.deep.equal(sale);
    });
  });
});
