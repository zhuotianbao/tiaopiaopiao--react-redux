// 引入action类型常量名
import { TABLEFT, TABRIGHT ,SHOWCITYLIST ,HIDECITYLIST,RECEIVE_CITY_LIST,SELECTCITYLIST,RECEIVE_BANNER_LIST,RECEIVE_MOVIE_LIST,RECEIVE_MoreMOVIE_LIST,REQUEST_LOADING } from '../constants/constants.js' 

// 初始化state数据
const initialState = {
    tabLeft: true,
    cityListState:false,
    cityName: '北京',
    cityCode:'110100',
    cityList: [],
    bannerList: [],
    movieList:[],
    moreData:true,
    loading:false
}

// 通过dispatch action进入
export default function movie(state = initialState, action) {
    // 根据不同的action type进行state的更新
    switch(action.type) {
        case TABLEFT:
            return Object.assign({}, state, { tabLeft : true })
            break
        case TABRIGHT:
            return Object.assign({}, state, { tabLeft : false })
            break
        case SHOWCITYLIST:
            return Object.assign({}, state, { cityListState : true })
            break
        case HIDECITYLIST:
            return Object.assign({}, state, { cityListState : false })
            break
        case RECEIVE_CITY_LIST:
            return Object.assign({}, state, { cityList : action.cityList })
            break
        case SELECTCITYLIST:
            return Object.assign({}, state, { cityName : action.cityName,cityCode:action.cityCode })
            break
        case RECEIVE_BANNER_LIST:
            return Object.assign({}, state, { bannerList : action.bannerList })
            break
        case RECEIVE_MOVIE_LIST:
            return Object.assign({}, state, { movieList : action.movieList })
            break
        case RECEIVE_MoreMOVIE_LIST:
            return Object.assign({}, state, { movieList : [...state.movieList,...action.moreWillFilm],moreData:true,loading:false })
            break
        case REQUEST_LOADING:
            return Object.assign({}, state, { moreData:false,loading:true })
            break
        default:
            return state
    }
}