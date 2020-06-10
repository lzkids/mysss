import React, {lazy, Suspense} from 'react';

// 引入路由组件
import { BrowserRouter as Router,Route, Switch, Redirect } from 'react-router-dom'

// 引入home组件
import Home from './pages/Home/index'

// 引入cityList组件
// import CityList from './pages/CityList/index'
// 引入map组件
// import map from './pages/Map/index'
// 引入404组件
// import NotFound from './pages/NotFound'
// 引入登录组建
// import Login from './pages/Login';
// 引入寻找房源
// import HouseDetail from './components/HouseDetail';
// 已 发布房源列表 
// import Rent from './pages/Rent';
// 发布房源搜索=》当前发布房源的小区
// import Search from './pages/Rent/Search';
// 发布房源
// import RentAdd from './pages/Rent/Add'
// 按需加载导入

const CityList = lazy (() => import('./pages/CityList'))
const map = lazy (() => import('./pages/Map/index'))
const NotFound = lazy (() => import('./pages/NotFound'))
const Login = lazy (() => import('./pages/Login'))
const HouseDetail = lazy (() => import('./components/HouseDetail'))
const Rent = lazy (() => import('./pages/Rent'))
const Search = lazy (() => import('./pages/Rent/Search'))
const RentAdd = lazy (() => import('./pages/Rent/Add'))

function App() {
  return (
    <div className="App">
      <Suspense fallback={<conter>加载。。。</conter>}>
      {/*配置路由：一级路由*/}
      <Router>
     <Switch>
        {/*路由重定向*/}
        <Redirect exact from='/' to='/home' />
      {/*首页*/}
      <Route path='/home' component={Home} />
      {/* 城市列表 */}
      <Route path='/cityList' component={CityList} />
      {/*地图*/}
      <Route path='/map' component={map} />
      {/* 登录 */}
      <Route path='/login' component={Login} />
      {/* 房源详情 */}
      <Route path='/detail/:id' component={HouseDetail} />
      {/*已 发布房源列表 */}
      <Route path='/rent' component={Rent} />
        {/* 发布房源 */}
        <Route path='/rent/add' component={RentAdd} />
         {/* 发布房源搜索=》当前发布房源的小区 */}
        <Route path='/rent/serach' component={Search} />
      {/*404页面*/}
      <Router component={NotFound} />
      </Switch>
      </Router>
      </Suspense>
    </div>
  );
}

export default App;
