<template>
	<view class="tumo-container">
		<view class="header">
			<wd-icon name="arrow-left" size="20" @click="goBack"></wd-icon>
			<view style="font-weight: bold;">自定义涂抹</view>
			<view>
				<wd-button type="primary" size="small" @click="handleSubmit"
				>
					制作
				</wd-button>
			</view>
		</view>
		<img class="tumoContentImg" :src="props.targetBlobUrl" alt="" />
		<view class="tumoCanvasClass" :style="tumoCanvasStyle">
			<canvas
				type="2d"
				:canvas-id="canvasId"
				:style="tumoCanvasStyle"
				@touchstart="startDrawing"
				@touchmove="draw"
				@touchend="endDrawing"
			></canvas>
			
		</view>
	</view>
</template>

<script setup>
	import {
		ref,
		onMounted,
		onUnmounted
} from 'vue'
import baseUrl from "../../../utils/request.js";
import {getItem} from "../../../utils/auth";

	const props = defineProps({
		targetBlobUrl: {
			type: String,
			default: () => ''
		},
		customFile: {
			type: Object,
			default: () => {}
		}
	})

	const emit = defineEmits(['close'])

	const canvasId = ref('tumoCanvas')
	const targetBlobImgDetails = ref({
		width: '',
		height: ''
	})
	const tumoCanvasStyle = ref(null)

	const canvasCtx = ref(null);
	const lastX = ref(0);
	const lastY = ref(0);
	const drawing = ref(false);
	const canvasPosition = ref({ left: 0, top: 0 })

	// 返回上一页
	const goBack = () => {
		emit('close')
	}

	// 获取canvas位置
	const getCanvasPosition = () => {
		const query = uni.createSelectorQuery()
		query.select(`canvas[canvas-id="${canvasId.value}"]`).boundingClientRect(data => {
			if (data) {
				canvasPosition.value = {
					left: data.left,
					top: data.top
				}
			}
		}).exec()
	}

	// 开始绘制
	const startDrawing = (event) => {
		drawing.value = true;
		const { x, y } = event.touches[0];
		lastX.value = x - canvasPosition.value.left
		lastY.value = y - canvasPosition.value.top
	}

	// 绘制过程
	const draw = (event) => {
		if (!drawing.value || !canvasCtx.value) return;
		const { x, y } = event.touches[0];
		const currentX = x - canvasPosition.value.left
		const currentY = y - canvasPosition.value.top
		const ctx = canvasCtx.value;

		ctx.beginPath();
		ctx.moveTo(lastX.value, lastY.value);
		ctx.lineTo(currentX, currentY);
		ctx.strokeStyle = 'white';
		ctx.lineWidth = 20;
		ctx.lineCap = 'round';
		ctx.stroke();
		ctx.draw(true);

		lastX.value = currentX;
		lastY.value = currentY;
	}

	// 结束绘制
	const endDrawing = () => {
		drawing.value = false;
	}

	// 提交处理
	const handleSubmit = async () => {
		try {
			const res = await new Promise((resolve, reject) => {
				uni.canvasToTempFilePath({
					canvasId: canvasId.value,
					fileType: 'png',
					success: (res) => {
						console.log(res);
						resolve(res)
					},
					fail: (err) => {
						reject(err)
					}
				})
			})

			console.log('涂抹图片:', res.tempFilePath)
			console.log('原图:', props.targetBlobUrl)

			// 构建FormData
			const formData = new FormData()
			formData.append('und_type', 'und')
			formData.append('type', '2')

			// 将base64转换为Blob
			const base64Data = res.tempFilePath.split(',')[1]
			const byteCharacters = atob(base64Data)
			const byteNumbers = new Array(byteCharacters.length)
			for (let i = 0; i < byteCharacters.length; i++) {
				byteNumbers[i] = byteCharacters.charCodeAt(i)
			}
			const byteArray = new Uint8Array(byteNumbers)
			const maskBlob = new Blob([byteArray], { type: 'image/png' })

			// 添加文件到FormData
			formData.append('source_image', props.customFile)
			formData.append('mask_image', maskBlob, 'mask.png')

			const params = {
				ct: "ai",
				ac: 'undress',
				token: getItem('token'),
			}
			const queryString = Object.keys(params)
				.map(key => encodeURIComponent(key) + '=' + encodeURIComponent(params[key]))
				.join('&');
			const url = `${baseUrl.baseURL}/?${queryString}`
			// 发送请求
			const response = await fetch(url, {
				method: 'POST',
				body: formData
			})

			if (!response.ok) {
				throw new Error('Network response was not ok')
			}

			const data = await response.json()
			console.log('上传成功:', data)
			console.log('Server response:', data);
			
			uni.showToast({
				title: data.message,
				icon: 'success'
			})
			emit('close')

		} catch(error) {
			console.error('提交失败:', error)
			uni.showToast({
				title: '提交失败',
				icon: 'error'
			})
		}
	}

	onMounted(() => {
		console.log(props.customFile);
		const img = new Image()
		img.src = props.targetBlobUrl
		img.onload = () => {
			const screenWidth = screen.width
			const height = (screenWidth / img.naturalWidth) * img.naturalHeight

			tumoCanvasStyle.value = {
				width: screenWidth + 'px',
				height: height + 'px'
			}

			// 获取canvas上下文
			canvasCtx.value = uni.createCanvasContext(canvasId.value)

			// 设置画布大小
			canvasCtx.value.width = screenWidth
			canvasCtx.value.height = height

			// 初始化画布
			const ctx = canvasCtx.value
			ctx.fillStyle = '#000000'
			ctx.fillRect(0, 0, canvas.width, canvas.height)
			ctx.draw()

			// 获取canvas位置
			getCanvasPosition()
		};
	})
</script>

<style scoped lang="scss">
.tumo-container {
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100vh;
	overflow: hidden;
	background: #f5f5f5;
}

.header {
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	height: 44px;
	background: #fff;
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 0 16px;
	z-index: 999999;
}

.tumoContentImg {
	width: 100%;
	position: absolute;
	top: 44px;
	left: 0
}

.tumoCanvasClass {
	position: absolute;
	top: 44px;
	left: 0;
	z-index: 999999
}
</style>
