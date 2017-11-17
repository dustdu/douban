<template>
	<div class="appBg">
		<loading :show="movieData.loading"></loading>
		<scroll 
			v-show="!movieData.loading" 
			:data="movieData.movieMess" 
			class="wrap"
			ref="scroll"
		>
			<div class="box">
				<div class="movieHead">
					<div class="movieBg">
						<div 
							v-if="wrapImg"
							class="movieImg" 
							:style="{backgroundImage: 'url(' + setUrl(wrapImg) + ')'}"
						></div>
						<div 
							v-else
							class="movieImg" 
							style="{backgroundImage: url(../../assets/img/default-medium.png);}"
						></div>
						<div class="mask"></div>
						<div class="infoBg"></div>
					</div>
					<div class="bg"></div>
					<div class="movieBox">
						<div class="moviePic">
							<img 
								v-if="wrapImg"
								class="img" 
								:src="setUrl(wrapImg)" 
								:title="movieData.movieMess.title"
							>
							<img 
								v-else
								class="img" 
								src="../../assets/img/default-medium.png"
								:title="movieData.movieMess.title"
							>
						</div>
						<div class="movieTex">
							<header class="head">
								<p 
									class="title"
									v-text="movieData.movieMess.title"
								></p>
								<p 
									class="aka"
									v-text="movieName"
								></p>
							</header>
							<div 
								class="average" 
								v-if="average != '0.0'" 
								v-text="average"
							></div>
							<ul class="list">
								<li v-text="durations"></li>
								<li v-text="countries"></li>
								<li v-text="genres"></li>
								<li v-text="pubdate"></li>
							</ul>
						</div>
					</div>
				</div>
				
				<div class="plot">
					<!-- 'getMatchedCSSRules()' is deprecated. For more help, check https://code.google.com/p/chromium/issues/detail?id=437569#c2 -->
					<!-- common.js:67 Uncaught (in promise) {message: "The message port closed before a response was received."} -->
					<!-- 文字的容器是<p>报错 -->
					<div 
						:class="[{'plotMess':plotMess},'plotMessO']"
						v-html="summary"
					></div>
					<div 
						:class="['morePlot','fa',isUp?'fa-angle-up':'fa-angle-down','fa-2x']" 
						@click="plotShow"
					></div>
				</div>
				<!-- 在加载详情页后，竖向scroll实例化高度问题，为图片加高度 -->
				<img-scroll-x
					:wrapWidth="actorWidth"
					title="演职人员"
					:imgData="actorData"
					imgHeight="182px"
				></img-scroll-x>
				<img-scroll-x 
					:wrapWidth="postWidth"
					title="剧照"
					:imgData="postData"
					imgHeight="90px"
				></img-scroll-x>
				<div class="comment">
					<h2>热评</h2>
					<div>
						<comment 
							v-for="item in movieData.movieMess.popular_comments" 
							:comData="item" 
							:key="item.id"
						></comment>
					</div>
					<div 
						class="moreComment" 
						@click="getComList(movieData.movieMess.id)"
					>更多评论</div>
				</div>
			</div>
		</scroll>
	</div>
</template>

