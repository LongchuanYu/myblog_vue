<template>
    <div class="container">
        <!-- <button @click="onClick">parent:{{show}}</button> -->
        <!-- <edit-post-modal  v-model="show" @clicka="(val)=>{show=val}"/> -->
    </div>
</template>

<script>
import store from '../store.js'
// import EditPostModal from './User/Settings/EditPostModal'
export default {
    // import的时候用name的值
    name:'Ping',
    data(){
        return {
            show:false,
            sharestate:store.state,
            title:'',
            textbody:'',
            editForm:{
                title:'123',
                summary:'321',
                body:'1234567',
                errors:0,
                titleError:null,
                bodyError:null
            }

        }
    },
    components:{
        
    },
    methods:{
        onClick(){
            this.show = !this.show
        }
    }
}
</script>