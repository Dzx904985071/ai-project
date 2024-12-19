<template>
	<view class="imgaiContent">
		<!--视频换脸-->
		<wd-segmented :options="list" v-model:value="current" size="small" >
			<template #label="{ option }">
				<view class="section-slot">
					<view class="name">{{ option.label }}</view>
				</view>
			</template>
		</wd-segmented>
		<view class="sortButton">
			<wd-sort-button title="上架时间" allow-reset v-model="uploadTime"/>
			<wd-sort-button title="使用次数" allow-reset v-model="usedTime"/>
			<wd-sort-button title="价格" allow-reset v-model="price"/>
		</view>
		
		<view class="modelList">
			<wd-grid :bg-color="'transparent'" :column="2" :gutter="10">
				<wd-grid-item v-for="item in modelList" use-slot>
					<view class="modelListSlot">
						<wd-img :src="item.img" style="width: 100%; height: 100%" :radius="8"></wd-img>
						<view>{{ item.name }}</view>
						<view class="coinCost">
							<wd-img
								:height="14"
								:width="14"
								src="/static/img/components/navigator/coin.png"
								style="margin: auto"
							>
							</wd-img>
							<view style="font-weight: bold; color: #fdc100;">
								{{ item.price }}
							</view>
						</view>
					</view>
				</wd-grid-item>
			</wd-grid>
		</view>
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
	
	// 选中的箭头方向：1 升序，0 重置状态，-1 降序。
	const uploadTime = ref(0)
	const usedTime = ref(0)
	const price = ref(0)
	
	const uploadAction = ref('https://ftf.jd.com/api/uploadImg')
	
	const handleChange = () => {
	
	}
	
	const modelList = ref([])
	
	const getModelList = () => {
		modelList.value = [
			{
				img: '/static/img/imgai/testImg.jpg',
				cost: 101,
				name: '测试模板',
				uploadTime: '',
				usedTime: 20,
				price: 10,
			},
			{
				img: '/static/img/imgai/testImg.jpg',
				cost: 101,
				name: '测试模板',
				uploadTime: '',
				usedTime: 20,
				price: 10,
			},
		]
	}
	
	onMounted(() => {
		getModelList()
	})

</script>


<style scoped lang="scss">
	.imgaiContent{
		padding: 24rpx;
		
		.sortButton {
			display: flex;
			justify-content: flex-end;
			gap: 12rpx;
		}
		
		.uploadButtonInner_noImg {
			height: 100rpx;
			width: calc(100dvw - 40rpx);
			text-align: center;
			color: #cdcdcd;
			background: rgba(16, 133, 250, 0.1);
			border: 1px dashed #10c5fa;
			border-radius: 10rpx;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
		}
		
		.modelList {
			
			.modelListSlot {
				position: relative;
				height: 462rpx;
				display: flex;
				flex-direction: column;
				justify-content: center;
				
				.coinCost {
					background: rgba(0,0,0,.5);
					position: absolute;
					right: 12rpx;
					top: 12rpx;
					display: flex;
					height: 32rpx;
					padding: 6rpx 12rpx;
					border-radius: 12rpx;
				}
			}
		}
	}

</style>
