import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css'; // 默认主题

import './assets/css/icon.css';
import './components/common/directives';
import "babel-polyfill";
import './assets/fonts/iconfont.css';//引入阿里图标

import { Loading } from 'element-ui';//引入elment的loading

import qs from 'qs';//qs 用来解决vue中post请求以 a=a&b=b 的格式

//引入全局配置服务器域名
import request from './api/request.js'
global.request=request;
//引入时间处理函数
import handleTime from './ulit/handleTime.js'
global.handleTime=handleTime;
// console.log(handleTime.jugeNum);
//引入百度地图
import BaiduMap from 'vue-baidu-map'

Vue.use(BaiduMap, {
  // ak 是在百度地图开发者平台申请的密钥 详见 http://lbsyun.baidu.com/apiconsole/key */
  ak: 'RWH9ZFBykv6AjsDurEoj62wKvoVStp9P'
})

axios.defaults.withCredentials=true;//解决跨域问题
//引入axiosde post请求头
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';


Vue.config.productionTip = false
Vue.use(ElementUI, {
    size: 'small'
});
Vue.prototype.$axios = axios;


//那么 showFullScreenLoading() tryHideFullScreenLoading() 要干的事儿就是将同一时刻的请求合并。 
//声明一个变量 needLoadingRequestCount，每次调用showFullScreenLoading方法 needLoadingRequestCount + 1。 
//调用tryHideFullScreenLoading()方法，needLoadingRequestCount - 1。needLoadingRequestCount为 0 时，结束 loading。
let needLoadingRequestCount = 0 ;
let loading        //定义loading变量
function startLoading() { //使用Element loading-start 方法 
	loading = Loading.service({ 
		lock: true, 
		text: '加载中……',
		background: 'rgba(0, 0, 0, 0.7)' 
	}) 
}
function endLoading() {    //使用Element loading-close 方法
    loading.close()
}
const tryCloseLoading = () => {
    if (needLoadingRequestCount === 0) {
        endLoading();
    }
};
export function showFullScreenLoading() { 
	if (needLoadingRequestCount === 0) { 
		startLoading() 
	} 
	needLoadingRequestCount++ 
} 
export function tryHideFullScreenLoading() { 
	if (needLoadingRequestCount <= 0) return 
	needLoadingRequestCount-- 
	if (needLoadingRequestCount === 0) { 
		endLoading() 
	} 
}


//请求设置token
axios.interceptors.request.use(
config => {
    if (localStorage.tokens) { //判断token是否存在
      config.headers.token = localStorage.tokens;  //将token设置成请求头
    }
    showFullScreenLoading()
    return config;
},
err => {
    return Promise.reject(err);
}
);

 

//添加响应拦截器
axios.interceptors.response.use(function (response) {
　　// 对响应数据做点什么
	setTimeout(function(){
		tryHideFullScreenLoading()
	},300);	
	return response
　　	
}, function (error) {
　　// 对响应错误做点什么
if(error.response.status==401){
	router.push({ path: '/login'})
	return;
}else{
	setTimeout(function(){
		tryHideFullScreenLoading()
	},3000);
}
　　return Promise.reject(error)
});









new Vue({
    router,
    render: h => h(App)
}).$mount('#app')




