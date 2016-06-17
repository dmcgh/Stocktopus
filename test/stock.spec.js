/* eslint-disable func-names, prefer-arrow-callback*/

const expect = require('chai').expect;
const Stock = require('../lib/stock');
const nock = require('nock');
const sinon = require('sinon');
let clock;

describe('Stock', () => {
  beforeEach(() => {
    clock = sinon.useFakeTimers();
    nock('http://dev.markitondemand.com')
    .get('/MODApis/Api/v2/Quote/json?symbol=ALL')
    .reply(200, {
      Name: 'Allstate Corp',
      LastPrice: 100 });
  });
  after(() => {
    nock.restore();
    clock.restore();
  });
  describe('constructor', function () {
    it('should construct a new stock object', function () {
      const s1 = new Stock('all');
      expect(s1).to.be.instanceof(Stock);
      expect(s1.symbol).to.equal('ALL');
    });
  });
  describe('purchase', function () {
    it('should purchase stocks', function (done) {
      const s1 = new Stock('all');
      clock.tick(150);
      s1.purchase(50, function (err, totalprice) {
        expect(s1).to.be.instanceof(Stock);
        expect(s1.shares).to.equal(50);
        expect(s1.purchasePricePerShare).to.equal(100);
        expect(s1.purchaseDate.getTime()).to.equal(150);
        expect(s1.name).to.equal('Allstate Corp');
        expect(totalprice).to.equal(5000);
        done();
      });
    });
  });
  describe('sell', function () {
    it('should return cash value of stock sold', function (done) {
      const s1 = new Stock('ALL');
      s1.shares = 60;
      s1.sell(30, (err, totalcashVal) => {
        expect(s1.shares).to.equal(30);
        expect(s1.purchasePricePerShare).to.equal(100);
        expect(totalcashVal).to.be.below(3300);
        done();
      });
    });
    it('should return an error when trying to sell too much', function (done) {
      const s1 = new Stock('ALL');
      s1.shares = 10;
      s1.sell(30, (err, totalcashVal) => {
        expect(s1.shares).to.equal(10);
        expect(err.message).to.equal('Not enough shares');
        expect(err).to.be.an('error');
        expect(totalcashVal).to.be.an('undefined');
        done();
      });
    });
  });
});
