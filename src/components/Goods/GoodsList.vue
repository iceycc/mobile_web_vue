<template>
    <div>
        <nav-bar title="商品列表"></nav-bar>
          <mt-loadmore :bottom-method="loadBottom" ref="loadmore" :auto-fill="isAutoFill" :bottom-all-loaded="allLoaded">

        <ul>
            <li v-for="good in goods" :key="good.id">
                <router-link :to="{name:'good.detail',params:{goodId:good.id}}">
                    <img :src="good.img_url">
                    <div class="title">{{good.title}}</div>
                    <div class="desc">
                        <div class="sell">
                            <span>￥{{good.sell_price}}</span>
                            <s>￥{{good.market_price}}</s>
                        </div>
                        <div class="detail">
                            <div class="hot">
                                热卖中
                            </div>
                            <div class="count">
                                剩{{good.stock_quantity}}件
                            </div>
                        </div>
                    </div>
                </router-link>
            </li>
          
            
          
        </ul>
            </mt-loadmore>
  
    </div>
</template>
<script>
export default {
  data() {
    return {
      page: "", //页码
      goods: {}, //商品列表
      height: "", //根节点div高度
        // 插件里的东西哦
      isAutoFill:false,//是否自动检测，并调用loadBottom
      allLoaded: false,//数据是否全部加载完毕，如果是，禁止函数调用
    };
  },
  // 通过 给 App中的router-view添加:appRefs='$refs',将ref绑定的dom元素信息传递古来
  props: ["appRefs"],
  methods: {
    // 触发上拉函数
    loadBottom() {
      this.$axios
        .get(`getgoods?pageindex=${this.page}`)
        .then(res => {
          // 判断是否有数据
          if (res.data.message.length == 0) {
            this.$toast({
              message: "提示没有更多数据了",
              duration: 2000
            });
            // ?????????禁止下拉刷新的函数调用
            this.allLoaded = true;
            return;
          }
          //追加下一页数据
          this.goods = this.goods.concat(res.data.message);
          this.page++;
          // 从loading状态通知回到pull初始状态
          // 固定写法????????
          this.$refs.loadmore.onBottomLoaded();
        })
        .catch(err => {
          console.log(err);
        });
    },

    // 改变父盒子高度 函数
    changeHeight() {
      this.height =
        document.documentElement.clientHeight -
        this.appRefs.header.$el.offsetHeight;
    }
  },
  //装载时  操作dom
  mounted() {
    this.changeHeight();
  },
  created() {
    this.page = this.$route.query.page || 1;
    this.$axios
      .get(`getgoods?pageindex=${this.page}`)
      .then(res => {
        this.goods = res.data.message;
        console.log(this.goods);
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>
<style scoped>
ul {
  overflow: hidden;
}
li {
  width: 50%;
  float: left;
  padding: 6px;
  box-sizing: border-box;
}

li > a:not(.mui-btn) {
  margin: 0px;
  padding: 0px;
  border: 1px solid #5c5c5c;
  box-shadow: 0 0 4px #666;
  width: 100%;
  display: block;
}

li > a:not(.mui-btn) img {
  width: 100%;
}

.sell > span {
  float: left;
  color: red;
  text-align: left;
}

.detail > .hot {
  float: left;
  text-align: left;
  font-size: 15px;
}

.detail > .count {
  float: right;
  text-align: right;
  font-size: 15px;
}

/*撑开，去除浮动没有的高度*/

.detail {
  overflow: hidden;
}

.desc {
  color: rgba(92, 92, 92, 0.8);
  background-color: rgba(0, 0, 0, 0.2);
}

img {
  height: 200px;
}
</style>
