const _ = require('ramda');
const IO = function (f) {
  this.unsafePerformIO = f;
};
IO.of = function (x) {
  return new IO(function () {
    return x;
  });
};
IO.prototype.map = function (f) {
  return new IO(_.compose(f, this.unsafePerformIO));
};
module.exports = IO;


