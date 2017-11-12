<template>
  <div style="height: 100%;">
    <loading 
      v-model="hotData.loading" 
      text="加载中..."></loading>
    <scroll 
      v-show="!hotData.loading" 
      :data="hotData.movieList.subjects" 
      class="wrap">
      <div>
        <movie-li 
          v-for="item in hotData.movieList.subjects" 
          :key="item.id" 
          :movieData="item"></movie-li>
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
      this.$store.dispatch("getHotMovies");
      this.showHeader(true);
      this.showBack(false);
      this.title('热映');
      this.headBack(false);
      this.showSearch(true);
      this.showBottom(true);
      this.selected('/hot');
    },
    computed: {
      hotData() {
        return this.$store.state.hotData;
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
        selected: 'SELECTED'
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
