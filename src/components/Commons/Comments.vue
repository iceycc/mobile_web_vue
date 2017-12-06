<template>
    <div class="tmpl">
        <div class="photo-bottom">
            <ul>
                <li class="photo-comment">
                    <div>
                        <span>提交评论</span>
                        <span><a>返回</a></span>
                    </div>
                </li>
                <li class="txt-comment">
                    <textarea cols="45" v-model="content"></textarea>
                </li>
                <li>
                    <mt-button size="large" @click="addComment">发表评论</mt-button>
                </li>
                <li class="photo-comment">
                    <div>
                        <span>评论列表</span>
                        <span>44条评论</span>
                    </div>
                </li>
            </ul>
            <ul class="comment-list">
                <li v-for='(commnet,index) in comments' :key="index">
                    {{commnet.user_name}}：{{commnet.content}} {{commnet.add_time|convertTime}}
                </li>
            </ul>
            <mt-button type='danger' size="large" @click="addMore">加载更多</mt-button>
        </div>
    </div>
</template>
<script>
export default {
  name: "comment",
  props: ["cid"],
  data() {
    return {
      comments: {},
      page: 1,
      hasData: true,
      id: "",
      content:''//评论内容
    };
  },
  methods: {
    // 发表评论
    addComment(){
      // 提交评论 需要找到当前页面传入参数id,传入当前评论内容
      this.$axios.post(`postcomment/${this.id}`,
      `content=${this.content}`)
      .then(res=>{
        // 调用loadByPage函数====封装
        // 这里调用添加玩评论,显示1
        this.loadByPage(1);
        // 随即使数组内存储的page归1
        this.page = 1;
        //
      })
    },
    // 点击增加更多
    addMore() {
      //点击更多 判断是否还有数据
      if (!this.hasData) {
        this.$toast("没有更多评论了");
        return;
      }

      //   发起ajax请求 id还是当前 paga来自自增值
      this.$axios
        .get(`getcomments/${this.id}/?pageindex=${this.page}`)
        .then(res => {
          console.log(res.data.message);
          this.comments = this.comments.concat(res.data.message);
          // 判断下一页是否还有数据
          if (res.data.message.length == 0) {
            this.hasData = false;
            this.$toast("没有更多评论了");
            return;
          }
          this.page++;
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 封装loadByPage函数,通过函数页码获取当前的评论信息
    loadByPage(page){
      //
          this.$axios
      .get(`getcomments/${this.id}/?pageindex=${page}`)
      .then(res => {
        // console.log(res.data.message)
        this.comments = res.data.message;
        this.page++;
      })
      .catch(err => {
        console.log(err);
      });
    }
  },
  created() {
    // id为什么不在data声明来着
    // id参数从父组件 传递 :cid=$route.query.id
    this.id = this.cid;
    // 页码通过锚点传递过来
    this.page = this.$route.query.pageindex || 1;
    // this.$axios
    //   .get(`getcomments/${this.id}/?pageindex=${this.page}`)
    //   .then(res => {
    //     // console.log(res.data.message)
    //     this.comments = res.data.message;
    //     this.page++;
    //   })
    //   .catch(err => {
    //     console.log(err);
    //   });
    // 挂载到组件实例this
    this.loadByPage(this.page);
  }
};
</script>
<style scoped>
.photo-comment > div span:nth-child(1) {
  float: left;
  font-weight: bold;
  margin-left: 5px;
}

.photo-comment > div span:nth-child(2) {
  float: right;
}

.photo-comment {
  height: 30px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.4);
  line-height: 30px;
  margin-bottom: 5px;
}

.txt-comment {
  padding: 5 5;
}

.txt-comment textarea {
  margin-bottom: 5px;
}

.comment-list li {
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  padding-bottom: 5px;
  margin-bottom: 5px;
  padding-left: 5px;
}

li {
  list-style: none;
}

ul {
  margin: 0;
  padding: 0;
}
</style>
