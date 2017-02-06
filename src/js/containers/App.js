import React, { Component } from 'react';
import { Link } from 'react-router' // 引入Link处理导航跳转

// Container作用: 1. 获取store中的数据; 2.将dispatch与actionCreator结合起来
//Contaier 作为 业务组件 components的高阶组件 ，负责把 Provider 赋予它的 store 通过 store.getState() 获取数据，转而赋值给 state 。然后又根据我们定义的 mapStateToProps 函数按一定的结构将 state 对接到 props 上
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state={

    }
  }

  componentDidMount() {
    
  }

  render() {
    return (
      <div style={{width:'100%',height:'100%'}}>
        <div style={{width:'100%',height:'100%'}}>
          {this.props.children}
        </div>
        <div className="bottom-nav">
          <Link to="/index" className="movie" activeClassName="active">
            <i className="icon"></i>
            <p>电影</p>
          </Link>
          <Link to="/cinema" className="cinema" activeClassName="active">
            <i className="icon"></i>
            <p>影院</p>
          </Link>
          <Link to="/mine" className="mine" activeClassName="active">
            <i className="icon"></i>
            <p>我的</p>
          </Link>
        </div>
      </div>
    );
  }
};

