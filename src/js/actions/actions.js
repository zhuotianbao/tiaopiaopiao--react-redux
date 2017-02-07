import fetch from 'isomorphic-fetch';
import { REQUEST_ISSUES, RECEIVE_ISSUES } from '../constants/ActionTypes.js';
import { TABLEFT, TABRIGHT,SHOWCITYLIST,HIDECITYLIST,RECEIVE_CITY_LIST,SELECTCITYLIST,RECEIVE_BANNER_LIST,RECEIVE_MOVIE_LIST,RECEIVE_MoreMOVIE_LIST,REQUEST_LOADING } from '../constants/constants.js';


//点击正在热映tab
export function touchTabLeft(){
  return {
    type:TABLEFT
  }
}

//点击即将上映tab
export function touchTabRight(){
  return {
    type:TABRIGHT
  }
}

//展示城市列表
export function showCityList(){
  return {
    type:SHOWCITYLIST
  }
}
//隐藏城市列表
export function hideCityList(){
  return {
    type:HIDECITYLIST
  }
}
//选择城市
export function citySelected(item){
  return {
    type:SELECTCITYLIST,
    cityName:item.regionName,
    cityCode:item.cityCode
  }
}

// 接收issues
function receiveCityList(data) {
  return {
    type: RECEIVE_CITY_LIST,
    cityList: data
  };
}
//点击获取城市列表
export function fetchCityList(){
  return dispatch => {
    //dispatch(requestIssues(filter, perPage));
    return fetch('../../data/cityList.json')
      .then(response => response.json())
      .then(data => {
        dispatch(receiveCityList(data.data.returnValue));
      }
      )
      .catch(e => {});
  };
}

// 接收issues
function receiveBannerList(data) {
  return {
    type: RECEIVE_BANNER_LIST,
    bannerList: data
  };
}
//点击获取城市列表
export function fetchBannerList(){
  return dispatch => {
    //dispatch(requestIssues(filter, perPage));
    return fetch('../../data/bannerList.json')
      .then(response => response.json())
      .then(data => {
        dispatch(receiveBannerList(data.data.returnValue));
      }
      )
      .catch(e => {});
  };
}

// 接收issues
function receiveMovieList(data) {
  return {
    type: RECEIVE_MOVIE_LIST,
    movieList: data
  };
}
//点击获取电影列表
export function fetchMovieList(type){
  let url = type == 'current'?'../../data/currentHot.json':'../../data/willFilm.json';
  return dispatch => {
    //dispatch(requestIssues(filter, perPage));
    return fetch(url)
      .then(response => response.json())
      .then(data => {
        dispatch(receiveMovieList(data.data.returnValue));
      }
      )
      .catch(e => {});
  };
}
// 请求加载中loading
function requestLoading(filter, perPage) {
  return {
    type: REQUEST_LOADING
  };
}
// 接收issues
function receiveMoreFilmList(data) {
  return {
    type: RECEIVE_MoreMOVIE_LIST,
    moreWillFilm: data
  };
}
//点击获取更多电影列表
export function fetchMoreWillFilm(){
  let url = '../../data/moreWillFilm.json';
  return dispatch => {
    //dispatch(requestIssues(filter, perPage));
    return fetch(url)
      .then(response => response.json())
      .then(data => {
        dispatch(receiveMoreFilmList(data.data.returnValue));
      }
      )
      .catch(e => {});
  };
}


// 获取issues
function requestIssues(filter, perPage) {
  return {
    type: REQUEST_ISSUES,
    filter,
    perPage
  };
}

// 接收issues
function receiveIssues(json) {
  return {
    type: RECEIVE_ISSUES,
    posts: json
  };
}

// thunk action creater
export function fetchIssues(filter, perPage) {
  return dispatch => {
    dispatch(requestIssues(filter, perPage));

    let url = 'https://api.github.com/repos/${CONFIG.owner}/${CONFIG.repo}/issues',
        href = 'https://github.com/${CONFIG.owner}/${CONFIG.repo}/issues';
    // 添加参数
    url += '?fliter=${filter}&per_page=${perPage}';

    return fetch(url)
      .then(response => response.json())
      .then(json => {
        dispatch(receiveIssues(json));
      }
      )
      .catch(e => {
        window.location.href = href;
      });
  };
}

function shouldFetchIssues(state) {
  if (!state) {
    return true;
  }

  return !state.items.length;
}

// 按需获取issues
export function fetchIssuesIfNeeded(filter, perPage) {
  // 当已经有issues的时候，则减少网络请求
  return function(dispatch, getState) {
    if ( shouldFetchIssues(getState()) ) {
      // 在 thunk 里 dispatch 另一个 thunk！
      return dispatch(fetchIssues(filter, perPage));
    } else {
      // 告诉调用代码不需要再等待。
      return Promise.resolve();
    }
  };
}












