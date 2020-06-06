import React from 'react'

//  import { Flex } from 'antd-mobile'
import { InfiniteLoader, List, AutoSizer } from 'react-virtualized';
import Filter from './components/Filter'
// 导入样式
import styles from './index.module.css'
import { getCity } from '../../utils/GlobalPublics';
import { getListByFilters } from '../../api/house';
import { Toast } from 'antd-mobile';
import { BASE_URL } from '../../utils/axios';
import HouseItem from '../../components/HouseItem';
import NoHouse from '../../components/NoHouse';



// // 核心内容：加载更多数据和渲染列表
//  loadMoreRows ({ startIndex, stopIndex }) {
//   return fetch(`path/to/api?startIndex=${startIndex}&stopIndex=${stopIndex}`)
//     .then(response => {
//       // Store response data in list...
//     })
// }

export default class HouseList extends React.Component {
  state = {
    list: [],
    count: 0
 }

async componentDidMount() {
  let { value } = await getCity();
  this.cityId = value;
  this.getHouseList()
}

onFilter = (filters) => {
      this.filters = filters
      this.getHouseList()
}

getHouseList = async () => {
  const {status, data: { list, count }} = await getListByFilters(this.cityId, this.Filters);

  if (status === 200) {
    if (count > 0) {
      Toast.success(`成功获取到${count}房源数据！`, 2)
    }

    this.setState({
      list,
      count
    })
  }

}
    // 渲染每行模板
    rowRenderer = ({
      index, // Index of row
      isScrolling, // The List is currently being scrolled
      isVisible, // This row is visible within the List (eg it is not an overscanned row)
      key, // Unique key within array of rendered rows
      parent, // Reference to the parent List (instance)
      style, // Style object to be applied to row (to position it);
      // This must be passed through to the rendered row element.
    }) => {
      const {list} = this.state;
      const item = list[index];

      if(!item) {
        return (
          <div key={key} style={style}>
           <p className={styles.loading}></p>
        </div>
        )
      }
    
  
    item.src = `${BASE_URL}${item.houseImg}`
      // Style is required since it specifies how the row is to be sized and positioned.
      // React Virtualized depends on this sizing/positioning for proper scrolling behavior.
      // By default, the List component provides following style properties:
      //    position
      //    left
      //    top
      //    height
      //    width
      // You can add additional class names or style properties as you would like.
      // Key is also required by React to more efficiently manage the array of rows.
      // row模板
      return (
        <HouseItem onClick={() => {
    //  跳转详情
       this.props.history.push({ pathname: `/detail/${item.houseCode}`, data: {a: [1123]}, res: 10000})

        }} {...item} key={key} style={style} />
      );
    }

    // 下拉更多
// 判断当前行
isRowLoaded = ({ index }) => {
  const { list } = this.state
  return !!list[index];
}

// 加载更多数据和渲染列表
loadMoreRows = ({ startIndex, stopIndex }) => {
  return getListByFilters(this.cityId, this.filters, startIndex, stopIndex).then(({status, data: { list, count } }) => {
    //  响应式
    if(status === 200 ) {
      this.setState({
        count,
        list: [...this.state.list, ...list]
      })
    }
  })
}

// 渲染房源列表
renderHouseList = () => {
  const {count} = this.state;
  return count > 0 ? <InfiniteLoader isRowLoaded={this.isRowLoaded}
      loadMoreRows={this.loadMoreRows}
      rowCount={this.state.count}
  >
  {({onRowsRendered, registerChild}) => (
    <AutoSizer>
       {({height, width}) => (
         <List 
          className={styles.houseList}
          width={width}
          height={height}
          onRowsRendered={onRowsRendered}
          ref={registerChild}
          rowCount={this.state.count}
          rowHeight={130}
          rowRenderer={this.rowRenderer}
         />
       )}
    </AutoSizer>
  )}
  </InfiniteLoader> : <NoHouse>暂无数据</NoHouse>
}
  render() {
    return (
      <div className={styles.root}>
        {/* 条件筛选栏 */}
        <Filter onFilter={this.onFilter} />
      {/* 城市列表 */}
      {
        this.renderHouseList()
      }
      </div>
    )
  }
}
