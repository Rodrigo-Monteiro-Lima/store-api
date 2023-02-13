const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const { saleService } = require('../../../src/services');
const { saleController } = require('../../../src/controllers');
const { newSale, sale } = require('./mocks/saleController.mock');

const { expect } = chai;
chai.use(sinonChai);

describe('Testing sale controller', function () {
  afterEach(function () {
    sinon.restore();
  });
  describe('Registration of a sale with valid value', function () {
    it('When sending valid data should save correctly', async function () {
      const res = {};
      const req = {
        body: newSale,
      };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(saleService, 'createSales')
        .resolves({ type: null, message: sale });
      await saleController.createSales(req, res);
      expect(res.status).to.have.been.calledWith(201);
      expect(res.json).to.have.been.calledWith(sale);
    });
  });
  describe('Registration of a sale with invalid value', function () {
    it('When sending a quantity with less than 1 it should return an error',
    async function () {
      const res = {};
      const req = {
        body: [
          {
            productId: 1,
            quantity: 0,
          },
        ],
      };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(saleService, 'createSales')
        .resolves(
          { type: 'INVALID_VALUE', message: '"quantity" must be greater than or equal to 1' },
          );
      await saleController.createSales(req, res);
      expect(res.status).to.have.been.calledWith(422);
      expect(res.json).to.have.been
      .calledWith({ message: '"quantity" must be greater than or equal to 1' });
    });
  });
});
