import React, { Component } from 'react';
import { Link } from 'react-router';

export default class ItemFilm extends Component {
  constructor(props) {
    super(props);
    //this.selectCity = this.selectCity.bind(this);
  }
  componentWillMount() {
  	
  }
  componentDidMount() {

  }
  //时间格式转换去判断是否上映还是即将上映的
  dataContrast(uData){
    let timeFilm = new Date(uData).getTime();
    let timeNow = new Date().getTime();
    return timeFilm<=timeNow?true:false;//如果上映时间小于当前时间返回true
  }
  //时间格式xx-xx 下周上映
  dataForm(time){
    let myDate = new Date(time);
    let month = myDate.getMonth() + 1;
    let day = myDate.getDate();
    let weekNum = myDate.getDay();
    let week = '';
    switch(weekNum){
      case 0: week="周日";break;
      case 1: week="周一";break;
      case 2: week="周二";break;
      case 3: week="周三";break;
      case 4: week="周四";break;
      case 5: week="周五";break;
      case 6: week="周六";break;
    }
    month = parseInt(month)<10?'0'+month:month;
    day = parseInt(day)<10?'0'+day:day;
    return month + '-' + day + ' ' + week + '上映'
  }
  render() {
  	// if(!!this.isFetch){
  	// 	return;
  	// }
    const { item,type,cityName,cityCode } = this.props;
    return (
      <div className="itemFilm">
        <div className="list-item">
          <div className="list-thumb">
            <img className="play-icon" src="http://gw.alicdn.com/tps/TB1PH2uLXXXXXaLaXXXXXXXXXXX-60-60.png"/>
            <img className="show-pic" src={"https://gw.alicdn.com/"+item.poster}/>
          </div>
          <div className="rightBlock">
          {(this.dataContrast(item.openDay))&&
            <a className="right-btn-red right-btn" href={"https://h5.m.taobao.com/app/movie/pages/index/cinema-list.html?from=def&spm=a1z2r.7661913.h5_movie_order.5&sqm=a1z2r.7661912.a1z21.3046609&showid="+item.id+"&showname="+item.showName+"&citycode="+cityCode+"&cityname="+cityName+"&env=m&bottomtab=hide"}>购票</a> 
          }
          {(!this.dataContrast(item.openDay))&&
            <a className="right-btn-blue right-btn" href={"https://h5.m.taobao.com/app/movie/pages/index/cinema-list.html?from=def&spm=a1z2r.7661913.h5_movie_order.5&sqm=a1z2r.7661912.a1z21.3046609&showid="+item.id+"&showname="+item.showName+"&citycode="+cityCode+"&cityname="+cityName+"&env=m&bottomtab=hide"}>预售</a> 
          }
          </div>
          <a className="list-content" href={"https://h5.m.taobao.com/app/movie/pages/index/show-detail.html?from=def&spm=a1z2r.7661913.h5_movie_order.5&sqm=a1z2r.7661912.a1z21.3046609&showid="+item.id+"&showname="+item.showName+"&citycode="+cityCode+"&cityname="+cityName+"&env=m&bottomtab=hide"}>
            <div className="list-title">
              <span className="show-name">{item.showName}</span>
              <span className={"type-"+item.showMark}></span> 
            </div>
            {(this.dataContrast(item.openDay))&&
            <div className="list-brief">
              <div className="film-star">
                <div className="start-ranking">
                  <div className="star-ranking-light" style={{width:item.remark*10+"%"}}></div> 
                </div>
                <div className="start-remark">{item.remark}</div>
              </div>
            </div>
            }
            {(!this.dataContrast(item.openDay)&&type=='hot')&&
            <div className="list-brief">
              <span className="orange">{item.wantCount}人想看</span> 
              <span className="split">|</span> 
              {this.dataForm(item.openDay)}
            </div>
            }
            {(!this.dataContrast(item.openDay)&&type=='will')&&
            <div className="list-brief">
              <span className="orange">{item.wantCount}人想看</span> 
            </div>
            }
            <div className="list-brief">导演：{item.director}</div>
            <div className="list-brief">主演：{item.leadingRole}</div>
          </a>
        </div>
        {!!item.activities&&
        <div className="list-item list-item-activity">
          <div className="list-thumb list-thumb-activity"></div>
          <Link className="list-content" to="">
            <div className="list-brief">
              <span className="orange">{item.activities[0].activityTag}</span> 
              <span className="split">|</span> 
              {item.activities[0].activityTitle}
            </div>
          </Link>
        </div>
        } 
      </div>
    );
  }
};