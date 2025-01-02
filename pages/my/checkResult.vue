<template>
	<view style="display: flex; flex-direction: column; height: 100%;">
		<view>
			<wd-navbar :bordered="false" :shape="'round'">
				<template #capsule>
					<wd-icon name="chevron-left" size="28" @click="handleCheckClose"></wd-icon>
				</template>
				<template #title>
					<view style="font-weight: bold; font-size: 32rpx">
						生成结果
					</view>
				</template>
			</wd-navbar>
			
			<view class="titleContent">
				<view>
					<text>
						消耗金币:
					</text>
					<wd-img
						:height="14"
						:width="14"
						src="/static/img/components/navigator/coin.png"
					>
					</wd-img>
					<text style="color: #fdc100;">
						{{ props.result.coin }}
					</text>
				</view>
				<view style="font-size: 26rpx">
					{{ props.result.pay_time }}
				</view>
				<!--<wd-button type="text">无水印下载</wd-button>-->
				<text style="font-weight: 700; color: #de6683" @click="download">无水印下载</text>
			</view>
		</view>
		
		<view class="content">
			<img v-if="!ifVideo(props.result.result_url)" :src="props.result.result_url" width="100%" alt=""/>
			<video
				v-else :src="props.result.result_url" controls="controls" style="width: 100%; height: 100%"
			></video>
		</view>
	</view>
</template>

<script setup>
	import {ref, reactive, shallowRef, onMounted, defineEmits, defineProps, watch} from "vue";
	import {formatTime} from "../../utils/formatTime.js";
	
	const emit = defineEmits(["closeCheckResult"]);
	
	const handleCheckClose = () => {
		emit("closeCheckResult");
	};
	
	const props = defineProps({
		result: {
			type: Object,
			default: {
				id: "",
				order_id: "",
				coin: "10.00",
				order_time: "",
				pay_time: "",
				order_ip: "",
				user_id: "",
				task_id: "",
				type: "2",
				status: "3",
				result_url: "",
				file_url: ""
			}
		}
	});
	
	
	const ifVideo = (url) => {
		return url.indexOf(".mp4") > - 1;
	};
	
	onMounted(() => {
		console.log(props.result);
	});
	
	const download = () => {
		uni.downloadFile({
			url: props.result.result_url,
			header: {
				"Access-Control-Allow-Origin": "*",
			},
			success: (res) => {
				console.log(res);
				if(res.statusCode === 200){
					uni.saveFile({
						tempFilePath: res.tempFilePath,
						success: (saveRes) => {
							// 文件保存成功，可以提示用户
							uni.showToast({
								title: "文件下载成功",
								icon: "success"
							});
							// 可以选择将文件路径保存起来，以便用户后续查看
							console.log("文件保存路径:", saveRes.savedFilePath);
						},
						fail: (err) => {
							// 文件保存失败
							uni.showToast({
								title: "文件保存失败",
								icon: "none"
							});
							console.error("文件保存失败:", err);
						}
					});
				}
				else {
					// 下载失败
					uni.showToast({
						title: "文件下载失败",
						icon: "none"
					});
					console.error("文件下载失败:", res);
				}
			},
			fail: (err) => {
				// 下载失败
				uni.showToast({
					title: "文件下载失败",
					icon: "none"
				});
				console.error("文件下载失败:", err);
			}
		});
	};


</script>


<style lang="scss" scoped>
	.titleContent {
		height: 42px;
		line-height: 42px;
		text-align: center;
		//font-weight: bold;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0 20rpx;
	}
	
	.content {
		flex: 1;
		display: flex;
		justify-content: center;
		align-items: center;
	}

</style>
