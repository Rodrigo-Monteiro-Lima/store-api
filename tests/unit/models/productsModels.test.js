const { expect } = require('chai');
const sinon = require('sinon');
const { productModel } = require('../../../src/models');

const connection = require('../../../src/database/connection');
const { products, newProduct, updateProduct } = require('./mocks/productsModel.mock');

describe('Testing product model', function () {
  afterEach(function () {
    sinon.restore();
  });
  describe('Getting the products list', function () {
    it('Listing the products ', async function () {
      sinon.stub(connection, 'execute').resolves([products]);
      const result = await productModel.findAll();
      expect(result).to.be.deep.equal(products);
    });
  });
  describe('Getting a product by id', function () {
    it('Listing the product', async function () {
      sinon.stub(connection, 'execute').resolves([[products[0]]]);
      const result = await productModel.findById(1);
      expect(result).to.be.deep.equal(products[0]);
    });
  });
    describe('Registering a product', function () {
    it('Adding a new product', async function () {
      sinon.stub(connection, 'execute').resolves([{ insertId: 1 }]);
      const result = await productModel.insert(newProduct);
      expect(result).to.equal(1);
    });
  });
  describe('Updating a product', function () {
    it('Changing the name of a product', async function () {
      sinon.stub(connection, 'execute').resolves([{ affectedRows: 1 }]);
      const result = await productModel.update(...Object.values(updateProduct));
      expect(result).to.equal(1);
    });
  });
  describe('Deleting a product', function () {
    it('Deleting a product by id', async function () {
      sinon.stub(connection, 'execute').resolves([{ affectedRows: 1 }]);
      const result = await productModel.deleteProduct(4);
      expect(result).to.equal(1);
    });
  });
  describe('Searching a product', function () {
    it('Seaching a product by name', async function () {
      sinon.stub(connection, 'execute').resolves([[products[0]]]);
      const result = await productModel.searchingProduct('%mar%');
      expect(result).to.be.deep.equal([products[0]]);
    });
  });
});
