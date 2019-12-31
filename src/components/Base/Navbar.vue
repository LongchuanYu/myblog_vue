<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light" style="margin-bottom: 20px;">
    <div class="container">
        <router-link to="/" class="navbar-brand">
            <img src="../../assets/logo.png" width="30" height="30" class="d-inline-block align-top" alt="">
            Blog
        </router-link>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
            <li class="nav-item active">
                <router-link to="/" class="nav-link">Home <span class="sr-only">(current)</span></router-link>
            </li>
            <li class="nav-item">
                <a class="nav-link disabled" href="#">Explore</a>
            </li>
            </ul>

            <form class="form-inline navbar-left mr-auto">
            <input class="form-control mr-sm-2" type="search" placeholder="Search" disabled>
            <!-- 暂时先禁止提交，后续实现搜索再改回 type="submit" -->
            <button class="btn btn-outline-success my-2 my-sm-0" type="button" disabled>Search</button>
            </form>

            <ul class="nav navbar-nav navbar-right"> 
                <li class="nav-item" v-if="shareState.is_authenticated">
                    <!-- Example single danger button -->
                    <div class="btn-group">
                    <a class="nav-link dropdown-toggle" href="#"  data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <img :src="shareState.user_avatar" alt="">
                            {{shareState.user_name||"Null"}}
                    </a>
                    <div class="dropdown-menu">
                        <router-link v-bind:to="{ path:`/user/${shareState.user_id}`}" class="dropdown-item">Profile</router-link>
                        <a class="dropdown-item" href="#">Settings</a>
                        <div class="dropdown-divider" ></div>
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
import store from '../../store.js'
export default {
    name:'Navbar',
    data(){
        return {
            shareState:store.state
        }
    },
    methods:{
        handlerLogout(e){
            store.logoutAction()
            this.$router.push('/login')
        }
    }
}
</script>