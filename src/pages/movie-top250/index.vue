<template>
  <div style="height: 100%;">
    <loading 
      v-model="top250Data.loading" 
      text="加载中..."
    ></loading>
    <scroll 
      v-show="!top250Data.loading" 
      :data="top250Data.movieList.subjects" 
      class="wrap"
    >
      <div>
        <movie-li 
          v-for="item in top250Data.movieList.subjects" 
          :key="item.id" 
          :movieData="item"
        ></movie-li>
      </div>
    </scroll>
  </div>
</template>

<script type="text/ecmascript-6">
  import MovieLi from '../../components/movie-li'
  import Scroll from '../../components/scroll'
  import Loading from 'vux/src/components/loading'
  import { mapMutations } from 'vuex'
  export default {
    components: {
      MovieLi,
      Scroll,
      Loading
    },
    created() {
      this.$store.dispatch("getTop250Movies");
    },
    activated(){
      this.showHeader(true);
      this.showBack(false);
      this.title('top250');
      this.headBack(false);
      this.showSearch(true);
      this.showBottom(true);
      this.selected('/top250');
      this.bodyTop('46px');
      this.bodyBottom('53px');
    },
    computed: {
      top250Data() {
        return this.$store.state.top250Data;
      }
    },
    methods: {
      ...mapMutations({
        showHeader: 'SHOW_HEADER',
        showBack: 'SHOW_BACK',
        title: 'TITLE',
        headBack: 'HEAD_BACK',
        showSearch: 'SHOW_SEARCH',
        showBottom: 'SHOW_BOTTOM',
        selected: 'SELECTED',
        bodyTop: 'BODY_TOP',
        bodyBottom: 'BODY_BOTTOM'
      })
    }
  }
</script>

<style scoped lang="scss">
.wrap {
  height: 100%;
  overflow: hidden;
  background-color: #efefef;
}
</style>
