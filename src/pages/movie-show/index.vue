<template>
	<div class="appBg">
		<loading></loading>
		<div v-if="!movieData.loading" class="load">
			<div class="movieHead">
				<div class="movieBg">
					<div class="movieImg" :style="{backgroundImage: 'url(' + setUrl(movieData.movieMess.images.large) + ')'}">
					</div>
					<div class="mask"></div>
					<div class="infoBg"></div>
				</div>
				<div class="bg"></div>
				<div class="movieBox">
					<div class="moviePic">
						<img class="img" :src="setUrl(movieData.movieMess.images.large)" :title="movieData.movieMess.title">
					</div>
					<div class="movieTex">
						<header class="head">
							<p class="title">{{movieData.movieMess.title}}</p>
							<p class="aka">{{movieData.movieMess.original_title == movieData.movieMess.title? movieData.movieMess.aka[0] : movieData.movieMess.original_title }}</p>
						</header>
						<div class="average" v-if="average != 0" v-text="average"></div>
						<ul class="list">
							<li v-text="movieData.movieMess.durations[0]"></li>
							<li v-text="countries"></li>
							<li v-text="genres"></li>
							<li v-text="setPubdate(movieData.movieMess.mainland_pubdate)"></li>
						</ul>
					</div>
				</div>
			</div>
			<div class="plot">
				<p ref="plotMess" class="plotMess plotMessO">{{movieData.movieMess.summary}}</p>
				<a ref="morePlot" class="morePlot fa fa-angle-down fa-2x" @click="plotShow"></a>
			</div>
			<div class="imgs">
				<h2 class="moreImgs">
					<span class="imgTitle">演职人员</span>
				</h2>
				<div ref="imgWrap" class="imgWrap">
					<div class="imgsShow clearfix" :style="{width:imgWidth}">
						<div class="imgList" v-for="item in movieData.movieMess.directors">
							<div>
								<img v-if="!item.avatars" src="../../assets/img/default-medium.png" :title="item.name">
								<img v-if="item.avatars" :src="isImg(item)" :title="item.name">
							</div>
							<div>
								<p v-text="item.name"></p>
								<p class="work">导演</p>
							</div>
						</div>
						<div class="imgList" v-for="item in movieData.movieMess.casts">
							<div>
								<img v-if="!item.avatars" src="../../assets/img/default-medium.png" :title="item.name">
								<img v-if="item.avatars" :src="isImg(item)" :title="item.name">
							</div>
							<div>
								<p class="name" v-text="item.name"></p>
								<p class="work">演员</p>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="imgs">
				<h2 class="moreImgs">
					<span class="imgTitle">剧照</span>
				</h2>
				<div ref="postWrap" class="imgWrap">
					<div class="imgsShow clearfix" :style="{width:imgWidthO}">
						<div class="imgList" v-for="item in movieData.movieMess.photos">
							<img :src="setUrl(item.cover)">
						</div>
					</div>
				</div>
			</div>
			<div class="comment">
				<h2>热评</h2>
				<div>
					<comment v-for="item in movieData.movieMess.popular_comments" :comDate="item" :key="item.id"></comment>
				</div>
				<div class="moreComment" @click="getComList(movieData.movieMess.id)">
					更多评论
				</div>
			</div>
			<div class="lastBox"></div>
		</div>
	</div>
</template>

