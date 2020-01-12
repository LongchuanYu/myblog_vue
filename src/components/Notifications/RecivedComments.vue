<template>
<div class="card border-0 mb-5">
  <!-- 顶头信息栏 -->
  <div
    class="card-header d-flex align-items-center justify-content-between bg-light border-0 mb-3"
  >
    <div class="float-left">
      <!-- posts总览 -->
      <i class="fa fa-commenting-o"></i>
      All Reply
      <small
        v-if="comments._meta"
        class="font-weight-normal"
      >（共{{comments._meta.total_items}}篇，{{comments._meta.total_pages}}页）</small>
    </div>
    <div class="dropdown">
      <!-- 其他选择，弹出选项 -->
      <div
        class
        id="dropdownMenuButton"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
      >
        <i class="fa fa-bars"></i>
      </div>
      <div class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuButton">
        <a href="#" class="dropdown-item">--</a>
      </div>
    </div>
  </div>
  <!-- End 顶头信息栏 -->
  <!-- 消息体 -->
  <div class="card-block" v-if="comments">
    <div 
      class="card-body border d-flex justify-content-start mb-3"
      v-for="(comment,index) in comments.items" :key="index"
    >
      <div class="position-relative">
        <div class="position-absolute l-read-mark" v-if="comment.is_new"></div>
        <img :src="comment.author.avatar" alt="" class="mr-3 align-self-start" style="width:50px;weight:50px;border-radius:50%">
      </div>
      

      <div class="w-100">
        <div class="d-flex mb-2">
          <span class="align-self-center">{{comment.author.username||comment.author.name}} 评论了你的文章 《{{comment.post}}》</span>
          <span class="ml-auto g-font-size-dot7 align-self-center">{{$moment(comment.timestamp).format('YYYY/MM/DD HH:mm:ss')}}</span>
        </div>
        <vue-markdown
          :source="comment.body"
          class="mb-2"
        >
        </vue-markdown>
        <div class="g-font-size-dot7 d-flex">
          <a href="javascript:;" class="align-self-center comment-reply-link g-color-secondary g-color-success--hover">
            <i class="fa fa-comment-o mr-3" > 回复</i>
          </a>
          <a href="javascript:;" class="align-self-center comment-reply-link g-color-secondary g-color-success--hover">
            <i class="fa fa-comment-o" > 查看对话</i>
          </a>

        <a
            href="javascript:;" 
            class="l-success--hover fa fa-check-circle-o ml-auto align-self-center border rounded g-color-secondary p-1 mr-2"
          > 已读</a>
          <a
            href="javascript:;" 
            class="l-danger--hover fa fa-trash-o  align-self-center border rounded g-color-secondary p-1"
          > 删除</a>
        </div>
      </div>
    </div>`
  </div>
  <!-- End 消息体 -->
  <pagination 
    v-if="comments._meta"
    :curPage="comments._meta.page"
    :perPage="comments._meta.per_page"
    :totalPage="comments._meta.total_pages"
  ></pagination>
</div>
</template>

<script>
import store from '../../store'
import VueMarkdown from "vue-markdown";
import Pagination from '../Base/Pagination'
export default {
  components:{
    VueMarkdown,
    Pagination
  },
  data(){
    return {
      shareState:store.state,
      comments:''
    }
    
  },
  methods:{
    _getUserRecivedComments(){
      let page = this.$route.query.page || 1
      let per_page = this.$route.query.per_page || 20
      const path = `/users/${this.shareState.user_id}/recived-comments/?page=${page}&per_page=${per_page}`
      this.$axios.get(path).then(res=>{
        console.log('recived-comments:',res.data)
        this.comments = res.data
      }).catch(e=>{
        console.log('recived-comments-error:',e)
      })
    }
  },
  created:function(){
    this._getUserRecivedComments()
  },
  beforeRouteUpdate(to,from,next){
    next()
    this._getUserRecivedComments()
  }
}
</script>

<style scoped>
.l-danger--hover:hover{
  border-color: #dc3545 !important;
  color:#dc3545;
}
.l-success--hover:hover{
  border-color: #28a745 !important;
  color:#28a745;
}
.l-read-mark{
  width:12px;
  height:12px;
  border-radius: 50%;
  background-color: red
}
</style>