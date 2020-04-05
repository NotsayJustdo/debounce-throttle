# 防抖(debounce)和节流(throttle)

作用：降低函数执行频率。

举例：当页面发生滚动时，由于滚动事件是连续触发的，这样下面代码中的handler会被执行很多次，如果每次都执行这个handler中的代码，也许这些代码修改了DOM等，这样是很消耗性能的。
```
$(window).on('scroll', handler);
```
需要采取一定的策略来降低handler里面代码的执行频率，我们可以使用_.debounce(handler, 200)来封装出一个新的handler出来，比如下面的`debouncedHandler`，在这个新返回的函数里面使用了定时器来降低原来handler函数的执行频率
```
var debouncedHandler = _.debounce(doSomething, 200); // 调用_.debounce这个函数时会创建一些变量，这些变量会在debouncedHandler函数执行时使用
$(window).on('scroll', debouncedHandler);
```
原理：调用_.debounce这个函数时会创建一些变量，这些变量会在debouncedHandler函数执行时使用，其实这个`debouncedHandler`在这个滚动事件中的是每次都调用的，只是在调用这个`debouncedHandler`时，设置了定时器来降低作为参数传入的函数doSomething的调用频率，这样的话就可以不用每次都调用doSomething里面的代码

## 防抖(debounce)
防抖可以使连续的触发事件的回调函数只在开始或者结束时候才被执行的，它触发的时间不是间隔相等的时间触发的。

### 应用场景
- resize事件
- input输入发起请求
- 元素的拖动等等

### 陷阱
注意不要将_.debounce调用多次
```
// 错误书写
$(window).on('scroll', function() {
   _.debounce(doSomething, 300); 
});

// 正确书写
$(window).on('scroll', _.debounce(doSomething, 200));
```

## 节流(throttle)
节流的触发是比较有规律的，间隔我们设置的时间间隔后才触发的，比如100ms触发一次

### 应用场景
- 无限下拉加载

## requestAnimationFrame (rAF)
这个是浏览器暴露的接口，它也是限制函数执行频率的方法，它相当于`_.throttle(dosomething, 16)`

## 使用requestAnimationFrame (rAF)代替throttle函数的利弊

### 优势
- 每秒60帧，内部会决定在最好的时机进行渲染
- 简单并且是标准的API，未来不会改变，维护少

### 劣势
- 需要程序员开始/取消rAFs，.debounce或.throttle由包内部进行管理
- 如果浏览器选项卡未处于活动状态，则不会执行。尽管对于滚动、鼠标或键盘事件，这并不重要。
- 尽管所有现代浏览器都提供rAF，但IE9、Opera Mini和老Android仍然不支持rAF。兼容性处理还是需要的。
- node.js不支持rAF，因此不能在服务器上使用它对文件系统事件进行节流处理。

### 选择使用的规则

根据经验，如果JavaScript函数正在“绘制”或直接设置属性的动画，我将使用requestAnimationFrame，在涉及重新计算元素位置的所有地方使用它。

发出Ajax请求或者添加/删除一个类（可能触发CSS动画），我会考虑使用_.debounce或_.throttle，在这里可以设置较低的执行频率（例如200ms，而不是16ms）

## 参考文章
[Debouncing and Throttling Explained Through Examples](https://css-tricks.com/debouncing-throttling-explained-examples/)
