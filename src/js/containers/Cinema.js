import React, { Component } from 'react';
import { connect } from 'react-redux';

//引入组件
import CityList from '../components/CityList.js';
import RegionList from '../components/RegionList.js';
import ItemCinema from '../components/ItemCinema.js'

//引入actions
import { showCityList,hideCityList,citySelected,fetchCityList } from '../actions/actions.js';
import { showRegionList,hideRegionList,regeonSelected,fetchRegionList } from '../actions/cinemaAction.js';

class Cinema extends Component {
  constructor(props) {
    super(props);
    //this.spliceJson = this.spliceJson.bind(this);
  }

  componentDidMount() {
    const { fetchRegionList } = this.props;
    fetchRegionList();
  }

  

  render() {
    const { cityName,regionName,cityList,cityListState,showCityList,hideCityList,citySelected,fetchCityList,showRegionList,hideRegionList,regeonSelected,cinemaList } = this.props;
    // if (this.props.isFetching) {
    //   return null;
    // }
    return (
      <div className="cinema">
        <div className="top-bar">
          <div className="city-selecter selecter"  onClick={()=>{showCityList()}}>
            <div className="city-name selectedName">{cityName}</div>
            <div className="list-arrow">
              <span></span>
            </div>
          </div>
          <div className="region-selecter selecter" onClick={()=>{showRegionList()}}>
            <div className="region-name selectedName">{regionName}</div>
            <div className="list-arrow">
              <span></span>
            </div>
          </div> 
        </div> 
        {this.props.regionListState&&
          <RegionList hideRegionList={hideRegionList} regionList={cinemaList.regionOrder} regionName={regionName} regeonSelected={regeonSelected}/>
        }
        {this.props.cityListState&&
          <CityList fetchCityList={fetchCityList} cityList={cityList} hideCityList={hideCityList} citySelected={citySelected} cityName={cityName}/>
        }
        <div className="cinema-list">
        {(!!cinemaList.regionCinemas&&regionName==='全部地区')&&
          cinemaList.regionOrder.map((t,i)=>{
            return  <div>
                    {
                      cinemaList.regionCinemas[t].map((item,index)=>{
                        return <ItemCinema item={item}/>
                      })
                    }
                    </div>
            
          })
        }
        {(!!cinemaList.regionCinemas&&regionName!=='全部地区')&&
          cinemaList.regionCinemas[regionName].map((item,index)=>{
            return <ItemCinema item={item}/>
          })
        }
        </div>
      </div>
    );
  }
};

//把state映射到container组件的props上的函数
//mapStateToProps:拿到的参数是 connect 函数交给我们的根 state，返回的对象是最终 this.props 的结构。
function mapStateToProps(state) {
  return {
    cityName:state.movie.cityName,
    cityListState:state.movie.cityListState,
    cityList:state.movie.cityList,
    regionName:state.cinema.regionName,
    cinemaList:state.cinema.cinemaList,
    regionListState:state.cinema.regionListState
  }
}

export default connect(mapStateToProps,{
  showCityList,hideCityList,citySelected,fetchCityList,showRegionList,hideRegionList,regeonSelected,fetchRegionList
})(Cinema);