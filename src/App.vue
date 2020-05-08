<template>
  <div id="app">
    
    <navbar></navbar>
    
    <router-view v-if="shareState.update"></router-view>
    <myfooter></myfooter>
  </div>
</template>

<script>
import Navbar from './components/Base/Navbar'
import Footer from './components/Footer'
import store from './store'
export default {
  name: 'App',
  data(){
    return {
      shareState:store.state
    }
  },
  components:{
    myfooter:Footer,
    navbar:Navbar
    
  }
}
</script>

<style>
#app{
  font-family: “Arial”,”Microsoft YaHei”,”黑体”,”宋体”,sans-serif;
}
</style>
