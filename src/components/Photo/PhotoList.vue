<template>
    <div class="tmpl">
        <nav-bar title="图文分享"></nav-bar>
        <!-- 引入返回导航 -->
        <div class="photo-header">
            <ul>
                <li v-for="category in categories" :key="categories.id">
                    <a href="javascript:;" @click="getImg(category.id)">{{category.title}}</a>
                </li>
            </ul>
        </div>
        <div class="photo-list">
            <ul>
                <li v-for="img in images" :key="img.id">
                    <router-link :to="{name:'photo.detail',params:{imgId:img.id}}">
                        <img :src="img.img_url">
                        <p>
                            <span>{{img.title}}</span>
                            <br>
                            <span>{{img.zhaiyao}}</span>
                        </p>
                    </router-link>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
export default {
  data() {
    return {
      categories: {},
      images: {}
    };
  },
  methods:{
    getImg(id){
      this.$axios.get('getimages/'+id)
      .then(res=>{
        this.images = res.data.message;
        if(this.images.length == 0){
          this.$toast({
            message:'提示,没图了',
            duration:5000
          })
        }
      })
      .catch(err=>{
        console.log(err)
        
      })


    }
  }
  ,
  // 创建该组件时动态加载数据
  created() {
    // 接受参数
    let cateId = this.$route.params.cateId;
    this.$axios
      .all([
        // 请求分类分类目录
        this.$axios.get("getimgcategory"),
        // 获取图文
        this.$axios.get("getimages/" + cateId)
      ])
      .then(
        this.$axios.spread((cateRes, imagesRes) => {
          // console.log(cateRes.data.message)
          console.log(imagesRes.data.message);
          this.categories = cateRes.data.message;
          this.categories.unshift({ id: "0", title: "全部" });
          this.images = imagesRes.data.message;
        })
      );
  }
};
</script>
<style>
.photo-header li {
  list-style: none;
  display: inline-block;
  margin-left: 10px;
  height: 30px;
}

.photo-header ul {
  /*强制不换行*/
  white-space: nowrap;
  overflow-x: auto;
  padding-left: 0px;
  margin: 5;
}

/*下面的图片*/

.photo-list li {
  list-style: none;
  position: relative;
}

.photo-list li img {
  width: 100%;
  height: 230px;
  vertical-align: top;
}

.photo-list ul {
  padding-left: 0px;
  margin: 0;
}

.photo-list p {
  position: absolute;
  bottom: 0px;
  color: white;
  background-color: rgba(0, 0, 0, 0.3);
  margin-bottom: 0px;
}

.photo-list p span:nth-child(1) {
  font-weight: bold;
  font-size: 16px;
}
</style>
