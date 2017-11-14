<template>
	<div class="imgs">
		<h2 
			v-if="showTitle" 
			class="moreImgs"
		>
			<span 
				class="imgTitle" 
				v-text="title"
			></span>
		</h2>
		<scroll 
			class="imgWrap"
			:scrollX="true"
			:data="imgData"
		>
			<div 
				class="imgsShow clearFix" 
				:style="{width:wrapWidth}"
			>
			<!-- :key="item.id"  -->
				<div 
					class="imgList" 
					v-for="item in imgData" 
					:key="item.id"
				>
					<div>
						<img 
							v-if="!item.img" 
							src="../../assets/img/default-medium.png" 
							:title="item.name"
						>
						<img 
							v-else
							:src="setUrl(item.img)"
							:title="item.name"
						>
					</div>
					<div 
						v-if="item.type"
						class="imgType"
					>
						<p v-text="item.name"></p>
						<p 
							class="work"
							v-text="item.type"
						></p>
					</div>
				</div>
				
			</div>
		</scroll>
	</div>
</template>

<script type="text/ecmascript-6">
	import Scroll from '../../components/scroll'
	export default {
		components: {
			Scroll
		},
		props: {
			showTitle: {
				type: Boolean,
				default: true
			},
			title: {
				type: String,
				default: '标题'
			},
			wrapWidth: {
				type: String
			},
			imgData: {
				type: Array,
				default: null
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
					.imgType {
						margin-top: 10px;
						.name {
							overflow: hidden;
							text-overflow: ellipsis;
							white-space: nowrap;
						}
						.work {
							color: #858585;
						}
					}
					img {
						width: 100%;
					}
				}
			}
		}
	}
</style>
