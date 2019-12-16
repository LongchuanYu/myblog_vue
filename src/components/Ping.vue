<template>
    <div class="container">
        <div class="col-md-4">
            <form @submit.prevent="onSubmit">
            <div class="form-group">
                <label for="title">title</label>
                <input type="text" class="form-control" id="title" aria-describedby="emailHelp" v-model="title">
                <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
            </div>
            <div class="form-group">
                <label for="textbody">body</label>
                <textarea rows="5" class="form-control" id="textbody" v-model="textbody"></textarea>
            </div>
            <button type="submit" class="btn btn-primary">Submit</button>
            </form>
        </div>
    </div>
</template>

<script>
import store from '../store.js'
export default {
    // import的时候用name的值
    name:'Ping',
    data(){
        return {
            sharestate:store.state,
            title:'',
            textbody:''

        }
    },
    methods:{
        onSubmit(){
            let str = '    1'
            console.log(str)
            console.log($.trim(str))
        },
        _updatepost(id){
            console.log("update post..")
            const path = '/posts/'+String(id)
            let payload = {
                title:this.title,
                body:this.textbody
            }
            this.$axios.put(path,payload)
            .then(res=>{
                console.log(res)
            })
            .catch(e=>{
                console.log(e.response)
            })
        },
        _createpost(){
           console.log("create post..")
            const path = '/posts'
            let payload = {
                title:this.title,
                body:this.textbody,
                author_id:this.sharestate.user_id
            }
            this.$axios.post(path,payload)
            .then(res=>{
                console.log(res)
            })
            .catch(e=>{
                console.log(e.response)
            })
        }

    }
}
</script>