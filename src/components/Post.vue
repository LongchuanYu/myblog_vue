<template>
    <div class="container">
        <div class="row">
            <!-- Article Content -->
            <div class="col-md-9">
                <article class="">
                    <!-- 标题 -->
                    <header class="mb-3">
                        <div class="h3 text-info text-break mb-3">{{post.title}}</div>
                        <div class="mb-3">
                            info1、info2
                        </div>
                        <hr>
                    </header>
                    <vue-markdown
                        :source="post.body"
                        toc
                        :toc-first-level="1"
                        :toc-last-level="3"
                        toc-id="toc"
                        @toc-rendered="tocAlready"
                        class="markdown-body text-break text-wrap">
                    </vue-markdown>
                </article> 
            </div>  <!-- End Article Content -->

            <!-- TOC -->
            <div class="col-md-3">
                <div id="sticker">
                    <div id="tocHeader" >
                        <div class="h5 text-secondary">文章目录</div>
                    </div>
                    <div id="toc" class="toc"></div>

                </div>
            </div><!-- End TOC -->
            
        </div>
    </div>
</template>

<script>
import store from '../store.js'
import VueMarkdown from 'vue-markdown'
import '../assets/jquery.sticky'

export default {
    data(){
        return {
            sharestate:store.state,
            post: {}
        }
    },
    components:{
        VueMarkdown
    },
    methods:{
        tocAlready(){
            $("#sticker").sticky({topSpacing:10});
        },
        _getPost(postid){
            
            let path = `/posts/${postid}`
            this.$axios.get(path)
            .then(res=>{
                this.post = res.data
                console.log(res)
            }).catch(e=>{
                console.log(e)
            })
        }
    },
    created:function(){
        const postid = this.$route.params.id
        this._getPost(postid)
    },
    beforeRouteUpdate(to,from,next){
        this._getPost(to.params.id)
        next()
    }
}
</script>

<style>
.toc {
    font-size: 0.9em;
}
.toc ul {
    list-style-type: none;
}
.toc > ul{
    padding-left: 0;
}
.toc > ul > li > ul {
    padding-left: 1em;
}
.toc > ul > li > ul > li > ul {
    padding-left: 1.2em;    
}

</style>