<template>
    <div class="container">
        <div class="row">
            <!-- Article Content -->
            <div class="col-md-9">
                <article>
                    <vue-markdown
                        :source="post.body"
                        toc
                        :toc-first-level="1"
                        :toc-last-level="3"
                        toc-id="toc"
                        toc-anchor-link-space
                        class="markdown-body">
                    </vue-markdown>
                </article> 
            </div>  <!-- End Article Content -->
            <div class="col-md-3">
                <div id="sticker">
                    <div id="tocHeader" >
                        <h2>文章目录</h2>
                    </div>
                    <div id="toc" class="toc"></div>

                </div>
            </div>
        </div>
    </div>
</template>

<script>
import store from '../store.js'
import VueMarkdown from 'vue-markdown'
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
    // beforeRouteUpdate(to,from,next){
    //     this._getPost(to.params.id)
    //     next()
    // }
}
</script>