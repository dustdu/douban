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
          v-if="movieSearchData.subjects && movieSearchData.subjects.length !== 0"
          :data="movieSearchData"
          class="searchBox"
        >
          <div class="searchList">
            <movie-li 
              v-for="item in movieSearchData.subjects" 
              :key="item.id" 
              :movieData="item"
            ></movie-li>
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
  import Scroll from '../../components/scroll'
  import { mapMutations,mapActions,mapState } from 'vuex'
  export default {
    name: 'movieSearch',
    components: {
      MovieLi,
      Loading,
      Search,
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
        isTag: true
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
    computed: {
      ...mapState([
        'movieSearchData',
        'movieSearchLoading'
      ])
    },
    methods: {
      onCancel() {
        this.$router.back();
      },
      //输入搜索
      onSubmit() {
        this.searchMovies(this.value);
        this.searchLoading();
        this.$refs.search.setBlur();
        if (this.isTag) {
          this.isTag = !this.isTag;
        }
      },
      //通过标签获取
      searchTag(tag) {
        this.tagMovies(tag);
        this.searchLoading();
        this.$refs.search.setBlur();
        if (this.isTag) {
          this.isTag = !this.isTag;
        }
      },
      ...mapMutations({
        showHeader: 'SHOW_HEADER',
        showBottom: 'SHOW_BOTTOM',
        bodyTop: 'BODY_TOP',
        bodyBottom: 'BODY_BOTTOM',
        searchLoading: 'MOVIE_SEARCH_LOADING'
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
