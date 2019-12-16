<template>
    <div class="container">
        <div class="row">
            <div class="col-md-9">
                <article>
                    <vue-markdown
                        :source="post.body"
                        toc
                        :toc-first-level="1"
                        :toc-last-level="3"
                        class="markdown-body">
                    </vue-markdown>
                </article>


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
        _getPost(){
            const postid = this.$route.params.id
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
        this._getPost()
    }
}
</script>