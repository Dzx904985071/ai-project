<template>
	<view>
		<wd-navbar :bordered="false" :shape="'round'">
			<template #capsule>
				<wd-icon :color="'#de6682'" class="homeIcon" name="home" size="28" @click="handleClickHome" ></wd-icon>
				<view class="userNickName">{{ userInfo.nickname }}</view>
				<view
					:class="userInfo.level > 1 ? 'vip' : 'normal'"
					class="userLevel vip"
				>
					{{ userInfo.level > 1 ? '高级' : '普通' }}会员
				</view>
				<wd-img
					:height="14"
					:width="14"
					src="/static/img/components/navigator/coin.png"
					style="margin-right: 5rpx"
				>
				</wd-img>
				<view class="userCoin">{{ userInfo.balance }}</view>
				<wd-icon
					:color="'#de6682'"
					class="refresh"
					name="refresh1"
					size="20"
					@click="refreshUser"
				></wd-icon>
			</template>
			<template #right>
				<wd-button size="small" style="margin-right: 5px; border-radius: 16rpx" type="primary" :round="false">
					<view style="width: 100rpx">
						充值
					</view>
				</wd-button>
				<wd-icon
					name="list"
					size="20"
				></wd-icon>
			</template>
		</wd-navbar>
		<view
			style="background: #fff"
		>
			<wd-notice-bar
				v-if="showNotice"
				:background-color="'#fff'"
				:color="'#de6682'"
				:speed="75"
			>
				<template #prefix>
					<wd-icon color="#333333" name="notification" size="36rpx" style="margin-right: 10px"></wd-icon>
				</template>
				<div style="font-size: 28rpx">域名存在被封禁风险，请保存登录凭证或设置用户名密码...本站永久域名：xxxx.xxx，请收藏！ </div>
			</wd-notice-bar>
		</view>
	</view>
</template>

<script setup>
	import { ref, onMounted, getCurrentInstance, defineProps } from 'vue'
	
	import emitter from '/utils/emitter.js'  // 引入事件总线
	import {httpRequest} from "../../../utils/request";
	
	const debounce = getCurrentInstance().appContext.config.globalProperties.debounce
	
	// 定义响应式数据
	const userInfo = ref({
		username: "",
		nickname: "",
		uuid: "",
		sex: 1,
		balance: 0,
		free_times: 0,
		level: 1,
		level_extra: {
			expired_time: "",
			undress_num: 0,
			swap_image_num: 0,
			swap_video_num: 0,
			swap_gif_num: 0
		}
	})
	
	defineProps({
		showNotice: {
			type: Boolean,
			default: true
		}
	})
	
	const handleClickHome = () => {
		emitter.emit('goTakeOff', 'takeoff')
	}
	
	// const count = ref(0)
	const getUserInfo = async () => {
		const params = {
			aa: 'bb'
		}
		// TODO 请求用户数据接口
		// const res = await httpRequest({
		// 	url: 'todos',
		// 	method: 'POST',
		// 	data: params
		// })
		const res = {
			username: "jFjsV1733384631",
			nickname: "jFjsV1733384631",
			uuid: "d848eafd9ce5c08827a1e1c57ff5d1d7",
			sex: 1,
			balance: 0,
			free_times: 0,
			level: 1,
			level_extra: {
				expired_time: "",
				undress_num: 0,
				swap_image_num: 0,
				swap_video_num: 0,
				swap_gif_num: 0
			}
		}
		try {
			// console.log(res)
			// count.value++
			// console.log(count.value)
			userInfo.value = res
		}
		catch(e) {
			console.log(e)
		}
	}
	
	const refreshUser = debounce(getUserInfo, 2000)
	
	onMounted(async () => {
		await getUserInfo()
	})
	
</script>


<style lang="scss" scoped>
	.homeIcon {
		margin-right: 8rpx;
	}
	.userNickName {
		font-size: 24rpx;
		margin-right: 8rpx;
	}
	.userLevel {
		font-size: 20rpx;
		height: 24rpx;
		text-align: center;
		line-height: 1;
		padding: 8rpx 12rpx;
		border-radius: 24rpx;
		margin-right: 8rpx;
		color: #fff;
	}
	
	.vip{
		background: #ff9900;
	}
	
	.normal {
		background: #9a9a9a;
	}
	
	.userCoin {
		font-size: 28rpx;
		font-weight: bold;
		color: #fdc100;
		margin-right: 8rpx;
	}
	
	.refresh {
	
	}
</style>
