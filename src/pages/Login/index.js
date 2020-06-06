import React, { Component } from 'react'
import { Flex, WingBlank, WhiteSpace, NavBar, Toast } from 'antd-mobile'

import { Link } from 'react-router-dom'

import styles from './index.module.css'
import { setLocalData, HZW_TOKEN } from '../../utils/GlobalPublics'
import { login } from '../../api/suer'

// 导入验证
import * as yup from 'yup'; 

import { withFormik } from 'formik';

// 验证规则：
const REG_UNAME = /^[a-zA-Z_\d]{5,8}$/
const REG_PWD = /^[a-zA-Z_\d]{5,12}$/     // /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,10}$/                 

class Login extends Component {
  state = {
    username: '',
    password: ''
  }
 
  render() {
    const {    
       values,
      //  touched,
       errors, 
       handleChange,
      //  handleBlur,
       handleSubmit,
      }  = this.props
      
    return (
      <div className={styles.root}>
        {/* 顶部导航 */}
        <NavBar mode="light">
          账号登录
        </NavBar>
        <WhiteSpace size="xl" />

        {/* 登录表单 */}
        <WingBlank>
          <form onSubmit={handleSubmit}>
            <div className={styles.formItem}>
              <input
                value={values.username}
                name='username'
                onChange={handleChange}
                className={styles.input}
                placeholder="请输入账号"
              />
            </div>
            {/* 长度为5到8位，只能出现数字、字母、下划线 */}
    <div className={styles.error}>{errors.username}</div>
            <div className={styles.formItem}>
              <input
                value={values.password}
                name='password'
                onChange={handleChange}
                className={styles.input}
                type="password"
                placeholder="请输入密码"
              />
            </div>
            {/* 长度为5到12位，只能出现数字、字母、下划线 */}
    <div className={styles.error}>{errors.password}</div>
            <div className={styles.formSubmit}>
              <button className={styles.submit} type="submit">
                登 录
              </button>
            </div>
          </form>
          <Flex className={styles.backHome}>
            <Flex.Item>
              <Link to="/registe">还没有账号，去注册~</Link>
            </Flex.Item>
          </Flex>
        </WingBlank>
      </div>
    )
  }
}


// 使用withForm高阶组件

const MyLogin = withFormik({
  mapPropsToValues: () => ({ username: '', password: '' }),

  // 做校验
  validationSchema: yup.object().shape({
    username: yup.string().required('帐号为必填项').matches(REG_UNAME,'数字或字母'),
    password: yup.string().required('密码为必填项').matches(REG_PWD,'只能由数字，字母组成，不能有特殊符号,并且长度限制在8-10位'),
  }),
  //  提交
  handleSubmit: async(values, { props, setValues }) => {
    const {username, password} = values 
    
    let {status, data, description} = await login({username, password})       
          if (status === 200) {        
              setLocalData(HZW_TOKEN, data.token)      

              if(props.location.backUrl) {
                props.history.replace(props.location.backUrl)
              } else {
                props.history.push('/home/profile')   
              }
            
          } else {   
              Toast.fail(description, 2)
              setValues({username: '', password: ''})
      }
    },
  displayName: 'BasicForm',
})(Login);



export default MyLogin
