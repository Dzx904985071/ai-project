<template>
	<view>
		<wd-tabbar
			v-model="tabbar"
			:inactive-color="'#ffffff'"
			bordered fixed placeholder
			safeAreaInsetBottom
			@change="handleChange"
		>
			<wd-tabbar-item
				:icon="tabbar !== 'takeoff' ? '/static/img/components/navigator/fire_deactivate.svg' : '/static/img/components/navigator/fire_activate.svg'"
				name="takeoff"
				title="AI脱衣"
			>
			</wd-tabbar-item>
			<!--<wd-tabbar-item name="tumo" title="手动脱衣" icon="thumb-up">-->
			<!--</wd-tabbar-item>-->
			<wd-tabbar-item icon="picture" name="imgai" title="图片换脸">
			</wd-tabbar-item>
			<!--<wd-tabbar-item name="videoai" title="视频换脸" icon="video">-->
			<!--</wd-tabbar-item>-->
			<wd-tabbar-item icon="user" name="my" title="我的"></wd-tabbar-item>
		</wd-tabbar>
	</view>
</template>

<script setup>
	import { ref, onMounted } from 'vue'
	
	const tabbar = ref('takeoff')
	
	const handleChange = ({ value }) => {
		console.log(value)
	}
	
	onMounted(() => {
	
	})
	
</script>


<style lang="scss" scoped>

</style>
