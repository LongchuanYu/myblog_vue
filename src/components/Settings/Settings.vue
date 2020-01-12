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
            :to="{name:'SettingProfile'}" 
            v-bind:active-class="'active'"
            href="#" 
            :class="isUserProfile"
            class="list-group-item list-group-item-action border-0 p-2">
              <i class="fa fa-pencil-square-o mr-2"></i> Profile
            </router-link>
            <router-link 
            :to="{name:'SettingAccount'}"
            v-bind:active-class="'active'" 
            href="#" 
            class="list-group-item list-group-item-action border-0 p-2">
              <i class="fa fa-user-o mr-2"></i> Account
            </router-link>
            <router-link 
            :to="{name:'SettingEmail'}" 
            v-bind:active-class="'active'"
            href="#" 
            class="list-group-item list-group-item-action border-0 p-2">
              <i class="fa fa-envelope-o mr-2"></i> Email
            </router-link>
            <router-link 
            :to="{name:'SettingNotiffication'}" 
            v-bind:active-class="'active'"
            href="#" 
            class="list-group-item list-group-item-action border-0 p-2">
              <i class="fa fa-bell-o mr-2"></i> Notiffication
            </router-link>
          </div>  <!-- end item list -->
          
        </div>
			</div>


			<div class="col-lg-8">
				<div class="card-body border" style="">
					<router-view></router-view>
				</div>
			</div>
				
		</div>
	</div>
</template>

<script>
import store from '../../store'
export default {
    data(){
      return {
        shareState:store.state,
        user:{
          username:'',
          name:'',
          _links:{
            avatar:''
          }
        }
      }
    },
    computed:{
      isUserProfile:function(){
        if(this.$route.path==='/settings'){
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
        }
    },
    created:function(){
      this._getUser(this.shareState.user_id)
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