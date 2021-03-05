#### Monad

是一种设计模式，表示通过函数拆解成相互连接的多个步骤，只需要提供下一步运算所需的函数，整个运算会自动的进行下去，
Monad 函子的一个典型应用就是实现 I/O 操作，它可以将带有副作用的函数包装起来

Monad 的简单实现

```js
class Monad extends Functor {
  join() {
    return this.val;
  }
  flatMap(f) {
    return this.map(f).join();
  }
}
```

```js
var fs = require("fs");
var readFile = function (filename) {
  return new IO(function () {
    // 有副作用
    return fs.readFileSync(filename, "utf-8");
  });
};
var print = function (x) {
  // 有副作用
  return new IO(function () {
    console.log(x);
    return x;
  });
};
var tail = function (x) {
  return new IO(function () {
    return x[x.length - 1];
  });
};
// 等同于
readFile("./user.txt").chain(tail).chain(print);
```
