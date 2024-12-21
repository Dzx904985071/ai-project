<template>
	<view>
		<navigator-top :showNotice="false"></navigator-top>
		<wd-navbar :bordered="false" :shape="'round'">
			<template #capsule>
				<wd-icon name="chevron-left" size="28" @click="handleClose"></wd-icon>
			</template>
			<template #title>
				<view style="font-weight: bold; font-size: 32rpx">
					{{ props.item.name }}
				</view>
			</template>
		</wd-navbar>
		<view class="itemContent">
			<view class="videoAndImgWithUpload">
				<img :src="props.item.video_image ?? props.item.image" alt="" style="width: 50%" @click="previewPopup = true">
				<wd-upload
					:action="uploadAction"
					:max-size="5242880"
					:limit="1"
					action="https://ftf.jd.com/api/uploadImg"
					@change="handleChange"
				>
					<view class="uploadButtonInner_noImg">
						<wd-icon name="cloud-upload" size="45"></wd-icon>
						<view style="margin-bottom: 32rpx"></view>
						<view>点击上传人物图片</view>
						<view>图片大小不超过5MB</view>
					</view>
				</wd-upload>
			</view>
			
			<view style="margin-bottom: 20rpx">
				<wd-text type="primary" text="注意事项" bold></wd-text>
			</view>
			
			<img src="/static/img/components/aiChangeFace/notice.jpg" alt="" width="100%">
			
			<view v-for="(item, index) in warningList" class="warningText">
				<wd-text :text="item" size="12">
					<template #prefix>
						<text>{{index + 1}}、</text>
					</template>
				</wd-text>
			</view>
		</view>
		
		<view class="buttonContent">
		
		</view>
		
		<wd-popup
			v-if="previewPopup"
			v-model="previewPopup"
			:closable="true"
			custom-style="border-radius: 32rpx; height: calc(100dvh - 88rpx); width: 100dvw; display: flex; justify-content: center; align-items: center; z-index: 999999; padding-top: 80rpx"
			position="bottom"
			transition="fade"
			@close="previewPopup = false"
		>
			<img v-if="!props.item.video" :src="props.item.image" alt="" width="100%" />
			<video v-else :src="props.item.video" controls style="width: 100%; height: 100%"/>
		</wd-popup>
		
	</view>
</template>

<script setup>
	import {ref, reactive, shallowRef, onMounted, defineEmits} from "vue";
	import navigatorTop from "../../components/navigator/navigatorTop.vue";
	
	const emit = defineEmits(["close"]);
	
	const handleClose = () => {
		emit("close");
	};
	
	const props = defineProps({
		item: {
			type: Object,
			default: () => ({
				id: 0,
				created_at: "",
				updated_at: "",
				deleted_at: null,
				label_id: 0,
				name: "",
				icon: "",
				image: "",
				price: 10,
				use_num: 0,
				status: 1,
				video_image: "",
				video: "",
			})
		}
	})
	
	const uploadAction = ref('https://ftf.jd.com/api/uploadImg')
	
	const handleChange = () => {
	
	}
	
	const warningList = ref([
		'素材仅供AI使用，绝无外泄风险，请放心使用。',
		'素材清晰且小于5Mb。',
		'本功能不支持多人图片，脸部无遮挡物（眼镜、刘海等）。',
		'生成失败返回金币。',
		'近距离大头照会致生成失败，禁止使用未成年人图片！'
	])
	
	const previewPopup = ref(false)
	const ifVideo = (url) => {
		return url.indexOf(".mp4") > -1
	}
	
	onMounted(() => {
		console.log(props.item.video_image)
	})
	
</script>


<style scoped lang="scss">
 .itemContent {
	 padding: 20rpx;
	 
	 .videoAndImgWithUpload {
		 display: flex;
		 gap: 20rpx;
		 align-items: center;
		 width: calc(100% - 40rpx);
		 margin-bottom: 32rpx;
		 
		 .uploadButtonInner_noImg {
			 height: 400rpx;
			 width: calc(50dvw - 20rpx);
			 text-align: center;
			 color: #a6a8aa;
			 background: #fff;
			 border: 1px dashed #de6682;
			 border-radius: 10rpx;
			 display: flex;
			 flex-direction: column;
			 justify-content: center;
			 align-items: center;
			 margin-bottom: 32rpx
		 }
	 }
 }
</style>
