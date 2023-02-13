const sinon = require('sinon');
const chai = require('chai');
const sinonChai = require('sinon-chai');
const validateProductName = require('../../../src/middlewares/validateProductName');

const { expect } = chai;
chai.use(sinonChai);

describe('Testing validateProductName middleware', function () {
  beforeEach(sinon.restore);
  describe('Trying to add an unnamed product', function () {
    it('Status is called with code 400', async function () {
      const res = {};
      const req = {
        body: {},
      };
      const next = sinon.stub().returns();
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      await validateProductName(req, res, next);
      expect(res.status).to.have.been.calledOnceWith(400);
      expect(res.json).to.have.been.calledWith({ message: '"name" is required' });
      expect(next).to.have.not.been.called;
    });
    it('Passing the data correctly calls the next middleware', async function () {
      const res = {};
      const req = {
        body: {
          name: 'Martelo de Thor',
        },
      };
      const next = sinon.stub().returns();
      await validateProductName(req, res, next);
      expect(next).to.have.been.calledWith();
    });
  });
});
