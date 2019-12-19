<template>
  <div id="app">
    
    <navbar></navbar>
    
    <router-view/>
    <myfooter></myfooter>
  </div>
</template>

<script>
import Navbar from './components/Navbar'
import Footer from './components/Footer'
export default {
  name: 'App',
  components:{
    myfooter:Footer,
    navbar:Navbar
    
  }
}
</script>

<style>

</style>
