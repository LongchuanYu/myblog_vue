<template>
    <div class="card border-0 mb-3 mt-3">
        <!-- 列表头部 -->
        <div class="card-header d-flex align-items-center justify-content-between bg-light border-0 mb-3">
            <div class="float-left"> <!-- posts总览 -->
                <i class="fa fa-commenting-o"></i>
                所有关注<small class="font-weight-normal">（共{{followeds?followeds._meta.total_items:''}}个，{{followeds?followeds._meta.total_pages:''}}页）</small>
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
            v-for="(followed,index) in followeds.items" :key="index"
            :member="followed"
            @follow-user="onFollowUser(followed)"
            @unfollow-user="onUnfolloweUser(followed)"
        ></member>
    </div>
</template>

<script>
import Member from '../Base/Member'
export default {
    data(){
        return {
            user:'',
            followeds:''
        }
    },
    components:{
        'member':Member
    },
    methods:{
        onFollowUser(followed){
            const path = `/follow/${followed.id}`
            this.$axios.get(path).then(res=>{
                this._getUserFolloweds(this.$route.params.id)
            })
        },
        onUnfolloweUser(followed){
            const path = `/unfollow/${followed.id}`
            this.$axios.get(path).then(res=>{
                this._getUserFolloweds(this.$route.params.id)
            })
        },
        _getUser(id){
            const path = `/users/${id}`
            this.$axios.get(path).then(res=>{
                // console.log('user: ',res.data)
                this.user = res.data
            }).catch(e=>{
                console.error(e)
            })
        },
        _getUserFolloweds(id){
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

            const path = `/users/${id}/followeds/`
            let payload = {
                page:page,
                per_page:per_page
            }
            this.$axios.get(path,{
                params:payload
            }).then(res=>{
                // console.log('followeds',res)
                this.followeds = res.data
            }).catch(e=>{
                console.error(e)
            })
        }
    },
    created:function(){
        let userid = this.$route.params.id
        this._getUser(userid)
        this._getUserFolloweds(userid)
    },
    beforeRouteUpdate(to,from,next){
        next()
        this._getUser(to.params.id)
        this._getUserFolloweds(to.params.id)

    }
}
</script>