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
				:icon="tabBar !== 'takeoff' ? '/static/img/components/navigator/fire_deactivate.svg' : '/static/img/components/navigator/fire_activate.svg'"
				name="takeoff"
				title="AI脱衣"
			>
			</wd-tabbar-item>
			<wd-tabbar-item name="tumo" title="手动脱衣" icon="thumb-up">
			</wd-tabbar-item>
			<wd-tabbar-item icon="picture" name="imgai" title="图片换脸">
			</wd-tabbar-item>
			<wd-tabbar-item name="videoai" title="视频换脸" icon="video">
			</wd-tabbar-item>
			<wd-tabbar-item icon="user" name="my" title="我的"></wd-tabbar-item>
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
