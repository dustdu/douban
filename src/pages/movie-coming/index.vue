<template>
  <div style="height: 100%;">
    <loading 
      :show="moviesComingLoading" 
      text="加载中..."
    ></loading>
    <scroll 
      v-show="!moviesComingLoading" 
      :data="moviesComingList" 
      :pullup="pullup"
      @scrollToEnd="getMoreComingMovies"
      class="wrap"
    >
      <div>
        <movie-li 
          v-for="item in moviesComingList" 
          :key="item.id" 
          :movieData="item"
        ></movie-li>
        <load-more v-if="moviesComingMore"></load-more>
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
      this.getComingMovies({
        start: this.start,
        count: this.startCount
      });
    },
    activated(){
      this.showHeader(true);
      this.showBack(false);
      this.title('即将上映');
      this.headBack(false);
      this.showSearch(true);
      this.showBottom(true);
      this.selected('/coming');
      this.bodyTop('46px');
      this.bodyBottom('53px');
    },
    computed: {
      ...mapState([
        'moviesComingList',
        'moviesComingAdd',
        'moviesComingMore',
        'moviesComingLoading',
      ])
    },
    methods: {
      getMoreComingMovies(){
        if (this.moviesComingAdd||!this.moviesComingMore) {
          return;
        }
        this.moviesAdd();
        this.start = params(this.start,15,this.addCount);
        this.getComingMovies({
          start: this.start,
          count: this.addCount
        });
      },
      ...mapActions([
        'getComingMovies'
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
        moviesAdd: 'MOVIES_COMING_ADD'
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
