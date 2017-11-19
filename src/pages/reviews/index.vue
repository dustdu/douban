<template>
  <div style="height:100%">
    <loading :show="reviewsFullLoading"></loading>
    <scroll 
      id="reviews" 
      v-show="!reviewsFullLoading"
      :data="reviewsFull"
    >
      <div>
        <h2 
          v-text="reviewsFull.title" 
          class="title"
        ></h2>
        <div class="author">
          <div class="img">
            <img :src="reviewsFull.author?setUrl(reviewsFull.author.avatar):''">
          </div>
          <div class="mess">
            <p 
              class="name" 
              v-text="reviewsFull.author?reviewsFull.author.name:''"
            ></p>
            <p 
              class="signature" 
              v-text="reviewsFull.author?reviewsFull.author.signature:''"
            ></p>
          </div>
        </div>
        <div class="count">
          <div class="created">发布于{{reviewsFull.created_at}}</div>
          <div 
            class="content" 
            v-html="reviewsFull.content"
          ></div>
        </div>
        <divider class="divider">结束</divider>
        <div class="use">
          <p>有用 {{reviewsFull.useful_count}}</p>
          <p>没用 {{reviewsFull.useless_count}}</p>
        </div>
      </div>
    </scroll>
  </div>
</template>

<script type="text/ecmascript-6">
  import Scroll from '../../components/scroll'
  import Loading from 'vux/src/components/loading'
  import Divider from 'vux/src/components/divider'
  import { mapMutations,mapState,mapActions } from 'vuex'
  import {imgUrl} from '../../js/data-process'
  export default {
    name: 'reviewsFull',
    components: {
      Scroll,
      Loading,
      Divider
    },
    created() {
      this.getReviewsFull(this.$route.params.reviewsId);
      this.showHeader(true);
      this.showBack(true);
      this.headBack(false);
      this.showSearch(false);
      this.showBottom(false);
      this.bodyTop('46px');
      this.bodyBottom('0px');
    },
    beforeUpdate() {
      this.title(this.reviewsFull.title);
    },
    beforeDestroy() {
      this.reviewsLoading();
    },
    computed: {
      ...mapState([
        'reviewsFull',
        'reviewsFullLoading'
      ])
    },
    methods: {
      setUrl(url) {
        return imgUrl(url);
      },
      ...mapActions([
        'getReviewsFull'
      ]),
      ...mapMutations({
        showHeader: 'SHOW_HEADER',
        showBack: 'SHOW_BACK',
        title: 'TITLE',
        headBack: 'HEAD_BACK',
        showSearch: 'SHOW_SEARCH',
        showBottom: 'SHOW_BOTTOM',
        bodyTop: 'BODY_TOP',
        bodyBottom: 'BODY_BOTTOM',
        reviewsLoading: 'REVIEWS_FULL_LOADING'
      })
    }
  }
</script>

<style scoped lang="scss">
  #reviews {
    height: 100%;
    overflow: hidden;
    padding: 15px 15px 0;
    .title {
      font-size: 20px;
      line-height: 30px;
    }
    .author {
      display: flex;
      margin-top: 15px;
      padding-bottom: 10px;
      border-bottom: 1px solid #b2b2b2;
      .img {
        height: 48px;
        width: 48px;
        margin-right: 15px;
        border-radius: 50%;
        overflow: hidden;
      }
      .mess {
        .name {
          font-size: 16px;
          line-height: 25px;
        }
        .signature {
          font-size: 13px;
          line-height: 25px;
          color: #6e6e6e;
        }
      }
    }
    .count {
      margin-top: 15px;
      .created {
        font-size: 13px;
        color: #6e6e6e;
      }
      .content {
        margin-top: 10px;
        font-size: 15px;
        line-height: 1.7;
        white-space: pre-wrap;
      }
    }
    .divider {
      margin: 20px 0;
    }
    .use {
      display: flex;
      justify-content: center;
      p {
        font-size: 14px;
        line-height: 34px;
        border: 1px solid #797979;
        border-radius: 3px;
        margin: 0 20px 50px;
        padding: 0 20px;
      }
    }
  }
</style>
