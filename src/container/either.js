const { curry, prop } = require('ramda');
const moment = require('moment');
const Left = function (x) {
  this.__value = x;
};
Left.of = function (x) {
  return new Left(x);
};
Left.prototype.map = function (f) {
  return this;
};
const Right = function (x) {
  this.__value = x;
};
Right.of = function (x) {
  return new Right(x);
};
Right.prototype.map = function (f) {
  return Right.of(f(this.__value));
};

const Either = function (x) {
  this.__value = x;
};
Either.of = function (x) {
  return new Either(x);
};
Either.prototype.map = function (f) {
  return f(this.__value) ? Right.of(f(this.__value)) : Left.of(this._value);
};

function test() {
  Right.of("rain").map(function (str) { return "b" + str; });
  // Right("brain")
  Left.of("rain").map(function (str) { return "b" + str; });
  // Left("rain")
  Right.of({ host: 'localhost', port: 80 }).map(prop('host'));
  // Right('localhost')
  Left.of("rolls eyes...").map(prop("host"));
  // Left('rolls eyes...')

  //  getAge :: Date -> User -> Either(String, Number)
  const getAge = curry(function (now, user) {
    let birthdate = moment(user.birthdate, "YYYY-MM-DD");
    if (!birthdate.isValid()) return Left.of("Birth date could not be parsed");
    return Right.of(now.diff(birthdate, "years"));
  });
  console.log(getAge(moment(), { birthdate: "2005-12-12" }));
  // Right(9)
  console.log(getAge(moment(), { birthdate: "aaaa" }));
  // Left("Birth date could not be parsed")
}

module.exports = { Left, Right, Either };
