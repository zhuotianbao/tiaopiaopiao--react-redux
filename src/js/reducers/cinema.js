// 引入action类型常量名
import { HIDERIGIONLIST,SHOWRIGIONLIST,SELECTRIGIONLIST,RECEIVE_RIGION_LIST } from '../constants/constants.js' 

// 初始化state数据
const initialState = {
    regionName: '全部地区',
    regionListState:false,
    cinemaList:{}
}

// 通过dispatch action进入
export default function cinema(state = initialState, action) {
    // 根据不同的action type进行state的更新
    switch(action.type) {
        case HIDERIGIONLIST:
            return Object.assign({}, state, { regionListState : false })
            break
        case SHOWRIGIONLIST:
            return Object.assign({}, state, { regionListState : true })
            break
        case SELECTRIGIONLIST:
            return Object.assign({}, state, { regionName : action.regionName })
            break
        case RECEIVE_RIGION_LIST:
            return Object.assign({}, state, { cinemaList : action.cinemaList })
            break
        default:
            return state
    }
}