const _ = require('ramda');
const { split, head, curry } = _;
const fs = require('fs');
//  readFile :: String -> Promise(Error, JSON)
const readFile = function (filename) {
    return new Promise(function (reject, resolve) {
        fs.readFile(filename, 'utf-8', function (err, data) {
            err ? reject(err) : resolve(data);
        });
    });
};
readFile("metamorphosis").map(split('\n')).map(head);

// jQuery getJSON example:
//========================
//  getJSON :: String -> {} -> Promise(Error, JSON)
const getJSON = curry(function (url, params) {
    return new Promise(function (reject, resolve) {
        $.getJSON(url, params, resolve).fail(reject);
    });
});
getJSON('/video', { id: 10 }).map(_.prop('title'));

Promise.resolve(3).map(function (three) { return three + 1; });