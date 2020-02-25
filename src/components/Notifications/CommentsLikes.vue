<template>
<div>
<!-- 顶头信息栏 -->
<div
  class="card-header d-flex align-items-center justify-content-between bg-light border-0 mb-3"
>
  <div class="float-left">
    <!-- posts总览 -->
    <i class="fa fa-commenting-o"></i>
    收到的赞
    <!-- <small
      v-if="likes._meta"
      class="font-weight-normal"
    >（共{{likes._meta.total_items}}篇，{{likes._meta.total_pages}}页）</small> -->
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
      <a href="javascript:;" class="dropdown-item" >--</a>
    </div>
  </div>
</div>
<!-- End 顶头信息栏 -->

<div v-if="likes">
  <div 
    v-for="(like,index) in likes.items"
    :key="index"
    class="card-body border mb-2 d-flex flex-column"
  >
    <div class="mb-2">
      <router-link :to="`/user/${like.like_from_user.id}`">
        {{like.like_from_user.username}}
      </router-link>
      点赞了你的评论
      <router-link :to="{path:`/post/${like.like_to_comment.post.id}#c${like.like_to_comment.id}`}">
        {{like.like_to_comment.body | ellipsis}}
      </router-link>
      
    </div>
    <div class="g-font-size-dot7">
      {{$moment(like.timestamp).format('YYYY-MM-DD HH:mm:ss')}}
    </div>

  </div>
</div>
<pagination
  v-if="likes._meta && likes.items && likes.items.length"
  :curPage="likes._meta.page"
  :perPage="likes._meta.per_page"
  :totalPage="likes._meta.total_pages"
></pagination>


</div>
</template>

<script>
import store from '../../store'
import Pagination from '../Base/Pagination'
export default {
  data(){
    return {
      shareState:store.state,
      likes:''
    }
  },
  components:{
    Pagination
  },
  methods:{
    _getUserCommentsLikes(userid){
      let page = this.$route.query.page || 1
      let per_page = this.$route.query.per_page || 5
      const path = `/users/${userid}/recived-comments-likes/?page=${page}&per_page=${per_page}`
      this.$axios.get(path).then(res=>{
        console.log('CommentLikes:',res)
        this.likes = res.data
      }).catch(e=>{
        console.log('getUserCommentsLikesError:',e)
      })
    }
  },
  created(){
    this._getUserCommentsLikes(this.shareState.user_id)
  },
  beforeRouteUpdate(to,from,next){
    next()
    this._getUserCommentsLikes(this.shareState.user_id)

  },
  filters:{
    ellipsis:function(value){
      if(!value) return ''
      if(value.length>50){
        return value.substring(0,50)+'...'
      }else{
        return value
      }
    }
  }

}
</script>