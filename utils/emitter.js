import { reactive } from 'vue';

const emitter = reactive({
	events: {},
	
	// 注册事件监听器
	on(event, callback) {
		if (!this.events[event]) {
			this.events[event] = [];
		}
		this.events[event].push(callback);
	},
	
	// 触发事件
	emit(event, data) {
		if (this.events[event]) {
			this.events[event].forEach(callback => callback(data));
		}
	},
	
	// 注销事件监听器
	off(event, callback) {
		if (this.events[event]) {
			this.events[event] = this.events[event].filter(fn => fn !== callback);
		}
	}
});

export default emitter;
