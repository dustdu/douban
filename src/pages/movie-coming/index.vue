<template>
  <div style="height: 100%;">
    <loading 
      v-model="comingData.loading" 
      text="加载中..."
    ></loading>
    <scroll 
      v-show="!comingData.loading" :data="comingData.movieList.subjects" 
      class="wrap"
    >
      <div>
        <movie-li 
          v-for="item in comingData.movieList.subjects" 
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
      this.$store.dispatch("getComingMovies");
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
      comingData() {
        return this.$store.state.comingData;
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