<script type="text/ecmascript-6">
	import Comment from '../../components/comment'
	import Loading from 'vux/src/components/loading'
	import Scroll from '../../components/scroll'
	import { mapMutations } from 'vuex'
	export default {
		components: {
			Comment,
			Loading,
			Scroll
		},
		created() {
			this.$store.dispatch("getMovieView",this.$route.params.movieId);
			this.showHeader(true);
			this.showBack(false);
			this.title('热映');
			this.headBack(false);
			this.showSearch(true);
			this.showBottom(true);
			this.selected('/hot');
		},
		computed: {
			movieData() {
				console.log(this.$store.state.movieData)
				return this.$store.state.movieData;
			},
			//处理地区
			countries() {
				let countrie = '';
				this.movieData.movieMess.countries.forEach((item, index) => {
					if (index > 0) {
						countrie += '/';
					}
					countrie += item;
				});
				return countrie;
			},
			//处理演员
			genres() {
				let genres = '';
				this.movieData.movieMess.genres.forEach((item, index) => {
					if (index > 0) {
						genres += '/';
					}
					genres += item;
				});
				return genres;
			},
			//处理评分补零
			average() {
				let average = this.movieData.movieMess.rating.average;
				if (average.length == 1) {
					average += '.0';
				}
				return average;
			},
			//计算实例化scroll时的宽度
			imgWidth() {
				let imgWidth = 100 * (this.movieData.movieMess.directors.length + this.movieData.movieMess.casts.length) + 'px';
				return imgWidth;
			},
			imgWidthO() {
				let imgWidth = 100 * this.movieData.movieMess.photos.length + 'px';
				return imgWidth;
			},
		},
		methods: {
			plotShow() {
				let plotMess = this.$refs.plotMess;
				let morePlot = this.$refs.morePlot;
				if (plotMess.classList.contains("plotMessO")) {
					plotMess.classList.remove("plotMessO");
					morePlot.classList.remove("fa-angle-down");
					morePlot.classList.add("fa-angle-up");
				} else {
					plotMess.classList.add("plotMessO");
					morePlot.classList.add("fa-angle-down");
					morePlot.classList.remove("fa-angle-up");
				}
			},
			setUrl(url) {
				if (url !== undefined) {
					let urlO = url.replace("https://", "https://images.weserv.nl/?url=");
					return urlO;
				}
			},
			isImg(item) {
				if (item.avatars) {
					return this.setUrl(item.avatars.medium);
				}
			},
			setPubdate(pubdate) {
				let pubdateO = "";
				if (pubdate === "") {
					pubdateO = "暂无信息";
				} else {
					pubdateO = pubdate + "中国上映";
				}
				return pubdateO;
			},
			//评论列表
			getComList(movieId) {
				this.$router.push({
					name: "comList",
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
				selected: 'SELECTED'
			})
		}
	}
</script>

<style scoped lang="scss">
	.appBg {
		.load {
			background: #f0f0f0;
			>* {
				margin-bottom: 10px;
				box-shadow: 0 0 4px #aaa;
				background: white;
			}
		}
		.lastBox {
			margin-bottom: -50px;
			height: 1px;
			box-shadow: 0 0 0 #aaa;
			background: rgba(000, 000, 000, 0);
		}
	}
	.movieHead {
		position: relative;
		.movieBg {
			position: relative;
			height: 180px;
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
			height: 90px;
			background: white;
			position: relative;
			z-index: 2;
		}
		.movieBox {
			position: absolute;
			top: 85px;
			z-index: 10;
			width: 100%;
			padding: 0 15px;
			.moviePic {
				position: absolute;
				top: 0;
				left: 20px;
				border: 2px solid #fff;
				.img {
					width: 120px;
				}
			}
			.movieTex {
				width: 100%;
				padding-top: 5px;
				padding-left: 145px;
				>*>* {
					width: 100%;
					text-overflow: ellipsis;
					overflow: hidden;
					white-space: nowrap;
				}
				.head {
					margin-bottom: 20px;
					.title {
						font-size: 20px;
						font-weight: bold;
						color: white;
						line-height: 26px;
					}
					.aka {
						font-size: 14px;
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
		.plotMess {
			font-size: 14px;
			line-height: 24px;
		}
		.plotMessO {
			display: -webkit-box;
			-webkit-box-orient: vertical;
			-webkit-line-clamp: 2;
			overflow: hidden;
		}
		.morePlot {
			width: 100%;
			height: 40px;
			line-height: 40px;
			text-indent: 0em;
			text-align: center;
		}
	}
	.imgs {
		padding-bottom: 15px;
		.vux-header {
			background: white;
		}
		.moreImgs {
			height: 50px;
			padding-left: 15px;
			.imgTitle {
				font-size: 18px;
				font-weight: normal;
				line-height: 50px;
			}
		}
		.imgWrap {
			overflow: hidden;
			.imgsShow {
				.imgList {
					float: left;
					font-size: 14px;
					text-align: center;
					margin: 0 5px;
					width: 90px;
					.name {
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
					}
					.work {
						color: #858585;
					}
					img {
						width: 100%;
					}
				}
			}
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
