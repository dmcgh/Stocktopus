/* eslint-disable func-names, prefer-arrow-callback*/

const expect = require('chai').expect;
const Portfolio = require('../lib/portfolio');
const Stock = require('../lib/stock');
// const nock = require('nock');

describe('Portfolio', () => {
  describe('constructor', function () {
    it('should construct a new Portfolio object', function () {
      const p1 = new Portfolio('Port_One');
      expect(p1).to.be.instanceof(Portfolio);
      expect(p1.name).to.equal('Port_One');
    });
  });
  describe('#addStock', function () {
    it('should add a new stock to Portfolio', function () {
      const p1 = new Portfolio('Port_One');
      const s1 = new Stock('Stock_One');
      p1.addStock(s1);
      expect(p1.stocks).to.be.length(1);
      expect(p1.stocks[0]).to.be.instanceof(Stock);
    });
  });
  describe('#position', function () {
    it('should add the value of all stock in the portfolio', function () {
      const p1 = new Portfolio('Port_One');
      const s1 = new Stock('Stock_One');
      const s2 = new Stock('Stock_Two');
      p1.addStock(s1);
      s1.shares = 2;
      s1.purchasePricePerShare = 10;
      p1.addStock(s2);
      s2.shares = 3;
      s2.purchasePricePerShare = 10;
      expect(p1.stocks).to.be.length(2);
      expect(p1.position()).to.equal(50);
    });
  });
});
