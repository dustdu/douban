<template>
<div>
  	<loading v-model:show="nextDate.loading.load" text="加载中..."></loading>
  	<div v-if="nextDate.loading.con" class="box" ref="listBox">
		<div :style="{height:boxHeight}" class="movieList">
      <div v-for="item in nextDate.movieList.subjects" class="row clearfix" @click="link(item.id,item.title)">
			<div class="img">
				<img :src="setUrl(item.images.medium)" :alt="item.title">
			</div>
			<ul class="mess">
				<li class="messTitle">{{item.title}}</li>
				<li class="actColor">导演：
					<span v-for="itdir in item.directors">{{itdir.name}}</span>
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
		</div>
		</div>
    </div>
</div>
	
</template>

<script>
import scr from "better-scroll";
import loading from "vux/src/components/loading";
export default {
  name: "next",
  components: {
    loading
  },
  data() {
    return {};
  },
  beforeCreate() {
    this.$store.dispatch("getComMovies");
    this.$store.commit("setSelect", "/next");
    this.$store.commit("setTitle", "即将上映");
    this.$store.commit("setBottom", true);
    this.$store.commit("setHeader", true);
    this.$store.commit("setBack", false);
    this.$store.commit("setHead", false);
    this.$store.commit("setSearch", true);
  },
  updated() {
    if (this.$refs.listBox) {
      this.$nextTick(() => {
        this.scroll = new scr(this.$refs.listBox, {
          click: true
        });
      });
    }
  },
  destroyed(){
    this.$store.commit("nextLoding");
  },
  computed: {
    nextDate() {
      return this.$store.state.nextDate;
    },
    boxHeight() {
      return this.$store.getters.nextHeight;
    }
  },
  methods: {
    link(id, title) {
      this.$router.push({ name: "movieShow", params: { movieId: id } });
      localStorage.setItem("id", id);
      localStorage.setItem("title", title);
    },
    setUrl(url) {
      if (url !== undefined) {
        let urlO = url.replace("https://", "https://images.weserv.nl/?url=");
        return urlO;
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
