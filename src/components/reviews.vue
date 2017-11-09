<template>
  <div id="reviews" ref="reviews">
    <div>
      <loading v-model:show="revDate.loading" text="加载"></loading>
      <div v-show="!revDate.loading">
        <h2 v-text="revDate.review.title" class="title"></h2>
        <div class="author">
          <div class="img">
            <img :src="setUrl(revDate.review.author.avatar)">
          </div>
          <div class="mess">
            <p class="name" v-text="revDate.review.author.name"></p>
            <p class="signature" v-text="revDate.review.author.signature"></p>
          </div>
        </div>
        <div class="count">
          <p class="created">发布于{{revDate.review.created_at}}</p>
          <p class="content" v-html="revDate.review.content"></p>
        </div>
        <divider class="divider">结束</divider>
        <div class="use">
          <p>有用 {{revDate.review.useful_count}}</p>
          <p>没用 {{revDate.review.useless_count}}</p>
        </div>
        <div class="bottom"></div>
      </div>
    </div>
  </div>
</template>

<script>
  import scr from "better-scroll";
  import loading from "vux/src/components/loading";
  import Divider from "vux/src/components/divider";
  export default {
    data() {
      return {}
    },
    components: {
      loading,
      Divider
    },
    beforeCreate() {
      this.$store.dispatch("getReview", localStorage.revId);
      this.$store.commit("setTitle", `${localStorage.revName}的评论`);
      this.$store.commit("setBottom", false);
      this.$store.commit("setBack", true);
      this.$store.commit("setSearch", false);
    },
    updated() {
      if (this.$refs.reviews) {
        this.$nextTick(() => {
          this.scroll = new scr(this.$refs.reviews, {});
        });
      }
    },
    beforeDestroy(){
      this.$store.commit("revLoading");
    },
    computed: {
      revDate() {
        return this.$store.state.revDate;
      }
    },
    methods: {
      setUrl(url) {
        if (url !== undefined) {
          let urlO = url.replace("https://", "https://images.weserv.nl/?url=");
          return urlO;
        }
      },
    }
  }
</script>

<style scoped lang="scss">
  #reviews {
    background: white;
    padding: 46px 20px 0;
    .title {
      font-size: 20px;
      line-height: 30px;
      margin-top: 15px;
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
    .bottom {
      height: 46px;
    }
  }
</style>
