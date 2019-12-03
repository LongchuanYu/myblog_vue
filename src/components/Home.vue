<template>
    <div class="container">
        <alert 
            v-for="(alert,index) in alerts" :key="index"
            v-if="alert.showAlert"
            v-bind:variant="alert.alertVariant"
            v-bind:message="alert.alertMessage"
        >

        </alert>

    </div>
</template>

<script>
import Alert from './Alert'
export default {
    name:'Home',
    //组件包含组件
    components:{ 
        alert:Alert 
    },
    data(){
        return {
            alerts:[
                {
                    showAlert:true,
                    alertVariant:'danger',
                    alertMessage:0
                },{
                    showAlert:true,
                    alertVariant:'info',
                    alertMessage:1
                },{
                    showAlert:true,
                    alertVariant:'dark',
                    alertMessage:2
                },
                
            ]
        }
    }
}
</script>