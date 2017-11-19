<template>
  <div style="height: 100%;">
    <loading 
      :show="moviesHotLoading" 
      text="加载中..."
    ></loading>
    <scroll 
      v-show="!moviesHotLoading" 
      :data="moviesHotList" 
      :pullup="pullup"
      @scrollToEnd="getMoreHotMovies"
      class="wrap"
    >
      <div>
        <movie-li 
          v-for="item in moviesHotList" 
          :key="item.id" 
          :movieData="item"
        ></movie-li>
        <load-more v-if="moviesHotMore"></load-more>
        <div 
          class="noneMore"
          v-else
        >抱歉，没有更多搜索结果了 ┑(￣▽ ￣)┍</div>
      </div>
    </scroll>
  </div>
</template>

<script type="text/ecmascript-6">
  import MovieLi from '../../components/movie-li'
  import Scroll from '../../components/scroll'
  import Loading from 'vux/src/components/loading'
  import LoadMore from "vux/src/components/load-more"
  import { mapMutations,mapState,mapActions } from 'vuex'
  import { params } from '../../js/data-process'
  export default {
    components: {
      MovieLi,
      Scroll,
      Loading,
      LoadMore
    },
    data () {
      return {
        pullup: true,
        start: 0,
        startCount: 15,
        addCount: 8
      }
    },
    created() {
      this.getHotMovies({
        start: this.start,
        count: this.startCount
      });
    },
    activated(){
      this.showHeader(true);
      this.showBack(false);
      this.title('热映');
      this.headBack(false);
      this.showSearch(true);
      this.showBottom(true);
      this.selected('/hot');
      this.bodyTop('46px');
      this.bodyBottom('53px');
    },
    computed: {
      ...mapState([
        'moviesHotList',
        'moviesHotAdd',
        'moviesHotMore',
        'moviesHotLoading',
      ])
    },
    methods: {
      getMoreHotMovies(){
        if (this.moviesHotAdd||!this.moviesHotMore) {
          return;
        }
        this.moviesAdd();
        this.start = params(this.start,15,this.addCount);
        this.getHotMovies({
          start: this.start,
          count: this.addCount
        });
      },
      ...mapActions([
        'getHotMovies'
      ]),
      ...mapMutations({
        showHeader: 'SHOW_HEADER',
        showBack: 'SHOW_BACK',
        title: 'TITLE',
        headBack: 'HEAD_BACK',
        showSearch: 'SHOW_SEARCH',
        showBottom: 'SHOW_BOTTOM',
        selected: 'SELECTED',
        bodyTop: 'BODY_TOP',
        bodyBottom: 'BODY_BOTTOM',
        moviesAdd: 'MOVIES_HOT_ADD'
      })
    }
  }
</script>

<style scoped lang="scss">
.wrap {
  height: 100%;
  overflow: hidden;
  background-color: #efefef;
  .noneMore {
    height: 25px;
    font-size: 14px;
    line-height: 25px;
    text-align: center;
  }
}
</style>
