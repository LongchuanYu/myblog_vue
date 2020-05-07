<template>
<div class="card" >
  <div class="card-header">
    我的消息
  </div>
  <div class="card-body row" style="height:75vh;">
    <!-- 左边侧栏-联系人 -->
    <div class="col-3" style="max-height:100%;overflow:auto;padding:0">
      <ul class="list-group list-group-flush l-name-list">
        <router-link
          v-for="(message,index) in messages.items" 
          :to="{name:'MessagesHistory',params:{id:message.id}}"
          :key="index"
          class="list-group-item d-block text-truncate "
          v-bind:active-class="'active'"
        >{{message.username}}
        </router-link>
      
      </ul>
    </div>
    <!-- 右边侧栏 -->
    <router-view></router-view>
  </div>
</div>
</template>

<script>
import store from "../../store.js";
import "../../assets/bootstrap-markdown/js/bootstrap-markdown.js";
import "../../assets/bootstrap-markdown/js/bootstrap-markdown.zh.js";
import "../../assets/bootstrap-markdown/js/marked.js";
export default {
  data(){
    return {
      shareState:store.state,
      messages:''
    }
  },
  methods:{
    _getUserMessagesRecipients(id){
      let msg_who_id = this.$route.params.msg_who_id;
      let msg_who = this.$route.params.msg_who;
      let page = 1;
      let per_page = 20;
      const path = `/users/${id}/messages-all/?page=${page}&per_page=${per_page}`
      this.$axios.get(path).then(res=>{

        //先看看是否已经在历史消息里了。
        let result = res.data.items.some((item,idx)=>{
          if (item.id==msg_who_id){
            res.data.items.splice(idx,1)
            res.data.items.unshift(item)
            return true
          }
        })
        if(msg_who_id && !result){
          //全新加入
          this.$axios.get(`/users/${msg_who_id}`).then(res_2=>{
            console.log(res_2)
            if (res_2.data){
              res.data.items.unshift(res_2.data)
            }
          })
          
        }
        console.log(res.data)
        this.messages = res.data
        if(this.messages.items.length){
          let to_params = msg_who_id?msg_who_id:this.messages.items[0].id
          this.$router.replace({name:'MessagesHistory',params:{id:to_params}})
        }
        
      }).catch(e=>{
        console.log(e)
      })

    }
  },
  created(){
    this._getUserMessagesRecipients(this.shareState.user_id)
    
  },
}
</script>

<style scoped>


.l-name-list li {
  padding-left:0;
  padding-right:0;
  
  

}
.l-name-list a.active{
  color:black;
  border-color: #e4e5e6;
  background-color: #e4e5e6;
}
</style>