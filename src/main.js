import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

/* 写在前面才能覆盖后面的 */
//全局配置
import '@/assets/scss/reset.scss'
import 'element-ui/lib/theme-chalk/index.css';


//第三方包
import ElementUI from 'element-ui';
import http from '@/api/config'
import './mock'


Vue.config.productionTip = false
Vue.use(ElementUI);
//可以通过$http来调用axios实例了
Vue.prototype.$http = http

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
