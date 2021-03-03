var _ = require('ramda');
var IO = function (f) {
    this._value = f;
};
IO.of = function (x) {
    return new IO(function () {
        return x;
    });
};
IO.prototype.map = function (f) {
    return new IO(_.compose(f, this._value));
};

var map = function (f, container) {
    return container.map(f);
};

var io_window = new IO(function () { return window; });
var t1 = io_window.map(function (win) { return win.innerWidth; });

var t2 = io_window.map(_.prop('location')).map(_.prop('href')).map(_.split('/'));

var $ = function (selector) {
    return new IO(function () {
        return document.querySelectorAll(selector);
    });
};
$('#myDiv').map(_.head).map(function (div) { return div.innerWidth; });

console.log('t1:', t1._value());
console.log('t2:', t2);

var url = new IO(function () {
    return window.location.href;
});
var toPairs = _.compose(map(_.split('=')), split('&'));