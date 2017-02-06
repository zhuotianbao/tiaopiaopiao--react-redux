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
  render() {
  	// if(!!this.isFetch){
  	// 	return;
  	// }
    const { item } = this.props;
    return (
      <div className="itemCinema">
        <a target="_blank" href={"https://h5.m.taobao.com/app/movie/pages/index/show-list.html?from=def&spm=a1z2r.7661912.h5-movie-list.140&sqm=a1z2r.7661912.a1z21.3046609&cinemaid="+item.id+"&cinemaname="+encodeURIComponent(item.cinemaName)}>
          <h3>{item.cinemaName}</h3>  
          <div className="location">{item.address}</div>
          <div className="item-status ">
            <span className="item-price">12.8 <span style={{fontSize:'12px'}}>元起</span></span>
            {!!item.activities&&
              item.activities.map((t,i)=>{
                if(t.isActivityVisible==='true'){
                  return <span className="label-mod label-orange">{t.activityTag}</span> 
                }
              }) 
            }
            {!!item.showMark&&
              <span className="label-mod label-border-grey">{item.showMark}</span>
            }   
          </div> 
        </a>
      </div>
    );
  }
};