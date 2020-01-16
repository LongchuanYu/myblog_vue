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
            <router-link :to="{path:'/notifications'}" class="nav-link">
              通知<span class="badge badge-danger g-font-size-dot7 ml-1">11</span>
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
                >Profile</router-link>
                <a class="dropdown-item" href="#">Settings</a>
                <div class="dropdown-divider"></div>
                <a v-on:click="handlerLogout" class="dropdown-item" href="#">Sign out</a>
              </div>
            </div>
          </li>
          <li class="nav-item" v-else>
            <router-link to="/login" class="nav-link">Sign in</router-link>
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
      shareState: store.state
    };
  },
  methods: {
    handlerLogout(e) {
      store.logoutAction();
      this.$router.push("/login");
    }
  },
  mounted:function(){
    const LOOP_TIME = 5 * 1000;
    let that = this;
    $(function(){
      let since = 0
      let userid = that.shareState.user_id
      
      var interval = setInterval(()=>{
        if(window.localStorage.getItem('madblog-token')){
          let path = `/users/${userid}/notifications?since=${since}`
          let total_notifications_count = 0
          axios.get(path).then(res=>{
            console.log(res)
            //res.data[].id/name/payload_json/
            for(let i=0;i<res.data.length;i++){
              total_notifications_count += parseInt(res.data[i].payload_json)
              since = res.data[i].timestamp
            }
            console.log(total_notifications_count)
            
          }).catch(e=>{
            console.log('setInterValError:',e)
          })
        }
      },LOOP_TIME)
      
    })
  }
};
</script>