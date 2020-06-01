/**
 * 房屋列表
 */
import React, { Component } from "react";
import { getCityList, getHotCity } from "../../api/city";
import { getCity, setLocalData, CURR_CITY } from "../../utils/GlobalPublics";

// 导入列表组件
import { List, AutoSizer } from "react-virtualized";
// 导入组件样式
import "./index.scss";
import { NavBar, Icon, Toast } from "antd-mobile";

class CityList extends Component {
  // 定义渲染数据
  state = {
    // 列表归类的类别
    cityIndex: [],
    // 归类的数据
    cityList: {},
  };

  componentDidMount() {
    this.getCityData();
  }

  //  城市所有数据
  getCityData = async () => {
    const { status, data } = await getCityList();
    if (status === 200) {
      const { cityList, cityIndex } = this.formatCities(data);

      //   获取热门城市数据
      const { status: st, data: dt } = await getHotCity();
      if (st === 200) {
        cityList["hot"] = dt;
        cityIndex.unshift("hot");
      }
      //    获取当前城市
      let city = await getCity();
      //   数据解构一直
      cityIndex.unshift("#");
      cityList["#"] = [city];
      this.setState({
        cityList,
        cityIndex,
      });
    }
  };

  // 处理后台数据
  formatCities = (data) => {
    let cityList = {},
      cityIndex = []; // 存储首字母数据
    data.forEach((item) => {
      // 归类：城市首字母
      let firstLetter = item.short.slice(0, 1);
      //  判断首字母是否存在
      if (!cityList[firstLetter]) {
        //   没有就新增
        cityList[firstLetter] = [item];
      } else {
        //   存在
        cityList[firstLetter].push(item);
      }
    });

    //  类别数组（所有城市拼音首字母）
    cityIndex = Object.keys(cityList).sort();
    // 渲染数据
    return {
      cityList,
      cityIndex,
    };
  };
  //   格式化title现实
  rowFormtitle = (title, isRigeht) => {
    switch (title) {
      case "#":
        return isRigeht ? "当" : "当前城市";
      case "hot":
        return isRigeht ? "热" : "热门城市";
      default:
        return title.toUpperCase();
    }
  };
  //   切换定位城市事件函数
  selCity = (item) => {
    const hasData = ["北京", "上海", "广州", "深圳"];
    if (hasData.includes(item.label)) {
      // 存在更新数据
      setLocalData(CURR_CITY, JSON.stringify(item));
      // 返回首页
      this.props.history.goBack();
    } else {
      // 不存在
      Toast.fail("该城市暂无房源数据！！！", 2);
    }
  };
  // 每行渲染的模板
  rowRenderer = ({
    key, // Unique key within array of rows
    index, // Index of row within collection
    isScrolling, // The List is currently being scrolled
    isVisible, // This row is visible within the List (eg it is not an overscanned row)
    style, // Style object to be applied to row (to position it)
  }) => {
    //    获取归类的数据，并渲染
    const { cityIndex, cityList } = this.state;
    // 列表下归类：title
    const title = cityIndex[index];
    // 对应title下的城市数据
    const titleCity = cityList[title];
    // row模板
    return (
      <div key={key} style={style} className="city-item">
        <div className="title">{this.rowFormtitle(title)}</div>
        {/* 归类城市小列表 */}
        {
          // titleCity.map((item) => (
          //   <div onClick={() =>} key={item.title} className="name">
          //     {item.label}
          //   </div>
          // ))
          titleCity.map((item) => (
            <div
              onClick={() => this.selCity(item)}
              key={item.value}
              className="name"
            >
              {item.label}
            </div>
          ))
        }
      </div>
    );
  };
  //   动态计算row属性
  /**
   * index:列表当前行的索引
   */
  execHight = ({ index }) => {
    //   获取归类数据
    const { cityIndex, cityList } = this.state;
    //  归类新爱title
    const title = cityIndex[index];
    // 对应title下的城市数据
    const titleCity = cityList[title];
    return 36 + 50 * titleCity.length;
  };
                                        
  render() {
    return (
      <div className="ListBox">
        {/* 顶部栏 */}
        <NavBar
          mode="dark"
          icon={<Icon type="left" />}
          onLeftClick={() => this.props.history.goBack()}
        >
          城市选择
        </NavBar>
        <AutoSizer>
          {/* 城市列表 */}
          {({ height, width }) => (
            <List
             // ref={(ele) => }
              className="listBox"
              width={width}
              height={height}
              rowCount={this.state.cityIndex.length}
              rowHeight={this.execHight}
              rowRenderer={this.rowRenderer}
            />
          )}
        </AutoSizer>
      </div>
    );
  }
}

export default CityList;
