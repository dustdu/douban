<template>
	<div 
		class="row clearFix" 
		@click="link(movieData.id)"
	>
		<div class="img">
			<img 
				:src="setUrl(movieData.images.medium)" 
				:alt="movieData.title"
			>
		</div>
		<ul class="mess">
			<li class="messTitle">{{movieData.title}}</li>
			<li class="actColor">导演：{{movieData.directors.length?directors(movieData.directors):'未知'}}</li>
			<li class="actColor">主演：{{movieData.casts.length?directors(movieData.casts):'未知'}}</li>
			<li class="rat clearfix">
				<span>评分：</span>
				<span v-if="movieData.rating.average !== 0">
					<span 
						v-for="item in Math.ceil(movieData.rating.average/2)" class="fa fa-star" 
						:key="item.id"
					></span>
					<span 
						v-for="item in 5-Math.ceil(movieData.rating.average/2)" class="fa fa-star-o" 
						:key="item.id"
					></span>
					<span 
						class="average" 
						v-text="movieData.rating.average"
					></span>
				</span>
				<span v-else>暂无评分</span>
			</li>
			<li class="collect">{{movieData.collect_count}}人看过</li>
		</ul>
	</div>
</template>

<script type="text/ecmascript-6">
	import { imgUrl } from '../../js/data-process'
	export default {
		props: {
			movieData: {
				type: Object,
				default: {}
			}
		},
		methods: {
			link(id) {
				this.$router.push({
					name: "movieShow",
					params: {
						movieId: id
					}
				});
			},
			setUrl(url) {
				return imgUrl(url);
			},
			//导演
			directors(directors) {
				let director = '';
				directors.forEach((item, index) => {
					if (index > 0) {
						director += '/';
					}
					director += item.name;
				});
				return director;
			}
		}
	}
</script>

<style scoped lang="scss">
	.row {
		width: 100%;
		margin: 0 0 8px;
		padding: 15px 0;
		box-shadow: 0 0 4px #aaaaaa;
		background: #fff;
		.img {
			float: left;
			padding: 0 18px;
			height: 140px;
			width: 130px;
			img {
				height: 100%;
				width: 100%;
			}
		}
		.mess {
			* {
				text-overflow: ellipsis;
				overflow: hidden;
				white-space: nowrap;
			}
			float: left;
			width: 100%;
			height: 100%;
			padding-left: 140px;
			margin-left: -140px;
			.rat {
				* {
					float: left;
				}
				.average {
					margin-left: 8px;
				}
			}
			font-size: 14px;
			line-height: 26px;
			.messTitle {
				font-size: 18px;
				line-height: 32px;
			}
			.actColor {
				color: #636363;
			}
			.collect {
				font-size: 15px;
				line-height: 28px;
			}
		}
		.fa {
			color: #e4a813;
			line-height: 24px;
			font-size: 10px;
		}
	}
</style>
