/* eslint-disable func-names, prefer-arrow-callback*/
const request = require('request');

function Stock(symbol) {
  this.symbol = symbol.toUpperCase();
}
Stock.prototype.purchase = function (quantity, cb) {
  const url = `http://dev.markitondemand.com/MODApis/Api/v2/Quote/json?symbol=${this.symbol}`;
  request({ url, json: true }, (err, rsp, body) => {
    this.purchasePricePerShare = body.LastPrice;
    this.shares = quantity;
    this.name = body.Name;
    const totalprice = this.shares * this.purchasePricePerShare;
    this.purchaseDate = new Date();
    cb(null, totalprice);
  });
};

Stock.prototype.sell = function (quantity, cb) {
  const url = `http://dev.markitondemand.com/MODApis/Api/v2/Quote/json?symbol=${this.symbol}`;
  if (this.shares < quantity) cb(new Error('Not enough shares'));
  request({ url, json: true }, (err, rsp, body) => {
    this.purchasePricePerShare = body.LastPrice;
    this.shares -= quantity;
    this.name = body.Name;
    const totalCashValue = this.shares * this.purchasePricePerShare;
    cb(null, totalCashValue);
  });
};

module.exports = Stock;
