const { expect } = require('chai');
const sinon = require('sinon');
const { productModel } = require('../../../src/models');

const connection = require('../../../src/database/connection');
const { products } = require('./mocks/productsModel.mock');

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
});
