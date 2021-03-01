const _ = require('lodash');
const curry = _.curry;

var match = curry(function (what, str) {
    return str.match(what);
});
var replace = curry(function (what, replacement, str) {
    return str.replace(what, replacement);
});

var filter = curry(function (f, arr) {
    return arr.filter(f);
});
var map = curry(function (f, arr) {
    return arr.map(f);
});