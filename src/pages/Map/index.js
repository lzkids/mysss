/**
 * 地图组件
 */
import React, { Component } from 'react'
// 导入样式
import './index.scss'
// 导入组件
import { Icon, NavBar } from 'antd-mobile'

 class Map extends Component {

     componentDidMount(){
          this.initMap()  // 初始化地图
     }

     /**
      * 创建地图实例
      */

      initMap = () =>{
        const { BMap } = window 
        const  map = new BMap.Map("container");
        const point = new BMap.Point(116.404, 39.915); 
        map.centerAndZoom(point, 15);  
      }
     　
           
    render() {
        return (
            <div className="mapBox">
                {/* 顶部导航 */}
              <NavBar mode="dark" icon={<Icon type="left"></Icon>}
              onLeftClick={() => this.props.history.goBack()}>
                  地图导航
              </NavBar>
              {/* 地图容器 */}
              <div id="container"></div>
            </div>
        )
    }
}

export default Map
