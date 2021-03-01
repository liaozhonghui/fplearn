import { reduce } from 'lodash';
import * as R from 'ramda';

const { identity, split, map, filter, curry } = R;

var words = R.curry(function (f, de, str) {
    return f(de, str);
});

const res = words((de, str) => String.prototype.split.call(str, de), ' ', '1 2 3 4');
console.log('res:', res);

var newMap = map(res);

var sentences = undefined;

var filterQs = function (xs) {
    return filter(function (x) { return R.match(/q/i, x); }, xs);
};

var filterQsCurry = curry(function (filter, match, str, xs) {
    return filter(function (x) { return match(str, x); }, xs);
});
filterQsCurry = filter(match(/q/i));

var _keepHightest = function (x, y) { return x >= y ? x : y; };
var max = function (xs) {
    return reduce(function (acc, x) {
        return _keepHightest(acc, x);
    }, -Infinity, xs);
};
var maxCurry = reduce(_keepHightest, -Infinity);