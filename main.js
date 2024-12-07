import App from './App'
import emitter from '/utils/emitter.js'  // 引入事件总线

// #ifndef VUE3
import Vue from 'vue'
import './uni.promisify.adaptor'
import { debounce } from "./utils/debounce";
Vue.config.productionTip = false
Vue.prototype.$debounce = debounce

App.mpType = 'app'
const app = new Vue({
  ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
import { debounce } from "./utils/debounce";
export function createApp() {
  const app = createSSRApp(App)
  app.config.globalProperties.debounce = debounce
  return {
    app
  }
}
// #endif
