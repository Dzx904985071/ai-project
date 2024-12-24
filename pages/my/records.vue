<template>
	<view >
		<navigator-top v-if="showTop" :showNotice="false" :showRecordsIcon="false"></navigator-top>
		<wd-navbar :bordered="false" :shape="'round'">
			<template #capsule>
				<wd-icon name="chevron-left" size="28" @click="handleClose"></wd-icon>
			</template>
			<template #title>
				<view style="font-weight: bold; font-size: 32rpx">
					生成记录
				</view>
			</template>
		</wd-navbar>
		<view style="padding: 20rpx">
			<wd-segmented v-model:value="currentType" :options="typeList" size="small" style="margin-bottom: 20rpx">
				<template #label="{ option }">
					<view class="section-slot">
						<view class="name">{{ option.label }}</view>
					</view>
				</template>
			</wd-segmented>
			<wd-segmented v-model:value="currentStatus" :options="statusList" size="small" style="margin-bottom: 20rpx">
				<template #label="{ option }">
					<view class="section-slot">
						<view class="name">{{ option.label }}</view>
					</view>
				</template>
			</wd-segmented>
			
			<view class="recordList">
				<view v-for="item in result.list" class="recordListContent">
					<view style="display: flex; justify-content: space-between; padding: 20rpx">
						<view style="font-weight: bold; color: #DE6683">
							<text>消耗金币: </text>
							<wd-img
								:height="12"
								:width="12"
								src="/static/img/components/navigator/coin.png"
								style="margin-right: 5rpx"
							>
							</wd-img>
							<text style="font-weight: bold; color: #ffbe20">{{ item.money }}</text>
						</view>
						<view style="color: #DE6683; font-weight: bold">
							{{ statusList.find(i => i.value == item.status).label }}
						</view>
						<view style="">
							{{ formatTime(item.created_at) }}
						</view>
					</view>
					<view style="display: flex; justify-content: space-between; align-items: center;background-color: #fff; padding: 20rpx">
						<view style="display: flex; justify-content: flex-start; flex: 1">
							<img :src="item.video_image || item.source_url" alt="" style="height: 110rpx; margin-right: 24rpx" @click="preview(item.source_url)"/>
							<img :src="item.target_url" alt="" style="height: 110rpx" @click="preview(item.target_url)"/>
						</view>
						<wd-button v-if="item.status === 3" :round="false" type="primary" @click="openDetails(item)">查看结果</wd-button>
					</view>
				</view>
			</view>
			
			<wd-message-box :zIndex="99999">
				<img :src="previewUrl" alt="" style="height: 110rpx"/>
			</wd-message-box>
			
			<wd-popup
				v-if="previewPopup"
				v-model="previewPopup"
				:closable="true"
				custom-style="border-radius: 32rpx; height: calc(100dvh - 88rpx); width: 100dvw; display: flex; justify-content: center; align-items: center; z-index: 9999999; padding-top: 80rpx"
				position="bottom"
				transition="fade"
				@close="previewPopup = false"
			>
				<img v-if="!ifVideo(previewUrl)" :src="previewUrl" alt="" width="100%" />
				<video v-else :src="previewUrl" controls style="width: 100%; height: 100%"/>
			</wd-popup>
			
			<view v-if="showCheckResult" :style="`position: absolute; top: ${showTop ? '44px' : 0}; left: 0; z-index: 9999999; width: 100dvw; height: calc(100dvh - 44px); background:#f5f5f5;`">
				<check-result :result="resultInfo" @closeCheckResult="showCheckResult = false" ></check-result>
			</view>
			
		</view>
	</view>
</template>

<script setup>
	import {ref, reactive, shallowRef, onMounted, defineEmits} from "vue";
	import navigatorTop from "../components/navigator/navigatorTop.vue";
	
	import { formatTime } from '../../utils/formatTime.js'
	import CheckResult from "./checkResult.vue";
	
	const emit = defineEmits(["close"]);
	
	const handleClose = () => {
		emit("close");
	};
	
	defineProps({
		showTop: {
			type: Boolean,
			default: () => true,
		}
	})
	
	const typeList = ref([
		{
			label: "全部",
			value: 0
		},
		{
			label: "AI脱衣",
			value: 1
		},
		{
			label: "手动脱衣",
			value: 2
		},
		{
			label: "图片换脸",
			value: 3
		},
		{
			label: "视频换脸",
			value: 4
		},
	])
	const currentType = ref(0)
	const statusList = ref([
		{
			label: "全部",
			value: 0
		},
		{
			label: "排队中",
			value: 1
		},
		{
			label: "处理中",
			value: 2
		},
		{
			label: "处理成功",
			value: 3
		},
		{
			label: "处理失败",
			value: 4
		},
	])
	const currentStatus = ref(0)
	
	const result = ref({
		list: [
			{
				money: 10,
				source_url: "https://kankan991body.cyou/storage/2024-12-19/undress_source_1054259934042005504.png",
				target_url: "https://kankan991body.cyou/storage/2024-12-19/undress_mask_1054259934042005504.png",
				result_url: "https://kankan991body.cyou/storage/2024-12-19/result/2cc9a0de-6031-4ac3-aa91-19c8abcee2cf.jpg",
				// 原视频地址
				video_image: "",
				task_id: "29eecf5d-694a-4be4-a850-b7a842612f69",
				status: 3,
				type: 2,
				created_at: "2024-12-19T12:52:36+08:00"
			},
			{
				money: 10,
				source_url: "https://kankan991body.cyou/storage/tl_video/2024-11-20/1043732504214773760.mp4",
				target_url: "https://kankan991body.cyou/storage/2024-12-19/video_target_1054336608687366144.png",
				result_url: "https://kankan991body.cyou/storage/2024-12-19/result/3d181c5a-02f3-4b17-a1b0-d6e4bcacef41.mp4",
				video_image: "https://kankan991body.cyou/storage/tl_video/2024-11-20/1043732504026030080.jpg",
				task_id: "29eecf5d-694a-4be4-a850-b7a842612f69",
				status: 3,
				type: 2,
				created_at: "2024-12-19T12:52:36+08:00"
			},
			{
				money: 10,
				source_url: "https://kankan991body.cyou/storage/2024-12-19/undress_source_1054259934042005504.png",
				target_url: "https://kankan991body.cyou/storage/2024-12-19/undress_mask_1054259934042005504.png",
				result_url: "https://kankan991body.cyou/storage/2024-12-19/result/2cc9a0de-6031-4ac3-aa91-19c8abcee2cf.jpg",
				video_image: "",
				task_id: "29eecf5d-694a-4be4-a850-b7a842612f69",
				status: 3,
				type: 2,
				created_at: "2024-12-19T12:52:36+08:00"
			},
		],
		pager: {
			current_page: 1,
			last_page: 1,
			total: 1,
			page_size: 20
		}
	})
	
	const previewPopup = ref(false)
	const showCheckResult = ref(false)
	
	const previewUrl = ref("")
	const resultInfo = ref(void 0)
	const preview = (url) => {
		previewUrl.value = url
		previewPopup.value = true
		
	}
	
	const ifVideo = (url) => {
		return url.indexOf(".mp4") > -1
	}
	
	const openDetails = (item) => {
		resultInfo.value = item
		showCheckResult.value = true
	}
	
	const getResult = () => {
		
	}
	
</script>


<style lang="scss" scoped>
	.recordList {
		
		.recordListContent {
			border: 1px dashed #DE6683;
			background: rgba(222, 102, 131, .1);
			border-radius: 8rpx;
			margin-bottom: 20rpx;
			font-size: 28rpx;
		}
	}
	
</style>
