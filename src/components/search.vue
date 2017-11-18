<template>
  <div id="search">
    <search style="position: absolute; top: 0px;" :placeholder="placeholder" v-model="value" cancel-text="取消" @on-cancel="onCancel" @on-submit="onSubmit" position="absolute" auto-scroll-to-top ref="search">
    </search>
    <div v-if="isTag" class="tagTip">
      <ul class="clearfix">
        <li @click="searchTag(item)" v-for="item in tag.hot" class="tag">{{item}}</li>
      </ul>
      <ul class="clearfix">
        <li @click="searchTag(item)" v-for="item in tag.movieType" class="tag">{{item}}</li>
      </ul>
      <ul class="clearfix">
        <li @click="searchTag(item)" v-for="item in tag.country" class="tag">{{item}}</li>
      </ul>
    </div>
    <div v-if="valueCha" class="searchWrap">
      <loading v-model:show="searchLoad.load" text="加载中..."></loading>
      <div v-if="searchLoad.con" ref="searchBox" class="searchBox">
        <ul :style="{height:sevHeight}" class="searchList">
          <li v-for="item in movieSearch.subjects" class="row clearfix" @click="link(item.id,item.title)">
            <div class="img">
              <img :src="setUrl(item.images.medium)" :alt="item.title">
            </div>
            <ul class="mess">
              <li class="messTitle">{{item.title}}</li>
              <li class="actColor">导演：
                <span v-for="(itdir,index) in item.directors">
                          <span v-if="index>0">/</span>{{itdir.name}}</span>
              </li>
              <li class="actColor">主演：
                <span v-for="(itact,index) in item.casts">
                          <span v-if="index>0">/</span>{{itact.name}}
                </span>
              </li>
              <li class="rat clearfix">
                <span>评分：</span>
                <span v-for="itnum in Math.ceil(item.rating.average/2)" class="fa fa-star"></span>
                <span v-for="itnum in 5-Math.ceil(item.rating.average/2)" class="fa fa-star-o"></span>
              </li>
              <li>{{item.collect_count}}人看过</li>
            </ul>
          </li>
        </ul>
        <div class="noMess">
          <p v-if="movieSearch.subjects.length == 0" class="sorry">
            抱歉，暂无搜索结果 ┑(￣▽ ￣)┍
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
 
  export default {
    name: "searchs",
    components: {
      
    },
    
    beforeCreate() {
      this.$store.commit("setHeader", false);
      this.$store.commit("setBottom", false);
    },
    mounted() {
      this.$refs.search.setFocus();
    },
    updated() {
      if (this.$refs.searchBox) {
        this.$nextTick(() => {
          this.scroll = new scr(this.$refs.searchBox, {
            click: true
          });
        });
      }
    },
    destroyed() {
      this.$store.commit("searchLoding");
    },
    computed: {
      movieSearch() {
        return this.$store.state.searchVal;
      },
      valueCha() {
        return !this.isTag;
      },
      sevHeight() {
        return this.$store.getters.sevHeight;
      },
      searchLoad() {
        return this.$store.state.searchLoad;
      }
    },
    methods: {
      onCancel() {
        this.$router.go(-1);
      },
      //用户搜索
      onSubmit() {
        this.$store.commit("searchLoding");
        this.$refs.search.setBlur();
        if (this.isTag) {
          this.isTag = !this.isTag;
        }
        this.$store.dispatch("getMovieSearch", this.value);
      },
      //处理图片，豆瓣图片直接访问不了
      setUrl(url) {
        if (url !== undefined) {
          let urlO = url.replace("https://", "https://images.weserv.nl/?url=");
          return urlO;
        }
      },
      link(id, title) {
        this.$router.push({
          name: "movieShow",
          params: {
            movieId: id
          }
        });
        localStorage.setItem("id", id);
        localStorage.setItem("title", title);
      },
      //通过标签获取
      searchTag(tag) {
        this.$store.commit("searchLoding");
        this.$refs.search.setBlur();
        if (this.isTag) {
          this.isTag = !this.isTag;
        }
        this.$store.dispatch("getMovieTag", tag);
      }
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
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
