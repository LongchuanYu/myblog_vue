<template>
    <div>
        <button type="button" class="btn btn-primary" @click="handleBtn">{{msg}}</button>
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
            this.$toasted.show('yes')
        //     const path = 'http://localhost:5000/api/tokens';
        //     axios({
        //         url:path,
        //         method:'post',
        //         auth:{
        //             username:"liyang3",
        //             password:"1234"
        //         }
        //     }).then(res => {
        //         // res = res.data.token.split('.')[0]

        //         // console.log(JSON.parse(atob(res)))
        //         var ret = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9"
        //         console.log(atob(ret))
        //     })
        //     .catch(e => {
        //         console.error(e);
        //     })
        },

    },
    created:function(){
    }
}
</script>