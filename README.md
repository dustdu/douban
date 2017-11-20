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

# 打包
npm run build

- 注意跨域
- t.$t函数报错，改一下名字就行
- 打包后获取到的图片地址是http,开发时是https，说以处理图片防盗链的函数要改一下
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

### 开发问题

- 数据每次最多获取100条
- 豆瓣图片加了防外链设置，直接获取图片地址后使用会出现403，要进行设置：可以使用`https://images.weserv.nl/`代替`https://`但是build之后项目获取到的是`http://`的图片
- 电影条目信息api中的popular_comments每次获取刷新数据是变化的
- 这样使用组件

      import { XHeader, Tabbar, TabbarItem } from "vux"

  会有警告

      > VUX: 如果你看到这一行，说明 vux-loader 配置有问题或者代码书写规范的原因导致无法解析成按需引入组件，会导致打包体积过大。请升级到最新版本 vux-loader，建议开启 eslint(standard)。

  这样引入

      import XHeader from "vux/src/components/x-header"

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
│  │  ├─movie-search                    // 电影搜索
│  │  ├─movie-show                      // 电影详情页
│  │  └─movie-top250                    // top250页面
│  ├─router                             // 路由管理
│  └─store                              // 状态管理
└─static
```