<template>
	<view class="myTop">
		<!--用户信息-->
		<view class="userInfoTop">
			<view class="nameAndPhoto">
				<view>
					<wd-img src="/static/img/pages/my/userImg.png" width="66" height="66" round></wd-img>
				</view>
				<view>
					<view>用户昵称</view>
					<view style="font-size: 24rpx; color: #fff">
						<wd-text
							:color="'#fff'"
							:text="userInfo.nickname.length >= 16 ? userInfo.nickname.slice(0, 13) + '...' : userInfo.nickname"
						></wd-text>
					</view>
				</view>
				
			</view>
			<view class="topButton">
				<wd-button size="small" type="primary" :round="false" >
					<view style="width: 96rpx">登录</view>
				</wd-button>
				<wd-button size="small" type="primary" :round="false" plain>
					<view style="width: 96rpx">身份卡</view>
				</wd-button>
			</view>
		</view>
		
		<!--三个方框-->
		<view>
			<wd-grid
				:column="3"
				:gutter="10"
				:bg-color="'transparent'"
				square
			>
				<wd-grid-item
					v-for="item in list"
					use-slot
					:icon-size="'72rpx'"
				>
					<view class="gridSlot">
						<wd-img :src="item.img" style="width: 64rpx; height: 64rpx;"></wd-img>
						<view class="text">{{ item.name }}</view>
						<wd-button size="small" type="primary">{{ item.buttonText }}</wd-button>
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
</template>

<script setup>
	import { ref, reactive, shallowRef, onMounted } from 'vue';
	
	const userInfo = ref({
		username: "jFjsV1733384631",
		nickname: "jFjsV1733384631111111",
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
	})
	
	const list = ref([
		{
			name: '财务明细',
			img: '/static/img/pages/my/wallet.png',
			path: '/pages/my/wallet',
			buttonText: '查看'
		},
		{
			name: '金币',
			img: '/static/img/pages/my/coin.png',
			path: '/pages/my/wallet',
			buttonText: '充值'
		},
		{
			name: '生成记录',
			img: '/static/img/pages/my/records.png',
			path: '/pages/my/wallet',
			buttonText: '查看'
		},
	])
	
</script>


<style scoped lang="scss">
	.myTop {
		padding: 40rpx;
		background: rgba(16,197,250,.3);
		
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
</style>
