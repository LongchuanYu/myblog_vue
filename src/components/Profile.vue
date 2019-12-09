<template>
<section>
    <div class="container">
        <div class="border p-3">
            <div class="row">
                
                <!-- 头像+edit按钮 -->
                <div class="col-sm-3">
                    <div class='avatar pb-3'>
                        <img :src="user._links.avatar" alt="" class="rounded img-fluid w-100" >
                    </div>
                    <router-link :to="{name:'EditProfile',params:{id:sharestate.user_id}}" v-if="sharestate.user_id == $route.params.id">
                        <button type="button" class="btn btn-outline-primary w-100 mb-5">Edit profile</button>
                    </router-link>
                    <button v-else type="button" class="btn btn-outline-secondary w-100 mb-5 disabled custom-btn">Edit profile</button>
                    
                </div>

                <!-- 个人资料 -->
                <div class="col-sm-9">
                    <!-- username -->
                    <div class="d-flex align-items-center justify-content-sm-between">
                        <h2 class="mb-3 font-weight-normal">{{user.username||user.name}}</h2>
                    </div>
                    <!-- Member since -->
                    <h6 class="mb-3 font-weight-normal">
                        <i class="far fa-user mr-2"></i>Member since：{{user.member_since ? $moment(user.member_since).format("YYYY-MM-DD HH:mm") : ""}}
                    </h6>
                    <h6 class="mb-3 font-weight-normal">
                        <i class="far fa-clock mr-2"></i>Last seen：{{user.last_seen ? $moment(user.last_seen).fromNow():""}}</h6>
                    <h6 class="mb-3 font-weight-normal">
                        <i class="far fa-address-card mr-2"></i>verified User：{{user.email}}
                    </h6>
                    <h6 class="mb-3 font-weight-normal"><i class="far fa-map mr-2"></i>{{user.location}}</h6>

                    <hr>
                    <!-- about me -->
                    <p class="lead">{{ user.about_me }}</p>
                </div>
            </div>
        </div>
    </div>   
</section>
</template>

<script>
import store from '../store.js'
export default {
    data(){
        return {
            sharestate:store.state,
            user:{
                'id': '',
                'email':'',
                'username': '',
                'name': '',
                'location': '',
                'about_me': '',
                'member_since': '', 
                'last_seen':'',
                '_links': {
                    'self': '',
                    'avatar': ''
                }
            }
        }
    },
    methods:{
        getUser(userid){
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
        //（？）这里怎么获取userid呢？
        //  1.用this.sharestate.user_id ,但这样无法动态响应路由变化。。
        //  2.通过this.$route.params.id来访问路由传参
        const userid = this.$route.params.id
        this.getUser(userid)
    },
    beforeRouteUpdate(to,from,next){
        this.getUser(to.params.id)
        next()
    }
}
</script>

<style scoped>
/*
    重写了按钮的disabled状态
 */
.custom-btn{
    cursor: not-allowed;
}
.custom-btn:focus{
    -webkit-box-shadow:0 0 0 0;
    box-shadow:0 0 0 0;
}
</style>