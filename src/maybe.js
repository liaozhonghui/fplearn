const _ = require('ramda');
const { match, add } = _;
const Maybe = function (x) {
    this.__value = x;
};
Maybe.of = function (x) {
    return new Maybe(x);
};
Maybe.prototype.isNothing = function () {
    return (this.__value === null || this.__value === undefined);
};
Maybe.prototype.map = function (f) {
    return this.isNothing() ? Maybe.of(null) : Maybe.of(f(this.__value));
};


console.log(Maybe.of("Malkovich Malkovich").map(match(/a/ig)));
//=> Maybe(['a', 'a'])
console.log(Maybe.of(null).map(match(/a/ig)));
//=> Maybe(null)
console.log(Maybe.of({ name: "Boris" }).map(_.prop("age")).map(add(10)));
//=> Maybe(null)
console.log(Maybe.of({ name: "Dinah", age: 14 }).map(_.prop("age")).map(add(10))); //=> Maybe(24)