<template>
	<view>
		<navigator-top v-if="showTop" :showNotice="false"></navigator-top>
		<wd-navbar :bordered="false" :shape="'round'">
			<template #capsule>
				<wd-icon name="chevron-left" size="28" @click="handleClose"></wd-icon>
			</template>
			<template #title>
				<view style="font-weight: bold; font-size: 32rpx">
					充值
				</view>
			</template>
		</wd-navbar>
		
		<view class="rechargeList">
			<view class="titleContent">
				<view>
					账户余额:
					<text style="color: #fdc100;">
						<wd-img
							:height="14"
							:width="14"
							src="/static/img/components/navigator/coin.png"
						>
						</wd-img>
						0
					</text>
				</view>
			</view>
			
			<view class="coinList">
				<view style="text-align: center; margin-bottom: 32rpx; font-weight: bold;">
					充值金额
				</view>
				<view class="coinContent">
					<view
						v-for="item in coinList"
						:key="item.id"
						class="coinListItem"
						:style="{
							'border': coinListValue === item.id ? '1px solid #DE6683' : '1px solid transparent'
						}"
						@click="coinListValueChange(item.id, 'coin')"
					>
						<view>
							<wd-img
								:height="14"
								:width="14"
								src="/static/img/components/navigator/coin.png"
								style="margin-right: 5rpx"
							>
							</wd-img>
							<text style="color: rgb(253, 193, 0); font-weight: bold">{{ item.gold }}</text>
						</view>
						<view>
							<text style="font-weight: bold">{{ item.real_money }}</text>
							<text style="margin-left: 5rpx;font-size: 24rpx">元</text>
						</view>
						
						<text class="badge">{{item.name}}</text>
					</view>
				</view>
				<view class="payCoin">
					<view>
						<text style="margin-right: 30rpx">实付金额</text>
						<text style="font-weight: bold;font-size: 28rpx">{{selectedCoin.real_money}}</text>
						<text style="margin-left: 5rpx;">元</text>
					</view>
					<view>
						<text style="margin-right: 30rpx">到账金币</text>
						<text style="font-weight: bold;color: #fdc100;font-size: 28rpx">{{selectedCoin.gold}}</text>
						<text style="font-weight: bold;margin-left: 5rpx;color: #fdc100;">币</text>
					</view>
				</view>
			</view>
			
			<view class="coinList">
				<view style="text-align: center; margin-bottom: 32rpx; font-weight: bold;">
					VIP权益
				</view>
				<view class="coinContent">
					<view
						v-for="item in vipList"
						:key="item.id"
						class="coinListItem"
						:style="{
							'border': vipListValue === item.id ? '1px solid #DE6683' : '1px solid transparent'
						}"
						@click="coinListValueChange(item.id, 'vip')"
					>
						<view>
							<text style="color: rgb(253, 193, 0); font-weight: bold">{{item.name}}</text>
						</view>
						<view>
							<text style="font-weight: bold">{{ item.real_money }}</text>
							<text style="margin-left: 5rpx;font-size: 24rpx">元</text>
						</view>
					</view>
				</view>
				
			</view>
			
			<view class="vipDisc">
				<view v-for="(item, index) in vipList">
					<text class="vipLevel">
						L{{index + 1}}:
					</text>
					<text>
						{{item.name}},
						{{item.real_money}}元,
						每日{{item.swap_image_num !== 0 ? `${item.swap_image_num}次图片换脸` : ''}},
						{{item.swap_video_num !== 0 ? `${item.swap_video_num}次视频换脸` : ''}},
						{{item.undress_num !== 0 ? `${item.undress_num}次脱衣` : ''}}
					</text>
				</view>
			</view>
			
			<wd-button block style="margin-bottom: 32rpx">立即支付</wd-button>
			<wd-button block plain style="margin-bottom: 32rpx">充值记录</wd-button>
		</view>
	</view>
</template>

