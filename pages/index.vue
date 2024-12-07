<template>
	<view class="container">
		<wd-config-provider theme="dark">
			<!-- 内容区域 -->
			<view class="content">
				<!-- 使用动态组件渲染当前页面 -->
				<component :is="components[currentPage]" />
			</view>

			<!-- 底部导航栏 -->
			<NavigatorBottom @update="handleUpdate"></NavigatorBottom>
		</wd-config-provider>
	</view>
</template>

<script setup>
	import { ref, reactive, shallowRef } from 'vue';
	import NavigatorBottom from "./components/navigator/navigatorBottom.vue";
	import takeoff from "./takeoff/takeoff.vue";
	import imgai from "./imgai/imgai.vue";
	import my from "./my/my.vue";
	
	const components = {
		takeoff,
		imgai,
		my
	};
	
	const currentPage = ref('takeoff'); // 默认页面是 'takeoff'
	
	// 更新页面时根据字符串更新 currentPage
	const handleUpdate = (value) => {
		currentPage.value = value; // 只需要更新 currentPage 的值
	};
</script>

<style scoped lang="scss">
	.wot-theme-dark body {
		color: #f5f5f5;
		background-color: black;
	}
</style>
