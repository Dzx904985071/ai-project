<template>
	<view class="imgaiContent">
		<!--图片换脸-->
		<wd-segmented :options="list" v-model:value="current" size="small">
			<template #label="{ option }">
				<view class="section-slot">
					<view class="name">{{ option.label }}</view>
				</view>
			</template>
		</wd-segmented>
	</view>
</template>

<script setup>
	import { ref, reactive, shallowRef, onMounted } from 'vue';
	
	const current = ref(0)
	const list = ref([
		{
			label: '热门',
			value: 0
		},
		{
			label: '好乳',
			value: 1
		},
		{
			label: '全镜',
			value: 2
		},
		{
			label: '性爱',
			value: 3
		},
		{
			label: '亚美',
			value: 4
		}
	])
	
</script>


<style scoped lang="scss">
 .imgaiContent{
	 padding: 24rpx
 }
</style>
