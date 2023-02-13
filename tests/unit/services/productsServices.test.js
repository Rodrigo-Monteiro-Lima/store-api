const { expect } = require('chai');
const sinon = require('sinon');
const { productService } = require('../../../src/services');
const { productModel } = require('../../../src/models');

const { products } = require('./mocks/productService.mock');

describe('Testing product service', function () {
  afterEach(function () {
    sinon.restore();
  });
  describe('Listing the products', function () {
    it('Returns the entire list of products', async function () {
      sinon.stub(productModel, 'findAll').resolves(products);
      const result = await productService.findAll();
      expect(result.type).to.be.equal(null);
      expect(result.message).to.deep.equal(products);
    });
  });
  describe('Searching a product', function () {
    it('Returns an error if it receives an invalid id', async function () {
      const result = await productService.findById('a');
      expect(result.type).to.equal('INVALID_VALUE');
      expect(result.message).to.equal('"id" must be a number');
    });
    it('Returns an error if the product does not exist', async function () {
      sinon.stub(productModel, 'findById').resolves(undefined);
      const result = await productService.findById(1);
      expect(result.type).to.equal('PRODUCT_NOT_FOUND');
      expect(result.message).to.equal('Product not found');
    });
    it('Returns the product with a valid id', async function () {
      sinon.stub(productModel, 'findById').resolves(products[0]);
      const result = await productService.findById(1);
      expect(result.type).to.equal(null);
      expect(result.message).to.deep.equal(products[0]);
    });
  });
});
