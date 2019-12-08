<template>
    <div>
        <button type="button" class="btn btn-primary" @click="handleBtn">Test</button>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    // import的时候用name的值
    name:'Ping',
    data(){
        return {
            msg:'this is ping.vue component'
        }
    },
    methods:{
        handleBtn(){
            const path = 'http://127.0.0.1:5000/api/users?page=1&per_page=10';
            this.$axios({
                url:path,
                method:'get',
            }).then(res => {
                console.log(res)
            })
            .catch(e => {
                console.error(e);
            })
        },

    },
    created:function(){
    }
}
</script>