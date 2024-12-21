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
					0
				</text>
			</view>
			<view style="font-size: 26rpx">
				{{formatTime(props.result.created_at)}}
			</view>
		<!--<wd-button type="text">无水印下载</wd-button>-->
			<text style="font-weight: 700; color: #DE6683" @click="download">无水印下载</text>
		</view>
		</view>
		
		<view class="content">
			<img v-if="!ifVideo(props.result.result_url)" :src="props.result.result_url" width="100%" />
			<video v-else :src="props.result.result_url" controls="controls" style="width: 100%"></video>
		</view>
	</view>
</template>

<script setup>
	import { ref, reactive, shallowRef, onMounted, defineEmits, defineProps, watch } from 'vue';
	import { formatTime } from '../../utils/formatTime.js'
	
	const emit = defineEmits(["closeCheckResult"]);
	
	const handleCheckClose = () => {
		emit("closeCheckResult")
	}
	
	const props = defineProps({
		result: {
			type: Object,
			default: {
				money: 10,
				source_url: "",
				target_url: "",
				result_url: "",
				video_image: "",
				task_id: "",
				status: 3,
				type: 1,
				created_at: "2024-12-19T12:52:36+08:00"
			}
		}
	})
	
	
	const ifVideo = (url) => {
		return url.indexOf(".mp4") > -1
	}
	
	onMounted(() => {
		console.log(props.result)
	})
	
	const download = () => {}
	
</script>


<style scoped lang="scss">
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
