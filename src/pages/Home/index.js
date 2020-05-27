/**
 * Home组件
 */
import React, { Component } from 'react'
import { Link, Route } from 'react-router-dom'
import Index from '../index'
import House from '../House'
import Profile from '../Profile'

class Home extends Component {
   render () {
      return (
          <div className='/home'>
              <Link to='/home'>首页</Link>
              <Link to='/home/house'>房屋列表</Link>
              <Link to='/home/profile'>个人中心</Link>
              {/*标签页二级路由*/}
              {/*默认首页*/}
              <Route exact path='/home/index' component={Index} />
               {/*房屋列表*/}
              <Route path="/home/house" component={House} />
               {/*个人中心*/}
              <Route path="/home/profile" component={Profile} />
          </div>
      )
   }
}

export default Home