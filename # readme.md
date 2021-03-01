# readme.md

## FP introduction

1. 定义： 是一种编程范式，通过将电脑运算视为函数运算，并且避免使用程序状态以及易变对象
2. 历史: 函数式编程的理论基础是 1930 年开发的 Lambda 演算，本身是一种数学的抽象而不是编程语言，在 20 世纪 50 年代，早期的函数式编程语言 Lisp 问世。在 20 世纪 90 年代，函数式编程语言 Haskell 问世。
3. 函数式编程语言：
   - 静态：Haskell
   - 动态：Lisp
   - 混合面向对象编程： JavaScript, Java ..
4. 函数式编程的特点：

- 函数是第一等公民： 函数和其他数据类型一样，函数=变量=值， 可以作为变量参数，也可以作为别的函数的返回值
<!-- TODO: 增加代码 -->
- 只用表达式，不用语句： 每一步都是单纯的运算，每一步都有返回值
- 没有副作用：函数内部不影响外界数据环境，
- 不修改状态：状态只有转化，不会修改
- 引用透明：外界环境不影响函数内部逻辑，函数的运行只依赖输入的参数，任何时候只要参数相同，引用函数总是得到相同的返回值

5. 函数式编程的好处：

- 代码简洁，开发快速
- 接近自然语言，易于理解
- 方便代码管理，方便 unit testing
- 易于并发编程，函数式编程没有死锁，可以将计算分布到多核 cpu 上进行计算，能够大大地提高处理能力

## FP Compare (指令式编程,OOP）

写代码的方法论不一样：
指令式编程面向的是执行过程，主体是指令
函数式编程面向的是函数，主体是函数，对比指令式编程，函数式编程更加强调程序执行的结果而不是执行的过程，通过声明式的代码来开发程序
OOP 面向的是对象，并通过抽象，继承，封装，多态来进行编程

## JS FP concepts

- 柯里化
- 偏应用
- 组合与管道
- 函子
- Monad

### 柯里化

将已经多参数函数，转化为一个依次调用的单元函数，`f(a,b,c) => f(a)(b)(c)`

<!-- TODO: code -->

### 偏应用

固定任意参数，然后接收剩余参数
参数预装载
`f(a,b,c) => f(a,b)(c) or f(a)(b,c)`
类比数据中函数求导数

### compose 函数组合

通过组合来实现代码装配线功能

### pipe 管线化

按照函数参数正向进行执行，跟 compose 函数的执行顺序相反

### 函子

函子可以值转化
特点：

1. 函子遵循一些特定规则的容器类型或者数据编程协议
2. 具有一个通用的 map 方法，返回新实例，这个实例和之前的实例具有相同的规则
3. 具有结合外部的运算能力

### Monad

是一种设计模式，表示通过函数拆解成相互连接的多个步骤，只需要提供下一步运算所需的函数，整个运算会自动的进行下去

## JS FP

## JS FP Lib

- underscore
- lodash
- RxJs