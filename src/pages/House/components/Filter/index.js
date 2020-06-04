import React, { Component } from "react";

import FilterTitle from "../FilterTitle";
import FilterPicker from "../FilterPicker";
import FilterMore from "../FilterMore";

import { getFilterData } from "../../../../api/house";

import styles from "./index.module.css";
import { getCity } from "../../../../utils/GlobalPublics";

// 初始化数据（默认数据）
const titleSelectedStatus = {
  area: false,
  mode: false,
  price: false,
  more: false,
};
// 筛选器当前选中的值（默认值）
const selectedVal = {
  area: ["area", "null"],
  mode: ["null"],
  price: ["null"],
  more: [],
};
export default class Filter extends Component {
  // 定义状态数据
  state = {
    //  筛选title状态
    titleSelectedStatus: {
      ...titleSelectedStatus,
    },
    openType: "",
  };
  // 当前选中的筛选器条件
  selectedVals = {...selectedVal}

  componentDidMount() {
    this.getFilters();
  }
  //  获取条件数据
  getFilters = async () => {
    const { value } = await getCity();
    const { status, data } = await getFilterData(value);
    if (status === 200) {
      this.filterDatas = data;
    }
  };
  //  父组件修改状态数据方法
  onTitleClick = (type) => {
    this.setState({
      titleSelectedStatus: {
        ...titleSelectedStatus,
        [type]: true,
      },
      //  当前点击title的type
      openType: type,
    });
  };
  // 控制三个过滤器内容显示
  isShowPocker = () => {
    const { openType } = this.state;
    return openType === "area" || openType === "mode" || openType === "price";
  };
  // 取消
  onOK = (selectedVal) => {
    const { openType } = this.state
      this.selectedVals[openType] = selectedVal
      this.setState({
        openType: '',
        titleSelectedStatus: this.handlerSel()
      })
  }; // 取消状态栏
  onCancel = () => {
    this.setState({
      openType: "",
      titleSelectedStatus: this.handlerSel(),
    });
  };
  // 处理筛选条件是否有选中值的高亮状态
  handlerSel = () => {
    // 新的高亮状态
    const newStatus = {};
    // 遍历存储数据
    Object.keys(this.selectedVals).forEach((item) => {
      // 获取条件数据
      const cur = this.selectedVals[item];
      //  判断是否有选中的值
      if (item === "area" && (cur[1] !== "null" || cur[0] === "subway")) {
        newStatus[item] = true;
      } else if (item === "mode" && cur[0] !== "null") {
        newStatus[item] = true;
      } else if (item === "price" && cur[0] !== "null") {
        newStatus[item] = true;
      } else if (item === "more") {
        newStatus[item] = false;
      } else {
        newStatus[item] = false;
      }
    });
    return newStatus;
  };
  // 渲染前三个筛选器的方法
  renderPicker = () => {
    if (this.isShowPocker()) {
      const { area, subway, rentType, price } = this.filterDatas;
      // 获取当前点击的openType
      const { openType } = this.state;
      // prcker的数据
      let data,
        col = 1;
      let lastSel = this.selectedVals[openType];
      // eslint-disable-next-line default-case
      switch (openType) {
        case "area":
          data = [area, subway];
          col = 3;
          break;
        case "mode":
          data = rentType;
          break;
        case "price":
          data = price;
          break;
      }
      return (
        <FilterPicker
          data={data}
          col={col}
          value={lastSel}
          onClick={this.onCancel}
          onOK={this.onOK}
        />
      );
    }
    return null
  };
 
  // 筛选第四个筛选器
renderMore = () => {
  const { openType } = this.state
  if (openType === 'more') {
    const { characteristic, oriented, roomType, floor} = this.filterDatas
    let data = {characteristic, oriented, roomType, floor}
    return (
      <FilterMore key={openType} data={data} onCancel={this.onCancel} onOK={this.onOK} />
    )
  }
}


  render() {
    return (
      <div className={styles.root}>
         {/* 前三个菜单的遮罩层 */}
        {this.isShowPocker() ? (
          <div onClick={this.onCancel} className={styles.mask} />
        ) : null}
        <div className={styles.content}>
          {/* // 标题栏 */}
          <FilterTitle
            onTitleClick={this.onTitleClick}
            titleSelectedStatus={this.state.titleSelectedStatus}
          />
          {/* // 前三个菜单对应的内容 */}
          {this.renderPicker()}
          {/* 最后一个菜单对应的内容： */}
       {
         this.renderMore()
       }
        </div>
      </div>
    );
  }
}
