<template>
  <div class="container">
    <div class="row mt-4">
      <!-- Article Content -->
      <div class="col-md-9">
        <article class>
          <!-- 标题 -->
          <header class="mb-3">
            <div class="h1 text-info text-break mb-3">{{post.title}}</div>
            <ul class="mb-3 d-sm-flex list-inline text-secondary">
              <li class="list-inline-item">{{post.author.username||post.author.name}}</li>
              <li class="list-inline-item">/</li>
              <li class="list-inline-item">
                <i class="fa fa-clock-o mr-1"></i>
                {{$moment(post.timestamp).format('YYYY/MM/DD HH:mm:ss')}}
              </li>
              <li class="list-inline-item">/</li>
              <li class="list-inline-item">Comment(0)</li>
              <li class="list-inline-item ml-auto">
                <i class="fa fa-eye text-muted mr-1"></i>
                {{post.views}}次阅读
              </li>
            </ul>
            <hr />
          </header>
          <vue-markdown
            :source="post.body"
            toc
            :toc-first-level="1"
            :toc-last-level="3"
            toc-id="toc"
            @toc-rendered="tocAlready"
            class="markdown-body text-break text-wrap"
          ></vue-markdown>
        </article>

        <hr />

        <!-- Comment display -->
        <div class="comment">
          <!-- 顶层评论 -->
          <ul v-if="comments">
            <li
              v-for="(comment,index) in comments.items"
              :key="index"
              :id="'c'+comment.id"
              class="comment-item "
            >
              <div class="card-body border mb-2 d-flex align-items-start">
                <img :src="comment.author.avatar" alt="" class="mr-2" style="width:30px; height:30px;">
                <div class="w-100">
                  <div class="d-flex mb-2">
                    <a href="#">{{comment.author.username}}</a>
                    <small class="ml-auto">{{$moment(comment.timestamp).format("YYYY/MM/DD HH:mm:ss")}}</small>
                  </div>

                  <vue-markdown :source="comment.body"></vue-markdown>
                  <a href="javascript:;" class="comment-reply-link" @click="onClickReply(comment)">回复</a>
                </div>

              </div>

              <!-- 回复 -->
              <ul v-if="comment.descendants">
                <li
                  v-for="(child,cindex) in comment.descendants"
                  :key="cindex"
                  :id="'c'+child.id"
                  class="comment-item"
                >
                  <div class="card-body border mb-2 d-flex align-items-start">
                    <img :src="child.author.avatar" alt="" class="mr-2" style="width:30px; height:30px;">
                    <div class="w-100">
                      <div class="d-flex mb-2">
                        <a href="#">{{child.author.username}}</a>
                        <small class="ml-auto">{{$moment(child.timestamp).format("YYYY/MM/DD HH:mm:ss")}}</small>
                      </div>
                      <vue-markdown
                        :source="child.body"
                      >  
                      </vue-markdown>
                      <a
                        @click="onClickReply(child)"
                        href="javascript:;"
                        class="comment-reply-link"
                      >回复</a>
                    </div>

                  </div>
    

                </li>
              </ul>
              <!-- End 回复 -->
            </li>
          </ul>
          <!-- End 顶层评论 -->
        </div>
        <!-- End Comment display -->


        <!-- 回复框 -->
        <form @submit.prevent="onSubmitAddComment"  @reset.prevent="onResetAddComment" class="mb-4" id="addCommentForm" hidden>
          <div class="form-group">
            <textarea v-model="commentForm.body_reply" id="reply_body" rows="5" class="form-control"></textarea>
            <div class="invalid-feedback"></div>
          </div>
          <button type="reset" class="btn btn-secondary btn-sm">Cancel</button>
          <button type="submit" class="btn btn-primary btn-sm">Submit</button>
        </form>
        <!-- End 回复框 -->
        <!-- create comment -->
        <hr />
        <div>
          <div class="mb-4 border-bottom">
            <div class="h5 d-inline-block">评论</div>
          </div>
          <form @submit.prevent="onSubmitAddComment" class="mb-4">
            <div class="form-group">
              <textarea v-model="commentForm.body_comment" id="comment_body" rows="5" class="form-control"></textarea>
              <div class="invalid-feedback"></div>
            </div>
            <button type="submit" class="btn btn-primary">Submit</button>
          </form>
        </div>
        <!-- End create comment -->
      </div>
      <!-- End Article Content -->

      <!-- TOC -->
      <div class="col-md-3">
        <div id="sticker">
          <div id="tocHeader">
            <div class="h5 text-secondary">文章目录</div>
          </div>
          <div id="toc" class="toc"></div>
        </div>
      </div>
      <!-- End TOC -->
    </div>
  </div>
