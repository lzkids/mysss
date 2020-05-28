/**
 * 默认首页
 */
import React, { Component } from 'react'


// 导入走马灯
import { Carousel, Flex, Grid } from 'antd-mobile'

import { getSwiper } from '../../api/home'

// 引入封装的axios
import  { BASE_URL } from '../../utils/axios'

// 宫格组件：假数据
const data = Array.from(new Array(4)).map((_val, i) => ({
    icon: 'https://gw.alipayobjects.com/zos/rmsportal/nywPmnTAvTmLusPxHPSu.png',
    text: `name${i}`,
  }));
 class Index extends Component {
    state = {
        swiper: [], // 数据
        isPlay: false,
        imgHeight: 212, // 默认高度
      }
      componentDidMount() {
          this.getSwiper()
      }

    //   获取轮播图数据
    getSwiper = async () => {
        const { status, data } = await getSwiper() 
        if (status === 200) {
            this.setState({
                swiper: data
            }, () => {
                this.setState({
                    isPlay: true
                })
            })
        }
    }
      
    //   轮播图渲染
     Marqueeswiper = () => {
         return (
        <Carousel
        // 自动播放
        autoplay={this.state.isPlay}
        infinite
      >
        {this.state.swiper.map(val => (
          <a
            key={val.id}
            href="http://itcast.cn"
            style={{ display: 'inline-block', width: '100%', height: this.state.imgHeight }}
          >
            <img
              src={`${BASE_URL}${val.imgSrc}`}
              alt=""
              style={{ width: '100%', verticalAlign: 'top' }}
              onLoad={() => {
                // fire window resize event to change height
                // 触发一个自适应高度的事件
                window.dispatchEvent(new Event('resize'));
                this.setState({ imgHeight: 'auto' });
              }}
            />
          </a>
        ))}
      </Carousel>
         )
        
      }

    // 导航栏渲染
    NavigationBar = () =>{
       return (
        <Flex className='nav'>
          {/* <Flex.Item onClick={ () =>} key={id}>
          <img src={img} />
          <p>{title}</p>
          </Flex.Item> */}
        </Flex>
       )
    }
    render() {
        return (
            <div className='indexBox'>
                {/* 轮播图 */}
                {
                    this.Marqueeswiper()
                }
                 {/* 栏目导航 */}
               
                  {
                      this.NavigationBar()
                  }
                  {/* 内容 */}
                  <Grid data={data}
                    columnNum={2}
                   hasLine={false}
                   square={false}
                   renderItem={dataItem => (
                  <Flex>

                  </Flex>
         )}
       />
          </div>
        )
    }
}

export default Index