<template>
  <div class="border-left col-9" style="height:100%;">
    <!-- 消息框 -->
    <div class="border p-3" style="height:calc(100% - 200px);overflow:auto" id="message-body">
      <!-- loading -->
      <div class="typing_loader" v-if="show"></div>
      <!-- （？）记得这里加上overflow-hidden，否则长句子的聊天框后会出现重叠的情况 -->
      <div v-else class="overflow-hidden" style="min-height:48px;margin-bottom:15px;" v-for="(message,index) in his_messages.items" :key="index" >
        <template v-if="message.sender.id==shareState.user_id">
          <router-link :to="{path:`/user/${message.sender.id}`}" class="float-right ml-2" >
            <img :src="message.sender._links.avatar" alt="" style="width:30px;height:30px; border-radius:50%">
          </router-link>
          <div class="float-right l-msg-frame">{{message.body}}</div>
        </template>

        <template v-else>
          <router-link :to="{path:`/user/${message.sender.id}`}" class="float-left mr-2" >
            <img :src="message.sender._links.avatar" alt="" style="width:30px;height:30px; border-radius:50%">
          </router-link>
          <div class="float-left l-msg-frame">{{message.body}}</div>
        </template>
        <!-- <div class="float-left l-msg-frame" v-else>{{message.body}}</div> -->
      </div>

    </div>
    <!-- 发送框 -->
    <div class="position-relative" style="min-height:100px;">
      <div class="form-group">
        <textarea v-model="send_message" id="send_frame" rows="5" class="form-control"></textarea>
      </div>
      <button type="button" class="btn btn-secondary btn-sm l-send-btn position-absolute" @click="handleSendMessage">发送</button>
    </div>
  </div>
</template>

<script>
import VueMarkdown from "vue-markdown";
import store from "@/store.js";
export default {
  data(){
    return {
      shareState:store.state,
      his_messages:'',
      send_message:'',
      show:false
    }
  },
  components:{VueMarkdown},
  methods:{
    //@bp.route('/users/<int:id>/history-messages/',methods=['GET'])
    _getUserHistoryMessages(id){
      this.show=true
      let from_id = this.$route.params.id;
      let page = this.$route.query.page || 1;
      let per_page = this.$route.query.per_page || 10000;
      if(!from_id){
        return;
      }
      let path = `/users/${id}/history-messages/?page=${page}&per_page=${per_page}&from=${from_id}`
      
      this.$axios.get(path).then(res=>{
        this.his_messages = res.data
        this.show=false
        console.log(res)
      }).catch(e=>{
        console.log(e)
      })
      
    },
    handleSendMessage(e){
      if(!this.send_message){
        return
      }
      let payload = {
        "body":this.send_message,
        "recipient_id":this.$route.params.id
      }
      const path = '/messages'
      this.$axios.post(path,payload).then(res=>{
        this.send_message=''
        this._getUserHistoryMessages(this.shareState.user_id)
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
  },
  updated(){
    $('#message-body').scrollTop($('#message-body').get(0).scrollHeight)
 
  }
}
</script>

<style scoped>
.l-send-btn{
  right:2px;
  bottom: 2px;
}
.l-msg-frame{
  padding:10px;
  background-color: rgba(185, 223, 228, 0.562);
  border-radius: 10px;
  /*（？）解决两个float的元素两行显示的问题，由于消息框太宽，挤成两行了*/
  max-width: 90%;
}
/*Typing Loader*/
.typing_loader{
    width: 10px;
    height: 10px;
    border-radius: 50%;
    -webkit-animation: typing 1s linear infinite alternate;
       -moz-animation: Typing 1s linear infinite alternate;
       -ms-animation: Typing 1s linear infinite alternate;
            animation: typing 1s linear infinite alternate;
    margin: 46px auto; /* Not necessary- its only for layouting*/
    position: relative;
    left: -12px;
}
@-webkit-keyframes typing{
   0%{
        background-color: rgb(0, 0, 0);
        box-shadow: 12px 0px 0px 0px rgba(58, 58, 58, 0.2),
                    24px 0px 0px 0px rgba(58, 58, 58, 0.2);
      }
    25%{
        background-color: rgba(0, 0, 0, 0.4);
        box-shadow: 12px 0px 0px 0px rgba(58, 58, 58,2),
                    24px 0px 0px 0px rgba(58, 58, 58,0.2);
    }
    75%{ background-color: rgba(0, 0, 0, 0.4);
        box-shadow: 12px 0px 0px 0px rgba(58, 58, 58,0.2),
                    24px 0px 0px 0px rgba(58, 58, 58,1);
      }
}

@keyframes typing{
   0%{
        background-color: rgb(0, 0, 0);
        box-shadow: 12px 0px 0px 0px rgba(58, 58, 58, 0.2),
                    24px 0px 0px 0px rgba(58, 58, 58, 0.2);
      }
    25%{
        background-color: rgba(0, 0, 0, 0.4);
        box-shadow: 12px 0px 0px 0px rgba(58, 58, 58,2),
                    24px 0px 0px 0px rgba(58, 58, 58,0.2);
    }
    75%{ background-color: rgba(0, 0, 0, 0.4);
        box-shadow: 12px 0px 0px 0px rgba(58, 58, 58,0.2),
                    24px 0px 0px 0px rgba(58, 58, 58,1);
      }
}

</style>