<template>
    <div class="">
                    
        <!-- username -->
        <div class="d-flex align-items-center justify-content-sm-between">
            <h2 class="mb-3 font-weight-normal">{{user.username||user.name}}</h2>
        </div>
        <!-- Member since -->
        <h6 class="mb-3 font-weight-normal">
            <i class="fa fa-user-o mr-2"></i>Member since：{{user.member_since ? $moment(user.member_since).format("YYYY-MM-DD HH:mm") : ""}}
        </h6>
        <h6 class="mb-3 font-weight-normal">
            <i class="fa fa-clock-o mr-2"></i>Last seen：{{user.last_seen ? $moment(user.last_seen).fromNow():""}}</h6>
        <h6 class="mb-3 font-weight-normal">
            <i class="fa fa-address-card-o mr-2"></i>verified User：{{user.email}}
        </h6>
        <h6 class="mb-3 font-weight-normal"><i class="fa fa-map-marker mr-2"></i>{{user.location}}</h6>

        <hr>
        <!-- about me -->
        <p class="lead">{{ user.about_me }}</p>
    </div>
</template>

<script>
export default {
    data(){
        return {
            user:''
        }
    },
    methods:{
        getUser(userid){
            //（？）如何实现范围外的userid引发404错误，然后返回原路由？
            //  在全局axios中实现，拦截了response。对于404，route.back()
            //（？）为何在Profile页面登录后没有route.back()?而是进入/user/0的路由？
            //  1.未登录状态下Profile的路由是/user/0，在这个时候登录自然是进入/user/0的路由了。
            //  2.store.js中：退出的时候会有一个清理动作，把userid设置为0
            //  ....因此在未登录状态下点击Profile按钮就是/user/0
            //  ....修复方法在当前组件的created函数里面，通过跳转到正确路由来解决

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
        let userid = this.$route.params.id
        if (userid=="0"){
            userid = this.sharestate.user_id
            this.$router.replace(`/user/${userid}`)
        }
        this.getUser(userid)
    },
    beforeRouteUpdate(to,from,next){
        next()
        this.getUser(to.params.id)
        
    }
}
</script>