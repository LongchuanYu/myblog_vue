<template>
  <div class="border-left col-9" style="height:100%;">
    <!-- 消息框 -->
    <div class="border p-3" style="height:calc(100% - 200px);overflow:auto" >
      <div class="mb-2" style="height:30px;" v-for="(message,index) in his_messages.items" :key="index" >
        <div class="float-right bg-info" v-if="message.sender.id==shareState.user_id">{{message.body}}</div>
        <div class="float-left bg-info" v-else>{{message.body}}</div>
      </div>
    </div>
    <!-- 发送框 -->
    <div class="position-relative" style="min-height:100px;">
      <div class="form-group">
        <textarea  id="send_frame" rows="5" class="form-control"></textarea>
      </div>
      <button type="button" class="btn btn-secondary btn-sm l-send-btn position-absolute">发送</button>
    </div>
  </div>
</template>

<script>
import store from "@/store.js";
export default {
  data(){
    return {
      shareState:store.state,
      his_messages:''
    }
  },
  methods:{
    //@bp.route('/users/<int:id>/history-messages/',methods=['GET'])
    _getUserHistoryMessages(id){

      let from_id = this.$route.params.id;
      let page = this.$route.query.page || 1;
      let per_page = this.$route.query.per_page || 20;
      if(!from_id){
        return;
      }
      let path = `/users/${id}/history-messages/?page=${page}&per_page=${per_page}&from=${from_id}`
      
      this.$axios.get(path).then(res=>{
        this.his_messages = res.data
        console.log(res)
      }).catch(e=>{
        console.log(e)
      })
      
    }
  },
  created(){
    this._getUserHistoryMessages(this.shareState.user_id)

  },
  beforeRouteUpdate(to,from,next){
    next()
    this._getUserHistoryMessages(this.shareState.user_id)
    
  },
  mounted(){
    $("#send_frame").markdown({
      autofocus: false,
      savable: false,
      iconlibrary: "fa", // 使用Font Awesome图标
      language: "zh"
    });
  }
}
</script>

<style scoped>
.l-send-btn{
  right:2px;
  bottom: 2px;
}
</style>