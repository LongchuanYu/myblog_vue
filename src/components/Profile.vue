<template>
    <div>
        <p>this is profile from {{userid}}</p>
    </div>
</template>

<script>
import store from '../store.js'
export default {
    data(){
        return {
            userid:store.state.user_id
        }
    }
}
</script>