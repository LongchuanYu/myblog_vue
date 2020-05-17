<template>
  <section>
    <!-- Modal: Send Messages -->
    <div data-backdrop="static" class="modal fade" id="sendMessagesModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">群发私信</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">

            <form id="sendMessagesForm" @submit.prevent="onSubmitSendMessages" @reset.prevent="onResetSendMessages">
              <div class="form-group">
                <textarea v-model="sendMessagesForm.body" class="form-control" id="sendMessagesFormBody" rows="5" placeholder=" 内容"></textarea>
                <!-- <small class="form-control-feedback" v-show="sendMessagesForm.bodyError">{{ sendMessagesForm.bodyError }}</small> -->
              </div>
              <button type="reset" class="btn btn-secondary">取消</button>
              <button type="submit" class="btn btn-primary">发送</button>
            </form>

          </div>
        </div>
      </div>
    </div>
    <!-- End Modal: Send Messages -->

    
    <div class="container">
      <div class="border p-3">
        <div class="row">
          <!-- 头像+edit按钮 -->
          <div class="col-sm-3">
            <div class="avatar pb-3">
              <img :src="user._links.avatar" alt class="rounded img-fluid w-100" />
            </div>

            <router-link
              :to="{name:'SettingProfile'}"
              v-if="sharestate.user_id == $route.params.id"
            >
              <button type="button" class="btn btn-outline-primary w-100 mb-2">编辑个人资料</button>
            </router-link>
            <button
              type="button"
              class="btn btn-outline-danger w-100 mb-5"
              v-if="sharestate.user_id == $route.params.id"
            >删除账户</button>
            <button
              type="button"
              class="btn btn-outline-primary w-100 mb-5"
              v-if="sharestate.user_id != $route.params.id && user.is_following"
              @click="onUnfollowUser($route.params.id)"
            >取消关注</button>
            <button
              type="button"
              class="btn btn-outline-primary w-100 mb-5"
              v-else-if="sharestate.user_id != $route.params.id && !user.is_following"
              @click="onFollowUser($route.params.id)"
            >关注</button>
            <router-link
              class="btn btn-outline-primary w-100 mb-5"
              v-if="sharestate.user_id != $route.params.id"
              :to="{name:'RecivedMessages',params:{msg_who_id:$route.params.id,msg_who:user.username}}"
            >发送私信</router-link>

            <button 
              class="btn btn-outline-primary w-100 mb-5"
              v-if="$route.params.id == sharestate.user_id && sharestate.user_perms.includes('admin')" 
              data-toggle="modal" data-target="#sendMessagesModal">
              群发私信
            </button>

            <!-- <router-link :to="{name:'EditProfile',params:{id:sharestate.user_id}}" v-if="sharestate.user_id == $route.params.id">
                        <button type="button" class="btn btn-outline-primary w-100 mb-5">Edit profile</button>
                    </router-link>
            <button v-else type="button" class="btn btn-outline-secondary w-100 mb-5 disabled custom-btn">Edit profile</button>-->
          </div>

          <!-- 个人资料 -->
          <div class="col-sm-9">
            <ul class="nav nav-tabs">
              <li class="nav-item">
                <!-- 
                                （？）v-bind:active-class怎么理解？
                                答：这里的tab切换需要在class上添加“active”标签，这里使用vue-router的active-class设置链接激活时使用的 CSS 类名，详见文档
                                否则单纯的tab切换，a标签不会变色，导致切换效果不好。也无法动态响应url的变化，当url变化时tab不会跟着切换。。。
                -->
                <router-link
                  :to="{name:'UserOverview'}"
                  v-bind:active-class="'active'"
                  class="nav-link"
                  href="#"
                  v-bind:class="isUserOverView"
                >个人资料</router-link>
              </li>
              <li class="nav-item">
                <router-link
                  :to="{name:'UserFollowers'}"
                  v-bind:active-class="'active'"
                  class="nav-link"
                  href="#"
                >
                  粉丝
                  <span class="badge badge-pill badge-danger ml-1">{{user.followers_count}}</span>
                </router-link>
              </li>
              <li class="nav-item">
                <router-link
                  :to="{name:'UserFollowing'}"
                  v-bind:active-class="'active'"
                  class="nav-link"
                  href="#"
                >
                  关注
                  <span class="badge badge-pill badge-danger ml-1">{{user.followeds_count}}</span>
                </router-link>
              </li>

              <li class="nav-item">
                <router-link
                  :to="{name:'Posts'}"
                  class="nav-link"
                  href="#"
                  v-bind:active-class="'active'"
                >
                  我的文章
                  <span class="badge badge-pill badge-danger ml-1">{{user.posts_count}}</span>
                </router-link>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#" v-bind:active-class="'active'">
                  关注文章
                  <span class="badge badge-pill badge-danger ml-1">{{user.followed_posts_count}}</span>
                </a>
              </li>
            </ul>
            <router-view></router-view>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import store from "../../store.js";
