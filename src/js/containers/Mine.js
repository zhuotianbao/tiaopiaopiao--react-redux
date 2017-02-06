import React, { Component } from 'react';
import { connect } from 'react-redux';

 
class Mine extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {

  }
  componentWillMount() {

  }

  render() {
    // if (this.props.isFetching) {
    //   return null;
    // }
    return (
      <div className="mine">
        <div className="mine-list">
          <a className="ticket" href="https://h5.m.taobao.com/app/mymovie/pages/mine/orders-list.html?from=def&spm=a1z2r.7661912.h5-movie-list.140&sqm=a1z2r.7661912.a1z21.3046609">我的电影票</a> 
          <a className="lottery" href="https://h5.m.taobao.com/app/mymovie/pages/mine/coupon-list.html?from=def&spm=a1z2r.7661912.h5-movie-list.140&sqm=a1z2r.7661912.a1z21.3046609">优惠券</a>
          <a className="code" href="https://h5.m.taobao.com/app/movie/pages/redeem/codelist.html?from=def&spm=a1z2r.7661912.h5-movie-list.140&sqm=a1z2r.7661912.a1z21.3046609">兑换券</a>
        </div>
        <div className="mine-list">
          <a className="helper" href="https://h5.m.taobao.com/alicare/index.html?from=tpp_tb_care&spm=a1z2r.7661912.h5-movie-list.140&sqm=a1z2r.7661912.a1z21.3046609&bu=tpp">帮助中心</a> 
        </div>
      </div>
    );
  }
};
//把state映射到container组件的props上的函数
//mapStateToProps:拿到的参数是 connect 函数交给我们的根 state，返回的对象是最终 this.props 的结构。
function mapStateToProps(state) {
  return {

  }
}

export default connect(mapStateToProps,{})(Mine);