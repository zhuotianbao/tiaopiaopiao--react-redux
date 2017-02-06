import fetch from 'isomorphic-fetch';
import { REQUEST_ISSUES, RECEIVE_ISSUES } from '../constants/ActionTypes.js';
import { SHOWRIGIONLIST,HIDERIGIONLIST,SELECTRIGIONLIST,RECEIVE_RIGION_LIST } from '../constants/constants.js';


//展示区域列表
export function showRegionList(){
  return {
    type:SHOWRIGIONLIST
  }
}
//隐藏区域列表
export function hideRegionList(){
  return {
    type:HIDERIGIONLIST
  }
}
//选择区域
export function regeonSelected(item){
  return {
    type:SELECTRIGIONLIST,
    regionName:item
  }
}

// 接收issues
function receiveRegionList(data) {
  return {
    type: RECEIVE_RIGION_LIST,
    cinemaList: data
  };
}
//点击获取区域列表
export function fetchRegionList(){
  return dispatch => {
    //dispatch(requestIssues(filter, perPage));
    return fetch('../../data/cinema.json')
      .then(response => response.json())
      .then(data => {
        dispatch(receiveRegionList(data.data.returnValue));
      }
      )
      .catch(e => {});
  };
}














