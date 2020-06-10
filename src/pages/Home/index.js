/**
 * Home组件
 */
import React, { Component, lazy } from 'react'
import { Route } from 'react-router-dom'
// 导入Tabar
import { TabBar } from 'antd-mobile';
// 引入样式
import './index.css'

// 重构数据结构
import tabItemDate from '../../utils/tabBarConf';
// 二级路由
// import Index from '../Index'
// import House from '../House'
// import Profile from '../Profile'

// 按需加载
const Index = lazy (() => import('../Index'))
const House = lazy (() => import('../House'))
const Profile = lazy (() => import('../Profile'))


// 渲染=》标签页组件
class Home extends Component {
    state = {
        selectedTab: this.props.location.pathname
        }
        // 渲染
        renderTabBar = () =>{
            return (
                <TabBar
                unselectedTintColor="#949494"
                tintColor="#33A3F4"
                barTintColor="white"
              >
                {
                    tabItemDate.map((item, index) => <TabBar.Item 
                    title={item.title}
                    key={index} 
                    icon={
                        <i className={`iconfont ${item.icon}`} />
                    }
                    selectedIcon={
                        <i className={`iconfont ${item.icon}`} />
                    }
                    selected={this.state.selectedTab === item.path}
                    // 点击事件
                    onPress={() => {
                        this.props.history.push(item.path)
                        this.setState({
                            selectedTab: item.path
                        })
                    }}
                    />)
                }
               
              </TabBar>
            )
        }
   render () {
      return (
          <div className='home'>
              {/*标签页二级路由*/}
              {/*默认首页*/}
              <Route exact path='/home' component={Index} />
               {/*房屋列表*/}
              <Route path="/home/house" component={House} />
               {/*个人中心*/}
              <Route path="/home/profile" component={Profile} />
               {/*组件复用*/}
               <div className='box_bar'>
                   {
                     this.renderTabBar()
                   }
                  
               </div>
          </div>
      )
   }
}

export default Home