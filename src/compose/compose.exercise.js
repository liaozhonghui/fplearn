const _ = require('ramda');
const accounting = require('accounting');
const { reduce, compose, prop, head, map, last, toLower, replace, sortBy, join, add, filter } = _;

const CARS = [
    { name: "Ferrari FF", horsepower: 660, dollar_value: 700000, in_stock: true },
    { name: "Spyker C12 Zagato", horsepower: 650, dollar_value: 648000, in_stock: false },
    { name: "Jaguar XKR-S", horsepower: 550, dollar_value: 132000, in_stock: false },
    { name: "Audi R8", horsepower: 525, dollar_value: 114200, in_stock: false },
    { name: "Aston Martin One-77", horsepower: 750, dollar_value: 1850000, in_stock: true },
    { name: "Pagani Huayra", horsepower: 700, dollar_value: 1300000, in_stock: false }];

// 获取last, 取出名称
const isLastInStock = compose(prop('in_stock'), last);

const nameOfFirstCar = compose(prop('name'), head);

// 计算dollad_value平均值
const _average = function (xs) { return reduce(add, 0, xs) / xs.length; };
const averageDollarValue = compose(_average, map(prop('dollar_value')));

// 替换名称的非word字符为_
const _underscore = replace(/\W+/g, '_');
const sanitizeNames = map(compose(_underscore, toLower, _.prop('name')));

// 获取可用金额
const availablePrices = compose(join(', '), map(compose(accounting.formatMoney, prop('dollar_value'))), filter(prop('in_stock')));

// 获取排序后的最大horsepower数据
const append = _.flip(_.concat);
const fastestCar = compose(append(' is the fastest'), prop('name'), last, sortBy(prop('horsepower')));

console.log(isLastInStock(CARS));
console.log(nameOfFirstCar(CARS));
console.log(averageDollarValue(CARS));
console.log(sanitizeNames(CARS));
console.log(availablePrices(CARS));
console.log(fastestCar(CARS));