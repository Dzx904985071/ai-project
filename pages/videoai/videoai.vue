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
				<wd-grid-item v-for="item in modelList" use-slot @click="openDialog(item)">
					<view class="modelListSlot">
						<wd-img :src="item.video_image" style="width: 100%; height: 100%" :radius="8"></wd-img>
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
	import {httpRequest} from "../../utils/request";
	
	const current = ref('')
	const list = ref([
		// {
		// 	label: '热门',
		// 	value: '0'
		// },
		{
			label: '好乳',
			value: '1'
		},
		{
			label: '全镜',
			value: '2'
		},
		{
			label: '性爱',
			value: '3'
		},
		{
			label: '亚美',
			value: '4'
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
	
	const getModelList = async (type, order) => {
		try{
			const res = await httpRequest({
				url: '/',
				method: 'GET',
				data: {
					ct: 'ai',
					ac: 'swapVideoList',
					token: 'g/bJd4AK_IzeMJ3hhNpNdw==',
					page_size: 10,
					page: 1,
					order,
					type
				}
			})
			console.log(res)
			if(res.code === 1) {
				modelList.value = res.data.data
			}
		}
		catch(e) {
			console.log(e)
		}
		// modelList.value = [
		// 	{
		// 		id: 39,
		// 		created_at: "2024-07-31T03:30:56+08:00",
		// 		updated_at: "2024-12-21T23:11:07+08:00",
		// 		deleted_at: null,
		// 		label_id: 14,
		// 		name: "HOT 性爱0005-9s",
		// 		icon: "https://kankan991body.cyou/storage/tl_video/2024_07_29/1002417920141172736-thumb.jpg",
		// 		video_image: "https://kankan991body.cyou/storage/tl_video/2024_07_29/1002417920141172736.jpg",
		// 		video: "https://kankan991body.cyou/storage/tl_video/2024_07_29/1002417920145367040.mp4",
		// 		price: 18,
		// 		use_num: 1809,
		// 		status: 1
		// 	},
		// 	{
		// 		id: 124,
		// 		created_at: "2024-11-20T11:40:21+08:00",
		// 		updated_at: "2024-12-21T22:44:25+08:00",
		// 		deleted_at: null,
		// 		label_id: 14,
		// 		name: "HOT 性爱0041-12s",
		// 		icon: "https://kankan991body.cyou/storage/tl_video/2024-11-20/1043732504026030080-thumb.jpg",
		// 		video_image: "https://kankan991body.cyou/storage/tl_video/2024-11-20/1043732504026030080.jpg",
		// 		video: "https://kankan991body.cyou/storage/tl_video/2024-11-20/1043732504214773760.mp4",
		// 		price: 18,
		// 		use_num: 1514,
		// 		status: 1
		// 	},
		// ]
	}
	
	const showAiChangeFace = ref(false)
	const item = ref(void 0)
	const openDialog = (data) => {
		console.log(data)
		item.value = data
		showAiChangeFace.value = true
	}
	
	onMounted(() => {
		current.value = list.value[0].value
		getModelList(current.value)
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
			border: 1px dashed #de6682;;
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
