<template>
<div>
  <!-- --------------------Modal Edit------------------------ -->
  <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" data-backdrop="static" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-lg modal-dialog-centered" role="document">
      <div class="modal-content">
      <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">编辑</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
          </button>
      </div>
      <div class="modal-body">
          <form @submit.prevent="onSubmitUpdate" @reset.prevent="onResetUpdate">
          <div class="form-group">
              <input type="text" v-model="editForm.title" v-bind:class="{'form-control':true,'is-invalid':editForm.titleError }" id="edit_title" placeholder="标题" required>
              <div class="invalid-feedback">{{editForm.titleError}}</div>
          </div>
          <div class="form-group">
              <input type="text" v-model="editForm.summary" class="form-control" id="edit_summary" placeholder="摘要">
          </div>
          <div class="form-group">
              <textarea v-model="editForm.body" id="edit_body" rows="5" class="form-control"></textarea>
              <div class="invalid-feedback">{{editForm.bodyError}}</div>
          </div>
          <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">取消</button>
              <button type="submit" class="btn btn-primary">确定</button>
          </div>

          </form>
      </div>

      </div>
  </div>
  </div><!-- End Modal Edit -->

  <!-- Modal Delete -->
  <div class="modal fade" id="modalDelete" tabindex="-1" role="dialog" aria-labelledby="modalDeleteLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
      <div class="modal-header">
          <h5 class="modal-title" id="modalDeleteLabel">Delete</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
          </button>
      </div>
      <div class="modal-body">
          Are you sure？
      </div>
      <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">No</button>
          <button type="button" class="btn btn-primary" @click="onDeletePost">Yes</button>
      </div>
      </div>
  </div>
  </div><!-- End Modal Delete -->

  
  <div class="card border-0 mb-5">
    <!-- 列表头部 -->
    <div
      class="card-header d-flex align-items-center justify-content-between bg-light border-0 mb-3"
    >
      <div class="float-left">
        <!-- 文章数量，页数 -->
        <i class="fa fa-commenting-o"></i>
        所有文章
        <small
          class="font-weight-normal"
        >（共{{posts._meta?posts._meta.total_items:''}}篇，{{posts._meta?posts._meta.total_pages:''}}页）</small>
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
          <a href="#" class="dropdown-item">-</a>
        </div>
      </div>
    </div>
    <!-- posts列表 -->
    <div v-if="posts">
      <post
        v-for="(post,index) in posts.items"
        v-bind:key="index"
        :post="post"
        @edit-post="onEditPost(post)"
        @del-post="delPostid = post.id"
      ></post>
    </div>
    <!-- Pagination -->
    <pagination
      :curPage="posts._meta.page"
      :perPage="posts._meta.per_page"
      :totalPage="posts._meta.total_pages"
    ></pagination>
  </div>
  <!--card 结束-->
</div>
</template>

<script>
import Post from "../Base/Post";
import Pagination from '../Base/Pagination'
import store from '../../store'
export default {
  data() {
    return {
      sharestate:store.state,
      posts:{
          _meta:{
              page:1,
              per_page:10
          }
      },
      delPostid:'',
      postForm:{
          title:'',
          summary:'',
          body:'',
          errors:0,
          titleError:null,
          bodyError:null
      },
      editForm:{
          title:'',
          summary:'',
          body:'',
          errors:0,
          titleError:null,
          bodyError:null
      }
    };
  },
  components: {
    Post,
    Pagination
  },
  methods: {
    //编辑按钮按下
    onEditPost(post){
        // （？）如何把postForm（也就是post）赋值到editForm上
        //  答：用asign啊！！！
        this._tearDownFormError('editForm')
        this.editForm = Object.assign(this.editForm,post)
        $("#edit_body").markdown({
            autofocus:false,
            savable:false,
            iconlibrary: 'fa',  // 使用Font Awesome图标
            language: 'zh'
        })
    },
    //提交update
    onSubmitUpdate(){
        this._tearDownFormError('editForm')
        const {title,summary,body,id}  = this.editForm
        let path = `/posts/${id}`
        if($.trim(title)=='' || !this.editForm.title){
            this.editForm.errors+=1
            this.editForm.titleError='Please input your title.'
        }
        if($.trim(body)=='' || !this.editForm.body){
            this.editForm.errors+=1
            this.editForm.bodyError='Please input your article.'
            $("#edit_body").parent(".md-editor").addClass("is-invalid")
        }else{
              $("#edit_body").parent(".md-editor").removeClass("is-invalid")
        }
        if(this.editForm.errors){
            return
        }
        let payload = {
            title:title,
            summary:summary,
            body:body,
            id:id
        }
        this.$axios.put(path,payload).then(res=>{
            //（？）如何关闭模态框？
            //  答：参考bootstrap文档
            $('#exampleModal').modal('hide')
            this.$toasted.success("修改成功")
            this._getPosts()
        }).catch(e=>{
            this.$toasted.error("修改失败")

        })

    },
    //modal删除按钮按下
    onDeletePost(){
        if(!this.delPostid){
            this.$toasted.success("Ooooh No !")
            return
        }
        let path = `/posts/${this.delPostid}`
        this.$axios.delete(path).then(res=>{
            this.$toasted.success("删除成功")
            $("#modalDelete").modal("hide")
            this._getPosts()
        }).catch(e=>{
            this.$toasted.error("删除失败")
            $("#modalDelete").modal("hide")
            console.log(e)
        })


    },
    _tearDownFormError(witchform){
      switch(witchform){
        case 'editForm':
          this.editForm.errors=0
          this.editForm.titleError=''
          this.editForm.bodyError=''
          break;
        case 'postForm':
          this.postForm.errors=0
          this.postForm.titleError=''
          this.postForm.bodyError=''
          break;
        case 'All':
          this.editForm.errors=0
          this.editForm.titleError=''
          this.editForm.bodyError=''
          this.postForm.errors=0
          this.postForm.titleError=''
          this.postForm.bodyError=''
      }
    },
    _getPosts(id) {
      let page = 1;
      let per_page = 4;
      //检验query参数，如果不正确则返回之前的路由
      if (this.$route.query.page && this.$route.query.per_page) {
        if (
          this.$route.query.page < 1 ||
          this.$route.query.page > this.posts._meta.total_pages ||
          this.$route.query.per_page < 1
        ) {
          this.$router.back();
        }
      }
      if (typeof this.$route.query.page != "undefined") {
        page = this.$route.query.page;
      }
      if (typeof this.$route.query.per_page != "undefined") {
        per_page = this.$route.query.per_page;
      }
      let path = `/users/${id}/posts/`;
      this.$axios
        .get(path, {
          params: {
            page: page,
            per_page: per_page
          }
        })
        .then(res => {
          console.log("Posts:", res);
          this.posts = res.data;
        })
        .catch(e => {
          console.log(e);
        });
    }
  },
  created: function() {
    let userid = this.$route.params.id;
    this._getPosts(userid);
  },
  beforeRouteUpdate(to, from, next) {
    next();
    this._getPosts(to.params.id);
  }
};
</script>