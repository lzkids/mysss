/**
 * 默认首页
 */
import React, { Component } from "react";

// 导入走马灯
import { Carousel, Flex, Grid, WingBlank } from "antd-mobile";

import { getSwiper, getGroup, getNews } from "../../api/home";

// 引入封装的axios
import { BASE_URL } from "../../utils/axios";
// 导入样式
import "./index.scss";
// 导入数据
import Navs from "../../utils/NavigationBar";

class Index extends Component {
  state = {
    swiper: [], // 数据
    group: [], // 租房小屋数据
    news: [],
    isPlay: false,
    imgHeight: 212, // 默认高度
  };
  componentDidMount() {
    this.getSwiper();
    this.getGroup();
    this.getNews();
  }

  //   获取轮播图数据(√)
  getSwiper = async () => {
    const { status, data } = await getSwiper();
    if (status === 200) {
      this.setState(
        {
          swiper: data,
        },
        () => {
          this.setState({
            isPlay: true,
          });
        }
      );
    }
  };
  //   获取租房小租数据
  getGroup = async () => {
    const { status, data } = await getGroup();
    if (status === 200) {
      this.setState({
        group: data,
      });
    }
  };
  // 获取新闻
  getNews = async () => {
    const { status, data } = await getNews();
    if (status === 200) {
      this.setState({
        news: data,
      });
    }
  };

  //   轮播图渲染(√)
  Marqueeswiper = () => {
    return (
      <Carousel
        // 自动播放
        autoplay={this.state.isPlay}
        infinite
      >
        {this.state.swiper.map((val) => (
          <a
            key={val.id}
            href="http://itcast.cn"
            style={{
              display: "inline-block",
              width: "100%",
              height: this.state.imgHeight,
            }}
          >
            <img
              src={`${BASE_URL}${val.imgSrc}`}
              alt=""
              style={{ width: "100%", verticalAlign: "top" }}
              onLoad={() => {
                // fire window resize event to change height
                // 触发一个自适应高度的事件
                window.dispatchEvent(new Event("resize"));
                this.setState({ imgHeight: "auto" });
              }}
            />
          </a>
        ))}
      </Carousel>
    );
  };

  // 导航栏渲染(√)
  NavigationBar = () => {
    return (
      <Flex className="nav">
        {Navs.map((item, index) => (
          <Flex.Item
            onClick={() => {
              this.props.history.push(item.path);
            }}
            key={index}
          >
            <img src={item.img} alt="" />
            <p>{item.name}</p>
          </Flex.Item>
        ))}
      </Flex>
    );
  };

  // 租房小租渲染
  ContentSets = () => {
    return (
      <div className="group">
        {/* title */}
        <Flex className="group-title" justify="between">
          <h3>房租小组</h3>
          <span>更多</span>
        </Flex>

        {/* 九宫格 */}
        <Grid
          data={this.state.group}
          columnNum={2}
          hasLine={false}
          square={false}
          renderItem={(item) => (
            <Flex className="grid-item" justify="between">
              <div className="desc">
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
              <img src={`${BASE_URL}${item.imgSrc}`} alt="" />
            </Flex>
          )}
        />
      </div>
    );
  };

  // 渲染新闻
  renderNews() {
    return this.state.news.map(item => (
      <div className="news-item" key={item.id}>
        <div className="imgwrap">
          <img className="img" src={`${BASE_URL}${item.imgSrc}`} alt="" />
        </div>
        <Flex className="content" direction="column" justify="between">
          <h3 className="title">{item.title}</h3>
          <Flex className="info" justify="between">
            <span>{item.from}</span>
            <span>{item.date}</span>
          </Flex>
        </Flex>
      </div>
    ));
  }
  render() {
    return (
      <div className="indexBox">
        {/* 轮播图 */}
        {this.Marqueeswiper()}
        {/* 栏目导航 */}

        {this.NavigationBar()}
        {/* 内容 */}
        {this.ContentSets()}
        {/* 新闻 */}
        <div className="news">
          <h3 className="group-title">最新资讯</h3>
          <WingBlank size="md">{this.renderNews()}</WingBlank>
        </div>
      </div>
    );
  }
}

export default Index;
