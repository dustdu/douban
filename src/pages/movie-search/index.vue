<template>
  <div id="search">
    <search 
      style="position: absolute; top: 0px;" 
      :placeholder="placeholder" 
      v-model="value" 
      cancel-text="取消" 
      @on-cancel="onCancel" 
      @on-submit="onSubmit" 
      auto-scroll-to-top 
      ref="search"
    >
    </search>
    <div 
      v-if="isTag" 
      class="tagTip"
    >
      <ul>
        <li 
          @click="searchTag(item)" 
          v-for="item in tag.hot"
          :key="item" 
          class="tag"
        >{{item}}</li>
      </ul>
      <ul>
        <li 
          @click="searchTag(item)" 
          v-for="item in tag.movieType"
          :key="item"
          class="tag"
        >{{item}}</li>
      </ul>
      <ul>
        <li 
          @click="searchTag(item)" 
          v-for="item in tag.country"
          :key="item" 
          class="tag"
        >{{item}}</li>
      </ul>
    </div>
    <div v-else class="searchWrap">
      <loading 
        :show="movieSearchLoading" 
        text="加载中..."
      ></loading>
      <div 
        v-show="!movieSearchLoading"
        style="height:100%;"
      >
        <scroll 
          v-if="movieSearchData.length !== 0"
          :data="movieSearchData"
          class="searchBox"
          :pullup="pullup"
          @scrollToEnd="getMoreResult"
        >
          <div class="searchList">
            <movie-li 
              v-for="item in movieSearchData" 
              :key="item.id" 
              :movieData="item"
            ></movie-li>
            <load-more v-if="movieSearchMore"></load-more>
            <div 
              class="noneMore"
              v-else
            >抱歉，没有更多搜索结果了 ┑(￣▽ ￣)┍</div>
          </div>
        </scroll>
        <div 
          class="noMess"
          v-else
        >
          <p class="sorry">
            抱歉，暂无搜索结果 ┑(￣▽ ￣)┍
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import MovieLi from '../../components/movie-li'
  import Loading from 'vux/src/components/loading'
  import Search from 'vux/src/components/Search'
  import LoadMore from "vux/src/components/load-more"
  import Scroll from '../../components/scroll'
  import { mapMutations,mapActions,mapState } from 'vuex'
  import { params } from '../../js/data-process'
  export default {
    name: 'movieSearch',
    components: {
      MovieLi,
      Loading,
      Search,
      LoadMore,
      Scroll
    },
    data() {
      return {
        tag: {
          hot: ["经典", "冷门佳片", "魔幻", "黑帮"],
          movieType: ["爱情", "喜剧", "科幻", "动作", "悬疑", "犯罪", "恐怖", "青春", "战争", "文艺", "黑色幽默"],
          country: ["大陆", "美国", "香港", "日本", "韩国", "英国", "法国", "德国", "意大利"]
        },
        placeholder: "搜索电影/影人",
        value: "",
        isTag: true,
        pullup: true,
        srarchType: 'search',
        start: 0,
        //每次最多20
        startCount: 20,
        addCount: 8
      };
    },
    created() {
      this.showHeader(false);
      this.showBottom(false);
      this.bodyTop('0px');
      this.bodyBottom('0px');
    },
    mounted() {
      this.$refs.search.setFocus();
    },
    beforeDestroy () {
      this.movieSearchClean();
    },
    computed: {
      ...mapState([
        'movieSearchData',
        'movieSearchLoading',
        'movieSearchAdd',
        'movieSearchMore'
      ])
    },
    methods: {
      onCancel() {
        this.$router.back();
      },
      //输入搜索
      onSubmit() {
        this.searchMovies({
          value: this.value,
          start: this.start,
          count: this.startCount
        });
        this.searchLoading();
        this.$refs.search.setBlur();
        if (this.isTag) {
          this.isTag = !this.isTag;
        }
      },
      //通过标签获取
      searchTag(tag) {
        this.srarchType = 'tag';
        this.value = tag;
        this.tagMovies({
          tag: tag,
          start: this.start,
          count: this.startCount
        });
        this.searchLoading();
        this.$refs.search.setBlur();
        if (this.isTag) {
          this.isTag = !this.isTag;
        }
      },
      //加载更多
      getMoreResult() {
        if (this.movieSearchAdd||!this.movieSearchMore) {
          return;
        }
        this.searchAdd();
        this.start = params(this.start,20,this.addCount);
        //搜索电影的方式
        if (this.srarchType == 'search') {
          this.searchMovies({
            value: this.value,
            start: this.start,
            count: this.addCount
          });
        }else{
          this.tagMovies({
            tag: this.value,
            start: this.start,
            count: this.addCount
          });
        }
        
      },
      ...mapMutations({
        showHeader: 'SHOW_HEADER',
        showBottom: 'SHOW_BOTTOM',
        bodyTop: 'BODY_TOP',
        bodyBottom: 'BODY_BOTTOM',
        searchLoading: 'MOVIE_SEARCH_LOADING',
        searchAdd: 'MOVIE_SEARCH_ADD',
        movieSearchClean: 'MOVIE_SEARCH_CLEAN'
      }),
      ...mapActions([
        'searchMovies',
        'tagMovies'
      ])
    }
  }
</script>

<style scoped lang="scss">
  #search {
    height: 100%;
    .tagTip {
      height: 100%;
      padding: 44px 20px 20px;
      background: white;
      >* {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
        padding: 10px 0;
        border-bottom: 1px solid #999999;
      }
      .tag {
        margin: 10px 0;
        font-size: 14px;
        line-height: 34px;
        border: 1px solid #00b55a;
        border-radius: 5px;
        padding: 0 10px;
        color: #00b55a;
      }
    }
    .searchWrap {
      height: 100%;
      background-color: #efefef;
    }
    .searchBox {
      height: 100%;
      overflow: hidden;
      .searchList {
        box-sizing: border-box;
        padding-top: 44px;
        .noneMore {
          height: 25px;
          font-size: 14px;
          line-height: 25px;
          text-align: center;
        }
      }
    }
    .noMess {
      display: flex;
      height: 100%;
      margin-top: -54px;
      justify-content: center;
      align-items: center;
      .sorry {
        text-align: center;
      }
    }
  }
</style>
