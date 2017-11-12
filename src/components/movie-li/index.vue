<template>
	<div 
		class="row clearFix" 
		@click="link(movieData.id,movieData.title)">
		<div class="img">
			<img 
				:src="setUrl(movieData.images.medium)" 
				:alt="movieData.title">
		</div>
		<ul class="mess">
			<li class="messTitle">{{movieData.title}}</li>
			<li class="actColor">导演：
				<span 
					v-for="(item,index) in movieData.directors" 
					:key="item.id">
					<span v-if="index>0">/</span>{{item.name}}</span>
			</li>
			<li class="actColor">主演：
				<span 
					v-for="(item,index) in movieData.casts" 
					:key="item.id">
						<span v-if="index>0">/</span>{{item.name}}
				</span>
			</li>
			<li class="rat clearfix">
				<span>评分：</span>
				<span v-for="item in Math.ceil(movieData.rating.average/2)" class="fa fa-star" :key="item.id"></span>
				<span v-for="item in 5-Math.ceil(movieData.rating.average/2)" class="fa fa-star-o" :key="item.id"></span>
			</li>
			<li>{{movieData.collect_count}}人看过</li>
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
			link(id, title) {
				this.$router.push({
					name: "MovieShow",
					params: {
						movieId: id
					}
				});
			},
			setUrl(url) {
				return imgUrl(url);
			}
		}
	}
</script>

<style scoped lang="scss">
	.row {
		width: 100%;
		margin: 0 0 8px;
		padding: 10px 0;
		box-shadow: 0 0 4px #aaaaaa;
		background: #fff;
		.img {
			float: left;
			padding: 0 10px;
			height: 120px;
			width: 110px;
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
			padding-left: 110px;
			margin-left: -110px;
			.rat {
				* {
					float: left;
				}
				.average {
					margin-left: 8px;
				}
			}
			font-size: 12px;
			line-height: 24px;
			.messTitle {
				font-size: 16px;
			}
			.actColor {
				color: #777;
			}
		}
		.fa {
			color: #e4a813;
			line-height: 24px;
			font-size: 10px;
		}
	}
</style>
