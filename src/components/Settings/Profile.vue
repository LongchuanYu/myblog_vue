<template>
    <div class="">
			<form @submit.prevent="onSubmit">
				<div class="form-group">
					<label for="nickname">名字</label>
					<input type="text" class="form-control" id="nickname" v-model="profileForm.name">
						
				</div>
				<div class="form-group">
					<label for="location">我的位置</label>
					<input type="text" class="form-control" id="location" v-model="profileForm.location">
				</div>
				<div class="form-group">
					<label for="aboutme">个性签名</label>
					<textarea class="form-control" id="aboutme" rows="5" v-model="profileForm.about_me"></textarea>
				</div>
				<button type="submit" class="btn btn-primary">提交</button>
			</form>
    </div>
</template>


<script>
import store from '../../store.js'
export default {
    data(){
        return {
            shareState:store.state,
            profileForm:{
                name:'',
                location:'',
                about_me:'',
                submitted:false
            }
        }
    },
    methods:{
        onSubmit:function(){
            const {name,location,about_me} = this.profileForm
            let payload = {
                username:name,
                location:location,
                about_me:about_me
            }
            this._putUser(this.shareState.user_id,payload)
            
        },
        _putUser(userid,payload){
            this.$axios.put(`/users/${userid}`,payload)
            .then(res=>{
                this.$toasted.success("修改成功！")
                this.$router.push({
                    path:`/User/${userid}`
                })
            })
            .catch(e=>{
                console.log(e.response.data.message)
                this.$toasted.error("重名了啊？")
            })
        },
        _getUser(userid){
            this.$axios.get(`/users/${userid}`)
            .then((res)=>{
                res = res.data
                this.profileForm.name = res.name || res.username
                this.profileForm.location = res.location   
                this.profileForm.about_me = res.about_me

            })
            .catch((e)=>{
                console.log(e)
            })
        }
    },
    created:function(){
        this._getUser(this.shareState.user_id)
        
    },
    beforeRouteUpdate(to,from,next){
        this.$toasted.error("Oh No!")
        next(false)
    }
}
</script>