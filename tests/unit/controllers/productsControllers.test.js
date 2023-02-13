const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const { productService } = require('../../../src/services');
const { productController } = require('../../../src/controllers');
const {
  products,
  invalidValue,
  productNotFound,
 } = require('./mocks/productController.mock');

const { expect } = chai;
chai.use(sinonChai);

describe('Testing product controller', function () {
  afterEach(function () {
    sinon.restore();
  });
  describe('Listing the products', function () {
    it('Should return status 200 and product list', async function () {
      const res = {};
      const req = {};
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(productService, 'findAll')
        .resolves({ type: null, message: products });
      await productController.getAllProducts(req, res);
      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(products);
    });
  });
  describe('Searching a product', function () {
    it('Should return status 200 and the product', async function () {
      const res = {};
      const req = {
        params: { id: 1 },
      };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(productService, 'findById')
        .resolves({ type: null, message: products[0] });
      await productController.getProductById(req, res);
      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(products[0]);
    });
    it('When passing an invalid id it should return an error', async function () {
      const res = {};
      const req = {
        params: { id: 'abc' },
      };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(productService, 'findById')
        .resolves(invalidValue);
      await productController.getProductById(req, res);
      expect(res.status).to.have.been.calledWith(422);
      expect(res.json).to.have.been.calledWith({ message: '"id" must be a number' });
    });
    it('When passing an id that does not exist it should return an error', async function () {
      const res = {};
      const req = {
        params: { id: 9999 },
      };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(productService, 'findById')
        .resolves(productNotFound);
      await productController.getProductById(req, res);
      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({ message: 'Product not found' });
    });
  });
});
