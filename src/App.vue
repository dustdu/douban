<template>
  <div id="app">
    <view-box 
      body-padding-bottom = "53px" 
      body-padding-top = "46px">
      <x-header 
        slot="header" 
        v-if="showHeader" 
        style="width: 100%;position: absolute;left: 0;top: 0;z-index: 100;" 
        :left-options="{showBack: showBack}" 
        :title="title" 
        :class="{headBack: headBack}">
        <div 
          v-if="showSearch" 
          slot="right" 
          @click="search">搜索</div>
      </x-header>
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
      <tabbar 
        slot="bottom" 
        v-if="showBottom">
        <tabbar-item 
          v-for="tabbar in tabbars" 
          :key="tabbar.name" 
          :link="tabbar.link" 
          :selected="tabbar.link == selected">
          <i 
            slot="icon" 
            :class="tabbar.icon"></i>
          <span slot="label">{{tabbar.name}}</span>
        </tabbar-item>
      </tabbar>
    </view-box>
  </div>
</template>

<script>
  import ViewBox from 'vux/src/components/view-box'
  import XHeader from 'vux/src/components/x-header'
  import Tabbar from 'vux/src/components/tabbar/tabbar'
  import TabbarItem from 'vux/src/components/tabbar/tabbar-item'
  import { mapState } from 'vuex'
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
            link: "/hot",
            icon: "fa fa-video-camera"
          },
          {
            name: "即将上映",
            link: "/coming",
            icon: "fa fa-film"
          },
          {
            name: "排行",
            link: "/top250",
            icon: "fa fa-list-ol"
          }
        ],
      }
    },
    computed: {
      ...mapState([
        'showHeader',
        'showBack',
        'title',
        'headBack',
        'showSearch',
        'showBottom',
        'selected'
      ])
    },
    methods: {
      search() {
        this.$router.push({
          name: "search"
        });
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
  .clearFix::after {
    content: "";
    display: block;
    clear: both;
  }
  * {
    box-sizing: border-box;
  }
  #app {
    height: 100%;
    overflow: hidden;
    .vux-header-title {
      font-size: 16px;
    }
    .headBack {
      background: rgba(000, 000, 000, .3);
    }
  }
</style>
