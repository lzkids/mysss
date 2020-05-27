import React from 'react';

// 引入路由组件
import { BrowserRouter as Router,Route,Link, Switch, Redirect} from 'react-router-dom'

// 引入home组件
import Home from './pages/Home/index'
// 引入cityList组件
import cityList from './pages/CityList/index'
// 引入map组件
import map from './pages/Map/index'
// 引入404组件
import NotFound from './pages/NotFound'

function App() {
  return (
    <div className="App">
      {/*配置路由：一级路由*/}
      <Router>
      <div className='nav'>
     <Link to='/home'>home</Link>
     <Link to='/cityList'>cityList</Link>
     <Link to='/map'>map</Link>
      </div>
     <Switch>
        {/*路由重定向*/}
        <Redirect exact path='/' render={() => <Redirect to='/home'></Redirect>}></Redirect>
      {/*首页*/}
      <Route path='/home' component={Home} />
      <Route path='/cityList' component={cityList} />
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