</template>

<script>
import store from "../store.js";
import VueMarkdown from "vue-markdown";
import "../assets/jquery.sticky";
import hljs from "highlight.js";
import "highlight.js/styles/github.css";
const highlightCode = () => {
  let blocks = document.querySelectorAll("pre code");
  blocks.forEach(block => {
    hljs.highlightBlock(block);
  });
};
export default {
  data() {
    return {
      sharestate: store.state,
      post: {
        author: {
          username: ""
        },
        body: "",
        summary: "",
        title: "",
        views: 0
      },
      comments: "",
      //回复的表单
      commentForm: {
        body_comment:'',
        body_reply: "", //回复内容
        parent_id:'', //回复的对象id
        author_id:'',//谁回复的？id
        author_name:'',//谁回复的？name
        errors:0,
        bodyError:null
      }
    };
  },
  components: {
    VueMarkdown
  },
  methods: {
    tocAlready() {
      $("#sticker").sticky({ topSpacing: 10 });
    },
    onSubmitAddComment() {
      let postid = this.$route.params.id;
      const path = `/comments`;
      var payload = {}
      const at_who = `<a href="/user/${this.commentForm.author_id}">@${this.commentForm.author_name} </a>`
      if(this.commentForm.parent_id){
        //回复
        payload = {
          body:at_who + this.commentForm.body_reply,
          post_id:postid,
          parent_id:this.commentForm.parent_id
        }
      }else{
        //评论
        payload={
          body:this.commentForm.body_comment,
          post_id:postid
        }
      }
      this.$axios
        .post(path, payload)
        .then(res => {
          console.log("Create comment ok...");
          $("#addCommentForm").attr('hidden','hidden')
          this._tearDown()
          this._getPostComments(postid);
        })
        .catch(e => {
          this._tearDown()
          console.log("Create Comment Failed...");
        });
    },
    onResetAddComment(){
      $("#addCommentForm").attr('hidden','hidden')
      this._tearDown()
    },
    onClickReply(comment) {
      //注意这里回复了谁，parent_id就是回复对象的id
      this.commentForm.parent_id = comment.id
      this.commentForm.author_id = comment.author.id
      this.commentForm.author_name = comment.author.username||comment.author.name
      
      
    },
    _tearDown(){
      this.commentForm.body_comment = ''
      this.commentForm.body_reply=''
      this.commentForm.author_id=''
      this.commentForm.parent_id=''
      this.commentForm.author_name=''
      this.commentForm.errors=0
      this.commentForm.bodyError=null

    },
    _getPost(postid) {
      let path = `/posts/${postid}`;
      this.$axios
        .get(path)
        .then(res => {
          this.post = res.data;
        })
        .catch(e => {
          console.log(e);
          this.$toasted.error("404");
        });
    },
    _getPostComments(id) {
      let page = 1;
      let per_page = 10;
      const path = `/posts/${id}/comments?page=${page}&per_page=${per_page}`;
      this.$axios
        .get(path)
        .then(res => {
          console.log(res.data);
          this.comments = res.data;
        })
        .catch(e => {
          console.log("getPostCommentsError:", e);
        });
    }
  },
  created: function() {
    const postid = this.$route.params.id;
    this._getPost(postid);
    this._getPostComments(postid);

    $(document).ready(function() {
      $("body").on("click", ".comment-reply-link", function() {
        var $comment = $(this).closest(".comment-item")
        $("#addCommentForm").removeAttr('hidden')
        $comment.after($("#addCommentForm"))
        $("#reply_body").focus()
      });
      $("#comment_body,#reply_body").markdown({
        autofocus:false,
        savable:false,
        iconlibrary: 'fa',  // 使用Font Awesome图标
        language: 'zh'
      })
    });
  },
  beforeRouteUpdate(to, from, next) {
    next();
    this._getPost(to.params.id);
    
  },
  mounted() {
    highlightCode();
  },
  updated() {
    highlightCode();
  }
};
</script>

<style>
.toc {
  font-size: 0.9em;
}
ul {
  list-style-type: none;
  
}
.toc > ul,.comment > ul  {
  padding-left: 0;
}
.toc > ul > li > ul {
  padding-left: 1em;
}
.toc > ul > li > ul > li > ul {
  padding-left: 1.2em;
}
</style>