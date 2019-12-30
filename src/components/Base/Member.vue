<template>
    <div class="card-body border d-flex justify-content-start mb-2">
        <router-link :to="{path:`/user/${member.id}`}">
            <img :src="member._links.avatar" alt="" class="mr-3" style="width:50px; height:50px;">
        </router-link>
        
        <div class="align-self-center" style="font-size:0.9em;">
            <div class="d-flex flex-wrap justify-content-start mb-2 align-items-center">
                <span class="h6 mr-2 mb-0 font-weight-bold">{{member.username||member.name}}</span>
                <span class="small text-primary">关注 {{member.followeds_count}}，</span> 
                <span class="small text-danger">粉丝 {{member.followers_count}}</span>
            </div>
            <p class="mb-0" >
                <strong class="m-0">关注时间：</strong><span>{{$moment(member.timestamp).format('YYYY/MM/DD HH:mm:ss')}}</span>
            </p>
        </div>
        <div class="align-self-center ml-auto">
            <button v-if="member.is_following" class="btn btn-primary" @click="$emit('unfollow-user')">取消关注</button>
            <button v-else-if="!member.is_following && shareState.user_id != member.id" class="btn btn-primary" @click="$emit('follow-user')">关注</button>
        </div>
    </div>
</template>

<script>
import store from '../../store'
export default {
    name:'Member',
    props:['member'],
    data(){
        return {
            shareState:store.state
        }
    }
}
</script>