<script type="text/ecmascript-6">
	import Comment from '../../components/comment'
	import Loading from 'vux/src/components/loading'
	import Scroll from '../../components/scroll'
	import ImgScrollX from '../../components/img-scroll-x'
	import { mapGetters, mapMutations } from 'vuex'
	export default {
		name: 'movieShow',
		components: {
			Comment,
			Loading,
			Scroll,
			ImgScrollX
		},
		data () {
			return {
				plotMess: true,
				isUp: true
			}
		},
		created() {
			this.$store.dispatch("getMovieView", this.$route.params.movieId);
			this.showHeader(true);
			this.showBack(true);
			this.headBack(true);
			this.showSearch(false);
			this.showBottom(false);
			this.bodyTop('0px');
      this.bodyBottom('0px');
		},
		beforeUpdate () {
			this.title(this.movieData.movieMess.title);
		},
		beforeDestroy () {
			this.movieLoading();
		},
		computed: {
			movieData() {
				return this.$store.state.movieData;
			},
			...mapGetters([
				'wrapImg',
				'movieName',
				'countries',
				'genres',
				'average',
				'pubdate',
				'actorData',
				'actorWidth',
				'postData',
				'postWidth',
				'durations',
				'summary'
			])
		},
		methods: {
			plotShow() {
				this.plotMess = !this.plotMess;
				this.isUp = !this.isUp;
				//点击后页面高度变化，重新实例化scroll
				this.$nextTick(() => {
					this.$refs.scroll.refresh();
				});
			},
			setUrl(url) {
				if (url !== undefined) {
					let urlO = url.replace("https://", "https://images.weserv.nl/?url=");
					return urlO;
				}
			},
			//评论列表
			getComList(movieId) {
				this.$router.push({
					name: "movieComments",
					params: {
						movieId: movieId
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
				movieLoading: 'MOVIE_LOADING',
				bodyTop: 'BODY_TOP',
        bodyBottom: 'BODY_BOTTOM'
			})
		}
	}
</script>

<style scoped lang="scss">
	.appBg {
		height: 100%;
		.wrap {
			height: 100%;
			overflow: hidden;
			background: #f0f0f0;
			.box>* {
				margin-bottom: 10px;
				box-shadow: 0 0 4px #aaa;
				background: white;
			}
		}
	}
	.movieHead {
		position: relative;
		.movieBg {
			position: relative;
			height: 190px;
			width: 100%;
			.movieImg,
			.mask,
			.infoBg {
				height: 100%;
				width: 100%;
			}
			.movieImg {
				background: no-repeat top center;
				background-size: 100% auto;
				filter: blur(8px);
			}
			.mask {
				position: absolute;
				top: 0;
				background: rgba(000, 000, 000, 0.3);
			}
			.infoBg {
				position: absolute;
				top: 0;
				background: url(../../assets/img/info_bg.png) no-repeat center bottom;
				background-size: auto 30px;
			}
		}
		.bg {
			height: 100px;
			background: white;
			position: relative;
			z-index: 2;
			top: -5px;
		}
		.movieBox {
			position: absolute;
			top: 95px;
			z-index: 10;
			width: 100%;
			.moviePic {
				position: absolute;
				top: 0;
				left: 22px;
				border: 2px solid #fff;
				.img {
					width: 120px;
				}
			}
			.movieTex {
				width: 100%;
				padding-top: 5px;
				padding-left: 166px;
				>*>* {
					width: 100%;
					text-overflow: ellipsis;
					overflow: hidden;
					white-space: nowrap;
				}
				.head {
					margin-bottom: 15px;
					.title {
						font-size: 20px;
						font-weight: bold;
						color: white;
						line-height: 26px;
					}
					.aka {
						font-size: 14px;
						line-height: 30px;
						height: 30px;
						color: white;
					}
				}
				.average {
					width: 40px;
					height: 35px;
					background: #00a251;
					position: absolute;
					top: 55px;
					right: 30px;
					color: white;
					line-height: 35px;
					text-align: center;
				}
				.list {
					font-weight: bold;
					font-size: 15px;
					line-height: 22px;
				}
			}
		}
	}
	.plot {
		padding: 10px 10px 0 10px;
		text-indent: 2em;
		font-size: 14px;
		line-height: 24px;
		.plotMessO {
			white-space: pre-wrap;
		}
		.plotMess {
			display: -webkit-box;
			-webkit-box-orient: vertical;
			-webkit-line-clamp: 2;
			overflow: hidden;
		}
		.morePlot {
			width: 100%;
			height: 40px;
			line-height: 40px;
			text-align: center;
		}
	}
	.comment {
		h2 {
			margin: 0 5px;
			font-size: 18px;
			font-weight: normal;
			line-height: 50px;
			text-align: center;
			border-bottom: 1px solid #00bb5e;
		}
		.moreComment {
			border-top: 1px solid #00bb5e;
			margin: 0 5px;
			text-align: center;
			font-size: 16px;
			color: #00ae57;
			line-height: 56px;
		}
	}
</style>
