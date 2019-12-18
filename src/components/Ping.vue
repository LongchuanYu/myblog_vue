<template>
    <div class="container">
        <button @click="onClick">parent</button>
        <edit-post-modal  v-model="show" @clicka="onClicka"/>
    </div>
</template>

<script>
import store from '../store.js'
import EditPostModal from './EditPostModal'
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
        EditPostModal
    },
    methods:{
        onClicka(newVal){
            this.show = newVal
            
        },
        onClick(){
            this.show = !this.show
        }
    }
}
</script>