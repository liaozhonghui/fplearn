var _ = require('ramda');
var accounting = require('accounting');
var { reduce, compose, prop, head, map, last, toLower, replace, sortBy } = _;

var CARS = [
    { name: "Ferrari FF", horsepower: 660, dollar_value: 700000, in_stock: true },
    { name: "Spyker C12 Zagato", horsepower: 650, dollar_value: 648000, in_stock: false },
    { name: "Jaguar XKR-S", horsepower: 550, dollar_value: 132000, in_stock: false },
    { name: "Audi R8", horsepower: 525, dollar_value: 114200, in_stock: false },
    { name: "Aston Martin One-77", horsepower: 750, dollar_value: 1850000, in_stock: true },
    { name: "Pagani Huayra", horsepower: 700, dollar_value: 1300000, in_stock: false }];

var isLastInStock = compose(prop('in_stock'), last);
var nameOfFirstCar = compose(prop('name'), head);

var _average = function (xs) { return reduce(add, 0, xs) / xs.length; };
var averageDollarValue = compose(_average, map(prop('dollar_value')));

var _underscore = replace(/\W+/g, '_');
var sanitizeNames = map(compose(_underscore, toLower, _.prop('name')));

var availablePrices = compose(join(', '), map(compose(accounting.formatMoney, prop('dollar_value'))), filter(prop('in_stock')));

var append = _.flip(_.concat);

var fastestCar = compose(append(' is the fastest'), prop('name'), last, sortBy(prop('horsepower')));