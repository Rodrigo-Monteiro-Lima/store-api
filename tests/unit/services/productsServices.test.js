const { expect } = require('chai');
const sinon = require('sinon');
const { productService } = require('../../../src/services');
const { productModel } = require('../../../src/models');

const { products, updateProduct } = require('./mocks/productService.mock');

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
  describe('Registration of a product with invalid value', function () {
    it('Returns an error when passing an invalid name', async function () {
      const result = await productService.createProduct('Ultr');
      expect(result.type).to.equal('INVALID_VALUE');
      expect(result.message).to.equal('"name" length must be at least 5 characters long');
    });
  });
  describe('Registration of a product with valid value', function () {
    it('Returns the registered product', async function () {
      sinon.stub(productModel, 'insert').resolves(1);
      sinon.stub(productModel, 'findById').resolves(products[0]);
      const result = await productService.createProduct('Martelo de Thor');
      expect(result.type).to.equal(null);
      expect(result.message).to.equal(products[0]);
    });
  });
  describe('Updating a product wiht invalid values', function () {
    it('Returns an error if it receives an invalid id', async function () {
      const result = await productService.update('Batarangue', 'a');
      expect(result.type).to.equal('INVALID_VALUE');
      expect(result.message).to.equal('"id" must be a number');
    });
    it('Returns an error if it receives an invalid name', async function () {
      const result = await productService.update('Bat', 1);
      expect(result.type).to.equal('INVALID_VALUE');
      expect(result.message).to.equal('"name" length must be at least 5 characters long');
    });
    it('Returns an error if the product does not exist', async function () {
      sinon.stub(productModel, 'findById').resolves(undefined);
      const result = await productService.update('Batarangue', 90);
      expect(result.type).to.equal('PRODUCT_NOT_FOUND');
      expect(result.message).to.equal('Product not found');
    });
  });
  describe('Updating a product with valid values', function () {
    it('Changing the name of a product', async function () {
      sinon.stub(productModel, 'findById').resolves(updateProduct);
      sinon.stub(productModel, 'update').resolves(1);
      const result = await productService.update(...Object.values(updateProduct).reverse());
      expect(result.type).to.equal(null);
      expect(result.message).to.equal(updateProduct);
    });
  });
    describe('Deleting a existent product', function () {
    it('Deleting a product by id', async function () {
      sinon.stub(productModel, 'deleteProduct').resolves(1);
      const result = await productService.deleteProduct(4);
      expect(result.type).to.equal(null);
      expect(result.message).to.equal('');
    });
  });
  describe('Deleting a product with invalid values', function () {
    it('Returns an error if the product does not exist', async function () {
      sinon.stub(productModel, 'deleteProduct').resolves(0);
      const result = await productService.deleteProduct(4);
      expect(result.type).to.equal('PRODUCT_NOT_FOUND');
      expect(result.message).to.equal('Product not found');
    });
    it('Returns an error when passing a invalid id ', async function () {
      const result = await productService.deleteProduct('a');
      expect(result.type).to.equal('INVALID_VALUE');
      expect(result.message).to.equal('"id" must be a number');
    });
  });
});
