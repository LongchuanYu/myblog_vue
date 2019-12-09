<template>
    <div>
        <router-link to='/'>
            <button>route test</button>
        </router-link>
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
            var lastseen = new Date().toUTCString()
            console.log(lastseen)
            console.log(this.$moment(lastseen).format('YYYY-MM-DD HH:mm'))
            //console.log(this.$moment(lastseen).utcOffset("+08:00").format('YYYY-MM-DD HH:mm'))
            // const path = 'http://127.0.0.1:5000/api/users?page=1&per_page=10';
            // this.$axios({
            //     url:path,
            //     method:'get',
            // }).then(res => {
            //     console.log(res)
            // })
            // .catch(e => {
            //     console.error(e);
            // })
        }

    }
}
</script>