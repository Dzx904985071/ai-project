<template>
	<view class="container">
		<wd-config-provider theme="dark" :theme-vars="themeVars">
			<!--顶栏-->
			<wd-sticky v-if="currentPage !== 'my'" :offset-top="-44">
				<NavigatorTop style="width: 100dvw" ></NavigatorTop>
			</wd-sticky>
			
			<!-- 内容区域 -->
			<view class="content">
				
				<!-- 使用动态组件渲染当前页面 -->
				<component :is="components[currentPage]" />
			</view>

			<!-- 底部导航栏 -->
			<NavigatorBottom @update="handleUpdate"></NavigatorBottom>
			
			<!--消息提示-->
			<wd-notify />
		</wd-config-provider>
	</view>
</template>

<script setup>
	import { ref, reactive, shallowRef, onMounted } from 'vue';
	import NavigatorBottom from "./components/navigator/navigatorBottom.vue";
	import takeoff from "./takeoff/takeoff.vue";
	import imgai from "./imgai/imgai.vue";
	import my from "./my/my.vue";
	import videoai from './videoai/videoai.vue'
	import tumo from './tumo/tumo.vue'
	import NavigatorTop from "./components/navigator/navigatorTop.vue";
	
	const components = {
		takeoff,
		imgai,
		my,
		videoai,
		tumo
	};
	
	const currentPage = ref('takeoff'); // 默认页面是 'takeoff'
	
	const themeVars = reactive({
		colorTheme: '#10c5fa'
	})
	
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
