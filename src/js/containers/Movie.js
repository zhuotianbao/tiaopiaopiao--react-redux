import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router'

//引入组件
import CityList from '../components/CityList.js';
import Banner from '../components/banner.js';
import ItemFilm from '../components/ItemFilm.js';

//引入actions
import { touchTabLeft,touchTabRight,showCityList,fetchCityList,hideCityList,citySelected,fetchBannerList,fetchMovieList,fetchIssuesIfNeeded,fetchMoreWillFilm } from '../actions/actions.js';

class Movie extends Component {
  constructor(props) {
    super(props);
    //this.spliceJson = this.spliceJson.bind(this);
  }

  componentDidMount() {
    const { dispatch } = this.props;
    //dispatch(fetchIssuesIfNeeded('created', 10000));
  }
  componentWillMount(){
    const { fetchBannerList,fetchMovieList } = this.props;
    fetchBannerList();
    fetchMovieList('current');
  }
  //时间格式转换去判断是否上映还是即将上映的
  dataContrast(uData){
    let timeFilm = new Date(uData).getTime();
    let timeNow = new Date().getTime();
    return timeFilm<=timeNow?true:false;//如果上映时间小于当前时间返回true
  }
  //时间格式xx-xx 下周上映
  dataForm(time){
    let week = '';
    if(time.length==7){
      return week="待定";
    }
    let myDate = new Date(time);
    let weekNum = myDate.getDay();
    switch(weekNum){
      case 0: week="周日";break;
      case 1: week="周一";break;
      case 2: week="周二";break;
      case 3: week="周三";break;
      case 4: week="周四";break;
      case 5: week="周五";break;
      case 6: week="周六";break;
    }
    return week
  }

  render() {
    const { movieList,tabLeft,cityName,cityCode,cityListState,cityList,bannerList,touchTabLeft,touchTabRight,showCityList,fetchCityList,hideCityList,citySelected,fetchMovieList,fetchMoreWillFilm } = this.props;
    // if (this.props.isFetching) {
    //   return null;
    // }
    let date = [];
    movieList.map((t,i)=>{
      if (date.indexOf(t.openTime) == -1)
      date.push(t.openTime);
    })
    return (
      <div className="movie">
        <div className="top-nav">
          <div className="adress-city" onClick={()=>{showCityList()}}>
            <div className="city-name">{cityName}</div>
            <div className="list-arrow">
              <span></span>
            </div>
          </div>
          <div className="movie-tab">
            <ul>
              <li onClick={()=>{touchTabLeft();fetchMovieList('current');}}>
                {!!tabLeft&&
                  <div>
                    <div to="" className="tab-name" style={{color:'#ff4d64'}}>正在热映</div>
                    <p style={{transition:'transform 0.7s',transform:'translateX(0px)'}}></p>
                  </div>
                }
                {!this.props.tabLeft&&
                  <div to="" className="tab-name">正在热映</div>
                }
              </li>
              <li onClick={()=>{touchTabRight();fetchMovieList('will');}}>
                {!tabLeft&&
                  <div>
                    <div to="" className="tab-name" style={{color:'#ff4d64'}}>即将上映</div>
                    <p style={{transition:'transform 0.7s',transform:'translateX(0px)'}}></p>
                  </div>
                }
                {!!this.props.tabLeft&&
                  <div to="" className="tab-name">即将上映</div>
                }
              </li>
            </ul>
          </div>
        </div>
        <div className="content">
        {tabLeft&&
          <div className="currentHot">
            {(!!bannerList.length&&tabLeft)&&
              <Banner imgList={bannerList} duration="3000"/>
            }
            <div className="movieList">
            {!!movieList.length&&
              movieList.map((item,index)=>{
                return  <ItemFilm item={item} type="hot" cityName={cityName} cityCode={cityCode}/>
              })
            }
            </div>
          </div>
        }
        {!tabLeft&&
          <div className="willFilm">
            <div className="movieList">
            {!!movieList.length&&
              date.map((t,i)=>{
                return <div>
                          <div className="list-header">{t} {this.dataForm(t)}</div>
                          {
                            movieList.map((item,index)=>{
                              if(item.openTime === t){
                                return <ItemFilm item={item} type="will"/>
                              }   
                            })
                          }
                        </div>
              })
            }
            </div>
            <div className="more-content" onClick={()=>{fetchMoreWillFilm();}}>
            {this.props.loading&&
              <span className="loading">加载中...</span>
            }
            {this.props.moreData&&
              <span className="">点击查看更多</span>
            }
            </div>
          </div>
        }
          
        </div>
        <div className="whitespace"></div>
        {this.props.cityListState&&
          <CityList fetchCityList={fetchCityList} cityList={cityList} hideCityList={hideCityList} citySelected={citySelected} cityName={cityName}/>
        }
      </div>
    );
  }
};

//把state映射到container组件的props上的函数
//mapStateToProps:拿到的参数是 connect 函数交给我们的根 state，返回的对象是最终 this.props 的结构。
function mapStateToProps(state) {
  return {
    tabLeft:state.movie.tabLeft,
    cityName:state.movie.cityName,
    cityCode:state.movie.cityCode,
    cityListState:state.movie.cityListState,
    cityList:state.movie.cityList,
    bannerList:state.movie.bannerList,
    movieList:state.movie.movieList,
    loading:state.movie.loading,
    moreData:state.movie.moreData
  }
}

export default connect(mapStateToProps,
{
  touchTabLeft,touchTabRight,showCityList,fetchCityList,hideCityList,citySelected,fetchBannerList,fetchMovieList,fetchMoreWillFilm
}
)(Movie);