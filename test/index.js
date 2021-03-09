const { compose, split, head, curry, prop } = require('ramda');
const { JSDOM } = require('jsdom');
const { window } = new JSDOM(`<!DOCTYPE html>`);
const $ = require('jquery')(window);
const fs = require('fs');
const Task = require('folktale/concurrency/task/_task');
function trace(v) {
  console.log('v:', v);
  return v;
};
const readFile = function (filename) {
  return new Task(function (resolver) {
    fs.readFile(filename, 'utf-8', function (err, data) {
      err ? resolver.reject(err) : resolver.resolve(data);
    });
  });
};

var res = readFile('a.txt').map(split('\n')).map(head).map(trace);
console.log('res:', res.run().promise());

const url = function (term) {
  return 'https://api.flickr.com/services/feeds/photos_public.gne?tags=' + term + '&format=json';
};

var getJSON = curry(function (url) {
  return new Task(function (resolver) {
    console.log('url:', url);
    $.getJSON(url, function (data) {
      console.log('JSON:', data);
      return resolver.resolve(data);
    })
      .fail(function (err) {
        return resolver.reject(err);
      });
  });
});

var res = getJSON(url('video')).map(trace).map(compose(prop('title'), head, prop('items'))).map(trace);
console.log('res:', res.run().promise());

var res = Task.of(3).map(function (three) { return three + 1; }).map(trace);
console.log('res:', res.run().promise());

setTimeout(function () {

}, 3000);
