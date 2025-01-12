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
				<view id="upload" class="uploadButtonInner_noImg" @click="chooseImg">
					<wd-icon v-if="customFile === null" name="cloud-upload" size="45"></wd-icon>
					<view v-if="customFile === null" style="margin-bottom: 32rpx"></view>
					<view v-if="customFile === null">点击上传人物图片</view>
					<view v-if="customFile === null">图片大小不超过5MB</view>
				</view>
			</view>
			
			<view v-if="customFile" style="margin-bottom: 32rpx">
				
				<view style="width: 100%; display: flex; justify-content: space-between; align-items: center; font-weight: bold">
					<view>
						<text>消耗金币:&nbsp;</text>
						<text style="color: #fdc100;">{{ props.item.price }}</text>
						<text>, 会员次数:&nbsp</text>
						<text style="color: #fdc100;">0</text>
					</view>
					<wd-button style="" @click="deal">制作</wd-button>
				</view>
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
	import {getItem} from "../../../utils/auth";
	import baseUrl from "../../../utils/request";
	import emitter from "../../../utils/emitter";
	
	const emit = defineEmits(["close"]);
	
	const handleClose = () => {
		emit("close");
	};
	
	const props = defineProps({
		item: {
			type: Object,
			default: () => ({
				id: 0,
				type: "",
				title: "",
				price: null,
				video: null,
				video_image: null,
				num: "",
				created_at: "",
				updated_at: "",
				image: null,
			})
		}
	})
	
	const getFileNameFromMimeType = (mimeType) => {
		const mimeTypeToExtensionMap = {
			'image/jpeg': 'jpg',
			'image/png': 'png',
			'image/gif': 'gif',
			'application/pdf': 'pdf',
			'application/msword': 'doc',
			'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'docx',
			'application/vnd.ms-excel': 'xls',
			'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': 'xlsx',
			'application/zip': 'zip',
			'application/octet-stream': 'bin',
			// 添加更多 MIME 类型到后缀名的映射
		};
		
		return mimeTypeToExtensionMap[mimeType] || 'unknown';
	};
	
	const customFile = ref(null)
	
	const chooseImg = () => {
		uni.chooseImage({
			count: 1,
			sizeType: ['original', 'compressed'],
			sourceType: ['album', 'camera'],
			success: (res) => {
				console.log('图片路径为：', res.tempFilePaths[0])
				let blobUrl = res.tempFilePaths[0]
				document.getElementsByClassName('uploadButtonInner_noImg')[0].style.background = "url('" + blobUrl + "') no-repeat";
				document.getElementsByClassName('uploadButtonInner_noImg')[0].style.backgroundSize = "contain";
				document.getElementsByClassName('uploadButtonInner_noImg')[0].style.backgroundPosition = "center center";
				fetch(blobUrl)
					.then(response => response.blob())  // 将响应转换为 Blob
					.then(blob => {
						// 使用 File 构造函数将 Blob:URL 转换为 File 对象
						
						const mimeType = blob.type;
						const file = new File([blob], `upload_${Date.now()}.${getFileNameFromMimeType(mimeType)}`, { type: blob.type });
						customFile.value = file
						console.log(file)
						// 你可以在这里使用 file 对象进行后续操作，例如上传文件等
					})
					.catch(error => {
						console.error('Error fetching blob:', error);
					});
			},
			fail: (err) => {              //图片接口调用失败的回调函数
				console.log('chooseImage fail', err)
			},
		})
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
	
	const deal = async () => {
		if(customFile.value === null) {
			uni.showToast({
				title: '请上传人物图片',
				icon: 'error'
			})
		}
		let coin = JSON.parse(getItem('userInfo')).coin
		// console.log(coin)
		if(coin < Number(props.item.price)) {
			uni.showToast({
				title: '金币余额不足',
				icon: 'error'
			})
		}
		else {
			uni.showToast({
				title: '正在制作中...'
			})
			try {
				const params = {
					ct: "ai",
					ac: props.item.image.length > 0 ? 'imageSwap' : 'videoSwap',
					token: getItem('token'),
				}
				const queryString = Object.keys(params)
					.map(key => encodeURIComponent(key) + '=' + encodeURIComponent(params[key]))
					.join('&');
				console.log(queryString)
				const requestUrl = baseUrl.baseURL + '/?' + queryString;
				console.log(requestUrl)
				let formData = new FormData();
				formData.append('target_image', customFile.value);
				if(props.item.image?.length > 0) {
					formData.append('type', 2)
					formData.append('tl_image_id', props.item.id)
				}
				if(props.item.video_image?.length > 0) {
					formData.append('tl_video_id', props.item.id)
				}
				
				// for (let pair of formData.entries()) {
				// 	console.log(pair[0] + ': ' + pair[1]);
				// }
				
				fetch(requestUrl, {
					method: 'POST',
					body: formData, // 只有 FormData 数据
					// 不需要显式设置 Content-Type 头，因为浏览器会根据 FormData 自动设置
				}).then(response => {
					if (!response.ok) {
						throw new Error('Network response was not ok');
					}
					return response.json(); // 假定服务器返回 JSON 格式的数据
				})
					.then(data => {
						console.log('Server response:', data);
						uni.showToast({
							title: data.message,
							icon: 'none'
						})
						emitter.emit('refreshUser', 'refresh')
						// 在这里处理服务器返回的数据
					})
					.catch(error => {
						console.error('Error sending request:', error);
					});
			}
			catch(e) {
				console.log(e)
			}
		}
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
