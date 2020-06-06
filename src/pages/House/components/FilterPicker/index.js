import React, { Component } from 'react'

import { PickerView } from 'antd-mobile'

import FilterFooter from '../../../../components/FilterFooter'



export default class FilterPicker extends Component {
  // eslint-disable-next-line no-useless-constructor
  constructor(props) {
    super(props)
  }

   s = this.props.valie

  state = {
    value: this.props.value
  }
componentWillUnmount = () => {
  this.setState = (state, callback) => {
    return
  }
}
  

  render() {
    const { onCancel, onOK, data, col } = this.props
    return (
      <>
        {/* 选择器组件： */}
        <PickerView data={data} value={this.state.value} onChange={(val) => {
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
