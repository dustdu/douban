<template>
  <div id="comment">
    <div class="wrap">
      <tab :line-width="lineWidth">
        <tab-item 
          :selected="selected == 'comment'" 
          @on-item-click="comment"
        >短评</tab-item>
        <tab-item 
          :selected="selected == 'review'" 
          @on-item-click="review"
        >影评</tab-item>
      </tab>
      
      <scroll
        :data="commentsList"
        class="comWrap"
        v-show="selected == 'comment'"
        :pullup="pullup"
        @scrollToEnd="getComments"
      >
        <div>
          <comment
            v-for="item in commentsList"
            :key="item.id"
            :comData="item"
          ></comment>
          <load-more v-if="commentsMore"></load-more>
          <div 
            class="noneMore"
            v-else
          >抱歉，没有更多评论了 ┑(￣▽ ￣)┍</div>
        </div>
      </scroll>
      <scroll
        :data="reviewsList"
        class="comWrap"
        v-show="selected == 'review'"
        :pullup="pullup"
        @scrollToEnd="getReviews"
      >
        <div>
          <comment
            v-for="item in reviewsList"
            :key="item.id"
            :comData="item"
            @toReviews="toReviews(reviewsMess.id,item.id)"
          ></comment>
          <load-more v-if="reviewsMore"></load-more>
          <div 
            class="noneMore"
            v-else
          >抱歉，没有更多评论了 ┑(￣▽ ￣)┍</div>
        </div>
      </scroll>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import Scroll from '../../components/scroll'
  import Comment from '../../components/comment'
  import Tab from "vux/src/components/tab/tab"
  import TabItem from "vux/src/components/tab/tab-item"
  import LoadMore from "vux/src/components/load-more"
  import { mapMutations,mapActions,mapState } from 'vuex'
  import { params } from '../../js/data-process'
  export default {
    name: 'movieComments',
    components: {
      Comment,
      Scroll,
      Tab,
      TabItem,
      LoadMore
    },
    data() {
      return {
        selected: 'comment',
        lineWidth: 2,
        click: false,
        pullup: true,
        startCount: 20,
        addCount: 8,
        commentsStart: 0,
        reviewsStart: 0
      }
    },
    created() {
      this.getMovieComments({
        movieId: this.$route.params.movieId,
        start: this.commentsStart,
        count: this.startCount
      });
      this.showHeader(true);
      this.showBack(true);
      this.headBack(false);
      this.showSearch(false);
      this.showBottom(false);
      this.bodyTop('46px');
      this.bodyBottom('0px');
    },
    beforeUpdate() {
      this.title(this.commentsMess.title);
    },
    beforeDestroy () {
      this.commentsClean();
    },
    computed: {
      ...mapState([
        'commentsMess',
        'commentsList',
        'commentsAdd',
        'commentsMore',
        'reviewsMess',
        'reviewsList',
        'reviewsAdd',
        'reviewsMore'
      ])
    },
    methods: {
      comment() {
        this.selected = 'comment';
      },
      review() {
        this.selected = 'review';
        if (this.click) {
          return;
        }
        this.getReviews();
        this.click = true;
      },
      getComments(){
        if (this.commentsAdd || !this.commentsMore) {
          return;
        }
        this.addComments();
        this.commentsStart = params(this.commentsStart,20,this.addCount);
        this.getMovieComments( {
          movieId: this.$route.params.movieId,
          start: this.commentsStart,
          count: this.addCount
        });
      },
      getReviews() {
        if (this.reviewsAdd || !this.reviewsMore) {
          return;
        }
        this.addReviews();
        this.reviewsStart = params(this.reviewsStart,20,this.addCount);
        this.getMovieReviews( {
          movieId: this.$route.params.movieId,
          start: this.reviewsStart,
          count: this.addCount
        });
      },
      toReviews(movieId, reviewsId) {
        this.$router.push({
          name: "reviews",
          params: {
            movieId: movieId,
            reviewsId: reviewsId
          }
        });
      },
      ...mapMutations({
        showHeader: 'SHOW_HEADER',
        showBack: 'SHOW_BACK',
        title: 'TITLE',
        headBack: 'HEAD_BACK',
        showSearch: 'SHOW_SEARCH',
        showBottom: 'SHOW_BOTTOM',
        bodyTop: 'BODY_TOP',
        bodyBottom: 'BODY_BOTTOM',
        addComments: 'COMMENTS_ADD',
        addReviews: 'REVIEWS_ADD',
        commentsClean: 'COMMENTS_CLEAN'
      }),
      ...mapActions([
        'getMovieComments',
        'getMovieReviews'
      ])
    }
  }
</script>

<style scoped lang="scss">
  #comment {
    height: 100%;
    .wrap {
      padding-top: 44px;
      height: 100%;
      position: relative;
      .vux-tab {
        position: absolute;
        top: 0;
        width: 100%;
        z-index: 20;
      }
      .comWrap{
        height: 100%;
        .noneMore {
          height: 35px;
          font-size: 14px;
          line-height: 35px;
          text-align: center;
        }
      }
    }
  }
</style>
