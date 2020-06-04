import React, { Component } from 'react'

import { PickerView } from 'antd-mobile'

import FilterFooter from '../../../../components/FilterFooter'



export default class FilterPicker extends Component {
  constructor(props) {
    super(props)
  }

  state = {
    value: this.props.value
  }
  render() {
    const { onCancel, onOK, data, col } = this.props
    return (
      <>
        {/* 选择器组件： */}
        <PickerView data={data} value={this.props.value} onChange={(val) => {
          this.setState({
            value: val
          })
        }} cols={col} />

        {/* 底部按钮 */}
        <FilterFooter  onCancel={onCancel} onOK={() => onOK(this.state.value)}/>
      </>
    )
  }
}
