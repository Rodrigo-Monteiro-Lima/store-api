const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const { saleService } = require('../../../src/services');
const { saleController } = require('../../../src/controllers');
const { newSale, sale, sales } = require('./mocks/saleController.mock');

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
    describe('Listing the sales', function () {
    it('Should return status 200 and sales list', async function () {
      const res = {};
      const req = {};
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(saleService, 'findAll')
        .resolves({ type: null, message: sales });
      await saleController.getAllSales(req, res);
      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(sales);
    });
  });
  describe('Searching a sale', function () {
    it('Should return status 200 and the sale', async function () {
      const res = {};
      const req = {
        params: { id: 1 },
      };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(saleService, 'findSaleById')
        .resolves({ type: null, message: [sales[0]] });
      await saleController.getSaleById(req, res);
      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith([sales[0]]);
    });
    it('When passing an invalid id it should return an error', async function () {
      const res = {};
      const req = {
        params: { id: 'a' },
      };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(saleService, 'findSaleById')
        .resolves({ type: 'INVALID_VALUE', message: '"id" must be a number' });
      await saleController.getSaleById(req, res);
      expect(res.status).to.have.been.calledWith(422);
      expect(res.json).to.have.been.calledWith({ message: '"id" must be a number' });
    });
    it('When passing an id that does not exist it should return an error', async function () {
      const res = {};
      const req = {
        params: { id: 90 },
      };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(saleService, 'findSaleById')
        .resolves({ type: 'SALE_NOT_FOUND', message: 'Sale not found' });
      await saleController.getSaleById(req, res);
      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({ message: 'Sale not found' });
    });
  });
  describe('Deleting a sale', function () {
   it('Should return status 204', async function () {
      const res = {};
      const req = {
        params: { id: 4 },
      };
      res.sendStatus = sinon.stub().returns(res);
      sinon
        .stub(saleService, 'deleteSale')
        .resolves({ type: null, message: '' });
      await saleController.deleteSale(req, res);
      expect(res.sendStatus).to.have.been.calledWith(204);
    });
    it('When passing an invalid id it should return an error', async function () {
      const res = {};
      const req = {
        params: { id: 'a' },
      };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(saleService, 'deleteSale')
        .resolves({ type: 'INVALID_VALUE', message: '"id" must be a number' });
      await saleController.deleteSale(req, res);
      expect(res.status).to.have.been.calledWith(422);
      expect(res.json).to.have.been.calledWith({ message: '"id" must be a number' });
    });
    it('When passing an id that does not exist it should return an error', async function () {
      const res = {};
      const req = {
        params: { id: 90 },
      };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(saleService, 'deleteSale')
        .resolves({ type: 'SALE_NOT_FOUND', message: 'Sale not found' });
      await saleController.deleteSale(req, res);
      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({ message: 'Sale not found' });
    });
  })
});
