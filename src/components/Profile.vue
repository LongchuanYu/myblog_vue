<template>
<section>
    <div class="container">
        <div class="border p-3">
        <div class="row">
            
            <!-- 头像+edit按钮 -->
            <div class="col-sm-3">
                <div class='avatar pb-3'>
                    <img src="../assets/avatar.png" alt="" class="rounded img-fluid w-100" >
                </div>
                <button type="button" class="btn btn-outline-primary w-100 mb-5">Edit profile</button>
                
            </div>

            <!-- 个人资料 -->
            <div class="col-sm-9">
                <!-- username -->
                <div class="d-flex align-items-center justify-content-sm-between">
                    <h2 class="mb-3 font-weight-normal">myname</h2>
                </div>
                <!-- Member since -->
                <h6 class="mb-3 font-weight-normal"><i class="far fa-user mr-2"></i>Member since:</h6>
                <h6 class="mb-3 font-weight-normal"><i class="far fa-clock mr-2"></i>Last seen:</h6>
                <h6 class="mb-3 font-weight-normal"><i class="far fa-address-card mr-2"></i>veritied User</h6>
                <h6 class="mb-3 font-weight-normal"><i class="far fa-map mr-2"></i>China,Shanghai</h6>
            </div>
        </div>
        </div>
    </div>   
</section>
</template>

<script>
export default {
    
}
</script>