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
	import {httpRequest}from "../../utils/request.js";
	import baseUrl from "../../utils/request.js";
	
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
	
	const download = async () => {
		const params = {
			ct: "ai",
			ac: 'download',
			token: 'g/bJd4AK_IzeMJ3hhNpNdw==',
			task_id: props.result.task_id
		}
		const res = await httpRequest({
			url: '/',
			method: 'GET',
			data: params
		})
		try {
			console.log(res)
			if(res.data.code === 0) {
				let url = res.data.result_local_url.replace(/\\/g, '')
				// 通过a标签自动下载
				const a = document.createElement('a');
				a.href = baseUrl.baseURL + url
				a.download = url.split('/').pop()
				a.click();
				// 提示用户下载完成
				uni.showToast({
					title: '下载成功',
					icon: 'success'
				});
			}
		}
		catch(e) {
			console.log(e)
		}
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
