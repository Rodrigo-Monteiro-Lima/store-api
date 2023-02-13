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
  sales
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
      sinon.stub(productService, 'findById').resolves(product.message);
      sinon.stub(salesModel, 'insertSale').resolves(1);
      sinon.stub(salesModel, 'insertSalesProducts').resolves(1);
      const result = await saleService.createSales(newSale);
      console.log(result)
      expect(result.type).to.equal(null);
      expect(result.message).to.be.deep.equal(sale);
    });
  });
  describe('Listing sales', function () {
    it('Returns the entire list of sales', async function () {
      sinon.stub(salesModel, 'findAll').resolves(sales);
      const result = await saleService.findAll();
      expect(result.type).to.be.equal(null);
      expect(result.message).to.deep.equal(sales);
    });
  });
  describe('Searching a sale', function () {
    it('Returns an error if it receives an invalid id', async function () {
      const result = await saleService.findSaleById('a');
      expect(result.type).to.equal('INVALID_VALUE');
      expect(result.message).to.equal('"id" must be a number');
    });
    it('Returns an error if the sale does not exist', async function () {
      sinon.stub(salesModel, 'findById').resolves([]);
      const result = await saleService.findSaleById(1);
      expect(result.type).to.equal('SALE_NOT_FOUND');
      expect(result.message).to.equal('Sale not found');
    });
    it('Returns the sale with a valid id', async function () {
      sinon.stub(salesModel, 'findById').resolves([sales[0]]);
      const result = await saleService.findSaleById(1);
      expect(result.type).to.equal(null);
      expect(result.message).to.deep.equal([sales[0]]);
    });
  });
   describe('Deleting a existent sale', function () {
    it('Deleting a sale by id', async function () {
      sinon.stub(salesModel, 'deleteSaleProducts').resolves(1);
      sinon.stub(salesModel, 'deleteSale').resolves(1);
      const result = await saleService.deleteSale(4);
      expect(result.type).to.equal(null);
      expect(result.message).to.equal('');
    });
  });
  describe('Deleting a product with invalid values', function () {
    it('Returns an error if the products does not exist', async function () {
      sinon.stub(salesModel, 'deleteSaleProducts').resolves(0);
      const result = await saleService.deleteSale(4);
      expect(result.type).to.equal('SALE_NOT_FOUND');
      expect(result.message).to.equal('Sale not found');
    });
    it('Returns an error if the sale does not exist', async function () {
      sinon.stub(salesModel, 'deleteSaleProducts').resolves(1);
      sinon.stub(salesModel, 'deleteSale').resolves(0);
      const result = await saleService.deleteSale(4);
      expect(result.type).to.equal('SALE_NOT_FOUND');
      expect(result.message).to.equal('Sale not found');
    });
    it('Returns an error when passing a invalid id ', async function () {
      const result = await saleService.deleteSale('a');
      expect(result.type).to.equal('INVALID_VALUE');
      expect(result.message).to.equal('"id" must be a number');
    });
  });
});
