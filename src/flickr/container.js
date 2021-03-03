
require(['ramda', 'jquery'], function (_, $) {
    console.log('container.');
    var Container = function (x) {
        this._value = x;
    };
    Container.of = function (x) {
        return new Container(x);
    };
    Container.prototype.map = function (f) {
        return Container.of(f(this._value));
    };

    var c1 = Container.of(2).map(function (x) { return x + 2; });
    console.log(c1);
    var c2 = Container.of('bombs').map(_.concat(' away')).map(_.prop('length'));
    console.log(c2);
});