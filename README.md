# 豆瓣WebApp

## 项目简介

根据[豆瓣官方api](https://developers.douban.com/wiki/?title=movie_v2),使用vue2.x实现的一个WebApp

## 运行步骤

> 需要node环境

``` bash
# clone 项目
git clone https://github.com/dustdu/douban.git

# 进入项目
cd douban

# 安装依赖
npm install

# 开启服务 localhost:8282
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

## 项目详细描述

### 技术栈

- vue2.x + vue-router + vuex
- webpack： 构建工具
- scss： css预处理
- es6语法
- better-scroll 重点解决移动端各种滚动场景，加载，刷新等，将来可能支持PC
- vux： 基于WeUI和Vue(2.x)开发的移动端UI组件库
- font-awesome ： 可缩放的矢量图标

### 项目布局

```
├─build                                 // webpack的配置文件
├─config                                // 项目的开发环境所需配置
├─src                                   // 项目源码目录
│  ├─assets                             // 项目所需静态资源
│  │  ├─font-awesome-4.7.0              // font-awesome图标
│  │  │  ├─css
│  │  │  ├─fonts
│  │  │  ├─less
│  │  │  └─scss
│  │  └─img                             // 图片资源
│  ├─components                         // 项目组件
│  │  ├─comment                         // 评论单例组件
│  │  ├─img-scroll-x                    // 图片横向滚动组件
│  │  ├─movie-li                        // 电影单例组件
│  │  └─scroll                          // 滚动加载组件
│  ├─js                                 // 数据处理
│  ├─pages                              // 页面
│  │  ├─movie-coming                    // 即将上映页面
│  │  ├─movie-comments                  // 评论页面
│  │  ├─movie-hot                       // 热映页面
│  │  ├─movie-show                      // 电影详情页
│  │  └─movie-top250                    // top250页面
│  ├─router                             // 路由管理
│  └─store                              // 状态管理
└─static
```