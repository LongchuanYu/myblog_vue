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
            <div class="card-header d-flex align-items-center justify-content-between bg-light border-0">
                <!-- 分页信息显示 -->
                <div class="float-left">
                    <i class="fa fa-commenting-o"></i>
                    All Posts<small class="font-weight-normal">（共-篇，-页）</small>
                </div>
                <!-- 其他选择 -->
                <div>
                    <i class="fa fa-bars"></i>
                </div>
                <!-- Main posts -->

            </div>
        </div>
    </div>
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
            postForm:{
                title:'',
                summary:'',
                body:''
            }
        }
    },
    methods:{
        _getPosts(){
            
            path = '/posts/'
        }
    },
    created:function(){
        $(document).ready(function(){
            $("#post_body").markdown({
                autofocus:false,
                savable:false,
                iconlibrary: 'fa',  // 使用Font Awesome图标
                language: 'zh'
            })
        })
        
    }
}
</script>