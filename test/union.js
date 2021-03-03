const { unionBy } = require('lodash');
var _ = require('lodash');

var arr = [
    { data: { name: '职级' }, type: 1, level: 1 },
    { data: { name: '职级' }, type: 1, level: 2 },
    { data: { name: '职级' }, type: 1, level: 2 },
    { data: { name: '职级' }, type: 1, level: 2 },
    { data: { name: '职级1' }, type: 1, level: 1 },
    { data: { name: '职级' }, type: 1, level: 2 },
];


var tranarr = _.unionWith(arr, _.isEqual);

console.log('tran result :', tranarr);