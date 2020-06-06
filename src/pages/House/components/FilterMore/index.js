import React, { Component } from 'react'

import FilterFooter from '../../../../components/FilterFooter'

import styles from './index.module.css'

export default class FilterMore extends Component {
  
//  设置状态数据
state = {
  selected: this.props.value
}

// 储存选中的条件：删除/添加
handlerSel = (item) => {
  const { selected } = this.state;
  const newSelected = [...selected];
  let index = newSelected.indexOf(item.value);
  if(index > -1) {
    // 删除
    newSelected.splice(index, 1)
  } else {
    // 添加
    newSelected.push(item.value)
  }
    // 作响式
    this.setState({
      selected: newSelected
    })   
}

  // 渲染标签
  renderFilters(data) {
    // 高亮类名： styles.tagActive
    return data.map((item) => <span onClick={()=>this.handlerSel(item)} key={item.value} className={[styles.tag,this.state.selected.includes(item.value)?styles.tagActive:''].join(' ')}> 
    {item.label}</span>) 
  
  }

  render() {
    const {onCancel, onOK, data} = this.props;
    return (
      <div className={styles.root}>
        {/* 遮罩层 */}
        <div className={styles.mask} onClick={onCancel} />

        {/* 条件内容 */}
        <div className={styles.tags}>
          <dl className={styles.dl}>
            <dt className={styles.dt}>户型</dt>
            <dd className={styles.dd}>{this.renderFilters(data.roomType)}</dd>

            <dt className={styles.dt}>朝向</dt>
            <dd className={styles.dd}>{this.renderFilters(data.oriented)}</dd>

            <dt className={styles.dt}>楼层</dt>
            <dd className={styles.dd}>{this.renderFilters(data.floor)}</dd>

            <dt className={styles.dt}>房屋亮点</dt>
            <dd className={styles.dd}>{this.renderFilters(data.characteristic)}</dd>
          </dl>
        </div>

        {/* 底部按钮 */}
        <FilterFooter className={styles.footer} onCancel={onCancel} onOK={()=> onOK(this.state.selected)}  />
      </div>
    )
  }
}
