/*eslint-disable func-names, prefer-arrow-callback*/
const expect = require('chai').expect;
const Stock = require('../lib/stock');
describe('Stock', function( ) {
  describe('constructor', function( ) {
    it('should give you stock prices', function(done) {
      const s1 = new Stock('ALL');
      s1.purchase(50, (err, totalprice) => {
              expect(s1).to.be.instanceof(Stock);
              expect(s1.shares).to.equal(50);
              expect(s1.purchasePricePerShare).to.equal(66.475);
              expect(s1.name).to.equal('Allstate Corp');
            //expect(s1.totalprice).to.be.above(3300);
              done();
            });
      });
    });
    describe('sell', function( ) {
      it('should return cash value of stock sold', function(done) {
        const s1 = new Stock('ALL');
        s1.purchase(50, (err, totalprice) => {
                expect(s1).to.be.instanceof(Stock);
                expect(s1.shares).to.equal(50);
                expect(s1.purchasePricePerShare).to.equal(66.475);
                expect(s1.name).to.equal('Allstate Corp');
              //expect(s1.totalprice).to.be.above(3300);
                done();
        });
        s1.sell(30, (err, totalcashVal) => {
                expect(s1.shares).to.equal(20);
                expect(s1.purchasePricePerShare).to.equal(66.475);
                expect(s1.totalprice).to.be.below(3300);
                done();
        });
      });
  });
});
