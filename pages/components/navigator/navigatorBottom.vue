<template>
	<view>
		<wd-tabbar
			v-model="tabBar"
			:bordered="false"
			:inactive-color="'#969696'" bordered fixed
			placeholder
			safeAreaInsetBottom
			@change="handleChangeNav"
		>
			<wd-tabbar-item
				:icon="tabBar !== 'takeoff' ? '/static/img/components/navigator/takeoff_deactivate.png' : '/static/img/components/navigator/takeoff_activate.png'"
				name="takeoff"
				title="AI脱衣"
			>
			</wd-tabbar-item>
			<wd-tabbar-item
				:icon="tabBar !== 'tumo' ? '/static/img/components/navigator/tumo_deactivate.png' : '/static/img/components/navigator/tumo_activate.png'"
				name="tumo"
				title="手动脱衣"
			>
			</wd-tabbar-item>
			<wd-tabbar-item
				:icon="tabBar !== 'imgai' ? '/static/img/components/navigator/imgai_deactivate.png' : '/static/img/components/navigator/imgai_activate.png'"
				name="imgai"
				title="图片换脸"
			>
			</wd-tabbar-item>
			<wd-tabbar-item
				:icon="tabBar !== 'videoai' ? '/static/img/components/navigator/videoai_deactivate.png' : '/static/img/components/navigator/videoai_activate.png'"
				name="videoai"
				title="视频换脸"
			>
			</wd-tabbar-item>
			<!--<wd-tabbar-item-->
			<!--	:icon="tabBar !== 'my' ? '/static/img/components/navigator/my_deactivate.png' : '/static/img/components/navigator/my_activate.png'"-->
			<!--	name="my"-->
			<!--	title="我的"-->
			<!--&gt;</wd-tabbar-item>-->
		</wd-tabbar>
	</view>
</template>

<script setup>
	import { ref, onMounted, defineEmits, inject, onBeforeUnmount } from 'vue'
	
	const tabBar = ref('takeoff')
	
	// 子传父
	const emit = defineEmits(['update'])
	// 跨组件
	import emitter from '/utils/emitter.js'  // 引入事件总线
	
	const handleChangeNav = ({ value }) => {
		console.log(value)
		emit('update', value)
	}
	
	onMounted(() => {
		emitter.on('goTakeOff', (value) => {
			tabBar.value = value
			emit('update', value)
		})
	})
	
	onBeforeUnmount(() => {
		emitter.off('goTakeOff')
	})
	
</script>


<style lang="scss" scoped>

</style>
