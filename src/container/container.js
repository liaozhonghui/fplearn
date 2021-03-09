const _ = require('ramda');
const Container = function (x) {
  this._value = x;
};
Container.of = function (x) {
  return new Container(x);
};
Container.prototype.map = function (f) {
  return Container.of(f(this._value));
};

function test() {
  const c1 = Container.of(2).map(function (x) { return x + 2; });
  console.log(c1);
  const c2 = Container.of('bombs').map(_.concat(' away')).map(_.prop('length'));
  console.log(c2);
}

module.exports = Container;
