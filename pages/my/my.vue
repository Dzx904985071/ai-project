<template>
	<view>
		<view class="myTop">
			<!--用户信息-->
			<view class="userInfoTop">
				<view class="nameAndPhoto">
					<view>
						<wd-img height="66" round src="/static/img/pages/my/userImg.png" width="66"></wd-img>
					</view>
					<view>
						<view>用户昵称</view>
						<view style="font-size: 24rpx; color: #fff">
							<wd-text
								:color="'#fff'"
								:text="showUserName()"
							></wd-text>
						</view>
					</view>
				
				</view>
				<view class="topButton">
					<wd-button v-if="!showUserInfo"  :round="false" size="small" type="primary" >
						<view style="width: 96rpx" @click="login">登录</view>
					</wd-button>
					<wd-button v-if="showUserInfo" :round="false" plain size="small" type="primary">
						<view style="width: 96rpx">身份卡</view>
					</wd-button>
				</view>
			</view>
			
			<!--三个方框-->
			<view>
				<wd-grid
					:bg-color="'transparent'"
					:column="3"
					:gutter="10"
					square
				>
					<wd-grid-item
						v-for="item in list"
						:icon-size="'72rpx'"
						use-slot
					>
						<view class="gridSlot">
							<wd-img :src="item.img" style="width: 64rpx; height: 64rpx;"></wd-img>
							<view class="text">{{ item.name }}</view>
							<wd-button size="small" type="primary" @click="openDialog(item.dialog)">{{ item.buttonText }}</wd-button>
						</view>
					</wd-grid-item>
				</wd-grid>
			</view>
			
			<!--官方tg-->
			<view class="tgLink">
				<view style="display: flex; align-items: center">
					<wd-img src="/static/img/pages/my/tgIcon.png" style="width: 36rpx; height: 36rpx; margin-right: 12rpx"></wd-img>
					<view>官方tg频道</view>
				</view>
				<view style="display: flex; align-items: center">
					<view>每日享受最新内容资源更新</view>
					<wd-icon name="arrow-right" size="20"></wd-icon>
				</view>
			</view>
			
			<!--商务合作-->
			<view class="tgLink">
				<view style="display: flex; align-items: center">
					<wd-img src="/static/img/pages/my/tgIcon.png" style="width: 36rpx; height: 36rpx; margin-right: 12rpx"></wd-img>
					<view>tg商务合作</view>
				</view>
				<wd-icon name="arrow-right" size="20"></wd-icon>
			</view>
			
			<!--下载app-->
			<view class="tgLink">
				<view style="display: flex; align-items: center">
					<wd-img src="/static/img/pages/my/fudai.png" style="width: 36rpx; height: 36rpx; margin-right: 12rpx"></wd-img>
					<view>下载app</view>
				</view>
				<wd-icon name="arrow-right" size="20"></wd-icon>
			</view>
			
			<!--滚动提示-->
			<view class="noticeBar">
				<wd-notice-bar
					:background-color="'transparent'"
					:color="'#10c5fa'"
					:speed="75"
					style="padding: 0"
				>
					<template #prefix>
						<wd-icon name="notification" size="36rpx" style="margin-right: 10px"></wd-icon>
					</template>
					<div style="font-size: 28rpx">点点分享，免费获取金币，让ai更简单 >>></div>
				</wd-notice-bar>
			</view>
			
			<!--分享按钮-->
			<view>
				<wd-button block>分享好友赚金币</wd-button>
			</view>
		</view>
		
		<!--个人资料-->
		<view style="display: flex; justify-content: center; margin-bottom: 32rpx">
			<view>
				<wd-text :color="'#fff'" bold text="个人资料"></wd-text>
			</view>
		</view>
		
		<!--个人信息-->
		<view v-if="showUserInfo" class="formItem">
			<view style="width: 25%">我的昵称</view>
			<wd-input v-model="userInfo.nickname" :clear-trigger="'focus'" class="formInput" clearable placeholder="请输入昵称">
				<template #suffix>
					<wd-button :round="false" plain size="small" style="margin-left: 16rpx">修改</wd-button>
				</template>
			</wd-input>
		</view>
		<view v-if="showUserInfo" class="formItem">
			<view style="width: 25%">性别</view>
			<!--<wd-input class="formInput"></wd-input>-->
			<wd-radio-group v-model="userInfo.sex" inline shape="dot">
				<wd-radio :value="1">男</wd-radio>
				<wd-radio :value="2">女</wd-radio>
			</wd-radio-group>
		</view>
		
		<view v-if="showUserInfo" class="bottomButton">
			<wd-button block type="error" @click="logout">退出登录</wd-button>
		</view>
		<view v-if="!showUserInfo" class="bottomButton">
			<wd-button block @click="login">用户登录</wd-button>
		</view>
		
		<!--财务明细-->
		<view v-if="showCostList" class="costList">
			<wallet @close="showCostList = false"></wallet>
		</view>
		
		<!--生成记录-->
		<view v-if="showRecordsList" class="recordsList">
			<records @close="showRecordsList = false"></records>
		</view>
		
	</view>
