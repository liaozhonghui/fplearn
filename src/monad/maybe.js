define('maybe', ['ramda'], function (_) {
  const Maybe = function (x) {
    this._value = x;
  };

  Maybe.of = function (x) {
    return new Maybe(x);
  };
  Maybe.prototype.isNothing = function () {
    return this._value === null || this._value === undefined;
  };

  Maybe.prototype.map = function (f) {
    return this.isNothing() ? new Maybe(null) : Maybe.of(f(this._value));
  };
  return Maybe;
});


