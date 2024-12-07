<template>
	<view class="container">
		<wd-config-provider theme="dark">
			<!-- 内容区域 -->
			<view class="content">
				<!-- 使用动态组件渲染当前页面 -->
				<component :is="currentPage" />
			</view>

			<!-- 底部导航栏 -->
			<NavigatorBottom @update="handleUpdate"></NavigatorBottom>
		</wd-config-provider>
	</view>
</template>

<script setup>
	import { ref, reactive } from 'vue';
	import NavigatorBottom from "./components/navigator/navigatorBottom.vue";
	import takeoff from "./takeoff/takeoff.vue";
	import imgai from "./imgai/imgai.vue";
	import my from "./my/my.vue";
	
	const currentPage = ref('takeoff')
	
	const handleUpdate = (value) => {
		currentPage.value = value
	}
</script>


<style scoped lang="scss">
	.wot-theme-dark body {
		color: #f5f5f5;
		background-color: black;
	}
</style>