<script setup>
	import {ref, reactive, shallowRef, onMounted, defineEmits} from "vue";
	import navigatorTop from "../navigator/navigatorTop.vue";
	
	const emit = defineEmits(["close"]);
	
	defineProps({
		showTop: {
			type: Boolean,
			default: () => true,
		}
	});
	
	const handleClose = () => {
		emit("close");
	};
	
	const coinListValue = ref(0);
	const coinList = ref([
		{
			id: 12,
			name: "赠送5金币",
			real_money: 30,
			gold: 35
		},
		{
			id: 11,
			name: "赠送19金币",
			real_money: 50,
			gold: 69
		},
		{
			id: 10,
			name: "赠送49金币",
			real_money: 100,
			gold: 149
		},
		{
			id: 9,
			name: "赠送119金币",
			real_money: 200,
			gold: 319
		},
		{
			id: 8,
			name: "赠送199金币",
			real_money: 300,
			gold: 499
		},
		{
			id: 7,
			name: "赠送219金币",
			real_money: 500,
			gold: 719
		}
	],);
	
	const vipListValue = ref(0)
	const vipList = ref([
		{
			id: 1,
			name: "VIP月卡",
			real_money: 100,
			undress_num: 1,
			swap_image_num: 2,
			swap_video_num: 0,
			swap_gif_num: 0
		},
		{
			id: 2,
			name: "VVIP月卡",
			real_money: 200,
			undress_num: 1,
			swap_image_num: 1,
			swap_video_num: 1,
			swap_gif_num: 0
		},
		{
			id: 3,
			name: "JVIP季卡",
			real_money: 300,
			undress_num: 1,
			swap_image_num: 2,
			swap_video_num: 1,
			swap_gif_num: 0
		},
		{
			id: 4,
			name: "SVIP半年卡",
			real_money: 500,
			undress_num: 1,
			swap_image_num: 3,
			swap_video_num: 2,
			swap_gif_num: 0
		}
	]);
	const selectedCoin = ref({})
	const selectedVip = ref({})
	const coinListValueChange = (id, type) => {
    if (type === 'coin') {
        updateSelection(id, coinListValue, coinList, selectedCoin, vipListValue, selectedVip);
    } else if (type === 'vip') {
        updateSelection(id, vipListValue, vipList, selectedVip, coinListValue, selectedCoin);
    }
	};

const updateSelection = (id, listValue, list, selectedItem, otherListValue, otherSelectedItem) => {
    listValue.value = id;
    const item = list.value.find(item => item.id === id);
    if (item) {
        selectedItem.value = item;
    }
    otherListValue.value = 0;
    otherSelectedItem.value = {};
};

	
	onMounted(() => {
		coinListValue.value = coinList.value[0].id;
		updateSelection(coinListValue.value, coinListValue, coinList, selectedCoin, vipListValue, selectedVip);
		
	});

</script>


<style scoped lang="scss">
	.rechargeList {
		padding: 20rpx;
		
		.titleContent {
			height: 42px;
			line-height: 42px;
			text-align: center;
			font-size: 32rpx;
			font-weight: bold;
			display: flex;
			justify-content: space-between;
			padding: 0 20rpx;
		}
		
		.coinList {
			margin-bottom: 32rpx;
			
			.coinContent {
				display: grid;
				grid-template-columns: repeat(2, 1fr); /* 每行两个项目，每个项目占据等宽的一半 */
				gap: 20rpx; /* 项目之间的间距 */
				
				.coinListItem {
					box-sizing: border-box;
					position: relative;
					background-color: #fff;
					padding: 20rpx;
					text-align: center;
					//border: 1px solid rgb(253, 193, 0);
					border-radius: 12rpx;
					
					.badge {
						position: absolute;
						top: -10rpx;
						right: -15rpx;
						background-color: #DE6683;
						color: #fff;
						font-size: 20rpx;
						padding: 4rpx 10rpx;
						line-height: 1.2;
						border-radius: 8rpx;
					}
				}
				
			}
			.payCoin {
				margin-top: 30rpx;
				display: grid;
				grid-template-columns: repeat(2, 1fr); /* 每行两个项目，每个项目占据等宽的一半 */
				gap: 20rpx; /* 项目之间的间距 */
				width: 100%;
			}
		}
		
		.vipDisc {
			font-size: 24rpx;
			margin-bottom: 32rpx;
			
			.vipLevel {
				color: #fdc100;
				font-weight: bold;
			}
		}
	}


</style>
