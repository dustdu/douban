<template>
  <div style="height: 100%;">
    <loading 
      v-model="comingData.loading" 
      text="加载中..."></loading>
    <scroll 
      v-show="!comingData.loading" :data="comingData.movieList.subjects" 
      class="wrap">
      <div>
        <movie-li 
          v-for="item in comingData.movieList.subjects" 
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
  export default {
    components: {
      MovieLi,
      Scroll,
      Loading
    },
    created() {
      this.$store.dispatch("getComingMovies");
    },
    computed: {
      comingData() {
        return this.$store.state.comingData;
      }
    },
    methods: {}
  }
</script>

<style scoped lang="scss">
.wrap {
  height: 100%;
  overflow: hidden;
  background-color: #efefef;
}
</style>
