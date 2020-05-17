<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light" style="margin-bottom: 20px;">
    <div class="container">
      <router-link to="/" class="navbar-brand">
        <img
          src="../../assets/logo.png"
          width="30"
          height="30"
          class="d-inline-block align-top"
          alt
        />
        BLOG
      </router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
          <li class="nav-item active">
            <router-link to="/" class="nav-link">
              主页
              <span class="sr-only">(current)</span>
            </router-link>
          </li>
          <li class="nav-item">
            <a class="nav-link disabled" href="#">其他</a>
          </li>
        </ul>

        <form class="form-inline navbar-left mr-auto">
          <input class="form-control mr-sm-2" type="search" placeholder="Search" disabled />
          <!-- 暂时先禁止提交，后续实现搜索再改回 type="submit" -->
          <button class="btn btn-outline-success my-2 my-sm-0" type="button" disabled>搜索</button>
        </form>
        <ul class="nav navbar-nav navbar-right">
          <li class="nav-item mr-3">
            <router-link 
              :to="{name:shareState.notifications.leaveRouteName}" 
              class="nav-link d-flex align-items-center" 
              @click.native="forceRefresh">
              <span class="">通知</span>
              <span class="badge badge-danger g-font-size-dot7 ml-1" id="new_notifications_count" style="visibility: hidden;" v-if="shareState.is_authenticated">0</span>
              
            </router-link>
          </li>
        </ul>
        <ul class="nav navbar-nav navbar-right">
          <li class="nav-item" v-if="shareState.is_authenticated">
            <!-- Example single danger button -->
            <div class="btn-group">
              <a
                class="nav-link dropdown-toggle"
                href="#"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <img :src="shareState.user_avatar" alt />
                {{shareState.user_name||"Null"}}
              </a>
              <div class="dropdown-menu">
                <router-link
                  v-bind:to="{ path:`/user/${shareState.user_id}`}"
                  class="dropdown-item"
                >个人资料</router-link>
                <router-link to="/admin" class="dropdown-item" v-if="shareState.is_authenticated && shareState.user_perms.includes('admin')">后台管理</router-link>
                <a class="dropdown-item" href="#">设置</a>
                <div class="dropdown-divider"></div>
                <a v-on:click="handlerLogout" class="dropdown-item" href="#">注销登录</a>
              </div>
            </div>
          </li>
          <li class="nav-item" v-else>
            <router-link to="/login" class="nav-link">登录</router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>
<script>
import store from "../../store.js";
import axios from 'axios'
export default {
  name: "Navbar",
  data() {
    return {
      shareState: store.state,
    };
  },
  methods: {
    handlerLogout(e) {
      store.logoutAction();
      this.$router.push("/login");
    },
    forceRefresh(){
      // return
      this.shareState.update = false
      this.$nextTick(()=>{
        this.shareState.update = true
      })
    }
  },
  mounted:function(){
    const LOOP_TIME = 10 * 1000;
    let that = this;
    $(function(){
      var $interval = setInterval(()=>{
        console.log('interval...')
        if(window.localStorage.getItem('madblog-token')){
          let path = `/users/${that.shareState.user_id}/notifications`
          let total_notifications_count = 0
          axios.get(path).then(res=>{
            // console.log(res)
            //res.data[].id/name/payload_json/
            for(let i=0;i<res.data.length;i++){
              total_notifications_count += parseInt(res.data[i].payload_json)
            }
            $("#new_notifications_count").text(total_notifications_count)
            $("#new_notifications_count").css('visibility',total_notifications_count?'visible':'hidden')
            
          }).catch(e=>{
            console.log('setInterValError:',e)
          })
        }
      },LOOP_TIME)
      
    })
  }
};
</script>