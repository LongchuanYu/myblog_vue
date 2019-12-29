<template>
    <div class="card-body border d-flex justify-content-start">
        <img :src="member._links.avatar" alt="" class="mr-3" style="width:50px; height:50px;">
        <div class="align-self-center" style="font-size:0.9em;">
            <div class="d-flex flex-wrap justify-content-start mb-2">
                <span class="h6 mr-2 mb-0 font-weight-bold">{{member.username||member.name}}</span>
                <span class="small text-primary">关注{{member.followeds_count}}，</span> 
                <span class="small text-danger">粉丝{{member.followers_count}}</span>
            </div>
            <p class="mb-0" >
                <strong class="m-0">关注时间：</strong><span>{{member.timestamp}}</span>
            </p>
        </div>
        <div class="align-self-center ml-auto">
            <button class="btn btn-primary" @click="onClick">取消关注</button>
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
    },
    methods:{
        onClick(){
            console.log(this.member)
        }
    }
}
</script>