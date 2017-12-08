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
* vue-preview图片预览
* mint-ui中toast点击显示提示信息
* lazy-load
* ★★数据变化 如何抽取组件
  * 样子一样
  * 数据不一样
    * url不同 接受不同的url 
      * 作为可变参数通关父传子传递url 在组件内用判断`pic.img || pic.url`
      * 不择手段 复用  有点类似就复用
    * 参数不一样
  * 响应回来的数据结构是否一致
    * 如果一致模版内的变量和结构直接复用
    * 不一致的话,在复用前判断是对象还是数组,
  * 注意组件的对外依赖
* 测试路由的使用  
* 模版字符串的使用
* data中变量的初始值  "",{},[]
  * 主要为了声明数据类型
* router-view可以传值.....
  * eg: router-view可以传递app页面的组件对象
    * 通过App获取到的组件对象 可以通过router-view的refs可以传递  
    * 子组件通过props
* 变量 template中不带this script中带this,data中声明不带this
* ref在组件内获取的是组件名 写在原生内获取的是dom  
  * 类似getElementById获取元素 这里是通过ref.xxx获取对应属性
  * 通过`router-view :xxxRefs="$refs"`传值,可以将当前组件内的ref获取的元素对象传递给所有有可能产生的子组件,用props获取,谁接受谁用
  * js中this.$refs  template中直接用
* 

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
*  拦截器 
* ???当前组件设置样式对v-html中的元素不生效
  * 全局设置对v-html中的样式生效
  * 但是直接设置在全局不太好,可以设置到global.css中
* mint-ui中的lazy-load使用时
* 图片预览 轮播 vue-preview
  * 引入安装 
  * class属性不要去掉
  * w/h属性要设置
  * 基于vue2.0以上
* cmd :ipconfig all获取当前的ip
* 钩子就是事件的回调函数
#### 评论列表 业务
  * 整体思路 
    * 新建一个text路由 测试 
    * 参数可以先写死
  * 业务1-显示当前页显示的评论
    * 1-接受父组件参数,需要参数id和显示页数(可以翻页) 
      * 获取id 测试阶段 可以先写死 进行测试
      * 显示页数 设置组件中默认获取路由参数作为页码 否则为1
        * 考虑到用户要显示指定页码,可以通过url上的参数来告知程序      
    * 2-自动发起请求,在组件created时 发起ajax请求 get+url(参数拼接)
      * url参数拼接可以用字符串拼接 或者 模版字符串(es6)
    * 3-接受res.data.xx
    * 4-在template中进行循环渲染
    * 5-页码自增 为点击加载更多做准备
  * 业务2-点击加载更多 追加显示下一页
    * 点击发起ajax请求 url参数id还是当前id,页码数为最新的自增值
    * 将得到的数据追加到原数组,arr = arr.concat(res.data.message)
    * 渲染
    * 注意点击加载到最后一页 提示没有更多信息了
  * 业务3-发表评论
    * 将评论提交到服务器获取最新(页码为1)的数据
    * 1-textarea中v-model双向数据绑定
    * 2-点击添加评论 触发以下事件
    * 3-接受参数 textarea中的内容
    * 4-发起ajax请求--post `this.$axios.post(url,data)`
      * $axios会自动按照data中数据格式设置content-type的
    * 5-获取到res.data.message中的数据
    * 6-要显示第一页最新数据 将得到的结果赋值到comments数组中
    * 7-渲染
  * 优化4- 函数的封装复用
    * 根据页面获取评论数据的功能可以封装
    * 注意 评论页不为1 是添加添加评论 跳转到首页 同时将存储的page归为1
    * 点击添加评论时注意将当前page=1
  * 评论组件的抽离
    * 组件的对外依赖
      * 父组件传入的点击项的id
    * 组件名 name
    * beforeRouterUpdata
  * 轮播图的复用
    * 首页的轮播图
    * 商品详情的轮播图
    * .
    * 
#### 商品列表
思路
  * 去哪
    * home.vue中设置router-link
    * 根据业务
  * 导航
  * 去了干啥
* 其他业务
  * loadmore
    * mint-ui的上拉加载下拉刷新的组件
    * auto-fill 自动填充,loadmore自动检测父盒子是否撑满,没有则调用上啦函数
    * bottom-method 上啦函数
    * 获取三种状态 bottom-state-change
      * pull
      * drop
      * loading
    * 实现原理(上拉原理)
      * 盒子上拉,当父盒子和子盒子底边重合时触发检测
      * 再继续上拉 上拉距离小于70,会弹
      * 上拉超出的距离大于70时触发刷新
      * 四个状态
      * ref写在原生上获取的是原生夺命\对象00
    * 步骤
      * 1 上拉触发以后获取第二页数据
      * 2 将数据追加到数组中  页码自增,并从loading转换到pull状态
      * 3 如果当前res.data.message么有更多数据,给出提示
    * 注意 父盒子高度写死的化会在不同设备效果不同
    * 
  * --过度效果 11 11 
#### 商品详情
* 点击商品列表a标签 将good的id传递到 商品详情也
* 三部曲 : 去哪 -> 导航 ->去了干啥 
  * 商品列表 router-link :to={name:'xxx',query:{id:1}}
  * 商品列表 router-link :to={name:'xxx',params:{myid:1}
  * 配置 main.js {name:'xxx',path:'/xxx',组件}  注意params要设置参数
  * 去了干啥  
    * 获取参数
    * 发起ajax请求  注意请求方式 url 
    * 返回res.data 赋值给准备好的模板数据中是
* 小球飞出
  * 点击加入购物车 小球出现并飞向下方
  * 动画过度
    * css可以设置效果,前后点设置元素当前状态,active设置动画
    * 过渡效果必须被内置组件transition包裹
    * JavaScript钩子
    * 过程
      * 进入前:设置进入前状态,opcity:0
      * 进入中:动画
      * 进入后:opcity默认1
      * 移出前:opcity默认1 
      * 移出中:
      * 移出后:设置移出后状态,opcity:0
    * 处理同进同出
      * out-in
      * in-out
* 拦截器实现加载组件的loading图标
* 加入购物车,存储相关的商品信息到本地存储 
  * 点击加入购物车,判断是否已经存在
    * 存在追加
    * 不存在新建
  * 分析怎么存数据 对象 或 这数组
  * 封装对本地存储 的 增删改查函数
  * Object.keys和value