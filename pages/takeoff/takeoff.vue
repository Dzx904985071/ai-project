<template>
	<view style="height: calc(100dvh - 142px); overflow-y: auto">
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
			<view id="upload" class="uploadButtonInner_noImg" @click="chooseImg">
				<wd-icon v-if="customFile === null" name="cloud-upload" size="45"></wd-icon>
				<view v-if="customFile === null" style="margin-bottom: 32rpx"></view>
				<view v-if="customFile === null">点击上传人物图片</view>
				<view v-if="customFile === null">图片大小不超过5MB</view>
			</view>
			<wd-button block style="margin-bottom: 32rpx" @click="deal">制作</wd-button>
			<view style="margin-bottom: 20rpx">
				<wd-text type="primary" text="效果示例图" bold></wd-text>
			</view>
			<wd-img src="/static/img/pages/takeoff/intro.png" class="introImg"></wd-img>
			<view style="margin-bottom: 20rpx">
				<wd-text type="primary" text="注意事项" bold></wd-text>
			</view>
			<view v-for="(item, index) in warningList" class="warningText">
				<wd-text :text="item" size="12">
					<template #prefix>
						<text>{{index + 1}}、</text>
					</template>
				</wd-text>
			</view>
		</view>
	</view>
</template>

<script setup>
	import {onMounted, ref} from "vue";
	import baseUrl from "../../utils/request.js";
	import emitter from "../../utils/emitter";
	import {getItem} from "../../utils/auth";
	
	const customFile = ref(null)
	const costPer = ref(10)

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
		success: (res) => {           //成功返回的函数
			// console.log('图片路径为：', res.tempFilePaths[0]) //选着的图片
			let blobUrl = res.tempFilePaths[0]
			document.getElementsByClassName('uploadButtonInner_noImg')[0].style.background = "url('" + blobUrl + "') no-repeat";
			document.getElementsByClassName('uploadButtonInner_noImg')[0].style.backgroundSize = "contain";
			document.getElementsByClassName('uploadButtonInner_noImg')[0].style.backgroundPosition = "center center";
			fetch(blobUrl)
				.then(response => response.blob())  // 将响应转换为 Blob
				.then(blob => {
					// 使用 File 构造函数将 Blob:URL 转换为 File 对象
					
					const mimeType = blob.type;
					customFile.value = new File([blob], `upload_${Date.now()}.${getFileNameFromMimeType(mimeType)}`, {type: mimeType})
					// console.log(customFile.value)
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

const deal = () => {
	if(customFile.value === null) {
		uni.showToast({
			title: '请上传人物图片',
			icon: 'error'
		})
		return
	}
	if(customFile.value.size > 5 * 1024 * 1024) {
		uni.showToast({
			title: '图片大小超过5MB',
			icon: 'error'
		})
		return
	}
	let coin = JSON.parse(getItem('userInfo')).coin
	// console.log(coin)
	if(coin < Number(costPer.value)) {
		uni.showToast({
			title: '金币余额不足',
			icon: 'error'
		})
	}
	else {
		try {
			uni.showToast({
				title: '正在制作中...'
			})
			const params = {
				ct: "ai",
				ac: 'undress',
				token: getItem('token'),
			}
			const queryString = Object.keys(params)
				.map(key => encodeURIComponent(key) + '=' + encodeURIComponent(params[key]))
				.join('&');
			// console.log(queryString)
			
			// console.log(baseUrl.baseURL)
			
			const requestUrl = baseUrl.baseURL + '/?' + queryString;
			console.log(requestUrl)
			
			let formData = new FormData();
			formData.append('source_image', customFile.value);
			formData.append('type', 1)
			formData.append('und_type', 'und')
			for (let pair of formData.entries()) {
				console.log(pair[0] + ': ' + pair[1]);
			}
			
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

const warningList = ref([
	'素材仅供AI使用，绝无外泄风险，请放心使用。',
	'素材清晰且小于 5Mb。',
	'本功能不支持多人图片，脸部无遮挡物（眼镜、刘海等）。',
	'生成失败返回金币。',
	'近距离大头照会致生成失败，禁止使用未成年人图片！'
])


// 获取平台信息
onMounted(() => {
  // console.log(process.env.UNI_PLATFORM)
	// console.log(process.env)
	console.log(uni.getDeviceInfo())
})
</script>

<style lang="scss">
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
		
		.introImg {
			width: calc(100dvw - 40rpx);
			height: 540rpx;
			margin-bottom: 32rpx
		}
		
		.warningText {
			font-size: 24rpx;
			margin-bottom: 16rpx;
			color: #999999;
		}
		
		.warningText:last-child {
			font-size: 24rpx;
			margin-bottom: 0;
		}
	}
	
</style>
