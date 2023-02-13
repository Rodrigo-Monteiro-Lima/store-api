const { expect } = require('chai');
const sinon = require('sinon');
const { salesModel } = require('../../../src/models');

const connection = require('../../../src/database/connection');
const { date, newSale } = require('./mocks/salesModel.mock');

describe('Testing sale model', function () {
  afterEach(function () {
    sinon.restore();
  });
  describe('Registering a sale', function () {
    it('Adding a new sale', async function () {
      sinon.stub(connection, 'execute').resolves([{ insertId: 1 }]);
      const result = await salesModel.insertSale(date);
      expect(result).to.equal(1);
    });
  });
  describe('Registering a sale product', function () {
    it('Adding a product to a new sale', async function () {
      sinon.stub(connection, 'execute').resolves([{ affectedRows: 1 }]);
      const result = await salesModel.insertSalesProducts(1, newSale);
      expect(result).to.equal(1);
    });
  });
});