export default {
  data() {
    return {
      sharestate: store.state,
      user: {
        id: "",
        email: "",
        username: "",
        name: "",
        location: "",
        about_me: "",
        member_since: "",
        last_seen: "",
        followeds_count: 0,
        followers_count: 0,
        posts_count: 0,
        followed_posts_count: 0,
        _links: {
          self: "",
          avatar: ""
        }
      },
      sendMessagesForm:{
        body:'',
      }
    };
  },
  computed: {
    isUserOverView: function() {
      const tabs = [
        "UserFollowers",
        "UserFollowing",
        "UserPostsList",
        "UserFollowedsPostsList"
      ];
      if (tabs.indexOf(this.$route.name) == -1) {
        return "active";
      } else {
        return "";
      }
    }
  },
  methods: {
    onFollowUser(id) {
      const path = `/follow/${id}`;
      this.$axios
        .get(path)
        .then(res => {
          console.log("关注ok");
          this.getUser(id);
        })
        .catch(e => {
          console.error(e);
        });
    },
    onUnfollowUser(id) {
      const path = `/unfollow/${id}`;
      this.$axios
        .get(path)
        .then(res => {
          console.log("取消ok");
          this.getUser(id);
        })
        .catch(e => {
          console.error(e);
        });
    },
    getUser(userid) {
      //（？）如何实现范围外的userid引发404错误，然后返回原路由？
      //  在全局axios中实现，拦截了response。对于404，route.back()
      //（？）为何在Profile页面登录后没有route.back()?而是进入/user/0的路由？
      //  1.未登录状态下Profile的路由是/user/0，在这个时候登录自然是进入/user/0的路由了。
      //  2.store.js中：退出的时候会有一个清理动作，把userid设置为0
      //  ....因此在未登录状态下点击Profile按钮就是/user/0
      //  ....修复方法在当前组件的created函数里面，通过跳转到正确路由来解决

      this.$axios
        .get(`/users/${userid}`)
        .then(res => {
          console.log(res);
          this.user = res.data;
        })
        .catch(e => {
          console.log(e);
        });
    },
    onSubmitSendMessages(){
      if (this.sendMessagesForm.body==''){
        this.$toasted.error('啥都没写啊...', { icon: 'fingerprint' })
        return
      }
      var payload ={
        body:this.sendMessagesForm.body
      }
      const path = `/send-messages`
      this.$axios.post(path,payload).then(res=>{
        console.log(res)
        this.$toasted.success('群发中...')
        this.onResetSendMessages()
      }).catch(e=>{
        console.log(e.response)
      })
    },
    onResetSendMessages(){
      this.sendMessagesForm.body = ''
      $('#sendMessagesModal').modal('hide')

    }
  },
  created: function() {
    //（？）这里怎么获取userid呢？
    //  1.用this.sharestate.user_id ,但这样无法动态响应路由变化。。
    //  2.通过this.$route.params.id来访问路由传参
    let userid = this.$route.params.id;
    if (userid == "0") {
      userid = this.sharestate.user_id;
      this.$router.replace(`/user/${userid}`);
    }
    this.getUser(userid);
  },
  beforeRouteUpdate(to, from, next) {
    next();
    this.getUser(to.params.id);
  }
};
</script>

<style scoped>
/*
    重写了按钮的disabled状态
 */
.custom-btn {
  cursor: not-allowed;
}
.custom-btn:focus {
  -webkit-box-shadow: 0 0 0 0;
  box-shadow: 0 0 0 0;
}
</style>