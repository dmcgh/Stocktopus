/* eslint-disable func-names, prefer-arrow-callback*/
function Portfolio(name) {
  this.name = name;
  this.stocks = [];
}

Portfolio.prototype.addStock = function (stock1) {
  // add the check for the type
  this.stocks.push(stock1);
};

Portfolio.prototype.position = function () {
  const shareValues = this.stocks.map(n => n.shares * n.purchasePricePerShare);
  return shareValues.reduce((t, n) => t + n);
};


module.exports = Portfolio;
