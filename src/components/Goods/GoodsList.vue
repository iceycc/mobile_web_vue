<template>
    <div>
        <nav-bar title="商品列表"></nav-bar>
        <ul>
            <li v-for="good in goods" :key="good.id">
                <a>
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
                </a>
            </li>
          
            
          
        </ul>
    </div>
</template>
<script>
    export default{
        data(){
            return{
               page:"", 
               goods:{}
            }
        },
        created(){
            this.page = this.$route.query.page || 1;
            this.$axios.get(`getgoods?pageindex=${this.page}`)
            .then(res=>{
                this.goods = res.data.message;
                console.log(this.goods)
            })
            .catch(err=>{
                console.log(err)
            })
        }
    }
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

.detail >.hot {
    float: left;
    text-align: left;
    font-size: 15px;
}

.detail >.count {
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
