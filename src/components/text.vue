<template>
    <div class="tmpl">
        <div class="photo-bottom">
            <ul>
                <li class="photo-comment">
                    <div>
                        <span>提交评论</span>
                        <span><a >返回</a></span>
                    </div>
                </li>
                <li class="txt-comment">
                    <textarea cols="45"></textarea>
                </li>
                <li>
                    <mt-button size="large">发表评论</mt-button>
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
                    {{commnet.user_name}}：{{commnet.content}} {{commnet.add_time}}
                </li>
            </ul>
            <mt-button type='danger' size="large" @click="addMore">加载更多</mt-button>
        </div>
    </div>
</template>
<script>
export default {
  data() {
    return {
      comments: [],
      page: 1,
      hasData: true
    };
  },
  methods: {
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
          this.comments = this.comments.content(res.data.message);
          // 判断下一页是否还有数据
          if (res.data.message.length == 0) {
            this.hasData = false;
            this.$toast("没有更多评论了");
            return;
          }
          this.page++;
        })
        .catch(err=>{
            console.log(err)
        })
    }
  },
  created() {
    // id为什么不在data声明来着
    this.id = 88;
    this.page = 1;
    this.$axios
      .get(`getcomments/${this.id}/?pageindex=${this.page}`)
      .then(res => {
        // console.log(res.data.message)
        this.comments = res.data.message;
        this.page++;
      })
      .catch(err => {
        console.log(err);
      });
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
