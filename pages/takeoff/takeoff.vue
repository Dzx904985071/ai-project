<template>
	<view class="content">
		<image class="logo" src="/static/logo.png"></image>
		<view class="text-area">
			<text class="title">{{title}}</text>
		</view>
		
	</view>
</template>

<script setup>
import { ref, onMounted } from 'vue'

// 定义响应式数据
const title = ref('Hello')


// 获取平台信息
onMounted(() => {
  console.log(process.env.UNI_PLATFORM)
	console.log(process.env)
})
</script>

<style lang="scss">
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		
		.logo {
			height: 200rpx;
			width: 200rpx;
			margin: 200rpx auto 50rpx;
		}
		
		.text-area {
			display: flex;
			justify-content: center;
			
			.title {
				font-size: 36rpx;
				color: #8f8f94;
			}
		}
	}

</style>
