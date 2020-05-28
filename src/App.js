import React from 'react';

// 引入路由组件
import { BrowserRouter as Router,Route, Switch, Redirect } from 'react-router-dom'

// 引入home组件
import Home from './pages/Home/index'
// 引入cityList组件
import CityList from './pages/CityList/index'
// 引入map组件
import map from './pages/Map/index'
// 引入404组件
import NotFound from './pages/NotFound'


function App() {
  return (
    <div className="App">
      {/*配置路由：一级路由*/}
      <Router>
     <Switch>
        {/*路由重定向*/}
        <Redirect exact path='/' to='/home'></Redirect>
      {/*首页*/}
      <Route path='/home' component={Home} />
      {/* 城市列表 */}
      <Route path='/cityList' component={CityList} />
      {/*地图*/}
      <Route path='/map' component={map} />
      {/*404页面*/}
      <Router component={NotFound} />
      </Switch>
      </Router>
    </div>
  );
}

export default App;
