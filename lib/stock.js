const request = require('request');

function Stock(symbol){
  this.symbol = symbol.toUpperCase();
};
Stock.prototype.purchase = function (quantity, cb) {
  const url = `http://dev.markitondemand.com/MODApis/Api/v2/Quote/json?symbol=${this.symbol}`;
  request({ url, json: true }, (err, rsp, body) => {
    this.purchasePricePerShare = body.LastPrice
    this.shares = quantity;
    this.name = body.Name;
    const totalprice = this.shares * this.purchasePricePerShare;
    cb(null, totalprice);
    console.log('body:', totalprice, body);
  });
};

Stock.prototype.sell = function (quantity, cb) {
  const url = `http://dev.markitondemand.com/MODApis/Api/v2/Quote/json?symbol=${this.symbol}`;
  request({ url, json: true }, (err, rsp, body) => {
    this.purchasePricePerShare = body.LastPrice
    this.shares = quantity;
    this.name = body.Name;
    const totalprice = this.shares * this.purchasePricePerShare;
    cb(null, totalprice);
    console.log('body:', totalprice, shares, body);
  });
};
module.exports = Stock;

//s1=new Stock('ALL');
//s1.purchase(50, (err, totalprice) => { console.log('totalprice:' totalprice)   });
