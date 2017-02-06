import React, { Component } from 'react';

import '../../css/regionList.less'

export default class RegionList extends Component {
  constructor(props) {
    super(props);
    //this.selectCity = this.selectCity.bind(this);
  }
  componentWillMount() {
  	//this.props.fetchCityList();
  }
  componentDidMount() {

  }
  selectRegion(item){
  	this.props.regeonSelected(item);
  	this.props.hideRegionList();
  }
  render() {
  	// if(!!this.isFetch){
  	// 	return;
  	// }
    return (
      <div className="regionLayer">
        <div className="regionList">
        {this.props.regionName==='全部地区'&&
          <div className="region-item active" onClick={this.selectRegion.bind(this,'全部地区')}>全部地区</div> 
        }
        {this.props.regionName!=='全部地区'&&
          <div className="region-item" onClick={this.selectRegion.bind(this,'全部地区')}>全部地区</div> 
        }
        {!!this.props.regionList&&
          this.props.regionList.map((item,index)=>{
            if(item === this.props.regionName){
              return <div className="region-item active" onClick={this.selectRegion.bind(this,item)}>{item}</div>
            }else{
              return <div className="region-item" onClick={this.selectRegion.bind(this,item)}>{item}</div> 
            }
          })
        }
        </div> 
      </div>
    );
  }
};