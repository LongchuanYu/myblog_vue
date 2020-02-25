<template>
	<div class="container">
		<div class="row">
			<div class="col-lg-3 mb-5">
        <div class="border p-4" style="height:400px;">
          <!-- avatar -->
          <div class="d-flex flex-column justify-content-center align-items-center">
            <img :src="user._links.avatar" alt="" style="width:100px;height:100px; border-radius:50%" class="mb-2">
            <span>{{user.username||user.name}}</span>
          </div>
          <hr>
          <!-- item list -->
          <div class="list-group list-group-flush ">
            <router-link 
            :to="{name:'RecivedComments'}" 
            v-bind:active-class="'active'"
            href="javascript:;" 
            :class="isComments"
            class="list-group-item list-group-item-action border-0 p-2">
              <i class="fa fa-pencil-square-o mr-2"></i> 回复我的 
              <span class="badge badge-danger g-font-size-dot7 ml-1" v-if="shareState.is_authenticated && notifications.unread_recived_comments_count">{{notifications.unread_recived_comments_count}}</span>
            </router-link>



            <router-link 
            :to="{name:'RecivedMessages'}"
            v-bind:active-class="'active'" 
            href="javascript:;" 
            class="list-group-item list-group-item-action border-0 p-2">
              <i class="fa fa-user-o mr-2"></i> 私信
            </router-link>


            <router-link 
            :to="{name:'Follows'}" 
            v-bind:active-class="'active'"
            href="javascript:;" 
            class="list-group-item list-group-item-action border-0 p-2">
              <i class="fa fa-envelope-o mr-2"></i> 新粉丝
              <span class="badge badge-danger g-font-size-dot7 ml-1" v-if="shareState.is_authenticated && notifications.unread_follows_count">{{notifications.unread_follows_count}}</span>
            </router-link>



            <router-link 
            :to="{name:'CommentsLikes'}" 
            v-bind:active-class="'active'"
            href="javascript:;" 
            class="list-group-item list-group-item-action border-0 p-2">
              <i class="fa fa-bell-o mr-2"></i> 收到的赞
              <span class="badge badge-danger g-font-size-dot7 ml-1" v-if="shareState.is_authenticated && notifications.unread_likes_count">{{notifications.unread_likes_count}}</span>
            </router-link>
          </div>  <!-- end item list -->
          
        </div>
			</div>


			<div class="col-lg-8">
				<div class="" style="">
					<router-view ></router-view>
				</div>
			</div>
				
		</div>
	</div>
</template>

<script>
import store from '../../store'
import axios from 'axios'
import clear_comments from '../utility/clear_comments'
export default {
    data(){
      return {
        shareState:store.state,
        routeName:['RecivedComments','RecivedMessages','Follows','CommentsLikes'],
        user:{
          username:'',
          name:'',
          _links:{
            avatar:''
          }
        },
        notifications: {
          unread_recived_comments_count: 0,
          unread_messages_count: 0,
          unread_follows_count: 0,
          unread_likes_count: 0,
          unread_followeds_posts_count: 0
        }
      }
    },
    computed:{
      isComments:function(){
        if(this.$route.path==='/notifications'){
          return 'active'
        }else{
          return ''
        }
      }
    },
    methods:{
        _getUser(userid){
            this.$axios.get(`/users/${userid}`)
            .then((res)=>{
              this.user = res.data
            })
            .catch((e)=>{
              console.log(e)
            })
        },
        _getUserNotifications(){
          let path = `/users/${this.shareState.user_id}/notifications`
          
          this.$axios.get(path).then(res=>{
            //res.data[].id/name/payload_json/
            for(let i=0;i<res.data.length;i++){
              switch(res.data[i].name){
                case 'unread_recived_comments_count':
                  this.notifications.unread_recived_comments_count = res.data[i].payload_json
                  break;
                case 'unread_follows_count':
                  this.notifications.unread_follows_count = res.data[i].payload_json;
                  break;
                case 'unread_likes_count':
                  this.notifications.unread_likes_count = res.data[i].payload_json;
                  break;
              }
            }

          }).catch(e=>{
            console.log('setInterValError:',e)
          })
        },
    },
    created:function(){
      this._getUserNotifications()
      this._getUser(this.shareState.user_id)
    },
    beforeRouteUpdate(to,from,next){
      this.shareState.notifications.leaveRouteName = to.name
      if(from.path != to.path){
        //非分页跳转的情况，把from的消息清掉
        let thisType = this.routeName.indexOf(from.name)
        if(thisType!=-1){
          // console.log(thisType)
          clear_comments({that:this,type:thisType})
        }
        
      }
      next()
      this._getUserNotifications()
    },
    beforeRouteLeave(to,from,next){
      //路由离开前把from的消息清掉
      let thisType = this.routeName.indexOf(from.name)
      if(thisType!=-1){
        clear_comments({that:this,type:thisType})
      }
      next()
    }
}
</script>
<style scoped>
.list-group-item.active{
  color:#8acd9a;
  background-color: #f7f7f7 !important;
}
.list-group-item:hover{
  color:#8acd9a;
}
</style>