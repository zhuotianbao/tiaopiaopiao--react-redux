import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { Router, Route, IndexRoute, useRouterHistory } from 'react-router';
import { createHashHistory } from 'history';

import { browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux' 


//同步加载组件
import configureStore from './store/configureStore.js';
import Movie from './containers/Movie.js';
import App from './containers/App.js';

//样式
import '../css/reset.less';
import '../css/movie.less';
import '../css/cinema.less';
import '../css/mine.less';
import '../css/index.less';

let store = configureStore();

//如果只是想去掉 ?_k=adseis 这样的字符串的话，可以使用外部的 history 模块。
//const appHistory = useRouterHistory(createHashHistory)({ queryKey: false });
// 创建一个增强版的history来结合store同步导航事件
const appHistory = syncHistoryWithStore(browserHistory, store)

//import All from './containers/All.js';同步加载方式，每次都会把所有的依赖加载完再进行渲染，导致加载时间长
//当js bundle太大的时候，需要拆分成几个小的bundle，进行异步加载。这时可以用到webpack的异步加载打包功能，require。
var Cinema = (location, cb) => {
  require.ensure([], require => {
    cb(null, require('./containers/Cinema.js').default);
  }, 'cinema');
};

var Mine = (location, cb) => {
  require.ensure([], require => {
    cb(null, require('./containers/Mine.js').default);
  }, 'mine');
};

const routes = (
  <Route path="/" component={App}>
    <IndexRoute component={Movie} />
    <Route path="index" component={Movie} />
    <Route path="cinema" getComponent={Cinema} />
    <Route path="mine" getComponent={Mine} />
  </Route>
);

render(
  <Provider store={store}>
    <Router history={appHistory} routes={routes} />
  </Provider>,
  document.getElementById('init')
);