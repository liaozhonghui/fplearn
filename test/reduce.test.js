var _ = require('ramda');

var arr = ['jump', 'round', 'upper'];

var reverse = _.reduce(function (acc, x) {
    return [x].concat(acc);
}, []);

reverse(arr);