<template>
	<view>
		<NavigatorTop></NavigatorTop>
		<view class="content">
			ai脱衣
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

</style>
