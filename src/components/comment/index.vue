<template>
	<div 
		class="commentWrap" 
		@click="toRev"
	>
		<h2 
			v-if="comData.summary" 
			v-text="comData.title"
		></h2>
		<div class="comCon">
			<div>
				<img :src="comData.author.avatar">
			</div>
			<div>
				<div class="author clearFix">
					<h3 v-text="comData.author.name"></h3>
					<div class="rating clearFix">
						<span 
							v-for="(item,index) in comData.rating.value" 
							:key="index"
							class="fa fa-star"
						></span>
						<span 
							v-for="(item,index) in 5-comData.rating.value" 
							:key="index"
							class="fa fa-star-o"
						></span>
					</div>
					<div class="useful">
						<span class="fa fa-thumbs-up"></span>
						<span v-text="comData.useful_count"></span>
					</div>
				</div>
				<p 
					class="content" 
					v-text="comData.summary?comData.summary:comData.content"
				></p>
				<p 
					class="created" 
					v-text="comData.created_at"
				></p>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		props: {
			comData: {
				type: Object,
				default: {}
			}
		},
		methods: {
			toRev() {
				this.$emit('toRev');
			}
		}
	};
</script>

<style scoped lang="scss">
	.commentWrap {
		padding: 15px 0 10px;
		margin: 0 20px;
		border-bottom: 1px dashed #00b55a;
		&:last-child {
			border-bottom: 0px solid #00bb5e;
		}
		h2 {
			font-size: 18px;
			line-height: 28px;
			margin-bottom: 15px;
		}
		.comCon {
			display: flex;
			>div {
				&:first-child {
					width: 40px;
					img {
						width: 100%;
						border-radius: 50%;
					}
				}
				&:last-child {
					flex: 1;
					padding: 0 0 0 14px;
					font-size: 14px;
					word-break: break-all;
					.author {
						line-height: 35px;
						h3 {
							float: left;
							font-weight: normal;
							font-size: 15px;
							color: #5a5a5a;
							margin-right: 10px;
						}
						.rating {
							float: left;
							* {
								float: left;
								line-height: 35px;
								color: #e4ab12;
								font-size: 13px;
							}
						}
						.useful {
							float: right;
							span {
								color: #4f4f4f;
							}
						}
					}
					.content {
						font-size: 14px;
					}
					.created {
						font-size: 13px;
						line-height: 33px;
						color: #797979;
					}
				}
			}
		}
	}
</style>
