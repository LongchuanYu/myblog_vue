<template>
  <div class="container">
    <button @click="onClick">clickme</button>
  </div>
</template>

<script>
import store from "../store.js";
// import EditPostModal from './User/Settings/EditPostModal'
export default {
  // import的时候用name的值
  name: "Ping",
  data() {
    return {};
  },
  methods: {
    onClick() {
      // let test = store.state.test;
      // console.log(test);
      const path = '/users/1/test'
      this.$axios.get(path).then(res=>{
        console.log('ok')
      }).catch(e=>{
        console.log('TestError:',e)
      })
    }
  }
};
</script>