<template>
	<view>
		<!--财务明细-->
		<navigator-top :showNotice="false"></navigator-top>
		<wd-navbar :bordered="false" :shape="'round'">
			<template #capsule>
				<wd-icon name="chevron-left" size="28" @click="handleClose"></wd-icon>
			</template>
			<template #title>
				<view style="font-weight: bold; font-size: 32rpx">
					财务明细
				</view>
			</template>
		</wd-navbar>
		<view class="walletList">
			<view v-for="item in walletList" class="listContent">
				<view style="display: flex; justify-content: space-between; padding: 20rpx">
					<view style="color: #DE6683; font-weight: bold">
						{{ item.type }}
					</view>
					<view style="">
						{{ item.time }}
					</view>
				</view>
				<view style="background-color: #fff; padding: 20rpx">
					<view style="margin-bottom: 20rpx; font-size: 28rpx">
						<text>消耗金币:</text>
						<wd-img
							:height="12"
							:width="12"
							src="/static/img/components/navigator/coin.png"
							style="margin-right: 5rpx"
						>
						</wd-img>
						<text style="font-weight: bold; color: #ffbe20">10.00</text>
					</view>
					<view style="margin-bottom: 20rpx; font-size: 28rpx">
						<text>操作前余额:</text>
						<wd-img
							:height="12"
							:width="12"
							src="/static/img/components/navigator/coin.png"
							style="margin-right: 5rpx"
						>
						</wd-img>
						<text style="font-weight: bold; color: #ffbe20">10.00</text>
					</view>
					<view style="font-size: 28rpx">
						<text>操作后余额:</text>
						<wd-img
							:height="12"
							:width="12"
							src="/static/img/components/navigator/coin.png"
							style="margin-right: 5rpx"
						>
						</wd-img>
						<text style="font-weight: bold; color: #ffbe20">10.00</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
	import {ref, reactive, shallowRef, onMounted, defineEmits} from "vue";
	import navigatorTop from "../components/navigator/navigatorTop.vue";
	
	const emit = defineEmits(["close"]);
	
	const handleClose = () => {
		emit("close");
	};
	
	const walletList = ref([
		{
			id: 1,
			type: "支出",
			cost: 10,
			before: 35,
			last: 25,
			time: "2022-04-04 22:22:22",
		},
		{
			id: 1,
			type: "充值",
			cost: 10,
			before: 35,
			last: 25,
			time: "2022-04-04 22:22:22",
		},
		{
			id: 1,
			type: "支出",
			cost: 10,
			before: 35,
			last: 25,
			time: "2022-04-04 22:22:22",
		},
	]);

</script>


<style lang="scss" scoped>
	.walletList {
		padding: 20rpx;
		
		.listContent {
			border: 1px dashed #DE6683;
			background: rgba(222, 102, 131, .1);
			border-radius: 8rpx;
			margin-bottom: 20rpx;
		}
	}
</style>
