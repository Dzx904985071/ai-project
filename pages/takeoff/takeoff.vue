<template>
	<view>
		<NavigatorTop></NavigatorTop>
		<view class="content">
			<view class="titleContent">
				单张制作费用:
				<text style="color: #fdc100;">
					<wd-img
						:height="14"
						:width="14"
						src="/static/img/components/navigator/coin.png"
					>
					</wd-img>
					0
				</text>
				, 会员次数:
				<text style="color: #fdc100;">
					0
				</text>
			</view>
			
		</view>
	</view>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import NavigatorTop from "../components/navigator/navigatorTop.vue";



// 获取平台信息
onMounted(() => {
  console.log(process.env.UNI_PLATFORM)
	console.log(process.env)
})
</script>

<style lang="scss">
	.titleContent {
		height: 42px;
		line-height: 42px;
		text-align: center;
		background: #10c5fa;
		font-weight: bold;
	}
</style>
