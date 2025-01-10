<template>
	<view class="tumo-page">
		<view class="titleContent">
			<view>
				单张制作费用:
				<text style="color: #fdc100;">
					<wd-img
						:height="14"
						:width="14"
						src="/static/img/components/navigator/coin.png"
					>
					</wd-img>
					{{costPer}}
				</text>
			</view>
			<view>
				会员次数:
				<text style="color: #fdc100;">
					0
				</text>
			</view>
		</view>
		<view class="contentInner">
			<view class="uploadButtonInner_noImg" @click="chooseImg">
				<wd-icon v-if="customFile === null" name="cloud-upload" size="45"></wd-icon>
				<view v-if="customFile === null" style="margin-bottom: 32rpx"></view>
				<view v-if="customFile === null">点击上传人物图片</view>
				<view v-if="customFile === null">图片大小不超过5MB</view>
			</view>
			<view class="buttonGroup">
				<wd-button style="flex: 1; border-radius: 12rpx" @click="tumo">涂抹</wd-button>
				<wd-button type="warning" style="border-radius: 12rpx">教程</wd-button>
			</view>
			<view style="margin-bottom: 20rpx">
				<wd-text type="primary" text="操作流程" bold></wd-text>
			</view>
			<view v-for="(item, index) in doList" :key="index" class="warningText">
				<wd-text :text="item" size="12">
					<template #prefix>
						<text>{{index + 1}}、</text>
					</template>
				</wd-text>
			</view>
			<view style="margin-bottom: 20rpx">
				<wd-text type="primary" text="注意事项" bold></wd-text>
			</view>
			<view v-for="(item, index) in warningList" :key="index" class="warningText">
				<wd-text :text="item" size="12">
					<template #prefix>
						<text>{{index + 1}}、</text>
					</template>
				</wd-text>
			</view>
		</view>
		<view
			class="tumoContent"
			v-if="showTumo"
		>
			<tumo-canvas
				:target-blob-url="targetBlobUrl"
				:custom-file="customFile"
				@close="closeTumo"
			></tumo-canvas>
		</view>
	</view>
</template>

<script setup>
	import {onMounted, ref, shallowRef} from "vue";
	import TumoCanvas from "../components/canvas/tumoCanvas.vue";
	
	const customFile = ref(null)
	const tumoFile = ref(null)
	const showTumo = ref(false)
	const costPer = ref(10)
	const targetBlobUrl = ref(null)
	
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
	
	const chooseImg = () => {
		uni.chooseImage({
			count: 1,
			sizeType: ['original', 'compressed'],
			sourceType: ['album', 'camera'],
			success: (res) => {
				// console.log('图片路径为：', res.tempFilePaths[0]) //选着的图片
				targetBlobUrl.value = res.tempFilePaths[0]
				document.getElementsByClassName('uploadButtonInner_noImg')[0].style.background = "url('" + targetBlobUrl.value + "') no-repeat";
				document.getElementsByClassName('uploadButtonInner_noImg')[0].style.backgroundSize = "contain";
				document.getElementsByClassName('uploadButtonInner_noImg')[0].style.backgroundPosition = "center center";

				fetch(targetBlobUrl.value)
					.then(response => response.blob())
					.then(async blob => {
						const mimeType = blob.type;
						customFile.value = new File([blob], `upload_${Date.now()}.${getFileNameFromMimeType(mimeType)}`, {type: mimeType})
						console.log(customFile.value)
						console.log(await getImageSize(customFile.value))
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
	
	// 获取图片宽高
	const getImageSize = (file) => {
		return new Promise((resolve, reject) => {
			const img = new Image();
			const objectUrl = URL.createObjectURL(file);
			
			img.onload = () => {
				URL.revokeObjectURL(objectUrl); // 清理内存
				resolve({ width: img.width, height: img.height });
			};
			
			img.onerror = reject;
			
			img.src = objectUrl; // 设置 src 属性
		});
	}
	
	const doList = ref([
		'点击上传需要脱衣的素材图片。',
		'涂抹 遮蔽 需要去除的衣物 。',
		'点击 【生成/支付后】 即可到 【我的/个人中心】 查看生成记录。'
	])
	
	const warningList = ref([
		'素材仅供AI使用，绝无外泄风险，请放心使用。',
		'素材清晰且小于 5Mb。',
		'本功能不支持多人图片，脸部无遮挡物（眼镜、刘海等）。',
		'生成失败返回金币。',
		'近距离大头照会致生成失败，禁止使用未成年人图片！'
	])
	
	const tumo = () => {
		if (customFile.value == null) {
			uni.showToast({
				title: '请先上传图片',
				icon: 'none'
			})
		}
		else {
			showTumo.value = true
			let dom = document.getElementsByClassName('tumo-page')[0]
			dom.style.overflow = 'hidden'
		}
	}
	
	const closeTumo = () => {
		showTumo.value = false
		let dom = document.getElementsByClassName('tumo-page')[0]
		dom.style.overflow = 'auto'
	}
	
	// 获取平台信息
	onMounted(() => {
	})
</script>

<style lang="scss">
	.tumo-page {
		height: 100vh;
		overflow: hidden;
	}
	
	.titleContent {
		height: 42px;
		line-height: 42px;
		text-align: center;
		font-size: 32rpx;
		font-weight: bold;
		display: flex;
		justify-content: space-between;
		padding: 0 20rpx;
	}
	
	.contentInner {
		padding: 20rpx;
		
		.uploadButtonInner_noImg {
			height: 400rpx;
			width: calc(100dvw - 40rpx);
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
		
		.buttonGroup {
			display: flex;
			gap: 24rpx;
			margin-bottom: 32rpx;
			align-items: center;
		}
		
		.warningText {
			margin-bottom: 16rpx;
		}
		
		.warningText:last-child {
			margin-bottom: 0;
		}
	}
	
	.tumoContent {
		position: absolute;
		top: 0;
		left: 0;
		z-index: 99999;
		width: 100dvw;
		height: 100vh;
		background:#f5f5f5;
		overflow: hidden;
	}
</style>
