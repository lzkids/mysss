import React from 'react'

//  import { Flex } from 'antd-mobile'
import { InfiniteLoader, List } from 'react-virtualized';
import Filter from './components/Filter'
// 导入样式
import styles from './index.module.css'



// 下拉更多
// 判断当前行
isRowLoaded ({ index }) {
  return !!list[index];
}

// 核心内容：加载更多数据和渲染列表
 loadMoreRows ({ startIndex, stopIndex }) {
  return fetch(`path/to/api?startIndex=${startIndex}&stopIndex=${stopIndex}`)
    .then(response => {
      // Store response data in list...
    })
}

export default class HouseList extends React.Component {
  state = {
    
  }
  render() {
    return (
      <div className={styles.root}>
        {/* 条件筛选栏 */}
        <Filter />
      </div>
    )
  }
}
