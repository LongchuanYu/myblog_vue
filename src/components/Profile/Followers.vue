<template>
    <div class="card border-0 mb-3 mt-3">
        <!-- 列表头部 -->
        <div class="card-header d-flex align-items-center justify-content-between bg-light border-0 mb-3">
            <div class="float-left"> <!-- posts总览 -->
                <i class="fa fa-commenting-o"></i>
                所有粉丝<small class="font-weight-normal">（共{{followers?followers._meta.total_items:''}}个，{{followers?followers._meta.total_pages:''}}页）</small>
            </div>
            <div class="dropdown"> <!-- 其他选择，弹出选项 -->
                <div class="" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <i class="fa fa-bars"></i>
                </div>
                <div class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuButton">
                    <a href="#" class="dropdown-item">haha</a>
                </div>
            </div>
        </div>
        <!-- 列表body -->
        <member
            v-for="(follower,index) in followers.items" :key="index"
            :member="follower"
            @follow-user="onFollowUser(follower)"
            @unfollow-user="onUnfolloweUser(follower)"
        ></member>
        <pagination 
            v-if="followers._meta"
            :curPage="followers._meta.page"
            :perPage="followers._meta.per_page"
            :totalPage="followers._meta.total_pages"
        ></pagination>
    </div>
</template>

<script>
import Member from '../Base/Member'
import store from '../../store'
import pagination from '../Base/Pagination'
export default {
    data(){
        return {
            shareState:store.state,
            followers:''
        }
    },
    components:{
        pagination,
        'member':Member
    },
    methods:{
        onFollowUser(follower){
            const path = `/follow/${follower.id}`
            this.$axios.get(path).then(res=>{
                this.$router.push({ path: this.$route.fullPath, query: { timestamp: Number(new Date()) } })
                // this._getUserFollowers(this.$route.params.id||this.shareState.user_id)
            })
        },
        onUnfolloweUser(follower){
            const path = `/unfollow/${follower.id}`
            this.$axios.get(path).then(res=>{
                //（？）这里关注成功以后怎么局部刷新呢？
                //  答:沙雕了，组件created的时候就是调用_getUserFollowers()方法获取数据的。
                //  注意这里参数一定要是当前用户的id。
                // this._getUserFollowers(this.$route.params.id||this.shareState.user_id)
                this.$router.push({ path: this.$route.fullPath, query: { timestamp: Number(new Date()) } })
            })
        },
        _getUserFollowers(id){
            //构造默认page和per_page
            let page = 1
            let per_page = 5
            if(typeof this.$route.query.page!='undefined'){
                page = this.$route.query.page
            }
            if(typeof this.$route.query.per_page != 'undefined'){
                per_page = this.$route.query.per_page
            }
            // const path = `/users/${id}/followers/?page=${page}&per_page=${per_page}`

            const path = `/users/${id}/followers/`
            let payload = {
                page:page,
                per_page:per_page
            }
            this.$axios.get(path,{
                params:payload
            }).then(res=>{
                // console.log(res)
                console.log('new fans:',res.data)
                this.followers = res.data
            }).catch(e=>{
                console.error(e)
            })
        }
    },
    created:function(){
        let userid = this.$route.params.id || this.shareState.user_id
        this._getUserFollowers(userid)
    },
    beforeRouteUpdate(to,from,next){
        next()
        let userid = to.params.id || this.shareState.user_id
        this._getUserFollowers(userid)

    }
}
</script>