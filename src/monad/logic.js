
require([
  'io',
  'maybe',
  'ramda',
  'jquery'
], function (IO, Maybe, _, $) {
  const { split, prop, head, compose, last, map, filter, eq } = _;
  // TODO: add Logic here

  // test 1
  var io = new IO(function () { return 'hello.'; });
  var res = io.unsafePerformIO();
  console.log('res:', res);

  // test 2
  var io_window = new IO(function () { return window; });
  io_window = io_window.map(prop('location')).map(prop('href')).map(split('/'));
  console.log(io_window.unsafePerformIO());
  var $$ = function (selector) {
    return new IO(function () { return document.querySelectorAll(selector); });
  };
  const myDivs = $$('#myDiv').map(head).map(function (div) { return div.innerHTML; }).unsafePerformIO();
  console.log('myDivs:', myDivs);

  // test 3
  // test href url: file:///Users/xinliao/Works/FP/src/monad/index.html?searchTerm=liaozhonghui&searchTerm=liaoxin&test=test
  var url = new IO(function () { return window.location.href; });
  var toPairs = compose(map(split('=')), split('&'));
  var params = compose(toPairs, last, split('?'));
  var findParams = function (key) {
    return url.map(params).map(filter(compose(eq(key), head))).map(Maybe.of);
  };

  var res = findParams('searchTerm').unsafePerformIO();
  console.log('res:', res);
});
