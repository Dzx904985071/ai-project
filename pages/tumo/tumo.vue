<template>
	<view>
		<view class="titleContent">
			单张制作费用:
			<text style="color: #fdc100;">
				<wd-img
					:height="14"
					:width="14"
					src="/static/img/components/navigator/coin.png"
				>
				</wd-img>
				0
			</text>
			, 会员次数:
			<text style="color: #fdc100;">
				0
			</text>
		</view>
		<view class="contentInner">
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
			<view class="buttonGroup">
				<wd-button style="flex: 1">涂抹</wd-button>
				<wd-button block plain style="">教程</wd-button>
			</view>
			<view style="margin-bottom: 20rpx">
				<wd-text type="primary" text="操作流程" bold></wd-text>
			</view>
			<view v-for="(item, index) in doList" class="warningText">
				<wd-text :text="item" size="12">
					<template #prefix>
						<text>{{index + 1}}、</text>
					</template>
				</wd-text>
			</view>
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
	import {ref, onMounted} from 'vue'
	import NavigatorTop from "../components/navigator/navigatorTop.vue";
	
	const fileList = ref([
		{
			url: ''
		}
	])
	const uploadAction = ref('https://ftf.jd.com/api/uploadImg')
	
	const handleChange = () => {
	
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
	
	// 获取平台信息
	onMounted(() => {
	})
</script>

<style lang="scss">
	.titleContent {
		height: 42px;
		line-height: 42px;
		text-align: center;
		background: #10c5fa;
		font-weight: bold;
	}
	
	.contentInner {
		padding: 20rpx;
		
		.uploadButtonInner_noImg {
			height: 400rpx;
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

</style>
