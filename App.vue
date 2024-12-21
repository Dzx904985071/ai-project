<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	/*每个页面公共css */
	:deep(.wd-segmented) {
		background: #fff !important;
		gap: 10rpx;
	}
	
	:deep(.wd-segmented .wd-segmented__item) {
		color: #DE6683 !important;
		border: 1px solid #DE6683 !important;
		
	}
	
	:deep(.wd-segmented__item.is-active) {
		background: #DE6683;
		color: #fff !important;
	}
</style>
