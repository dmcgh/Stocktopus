/* eslint-disable func-names, prefer-arrow-callback*/

const Stock = require('./stock');
const Portfolio = require('./portfolio');

function Client(name) {
  this.name = name;
  this.cash = 0;
  this.portfolios = [];
}

Client.prototype.deposit = function (amount) {
  this.cash += amount;
};

Client.prototype.withdraw = function (amount) {
  if (amount > this.cash) return;
  this.cash -= amount;
};

Client.prototype.purchaseStock = function (symbol, amount, portName, cb) {
  const currentPrice = Stock.quote(symbol, q => q);
  if ((currentPrice * amount) > this.cash) { cb(new Error('Not enough cash to buy')); }
  if (!(this.portfolios.find(n => n.name === portName))) {
    const newPort = new Portfolio(portName);
    this.portfolios.push(newPort);
  }
  const newStock = new Stock('all');
  newStock.purchase(amount, (err, totalprice) => {
    const portIndex = this.portfolios.findIndex(n => n.name === portName);
    this.portfolios[portIndex].addStock(newStock);
    this.cash -= totalprice;
    cb(null);
  });
};

module.exports = Client;
