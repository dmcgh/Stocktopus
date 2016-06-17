/* eslint-disable func-names, prefer-arrow-callback*/
const expect = require('chai').expect;
const Stock = require('../lib/stock');
const Portfolio = require('../lib/portfolio');
const Client = require('../lib/client');
const nock = require('nock');
const sinon = require('sinon');
let clock;

describe('Client', () => {
  before(() => {
    clock = sinon.useFakeTimers();
    nock('http://dev.markitondemand.com')
    .persist()
    .get('/MODApis/Api/v2/Quote/json?symbol=ALL')
    .reply(200, {
      Name: 'Allstate Corp',
      LastPrice: 100 });
  });
  after(() => {
    nock.cleanAll();
    clock.restore();
  });
  describe('constructor', function () {
    it('should construct a new client object', function () {
      const c1 = new Client('Sam');
      expect(c1).to.be.instanceof(Client);
      expect(c1.name).to.equal('Sam');
    });
  });
  describe('#deposit', function () {
    it('should deposit some money to client cash', function () {
      const c1 = new Client('Sam');
      c1.deposit(500);
      expect(c1.cash).to.equal(500);
    });
  });
  describe('#withdraw', function () {
    it('should withdraw some money from client cash', function () {
      const c1 = new Client('Sam');
      c1.cash = 500;
      c1.withdraw(200);
      expect(c1.cash).to.equal(300);
    });
    it('should fail to withdraw some money from client cash', function () {
      const c1 = new Client('Sam');
      c1.cash = 500;
      c1.withdraw(1000);
      expect(c1.cash).to.equal(500);
    });
  });
  describe('#purchaseStock', function () {
    it('should purchase stock to client and add it to portfolio', function (done) {
      const c1 = new Client('Sam');
      c1.cash = 5000;
      c1.purchaseStock('all', 5, 'tech', err => {
        expect(c1.portfolios[0]).to.be.instanceof(Portfolio);
        // expect(c1.portfolios[0].stocks[0]).to.be.instanceof(Stock);
        expect(c1.portfolios).to.be.length(1);
        expect(c1.portfolios[0].name).to.equal('tech');
        expect(err).to.not.exist;
        expect(c1.portfolios[0].stocks).to.be.length(1);
        expect(c1.portfolios[0].stocks[0].name).to.equal('Allstate Corp');
        expect(c1.portfolios[0].stocks[0].purchasePricePerShare).to.equal(100);
        expect(c1.portfolios[0].stocks[0].shares).to.equal(5);
        expect(c1.portfolios[0].position()).to.equal(500);
        expect(c1.cash).to.equal(4500);
        done();
      });
    });
  });
});
