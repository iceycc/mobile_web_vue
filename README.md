##  

### 技术选型



#### 生产环境
* vue单页
* mint-ui
* vue-preview
* vue-router
* axios

#### 开
### 项目依赖包

### 注意

  * 移动端 的 doctype可以去掉


### 技术点整理
* 自定义组件 九宫格
  * 多个地方使用可以提取组件
  * my-li 和 my-li
* 点击A组件中某一详选项跳转详情B组件
  * 1-去哪里  A组件中
    * ·router-link :to="{name:'xxx',qurey:{id:0}}"·
    * 判断是否有参数
  * 2-导航
  * 3-去了干什么
    * 获取路由中的参数

* 过滤器的使用
  * `过滤器可以传递多个参数{{text | convert(参数)}}`
  * 全局
  * 局部
  * 接受参数更为灵活
  * vue设计中没有全局的 过滤器可以声明全局
* 页面初次是可以以data中声明的默认值来渲染的
  * 此时是一个对象, 用对象来调用过滤器容易出异常
  * 如果页面调用TODO:
* 格式化时间插件的使用
* 返回上一个历史记录
  * this.$router.go(-1)
* router-link中的key可以绑定id,没id可以前面声明一个index使用index
* 路由改变触发和组件创建触发
  * 路由更新事件 11
* 组件内的函数尽量复用

### 具体功能分析

* 头部组件的复用
  * 子组件的功能
    * html+css+js
  * 
* 处理文本太长 使其不换行
  * 传统css样式方式
    * 省略号
    * 隐藏超出
  * vue 中的全局过滤器实现
    * TODO:
* 全局的设置 
* 当前组件设置样式对v-html中的元素不生效
  * 全局设置对v-html中的样式生效
  * 但是直接设置在全局不太好,可以设置到global.css中
* mint-ui中的lazy-load使用时
* 图片预览 轮播 vue-preview
  * 引入安装 
  * class属性不要去掉
  * w/h属性要设置
  * 基于vue2.0以上
* cmd :idconfig all获取当前的ip
