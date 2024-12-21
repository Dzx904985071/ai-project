<template>
	<view class="imgaiContent">
		<!--图片换脸-->
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
		
		<wd-upload
			:action="uploadAction"
			:max-size="5242880"
			:limit="1"
			action="https://ftf.jd.com/api/uploadImg"
			@change="handleChange"
		>
			<view class="uploadButtonInner_noImg">
				<view style="display: flex; justify-content: center; align-items: center">
					<wd-icon name="cloud-upload" size="32" style="margin-right: 12rpx;"></wd-icon>
					<wd-text text="点击上传自定义模板"></wd-text>
				</view>
			</view>
		</wd-upload>
		
		<view class="modelList">
			<wd-grid :bg-color="'transparent'" :column="2" :gutter="10">
				<wd-grid-item v-for="item in modelList" use-slot @click="openDialog(item)">
					<view class="modelListSlot">
						<wd-img :src="item.image" style="width: 100%; height: 100%" :radius="8"></wd-img>
						<view>{{ item.name }}</view>
						<view class="coinCost">
							<wd-img
								:height="14"
								:width="14"
								src="/static/img/components/navigator/coin.png"
								style="margin: auto 5rpx auto auto;"
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
		
		<view v-if="showAiChangeFace" class="aiChangeFace">
			<aiChangeFace @close="showAiChangeFace = false" :item="item"></aiChangeFace>
		</view>
	</view>
</template>

<script setup>
	import { ref, reactive, shallowRef, onMounted } from 'vue';
	import aiChangeFace from '../components/aiChangeFace/aiChangeFace.vue'
	
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
				id: 132,
				created_at: "2024-11-20T14:51:08+08:00",
				updated_at: "2024-12-21T22:13:06+08:00",
				deleted_at: null,
				label_id: 16,
				name: "若隐若现",
				icon: "https://kankan991body.cyou/storage/tl_image/2024-11-20/1043780519419977728-thumb.jpg",
				image: "https://kankan991body.cyou/storage/tl_image/2024-11-20/1043780519419977728.jpg",
				price: 10,
				use_num: 1485,
				status: 1
			},
			{
				id: 132,
				created_at: "2024-11-20T14:51:08+08:00",
				updated_at: "2024-12-21T22:13:06+08:00",
				deleted_at: null,
				label_id: 16,
				name: "若隐若现",
				icon: "https://kankan991body.cyou/storage/tl_image/2024-11-20/1043780519419977728-thumb.jpg",
				image: "https://kankan991body.cyou/storage/tl_image/2024-11-20/1043780519419977728.jpg",
				price: 10,
				use_num: 1485,
				status: 1
			},
		]
	}
	
	const showAiChangeFace = ref(false)
	
	const item = ref(void 0)
	const openDialog = (data) => {
		console.log(data)
		item.value = data
		showAiChangeFace.value = true
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
		 background: #fff;
		 border: 1px dashed #de6682;
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
				 background: #DE6682;
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
	 
	 .aiChangeFace {
		 position: absolute;
		 top: 0;
		 left: 0;
		 width: 100dvw;
		 height: 100dvh;
		 background: #F5F5F5;
		 z-index: 999;
	 }
 }
 
</style>
