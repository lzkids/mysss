/**
 * 默认首页
 */
import React, { Component } from "react";

// 导入组件
import { Carousel, Flex, Grid, WingBlank, SearchBar } from "antd-mobile";

import { getSwiper, getGroup, getNews } from "../../api/home";

// 引入封装的axios
import { BASE_URL } from "../../utils/axios";
// 导入样式
import "./index.scss";
// 导入数据
import Navs from "../../utils/NavigationBar";

// 获取定位城市
import { getCity } from "../../utils/GlobalPublics/index";

class Index extends Component {
  state = {
    swiper: [], // 数据
    group: [], // 租房小屋数据
    news: [],
    isPlay: false,
    keyword: "", // 关键词
    imgHeight: 212, // 高度
    currCity: {
      label: "--",
      value: "",
    },
  };
  componentDidMount() {
    this.loadAll();
    this.getCurCity();
  }
  // 获取首页所有接口
  loadAll = async () => {
    const [swiper, group, news] = await Promise.all([
      getSwiper(),
      getGroup(),
      getNews(),
    ]);
    if (swiper.status === 200) {
      this.setState(
        {
          swiper: swiper.data,
          group: group.data,
          news: news.data,
        },
        () => {
          this.setState({
            isPlay: true,
          });
        }
      );
    }
  };

  // 定位城市
  getCurCity = async () => {
    let res = await getCity();
    this.setState({
      currCity: res,
    });
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

  // 顶部搜索栏
  renderTopbar = () => {
    const { push } = this.props.history;
    return (
      <Flex justify="around" className="topNav">
        <div className="searchBox">
          <div
            onClick={() => {
              push("/cityList");
            }}
            className="city"
          >
            {this.state.currCity.label}
            <i className="iconfont icon-arrow" />
          </div>
          <SearchBar
            value={this.state.keyword}
            onChange={(v) => this.setState({ keyword: v })}
            placeholder="请输入小区或地址"
          />
        </div>
        <div
          className="map"
          onClick={() => {
            push("/map");
          }}
        >
          <i key="0" className="iconfont icon-map" />
        </div>
      </Flex>
    );
  };

  // 渲染新闻
  renderNews() {
    return this.state.news.map((item) => (
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
        {/* 搜索栏 */}
        {this.renderTopbar()}
      </div>
    );
  }
}

export default Index;
