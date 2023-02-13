const sinon = require('sinon');
const chai = require('chai');
const sinonChai = require('sinon-chai');
const validateNewSale = require('../../../src/middlewares/validateNewSale');

const { expect } = chai;
chai.use(sinonChai);

describe('Testing validateNewSale middleware', function () {
  beforeEach(sinon.restore);
  describe('Trying to add an sale without productId', function () {
    it('Status is called with code 400', async function () {
      const res = {};
      const req = {
        body: [{}],
      };
      const next = sinon.stub().returns();
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      await validateNewSale(req, res, next);
      expect(res.status).to.have.been.calledOnceWith(400);
      expect(res.json).to.have.been.calledWith({ message: '"productId" is required' });
      // eslint-disable-next-line no-unused-expressions
      expect(next).to.have.not.been.called;
    });
  });
  describe('Trying to add an sale without quantity', function () {
    it('Status is called with code 400', async function () {
      const res = {};
      const req = {
        body: [{
          productId: 1,
        }],
      };
      const next = sinon.stub().returns();
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      await validateNewSale(req, res, next);
      expect(res.status).to.have.been.calledOnceWith(400);
      expect(res.json).to.have.been.calledWith({ message: '"quantity" is required' });
      expect(next).to.have.not.been.called;
    });
  });
  describe('Trying to add a valid sale', function () {
    it('Passing the data correctly calls the next middleware', async function () {
      const res = {};
      const req = {
        body: [{
          productId: 1,
          quantity: 1,
        }],
      };
      const next = sinon.stub().returns();
      await validateNewSale(req, res, next);
      expect(next).to.have.been.calledWith();
    });
  });
});
