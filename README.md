## react+redux构建淘票票首页

### 描述
---
在之前的项目中都是单纯的用react，并没有结合redux。对于中小项目仅仅使用react是可以的；但当项目变得更加复杂，仅仅使用react是远远不够的，我们需要将UI渲染和数据处理区分开，因此我们需要引入redux来管理数据层。写该小demo的目的主要是为了在理论学习的基础上更好的进行实践，通过自己亲手写个小项目我们才能更好的理解redux是如何管理数据层的。数据是取自淘票票官方二月初的部分数据。

### 技术栈
---
react.js、react-router、redux、es6、webpack、less等。

### 运行
- 下载源码

```
git clone https://github.com/zhuotianbao/tiaopiaopiao--react-redux.git
```
-  安装 npm 依赖包

```
npm install
```
- 启动项目

```
npm run start
```
- 打包

```
npm run build
```
- 访问地址

```
在package.json文件中修改IP地址
http://192.168.2.95:8080/index
```


### 目录结构
---
```
- dist             [打包后代码]
- src               [源码]
  -- css             [样式]
  -- data            [数据]
  -- img             [图片]
  -- js              [js代码]
    └ actions        [创建action]
    └ components     [纯UI组件]
    └ constants      [定义type类型]
    └ containers     [获取store中的数据;将dispatch与actionCreator结合起来]
    └ reducers       [reducer纯函数]
    └ store          [创建store]
    └ index.js       [路由配置]
  -- index.html      [入口]
```

### 项目浏览
---

![image](https://raw.githubusercontent.com/zhuotianbao/tiaopiaopiao--react-redux/master/src/img/tabSelect.gif)  ![image](https://raw.githubusercontent.com/zhuotianbao/tiaopiaopiao--react-redux/master/src/img/citySelect.gif)  ![image](https://raw.githubusercontent.com/zhuotianbao/tiaopiaopiao--react-redux/master/src/img/hotFilm.gif)  ![image](https://raw.githubusercontent.com/zhuotianbao/tiaopiaopiao--react-redux/master/src/img/willFilm.gif)

### 特色功能
---
- 用原生js封装一个轮播图组件。
- 引入异步加载组件。同步加载方式，每次都会把所有的依赖加载完再进行渲染，导致加载时间长。
![image](https://raw.githubusercontent.com/zhuotianbao/tiaopiaopiao--react-redux/master/src/img/异步加载.png)
- 各个组件的js分开打包。要是将所有的js都打包在一个文件夹，当项目太大时会导致文件太大，无法满足性能加载速度等要求。
![image](https://raw.githubusercontent.com/zhuotianbao/tiaopiaopiao--react-redux/master/src/img/分割文件打包.png)

### 待续
---
由于时间比较仓促，一些细节还没来得及完善，还要很多东西都还没来得及加入，如immutable.js进行性能优化，图片的懒加载，redux开发者工具的日志监控等等功能。后续会慢慢完善，敬请期待...

### 博客地址
---
如果对项目有疑惑的地方，请到 [博客园](http://www.cnblogs.com/zhuotiabo/p/6371512.html) 里留言。如果觉得这个项目对你有帮助的话，请Star一下本项目，这是对作者最大的支持。
