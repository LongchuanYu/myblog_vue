<template>
    <div class="container">
            <div class="row">
            <div class="col-md-4">
                <form @submit.prevent="onSubmit">
                <div class="form-group">
                    <label for="nickname">Nick Name</label>
                    <input type="text" class="form-control" id="nickname" v-model="profileForm.name">
                    
                </div>
                <div class="form-group">
                    <label for="location">Location</label>
                    <input type="text" class="form-control" id="location" v-model="profileForm.location">
                </div>
                <div class="form-group">
                    <label for="aboutme">About me</label>
                    <textarea class="form-control" id="aboutme" rows="5" v-model="profileForm.about_me"></textarea>
                </div>
                <button type="submit" class="btn btn-primary">Submit</button>
                </form>
            </div>
        </div>
    </div>
</template>


<script>
export default {
    data(){
        return {
            profileForm:{
                name:'',
                location:'',
                about_me:'',
                submmitted:false
            }
        }
    },
    methods:{

    },
    created:function(){
        var user = this.$route.params.user;
        if(!user){
            console.log("No user information from pre")
        }
        this.profileForm.name = user.name || user.username
        this.profileForm.location = user.location
        this.profileForm.about_me = user.about_me

    },
    beforeRouteUpdate(to,from,next){
        this.$toasted.error("Oh No!")
        next(false)
    }
}
</script>