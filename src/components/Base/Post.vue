<template>
    <div class="container">        
        <div class="card-body border mb-3 d-flex align-items-start">
            <div class=""><!-- 头像列 -->
                <img :src="post.author._links.avatar" alt="" class="d-flex mr-4" style="width:50px">
            </div>
            <div class="w-75" style="flex:1;"><!-- 内容列 -->
                <div class="mb-2 d-flex justify-content-between flex-wrap" ><!-- 标题行 -->
                    <router-link :to="{name:'PostDetail',params:{id:post.id}}" class="h5 text-truncate w-75">{{post.title}}</router-link>
                    <!-- 
                        （？）获取的post表里面只有author_id，怎么获取用户名呢？
                            1.后端传过来的posts中包含author信息
                    -->
                    <div class="d-inline-block  text-truncate" >
                        <small>{{$moment(post.timestamp).fromNow()}} /</small>
                        <router-link :to="{path:`/user/${post.author.id}`}">
                            <small>{{post.author.username||post.author.name}}</small>
                        </router-link>
                    </div>
                </div>
                <!-- 文章summary -->
                <div class="d-block text-wrap overflow-hidden mb-2" style="height:3em">
                    {{post.summary}}
                </div>
                <!-- 操作栏 -->
                <div class="d-flex justify-content-between align-items-center">
                    <div class="">
                        <i class="fa fa-eye text-muted mr-1"></i><small>{{post.views}}</small>
                    </div>
                    <div class="btn-group" role="group">
                        <button type="button" 
                            class="btn btn-outline-secondary btn-sm" 
                            data-toggle="modal" 
                            data-target="#exampleModal"
                            :disabled="sharestate.user_id == post.author.id? false:true"
                            @click="$emit('edit-post')">编辑</button>
                        <button type="button" 
                            class="btn btn-outline-secondary btn-sm" 
                            data-toggle="modal" 
                            data-target="#modalDelete" 
                            :disabled="sharestate.user_id == post.author.id? false:true"
                            @click="$emit('del-post')">删除</button>
                    </div>
                </div>
            </div>
        </div> <!-- card body结束 -->
    </div>
</template>

<script>
import store from '../../store'
// 导入 vue-markdown 组件解析 markdown 原文为　HTML
import VueMarkdown from 'vue-markdown'
export default {
    props:['post'],
    components:{
        VueMarkdown
    },
    data(){
        return {
            sharestate:store.state
        }
    }
}
</script>
