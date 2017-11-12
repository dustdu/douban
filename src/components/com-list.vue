<template>
	<div id="comment">
		<tab :line-width="lineWidth">
			<tab-item :selected="selected" @on-item-click="comment">短评({{comList.total}})</tab-item>
			<tab-item :selected="!selected" @on-item-click="review">影评({{revList.total}})</tab-item>
		</tab>
		<div v-show="selected" class="comWrap" ref="comWrap">
			<div class="comBox">
				<div class="bottom"></div>
				<comment v-for="item in comList.comments" :comDate="item" :key="item.id"></comment>
				<load-more></load-more>
			</div>
		</div>
		<div v-show="!selected" class="revWrap" ref="revWrap">
			<div class="revBox">
				<div class="bottom"></div>
				<comment v-for="item in revList" :comDate="item" :key="item.id" @toRev="toRev(revList.subject.id,item.id,item.author.name)"></comment>
				<load-more v-show="show"></load-more>
			</div>
		</div>
	</div>
</template>

<script>
	import scr from "better-scroll"
	import Tab from "vux/src/components/tab/tab"
	import TabItem from "vux/src/components/tab/tab-item"
	import Comment from "./comment"
	import LoadMore from "vux/src/components/load-more"
	export default {
		components: {
			Tab,
			TabItem,
			Comment,
			LoadMore
		},
		data() {
			return {
				comList: {},
				revList: [],
				reviews: {},
				loading: true,
				lineWidth: 2,
				click: false,
				selected: true,
				start: 0,
				count: 10,
				loadingFlag: true,
				hasMore: true,
				show: true
			};
		},
		mounted() {
			this.$store.commit("setHead", false);
			this.$store.commit("setBack", true);
			this.$store.commit("setBottom", false);
			this.$store.commit("setSearch", false);
			this.$store.commit("setTitle", `${localStorage.title}-评论`);
		},
		created() {
			fetch(`/api/movie/subject/${localStorage.id}/comments?apikey=0b2bdeda43b5688921839c8ecb20399b`).then(res => {
				return res.json();
			}).then((data) => {
				this.comList = data;
				this.$nextTick(() => {
					this.scroll = new scr(this.$refs.comWrap, {
						click: true
					});
				});
			});
		},
		computed: {},
		watch: {
			revList() { 
        setTimeout(() => { 
          this.scroll.refresh();
        }, 20);
      }
		},
		methods: {
			comment() {
				this.selected = !this.selected;
			},
			review() {
				this.selected = !this.selected;
				if (this.click) {
					return;
				}
				this.getRev();
				this.click = true;
			},
			getRev() {
				fetch(`/api/movie/subject/${localStorage.id}/reviews?apikey=0b2bdeda43b5688921839c8ecb20399b&start=${this.start}&count=${this.count}`).then(res => {
					return res.json();
				}).then((data) => {
					this.reviews = data;
					this.revList = this.revList.concat(data.reviews);
					this.$nextTick(() => {
						this.scroll = new scr(this.$refs.revWrap, {
							probeType: 3,
							pullUpLoad: true
						});
						this.scroll.on('scrollEnd', () => {
							if (this.scroll.y <= this.scroll.maxScrollY + 20) {
								if (!this.loadingFlag || !this.hasMore) {
									console.log('quick');
									return;
								}
								this.loadingFlag = false;
								this.start += this.count;
								fetch(`/api/movie/subject/${localStorage.id}/reviews?apikey=0b2bdeda43b5688921839c8ecb20399b&start=${this.start}&count=${this.count}`).then(res => {
									return res.json();
								}).then((data) => {
									this.reviews = data;
									this.revList = this.revList.concat(data.reviews);
									this.loadingFlag = true;
								});
							}
						});
					});
				});
			},
			toRev(movieId, revId, revName) {
				localStorage.setItem("revId", revId);
				localStorage.setItem("revName", revName);
				this.$router.push({
					name: "reviews",
					params: {
						movieId: movieId,
						revId: revId
					}
				});
			}
		}
	};
</script>

<style scoped lang="scss">
	#comment {
		padding-top: 46px;
		.vux-tab {
			z-index: 20;
		}
		.comWrap,
		.revWrap {
			height: 100%;
			background: white;
			margin-top: -44px;
			overflow: hidden;
			.bottom {
				height: 44px;
			}
		}
	}
</style>