</template>

<script setup>
	import { ref, reactive, shallowRef, onMounted } from 'vue';
	import wallet from './wallet.vue'
	import records from './records.vue'
	
	const showUserInfo = ref(false)
	
	const showUserName = () => {
		if(showUserInfo.value) {
			return userInfo.value.nickname.length >= 16 ? userInfo.value.nickname.slice(0, 13) + '...' : userInfo.value.nickname
		}
		else {
			return '未登录'
		}
	}
	
	const userInfo = ref({
		username: "",
		nickname: "",
		uuid: "",
		sex: 2,
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
	
	const list = ref([
		{
			name: '财务明细',
			img: '/static/img/pages/my/wallet.png',
			dialog: 'costList',
			buttonText: '查看'
		},
		{
			name: '金币',
			img: '/static/img/pages/my/coin.png',
			dialog: '',
			buttonText: '充值'
		},
		{
			name: '生成记录',
			img: '/static/img/pages/my/records.png',
			dialog: 'recordsList',
			buttonText: '查看'
		},
	])
	
	const getUserInfo = () => {
		userInfo.value = {
			username: "jFjsV1733384631",
			nickname: "jFjsV1733384631111111",
			uuid: "d848eafd9ce5c08827a1e1c57ff5d1d7",
			sex: 2,
			balance: 0,
			free_times: 0,
			level: 2,
			level_extra: {
				expired_time: "",
				undress_num: 0,
				swap_image_num: 0,
				swap_video_num: 0,
				swap_gif_num: 0
			}
		}
		showUserInfo.value = true
	}
	
	const login = () => {
		// showUserInfo.value = true
		getUserInfo()
	}
	
	const logout = () => {
		showUserInfo.value = false
	}
	
	const openDialog = (dialog) => {
		switch(dialog) {
			case 'costList':
				showCostList.value = true
				break
			case 'recordsList':
				showRecordsList.value = true
				break
			default: break
		}
	}
	
	const showCostList = ref(false)
	const showRecordsList = ref(false)
	
	onMounted(() => {
		getUserInfo()
	})
	
</script>


<style lang="scss" scoped>
	.myTop {
		padding: 40rpx;
		background: rgba(16,197,250,.3);
		margin-bottom: 24rpx;
		
		.userInfoTop {
			width: 100%;
			display: flex;
			align-items: center;
			justify-content: space-between;
			margin-bottom: 20rpx;
			
			.nameAndPhoto {
				display: flex;
				align-items: center;
				width: 45%;
				gap: 14rpx;
			}
			
			.topButton {
				display: flex;
				gap: 10px;
			}
		}
		
		.gridSlot {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			gap: 12rpx;
			background: rgba(16,197,250,.1);
			padding: 24rpx 0;
			border-radius: 12rpx;
		}
		
		.tgLink {
			display: flex;
			justify-content: space-between;
			align-items: center;
			height: 96rpx;
			line-height: 96rpx;
			background: rgba(16,197,250,.3);
			border-radius: 12rpx;
			padding: 0 12rpx 0 24rpx;
			font-size: 24rpx;
			margin-bottom: 24rpx;
		}
		
		.noticeBar {
			margin-bottom: 24rpx;
		}
	}
	
	.formItem {
		display: flex;
		margin-bottom: 32rpx;
		justify-content: start;
		align-items: center;
		padding: 0 32rpx;
		
		.formInput {
			flex: 1
		}
	}
	
	.bottomButton {
		padding: 0 32rpx;
	}
	
	.costList {
		position: absolute;
		top: 0;
		left: 0;
		width: 100dvw;
		height: 100dvh;
		background: #11151C;
		z-index: 999;
	}
	
	.recordsList {
		position: absolute;
		top: 0;
		left: 0;
		width: 100dvw;
		height: 100dvh;
		background: #11151C;
		z-index: 999;
	}
</style>
