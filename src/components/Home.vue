<template>
    <div class="container">
        <form v-if="sharestate.is_authenticated" @submit.prevent="onSubmitAdd" class = "mb-4">
            <div class="form-group">
                <input type="text" v-model="postForm.title" class="form-control" id="post_title" placeholder="标题">
            </div>
            <div class="form-group">
                <input type="text" v-bind="postForm.summary" class="form-control" id="post_summary" placeholder="摘要">
            </div>
            <div class="form-group">
                <textarea v-model="postForm.body" id="post_body" rows="5" class="form-control"></textarea>
            </div>
            <button type="submit" class="btn btn-primary">Submit</button>
        </form>
        <div class="card border-0 mb-4">
            <!-- 列表头部 -->
            <div class="card-header d-flex align-items-center justify-content-between bg-light border-0 mb-3">
                <div class="float-left"> <!-- posts总览 -->
                    <i class="fa fa-commenting-o"></i>
                    All Posts<small class="font-weight-normal">（共{{posts._meta?posts._meta.total_items:''}}篇，{{posts._meta?posts._meta.total_pages:''}}页）</small>
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
            <!-- posts列表 -->
            <div v-if="posts">
            <div class="card-body border mb-3" v-for="(post,index) in posts.items" v-bind:key="index">
                <div class="container" >
                    <div class="row">
                        <div class="col-1"><!-- 头像列 -->
                            <img :src="post.author._links.avatar" alt="" class="rounded img-thumbnail" style="min-width:20px">
                        </div>
                        <div class="col-11"><!-- 内容列 -->
                            <div class="mb-2" ><!-- 标题行 -->
                                <div class="d-inline-block text-truncate" style="width:70%;">
                                    <span class="h4">
                                        {{post.title}}
                                    </span>
                                </div>
                                <!-- 
                                    （？）获取的post表里面只有author_id，怎么获取用户名呢？
                                        1.后端传过来的posts中包含author信息
                                -->
                                <div class="d-inline-block float-right  text-truncate" >
                                    <small>{{$moment(post.timestamp).fromNow()}} /</small>
                                    <router-link :to="{name:'Profile',params:{id:post.author.id}}"><small>{{post.author.username||post.author.name}}</small></router-link>
                                </div>
                            </div>
                            <!-- 文章summary -->
                            <div class="d-block text-wrap overflow-hidden mb-2" style="height:6em">
                                {{post.summary}}
                            </div>
                            <!-- 操作栏 -->
                            <div class="d-flex justify-content-between align-items-center">
                                <div class="">
                                    <i class="fa fa-eye"></i>1112
                                </div>
                                <div class="btn-group" role="group">
                                    <button type="button" class="btn btn-outline-secondary btn-sm">删除</button>
                                    <button type="button" class="btn btn-outline-secondary btn-sm">删除</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div> <!-- card body结束 -->
            </div>
            <!-- -------------Pagination-------------- -->
            <nav>
                <ul class="pagination">
                    <!-- 
                        （？）如何实现到达第一页时，上一页按钮灰掉 
                            答：'disabled':posts._meta.page<=1?true:false
                                注意一定要用三元运算符指定true或者false，只写<=1是不对的
                    -->
                    <li v-bind:class="{'page-item':true,'disabled':posts._meta.page<=1?true:false}">
                        <router-link 
                        :to="{name:'Home',query:{page:posts._meta.page-1 , per_page:posts._meta.per_page}}" 
                        class="page-link" >
                            &laquo;
                        </router-link>
                    </li>
                    <!-- 
                        （？）分页怎么让点击的页码突出色显示？
                            1.路由的page（点击的）和当前page（显示的）比较
                            2.如果是从主页进入（即没有路由query），并且页码是1的按钮亮起来。
                     -->
                    <li v-bind:class="{'page-item':1,'active':$route.query.page==page || (!$route.query.page && page==1)}" v-for="(page,index) in iter_pages" v-bind:key="index">
                        <router-link :to="{name:'Home',query:{page:page,per_page:posts._meta.per_page}}"><a class="page-link">{{page}}</a></router-link>
                        
                    </li>


                    <li v-bind:class="{'page-item':true,'disabled':posts._meta.page>=posts._meta.total_pages?true:false}">
                        <router-link 
                        :to="{name:'Home',query:{page:posts._meta.page+1 , per_page:posts._meta.per_page}}" 
                        class="page-link" >
                            &raquo;
                        </router-link>
                    </li>
                </ul>
            </nav>
        </div> <!--card 结束-->
    </div> <!--Container结束-->
</template>

<script>
import store from '../store.js'
import '../assets/bootstrap-markdown/js/bootstrap-markdown.js'
import '../assets/bootstrap-markdown/js/bootstrap-markdown.zh.js'
import '../assets/bootstrap-markdown/js/marked.js'
export default {
    name:'Home',
    //组件包含组件
    components:{ 
        
    },
    data(){
        return {
            sharestate:store.state,
            posts:{
                _meta:{
                    page:1,
                    per_page:10
                }
            },
            iter_pages:[], //Pagination
            postForm:{
                title:'',
                summary:'',
                body:''
            }
        }
    },
    methods:{
        _getPosts(){
            let page = 1
            let per_page = 4
            if (typeof this.$route.query.page != 'undefined'){
                page = this.$route.query.page
            }
            if (typeof this.$route.query.per_page!='undefined'){
                per_page = this.$route.query.per_page
            }
            let path = '/posts'
            this.$axios.get(path,{
                params:{
                    page:page,
                    per_page:per_page
                }
            }).then(res=>{  
                console.log(res)              
                this.posts = res.data
                let c = this.posts._meta.page
                let arr = [1,c-2,c-1,  c  ,c+1,c+2,this.posts._meta.total_pages] //7 ittems
                arr = arr.filter(item=>{
                    return item>0 && item<=this.posts._meta.total_pages
                })
                arr = [...new Set(arr)]
                if(arr.length>1 && arr[0]+1 != arr[1]){
                    arr.splice(1,0,'NaN')
                }
                if (arr.length>1 && arr[arr.length-1]-1 != arr[arr.length-2]){
                    arr.splice(arr.length-1,0,"NaN")
                }
                this.iter_pages = arr

            }).catch(e=>{
                console.log(e)
            })
        },
        test(page,index){
            console.log(this.$route.query.page)
            console.log(page,index)
        }
    },
    created:function(){
        this._getPosts()
        $(document).ready(function(){
            $("#post_body").markdown({
                autofocus:false,
                savable:false,
                iconlibrary: 'fa',  // 使用Font Awesome图标
                language: 'zh'
            })
        })
        
        
    },
    beforeRouteUpdate(to,from,next){
        next()
        this._getPosts()
    }
}
</script>