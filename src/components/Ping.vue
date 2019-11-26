<template>
    <div>
        <p>{{msg}} </p>
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
        getMessage(){
            const path = 'http://localhost:5000/api/ping';
            axios.get(path).then(res => {
                this.msg = res.data;
            })
            .catch(e => {
                console.error('error');
            })
        },

    },
    created:function(){
        this.getMessage();
    }
}
</script>