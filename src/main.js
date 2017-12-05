// 
import Vue from 'vue';
import VueRouter from 'vue-router';

// 
import MintUi from 'mint-ui';
import 'mint-ui/lib/style.css'
import Axios from 'axios';
// 
// 注册全局组件
import MyLi from './components/comments/MyLi.vue';
import MyUl from './components/comments/MyUl.vue';
Vue.component(MyLi.name, MyLi);
Vue.component(MyUl.name, MyUl)

// 
Vue.use(VueRouter);
Vue.use(MintUi);

import './static/css/global.css';


// 自己的页面
import App from './components/App.vue';
import Home from './components/Home/Home.vue';
import Search from './components/Search/Search.vue';
import Member from './components/Member/Member.vue';
import Shopcart from './components/Shopcart/Shopcart.vue';



Vue.prototype.$axios = Axios;

Axios.defaults.baseURL = 'http://vue.studyit.io/api/';

// 路由
let router = new VueRouter()
router.addRoutes([
  // 重定向
  { path: '/', redirect:{name:'home'}},
  // 首页
  {name:'home',path:'/home',component:Home},
  { name: 'member', path:'/member',component:Member},
  { name: 'search', path: '/search', component: Search},
  { name: 'shopcart', path: '/shopcart', component: Shopcart},
])




// 
new Vue({
  el:'#app',
  render:c=>c(App),
  router

})