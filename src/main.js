// 
import Vue from 'vue';
import VueRouter from 'vue-router';

// 
import MintUi from 'mint-ui';
import 'mint-ui/lib/style.css'
import Axios from 'axios';
// 
// 注册全局组件
import MyLi from './components/Commons/MyLi.vue';
import MyUl from './components/Commons/MyUl.vue';
Vue.component(MyLi.name, MyLi);
Vue.component(MyUl.name, MyUl)

// 
Vue.use(VueRouter);
Vue.use(MintUi);

import './static/css/global.css';



// 引入moment
import Moment from 'moment';
// 注册全局过滤器
Vue.filter('convertTime',function(value){
  return Moment(value).from('YYYY-MM-DD');
});
// 处理title太长的问题
Vue.filter('convertTitle', (value, limit)=>{
  // 排除异常传值
  if(!value) return;
  // 判断
  if(value.length>limit){
    return value.substr(0,limit) + '...'
  }
  // 返回数据
  return value;

})

// 自己的页面
import App from './components/App.vue';
import Home from './components/Home/Home.vue';
import Search from './components/Search/Search.vue';
import Member from './components/Member/Member.vue';
import Shopcart from './components/Shopcart/Shopcart.vue';
import NewsList from './components/News/NewsList.vue'



Vue.prototype.$axios = Axios;

Axios.defaults.baseURL = 'http://vue.studyit.io/api/';

// 路由
let router = new VueRouter()
router.addRoutes([
  // 重定向
  { path: '/', redirect:{name:'home'}},
  // 首页
  {name:'home',path:'/home',component:Home},
  //会员页
  { name: 'member', path:'/member',component:Member},
  //搜索页
  { name: 'search', path: '/search', component: Search},
  //购物车
  { name: 'shopcart', path: '/shopcart', component: Shopcart},
  //新闻列表页
  {name:'news.list',path:'/news/list',component:NewsList}
])




// 
new Vue({
  el:'#app',
  render:c=>c(App),
  router

})