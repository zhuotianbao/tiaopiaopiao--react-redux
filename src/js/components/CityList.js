import React, { Component } from 'react';

import '../../css/cityList.less'

export default class CityList extends Component {
  constructor(props) {
    super(props);
    //this.selectCity = this.selectCity.bind(this);
  }
  componentWillMount() {
  	this.props.fetchCityList();
  }
  componentDidMount() {

  }
  selectCity(item){
  	this.props.citySelected(item);
  	this.props.hideCityList();
  }
  render() {
  	// if(!!this.isFetch){
  	// 	return;
  	// }
    return (
      <div className="cityLayer">
        <div className="city-title">选择城市
        	<span className="closeCity" onClick={()=>{this.props.hideCityList()}}>×</span>	
        </div>
        <div className="city-list">
        	<div className="city-category" id="当前">
        		<h3>当前</h3>
        		<ul>
					<li onClick={()=>{this.props.hideCityList()}}>{this.props.cityName}</li>
        		</ul>
        	</div>
        	<div className="city-category" id="GPS">
        		<h3>GPS</h3>
        		<ul>
					<li>定位中...</li>
        		</ul>
        	</div>
        	{
        		Object.keys(this.props.cityList).map((t,i)=>{
        			return  <div className="city-category" id={t}>
				        		<h3>{t}</h3>
				        		<ul>
				        			{
        								this.props.cityList[t].map((item,index)=>{
        									return <li key={item.cityCode} onClick={this.selectCity.bind(this,item)} >{item.regionName}</li>
        								})
				        			}
				        		</ul>
				        	</div>
        		})
        	}
        </div>
        <div className="city-index">
        	<ul>
        		<li>
        			<a href="#当前">当前</a>
        		</li>
        		{
        			Object.keys(this.props.cityList).map((t,i)=>{
        				return <li>
        					<a href={'#'+t}>{t}</a>
        				</li>
        			})	
        		}
        	</ul>
        </div>
      </div>
    );
  }
};