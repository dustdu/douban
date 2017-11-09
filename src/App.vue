<template>
  <div id="app">
    <view-box :body-padding-bottom="bodyBottom">
      <x-header slot="header" v-if="getHeader" style="width: 100%;position: absolute;left: 0;top: 0;z-index: 100;" :left-options="{showBack: getBack,preventGoBack: true}" @on-click-back="movieBack" :title="getTitle" :class="{headT: getHead}">
        <div v-if="getSearch" slot="right" @click="search">搜索</div>
      </x-header>
      <router-view class="appBg"></router-view>
      <tabbar slot="bottom" v-if="getBottom">
        <tabbar-item v-for="tabbar in tabbars" :key="tabbar.name" :link="tabbar.link" :selected="tabbar.link == select">
          <i slot="icon" :class="tabbar.icon"></i>
          <span slot="label">{{tabbar.name}}</span>
        </tabbar-item>
      </tabbar>
    </view-box>
  </div>
</template>

<script>
  import ViewBox from "vux/src/components/view-box";
  import XHeader from "vux/src/components/x-header";
  import Tabbar from "vux/src/components/tabbar/tabbar";
  import TabbarItem from "vux/src/components/tabbar/tabbar-item";
  export default {
    name: "app",
    components: {
      ViewBox,
      XHeader,
      Tabbar,
      TabbarItem
    },
    data() {
      return {
        tabbars: [{
            name: "热映",
            link: "/",
            icon: "fa fa-video-camera"
          },
          {
            name: "即将上映",
            link: "/next",
            icon: "fa fa-film"
          },
          {
            name: "排行",
            link: "/top",
            icon: "fa fa-list-ol"
          }
        ],
        bodyBottom: 0
      };
    },
    computed: {
      select() {
        return this.$store.state.select;
      },
      getTitle() {
        return this.$store.state.title;
      },
      getBottom() {
        return this.$store.state.bottom;
      },
      getHeader() {
        return this.$store.state.header;
      },
      getBack() {
        return this.$store.state.back;
      },
      getHead() {
        return this.$store.state.isHead;
      },
      getSearch() {
        return this.$store.state.isSearch;
      }
    },
    methods: {
      search() {
        this.$router.push({
          name: "search"
        });
      },
      movieBack() {
        this.$router.back();
      }
    }
  };
</script>

<style lang="less">
  @import "~vux/src/styles/reset.less";
  html,
  body {
    height: 100%;
    width: 100%;
    overflow-x: hidden;
  }
  .clearfix::after {
    content: "";
    display: block;
    clear: both;
  }
  img {
    vertical-align: top;
  }
  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  * {
    box-sizing: border-box;
  }
  #app {
    height: 100%;
    .vux-header-title {
      font-size: 16px;
    }
    .headT {
      background-color: rgba(000, 000, 000, 0.3);
      * {
        color: #fff;
      }
      .left-arrow:before {
        border-color: #fff;
      }
    }
    .appBg {
      background: #f0f0f0;
      height: 100%;
    }
    .box {
      height: 100%;
      .movieList {
        padding-top: 46px;
      }
      .paddBot {
        height: 99px;
      }
    }
    .row {
      width: 100%;
      margin: 10px 0;
      padding: 10px 0;
      box-shadow: 0 0 4px #aaaaaa;
      background: #fff;
      .img {
        float: left;
        padding: 0 10px;
        height: 120px;
        width: 110px;
        img {
          height: 100%;
          width: 100%;
        }
      }
      .mess {
        * {
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
        }
        float: left;
        width: 100%;
        height: 100%;
        padding-left: 110px;
        margin-left: -110px;
        .rat {
          * {
            float: left;
          }
          .average {
            margin-left: 8px;
          }
        }
        font-size: 12px;
        line-height: 24px;
        .messTitle {
          font-size: 16px;
        }
        .actColor {
          color: #777;
        }
      }
      .fa {
        color: #e4a813;
        line-height: 24px;
        font-size: 10px;
      }
    }
  }
</style>
